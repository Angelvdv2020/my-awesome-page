"""Extract per-page content + SEO meta + JSON-LD from public/site/*.html into JSON.

Rewrites:
  * absolute https://Vortex.ru/...  → relative clean URLs (https://www.vortex1.ru/... only for og:url/canonical)
  * /upload/, /_next/, favicon.svg  → /site/...
  * internal *.html links            → clean URLs (no extension)
"""
import os, re, json, html as html_lib

CANONICAL_HOST = "https://www.vortex1.ru"

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "site"))
OUT  = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src", "content", "pages"))
os.makedirs(OUT, exist_ok=True)

def slug_for(rel: str) -> str:
    s = rel[:-5].replace(os.sep, "/")
    if s == "index": return ""
    return s

def clean_internal_url(u: str) -> str:
    """Convert any internal href into clean SPA path."""
    if not u: return u
    # strip Vortex.ru / redsecurity.ru host
    u = re.sub(r"^https?://(?:www\.)?(?:Vortex|redsecurity|vortex1)\.ru", "", u, flags=re.I)
    # strip /site/ prefix that we added earlier
    u = re.sub(r"^/site/", "/", u)
    # asset paths: keep /site/ prefix (uploads, _next, favicon)
    return u

def rewrite_href(u: str) -> str:
    """For href in content: turn .html into clean, keep assets via /site/."""
    if not u: return u
    if re.match(r"^(mailto:|tel:|#|javascript:|data:)", u, re.I): return u
    # external (after host strip nothing left → was external)
    is_external = re.match(r"^https?://", u, re.I) and not re.match(r"^https?://(?:www\.)?(?:Vortex|redsecurity|vortex1)\.ru", u, re.I)
    if is_external: return u
    # internal
    u = re.sub(r"^https?://(?:www\.)?(?:Vortex|redsecurity|vortex1)\.ru", "", u, flags=re.I)
    # asset → /site/
    if re.search(r"\.(png|jpe?g|svg|gif|webp|pdf|mp4|mp3|zip|css|js|ico|woff2?|ttf)(\?|#|$)", u, re.I):
        if u.startswith("/upload/") or u.startswith("/_next/") or u == "/favicon.svg":
            u = "/site" + u
        elif not u.startswith("/site/") and not u.startswith("/"):
            u = "/site/" + u
        return u
    # html page → strip .html, normalise root
    if u.endswith(".html"):
        u = u[:-5]
    if u.endswith("/index"): u = u[:-5] or "/"
    if u == "" or u == "/index": u = "/"
    if not u.startswith("/") and not re.match(r"^https?://", u):
        u = "/" + u
    return u

def rewrite_asset(u: str) -> str:
    """For images / preload / link rel=icon."""
    if not u: return u
    if re.match(r"^(data:|https?:)", u, re.I):
        # bring Vortex.ru asset hosts back to local /site/
        m = re.match(r"^https?://(?:www\.)?Vortex\.ru(/.*)$", u, re.I)
        if m:
            path = m.group(1)
            if path.startswith("/upload/") or path.startswith("/_next/"):
                return "/site" + path
        return u
    if u.startswith("/upload/") or u.startswith("/_next/"):
        return "/site" + u
    if u in ("favicon.svg", "/favicon.svg"):
        return "/site/favicon.svg"
    if not u.startswith("/") and not u.startswith("http"):
        return "/site/" + u
    return u

META_RE = re.compile(r'<meta\s+([^>]*?)/?>', re.I)
def parse_attrs(s: str) -> dict:
    return {m.group(1).lower(): html_lib.unescape(m.group(2))
            for m in re.finditer(r'(\w[\w:-]*)\s*=\s*"([^"]*)"', s)}

def extract(html: str, slug: str) -> dict:
    title_m = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
    title = html_lib.unescape(title_m.group(1).strip()) if title_m else ""

    meta = {"description": "", "keywords": "",
            "og:title": "", "og:description": "", "og:image": "", "og:url": "", "og:type": "website"}
    for m in META_RE.finditer(html):
        a = parse_attrs(m.group(1))
        name = a.get("name") or a.get("property")
        if not name: continue
        if name in meta:
            meta[name] = a.get("content", "")

    # rewrite og:image to local mirror if needed
    meta["og:image"] = rewrite_asset(meta["og:image"]) if meta["og:image"] else ""
    canonical_path = "/" if slug == "" else f"/{slug}"
    meta["og:url"] = CANONICAL_HOST + canonical_path
    canonical = CANONICAL_HOST + canonical_path
    if not meta["og:title"]: meta["og:title"] = title
    if not meta["og:description"]: meta["og:description"] = meta["description"]

    # JSON-LD blocks — normalize URLs inside
    def _norm_jsonld(obj):
        if isinstance(obj, str):
            # absolute Vortex.ru/upload/* → /site/upload/*
            obj2 = re.sub(r"https?://(?:www\.)?Vortex\.ru(/upload/[^\s\"'<>]+)", r"/site\1", obj, flags=re.I)
            # any other Vortex.ru → vortex1.ru canonical
            obj2 = re.sub(r"https?://(?:www\.)?Vortex\.ru", CANONICAL_HOST, obj2, flags=re.I)
            return obj2
        if isinstance(obj, list): return [_norm_jsonld(x) for x in obj]
        if isinstance(obj, dict): return {k: _norm_jsonld(v) for k, v in obj.items()}
        return obj
    jsonld = []
    for m in re.finditer(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', html, re.S | re.I):
        raw = m.group(1).strip()
        try:
            jsonld.append(_norm_jsonld(json.loads(raw)))
        except Exception:
            pass

    # body
    body_m = re.search(r"<body[^>]*>(.*?)</body>", html, re.S | re.I)
    body = body_m.group(1) if body_m else ""

    # remove all scripts and noscripts
    body = re.sub(r"<script\b[^>]*>.*?</script>", "", body, flags=re.S|re.I)
    body = re.sub(r"<noscript\b[^>]*>.*?</noscript>", "", body, flags=re.S|re.I)

    # remove cookie banner block (Cookie_wrapper__*)
    body = re.sub(r'<div[^>]*class="[^"]*Cookie_wrapper__[^"]*"[^>]*>.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>',
                  "", body, flags=re.S)

    # remove FlowBackground canvas wrapper (kills empty canvas)
    body = re.sub(r'<div[^>]*class="[^"]*FlowBackground_block__[^"]*"[^>]*>.*?</div>',
                  "", body, flags=re.S)

    # remove duplicate header/footer (Layout will provide them)
    body = re.sub(r'<header\b[^>]*class="[^"]*Header_header__[^"]*".*?</header>', "", body, flags=re.S|re.I)
    body = re.sub(r'<footer\b[^>]*class="[^"]*Footer_footer__[^"]*".*?</footer>', "", body, flags=re.S|re.I)

    # rewrite all href / src
    def _href(m):
        attr, q, val = m.group(1), m.group(2), m.group(3)
        return f'{attr}={q}{rewrite_href(val)}{q}'
    def _src(m):
        attr, q, val = m.group(1), m.group(2), m.group(3)
        return f'{attr}={q}{rewrite_asset(val)}{q}'
    body = re.sub(r'(href)=(")([^"]+)"', _href, body)
    body = re.sub(r"(href)=(')([^']+)'", _href, body)
    body = re.sub(r'(src|poster|data-src)=(")([^"]+)"', _src, body)
    body = re.sub(r"(src|poster|data-src)=(')([^']+)'", _src, body)

    return {
        "title": title,
        "description": meta["description"],
        "keywords": meta["keywords"],
        "canonical": canonical,
        "og": {
            "title": meta["og:title"],
            "description": meta["og:description"],
            "image": meta["og:image"],
            "url": meta["og:url"],
            "type": meta["og:type"],
        },
        "jsonld": jsonld,
        "html": body.strip(),
    }

manifest = []
for dirpath, _, files in os.walk(ROOT):
    for fn in files:
        if not fn.endswith(".html"): continue
        fp = os.path.join(dirpath, fn)
        rel = os.path.relpath(fp, ROOT)
        slug = slug_for(rel)
        with open(fp, encoding="utf-8", errors="ignore") as f:
            html = f.read()
        data = extract(html, slug)
        out_name = (slug or "home").replace("/", "__") + ".json"
        with open(os.path.join(OUT, out_name), "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False)
        manifest.append({"slug": slug, "file": out_name, "title": data["title"], "description": data["description"]})

manifest.sort(key=lambda x: x["slug"])
with open(os.path.join(OUT, "_manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

print(f"Generated {len(manifest)} pages → {OUT}")
