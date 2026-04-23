import { describe, it, expect, beforeEach } from "vitest";
import { updateHead, type PageData } from "@/pages/PageRenderer";

const make = (over: Partial<PageData> = {}): PageData => ({
  title: "T",
  description: "D",
  keywords: "k1,k2",
  canonical: "https://www.vortex1.ru/x",
  og: { title: "OT", description: "OD", image: "/site/og.png", url: "https://www.vortex1.ru/x", type: "website" },
  jsonld: [{ "@context": "https://schema.org", "@type": "WebPage", name: "x" }],
  html: "<p>x</p>",
  ...over,
});

const sel = (s: string) => document.head.querySelector<HTMLElement>(s);

describe("updateHead", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.title = "";
  });

  it("writes title and all meta/og/canonical", () => {
    updateHead(make());
    expect(document.title).toBe("T");
    expect(sel('meta[name="description"]')?.getAttribute("content")).toBe("D");
    expect(sel('meta[name="keywords"]')?.getAttribute("content")).toBe("k1,k2");
    expect(sel('link[rel="canonical"]')?.getAttribute("href")).toBe("https://www.vortex1.ru/x");
    expect(sel('meta[property="og:title"]')?.getAttribute("content")).toBe("OT");
    expect(sel('meta[property="og:image"]')?.getAttribute("content")).toBe("/site/og.png");
  });

  it("removes stale meta when next page has no value", () => {
    updateHead(make({ keywords: "alpha", description: "first" }));
    expect(sel('meta[name="keywords"]')).not.toBeNull();
    updateHead(make({ keywords: "", description: "" }));
    expect(sel('meta[name="keywords"]')).toBeNull();
    expect(sel('meta[name="description"]')).toBeNull();
  });

  it("replaces JSON-LD between pages instead of stacking", () => {
    updateHead(make({ jsonld: [{ a: 1 }, { a: 2 }] }));
    expect(document.querySelectorAll('script[data-vortex="vortex-jsonld"]').length).toBe(2);
    updateHead(make({ jsonld: [{ b: 1 }] }));
    const nodes = document.querySelectorAll('script[data-vortex="vortex-jsonld"]');
    expect(nodes.length).toBe(1);
    expect(nodes[0].textContent).toContain('"b":1');
  });

  it("clears stale og:* when next page omits them", () => {
    updateHead(make());
    expect(sel('meta[property="og:image"]')).not.toBeNull();
    updateHead(make({ og: { title: "", description: "", image: "", url: "", type: "" } }));
    expect(sel('meta[property="og:image"]')).toBeNull();
    expect(sel('meta[property="og:title"]')).toBeNull();
  });
});
