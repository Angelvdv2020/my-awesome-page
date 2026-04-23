import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="relative w-screen h-screen bg-[hsl(var(--ink))]">
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <a
          href="/sitemap"
          className="inline-flex items-center px-4 py-2 rounded-md bg-white/10 text-white text-sm font-medium hover:bg-white/20 backdrop-blur"
        >
          Все страницы
        </a>
        <Link
          to="/login"
          className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 shadow-lg"
        >
          Войти
        </Link>
      </div>
      <iframe
        src="/site/index.html"
        title="Vortex"
        className="w-full h-full border-0 block"
      />
    </div>
  );
};

export default Index;
