'use client'
import { useThemeStore } from "@/components/Theme";
import React from "react";


const Tabs = () => {
  const { isDark } = useThemeStore();

  const groups = [
    { id: "TA", label: "Team" },
    { id: "PB", label: "Project" },
    { id: "DS", label: "Design" },
    { id: "DT", label: "Dev" },
    { id: "MK", label: "Marketing" },
  ];


  return (
    <div className=" flex flex-col pl-1 pr-2">

      
    <div className="flex items-center justify-between mb-4">
          <h2
            className="font-semibold text-base flex items-center gap-2"
            style={{ color: isDark ? "#fff" : "#000" }}
          >
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: isDark ? "#fff" : "#000" }}
            ></div>
            Stories
          </h2>
          <button
            className="text-xs transition-colors"
            style={{
              color: isDark ? "#9ca3af" : "#6b7280",
            }}
          >
            See all
          </button>
        </div>
     <div  className="flex gap-3 pb-6 overflow-x-auto border-b"
          style={{
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          } as React.CSSProperties}>
          {groups.map((g , index) => (
            <div key={g.id}  className="flex flex-col items-center gap-1.5 min-w-[64px]"
              style={{
                animation: `fadeSlideIn 0.4s ease-out ${index * 0.08}s both`,
              }}>
              <div className="w-16 h-16 rounded-full p-0.2 cursor-pointer hover:scale-110 transition-all"
                style={{
                  backgroundColor: isDark ? "#fff" : "#fff",
                }}>
                <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border-2"
                  style={{
                    backgroundColor: isDark ? "#000" : "#fff",
                    borderColor: isDark ? "#fff" : "#000",
                  }}>
                <span style={{ color: isDark ? "white" : "#6b7280" }}>{g.id}</span>
              </div>
            
              </div>
                <span style={{ fontSize: 13, color: isDark ? "#9ca3af" : "#6b7280" }}>{g.label}</span>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default Tabs;
