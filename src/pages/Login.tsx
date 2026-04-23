import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft, Lock } from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.info("Вход скоро будет доступен");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--ink))] text-white flex items-center justify-center p-6 grid-bg">
      <div className="absolute inset-0 radial-accent opacity-60 pointer-events-none" />
      <div className="relative w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-sm text-white/60 hover:text-white mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> На главную
        </Link>
        <div className="border border-white/10 bg-black/40 backdrop-blur p-8 corner-cut">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="h-5 w-5 text-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// vortex / auth</span>
          </div>
          <h1 className="text-3xl font-black mb-2">Вход в кабинет</h1>
          <p className="text-sm text-white/60 mb-8">Управление подпиской VPN и устройствами Vortex.</p>
          <form onSubmit={submit} className="space-y-4">
            <Input type="email" placeholder="email@vortex.app" required className="bg-white/5 border-white/10 text-white" />
            <Input type="password" placeholder="Пароль" required className="bg-white/5 border-white/10 text-white" />
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
              {loading ? "Проверяем..." : "Войти"}
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-white/40">Нет аккаунта? Скоро появится регистрация.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
