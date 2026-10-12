"use client";
import React from 'react';
import { CornerBrackets } from '@/components/sketchbot/primitives';

const Home = () => {
  return (
    <main className="flex-1 flex flex-col bg-surface-container-low/80 backdrop-blur-md rounded shadow-xl relative min-h-[780px] xl:col-span-6 col-span-12 justify-center items-center">
      <div className="relative p-space-xl flex flex-col items-center max-w-sm text-center">
        <CornerBrackets />
        
        <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary-fixed mb-space-md shadow-[0_0_24px_rgba(111,211,255,0.15)] relative">
          <span className="material-symbols-outlined text-[32px]">satellite_alt</span>
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-primary-container shadow-[0_0_8px_rgba(111,211,255,0.9)] animate-pulse"></span>
        </div>
        
        <h2 className="font-headline-md text-headline-md text-on-surface mb-2 tracking-tight">
          AWAITING TRANSMISSION
        </h2>
        
        <p className="font-body-md text-body-md text-outline">
          Select a secure channel from the network grid to initiate synchronization.
        </p>

        <div className="mt-space-lg flex items-center gap-2 text-primary-fixed-dim font-label-sm text-[10px] uppercase tracking-widest opacity-60">
          <span className="material-symbols-outlined text-[14px]">cell_tower</span>
          <span>Status: Scanning frequencies</span>
        </div>
      </div>
    </main>
  );
};

export default Home;
