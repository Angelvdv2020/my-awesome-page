import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const PAGES_DIR = path.resolve(__dirname, "../content/pages");
const manifest = JSON.parse(
  fs.readFileSync(path.join(PAGES_DIR, "_manifest.json"), "utf-8"),
) as { slug: string; file: string; title: string; description: string }[];

describe("pages manifest", () => {
  it("has at least 51 entries", () => {
    expect(manifest.length).toBeGreaterThanOrEqual(51);
  });

  it("has a JSON file for each slug with required fields", () => {
    for (const entry of manifest) {
      const fp = path.join(PAGES_DIR, entry.file);
      expect(fs.existsSync(fp), `missing ${entry.file}`).toBe(true);
      const data = JSON.parse(fs.readFileSync(fp, "utf-8"));
      expect(typeof data.title, `title in ${entry.file}`).toBe("string");
      expect(typeof data.html, `html in ${entry.file}`).toBe("string");
      expect(typeof data.canonical, `canonical in ${entry.file}`).toBe("string");
      expect(data.canonical).toMatch(/vortex1\.ru/);
      expect(data.og, `og in ${entry.file}`).toBeTruthy();
    }
  });

  it("has unique slugs", () => {
    const seen = new Set<string>();
    for (const e of manifest) {
      expect(seen.has(e.slug), `dup ${e.slug}`).toBe(false);
      seen.add(e.slug);
    }
  });

  it("home and services point to different files", () => {
    const home = manifest.find((m) => m.slug === "");
    const services = manifest.find((m) => m.slug === "services");
    expect(home?.file).toBeTruthy();
    expect(services?.file).toBeTruthy();
    expect(home?.file).not.toBe(services?.file);
  });
});
