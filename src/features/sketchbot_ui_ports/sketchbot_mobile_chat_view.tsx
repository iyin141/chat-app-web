"use client";
/* eslint-disable */
import React from 'react';

export default function SketchbotMobileChatView() {
  return (
    <>
      <div className="flex flex-col w-full pb-28 relative overflow-hidden" data-testid="chat-view">

<div className="relative w-full overflow-hidden bg-surface-container-low/95 shadow-md backdrop-blur-xl" data-testid="chat-topbar">
<div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-container/80 to-transparent animate-pulse"></div>

<div className="px-margin-mobile py-space-sm flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm min-w-0">
<button aria-label="Go back" className="w-9 h-9 rounded-full bg-surface-container-highest/60 flex items-center justify-center text-on-surface hover:text-primary transition-colors shrink-0" onClick={() => window.history.back()}>
<span className="material-symbols-outlined text-[18px]">arrow_back</span>
</button>

<div className="relative shrink-0">
<div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
<img className="w-full h-full object-cover" data-alt="Close-up portrait of engineer Maya Chen wearing thin wire glasses and a dark slate technical utility jacket inside a softly lit cybernetics studio with faint cyan blueprint light reflected on her cheek." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn25cdW8yti-0FziF5OpIBhgube3sDXu-e4RUD008ZgeA7CNxvrwEVzXVjWh47X5jYxSEx0qS9p7xnggKp0JDUdIvhvMUrBt4556DZJY-HiFNwrIZgynRonR6P_-SOVaZxWR6rgsNFKm5FDgMtoi3D3QI-5kyjT_HEiWZEvpFAvPb13ml6fG2fEaOscHsE4PxMGvHqEsfNaR1gfoS5R-cOY5PsmZ0smUBXObRtx6Q"/>
</div>

<div className="absolute bottom-0 right-0 w-[8px] h-[8px] rounded-full bg-primary-container shadow-[0_0_8px_rgba(111,211,255,0.9)] flex items-center justify-center">
<span className="w-[4px] h-[4px] rounded-full bg-surface-container-lowest animate-ping"></span>
</div>
</div>
<div className="flex flex-col min-w-0" data-testid="chat-title">
<div className="flex items-center gap-space-xs">
<span className="font-headline-md text-[15px] font-semibold text-on-surface truncate">Maya Chen</span>
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

<div className="w-full pt-space-sm pb-space-sm overflow-x-auto scrollbar-none px-margin-mobile bg-surface-container-lowest/40" data-testid="story-tray">
<div className="flex items-center gap-3.5 min-w-max">

<div className="flex flex-col items-center gap-1.5" data-testid="story-add">
<button className="w-13 h-13 w-[52px] h-[52px] rounded-full bg-surface-container-high/80 flex items-center justify-center text-primary-fixed-dim hover:bg-surface-container-highest transition-all group shadow-sm">
<span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">add</span>
</button>
<span className="font-label-sm text-label-sm text-on-surface-variant text-[9px] uppercase tracking-wider">New Draft</span>
</div>

<div className="flex flex-col items-center gap-1.5 cursor-pointer" data-testid="story-ring" data-viewed="false">
<div className="relative w-[52px] h-[52px] p-[2.5px] rounded-full bg-gradient-to-tr from-primary-fixed-dim via-primary to-primary-container shadow-[0_0_10px_rgba(111,211,255,0.3)]">
<div className="w-full h-full rounded-full overflow-hidden bg-surface-container-lowest p-[1.5px]">
<img className="w-full h-full object-cover rounded-full" data-alt="Portrait of Maya Chen smiling gently, framed by precision drafting rulers and illuminated screens displaying 3D wireframe models in a tech laboratory environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR_cWVX0nU1keB5t1KAVV8Etnyb7vUPtW_jtf0jgffjM-QTK1RdwcUCDgMjKzxzIIAH4eecJKs5BFc78wvFLSjJ3AExl8VR-wF9gOrP7eSZlYUz6Fz0d_y5ayfAYwJBSwczuKX7_7A9S_2s7M-HWMNMhvL-dUCn8SUw7YeilOaMQlekwF2i5PjsQEy60yTmgrwt_lTV86ly-n3mGTmP2LTiKS9i7Sen9OEWELOyws"/>
</div>
</div>
<span className="font-label-sm text-label-sm text-primary-fixed-dim text-[9px] font-medium tracking-wide">Maya</span>
</div>

<div className="flex flex-col items-center gap-1.5 cursor-pointer" data-testid="story-ring" data-viewed="false">
<div className="relative w-[52px] h-[52px] p-[2.5px] rounded-full bg-gradient-to-tr from-primary-fixed-dim via-primary to-primary-container shadow-[0_0_10px_rgba(111,211,255,0.2)]">
<div className="w-full h-full rounded-full overflow-hidden bg-surface-container-lowest p-[1.5px]">
<img className="w-full h-full object-cover rounded-full" data-alt="Portrait of Elena Vance, software engineer with auburn hair in a tidy bun, seated beside schematic blueprints and warm desk ambient lights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1qKRA0e7oW9DHI9mevfEput3h-S7TRpIHAmCUGeXggyoomFMfD549l_7byXCGWNDZsPFUrFUOOSPgBRshyV9WmYd8PEkOtrSQgR4Bascm1spFC7rCmB5m73s-liknEPJcpiUmfJhjv1SG2qoOKCq9AmmIuxxImHfEiumfNyj_jVezUOJz8GjUPd1ZNmZ1K9wXLUldvM75U13UiYNOoy6dMWFZStOjR9Abv--TBsY"/>
</div>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant text-[9px] tracking-wide">Elena</span>
</div>

<div className="flex flex-col items-center gap-1.5 cursor-pointer" data-testid="story-ring" data-viewed="true">
<div className="relative w-[52px] h-[52px] p-[2px] rounded-full bg-surface-container-highest">
<div className="w-full h-full rounded-full overflow-hidden bg-surface-container-lowest p-[1px]">
<img className="w-full h-full object-cover rounded-full opacity-80" data-alt="Architect Sam Roth in a minimalist design atelier holding a laser measuring tool with drafting paper spread out across a slate table." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6LnTBhEFG7V9-KX9hlnLgnV8Er7ubew5_Orr7q4R2Ft5_Ba9StJWh_XP7vpgYOemMbb-CVPlYvn3ZD7aavrQgBgjVG_y8_oSgHX_zHU0qSg3-U70KFBy0fwIIKw62Ex3PYjzsJbpiC1iVn_l4N0VrCMzXF7RLjM5I4aCpY6ke5i2Njm8A43oiMaGzOsuhNKyjYEKpEShGrOBtnXh0HMFgt8dyrapu8ouPhLJvLVI"/>
</div>
</div>
<span className="font-label-sm text-label-sm text-outline text-[9px] tracking-wide">Sam</span>
</div>

<div className="flex flex-col items-center gap-1.5 cursor-pointer opacity-70">
<div className="w-[52px] h-[52px] rounded-full bg-surface-container flex items-center justify-center text-outline">
<span className="material-symbols-outlined text-[20px]">terminal</span>
</div>
<span className="font-label-sm text-label-sm text-outline text-[9px] tracking-wide">Sys_Log</span>
</div>
</div>
</div>

<div className="flex flex-col px-margin-mobile pt-space-md gap-y-4" data-testid="message-list">

<div className="flex items-center justify-center my-space-xs relative">
<div className="absolute inset-0 flex items-center">
<div className="w-full h-[1px] bg-surface-container-highest"></div>
</div>
<div className="relative px-3 py-0.5 rounded-full bg-surface-container-low text-primary-fixed-dim font-annotation text-annotation tracking-widest shadow-sm">
        + TODAY, OCT 8 +
      </div>
</div>

<div className="flex flex-col items-start max-w-[85%] self-start" data-message-id="m1" data-own="false" data-testid="message-item">
<div className="flex items-center gap-1.5 mb-1 px-1">
<span className="font-headline-md text-body-sm font-semibold text-primary-container">Maya Chen</span>
<span className="font-label-sm text-[9px] text-outline uppercase tracking-wider">ENG // PR-804</span>
</div>

<div className="relative bg-surface-container-high/90 text-on-surface px-4 py-3 rounded-[14px] rounded-tl-[4px] shadow-sm backdrop-blur-md">

<span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-primary-container/40 pointer-events-none"></span>
<span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-primary-container/40 pointer-events-none"></span>
<p className="font-body-md text-body-md leading-relaxed text-on-surface">
          Hey! Check out the drafting specs for the new HUD layers.
        </p>
<div className="flex items-center justify-end mt-1.5 gap-1">
<span className="font-label-sm text-label-sm text-outline">14:24</span>
</div>
</div>
</div>

<div className="flex flex-col items-end max-w-[85%] self-end" data-message-id="m2" data-own="true" data-testid="message-item">

<div className="relative bg-primary-container/15 text-on-surface px-4 py-3 rounded-[14px] rounded-tr-[4px] shadow-sm">
<p className="font-body-md text-body-md leading-relaxed text-on-surface">
          Looking at them now. The corner brackets and jitter borders look spot on.
        </p>
<div className="flex items-center justify-end mt-1.5 gap-1.5" data-testid="message-seen">
<span className="font-label-sm text-label-sm text-outline">14:26</span>
<span className="font-label-sm text-label-sm text-primary-fixed-dim font-medium tracking-tight flex items-center gap-0.5">
            Seen
            <span className="material-symbols-outlined text-[13px] text-primary-fixed-dim">done_all</span>
</span>
</div>
</div>
</div>

<div className="flex flex-col items-start max-w-[88%] self-start" data-message-id="m3" data-own="false" data-testid="message-item">
<div className="flex items-center gap-1.5 mb-1 px-1">
<span className="font-headline-md text-body-sm font-semibold text-primary-container">Maya Chen</span>
</div>
<div className="relative bg-surface-container-high/90 text-on-surface px-4 py-3 rounded-[14px] rounded-tl-[4px] shadow-sm backdrop-blur-md">
<p className="font-body-md text-body-md leading-relaxed text-on-surface mb-2.5">
          Here is the rough outline of our deployment pipeline.
        </p>

<div className="p-2.5 rounded-lg bg-surface-container-lowest/80">
<div className="flex items-center justify-between mb-1.5">
<span className="font-label-sm text-label-sm text-primary-fixed-dim font-mono tracking-wider">
              [REFERENCE: DEP_ORCH_v2]
            </span>
<span className="material-symbols-outlined text-[14px] text-outline">data_object</span>
</div>
<div className="bg-surface-container-low px-2 py-1.5 rounded font-label-sm text-label-sm text-on-surface-variant flex items-center justify-between">
<span className="truncate">build --target=hud-sketchbot-prod</span>
<span className="material-symbols-outlined text-[14px] text-primary cursor-pointer active:scale-95 transition-transform">content_copy</span>
</div>
</div>
<div className="flex items-center justify-end mt-2">
<span className="font-label-sm text-label-sm text-outline">14:27</span>
</div>
</div>
</div>

<div className="flex flex-col items-end max-w-[85%] self-end" data-message-id="m4" data-own="true" data-testid="message-item">
<div className="relative bg-primary-container/15 text-on-surface px-4 py-3 rounded-[14px] rounded-tr-[4px] shadow-sm">
<p className="font-body-md text-body-md leading-relaxed text-on-surface">
          Deploying ui/sketchbot branch right away.
        </p>
<div className="flex items-center justify-end mt-1.5 gap-1.5">
<span className="font-label-sm text-label-sm text-outline">14:28</span>
<span className="font-label-sm text-label-sm text-outline font-normal">Sent</span>
</div>
</div>
</div>
</div>

<div className="fixed bottom-0 inset-x-0 z-40 px-margin-mobile pb-space-sm pt-2 bg-gradient-to-t from-surface via-surface/95 to-transparent">

<div className="flex items-center justify-between px-2 mb-1 pointer-events-none">
<div className="flex items-center gap-1 text-primary-fixed-dim font-annotation text-[11px] opacity-75">
<span>say hi →</span>
</div>
<div className="font-label-sm text-[9px] text-outline tracking-widest uppercase">
        HUD_COORD // 390x844
      </div>
</div>

<div className="relative w-full rounded-full bg-surface-container-high/95 p-1.5 shadow-xl backdrop-blur-xl flex items-center gap-1.5" data-testid="chat-input">

<span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-primary-container/60 rounded-tl pointer-events-none"></span>
<span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-primary-container/60 rounded-tr pointer-events-none"></span>
<span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-primary-container/60 rounded-bl pointer-events-none"></span>
<span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-primary-container/60 rounded-br pointer-events-none"></span>

<button aria-label="Add blueprint attachment" className="w-9 h-9 rounded-full bg-surface-container-highest/60 flex items-center justify-center text-outline hover:text-primary transition-colors shrink-0">
<span className="material-symbols-outlined text-[19px]">attach_file</span>
</button>

<button aria-label="Insert snippet" className="w-9 h-9 rounded-full bg-surface-container-highest/60 flex items-center justify-center text-outline hover:text-primary transition-colors shrink-0">
<span className="material-symbols-outlined text-[18px]">code</span>
</button>

<input className="flex-1 min-w-0 bg-transparent text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none px-2 py-1" placeholder="Message Maya Chen..." type="text"/>

<button aria-label="Send message" className="w-10 h-10 rounded-full bg-on-surface text-surface flex items-center justify-center shadow-md active:scale-95 hover:bg-primary transition-all shrink-0" data-testid="chat-send">
<span className="material-symbols-outlined text-[20px] font-bold">arrow_upward</span>
</button>
</div>
</div>
</div>

    </>
  );
}
