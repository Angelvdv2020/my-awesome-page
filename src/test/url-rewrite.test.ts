import { describe, it, expect } from "vitest";
import { rewriteHref, rewriteAsset, CANONICAL_HOST } from "@/lib/url-rewrite";

describe("rewriteHref", () => {
  it("strips legacy host", () => {
    expect(rewriteHref("https://Vortex.ru/about.html")).toBe("/about");
  });
  it("converts .html to clean URL", () => {
    expect(rewriteHref("/services/edr.html")).toBe("/services/edr");
  });
  it("preserves mailto/tel/anchor", () => {
    expect(rewriteHref("mailto:a@b.c")).toBe("mailto:a@b.c");
    expect(rewriteHref("#top")).toBe("#top");
  });
  it("routes legacy upload assets to /site", () => {
    expect(rewriteHref("/upload/iblock/abc/x.png")).toBe("/site/upload/iblock/abc/x.png");
  });
  it("keeps external links untouched (other than legacy host)", () => {
    expect(rewriteHref("https://example.com/x")).toBe("https://example.com/x");
  });
  it("rewrites legacy host inside external querystring", () => {
    expect(rewriteHref("https://share.com/?u=https://Vortex.ru/x"))
      .toBe(`https://share.com/?u=${CANONICAL_HOST}/x`);
  });
  it("normalises root", () => {
    expect(rewriteHref("/index.html")).toBe("/");
  });
});

describe("rewriteAsset", () => {
  it("prefixes /upload with /site", () => {
    expect(rewriteAsset("/upload/x.svg")).toBe("/site/upload/x.svg");
  });
  it("prefixes /_next with /site", () => {
    expect(rewriteAsset("/_next/static/x.css")).toBe("/site/_next/static/x.css");
  });
  it("normalises favicon", () => {
    expect(rewriteAsset("favicon.svg")).toBe("/site/favicon.svg");
    expect(rewriteAsset("/favicon.svg")).toBe("/site/favicon.svg");
  });
  it("keeps data: URIs", () => {
    expect(rewriteAsset("data:image/png;base64,xxx")).toBe("data:image/png;base64,xxx");
  });
  it("brings legacy absolute upload back to local mirror", () => {
    expect(rewriteAsset("https://Vortex.ru/upload/a.png")).toBe("/site/upload/a.png");
  });
});
