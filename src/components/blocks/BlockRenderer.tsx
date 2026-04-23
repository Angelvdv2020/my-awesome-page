import { Link } from "react-router-dom";
import { Icon } from "./icons";
import type { Block } from "@/content/types";
import { ArrowRight, Check } from "lucide-react";

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`max-w-7xl mx-auto px-6 ${className}`}>{children}</div>
);

const CTAButton = ({ href, children, variant = "primary" }:
  { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) => {
  const cls = variant === "primary"
    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-red)]"
    : "bg-white/10 text-white hover:bg-white/20 border border-white/20";
  return (
    <Link to={href} className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-sm transition ${cls}`}>
      {children} <ArrowRight className="w-4 h-4" />
    </Link>
  );
};

export const BlockRenderer = ({ block }: { block: Block }) => {
  switch (block.type) {
    case "hero":
      return (
        <section className="relative overflow-hidden bg-[hsl(var(--ink))] text-white py-20 md:py-28 grid-bg">
          <div className="absolute inset-0 radial-red opacity-60" />
          <Container className="relative">
            {block.eyebrow && (
              <div className="inline-block text-xs font-mono tracking-widest text-primary uppercase mb-4 px-3 py-1 border border-primary/40 rounded">
                {block.eyebrow}
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight max-w-4xl text-balance">
              {block.title}
            </h1>
            {block.subtitle && (
              <p className="mt-5 text-lg md:text-xl text-white/70 max-w-2xl text-balance">{block.subtitle}</p>
            )}
            {block.bullets && (
              <ul className="mt-6 grid sm:grid-cols-2 gap-2 max-w-2xl">
                {block.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            )}
            {(block.primaryCta || block.secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {block.primaryCta && <CTAButton href={block.primaryCta.href}>{block.primaryCta.label}</CTAButton>}
                {block.secondaryCta && <CTAButton href={block.secondaryCta.href} variant="ghost">{block.secondaryCta.label}</CTAButton>}
              </div>
            )}
          </Container>
        </section>
      );

    case "features":
      return (
        <section className="py-16 md:py-20 bg-[hsl(var(--ink))] text-white">
          <Container>
            {block.title && <h2 className="text-3xl md:text-4xl font-black mb-3 text-balance">{block.title}</h2>}
            {block.subtitle && <p className="text-white/60 max-w-2xl mb-10">{block.subtitle}</p>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {block.items.map((it, i) => (
                <div key={i} className="p-6 rounded-lg border border-white/10 bg-white/[0.03] hover:border-primary/40 transition">
                  <Icon name={it.icon} className="w-7 h-7 text-primary mb-3" />
                  <h3 className="font-bold mb-1">{it.title}</h3>
                  <p className="text-sm text-white/60">{it.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      );

    case "pricing":
      return (
        <section className="py-16 md:py-20 bg-[hsl(var(--ink-2))] text-white">
          <Container>
            {block.title && <h2 className="text-3xl md:text-4xl font-black mb-3 text-balance">{block.title}</h2>}
            {block.subtitle && <p className="text-white/60 max-w-2xl mb-10">{block.subtitle}</p>}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {block.plans.map((p, i) => (
                <div key={i} className={`p-6 rounded-lg border flex flex-col ${
                  p.highlighted ? "border-primary bg-primary/5 ring-glow" : "border-white/10 bg-white/[0.03]"
                }`}>
                  <div className="text-sm font-mono text-white/60 uppercase tracking-wider">{p.name}</div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-black">{p.price}</span>
                    {p.period && <span className="text-sm text-white/50">/{p.period}</span>}
                  </div>
                  <ul className="mt-5 space-y-2 text-sm text-white/80 flex-1">
                    {p.perks.map((perk, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" /> {perk}
                      </li>
                    ))}
                  </ul>
                  {p.cta && (
                    <Link to={p.cta.href} className={`mt-6 inline-flex justify-center px-4 py-2.5 rounded-md text-sm font-semibold transition ${
                      p.highlighted
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-white/10 hover:bg-white/20"
                    }`}>{p.cta.label}</Link>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      );

    case "routers":
      return (
        <section className="py-16 md:py-20 bg-[hsl(var(--ink))] text-white">
          <Container>
            {block.title && <h2 className="text-3xl md:text-4xl font-black mb-3 text-balance">{block.title}</h2>}
            {block.subtitle && <p className="text-white/60 max-w-2xl mb-10">{block.subtitle}</p>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {block.items.map((r, i) => (
                <div key={i} className="p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent flex flex-col">
                  <Icon name="router" className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-black">{r.name}</h3>
                  <p className="text-sm text-white/60 mt-1">{r.tagline}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-white/70 flex-1">
                    {r.specs.map((s, j) => <li key={j} className="flex gap-2"><span className="text-primary">•</span> {s}</li>)}
                  </ul>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-2xl font-black">{r.price}</span>
                    {r.cta && <Link to={r.cta.href} className="text-sm font-semibold text-primary hover:text-primary-glow inline-flex items-center gap-1">{r.cta.label} <ArrowRight className="w-3.5 h-3.5" /></Link>}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      );

    case "use-cases":
      return (
        <section className="py-16 md:py-20 bg-[hsl(var(--ink-2))] text-white">
          <Container>
            {block.title && <h2 className="text-3xl md:text-4xl font-black mb-3 text-balance">{block.title}</h2>}
            {block.subtitle && <p className="text-white/60 max-w-2xl mb-10">{block.subtitle}</p>}
            <div className="grid md:grid-cols-2 gap-4">
              {block.items.map((it, i) => (
                <div key={i} className="p-6 rounded-lg border border-white/10 flex gap-4">
                  <Icon name={it.icon} className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg">{it.title}</h3>
                    <p className="text-sm text-white/60 mt-1">{it.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      );

    case "steps":
      return (
        <section className="py-16 md:py-20 bg-[hsl(var(--ink))] text-white">
          <Container>
            {block.title && <h2 className="text-3xl md:text-4xl font-black mb-10 text-balance">{block.title}</h2>}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {block.items.map((s, i) => (
                <div key={i} className="relative p-6 rounded-lg border border-white/10">
                  <div className="text-4xl font-black text-primary/30 font-mono">0{i + 1}</div>
                  <h3 className="font-bold mt-2">{s.title}</h3>
                  <p className="text-sm text-white/60 mt-1">{s.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      );

    case "faq":
      return (
        <section className="py-16 md:py-20 bg-[hsl(var(--ink))] text-white">
          <Container>
            {block.title && <h2 className="text-3xl md:text-4xl font-black mb-10 text-balance">{block.title}</h2>}
            <div className="max-w-3xl divide-y divide-white/10 border-y border-white/10">
              {block.items.map((it, i) => (
                <details key={i} className="group py-5">
                  <summary className="cursor-pointer list-none flex items-center justify-between font-semibold">
                    {it.q}
                    <span className="text-primary text-2xl group-open:rotate-45 transition">+</span>
                  </summary>
                  <p className="mt-3 text-white/70 text-sm leading-relaxed">{it.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      );

    case "cta":
      return (
        <section className="py-16 md:py-20 bg-[hsl(var(--ink))] text-white">
          <Container>
            <div className="rounded-2xl p-8 md:p-12 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-primary/30">
              <h2 className="text-3xl md:text-4xl font-black text-balance">{block.title}</h2>
              {block.subtitle && <p className="mt-3 text-white/70 max-w-2xl">{block.subtitle}</p>}
              <div className="mt-6 flex flex-wrap gap-3">
                {block.primaryCta && <CTAButton href={block.primaryCta.href}>{block.primaryCta.label}</CTAButton>}
                {block.secondaryCta && <CTAButton href={block.secondaryCta.href} variant="ghost">{block.secondaryCta.label}</CTAButton>}
              </div>
            </div>
          </Container>
        </section>
      );

    case "text":
      return (
        <section className="py-12 md:py-16 bg-[hsl(var(--ink))] text-white">
          <Container>
            {block.title && <h2 className="text-2xl md:text-3xl font-black mb-6">{block.title}</h2>}
            <div className="max-w-3xl space-y-4 text-white/75 leading-relaxed">
              {block.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Container>
        </section>
      );

    case "stats":
      return (
        <section className="py-12 bg-[hsl(var(--ink-2))] text-white border-y border-white/10">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {block.items.map((s, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-black text-primary">{s.value}</div>
                  <div className="text-sm text-white/60 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      );

    case "logos":
      return (
        <section className="py-12 bg-[hsl(var(--ink))] text-white">
          <Container>
            {block.title && <p className="text-center text-sm text-white/50 uppercase tracking-widest font-mono mb-6">{block.title}</p>}
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
              {block.items.map((l, i) => (
                <div key={i} className="text-white/40 font-bold text-lg">{l}</div>
              ))}
            </div>
          </Container>
        </section>
      );

    case "contacts":
      return (
        <section className="py-16 md:py-20 bg-[hsl(var(--ink))] text-white">
          <Container>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
              <div className="space-y-4">
                {block.email && (
                  <div className="flex items-center gap-3"><Icon name="mail" className="w-5 h-5 text-primary" />
                    <a href={`mailto:${block.email}`} className="hover:text-primary">{block.email}</a></div>
                )}
                {block.telegram && (
                  <div className="flex items-center gap-3"><Icon name="telegram" className="w-5 h-5 text-primary" />
                    <a href={block.telegram} className="hover:text-primary">Telegram</a></div>
                )}
                {block.vk && (
                  <div className="flex items-center gap-3"><Icon name="users" className="w-5 h-5 text-primary" />
                    <a href={block.vk} className="hover:text-primary">VK</a></div>
                )}
                {block.hours && (
                  <div className="flex items-center gap-3"><Icon name="clock" className="w-5 h-5 text-primary" />{block.hours}</div>
                )}
              </div>
              {block.note && <p className="text-white/70">{block.note}</p>}
            </div>
          </Container>
        </section>
      );

    case "legal":
      return (
        <section className="py-16 md:py-20 bg-[hsl(var(--ink))] text-white">
          <Container>
            <h1 className="text-3xl md:text-4xl font-black mb-2">{block.title}</h1>
            {block.updatedAt && <p className="text-white/50 text-sm mb-10">Действует с {block.updatedAt}</p>}
            <div className="max-w-3xl space-y-8">
              {block.sections.map((sec, i) => (
                <div key={i}>
                  <h2 className="text-xl font-bold mb-3">{sec.heading}</h2>
                  <div className="space-y-3 text-white/75 leading-relaxed">
                    {sec.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      );

    case "blog-index":
      return (
        <section className="py-16 md:py-20 bg-[hsl(var(--ink))] text-white">
          <Container>
            {block.title && <h1 className="text-3xl md:text-4xl font-black mb-3 text-balance">{block.title}</h1>}
            {block.subtitle && <p className="text-white/60 max-w-2xl mb-10">{block.subtitle}</p>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {block.items.map((p, i) => (
                <Link key={i} to={p.href} className="block p-6 rounded-lg border border-white/10 bg-white/[0.03] hover:border-primary/40 transition group">
                  {p.tag && <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">{p.tag}</div>}
                  <h3 className="font-bold text-lg group-hover:text-primary transition">{p.title}</h3>
                  <p className="text-sm text-white/60 mt-2">{p.excerpt}</p>
                  {p.date && <div className="text-xs text-white/40 mt-4">{p.date}</div>}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      );

    case "blog-post":
      return (
        <article className="py-16 md:py-20 bg-[hsl(var(--ink))] text-white">
          <Container>
            <div className="max-w-3xl">
              {block.tag && <div className="text-xs font-mono uppercase tracking-wider text-primary mb-4">{block.tag}</div>}
              <h1 className="text-3xl md:text-5xl font-black text-balance">{block.title}</h1>
              {block.date && <div className="text-sm text-white/50 mt-3">{block.date}</div>}
              {block.lead && <p className="mt-6 text-lg text-white/80 leading-relaxed">{block.lead}</p>}
              <div className="mt-10 space-y-8">
                {block.sections.map((sec, i) => (
                  <div key={i}>
                    {sec.heading && <h2 className="text-2xl font-bold mb-3">{sec.heading}</h2>}
                    <div className="space-y-3 text-white/75 leading-relaxed">
                      {sec.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </article>
      );

    default:
      return null;
  }
};
