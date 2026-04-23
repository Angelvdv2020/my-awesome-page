// Structured page content schema for VORTEX VPN site.
// Each page = ordered list of typed blocks. No raw HTML, no legacy DOM.

export type Block =
  | HeroBlock
  | FeatureGridBlock
  | PricingBlock
  | RouterCatalogBlock
  | UseCasesBlock
  | StepsBlock
  | FAQBlock
  | CTABlock
  | TextBlock
  | StatsBlock
  | LogosBlock
  | ContactsBlock
  | LegalBlock
  | BlogIndexBlock
  | BlogPostBlock;

export interface HeroBlock {
  type: "hero";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  bullets?: string[];
}

export interface FeatureGridBlock {
  type: "features";
  title?: string;
  subtitle?: string;
  items: { icon?: string; title: string; text: string }[];
}

export interface PricingBlock {
  type: "pricing";
  title?: string;
  subtitle?: string;
  plans: {
    name: string;
    price: string;
    period?: string;
    perks: string[];
    highlighted?: boolean;
    cta?: { label: string; href: string };
  }[];
}

export interface RouterCatalogBlock {
  type: "routers";
  title?: string;
  subtitle?: string;
  items: {
    name: string;
    tagline: string;
    specs: string[];
    price: string;
    cta?: { label: string; href: string };
  }[];
}

export interface UseCasesBlock {
  type: "use-cases";
  title?: string;
  subtitle?: string;
  items: { icon?: string; title: string; text: string }[];
}

export interface StepsBlock {
  type: "steps";
  title?: string;
  items: { title: string; text: string }[];
}

export interface FAQBlock {
  type: "faq";
  title?: string;
  items: { q: string; a: string }[];
}

export interface CTABlock {
  type: "cta";
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export interface TextBlock {
  type: "text";
  title?: string;
  paragraphs: string[];
}

export interface StatsBlock {
  type: "stats";
  items: { value: string; label: string }[];
}

export interface LogosBlock {
  type: "logos";
  title?: string;
  items: string[]; // text labels — no third-party brand assets
}

export interface ContactsBlock {
  type: "contacts";
  email?: string;
  telegram?: string;
  vk?: string;
  hours?: string;
  note?: string;
}

export interface LegalBlock {
  type: "legal";
  title: string;
  updatedAt?: string;
  sections: { heading: string; paragraphs: string[] }[];
}

export interface BlogIndexBlock {
  type: "blog-index";
  title?: string;
  subtitle?: string;
  items: { title: string; excerpt: string; href: string; date?: string; tag?: string }[];
}

export interface BlogPostBlock {
  type: "blog-post";
  title: string;
  date?: string;
  tag?: string;
  lead?: string;
  sections: { heading?: string; paragraphs: string[] }[];
}

export interface StructuredPage {
  version: 2;
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  og: { title: string; description: string; image: string; url: string; type: string };
  jsonld?: unknown[];
  blocks: Block[];
}

// Legacy HTML page (will be migrated). Kept for fallback during transition.
export interface LegacyPage {
  version?: 1;
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  og: { title: string; description: string; image: string; url: string; type: string };
  jsonld?: unknown[];
  html: string;
}

export type AnyPage = StructuredPage | LegacyPage;

export const isStructured = (p: AnyPage): p is StructuredPage =>
  (p as StructuredPage).version === 2 && Array.isArray((p as StructuredPage).blocks);
