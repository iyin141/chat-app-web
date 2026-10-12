"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/sketchbot/primitives";
import { ROUTES } from "@/lib/routes";

/** Landing "command capsule" — Enter sends the visitor to sign-in. */
export function PromptDock() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const transmit = () => router.push(ROUTES.login);

  return (
    <div className="max-w-3xl mx-auto mt-space-xl">
      <div className="relative bg-surface-container/90 backdrop-blur-xl rounded-full p-2 pl-space-md flex items-center justify-between shadow-2xl transition-all focus-within:shadow-[0_0_20px_rgba(111,211,255,0.3)]">
        <div className="flex items-center gap-space-sm flex-1 mr-space-md">
          <Icon name="terminal" className="text-outline text-[20px]" />
          <input
            className="w-full bg-transparent border-0 outline-none font-body-md text-body-md text-on-surface placeholder:text-outline-variant"
            placeholder="Type a draft command or ask Sketchbot anything..."
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") transmit();
            }}
          />
        </div>
        <div className="flex items-center gap-space-xs">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            title="Attach blueprint draft"
            type="button"
            onClick={transmit}
          >
            <Icon name="attach_file" className="text-[20px]" />
          </button>
          <button
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(111,211,255,0.4)] transition-all"
            title="Transmit command"
            type="button"
            onClick={transmit}
          >
            <Icon name="north" className="text-[20px]" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-space-lg mt-space-sm font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">
        <span>
          PRESS <kbd className="px-1 py-0.5 rounded bg-surface-container text-primary font-annotation">ENTER ↵</kbd> TO TRANSMIT
        </span>
        <span>•</span>
        <span>SHIFT + ENTER FOR MULTILINE</span>
      </div>
    </div>
  );
}
