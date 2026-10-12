"use client";

import { useState, type ReactNode, type InputHTMLAttributes } from "react";
import { DashedFrame, FlowMeta, Icon } from "@/components/sketchbot/primitives";
import type { DeviceAdaptation } from "@/lib/routes";
import logo from "@/app/img/logo_black.png";
import Image from "next/image";

/** Full-screen gradient + dotted grid backdrop shared by login / sign-up. */
export function AuthShell({
  children,
  flowId,
  route,
  parentRoute,
  stateDependency,
  device = "responsive",
}: {
  children: ReactNode;
  flowId: string;
  route: string;
  parentRoute?: string;
  stateDependency?: string[];
  device?: DeviceAdaptation;
}) {
  return (
    <div className="bg-white font-sans text-black antialiased min-h-screen flex flex-col justify-center items-center">
      <div className="fixed inset-0 pointer-events-none opacity-20  [background-size:24px_24px]" />
      <main className="relative z-10 w-full max-w-sm px-4 py-8 flex flex-col items-center justify-center">
        <div className="flex flex-col w-full items-center justify-center relative">{children}</div>
      </main>
    </div>
  );
}

/** Dashed, bracketed card with the hexagon emblem + heading. */
export function AuthCard({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="relative w-full max-w-[352px] bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col gap-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-black flex items-center justify-center mb-4 text-white border-2 border-black">
         <Image src={logo} alt="ChatBox" width={32} height={32} className="rounded-full p-[2px]" />
        </div>
        <h1 className="font-sans text-[24px] text-black font-bold uppercase tracking-tight leading-tight">{title}</h1>
        <p className="font-sans text-[13px] text-gray-600 mt-2 font-bold uppercase">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

type AuthFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  tag: string;
  revealable?: boolean;
  trailing?: ReactNode;
};

/** Labelled input with `ID: 0n` tag and optional password reveal toggle. */
export function AuthField({ id, label, tag, revealable, trailing, type = "text", className = "", ...rest }: AuthFieldProps) {
  const [show, setShow] = useState(false);
  const inputType = revealable ? (show ? "text" : "password") : type;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-end mb-1">
        <label className="font-sans text-[12px] font-bold text-black uppercase tracking-wider flex gap-2 items-center" htmlFor={id}>
          <span>{label}</span>
          <span className="text-gray-400 font-mono text-[10px]">{tag}</span>
        </label>
        {trailing && <div className="font-sans text-[11px] font-bold uppercase">{trailing}</div>}
      </div>
      <div className="relative flex items-center">
        <input
          id={id}
          type={inputType}
          className={`w-full bg-white text-black border-2 border-black font-sans text-[14px] px-3 py-2.5 ${
            revealable ? "pr-10" : ""
          } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all ${className}`}
          {...rest}
        />
        {revealable && (
          <button
            aria-label="Toggle password visibility"
            className="absolute right-3 text-black hover:bg-gray-100 flex items-center justify-center p-1 border border-transparent hover:border-black transition-colors"
            type="button"
            onClick={() => setShow((s) => !s)}
          >
            <span className="material-symbols-outlined text-[16px]">
              {show ? "visibility_off" : "visibility"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export function AuthError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      className="flex items-center gap-2 p-3 border-2 border-black bg-red-50 text-red-600 font-sans text-[12px] font-bold uppercase tracking-wide"
      data-testid="auth-error"
      role="alert"
    >
      <span className="material-symbols-outlined text-[18px]">error</span>
      <span>{message}</span>
    </div>
  );
}

export function AuthSubmit({ children, loading, testId = "auth-submit" }: { children: ReactNode; loading?: boolean; testId?: string }) {
  return (
    <button
      className="w-full py-3 bg-black text-white border-2 border-black font-sans text-[13px] font-bold uppercase tracking-widest mt-2 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:pointer-events-none"
      data-testid={testId}
      type="submit"
      disabled={loading}
    >
      {loading ? (
        <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
      ) : (
        <>
          <span>{children}</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </>
      )}
    </button>
  );
}
