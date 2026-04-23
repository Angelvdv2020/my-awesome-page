import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import manifest from "@/content/pages/_manifest.json";
import NotFound from "./NotFound";

interface PageData { title: string; description: string; html: string; }
interface ManifestEntry { slug: string; file: string; title: string; }

// Lazy glob — each page becomes its own chunk, loaded on demand.
const loaders = import.meta.glob<{ default: PageData }>("../content/pages/*.json");

const loadPage = async (slug: string): Promise<PageData | null> => {
  const m = (manifest as ManifestEntry[]).find((x) => x.slug === slug);
  if (!m) return null;
  const loader = loaders[`../content/pages/${m.file}`];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
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
    if (data?.title) document.title = data.title;
  }, [data?.title]);

  if (data === undefined) {
    return <SiteLayout><div className="h-[60vh]" /></SiteLayout>;
  }
  if (data === null) return <NotFound />;

  return (
    <SiteLayout trapInternalLinks>
      <article className="legacy-content" dangerouslySetInnerHTML={{ __html: data.html }} />
    </SiteLayout>
  );
};

export default PageRenderer;

