"use client";
/* eslint-disable */
import React from 'react';

export default function SketchbotPasswordRecoveryReset() {
  return (
    <>
      <div className="flex flex-col w-full text-on-surface">

<div className="px-margin-mobile flex flex-col space-y-space-md pb-space-xl">

<div className="flex items-center justify-between py-space-xs">
<div className="flex items-center space-x-space-sm">
<button aria-label="Return to login screen" className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors active:scale-95 text-on-surface" data-testid="forgot-back-login">
<span className="material-symbols-outlined text-[18px]">arrow_back</span>
</button>
<div className="flex flex-col">
<span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">Security Recovery</span>
<span className="font-annotation text-annotation text-primary-container tracking-wider uppercase opacity-90">[ PROTOCOL: KEY_RESET // REV 2.4 ]</span>
</div>
</div>

<div className="flex items-center space-x-1.5 px-2 py-1 rounded bg-surface-container-lowest">
<span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
<span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-widest">LIVE_SYS</span>
</div>
</div>

<div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col space-y-2">
<div className="flex items-center justify-between font-label-sm text-label-sm">

<div className="flex items-center space-x-1 text-primary-container">
<span className="material-symbols-outlined text-[14px]">check_circle</span>
<span className="font-label-md text-label-md">01 Email Sent</span>
</div>

<div className="flex items-center space-x-1 text-primary">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
<span className="font-label-md text-label-md font-semibold text-primary">02 Verify &amp; Pass</span>
</div>

<div className="flex items-center space-x-1 text-outline">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
<span className="font-label-md text-label-md">03 Handshake</span>
</div>
</div>

<div className="grid grid-cols-3 gap-1.5 h-1 w-full">
<div className="bg-primary-container rounded-full h-full"></div>
<div className="bg-primary-container rounded-full h-full relative overflow-hidden">
<div className="absolute inset-0 bg-primary opacity-60 animate-pulse"></div>
</div>
<div className="bg-surface-container-highest rounded-full h-full"></div>
</div>
</div>

<div className="relative bg-surface-container-low p-space-md rounded-lg flex flex-col space-y-space-md shadow-xl overflow-hidden">

<div className="absolute top-2 left-2 w-2.5 h-2.5 bg-primary-container opacity-40 rounded-tl-sm pointer-events-none"></div>
<div className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary-container opacity-40 rounded-tr-sm pointer-events-none"></div>
<div className="absolute bottom-2 left-2 w-2.5 h-2.5 bg-primary-container opacity-40 rounded-bl-sm pointer-events-none"></div>
<div className="absolute bottom-2 right-2 w-2.5 h-2.5 bg-primary-container opacity-40 rounded-br-sm pointer-events-none"></div>

<div className="flex items-start space-x-space-sm pt-1">
<div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
<div className="relative flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-[24px]">shield_lock</span>
</div>
</div>
<div className="flex flex-col min-w-0">
<h2 className="font-headline-md text-headline-md text-on-surface truncate">Reset Workspace Access</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">
            Enter the 6-hex token beamed to <span className="text-primary font-label-md">operator@sketchbot.io</span> to decrypt keypair.
          </p>
</div>
</div>

<div className="flex flex-col space-y-1.5">
<div className="flex justify-between items-center">
<label className="font-label-sm text-label-sm uppercase text-secondary tracking-widest flex items-center gap-1">
<span className="text-primary-container">§</span> Verification Hex Code
          </label>
<span className="font-annotation text-annotation text-primary-container">[EXP: 09:42]</span>
</div>

<div aria-label="6 Character Verification Code Input" className="grid grid-cols-6 gap-2 w-full pt-1" data-testid="verification-code-input" role="group" tabIndex={0}>
<div className="h-12 bg-surface-container-high rounded flex items-center justify-center text-primary font-headline-md text-headline-md">8</div>
<div className="h-12 bg-surface-container-high rounded flex items-center justify-center text-primary font-headline-md text-headline-md">F</div>
<div className="h-12 bg-surface-container-high rounded flex items-center justify-center text-primary font-headline-md text-headline-md">0</div>
<div className="h-12 bg-surface-container-high rounded flex items-center justify-center text-primary font-headline-md text-headline-md">2</div>

<div className="h-12 bg-surface-container-highest rounded flex items-center justify-center text-primary-container font-headline-md text-headline-md">
<span className="w-2.5 h-6 bg-primary-container animate-pulse rounded-xs"></span>
</div>

<div className="h-12 bg-surface-container rounded flex items-center justify-center text-outline font-headline-md text-headline-md">
<span className="w-2 h-0.5 bg-outline opacity-40 rounded"></span>
</div>
</div>
<div className="flex justify-between items-center pt-1">
<span className="font-annotation text-annotation text-on-surface-variant">FORMAT: SHA256_SEED_CHUNK</span>
<button className="font-label-md text-label-md text-primary-container hover:underline tracking-tight flex items-center gap-1" type="button">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
            Resend token (42s)
          </button>
</div>
</div>

<div className="flex flex-col space-y-space-sm pt-2">

<div className="flex flex-col space-y-1">
<label className="font-label-sm text-label-sm uppercase text-secondary tracking-widest flex items-center gap-1" htmlFor="reset-new-password">
<span className="text-primary-container">#</span> New Secret Key / Password
          </label>
<div className="relative flex items-center">
<input className="w-full bg-surface-container-high text-on-surface px-space-md py-2.5 rounded font-label-lg text-label-lg outline-none pr-10 focus:bg-surface-container-highest transition-colors" data-testid="reset-new-password" id="reset-new-password" placeholder="Min. 12 characters..." type="password" value="K3y!SketchBot#2025"/>
<button aria-label="Toggle password visibility" className="absolute right-3 text-secondary hover:text-primary-container transition-colors" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
</div>

<div className="pt-1 flex flex-col space-y-1">
<div className="flex items-center justify-between font-label-sm text-label-sm">
<span className="text-primary-container tracking-wider font-semibold">STRONG TELEMETRIC ENTROPY</span>
<span className="font-annotation text-annotation text-secondary">88.4 BITS</span>
</div>
<div className="grid grid-cols-4 gap-1.5 h-1 w-full">
<div className="bg-primary-container rounded-full h-full"></div>
<div className="bg-primary-container rounded-full h-full"></div>
<div className="bg-primary-container rounded-full h-full"></div>
<div className="bg-surface-container-highest rounded-full h-full"></div>
</div>
</div>
</div>

<div className="flex flex-col space-y-1 pt-1">
<label className="font-label-sm text-label-sm uppercase text-secondary tracking-widest flex items-center gap-1" htmlFor="reset-confirm-password">
<span className="text-primary-container">#</span> Confirm Secret Key
          </label>
<div className="relative flex items-center">
<input className="w-full bg-surface-container-high text-on-surface px-space-md py-2.5 rounded font-label-lg text-label-lg outline-none pr-10 focus:bg-surface-container-highest transition-colors" data-testid="reset-confirm-password" id="reset-confirm-password" placeholder="Re-enter secret passphrase" type="password" value="K3y!SketchBot#2025"/>
<div className="absolute right-3 flex items-center text-primary-container">
<span className="material-symbols-outlined text-[18px]">check_circle</span>
</div>
</div>
</div>
</div>

<div className="relative flex items-center justify-end px-2 py-1">
<svg className="w-8 h-6 text-primary-container opacity-80 mr-1" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 32 24">
<path d="M4 20 C12 22, 22 16, 26 4" strokeLinecap="round"></path>
<path d="M20 4 L26 4 L26 10" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
<span className="font-annotation text-annotation text-primary-fixed tracking-tight italic">
          keys hash locally before transmission ↗
        </span>
</div>

<div className="flex flex-col space-y-space-xs pt-1">
<button className="w-full bg-primary-fixed text-on-primary-fixed py-3 rounded-full font-headline-md text-label-lg font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-primary transition-all active:scale-[0.98]" data-testid="reset-submit" id="btn-submit">
<span>Update Access Key &amp; Sign In</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
<button className="w-full bg-transparent text-secondary py-2 rounded font-label-md text-label-md tracking-wider uppercase hover:text-on-surface transition-colors flex items-center justify-center gap-1" data-testid="forgot-submit" type="button">
<span className="material-symbols-outlined text-[14px]">tune</span>
          [ SWITCH_TO_HARDWARE_YUBIKEY ]
        </button>
</div>
</div>

<div className="bg-surface-container-lowest p-space-sm rounded-lg flex flex-col space-y-1.5 shadow-inner">
<div className="flex items-center justify-between font-label-sm text-label-sm text-outline pb-1">
<div className="flex items-center space-x-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant font-mono ml-2">DISPATCH_TELEMETRY.ts</span>
</div>
<span className="font-annotation text-annotation text-primary-container font-mono">FLOW_ID: FLOW_AUTH_RECOVERY_V2</span>
</div>
<div className="font-annotation text-annotation text-on-surface-variant space-y-0.5 leading-relaxed overflow-x-auto select-all">
<p className="text-outline">// FLOW: AUTH_RESET_DISPATCH</p>
<p><span className="text-primary-container">const</span> res = <span className="text-primary-container">await</span> authApi.<span className="text-primary">resetPassword</span>(&#123; token: <span className="text-primary">'8F02C1'</span>, newKeyHash: <span className="text-primary">'0x9af04d2'</span> &#125;);</p>
<p><span className="text-primary-container">if</span> (res.ok) router.<span className="text-primary">push</span>(<span className="text-primary">'/chat-workspace'</span>);</p>
</div>
</div>

<div className="flex items-center justify-around py-1 font-annotation text-annotation text-outline opacity-80">
<div className="flex items-center space-x-1">
<span className="material-symbols-outlined text-[14px] text-primary-container">lock</span>
<span>RSA-4096 E2EE</span>
</div>
<div className="flex items-center space-x-1">
<span className="material-symbols-outlined text-[14px] text-primary-container">memory</span>
<span>ECDSA CLIENT P-256</span>
</div>
<div className="flex items-center space-x-1">
<span className="material-symbols-outlined text-[14px] text-primary-container">verified_user</span>
<span>SOC2 TYPE II</span>
</div>
</div>
</div>
</div>

    </>
  );
}
