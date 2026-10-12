"use client";
/* eslint-disable */
import React from 'react';

export default function SketchbotSilencedModeration() {
  return (
    <>
      <div className="flex flex-col w-full px-margin-mobile pb-space-xl">

<div className="flex flex-col gap-space-xs mt-space-md mb-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed-dim">[ MOD_GUARD // ACTIVE ]</span>
</div>
<span className="font-annotation text-annotation text-on-surface-variant opacity-70">/* FLOW_ID: MOD-04 // /settings/silenced */</span>
</div>
<div className="flex items-center justify-between">
<h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-semibold tracking-tight">Silenced &amp; Moderation</h2>
<span className="font-label-md text-label-md text-primary-container bg-surface-container-high px-space-xs py-0.5 rounded-full">v2.4 SEC</span>
</div>
</div>

<div className="relative bg-surface-container-low rounded-DEFAULT p-space-md mb-space-md overflow-hidden">
<div className="absolute top-0 left-0 w-2 h-2 bg-primary-container"></div>
<div className="absolute top-0 right-0 w-2 h-2 bg-primary-container"></div>
<div className="flex items-start gap-space-sm">
<div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-primary-container text-[16px]">shield_with_heart</span>
</div>
<div className="flex flex-col gap-0.5">
<span className="font-label-sm text-label-sm tracking-wider uppercase text-primary font-semibold">SIGNAL BUFFER ACTIVE</span>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Incoming packets from silenced channels are suppressed from audio and vibration alerts, but preserved in the local telemetry audit buffer.
        </p>
</div>
</div>
</div>

<div className="flex items-center p-1 bg-surface-container-lowest rounded-full gap-1 mb-space-lg" data-testid="silenced-tabs" id="moderation-tabs">
<button className="flex-1 py-1.5 px-space-xs rounded-full bg-surface-container-high text-primary-fixed font-label-md text-label-md text-center transition-all shadow-sm" data-tab="channels" type="button">
      Muted (4)
    </button>
<button className="flex-1 py-1.5 px-space-xs rounded-full bg-transparent text-on-surface-variant font-label-md text-label-md text-center hover:text-on-surface transition-all" data-tab="peers" type="button">
      Blocked (3)
    </button>
<button className="flex-1 py-1.5 px-space-xs rounded-full bg-transparent text-on-surface-variant font-label-md text-label-md text-center hover:text-on-surface transition-all" data-tab="keywords" type="button">
      Keywords (12)
    </button>
</div>

<div className="flex flex-col gap-space-sm mb-space-lg" data-testid="silenced-list">
<div className="flex items-center justify-between px-space-xs">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-on-surface-variant text-[16px]">volume_off</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Muted Conversations &amp; Channels</span>
</div>
<span className="font-annotation text-annotation text-primary-fixed-dim">03 CHANNELS</span>
</div>

<div className="relative bg-surface-container rounded-DEFAULT p-space-md flex items-center justify-between">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
<span className="font-label-md text-label-md text-primary font-bold">#</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface font-medium truncate">telemetry-alerts</span>
<div className="flex items-center gap-space-xs mt-0.5">
<span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Muted for 24h</span>
</div>
</div>
</div>
<button className="px-space-md py-1 rounded-full bg-surface-container-highest hover:bg-surface-bright text-primary font-label-md text-label-md transition-colors shrink-0" data-testid="unmute-channel" type="button">
        Unmute
      </button>
</div>

<div className="relative bg-surface-container rounded-DEFAULT p-space-md flex items-center justify-between">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary text-[18px]">smart_toy</span>
</div>
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-space-xs">
<span className="font-body-md text-body-md text-on-surface font-medium truncate">Stress-Calc Bot</span>
<span className="font-label-sm text-label-sm text-secondary px-1 bg-surface-container-lowest rounded-full">BOT</span>
</div>
<div className="flex items-center gap-space-xs mt-0.5">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Muted until unmuted</span>
</div>
</div>
</div>
<button className="px-space-md py-1 rounded-full bg-surface-container-highest hover:bg-surface-bright text-primary font-label-md text-label-md transition-colors shrink-0" data-testid="unmute-channel" type="button">
        Unmute
      </button>
</div>

<div className="relative bg-surface-container rounded-DEFAULT p-space-md flex items-center justify-between">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary text-[18px]">hub</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface font-medium truncate">Avionics HUD Team</span>
<div className="flex items-center gap-space-xs mt-0.5">
<span className="w-1.5 h-1.5 rounded-full bg-on-surface-variant"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Until tomorrow 09:00</span>
</div>
</div>
</div>

<label className="relative inline-flex items-center cursor-pointer shrink-0">
<input defaultChecked className="sr-only peer" data-testid="mute-toggle" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-lowest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-primary-fixed after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>
</div>

<div className="flex flex-col gap-space-sm mb-space-lg">
<div className="flex items-center justify-between px-space-xs">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-error text-[16px]">block</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Blocked Peers Registry</span>
</div>
<span className="font-annotation text-annotation text-on-surface-variant">REG // SEC-ZONE</span>
</div>

<div className="relative bg-surface-container rounded-DEFAULT p-space-md flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden shrink-0">
<img className="w-full h-full object-cover" data-alt="Technical avatar portrait of Dr. Gregory Rust wearing round titanium drafting glasses against a dark blueprint schematic background with soft teal backlight and monochrome tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZYnddRUImW527YZ-PiF6VZUOL__zW8c6g8M5VqRnwizYIECRppTsSJxfO_7qIKa7uQO2km_4AWYjIu0Y8wU7TPAb-OdYj-dZmZO59CK4nkhAMqg0L56B8rHIcaUPnrMCJ3trpCtFxdlI3Cc-SGQO7SQs1VBTa3BkTNB59G6n7DrClIeOTvkFmYflHTnn883b0yjK48N7PcaIR-FecY52kDmyBDTOjowWS-tFnVIpateNFb-tRMqm_"/>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface font-semibold truncate">Dr. Gregory Rust</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">@rust_core • ID: #4091</span>
</div>
</div>
<button className="px-space-md py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md font-semibold hover:bg-white transition-all shadow-md shrink-0" data-testid="unblock-user" type="button">
          Unblock
        </button>
</div>
<div className="flex items-center gap-space-xs pt-space-xs">
<span className="px-space-xs py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm">
          Spam bot signals
        </span>
<span className="font-annotation text-annotation text-on-surface-variant">Suppressed on 14 Mar</span>
</div>
</div>

<div className="relative flex items-center justify-end px-space-md -my-1">
<div className="flex items-center gap-1.5 text-primary-container">

<span className="font-annotation text-annotation tracking-tight text-primary-fixed-dim">peer restored instantly ↑</span>

<svg className="w-8 h-4 text-primary-container" fill="none" viewBox="0 0 32 16" xmlns="http://www.w3.org/2000/svg">
<path d="M2 14C8 10 20 12 28 4M28 4V10M28 4H22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
</svg>
</div>
</div>

<div className="relative bg-surface-container rounded-DEFAULT p-space-md flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden shrink-0">
<img className="w-full h-full object-cover" data-alt="Monochromatic blueprint holographic avatar icon of an anonymous operator with glitch line vector wireframes on a dark slate surface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQayt31dxEuqMx5NiXdUda-jKXeslGAFpKQKAXIyjmASZFbYjdN-qzLoLmbWQORPOlYS36L9nBw_3IkimQ_51uHgCOpdjAUi3Yf5jCtEU6Jyr8cpgmzwAx6meS4AsKDhx02Beo9BqeIKJkyPJeoEjIdCcf8y5rRu7EfISwXq7Q3bE-OhrpPKbMomgI8AgDeD-vXJDM3iDjavBV5GZA1-tVKstIA6dAf87owcc7bSXwJr9UnyMJGaqT"/>
</div>
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface font-semibold truncate">Unknown Operator</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">@node_8829 • ID: #8829</span>
</div>
</div>
<button className="px-space-md py-1.5 rounded-full bg-surface-container-highest text-primary font-label-md text-label-md font-semibold hover:bg-surface-bright transition-all shrink-0" data-testid="unblock-user" type="button">
          Unblock
        </button>
</div>
<div className="flex items-center gap-space-xs pt-space-xs">
<span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
          Unsolicited CAD files
        </span>
<span className="font-annotation text-annotation text-on-surface-variant">Suppressed on 02 Apr</span>
</div>
</div>
</div>

<div className="flex flex-col gap-space-sm mb-space-lg">
<div className="flex items-center justify-between px-space-xs">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[16px]">tune</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Global Suppression Rules</span>
</div>
<span className="font-annotation text-annotation text-primary-fixed-dim">CONFIG AUTO</span>
</div>

<div className="relative bg-surface-container rounded-DEFAULT p-space-md flex items-center justify-between gap-space-md">
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface font-medium leading-snug">Auto-silence unknown node invitations</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Mutes direct channel rings from unverified mesh peers</span>
</div>
<label className="relative inline-flex items-center cursor-pointer shrink-0">
<input defaultChecked className="sr-only peer" data-testid="mute-toggle" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-lowest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-primary-fixed after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</label>
</div>

<div className="relative bg-surface-container rounded-DEFAULT p-space-md flex items-center justify-between gap-space-md">
<div className="flex flex-col min-w-0">
<span className="font-body-md text-body-md text-on-surface font-medium leading-snug">Hide blocked activity in shared workspaces</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Redacts drawing commits, cursor telemetry, and shared logs</span>
</div>
<label className="relative inline-flex items-center cursor-pointer shrink-0">
<input className="sr-only peer" data-testid="mute-toggle" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-lowest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface-variant after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container peer-checked:after:bg-on-primary-fixed"></div>
</label>
</div>
</div>

<div className="relative bg-surface-container-lowest rounded-DEFAULT p-space-md mb-space-lg overflow-hidden">
<div className="flex items-center justify-between pb-space-xs mb-space-xs">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-error-container"></span>
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant ml-1 font-mono">telemetry.contract.ts</span>
</div>
<span className="font-label-sm text-label-sm text-primary">READOUT</span>
</div>
<pre className="font-label-sm text-label-sm text-primary-fixed-dim whitespace-pre-wrap leading-relaxed select-all"><span className="text-on-surface-variant">&#47;&#47; SKETCHBOT_ROUTE_CONTRACT</span>
<span className="text-tertiary">import</span> &#123; useModerationSync &#125; <span className="text-tertiary">from</span> <span className="text-primary-container">'@sketchbot/telemetry'</span>;
dispatch(&#123;
  type: <span className="text-primary-container">'SYNC_SILENCED_PEERS'</span>,
  targetId: <span className="text-primary-container">'node_8829'</span>,
  action: <span className="text-primary-container">'UNBLOCK'</span>
&#125;);</pre>
</div>
</div>

    </>
  );
}
