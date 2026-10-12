"use client";
/* eslint-disable */
import React from 'react';

export default function SketchbotGroupCreationDialog() {
  return (
    <>
      <div className="flex flex-col w-full relative px-gutter-mobile pb-space-xl" data-testid="group-create-button">
<div className="relative bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-lg shadow-xl overflow-hidden mt-space-sm">
<div className="absolute top-2 left-2 text-primary/40 font-annotation text-label-sm select-none pointer-events-none">┌ [00,00]</div>
<div className="absolute top-2 right-2 text-primary/40 font-annotation text-label-sm select-none pointer-events-none">[39,00] ┐</div>
<div className="absolute bottom-2 left-2 text-primary/40 font-annotation text-label-sm select-none pointer-events-none">└ [00,84]</div>
<div className="absolute bottom-2 right-2 text-primary/40 font-annotation text-label-sm select-none pointer-events-none">[39,84] ┘</div>
<div className="flex items-center justify-between bg-surface-container px-space-md py-space-sm rounded-DEFAULT">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
<span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">WS_INIT // MATRIX-04</span>
</div>
<span className="font-annotation text-annotation text-on-surface-variant">REV 2.89b</span>
</div>
<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-primary font-mono tracking-wider" htmlFor="group-name-input">[ GROUP // NAME ]</label>
<span className="font-label-sm text-label-sm text-on-surface-variant">REQUIRED</span>
</div>
<div className="relative bg-surface-container-highest rounded-DEFAULT p-space-sm flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-[20px] select-none">draw</span>
<input className="bg-transparent font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none w-full min-w-0" data-testid="group-name-input" id="group-name-input" placeholder="e.g. Avionics HUD Team" type="text" value="Avionics HUD Team"/>
<span className="font-label-sm text-label-sm text-primary bg-primary/10 px-1.5 py-0.5 rounded font-mono select-none">VALID</span>
</div>
</div>
<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface-variant font-mono" htmlFor="group-desc-input">[ DRAFTING // OBJECTIVE ]</label>
<span className="font-label-sm text-label-sm text-on-surface-variant font-mono">CHAR_LIM: 240</span>
</div>
<div className="bg-surface-container-highest rounded-DEFAULT p-space-sm">
<textarea className="bg-transparent font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none w-full resize-none min-w-0" id="group-desc-input" placeholder="Define drafting purpose or project scope..." rows={2}>Collaborative telemetric flight control blueprinting, HUD crosshair rendering algorithms, and micro-actuator diagnostics stream.</textarea>
</div>
</div>
<div className="flex flex-col gap-space-sm" data-testid="group-member-picker">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-primary font-mono tracking-wider">[ ASSIGNED_CREW ]</span>
<span className="font-label-sm text-label-sm text-primary bg-primary/10 px-2 py-0.5 rounded font-mono">[ 3 SELECTED // MAX 32 ]</span>
</div>
<div className="relative bg-surface-container-highest rounded-DEFAULT px-space-sm py-2 flex items-center gap-space-xs">
<span className="material-symbols-outlined text-on-surface-variant text-[18px]">person_search</span>
<input className="bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none w-full min-w-0" placeholder="Search teammates by callsign or name..." type="text"/>
<span className="font-annotation text-annotation text-on-surface-variant select-none">⌘K</span>
</div>
<div className="flex flex-col gap-1.5 mt-space-xs">
<div className="member-item flex items-center justify-between p-space-sm rounded-DEFAULT bg-primary/10 cursor-pointer transition-all">
<div className="flex items-center gap-space-sm min-w-0">
<div className="relative w-9 h-9 rounded-full overflow-hidden bg-surface-container shrink-0">
<img className="w-full h-full object-cover" data-alt="Close up portrait photograph of Maya Chen, an Asian female engineer wearing technical drafting glasses with subtle reflection of glowing blue vector telemetry screens in a dark laboratory setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQvhUk0o5aRpGDxxyaUoLr_xzQjtumQ53d49fuxajWEtL7YGQfM_J2mdbz6u5gp7QaGRJyX1mZyIBBWrD3hPXegMX7sbgiXWqV9DzVvypQqV4Ju3rn2ZmD1KTDAaj2fN_B4AGEJ5SRGhKXVmcPe5lB6KqsyXsaBLwzhSHylNHBRCOjLGUm89rbkdfcuzKVq7mn1cK6NiWwpn18QpMI2GN1uZ4Xpj8AO0TYf6dvot9Lslrcm43flgHw"/>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface font-semibold truncate leading-tight">Maya Chen</span>
<div className="flex items-center gap-1">
<span className="font-label-sm text-label-sm text-on-primary-container bg-primary-container/30 px-1 rounded font-mono">CALL: V-01</span>
<span className="font-label-sm text-label-sm text-primary-fixed-dim truncate">Vector Lead</span>
</div>
</div>
</div>
<div className="w-6 h-6 rounded bg-primary-container flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(111,211,255,0.4)]">
<svg className="w-4 h-4 text-on-primary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 16 16">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5"></path>
</svg>
</div>
</div>
<div className="member-item flex items-center justify-between p-space-sm rounded-DEFAULT bg-primary/10 cursor-pointer transition-all">
<div className="flex items-center gap-space-sm min-w-0">
<div className="relative w-9 h-9 rounded-full overflow-hidden bg-surface-container shrink-0">
<img className="w-full h-full object-cover" data-alt="Portrait shot of Elena Vance, a roboticist engineer in dark tactical lab overall with high precision blue holographic matrix diagrams softly illuminating her face from the side." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhQ9P197WpvzKX9C8MhnkzU6Q2olZgN2hyD7L_t6VLhbewg4MkeCXsOQQiVulfEmU0gqclQK2LG54bPkJsjqOjnreuH-BQ7qljG1V8o__85piDaQZifbBLKAzpx5Rhssqrkve5IWzmLVwTH_aBDyWLtb61lTbTLLjpPrKIq39lMIXLtdIPr5sWOqPJHRpZ8GBC116pDBSUWVGUfEEkSNIfcXwq4jhUkkisz9q7vlzC1eEnQLbn3yXh"/>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface font-semibold truncate leading-tight">Elena Vance</span>
<div className="flex items-center gap-1">
<span className="font-label-sm text-label-sm text-on-primary-container bg-primary-container/30 px-1 rounded font-mono">CALL: ACT-8</span>
<span className="font-label-sm text-label-sm text-primary-fixed-dim truncate">Actuator Matrix</span>
</div>
</div>
</div>
<div className="w-6 h-6 rounded bg-primary-container flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(111,211,255,0.4)]">
<svg className="w-4 h-4 text-on-primary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 16 16">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5"></path>
</svg>
</div>
</div>
<div className="member-item flex items-center justify-between p-space-sm rounded-DEFAULT bg-primary/10 cursor-pointer transition-all">
<div className="flex items-center gap-space-sm min-w-0">
<div className="relative w-9 h-9 rounded-full overflow-hidden bg-surface-container shrink-0">
<img className="w-full h-full object-cover" data-alt="Portrait photograph of Alex Rivera, a Hispanic male researcher with short cropped hair looking attentively, lit by soft ambient cyan and charcoal blue LED panels in an instrumentation testing bay." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU4q-cbGFbLhD1L9a1XUUZV5RNHPbY_C4XKZc1bVQtohd3AHe9XFzX33GaHsS3VV24tWznH24yO1hhhRyGd_mhyKyRg3uwex0-Y4VwXb_GDfzshlCzMBM2oISnvqlBEzJfyap5rr8tfwVm7-FoN1Prk-GiN9BX9hUusUKARs2A71FEp9oDcE_BmRc1uQiSLjP8w_s8YXWNa5uwMzcELI1I5BMjmmdGNt4aa7I-VLailH9280gA9JIf"/>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface font-semibold truncate leading-tight">Alex Rivera</span>
<div className="flex items-center gap-1">
<span className="font-label-sm text-label-sm text-on-primary-container bg-primary-container/30 px-1 rounded font-mono">CALL: ROBO</span>
<span className="font-label-sm text-label-sm text-primary-fixed-dim truncate">Robotics</span>
</div>
</div>
</div>
<div className="w-6 h-6 rounded bg-primary-container flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(111,211,255,0.4)]">
<svg className="w-4 h-4 text-on-primary" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 16 16">
<path d="M3.5 8.5L6.5 11.5L12.5 4.5"></path>
</svg>
</div>
</div>
<div className="member-item flex items-center justify-between p-space-sm rounded-DEFAULT bg-surface-container-highest/60 hover:bg-surface-container-highest cursor-pointer transition-all">
<div className="flex items-center gap-space-sm min-w-0">
<div className="relative w-9 h-9 rounded-full overflow-hidden bg-surface-container shrink-0 opacity-60">
<img className="w-full h-full object-cover" data-alt="Headshot of Sam Roth, a senior hardware draftsman wearing cleanroom headset against a dark schematic laboratory background with subtle blueprint linework." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbdadycAhcaTrdsdMBIQ0Zp7d5Six4ncI0QlAhPEzIfs1yUI3qtalETXG9lSjO3prHQTqcKGWqAPo-q5aeAU2HiPIJ6dvYgPLQKHb3cIjaqHC02WT71rJN5b8K2ncChVIf0CMzHtT-REBjunpBgg5JClZaXTgEpCsHhCDcM2yKIKES5YeDC1cpcMb8_ZYyooJutmPtzE1pYWh75r0g7auEUkLH31zq_z9kbc1-vvWLZ0YgUOZuO5qm"/>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface-variant font-medium truncate leading-tight">Sam Roth</span>
<div className="flex items-center gap-1">
<span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-1 rounded font-mono">CALL: DFT-X</span>
<span className="font-label-sm text-label-sm text-on-surface-variant truncate">Drafting Lead</span>
</div>
</div>
</div>
<div className="w-6 h-6 rounded bg-surface-container flex items-center justify-center shrink-0">
<span className="text-on-surface-variant text-label-sm font-mono">+</span>
</div>
</div>
</div>
</div>
<div className="flex flex-col gap-space-xs pt-space-xs">
<span className="font-label-md text-label-md text-on-surface-variant font-mono">[ PROTOCOL // TELEMETRY ]</span>
<div className="flex items-center justify-between bg-surface-container px-space-md py-space-sm rounded-DEFAULT">
<div className="flex flex-col">
<span className="font-body-md text-body-md text-on-surface font-semibold">Public Blueprint Gallery</span>
<span className="font-annotation text-annotation text-on-surface-variant">Expose vector trace cache to peer org nodes</span>
</div>
<button className="relative inline-flex h-6 w-12 items-center rounded-full bg-surface-container-highest px-0.5 transition-colors" id="toggle-gallery" type="button">
<span className="font-label-sm text-label-sm text-on-surface-variant absolute left-1.5 font-mono select-none">0</span>
<span className="inline-block h-5 w-5 transform rounded-full bg-secondary-container transition-transform"></span>
</button>
</div>
<div className="flex items-center justify-between bg-surface-container px-space-md py-space-sm rounded-DEFAULT">
<div className="flex flex-col">
<span className="font-body-md text-body-md text-on-surface font-semibold">SignalR Live Sync</span>
<span className="font-annotation text-annotation text-on-surface-variant">Low-latency canvas socket &lt;16ms</span>
</div>
<button className="relative inline-flex h-6 w-12 items-center rounded-full bg-primary-container px-0.5 transition-colors shadow-[0_0_10px_rgba(111,211,255,0.3)]" id="toggle-sync" type="button">
<span className="font-label-sm text-label-sm text-on-primary-fixed absolute right-1.5 font-mono select-none font-bold">1</span>
<span className="inline-block h-5 w-5 translate-x-6 transform rounded-full bg-on-primary transition-transform"></span>
</button>
</div>
</div>
<div className="flex flex-col gap-space-sm pt-space-sm">
<button className="w-full bg-primary font-label-lg text-label-lg text-on-primary py-space-md px-space-lg rounded-DEFAULT font-semibold tracking-wide flex items-center justify-center gap-space-xs shadow-[0_0_20px_rgba(111,211,255,0.35)] active:scale-[0.98] transition-all" data-testid="group-create-submit" type="button">
<span>Create Group Workspace</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
<button className="w-full text-center py-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors font-mono" onClick={() => window.history.back()} type="button">
        [ CANCEL // ABORT_CREATION ]
      </button>
</div>
</div>
</div>

    </>
  );
}
