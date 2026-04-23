import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Shield, Activity, Lock, Bot, KeyRound, GraduationCap,
  ArrowRight, ArrowUpRight, ChevronRight, Phone, Mail, MapPin,
  Menu, X, Send, Calendar, Newspaper, Layers, Network,
  Eye, CheckCircle2, Building2, Radar, Cpu, Server, Terminal
} from "lucide-react";

const services = [
  { icon: Shield, name: "Anti-DDoS", desc: "Защита от DDoS-атак", code: "MSS-01" },
  { icon: Lock, name: "WAF", desc: "Защита веб-приложений", code: "MSS-02" },
  { icon: Bot, name: "AntiBot", desc: "Защита веб-сайтов и API от ботов", code: "MSS-03" },
  { icon: KeyRound, name: "MFA", desc: "Многофакторная аутентификация", code: "MSS-04" },
  { icon: Network, name: "ГОСТ VPN", desc: "Шифрование каналов связи", code: "MSS-05" },
  { icon: GraduationCap, name: "Awareness", desc: "Повышение киберграмотности", code: "MSS-06" },
];

const stats = [
  { value: "5", unit: "минут", label: "требуется злоумышленнику, чтобы зашифровать всю ИТ-инфраструктуру компании" },
  { value: "8,6", unit: "млрд+", label: "анализируемых SOC событий в сутки" },
  { value: "140", unit: "тыс+", label: "хакерских атак отразили специалисты RED Security SOC за 2025 г." },
];

const solutions = [
  {
    icon: Eye,
    code: "01 / SOC",
    title: "Мониторинг и реагирование на киберинциденты",
    desc: "Защита ИТ-инфраструктуры и своевременное реагирование на инциденты ИБ в режиме 24/7/365",
    tags: ["SOC", "EDR", "MDR", "Deception"],
  },
  {
    icon: Layers,
    code: "02 / INTEGRATION",
    title: "Интеграционные решения",
    desc: "Интеграция ИБ-решений в любой ИТ-ландшафт независимо от уровня цифровой зрелости компании",
    tags: ["Сетевая безопасность", "Защита ИТ-инфраструктуры"],
  },
  {
    icon: Activity,
    code: "03 / MSS",
    title: "Сервисы кибербезопасности",
    desc: "Передовые управляемые ИБ-сервисы под ключ, которые закрывают основные задачи кибербезопасности",
    tags: ["ANTI-DDOS", "WAF", "MFA", "ГОСТ VPN", "SA"],
  },
];

const advantages = [
  { icon: Radar, t: "Непрерывный цикл снижения киберрисков" },
  { icon: Layers, t: "Комплексный подход к ИБ" },
  { icon: Network, t: "Интеграция в любой ИТ-ландшафт" },
  { icon: Activity, t: "Быстрое подключение MSS на базе ведущих решений" },
  { icon: Cpu, t: "Команда из ведущих российских и зарубежных вендоров" },
  { icon: Server, t: "MSS-решения из защищённого облака" },
  { icon: Terminal, t: "Топовые эксперты в offensive / defensive" },
];

const cases = [
  {
    title: "Подключение клиента к RED Security SOC",
    sub: "Образовательное учреждение с филиальной сетью",
    metrics: [{ v: "9", l: "филиалов" }, { v: ">16M ₽", l: "экономии на ФОТ в год" }],
  },
  {
    title: "Защита учётных записей сотрудников О'КЕЙ",
    sub: "RED Security MFA · Сеть гипермаркетов",
    metrics: [{ v: "14K+", l: "защищённых сотрудников" }, { v: "77+", l: "гипермаркетов" }],
  },
  {
    title: "Защита удалённого доступа в ИТ-компании",
    sub: "RED Security MFA",
    metrics: [{ v: "10K+", l: "сотрудников" }, { v: "3 мес", l: "срок реализации" }],
  },
];

const news = [
  { date: "16.04.2026", tag: "Награда", title: "RED Security получила награду «Сервис-провайдер года» от компании Xello" },
  { date: "10.04.2026", tag: "Исследование", title: "RED Security: Женщины распознают фишинговые письма лучше мужчин" },
  { date: "26.03.2025", tag: "Аналитика", title: "Время реагировать на кибератаки – вчера: проактивная защита SOC на примере кейсов" },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[hsl(var(--ink))]/95 backdrop-blur-md border-b border-white/10"
            : "bg-[hsl(var(--ink))]/80 backdrop-blur-sm"
        } text-background`}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-9 h-9 lg:w-10 lg:h-10 bg-primary rounded-sm flex items-center justify-center corner-cut">
                <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full pulse-dot" />
            </div>
            <div className="font-extrabold text-lg lg:text-xl tracking-tight">
              RED <span className="text-primary">Security</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-background/80">
            <a href="#services" className="hover:text-primary transition-colors">Сервисы</a>
            <a href="#monitoring" className="hover:text-primary transition-colors">Мониторинг</a>
            <a href="#integration" className="hover:text-primary transition-colors">Интеграция</a>
            <a href="#cases" className="hover:text-primary transition-colors">Кейсы</a>
            <a href="#news" className="hover:text-primary transition-colors">Новости</a>
            <a href="#about" className="hover:text-primary transition-colors">Компания</a>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact" className="font-mono text-xs text-background/70 hover:text-primary transition-colors">
              +7 (495) 147-20-60
            </a>
            <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-sm font-bold uppercase tracking-wide text-xs h-9 px-4">
              Консультация
            </Button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[hsl(var(--ink))]">
            <nav className="flex flex-col p-4 gap-3 text-sm font-medium">
              <a href="#services" onClick={() => setMenuOpen(false)}>Сервисы</a>
              <a href="#monitoring" onClick={() => setMenuOpen(false)}>Мониторинг</a>
              <a href="#cases" onClick={() => setMenuOpen(false)}>Кейсы</a>
              <a href="#news" onClick={() => setMenuOpen(false)}>Новости</a>
              <Button className="bg-primary mt-2">Запросить консультацию</Button>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 bg-[hsl(var(--ink))] text-background overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 radial-red opacity-90" />
        <div className="absolute top-0 right-0 w-[60%] h-full diag-stripes opacity-60" />

        {/* corner brackets */}
        <div className="absolute top-24 left-4 lg:left-8 w-6 h-6 border-l-2 border-t-2 border-primary opacity-70" />
        <div className="absolute bottom-12 right-4 lg:right-8 w-6 h-6 border-r-2 border-b-2 border-primary opacity-70" />

        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8">
          {/* alert ribbon */}
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-primary/40 rounded-sm pl-2 pr-4 py-2 mb-10 group hover:bg-primary/10 transition-colors"
          >
            <span className="bg-primary text-primary-foreground font-mono text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full pulse-dot" />
              SOC · 24/7
            </span>
            <span className="text-sm">Подозрение на взлом? — Скорая SOC-помощь</span>
            <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-5 flex items-center gap-3">
                <span className="w-8 h-px bg-primary" /> RED_SECURITY / v.2026
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold leading-[0.95] tracking-tight text-balance">
                Проактивная защита
                <br />
                от <span className="text-gradient-red">киберугроз</span>
              </h1>
              <p className="mt-7 text-lg lg:text-xl text-background/70 max-w-2xl leading-relaxed">
                Открытая экосистема ИБ-решений и экспертизы для комплексной защиты бизнеса.
                SOC, MSS, EDR, MDR, Anti-DDoS, WAF.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-7 rounded-sm font-bold uppercase tracking-wider text-xs">
                  Получить консультацию <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-7 rounded-sm font-bold uppercase tracking-wider text-xs bg-transparent border-white/20 text-background hover:bg-white/10 hover:text-background"
                >
                  Смотреть решения
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-5 hover:border-primary/50 transition-colors scan-line overflow-hidden">
                <div className="flex items-center gap-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-3">
                  <Newspaper className="w-3.5 h-3.5" /> NEWS_FEED
                </div>
                <div className="font-mono text-[10px] text-background/50 mb-2">10.04.2026</div>
                <div className="text-sm font-medium leading-snug mb-3 text-background">
                  RED Security: Женщины распознают фишинговые письма лучше мужчин
                </div>
                <a href="#" className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-primary hover:gap-2 transition-all">
                  Подробнее <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-5 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-2 font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-3">
                  <Calendar className="w-3.5 h-3.5" /> EVENTS
                </div>
                <div className="text-sm text-background/70">Сегодня событий нет</div>
                <a href="#" className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-primary mt-3 hover:gap-2 transition-all">
                  Календарь <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS — overlap on hero */}
      <section className="relative -mt-12 z-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 bg-background border border-border rounded-sm overflow-hidden shadow-[var(--shadow-elevated)]">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`relative p-7 lg:p-9 group hover:bg-secondary/50 transition-colors ${
                  i < 2 ? "md:border-r border-border" : ""
                }`}
              >
                <div className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] mb-4">
                  /// 0{i + 1}
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-5xl lg:text-6xl font-extrabold tracking-tight">{s.value}</span>
                  <span className="text-lg font-bold text-primary">{s.unit}</span>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">{s.label}</div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="monitoring" className="py-20 lg:py-28 relative">
        <div className="absolute inset-0 grid-bg-light opacity-50" />
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <div className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-primary" /> SECTION / 01
              </div>
              <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-balance">
                Решения <span className="text-gradient-red">RED Security</span>
              </h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary hover:gap-3 transition-all border-b border-primary/30 pb-1">
              Смотреть все <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {solutions.map((s, i) => (
              <div
                key={i}
                className="group relative bg-card border border-border rounded-sm p-7 lg:p-8 hover:border-primary hover:shadow-[var(--shadow-red)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 group-hover:bg-primary/10 transition-colors"
                     style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
                <div className="relative">
                  <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-5">{s.code}</div>
                  <div className="w-12 h-12 bg-foreground text-background rounded-sm flex items-center justify-center mb-6 group-hover:bg-primary transition-colors corner-cut">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 leading-tight">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {s.tags.map((t) => (
                      <span key={t} className="font-mono text-[10px] uppercase tracking-wider bg-secondary px-2 py-1 rounded-sm text-foreground/70">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                    О решении <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA banner */}
          <div className="mt-14 relative bg-[hsl(var(--ink))] rounded-sm p-8 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary rounded-full blur-3xl opacity-30" />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-3">// CALL_TO_ACTION</div>
                <h3 className="text-3xl lg:text-4xl font-extrabold text-background leading-tight text-balance">
                  Хотите повысить киберустойчивость <span className="text-primary">вашей компании?</span>
                </h3>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-7 rounded-sm font-bold uppercase tracking-wider text-xs shrink-0">
                Получить консультацию <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MSS SUBSCRIPTION SERVICES */}
      <section id="services" className="py-20 lg:py-28 bg-secondary/30">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <div className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-primary" /> SECTION / 02 — MSS
            </div>
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-balance">
              ИБ-сервисы <br className="hidden lg:block" />по подписке
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {services.map((s, i) => (
              <div
                key={i}
                className="group relative bg-background p-7 lg:p-8 hover:bg-[hsl(var(--ink))] hover:text-background transition-all duration-300 overflow-hidden"
              >
                <div className="font-mono text-[10px] text-muted-foreground group-hover:text-primary uppercase tracking-[0.25em] mb-6 transition-colors">
                  {s.code} / RED_SECURITY
                </div>
                <s.icon className="w-10 h-10 text-primary mb-8 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-extrabold leading-tight mb-1">RED Security</div>
                <div className="text-3xl font-extrabold text-primary mb-4">{s.name}</div>
                <div className="text-sm text-muted-foreground group-hover:text-background/70 mb-8 transition-colors">{s.desc}</div>
                <a href="#" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold group-hover:text-primary group-hover:gap-3 transition-all">
                  Подробнее <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-20 lg:py-28 bg-[hsl(var(--ink))] text-background relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl" />

        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-primary" /> SECTION / 03
              </div>
              <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance">
                Преимущества
                <br />
                <span className="text-gradient-red">RED Security</span>
              </h2>
              <p className="mt-6 text-background/70 text-lg leading-relaxed max-w-md">
                Непрерывный цикл снижения киберрисков и комплексный подход к информационной безопасности.
              </p>

              <div className="mt-10 inline-flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-sm px-4 py-3">
                <Radar className="w-5 h-5 text-primary" />
                <span className="font-mono text-xs uppercase tracking-wider text-background">24/7/365 · Защита</span>
              </div>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
              {advantages.map((a, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-6 bg-[hsl(var(--ink))] hover:bg-[hsl(var(--ink-2))] transition-colors group"
                >
                  <div className="w-10 h-10 bg-primary/15 text-primary rounded-sm flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <a.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-primary uppercase tracking-wider mb-1">0{i + 1}</div>
                    <div className="text-sm leading-snug">{a.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <div className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-primary" /> SECTION / 04
            </div>
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight">Кейсы</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {cases.map((c, i) => (
              <article
                key={i}
                className="group relative bg-card border border-border rounded-sm p-7 lg:p-8 hover:border-primary hover:shadow-[var(--shadow-red)] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 diag-stripes" />
                <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-5">CASE / 0{i + 1}</div>
                <div className="w-12 h-12 bg-secondary rounded-sm flex items-center justify-center mb-6 group-hover:bg-primary transition-colors corner-cut">
                  <Building2 className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-lg font-bold leading-tight mb-2">{c.title}</h3>
                <div className="text-sm text-muted-foreground mb-6">{c.sub}</div>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                  {c.metrics.map((m, j) => (
                    <div key={j}>
                      <div className="text-2xl lg:text-3xl font-extrabold text-primary tracking-tight">{m.v}</div>
                      <div className="text-xs text-muted-foreground mt-1">{m.l}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TELEGRAM CTA */}
      <section className="pb-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="relative bg-primary rounded-sm p-8 lg:p-14 text-primary-foreground overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute -right-16 -bottom-16 opacity-15">
              <Send className="w-72 h-72 float-y" />
            </div>
            <div className="relative grid lg:grid-cols-2 gap-6 items-center">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4 opacity-80">// TELEGRAM</div>
                <h3 className="text-3xl lg:text-4xl font-extrabold mb-3 leading-tight text-balance">
                  Помогаем компаниям стать киберустойчивыми
                </h3>
                <p className="text-primary-foreground/85 text-lg">
                  Как мы это делаем? Читайте в нашем Telegram.
                </p>
              </div>
              <div className="lg:justify-self-end">
                <Button size="lg" className="h-12 px-7 bg-background text-foreground hover:bg-background/90 rounded-sm font-bold uppercase tracking-wider text-xs">
                  <Send className="w-4 h-4" /> Подписаться
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEDIA / NEWS */}
      <section id="news" className="py-20 lg:py-28 bg-secondary/30">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <div className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-primary" /> SECTION / 05
              </div>
              <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight">Медиацентр</h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary hover:gap-3 transition-all border-b border-primary/30 pb-1">
              Все материалы <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {news.map((n, i) => (
              <a
                key={i}
                href="#"
                className="group bg-card border border-border rounded-sm p-7 lg:p-8 hover:border-primary hover:shadow-[var(--shadow-red)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-[10px] uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded-sm">
                    {n.tag}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">{n.date}</span>
                </div>
                <h3 className="text-lg font-bold leading-snug mb-6 flex-1 group-hover:text-primary transition-colors">
                  {n.title}
                </h3>
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-primary group-hover:gap-3 transition-all">
                  Читать <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-20 lg:py-28 bg-[hsl(var(--ink))] text-background relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl" />

        <div className="relative max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-primary" /> CONTACT
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                Получить <span className="text-gradient-red">консультацию</span>
              </h2>
              <p className="text-background/70 leading-relaxed mb-10">
                Оставьте заявку, и наши эксперты свяжутся с вами в ближайшее время
              </p>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-background/80">г. Москва, Проспект Андропова, д. 18, корп. 9</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <a href="mailto:request@redsecurity.ru" className="hover:text-primary text-background/80 font-mono">request@redsecurity.ru</a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-background/80 font-mono">+7 (495) 147-20-60</span>
                </div>
              </div>
            </div>

            <form className="lg:col-span-3 space-y-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-6 lg:p-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { ph: "Ваше ФИО", t: "text" },
                  { ph: "Компания", t: "text" },
                  { ph: "Телефон", t: "tel" },
                  { ph: "E-mail", t: "email" },
                ].map((f) => (
                  <input
                    key={f.ph}
                    type={f.t}
                    placeholder={f.ph}
                    required
                    className="h-12 px-4 rounded-sm border border-white/15 bg-white/5 text-background placeholder:text-background/40 focus:border-primary focus:bg-white/10 outline-none transition w-full"
                  />
                ))}
              </div>
              <textarea
                placeholder="Комментарий"
                rows={4}
                className="w-full px-4 py-3 rounded-sm border border-white/15 bg-white/5 text-background placeholder:text-background/40 focus:border-primary focus:bg-white/10 outline-none transition resize-none"
              />
              <label className="flex items-start gap-3 text-sm text-background/70 cursor-pointer">
                <input type="checkbox" required className="mt-1 accent-primary" />
                <span>Даю согласие на обработку персональных данных</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-background/70 cursor-pointer">
                <input type="checkbox" className="mt-1 accent-primary" />
                <span>Подписываюсь на информационную рассылку</span>
              </label>
              <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-sm font-bold uppercase tracking-wider text-xs">
                Отправить заявку <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="about" className="bg-[hsl(var(--ink-2))] text-background pt-16 pb-8 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center corner-cut">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="font-extrabold text-xl">
                  RED <span className="text-primary">Security</span>
                </div>
              </div>
              <p className="text-background/60 text-sm leading-relaxed mb-6 max-w-sm">
                Открытая экосистема ИБ-решений и экспертизы. Проактивная защита от киберугроз 24/7.
              </p>
              <div className="font-mono text-xs text-background/50 space-y-1">
                <div>+7 (495) 147-20-60</div>
                <div>request@redsecurity.ru</div>
              </div>
            </div>

            {[
              { title: "Сервисы", items: ["SOC", "Anti-DDoS", "WAF", "ГОСТ VPN", "MFA", "Awareness"] },
              { title: "Решения", items: ["Защита приложений", "Защита пользователей", "Мониторинг", "EDR", "Deception"] },
              { title: "Компания", items: ["О нас", "Контакты", "Новости", "События"] },
            ].map((col, i) => (
              <div key={i} className={`lg:col-span-${i === 2 ? 2 : 3}`}>
                <div className="font-mono text-[10px] mb-5 uppercase tracking-[0.25em] text-primary">// {col.title}</div>
                <ul className="space-y-2.5 text-sm text-background/70">
                  {col.items.map((it) => (
                    <li key={it}><a href="#" className="hover:text-primary transition-colors">{it}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 justify-between text-xs text-background/50 font-mono">
            <div>© 2026 ООО «Ред секьюрити». Все права защищены. 18+</div>
            <div className="flex gap-5 flex-wrap">
              <a href="#" className="hover:text-primary transition-colors">Политика обработки ПД</a>
              <a href="#" className="hover:text-primary transition-colors">Политика cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
