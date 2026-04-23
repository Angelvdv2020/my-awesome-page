import { Link, NavLink, useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { Send, Router } from "lucide-react";

const NAV = [
  { to: "/", label: "Главная" },
  { to: "/services", label: "Тарифы VPN" },
  { to: "/solutions", label: "Роутеры" },
  { to: "/news", label: "Сценарии" },
  { to: "/events", label: "Блог" },
  { to: "/about", label: "О нас" },
  { to: "/contacts", label: "Контакты" },
];

interface Props {
  children: ReactNode;
  /** When true, content is rendered as raw HTML (legacy pages). Layout intercepts internal link clicks. */
  trapInternalLinks?: boolean;
}

const SiteLayout = ({ children, trapInternalLinks }: Props) => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trapInternalLinks) return;
    const el = contentRef.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href) return;
      if (/^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) return;
      if (a.target === "_blank") return;
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
        description: "Свяжитесь с нами через Telegram — кнопка в шапке.",
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
      <header className="sticky top-0 z-40 backdrop-blur bg-[hsl(var(--ink))]/85 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight">
            <Router className="w-5 h-5 text-primary" />
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
            <a href="https://t.me/" target="_blank" rel="noopener" aria-label="Telegram"
              className="p-2 rounded-md hover:bg-white/10" title="Telegram">
              <Send className="w-4 h-4" />
            </a>
            <Link
              to="/contact-us"
              className="ml-2 inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90"
            >
              Подключить
            </Link>
          </div>
        </div>
      </header>

      <main ref={contentRef} className="flex-1">{children}</main>

      <footer className="border-t border-white/10 mt-12 bg-[hsl(var(--ink-2))]">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm text-white/60">
          <div>
            <div className="flex items-center gap-2 font-black text-white text-lg mb-3">
              <Router className="w-5 h-5 text-primary" /> VORTEX
            </div>
            <p>VPN-сервис и роутеры для дома и офиса. Стабильный канал, простое подключение, поддержка 24/7.</p>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Сервис</div>
            <ul className="space-y-1.5">
              <li><Link to="/services" className="hover:text-white">Тарифы VPN</Link></li>
              <li><Link to="/solutions" className="hover:text-white">Каталог роутеров</Link></li>
              <li><Link to="/news" className="hover:text-white">Сценарии</Link></li>
              <li><Link to="/events" className="hover:text-white">Блог и гайды</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Компания</div>
            <ul className="space-y-1.5">
              <li><Link to="/about" className="hover:text-white">О нас</Link></li>
              <li><Link to="/contacts" className="hover:text-white">Контакты</Link></li>
              <li><Link to="/sitemap" className="hover:text-white">Карта сайта</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-3">Документы</div>
            <ul className="space-y-1.5">
              <li><Link to="/documents" className="hover:text-white">Оферта</Link></li>
              <li><Link to="/komplaens-i-delovaya-etika" className="hover:text-white">Политика конфиденциальности</Link></li>
              <li><Link to="/contact-us" className="hover:text-white">Условия возврата</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-5 text-center text-xs text-white/40">
            © {new Date().getFullYear()} VORTEX. VPN-сервис и роутеры.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
