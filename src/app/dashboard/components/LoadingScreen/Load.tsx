"use client"
import { useEffect } from "react";
import { X } from "lucide-react";
import { useLoadingStore } from "./Loadstore";
import { useThemeStore } from "@/components/Theme";





const LoadingScreen = () => {
    const { isDark} = useThemeStore();
     const { isLoading,  setIsLoading } = useLoadingStore();
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  if (!isLoading) return null;

  const color = isDark ? "#ffffff" : "#000000";
  const colorLight = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isDark ? "bg-black" : "bg-white"
      } ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      aria-live="polite"
      aria-busy="true"
      role="status"
      style={{
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {/* Close button */}
      <button
        onClick={() => setIsLoading(false)}
        className={`absolute top-6 right-6 p-2 rounded-full transition-all duration-200 hover:scale-110 ${
          isDark
            ? "bg-white/10 hover:bg-white/20 text-white"
            : "bg-black/10 hover:bg-black/20 text-black"
        }`}
        aria-label="Close loading screen"
        style={{
          transition: "all 0.2s ease-in-out",
        }}
      >
        <X size={24} strokeWidth={2} />
      </button>

      {/* Loading spinner */}
      <div className="flex flex-col items-center gap-8">
        {/* Main animated spinner with multiple rings */}
        <div className="relative w-24 h-24">
          {/* Outer pulsing ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              border: `3px solid ${colorLight}`,
              animation: "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
          
          {/* Middle rotating ring */}
          <div
            className="absolute rounded-full"
            style={{
              top: "16px",
              left: "16px",
              right: "16px",
              bottom: "16px",
              border: `3px solid ${colorLight}`,
              borderTopColor: color,
              animation: "spin 1.5s linear infinite",
            }}
          />
          
          {/* Inner rotating ring - opposite direction */}
          <div
            className="absolute rounded-full"
            style={{
              top: "32px",
              left: "32px",
              right: "32px",
              bottom: "32px",
              border: `3px solid ${colorLight}`,
              borderBottomColor: color,
              animation: "spin-reverse 1s linear infinite",
            }}
          />
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: color,
                animation: "scale-pulse 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Animated dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: color,
                animation: `bounce-dot 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Keyframes animations */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          to { transform: rotate(-360deg); }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes scale-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
        }
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          40% { transform: translateY(-12px) scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
