import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Shield, Activity, Zap, Lock, Bot, KeyRound, GraduationCap,
  ArrowRight, ArrowUpRight, ChevronRight, Phone, Mail, MapPin,
  Menu, X, Send, Calendar, Newspaper, Users, Layers, Network,
  Eye, AlertTriangle, CheckCircle2, Building2
} from "lucide-react";

const services = [
  { icon: Shield, name: "Anti-DDoS", desc: "Защита от DDoS-атак" },
  { icon: Lock, name: "WAF", desc: "Защита веб-приложений" },
  { icon: Bot, name: "AntiBot", desc: "Защита веб-сайтов и API от ботов" },
  { icon: KeyRound, name: "MFA", desc: "Многофакторная аутентификация" },
  { icon: Network, name: "ГОСТ VPN", desc: "Шифрование каналов связи" },
  { icon: GraduationCap, name: "Awareness", desc: "Повышение киберграмотности" },
];

const stats = [
  { value: "5 минут", label: "требуется злоумышленнику, чтобы зашифровать всю ИТ-инфраструктуру компании" },
  { value: ">8,6 млрд", label: "анализируемых SOC событий в сутки" },
  { value: ">140 тыс", label: "хакерских атак отразили специалисты RED Security SOC за 2025 г." },
];

const solutions = [
  {
    icon: Eye,
    title: "Мониторинг и реагирование на киберинциденты",
    desc: "Поможем обеспечить защиту ИТ-инфраструктуры и своевременное реагирование на инциденты ИБ в режиме 24/7/365",
    tags: ["SOC", "EDR", "MDR", "Deception"],
  },
  {
    icon: Layers,
    title: "Интеграционные решения",
    desc: "Интеграция ИБ-решений в любой ИТ-ландшафт независимо от уровня цифровой зрелости компании",
    tags: ["Сетевая безопасность", "Защита ИТ-инфраструктуры"],
  },
  {
    icon: Activity,
    title: "Сервисы кибербезопасности (MSS)",
    desc: "Передовые управляемые ИБ-сервисы под ключ, которые закрывают основные задачи кибербезопасности компании",
    tags: ["ANTI-DDOS", "WAF", "MFA", "ГОСТ VPN", "SA"],
  },
];

const advantages = [
  "Непрерывный цикл снижения киберрисков",
  "Комплексный подход к ИБ",
  "Интеграция ИБ-решений в любой ИТ-ландшафт",
  "Быстрое подключение MSS-сервисов на базе ведущих ИБ-решений",
  "Команда профессионалов из ведущих российских и зарубежных вендоров",
  "MSS-решения из защищенного облака",
  "Топовые эксперты в offensive/defensive",
];

const cases = [
  {
    title: "Подключение клиента к RED Security SOC",
    sub: "Образовательное учреждение с филиальной сетью",
    metrics: [{ v: "9", l: "филиалов" }, { v: ">16 млн ₽", l: "экономии на ФОТ в год" }],
  },
  {
    title: "Защита учётных записей сотрудников гипермаркета О'КЕЙ",
    sub: "RED Security MFA · Сеть гипермаркетов",
    metrics: [{ v: "14+ тыс.", l: "защищённых сотрудников" }, { v: "77+", l: "гипермаркетов в сети" }],
  },
  {
    title: "Защита удалённого доступа сотрудников ИТ-компании",
    sub: "RED Security MFA",
    metrics: [{ v: "10+ тыс.", l: "сотрудников" }, { v: "3 мес.", l: "срок реализации" }],
  },
];

const news = [
  { date: "16 апреля 2026", title: "RED Security получила награду «Сервис-провайдер года» от компании Xello" },
  { date: "10 апреля 2026", title: "RED Security: Женщины распознают фишинговые письма лучше мужчин" },
  { date: "26 марта 2025", title: "Время реагировать на кибератаки – вчера: проактивная защита SOC на примере кейсов" },
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
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-md flex items-center justify-center">
              <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" />
            </div>
            <div className="font-extrabold text-lg lg:text-xl tracking-tight">
              RED <span className="text-primary">Security</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <a href="#services" className="hover:text-primary transition-colors">ИБ-сервисы</a>
            <a href="#monitoring" className="hover:text-primary transition-colors">Мониторинг</a>
            <a href="#integration" className="hover:text-primary transition-colors">Интеграция</a>
            <a href="#audit" className="hover:text-primary transition-colors">Аудит</a>
            <a href="#news" className="hover:text-primary transition-colors">Новости</a>
            <a href="#about" className="hover:text-primary transition-colors">Компания</a>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-foreground/20">
              <Phone className="w-4 h-4" />
              SOC-помощь
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Запросить консультацию
            </Button>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="flex flex-col p-4 gap-3 text-sm font-medium">
              <a href="#services" onClick={() => setMenuOpen(false)}>ИБ-сервисы</a>
              <a href="#monitoring" onClick={() => setMenuOpen(false)}>Мониторинг</a>
              <a href="#integration" onClick={() => setMenuOpen(false)}>Интеграция</a>
              <a href="#audit" onClick={() => setMenuOpen(false)}>Аудит</a>
              <a href="#news" onClick={() => setMenuOpen(false)}>Новости</a>
              <a href="#about" onClick={() => setMenuOpen(false)}>Компания</a>
              <Button className="bg-primary mt-2">Запросить консультацию</Button>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="pt-28 lg:pt-36 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {/* SOC alert ribbon */}
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-full pl-2 pr-4 py-2 mb-8 group hover:bg-primary/10 transition-colors"
          >
            <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Скорая SOC-помощь
            </span>
            <span className="text-sm">Есть подозрение, что вашу компанию взломали?</span>
            <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
                <span className="text-primary">RED</span> Security
              </h1>
              <p className="mt-6 text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Открытая экосистема ИБ-решений и экспертизы для комплексной защиты бизнеса
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-6">
                  Получить консультацию
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-6">
                  Смотреть решения
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                  <Newspaper className="w-4 h-4" /> Новости
                </div>
                <div className="text-xs text-muted-foreground mb-2">10 апреля 2026</div>
                <div className="text-sm font-medium leading-snug mb-3">
                  RED Security: Женщины распознают фишинговые письма лучше мужчин
                </div>
                <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all">
                  Подробнее <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                  <Calendar className="w-4 h-4" /> События
                </div>
                <div className="text-sm text-muted-foreground">Сегодня событий нет</div>
                <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3 hover:gap-2 transition-all">
                  Календарь событий <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-16 lg:mt-24 grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {stats.map((s, i) => (
              <div key={i} className="bg-background p-6 lg:p-8">
                <div className="text-3xl lg:text-5xl font-extrabold text-primary mb-3 tracking-tight">{s.value}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="monitoring" className="py-16 lg:py-24 bg-secondary/40">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10 lg:mb-14">
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">Решения RED Security</h2>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              Смотреть все <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {solutions.map((s, i) => (
              <div
                key={i}
                className="group bg-card border border-border rounded-2xl p-6 lg:p-8 hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 leading-tight">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {s.tags.map((t) => (
                    <span key={t} className="text-xs font-semibold bg-secondary px-2.5 py-1 rounded-md text-muted-foreground">
                      #{t}
                    </span>
                  ))}
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                  О решении <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {/* CTA banner */}
          <div className="mt-12 bg-gradient-to-r from-foreground to-foreground/90 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-background mb-2">
                Хотите повысить киберустойчивость вашей компании?
              </h3>
              <p className="text-background/70">Эксперты RED Security помогут подобрать решение под ваши задачи</p>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-7 shrink-0">
              Получить консультацию <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* MSS SUBSCRIPTION SERVICES */}
      <section id="services" className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="mb-10 lg:mb-14">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">MSS</div>
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight max-w-3xl">
              ИБ-сервисы по подписке
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div
                key={i}
                className="group relative bg-card border border-border rounded-2xl p-6 overflow-hidden hover:border-primary transition-all"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/15 transition-colors" />
                <div className="relative">
                  <div className="text-xs text-muted-foreground mb-4">RED Security {s.name}</div>
                  <s.icon className="w-10 h-10 text-primary mb-6" />
                  <div className="text-2xl font-extrabold mb-1">RED Security</div>
                  <div className="text-2xl font-extrabold text-primary mb-3">{s.name}</div>
                  <div className="text-sm text-muted-foreground mb-6">{s.desc}</div>
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-bold group-hover:text-primary group-hover:gap-3 transition-all">
                    Подробнее <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-16 lg:py-24 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Почему мы</div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Преимущества <span className="text-primary">RED Security</span>
              </h2>
              <p className="mt-6 text-background/70 text-lg leading-relaxed">
                Непрерывный цикл снижения киберрисков и комплексный подход к информационной безопасности
              </p>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {advantages.map((a, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-5 rounded-xl bg-background/5 border border-background/10 hover:border-primary/50 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-sm leading-snug">{a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="mb-10 lg:mb-14">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Опыт</div>
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">Кейсы</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {cases.map((c, i) => (
              <article
                key={i}
                className="group bg-card border border-border rounded-2xl p-6 lg:p-8 hover:border-primary hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <Building2 className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-lg font-bold leading-tight mb-2">{c.title}</h3>
                <div className="text-sm text-muted-foreground mb-6">{c.sub}</div>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                  {c.metrics.map((m, j) => (
                    <div key={j}>
                      <div className="text-2xl font-extrabold text-primary">{m.v}</div>
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
      <section className="py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="bg-primary rounded-3xl p-8 lg:p-14 text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <Send className="absolute -right-10 -bottom-10 w-72 h-72" />
            </div>
            <div className="relative grid lg:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-3xl lg:text-4xl font-extrabold mb-3 leading-tight">
                  Помогаем компаниям стать киберустойчивыми
                </h3>
                <p className="text-primary-foreground/80 text-lg">
                  Как мы это делаем? Читайте в нашем Telegram.
                </p>
              </div>
              <div className="lg:justify-self-end">
                <Button size="lg" variant="secondary" className="h-12 px-7 bg-background text-foreground hover:bg-background/90">
                  <Send className="w-4 h-4" /> Подписаться
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEDIA / NEWS */}
      <section id="news" className="py-16 lg:py-24 bg-secondary/40">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10 lg:mb-14">
            <div>
              <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Медиацентр</div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">Узнать больше</h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              Все материалы <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {news.map((n, i) => (
              <a
                key={i}
                href="#"
                className="group bg-card border border-border rounded-2xl p-6 lg:p-8 hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="text-xs text-muted-foreground mb-4">{n.date}</div>
                <h3 className="text-lg font-bold leading-snug mb-6 flex-1">{n.title}</h3>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                  Подробнее <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-16 lg:py-24">
        <div className="max-w-[1100px] mx-auto px-4 lg:px-8">
          <div className="bg-card border border-border rounded-3xl p-6 lg:p-12 shadow-sm">
            <div className="grid lg:grid-cols-5 gap-10">
              <div className="lg:col-span-2">
                <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
                  Получить консультацию
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Оставьте заявку, и наши эксперты свяжутся с вами в ближайшее время
                </p>
                <div className="mt-8 space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>г. Москва, Проспект Андропова, дом 18, корпус 9</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <a href="mailto:request@redsecurity.ru" className="hover:text-primary">request@redsecurity.ru</a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>+7 (495) 147-20-60</span>
                  </div>
                </div>
              </div>

              <form className="lg:col-span-3 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Ваше ФИО"
                    required
                    className="h-12 px-4 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition w-full"
                  />
                  <input
                    type="text"
                    placeholder="Компания"
                    required
                    className="h-12 px-4 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition w-full"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    required
                    className="h-12 px-4 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition w-full"
                  />
                  <input
                    type="email"
                    placeholder="E-mail"
                    required
                    className="h-12 px-4 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition w-full"
                  />
                </div>
                <textarea
                  placeholder="Комментарий"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
                />
                <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
                  <input type="checkbox" required className="mt-1 accent-primary" />
                  <span>Даю согласие на обработку персональных данных</span>
                </label>
                <label className="flex items-start gap-3 text-sm text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="mt-1 accent-primary" />
                  <span>Подписываюсь на информационную рассылку</span>
                </label>
                <Button size="lg" className="bg-primary hover:bg-primary/90 h-12 px-8">
                  Отправить <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="font-extrabold text-xl">
                  RED <span className="text-primary">Security</span>
                </div>
              </div>
              <p className="text-background/60 text-sm leading-relaxed mb-6">
                RED Security — проактивная защита от киберугроз. Открытая экосистема ИБ-решений и экспертизы.
              </p>
              <div className="text-sm text-background/60 space-y-1">
                <div>+7 (495) 147-20-60</div>
                <div>request@redsecurity.ru</div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="font-bold mb-4 text-sm uppercase tracking-wider text-primary">Сервисы</div>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-primary transition-colors">SOC</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Anti-DDoS</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">WAF</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">ГОСТ VPN</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">MFA</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Awareness</a></li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <div className="font-bold mb-4 text-sm uppercase tracking-wider text-primary">Решения</div>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-primary transition-colors">Защита приложений</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Защита пользователей</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Мониторинг и реагирование</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">EDR</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Deception</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <div className="font-bold mb-4 text-sm uppercase tracking-wider text-primary">Компания</div>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Новости</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">События</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row gap-4 justify-between text-xs text-background/50">
            <div>© ООО «Ред секьюрити». Все права защищены. 18+</div>
            <div className="flex gap-5">
              <a href="#" className="hover:text-primary transition-colors">Политика обработки персональных данных</a>
              <a href="#" className="hover:text-primary transition-colors">Политика обработки cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
