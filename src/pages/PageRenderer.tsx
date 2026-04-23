import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import manifest from "@/content/pages/_manifest.json";
import NotFound from "./NotFound";

export interface PageData {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  og: { title: string; description: string; image: string; url: string; type: string };
  jsonld: unknown[];
  html: string;
}
interface ManifestEntry { slug: string; file: string; title: string; description: string }

const loaders = import.meta.glob<{ default: PageData }>("../content/pages/*.json");

const loadPage = async (slug: string): Promise<PageData | null> => {
  const m = (manifest as ManifestEntry[]).find((x) => x.slug === slug);
  if (!m) return null;
  const loader = loaders[`../content/pages/${m.file}`];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
};

// Controlled set of head tags managed by the renderer.
// Each entry: selector + how to apply a value (or remove the node when value is empty).
type HeadSpec = { sel: string; create: () => HTMLElement; attr: "content" | "href" };
const HEAD_SPECS: Record<string, HeadSpec> = {
  description: { sel: 'meta[name="description"]', attr: "content",
    create: () => Object.assign(document.createElement("meta"), { name: "description" }) },
  keywords: { sel: 'meta[name="keywords"]', attr: "content",
    create: () => Object.assign(document.createElement("meta"), { name: "keywords" }) },
  canonical: { sel: 'link[rel="canonical"]', attr: "href",
    create: () => { const l = document.createElement("link"); l.setAttribute("rel", "canonical"); return l; } },
  ogTitle: { sel: 'meta[property="og:title"]', attr: "content",
    create: () => { const m = document.createElement("meta"); m.setAttribute("property", "og:title"); return m; } },
  ogDescription: { sel: 'meta[property="og:description"]', attr: "content",
    create: () => { const m = document.createElement("meta"); m.setAttribute("property", "og:description"); return m; } },
  ogImage: { sel: 'meta[property="og:image"]', attr: "content",
    create: () => { const m = document.createElement("meta"); m.setAttribute("property", "og:image"); return m; } },
  ogUrl: { sel: 'meta[property="og:url"]', attr: "content",
    create: () => { const m = document.createElement("meta"); m.setAttribute("property", "og:url"); return m; } },
  ogType: { sel: 'meta[property="og:type"]', attr: "content",
    create: () => { const m = document.createElement("meta"); m.setAttribute("property", "og:type"); return m; } },
};

const applyHead = (key: keyof typeof HEAD_SPECS, value: string) => {
  const spec = HEAD_SPECS[key];
  const existing = document.head.querySelector<HTMLElement>(spec.sel);
  if (!value) {
    // remove stale tag so values from a previous page don't bleed through
    existing?.remove();
    return;
  }
  const el = existing ?? spec.create();
  el.setAttribute(spec.attr, value);
  if (!existing) document.head.appendChild(el);
};

const JSONLD_ID = "vortex-jsonld";
export const updateHead = (data: PageData) => {
  document.title = data.title || "Vortex";
  applyHead("description", data.description);
  applyHead("keywords", data.keywords);
  applyHead("canonical", data.canonical);
  applyHead("ogTitle", data.og?.title || "");
  applyHead("ogDescription", data.og?.description || "");
  applyHead("ogImage", data.og?.image || "");
  applyHead("ogUrl", data.og?.url || "");
  applyHead("ogType", data.og?.type || "");
  // jsonld: clear all previous, then add current
  document.querySelectorAll(`script[data-vortex="${JSONLD_ID}"]`).forEach((n) => n.remove());
  (data.jsonld || []).forEach((obj) => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-vortex", JSONLD_ID);
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  });
};

// Card frames are now styled via CSS in index.css (see .legacy-content
// [class*="Card_card__"]). The original Next.js JS that hydrated SVG rect
// sizes is intentionally NOT re-implemented — CSS borders work at any size
// without resize observers and don't leave empty space when JS is absent.

const PageRenderer = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  const [data, setData] = useState<PageData | null | undefined>(undefined);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    setData(undefined);
    loadPage(slug).then((d) => { if (!cancelled) setData(d); });
    window.scrollTo(0, 0);
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (data) updateHead(data);
  }, [data]);


  if (data === undefined) {
    return <SiteLayout><div className="h-[60vh]" /></SiteLayout>;
  }
  if (data === null) return <NotFound />;

  return (
    <SiteLayout trapInternalLinks>
      <article ref={articleRef} className="legacy-content" dangerouslySetInnerHTML={{ __html: data.html }} />
    </SiteLayout>
  );
};

export default PageRenderer;
