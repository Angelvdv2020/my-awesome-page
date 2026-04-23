"""Post-build prerender: generates dist/<slug>/index.html for each page in manifest.

Uses dist/index.html as a template, injects:
  * <title>, meta description/keywords/canonical, og:* into <head>
  * JSON-LD scripts
  * Static HTML content + minimal layout into <div id="root"> for SEO bots & instant first paint.

After this script runs:
  dist/index.html               -> root (home)
  dist/services/waf/index.html  -> /services/waf
  ...
nginx try_files $uri $uri/index.html /index.html will serve them, then React hydrates.
"""
import os, json, re, html as html_lib

DIST = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "dist"))
PAGES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "content", "pages"))

with open(os.path.join(PAGES_DIR, "_manifest.json"), encoding="utf-8") as f:
    manifest = json.load(f)

with open(os.path.join(DIST, "index.html"), encoding="utf-8") as f:
    template = f.read()

def esc(s: str) -> str:
    return html_lib.escape(s or "", quote=True)

def render_meta(page: dict) -> str:
    parts = []
    if page.get("description"):
        parts.append(f'<meta name="description" content="{esc(page["description"])}">')
    if page.get("keywords"):
        parts.append(f'<meta name="keywords" content="{esc(page["keywords"])}">')
    if page.get("canonical"):
        parts.append(f'<link rel="canonical" href="{esc(page["canonical"])}">')
    og = page.get("og") or {}
    for k in ("title", "description", "image", "url", "type"):
        v = og.get(k)
        if v:
            parts.append(f'<meta property="og:{k}" content="{esc(v)}">')
    for obj in (page.get("jsonld") or []):
        parts.append(f'<script type="application/ld+json">{json.dumps(obj, ensure_ascii=False)}</script>')
    return "\n    ".join(parts)

def render_body(page: dict) -> str:
    if page.get("version") == 2:
        title = html_lib.escape(page.get("title") or "VORTEX")
        desc = html_lib.escape(page.get("description") or "")
        return (
            '<div id="root">'
            '<noscript><div style="padding:1rem;background:#fee;color:#900">Включите JavaScript для полноценной работы сайта.</div></noscript>'
            f'<main><h1>{title}</h1><p>{desc}</p></main>'
            '</div>'
        )
    return (
        '<div id="root">'
        '<noscript><div style="padding:1rem;background:#fee;color:#900">Включите JavaScript для полноценной работы сайта.</div></noscript>'
        f'<article class="legacy-content">{page.get("html","")}</article>'
        '</div>'
    )

def patch(template: str, page: dict) -> str:
    out = template
    # 1) <title>
    out = re.sub(r"<title>.*?</title>",
                 f"<title>{esc(page.get('title') or 'Vortex')}</title>",
                 out, count=1, flags=re.S | re.I)
    # 2) inject meta block before </head>
    meta = render_meta(page)
    out = out.replace("</head>", f"    {meta}\n  </head>", 1)
    # 3) replace <div id="root"></div>
    body = render_body(page)
    out = re.sub(r'<div\s+id="root"\s*>.*?</div>', body, out, count=1, flags=re.S)
    return out

count = 0
for page_meta in manifest:
    slug = page_meta["slug"]
    file = page_meta["file"]
    with open(os.path.join(PAGES_DIR, file), encoding="utf-8") as f:
        page = json.load(f)
    html = patch(template, page)
    if slug == "":
        target = os.path.join(DIST, "index.html")
    else:
        outdir = os.path.join(DIST, slug)
        os.makedirs(outdir, exist_ok=True)
        target = os.path.join(outdir, "index.html")
    with open(target, "w", encoding="utf-8") as f:
        f.write(html)
    count += 1

print(f"Prerendered {count} pages into {DIST}")
