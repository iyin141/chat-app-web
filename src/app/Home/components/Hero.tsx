
"use client"
import { ArrowRight } from "lucide-react";
import { Button } from "./Ui/Button";
import { useCacheStore } from "@/app/dashboard/components/Cache_store";
import { useRouter } from "next/navigation";


const HeroSection = () => {
  const router = useRouter();
    const clearcache = useCacheStore((s) => s.clear)
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-background">

      {/* Main Content */}
      <div className="text-center max-w-4xl px-6 animate-fade-in flex flex-col ">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-6 leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-primary via-accent-foreground to-muted-foreground bg-clip-text text-transparent">
            Chat-box
          </span>
        </h1>
        
        <p className="text-xl lg:text-2xl text-muted-foreground max-sm:mt-24 md:mt-5 mb-12 max-w-3xl mx-auto leading-relaxed">
          Connect, chat, and communicate seamlessly with our modern messaging platform
        </p>

        {/* Action Buttons */}
        <div className="flex  gap-6 justify-center items-center">
          <Button className="btn-hero" onClick={()=>  {router.push('/auth/login'); clearcache()}}>
            Start Chatting
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
        
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 flex items-center space-x-2 text-muted-foreground">
        <div className="w-6 h-6 border border-border/30 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
        </div>
        <span className="text-sm">02/03 - Scroll down</span>
      </div>

      {/* Chat Features */}
      <div className="absolute bottom-20 right-16 text-right">
        <h3 className="text-lg font-semibold text-primary mb-2">Chat Anywhere</h3>
        <div className="w-12 h-0.5 bg-primary ml-auto"></div>
      </div>
    </section>
  );
};

export default HeroSection;
