import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Index = () => {
  return (
    <div className="relative w-screen h-screen">
      <Button asChild size="sm" className="absolute top-3 right-3 z-10 shadow-lg">
        <a href="/red-original.html" target="_blank" rel="noopener noreferrer">
          <ExternalLink className="mr-2 h-4 w-4" />
          Открыть в отдельном окне
        </a>
      </Button>
      <iframe
        src="/red-original.html"
        title="RED Security"
        className="w-full h-full border-0 block"
      />
    </div>
  );
};

export default Index;
