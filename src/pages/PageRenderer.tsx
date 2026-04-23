import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import manifest from "@/content/pages/_manifest.json";
import NotFound from "./NotFound";

interface PageData {
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

const setMeta = (sel: string, attr: string, value: string) => {
  if (!value) return;
  let el = document.head.querySelector<HTMLElement>(sel);
  if (!el) {
    el = document.createElement(sel.startsWith("meta") ? "meta" : "link");
    const m = sel.match(/\[([^=]+)="([^"]+)"\]/);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const JSONLD_ID = "vortex-jsonld";
const updateHead = (data: PageData) => {
  document.title = data.title || "Vortex";
  setMeta('meta[name="description"]', "content", data.description);
  setMeta('meta[name="keywords"]', "content", data.keywords);
  setMeta('link[rel="canonical"]', "href", data.canonical);
  setMeta('meta[property="og:title"]', "content", data.og.title);
  setMeta('meta[property="og:description"]', "content", data.og.description);
  setMeta('meta[property="og:image"]', "content", data.og.image);
  setMeta('meta[property="og:url"]', "content", data.og.url);
  setMeta('meta[property="og:type"]', "content", data.og.type);
  // jsonld
  document.querySelectorAll(`script[data-vortex="${JSONLD_ID}"]`).forEach((n) => n.remove());
  (data.jsonld || []).forEach((obj) => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-vortex", JSONLD_ID);
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  });
};

const PageRenderer = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  const [data, setData] = useState<PageData | null | undefined>(undefined);

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
    <SiteLayout trapInternalLinks bare>
      <article className="legacy-content" dangerouslySetInnerHTML={{ __html: data.html }} />
    </SiteLayout>
  );
};

export default PageRenderer;
