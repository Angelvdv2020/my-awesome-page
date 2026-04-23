/**
 * TS port of URL normalization rules from scripts/extract-pages.py.
 * Used by tests; runtime uses pre-extracted JSON, so this stays pure.
 */

const LEGACY_HOST_RE = /^https?:\/\/(?:www\.)?(?:Vortex|redsecurity|vortex1)\.ru/i;
const LEGACY_HOST_ANY = /https?:\/\/(?:www\.)?Vortex\.ru/gi;
export const CANONICAL_HOST = "https://www.vortex1.ru";

const ASSET_EXT_RE = /\.(png|jpe?g|svg|gif|webp|pdf|mp4|mp3|zip|css|js|ico|woff2?|ttf)(\?|#|$)/i;

export function rewriteHref(u: string): string {
  if (!u) return u;
  if (/^(mailto:|tel:|#|javascript:|data:)/i.test(u)) return u;
  const isExternal = /^https?:\/\//i.test(u) && !LEGACY_HOST_RE.test(u);
  if (isExternal) return u.replace(LEGACY_HOST_ANY, CANONICAL_HOST);
  u = u.replace(LEGACY_HOST_RE, "");
  if (ASSET_EXT_RE.test(u)) {
    if (u.startsWith("/upload/") || u.startsWith("/_next/") || u === "/favicon.svg") {
      return "/site" + u;
    }
    if (!u.startsWith("/site/") && !u.startsWith("/")) return "/site/" + u;
    return u;
  }
  if (u.endsWith(".html")) u = u.slice(0, -5);
  if (u.endsWith("/index")) u = u.slice(0, -5) || "/";
  if (u === "" || u === "/index") u = "/";
  if (!u.startsWith("/") && !/^https?:\/\//i.test(u)) u = "/" + u;
  return u;
}

export function rewriteAsset(u: string): string {
  if (!u) return u;
  if (/^(data:|https?:)/i.test(u)) {
    const m = u.match(/^https?:\/\/(?:www\.)?Vortex\.ru(\/.*)$/i);
    if (m) {
      const p = m[1];
      if (p.startsWith("/upload/") || p.startsWith("/_next/")) return "/site" + p;
    }
    return u;
  }
  if (u.startsWith("/upload/") || u.startsWith("/_next/")) return "/site" + u;
  if (u === "favicon.svg" || u === "/favicon.svg") return "/site/favicon.svg";
  if (!u.startsWith("/") && !u.startsWith("http")) return "/site/" + u;
  return u;
}
