

export function RightHudDrawer() {
  return (
    <div className="flex flex-col gap-space-md bg-surface-container-low/90 backdrop-blur-xl p-space-md rounded shadow-xl relative h-full">
      {/* Top Section: Hand-drawn drafting note vector pointing to telemetry */}
      <div className="relative bg-surface-container-lowest p-space-sm rounded overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-sm text-label-sm text-primary uppercase">[ TELEMETRY NODE ]</span>
          <span className="font-annotation text-annotation text-outline">LOC: SFO-1</span>
        </div>
        
        <div className="relative py-2 px-1">
          <svg className="w-full h-16 text-primary-container" fill="none" viewBox="0 0 200 60">
            <path d="M 10 50 Q 70 5 170 20" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5"></path>
            <polygon fill="currentColor" points="170,20 162,16 165,24"></polygon>
            <circle cx="185" cy="22" r="6" stroke="currentColor" strokeWidth="1.2"></circle>
            <line stroke="currentColor" strokeWidth="1" x1="185" x2="185" y1="12" y2="32"></line>
            <line stroke="currentColor" strokeWidth="1" x1="175" x2="195" y1="22" y2="22"></line>
          </svg>
          <div className="flex justify-between items-center -mt-2">
            <span className="font-annotation text-annotation text-[10px] text-primary">NOTE: Stream active on v2.4</span>
            <span className="font-label-sm text-label-sm text-primary-container font-semibold">24ms local</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 bg-surface-container p-2 rounded">
          <div className="flex flex-col">
            <span className="font-annotation text-annotation text-[10px] text-outline">STATUS</span>
            <span className="font-label-md text-label-md text-primary">ONLINE</span>
          </div>
          <div className="flex flex-col">
            <span className="font-annotation text-annotation text-[10px] text-outline">CLUSTER</span>
            <span className="font-label-md text-label-md text-on-surface">12 members</span>
          </div>
        </div>
      </div>

      {/* Realtime Channel Memory Gauge (Segmented Ring SVG under 2KB) */}
      <div className="flex flex-col gap-2 bg-surface-container-lowest p-space-sm rounded">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-outline uppercase">[ CONTEXT CAPACITY ]</span>
          <span className="font-label-sm text-label-sm text-primary">78%</span>
        </div>
        <div className="flex items-center justify-center py-2">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle className="text-surface-container-highest" cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeDasharray="24 6" strokeWidth="6"></circle>
              <circle className="text-primary-container" cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeDasharray="24 6" strokeDashoffset="55" strokeWidth="6"></circle>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-headline-md text-headline-md font-bold text-primary">12.4k</span>
              <span className="font-annotation text-annotation text-[9px] text-outline">TOKENS</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between font-label-sm text-label-sm text-outline">
          <span>ALLOC: 16k</span>
          <span>REMAIN: 3.6k</span>
        </div>
      </div>

      {/* Shared Assets Blueprint Preview */}
      <div className="flex flex-col gap-space-xs bg-surface-container-lowest p-space-sm rounded">
        <span className="font-label-sm text-label-sm text-outline uppercase">[ ATTACHED SCHEMATICS ]</span>
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center gap-2 p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px] text-primary-container">draft</span>
            <div className="flex flex-col flex-1">
              <span className="font-label-md text-label-md text-on-surface">hud_reticles_v4.dwg</span>
              <span className="font-annotation text-annotation text-[10px] text-outline">1.2 MB // Vector</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-outline">download</span>
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px] text-secondary">architecture</span>
            <div className="flex flex-col flex-1">
              <span className="font-label-md text-label-md text-on-surface">signalr_bridge.spec</span>
              <span className="font-annotation text-annotation text-[10px] text-outline">48 KB // Config</span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-outline">download</span>
          </div>
        </div>
      </div>

      {/* Drafting Crosshairs Quick Toggle */}
      <div className="flex items-center justify-between p-space-xs bg-surface-container-lowest rounded mt-auto">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary">grid_3x3</span>
          <span className="font-label-sm text-label-sm text-on-surface">ORTHO_GRID</span>
        </div>
        <div className="flex items-center gap-1 font-label-sm text-label-sm text-primary bg-surface-container px-2 py-0.5 rounded">
          <span>1</span>
          <span className="text-outline">/</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
}
