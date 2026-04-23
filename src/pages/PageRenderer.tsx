import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SiteLayout from "@/components/layout/SiteLayout";
import manifest from "@/content/pages/_manifest.json";
import NotFound from "./NotFound";

interface PageData { title: string; description: string; html: string; }
interface ManifestEntry { slug: string; file: string; title: string; }

// Eager glob — keeps things simple; pages are pre-rendered JSON, total size is moderate.
const modules = import.meta.glob<{ default: PageData }>("../content/pages/*.json", { eager: true });

const getPage = (slug: string): PageData | null => {
  const m = (manifest as ManifestEntry[]).find((x) => x.slug === slug);
  if (!m) return null;
  const mod = modules[`../content/pages/${m.file}`];
  return mod?.default ?? null;
};

const PageRenderer = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+|\/+$/g, ""); // "" for root, "services/waf" otherwise
  const data = getPage(slug);
  const [, force] = useState(0);

  useEffect(() => {
    if (data?.title) document.title = data.title;
    window.scrollTo(0, 0);
    force((n) => n + 1);
  }, [pathname, data?.title]);

  if (!data) return <NotFound />;

  return (
    <SiteLayout trapInternalLinks>
      <article
        className="legacy-content"
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
    </SiteLayout>
  );
};

export default PageRenderer;
