import {
  Shield, Zap, Globe, Wifi, Router, Lock, Server, Users,
  Clock, CheckCircle2, Sparkles, Headphones, Smartphone, Building2,
  Home, Briefcase, MapPin, Mail, Send, Phone, Settings, Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  shield: Shield, zap: Zap, globe: Globe, wifi: Wifi, router: Router,
  lock: Lock, server: Server, users: Users, clock: Clock, check: CheckCircle2,
  sparkles: Sparkles, support: Headphones, mobile: Smartphone, office: Building2,
  home: Home, work: Briefcase, geo: MapPin, mail: Mail, telegram: Send,
  phone: Phone, settings: Settings, activity: Activity,
};

export const Icon = ({ name, className }: { name?: string; className?: string }) => {
  const C = (name && MAP[name]) || Shield;
  return <C className={className} />;
};
