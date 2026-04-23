import { Link, NavLink, useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const NAV = [
  { to: "/", label: "Главная" },
  { to: "/services", label: "Сервисы" },
  { to: "/solutions", label: "Решения" },
  { to: "/news", label: "Новости" },
  { to: "/events", label: "События" },
  { to: "/about", label: "О нас" },
];

interface Props {
  children: ReactNode;
  /** When true, content is rendered as raw HTML (legacy pages). Layout intercepts internal link clicks. */
  trapInternalLinks?: boolean;
}

const SiteLayout = ({ children, trapInternalLinks }: Props) => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  // Single global handler: rewrite legacy ".html" links into clean React Router routes.
  useEffect(() => {
    if (!trapInternalLinks) return;
    const el = contentRef.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      // skip externals, anchors, mail/tel
      if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) return;
      if (a.target === "_blank") return;
      // skip asset links (svg, png, pdf...)
      if (/\.(svg|png|jpe?g|gif|pdf|webp|mp4|zip)(\?|$)/i.test(href)) return;
      e.preventDefault();
      let clean = href.replace(/^\/site\//, "/").replace(/\.html$/i, "").replace(/\/index$/, "/");
      if (clean === "" || clean === "/index") clean = "/";
      navigate(clean);
    };
    const onSubmit = (e: Event) => {
      e.preventDefault();
      toast({
        title: "Форма временно недоступна",
        description: "Свяжитесь с нами через Telegram или VK — ссылки в шапке.",
      });
    };
    el.addEventListener("click", onClick);
    el.addEventListener("submit", onSubmit);
    return () => {
      el.removeEventListener("click", onClick);
      el.removeEventListener("submit", onSubmit);
    };
  }, [trapInternalLinks, navigate]);

  return (
    <div className="min-h-screen bg-[hsl(var(--ink))] text-white flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur bg-[hsl(var(--ink))]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight">
            <span className="inline-block w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
            VORTEX
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition ${
                    isActive ? "text-white bg-white/10" : "text-white/70 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#" aria-label="VK" className="p-2 rounded-md hover:bg-white/10" title="VK">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white/80"><path d="M12.7 17.3c-5.4 0-8.5-3.7-8.6-9.9h2.7c.1 4.5 2.1 6.4 3.6 6.8V7.4h2.5v3.9c1.5-.2 3.1-1.9 3.6-3.9h2.5a7 7 0 0 1-3.2 4.6c1.6.7 3.6 2.2 4.4 4.7h-2.8c-.6-1.9-2-3.4-4.5-3.6v3.6h-.2z"/></svg>
            </a>
            <a href="#" aria-label="Telegram" className="p-2 rounded-md hover:bg-white/10" title="Telegram">
              <Send className="w-4 h-4" />
            </a>
            <Link
              to="/login"
              className="ml-2 inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"
            >
              Войти
            </Link>
          </div>
        </div>
      </header>

      <main ref={contentRef} className="flex-1">{children}</main>

      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6 text-sm text-white/60">
          <div>
            <div className="font-black text-white text-lg mb-2">VORTEX</div>
            <p>Маршрутизаторы и VPN-сервисы для бизнеса.</p>
          </div>
          <div>
            <div className="text-white font-semibold mb-2">Навигация</div>
            <ul className="space-y-1">
              {NAV.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-white">{n.label}</Link></li>
              ))}
              <li><Link to="/sitemap" className="hover:text-white">Карта сайта</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-2">Связь</div>
            <div className="flex gap-3">
              <a href="#" className="hover:text-white">VK</a>
              <a href="#" className="hover:text-white">Telegram</a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-white/40 pb-6">© {new Date().getFullYear()} Vortex</div>
      </footer>
    </div>
  );
};

export default SiteLayout;
