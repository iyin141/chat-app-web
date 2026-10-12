import { ReactNode } from "react";
import { CornerBrackets } from "./primitives";

export function WorkspaceSidebar({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="col-span-12 xl:col-span-3 flex flex-col gap-space-md bg-surface-container-low/90 backdrop-blur-xl p-space-md rounded shadow-xl relative" data-testid="sidebar">
      <CornerBrackets />
      
      <div className="flex items-center justify-between pb-space-xs">
        <div className="flex items-center gap-space-xs">
          <div className="w-7 h-7 rounded bg-primary-container/20 flex items-center justify-center text-primary-fixed">
            <span className="material-symbols-outlined text-[18px]">deployed_code</span>
          </div>
          <span className="font-label-md text-label-md text-primary tracking-widest uppercase">WORKSPACE // CORE</span>
        </div>
        <button className="flex items-center gap-1 px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[14px]">left_panel_close</span>
          <span className="font-label-sm text-label-sm text-primary-container">[</span>
        </button>
      </div>

      {children}
    </div>
  );
}
