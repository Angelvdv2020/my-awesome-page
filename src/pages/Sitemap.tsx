import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import pages from "@/pages-list.json";

const Sitemap = () => {
  const list = pages as string[];
  return (
    <div className="min-h-screen bg-[hsl(var(--ink))] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-sm text-white/60 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> На главную
        </Link>
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3">// vortex / sitemap</div>
        <h1 className="text-4xl font-black mb-2">Все страницы сайта</h1>
        <p className="text-white/60 mb-10">Скачано {list.length} страниц с локальными ассетами.</p>
        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          {list.map((p) => (
            <a
              key={p}
              href={`/site/${p}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 bg-[hsl(var(--ink))] p-4 hover:bg-white/5 transition"
            >
              <FileText className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm font-mono text-white/80 group-hover:text-white truncate">/{p}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
