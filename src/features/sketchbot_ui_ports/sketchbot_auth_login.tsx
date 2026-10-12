"use client";
/* eslint-disable */
import React from 'react';

export default function SketchbotAuthLogin() {
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center relative">
<div className="relative w-full max-w-[352px] bg-surface-container-lowest/80 backdrop-blur-xl rounded-xl p-space-md shadow-2xl flex flex-col gap-space-md overflow-hidden">
<div className="absolute top-0 left-0 w-2.5 h-2.5 pointer-events-none">
<div className="absolute top-0 left-0 w-2.5 h-[1.5px] bg-primary"></div>
<div className="absolute top-0 left-0 w-[1.5px] h-2.5 bg-primary"></div>
</div>
<div className="absolute top-0 right-0 w-2.5 h-2.5 pointer-events-none">
<div className="absolute top-0 right-0 w-2.5 h-[1.5px] bg-primary"></div>
<div className="absolute top-0 right-0 w-[1.5px] h-2.5 bg-primary"></div>
</div>
<div className="absolute bottom-0 left-0 w-2.5 h-2.5 pointer-events-none">
<div className="absolute bottom-0 left-0 w-2.5 h-[1.5px] bg-primary"></div>
<div className="absolute bottom-0 left-0 w-[1.5px] h-2.5 bg-primary"></div>
</div>
<div className="absolute bottom-0 right-0 w-2.5 h-2.5 pointer-events-none">
<div className="absolute bottom-0 right-0 w-2.5 h-[1.5px] bg-primary"></div>
<div className="absolute bottom-0 right-0 w-[1.5px] h-2.5 bg-primary"></div>
</div>
<svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
<rect className="text-primary-fixed-dim" fill="none" height="99.2%" rx="16" stroke="currentColor" strokeDasharray="160 3 120 4" strokeWidth="1.2" width="99.2%" x="1" y="1"></rect>
</svg>
<div className="flex flex-col items-center text-center pt-space-xs">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center mb-space-sm text-primary shadow-sm">
<svg className="w-6 h-6 stroke-current fill-transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
<path d="M12 2l7.5 4.33v8.66L12 22l-7.5-4.33V6.33L12 2z"></path>
<path d="M12 7v10" strokeDasharray="2 2" strokeWidth="1.5"></path>
</svg>
</div>
<h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-semibold tracking-tight">Chat-box</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Welcome back to your drafting workspace.</p>
</div>
<div className="flex flex-col gap-space-sm w-full">
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface-variant flex justify-between" htmlFor="email">
<span>Work Email</span>
<span className="text-primary-fixed-dim font-annotation text-annotation">ID: 01</span>
</label>
<div className="relative flex items-center">
<input className="w-full bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl px-3.5 py-2.5 placeholder-outline focus:outline-none focus:bg-surface-container-highest transition-colors" data-testid="auth-email" id="email" placeholder="operator@sketchbot.io" type="email"/>
</div>
</div>
<div className="flex flex-col gap-1.5">
<div className="flex justify-between items-center">
<label className="font-label-md text-label-md text-on-surface-variant flex gap-1 items-center" htmlFor="password">
<span>Password</span>
<span className="text-primary-fixed-dim font-annotation text-annotation">ID: 02</span>
</label>
<a className="font-label-sm text-label-sm text-primary hover:underline" href="#">Forgot password?</a>
</div>
<div className="relative flex items-center">
<input className="w-full bg-surface-container-high text-on-surface font-body-md text-body-md rounded-xl px-3.5 py-2.5 pr-10 placeholder-outline focus:outline-none focus:bg-surface-container-highest transition-colors" data-testid="auth-password" id="password" placeholder="••••••••••••" type="password"/>
<button aria-label="Toggle password visibility" className="absolute right-3 text-outline hover:text-on-surface flex items-center justify-center p-1" id="togglePassword" type="button">
<span className="material-symbols-outlined text-[18px]" id="eyeIcon">visibility</span>
</button>
</div>
</div>
<div className="hidden flex items-center gap-2 p-2 rounded-lg bg-surface-container text-tertiary font-body-sm text-body-sm" data-testid="auth-error" id="authErrorArea">
<span className="material-symbols-outlined text-[16px] text-tertiary">info</span>
<span id="errorMessage">Invalid session credentials</span>
</div>
<button className="w-full h-11 bg-primary text-on-primary font-body-md text-body-md font-semibold rounded-full mt-1 flex items-center justify-center gap-2 hover:bg-white active:scale-[0.98] transition-all shadow-md" data-testid="auth-submit" id="submitBtn" type="button">
<span>Sign In to Workspace</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
<div className="relative flex items-center justify-center my-0.5">
<div className="w-full h-[1px] bg-surface-container-highest"></div>
<span className="absolute bg-surface-container-lowest px-2 font-label-sm text-label-sm text-outline uppercase tracking-wider">or continue with</span>
</div>
<div className="grid grid-cols-2 gap-2 w-full">
<button className="h-10 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-full flex items-center justify-center gap-2 transition-colors px-3" type="button">
<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path>
</svg>
<span className="font-label-md text-label-md">GitHub</span>
</button>
<button className="h-10 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-full flex items-center justify-center gap-2 transition-colors px-3" type="button">
<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
<path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.053 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path>
</svg>
<span className="font-label-md text-label-md">Google</span>
</button>
</div>
<div className="flex items-center justify-center pt-space-xs text-center">
<p className="font-body-sm text-body-sm text-outline">
        Don't have an account? 
        <a className="text-on-surface font-semibold hover:text-primary transition-colors ml-1" href="#">Create account</a>
</p>
</div>
</div>
<div className="flex items-center gap-2 mt-4 px-3 py-1">
<svg className="w-8 h-5 text-tertiary-container stroke-current fill-transparent" viewBox="0 0 32 20">
<path d="M4 14 C12 18, 22 14, 26 4" strokeLinecap="round" strokeWidth="1.5"></path>
<path d="M22 4 L27 4 L26 9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
</svg>
<span className="font-annotation text-annotation text-tertiary italic">
      quick sync available ↑
    </span>
</div>
</div>

    </>
  );
}
