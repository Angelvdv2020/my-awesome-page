import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { AccentProvider } from "@/hooks/use-accent";

const Login = lazy(() => import("./pages/Login.tsx"));
const Sitemap = lazy(() => import("./pages/Sitemap.tsx"));
const PageRenderer = lazy(() => import("./pages/PageRenderer.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccentProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="w-screen h-screen bg-[hsl(var(--ink))]" />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sitemap" element={<Sitemap />} />
            {/* Single universal handler — all other URLs go through PageRenderer */}
            <Route path="*" element={<PageRenderer />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
    </AccentProvider>
  </QueryClientProvider>
);

export default App;
