import type { ReactNode } from "react";
import type { DeviceAdaptation } from "@/lib/routes";

/** Machine-readable architectural header (FLOW_ID / ROUTE / PARENT_ROUTE ...). */
export function FlowMeta({
  flowId,
  route,
  parentRoute,
  device,
  stateDependency = [],
}: {
  flowId: string;
  route: string;
  parentRoute?: string;
  device: DeviceAdaptation;
  stateDependency?: string[];
}) {
  return (
    <div
      hidden
      aria-hidden="true"
      data-flow-id={flowId}
      data-route={route}
      data-parent-route={parentRoute}
      data-device-adaptation={device}
      data-state-dependency={JSON.stringify(stateDependency)}
    />
  );
}

/** Material Symbols glyph. */
export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
}

/** Four corner bracket markers used on HUD panels (chat sidebar etc.). */
export function CornerBrackets() {
  return (
    <>
      <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-primary-container pointer-events-none opacity-80" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-primary-container pointer-events-none opacity-80" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-primary-container pointer-events-none opacity-80" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-primary-container pointer-events-none opacity-80" />
    </>
  );
}

/** Thin L-shaped corner ticks + dashed outline used on auth cards. */
export function DashedFrame() {
  const corner = (pos: string, h: string, v: string) => (
    <div className={`absolute ${pos} w-2.5 h-2.5 pointer-events-none`}>
      <div className={`absolute ${h} w-2.5 h-[1.5px] bg-primary`} />
      <div className={`absolute ${v} w-[1.5px] h-2.5 bg-primary`} />
    </div>
  );
  return (
    <>
      {corner("top-0 left-0", "top-0 left-0", "top-0 left-0")}
      {corner("top-0 right-0", "top-0 right-0", "top-0 right-0")}
      {corner("bottom-0 left-0", "bottom-0 left-0", "bottom-0 left-0")}
      {corner("bottom-0 right-0", "bottom-0 right-0", "bottom-0 right-0")}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <rect
          className="text-primary-fixed-dim"
          fill="none"
          height="99.2%"
          rx="16"
          stroke="currentColor"
          strokeDasharray="160 3 120 4"
          strokeWidth="1.2"
          width="99.2%"
          x="1"
          y="1"
        />
      </svg>
    </>
  );
}

/** `[ Section Label ]` caption. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">{children}</span>;
}

/** Pulsing status pill. */
export function StatusPill({ label, ping = false }: { label: string; ping?: boolean }) {
  return (
    <div className="flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container-high">
      <span className={`w-2 h-2 rounded-full bg-primary ${ping ? "animate-ping" : "animate-pulse"}`} />
      <span className="font-label-sm text-label-sm text-primary tracking-wider">{label}</span>
    </div>
  );
}

/** Page wrapper: dark surface + grid backdrop, scrollbars hidden. */
export function SketchScreen({
  children,
  grid = "blueprint-grid",
  className = "",
}: {
  children: ReactNode;
  grid?: "blueprint-grid" | "drafting-grid" | "none";
  className?: string;
}) {
  return (
    <div
      className={`sb-root bg-background font-body-md text-on-surface min-h-screen relative selection:bg-primary-container selection:text-on-primary-container ${
        grid === "none" ? "" : grid
      } ${className}`}
    >
      {children}
    </div>
  );
}
