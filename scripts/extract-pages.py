"""Extract <body> contents from each public/site/*.html into src/content/pages/*.json.

Usage: python3 scripts/extract-pages.py
"""
import os, re, json

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "site")
OUT  = os.path.join(os.path.dirname(__file__), "..", "src", "content", "pages")
ROOT = os.path.abspath(ROOT)
OUT  = os.path.abspath(OUT)
os.makedirs(OUT, exist_ok=True)

def extract(html: str):
    title_m = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
    desc_m  = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', html, re.I)
    body_m  = re.search(r"<body[^>]*>(.*?)</body>", html, re.S | re.I)
    if not body_m: return None
    body = body_m.group(1)
    body = re.sub(r"<script\b[^>]*>.*?</script>", "", body, flags=re.S|re.I)
    body = re.sub(r"<noscript\b[^>]*>.*?</noscript>", "", body, flags=re.S|re.I)
    body = re.sub(r'(src|href)="(?!https?://|/|#|mailto:|tel:|data:)([^"]+)"', r'\1="/site/\2"', body)
    body = re.sub(r'(src|href)="/(_next/|upload/)', r'\1="/site/\2', body)
    return {
        "title": (title_m.group(1).strip() if title_m else ""),
        "description": (desc_m.group(1) if desc_m else ""),
        "html": body.strip(),
    }

manifest = []
for dirpath, _, files in os.walk(ROOT):
    for fn in files:
        if not fn.endswith(".html"): continue
        fp = os.path.join(dirpath, fn)
        rel = os.path.relpath(fp, ROOT)
        slug = rel[:-5].replace(os.sep, "/")
        if slug == "index": slug = ""
        with open(fp, encoding="utf-8", errors="ignore") as f:
            html = f.read()
        data = extract(html)
        if not data: continue
        out_name = (slug or "home").replace("/", "__") + ".json"
        with open(os.path.join(OUT, out_name), "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False)
        manifest.append({"slug": slug, "file": out_name, "title": data["title"]})

with open(os.path.join(OUT, "_manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

print(f"Generated {len(manifest)} pages → {OUT}")
