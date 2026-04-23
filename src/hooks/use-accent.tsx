import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Accent = "red" | "blue";

const ACCENTS: Record<Accent, { primary: string; glow: string }> = {
  red: { primary: "358 85% 52%", glow: "358 95% 62%" },
  blue: { primary: "217 91% 55%", glow: "210 100% 65%" },
};

interface Ctx { accent: Accent; setAccent: (a: Accent) => void }
const AccentContext = createContext<Ctx | null>(null);

const apply = (a: Accent) => {
  const { primary, glow } = ACCENTS[a];
  const r = document.documentElement.style;
  r.setProperty("--primary", primary);
  r.setProperty("--primary-glow", glow);
  r.setProperty("--accent", primary);
  r.setProperty("--destructive", primary);
  r.setProperty("--ring", primary);
  r.setProperty("--gradient-red", `linear-gradient(135deg, hsl(${primary}), hsl(${glow}))`);
  r.setProperty("--shadow-red", `0 20px 60px -20px hsl(${primary} / 0.5)`);
};

export const AccentProvider = ({ children }: { children: ReactNode }) => {
  const [accent, setAccentState] = useState<Accent>(() => {
    if (typeof window === "undefined") return "red";
    return (localStorage.getItem("vortex-accent") as Accent) || "red";
  });
  useEffect(() => { apply(accent); localStorage.setItem("vortex-accent", accent); }, [accent]);
  return <AccentContext.Provider value={{ accent, setAccent: setAccentState }}>{children}</AccentContext.Provider>;
};

export const useAccent = () => {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error("useAccent must be used within AccentProvider");
  return ctx;
};
