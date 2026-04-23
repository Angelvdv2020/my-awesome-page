import { Button } from "@/components/ui/button";
import {
  Shield, Zap, Bot, KeyRound, Lock, GraduationCap, Activity,
  Eye, Network, FileSearch, ArrowRight, Phone, Mail, MapPin,
  AlertTriangle, ChevronRight, Server, Database, Globe
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import case1 from "@/assets/case-1.jpg";
import case2 from "@/assets/case-2.jpg";

const services = [
  { icon: Shield, code: "MSS-01", title: "Anti-DDoS", desc: "Защита от DDoS-атак любой мощности и сложности" },
  { icon: Globe, code: "MSS-02", title: "WAF", desc: "Защита веб-приложений и API от L7-атак" },
  { icon: Bot, code: "MSS-03", title: "Antibot", desc: "Защита веб-сайтов и API от вредоносных ботов" },
  { icon: KeyRound, code: "MSS-04", title: "MFA", desc: "Многофакторная аутентификация пользователей" },
  { icon: Lock, code: "MSS-05", title: "ГОСТ VPN", desc: "Шифрование каналов связи по российским стандартам" },
  { icon: GraduationCap, code: "MSS-06", title: "Awareness", desc: "Повышение киберграмотности сотрудников" },
];

const monitoring = [
  { icon: Activity, code: "MDR-01", title: "SOC", desc: "Центр мониторинга кибербезопасности 24/7" },
  { icon: Server, code: "MDR-02", title: "EDR", desc: "Защита и контроль конечных точек" },
  { icon: Eye, code: "MDR-03", title: "MDR", desc: "Мониторинг и реагирование на киберинциденты" },
  { icon: Network, code: "MDR-04", title: "Deception", desc: "Раннее обнаружение направленных атак" },
  { icon: FileSearch, code: "MDR-05", title: "Аудит", desc: "Аудит и консалтинг в области ИБ" },
  { icon: Database, code: "MDR-06", title: "Интеграция", desc: "Интеграция средств защиты под ключ" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[hsl(var(--ink))] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[hsl(var(--ink))]/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-primary corner-cut">
              <Shield className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-black tracking-tight">RED <span className="text-primary">SECURITY</span></div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Cyber defense / 24·7</div>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-white/70 lg:flex">
            <a href="#services" className="hover:text-white">Сервисы</a>
            <a href="#monitoring" className="hover:text-white">Мониторинг</a>
            <a href="#cases" className="hover:text-white">Кейсы</a>
            <a href="#contact" className="hover:text-white">Контакты</a>
          </nav>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href="#contact">Консультация <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 radial-red" />
        <div className="absolute inset-0 diag-stripes opacity-50" />

        <div className="container relative mx-auto grid gap-12 px-6 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-3 border border-primary/40 bg-primary/10 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-primary pulse-dot" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">SOC · ONLINE · 24/7</span>
            </div>
            <h1 className="mb-6 text-balance text-5xl font-black leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Проактивная<br />защита от<br />
              <span className="text-gradient-red">киберугроз</span>
            </h1>
            <p className="mb-10 max-w-xl text-lg text-white/70">
              Открытая экосистема ИБ-решений и экспертизы для комплексной защиты бизнеса.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Решения RED Security <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                <AlertTriangle className="mr-2 h-5 w-5 text-primary" /> Скорая SOC-помощь
              </Button>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative overflow-hidden corner-cut ring-glow scan-line">
              <img src={heroImg} alt="Центр мониторинга кибербезопасности" className="h-[420px] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase">
                <div className="border border-white/20 bg-black/40 p-2 backdrop-blur"><div className="text-white/50">UPTIME</div><div className="text-primary">99.99%</div></div>
                <div className="border border-white/20 bg-black/40 p-2 backdrop-blur"><div className="text-white/50">EVENTS/D</div><div className="text-primary">8.6B</div></div>
                <div className="border border-white/20 bg-black/40 p-2 backdrop-blur"><div className="text-white/50">BLOCKED</div><div className="text-primary">140K+</div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-white/10 bg-black/40">
          <div className="container mx-auto grid gap-px bg-white/5 px-6 md:grid-cols-3">
            {[
              { v: "5 мин", l: "требуется злоумышленнику, чтобы зашифровать всю ИТ-инфраструктуру" },
              { v: ">8,6 млрд", l: "анализируемых SOC событий в сутки" },
              { v: ">140 тыс", l: "хакерских атак отразили специалисты RED Security SOC за 2025 г." },
            ].map((s, i) => (
              <div key={i} className="bg-[hsl(var(--ink))] p-8">
                <div className="font-mono text-xs uppercase tracking-widest text-primary">// stat / {String(i + 1).padStart(2, "0")}</div>
                <div className="mt-3 text-4xl font-black md:text-5xl">{s.v}</div>
                <div className="mt-2 text-sm text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-b border-white/10 py-24">
        <div className="container mx-auto px-6">
          <div className="mb-14 flex items-end justify-between gap-8">
            <div>
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">// section / 01 — services</div>
              <h2 className="max-w-2xl text-4xl font-black md:text-5xl">ИБ-сервисы по подписке</h2>
            </div>
            <div className="hidden text-sm text-white/50 md:block">Подключение за 1 день · Без CAPEX · 24/7 поддержка</div>
          </div>

          <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.code} className="group relative overflow-hidden bg-[hsl(var(--ink))] p-8 transition-all hover:bg-[hsl(var(--ink-2))]">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-3xl transition-all group-hover:bg-primary/30" />
                <div className="relative">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center border border-primary/40 bg-primary/10 text-primary">
                      <s.icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-[11px] tracking-widest text-white/40">{s.code}</span>
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">{s.title}</h3>
                  <p className="text-sm text-white/60">{s.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm text-primary opacity-0 transition group-hover:opacity-100">
                    Подробнее <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monitoring */}
      <section id="monitoring" className="relative overflow-hidden border-b border-white/10 py-24">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="container relative mx-auto px-6">
          <div className="mb-14">
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">// section / 02 — monitoring & response</div>
            <h2 className="max-w-3xl text-4xl font-black md:text-5xl">Мониторинг и реагирование на кибератаки</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {monitoring.map((m) => (
              <div key={m.code} className="group relative border border-white/10 bg-black/40 p-8 transition-all hover:border-primary/40">
                <div className="mb-6 flex items-center justify-between">
                  <m.icon className="h-7 w-7 text-primary" />
                  <span className="font-mono text-[11px] tracking-widest text-white/40">{m.code}</span>
                </div>
                <h3 className="mb-2 text-xl font-bold">{m.title}</h3>
                <p className="text-sm text-white/60">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="border-b border-white/10 bg-[hsl(var(--ink-2))] py-24">
        <div className="container mx-auto px-6">
          <div className="mb-14">
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">// section / 03 — case studies</div>
            <h2 className="text-4xl font-black md:text-5xl">Кейсы</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {[
              { img: case1, title: "Подключение клиента к RED Security SOC", sub: "Образовательное учреждение с филиальной сетью", stats: [["9", "филиалов"], ["16+ млн ₽", "экономии на ФОТ/год"]] },
              { img: case2, title: "Защита учётных записей сети «О'КЕЙ»", sub: "Сеть гипермаркетов — внедрение MFA", stats: [["14+ тыс", "защищённых учёток"], ["77+", "гипермаркетов"]] },
            ].map((c, i) => (
              <article key={i} className="group overflow-hidden border border-white/10 bg-[hsl(var(--ink))]">
                <div className="relative h-64 overflow-hidden">
                  <img src={c.img} alt={c.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--ink))] via-[hsl(var(--ink))]/40 to-transparent" />
                  <div className="absolute left-4 top-4 border border-primary/50 bg-primary/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur">Case · {String(i + 1).padStart(2, "0")}</div>
                </div>
                <div className="p-8">
                  <h3 className="mb-2 text-2xl font-bold">{c.title}</h3>
                  <p className="mb-6 text-sm text-white/60">{c.sub}</p>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                    {c.stats.map(([v, l]) => (
                      <div key={l}>
                        <div className="text-2xl font-black text-primary">{v}</div>
                        <div className="text-xs text-white/50">{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-b border-white/10 py-20">
        <div className="absolute inset-0 radial-red opacity-70" />
        <div className="container relative mx-auto px-6 text-center">
          <h2 className="mx-auto max-w-3xl text-4xl font-black md:text-6xl">
            Хотите повысить <span className="text-gradient-red">киберустойчивость</span> вашей компании?
          </h2>
          <Button asChild size="lg" className="mt-8 bg-primary px-10 hover:bg-primary/90">
            <a href="#contact">Получить консультацию <ArrowRight className="ml-2 h-5 w-5" /></a>
          </Button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="container relative mx-auto grid gap-12 px-6 lg:grid-cols-2">
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">// section / 04 — contact</div>
            <h2 className="mb-6 text-4xl font-black md:text-5xl">Получить консультацию</h2>
            <p className="mb-10 max-w-md text-white/60">Расскажите о вашей задаче — эксперт RED Security свяжется в течение рабочего дня.</p>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4"><MapPin className="mt-1 h-5 w-5 text-primary" /><span>г. Москва, Проспект Андропова, дом 18, корпус 9</span></li>
              <li className="flex items-start gap-4"><Mail className="mt-1 h-5 w-5 text-primary" /><a href="mailto:request@redsecurity.ru" className="hover:text-primary">request@redsecurity.ru</a></li>
              <li className="flex items-start gap-4"><Phone className="mt-1 h-5 w-5 text-primary" /><a href="tel:+74951472060" className="hover:text-primary">+7 (495) 147-20-60</a></li>
            </ul>
          </div>

          <form className="border border-white/10 bg-black/40 p-8 backdrop-blur" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-primary">// form / contact-request</div>
            <div className="space-y-4">
              <input type="text" placeholder="Ваше ФИО" className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 focus:border-primary focus:outline-none" />
              <input type="text" placeholder="Компания" className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 focus:border-primary focus:outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 focus:border-primary focus:outline-none" />
                <input type="email" placeholder="name@company.com" className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 focus:border-primary focus:outline-none" />
              </div>
              <textarea placeholder="Комментарий" rows={4} className="w-full border border-white/10 bg-white/5 px-4 py-3 text-sm placeholder:text-white/40 focus:border-primary focus:outline-none" />
              <label className="flex items-start gap-3 text-xs text-white/60">
                <input type="checkbox" className="mt-1 accent-primary" />
                Даю согласие на обработку персональных данных
              </label>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Отправить заявку <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/60 py-12">
        <div className="container mx-auto grid gap-8 px-6 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-primary corner-cut"><Shield className="h-5 w-5" strokeWidth={2.5} /></div>
              <div className="text-lg font-black">RED <span className="text-primary">SECURITY</span></div>
            </div>
            <p className="mt-4 text-xs text-white/40">ООО «Ред секьюрити». Все права защищены. 18+</p>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-white/40">Сервисы</div>
            <ul className="space-y-2 text-sm text-white/60">
              <li>SOC</li><li>Anti-DDoS</li><li>WAF</li><li>MFA</li><li>ГОСТ VPN</li>
            </ul>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-white/40">Решения</div>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Защита приложений</li><li>Защита пользователей</li><li>Мониторинг и реагирование</li>
            </ul>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-white/40">Компания</div>
            <ul className="space-y-2 text-sm text-white/60">
              <li>О нас</li><li>Контакты</li><li>Новости</li><li>События</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
