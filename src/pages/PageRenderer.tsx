import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import manifest from "@/content/pages/_manifest.json";
import type { StructuredPage } from "@/content/types";
import NotFound from "./NotFound";

interface ManifestEntry { slug: string; file: string; title: string; description: string }

const loaders = import.meta.glob<{ default: StructuredPage }>("../content/pages/*.json");

const loadPage = async (slug: string): Promise<StructuredPage | null> => {
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
const updateHead = (data: StructuredPage) => {
  document.title = data.title || "VORTEX";
  setMeta('meta[name="description"]', "content", data.description);
  if (data.keywords) setMeta('meta[name="keywords"]', "content", data.keywords);
  setMeta('link[rel="canonical"]', "href", data.canonical);
  setMeta('meta[property="og:title"]', "content", data.og.title);
  setMeta('meta[property="og:description"]', "content", data.og.description);
  setMeta('meta[property="og:image"]', "content", data.og.image);
  setMeta('meta[property="og:url"]', "content", data.og.url);
  setMeta('meta[property="og:type"]', "content", data.og.type);
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
  const [data, setData] = useState<StructuredPage | null | undefined>(undefined);

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
    <SiteLayout>
      {data.blocks.map((b, i) => <BlockRenderer key={i} block={b} />)}
    </SiteLayout>
  );
};

export default PageRenderer;
