'use client'
import React from 'react'
import { useRouter, useSearchParams } from "next/navigation";

type Prop = {
  friend_name: string
}

const Topbar = ({ friend_name }: Prop) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const updateView = (view: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.push(`?${params.toString()}`);
  };
  
  return (
    <div className="relative w-full overflow-hidden bg-surface-container-low/95 shadow-md backdrop-blur-xl rounded-t" data-testid="chat-topbar">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-container/80 to-transparent animate-pulse"></div>
      
      <div className="px-margin-mobile py-space-sm flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm min-w-0">
          <button 
            aria-label="Go back" 
            className="w-9 h-9 rounded-full bg-surface-container-highest/60 flex items-center justify-center text-on-surface hover:text-primary transition-colors shrink-0" 
            onClick={() => updateView('default')}
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest flex items-center justify-center">
               <span className="font-bold text-[18px] text-primary-fixed">{(friend_name?.[0] ?? "?").toUpperCase()}</span>
            </div>
            <div className="absolute bottom-0 right-0 w-[8px] h-[8px] rounded-full bg-primary-container shadow-[0_0_8px_rgba(111,211,255,0.9)] flex items-center justify-center">
              <span className="w-[4px] h-[4px] rounded-full bg-surface-container-lowest animate-ping"></span>
            </div>
          </div>
          
          <div className="flex flex-col min-w-0" data-testid="chat-title">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-md text-[15px] font-semibold text-on-surface truncate">{friend_name}</span>
              <span className="font-label-sm text-[9px] px-1.5 py-0.5 rounded bg-primary-container/15 text-primary-fixed-dim uppercase tracking-wider">HUD_v2</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim"></span>
              <span className="font-label-md text-label-md text-primary-fixed-dim tracking-wider uppercase">ONLINE // LATENCY: 18ms</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 shrink-0">
          <button aria-label="Voice Telemetry" className="w-9 h-9 rounded-full bg-surface-container-highest/60 flex items-center justify-center text-on-surface hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[18px]">call</span>
          </button>
          <button aria-label="Inspector Pane" className="w-9 h-9 rounded-full bg-surface-container-highest/60 flex items-center justify-center text-on-surface hover:text-primary transition-colors" data-testid="chat-info-button">
            <span className="material-symbols-outlined text-[18px]">info</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Topbar
