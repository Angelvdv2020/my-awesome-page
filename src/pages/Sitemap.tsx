import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import manifest from "@/content/pages/_manifest.json";
import SiteLayout from "@/components/layout/SiteLayout";

interface ManifestEntry { slug: string; title: string; }

const Sitemap = () => {
  const list = (manifest as ManifestEntry[]).slice().sort((a, b) => a.slug.localeCompare(b.slug));
  return (
    <SiteLayout>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-sm text-white/60 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> На главную
        </Link>
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">// vortex / sitemap</div>
        <h1 className="text-4xl font-black mb-2">Карта сайта</h1>
        <p className="text-white/60 mb-10">{list.length} страниц.</p>
        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          {list.map((p) => (
            <Link
              key={p.slug || "home"}
              to={`/${p.slug}`}
              className="group flex items-center gap-3 bg-[hsl(var(--ink))] p-4 hover:bg-white/5 transition"
            >
              <FileText className="h-4 w-4 text-primary shrink-0" />
              <div className="min-w-0">
                <div className="text-sm text-white truncate">{p.title || "(без названия)"}</div>
                <div className="text-xs font-mono text-white/40 truncate">/{p.slug}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
};

export default Sitemap;
