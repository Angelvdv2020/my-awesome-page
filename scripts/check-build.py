"""Sanity-check all prerendered URLs."""
import os, json, re, sys
from urllib.parse import unquote

DIST = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "dist"))
PAGES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "content", "pages"))

with open(os.path.join(PAGES_DIR, "_manifest.json"), encoding="utf-8") as f:
    manifest = json.load(f)

errors, warnings = [], []
for entry in manifest:
    slug = entry["slug"]
    path = os.path.join(DIST, "index.html") if slug == "" else os.path.join(DIST, slug, "index.html")
    url = "/" if slug == "" else "/" + slug
    if not os.path.isfile(path):
        errors.append(f"[MISSING] {url} -> {path}")
        continue
    with open(path, encoding="utf-8") as f:
        html = f.read()
    # title
    if not re.search(r"<title>.+?</title>", html): errors.append(f"[NO TITLE] {url}")
    # meta
    for need in (r'name="description"', r'rel="canonical"', r'property="og:title"', r'property="og:url"'):
        if not re.search(need, html): warnings.append(f"[NO META {need}] {url}")
    # canonical host
    m = re.search(r'<link rel="canonical" href="([^"]+)"', html)
    if m and "vortex1.ru" not in m.group(1):
        errors.append(f"[BAD CANONICAL] {url} -> {m.group(1)}")
    # any leftover Vortex.ru absolute html links?
    if re.search(r'https?://(?:www\.)?Vortex\.ru/(?!upload|_next|favicon)', html, re.I):
        warnings.append(f"[ABSOLUTE LEGACY LINK] {url}")
    # any .html in href= within content (excluding external)
    for m in re.finditer(r'href="([^"]+\.html)"', html):
        href = m.group(1)
        if not href.startswith("http") and "/site/" not in href:
            warnings.append(f"[.html LEFTOVER] {url} -> {href}")
    # asset path checks: every /site/upload reference must exist on disk
    for asset in re.findall(r'(?:src|href)="(/site/(?:upload|_next|favicon[^"]*)[^"]*)"', html):
        # strip query/hash
        clean = asset.split("?", 1)[0].split("#", 1)[0]
        # decode percent-encoded chars (cyrillic, spaces, etc.)
        decoded = unquote(clean)
        local = os.path.join(DIST, decoded.lstrip("/"))
        if not os.path.exists(local):
            # try encoded form too, in case file on disk is literally percent-encoded
            local_raw = os.path.join(DIST, clean.lstrip("/"))
            if not os.path.exists(local_raw):
                errors.append(f"[MISSING ASSET] {url} -> {asset}")

print(f"Pages checked: {len(manifest)}")
print(f"Errors:   {len(errors)}")
for e in errors[:60]: print("  ", e)
print(f"Warnings: {len(warnings)}")
for w in warnings[:30]: print("  ", w)
sys.exit(1 if errors else 0)
