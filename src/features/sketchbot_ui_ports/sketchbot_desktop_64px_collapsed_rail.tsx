"use client";
/* eslint-disable */
import React from 'react';

export default function SketchbotDesktop64PxCollapsedRail() {
  return (
    <>
      <div className="flex flex-col w-full">
<div className="relative w-full min-h-[calc(100vh-3.5rem)] flex flex-row overflow-hidden bg-surface-container-lowest text-on-surface select-none">
<div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#3e484e_1px,transparent_1px)] [background-size:24px_24px]"></div>

<aside className="relative z-30 w-16 shrink-0 flex flex-col items-center justify-between py-space-sm bg-surface-container-low/95 backdrop-blur-md" data-testid="sidebar-rail">

<div className="absolute top-1 left-1 w-1.5 h-1.5 bg-outline-variant"></div>
<div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-outline-variant"></div>

<div className="flex flex-col items-center w-full gap-space-sm">

<div className="group relative flex items-center justify-center">
<div className="w-10 h-10 rounded-DEFAULT bg-surface-container-highest flex items-center justify-center text-primary-container shadow-sm cursor-pointer hover:bg-surface-bright transition-all">
<span className="font-headline-md text-headline-md tracking-tighter text-primary">⬡</span>
</div>

<div className="absolute left-14 ml-2 px-space-sm py-space-xs rounded bg-surface-bright text-on-surface font-label-sm text-label-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-xl">
            Sketchbot v2.4 // READY
          </div>
</div>

<div className="relative group w-full flex justify-center pt-space-xs">
<button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary hover:text-primary-container hover:bg-surface-container-high transition-colors" data-testid="rail-expand-toggle" id="btn-rail-expand" title="Expand to 248px full sidebar">
<span className="material-symbols-outlined text-[18px]">keyboard_double_arrow_right</span>
</button>

<div className="absolute left-12 top-0 ml-3 px-space-sm py-space-xs rounded bg-surface-container-highest text-primary font-annotation text-annotation hidden group-hover:flex items-center gap-1 z-50 whitespace-nowrap shadow-lg">
<span>expand to 248px full sidebar ←</span>
</div>
</div>

<nav className="flex flex-col items-center gap-space-xs w-full mt-space-xs">

<div className="group relative flex items-center justify-center w-full">
<div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-container rounded-r-full shadow-[0_0_8px_rgba(111,211,255,0.8)]"></div>
<button className="w-11 h-11 rounded-DEFAULT bg-primary-container/15 text-primary flex items-center justify-center relative hover:bg-primary-container/25 transition-colors" data-testid="rail-item-chats">
<span className="material-symbols-outlined text-[20px]">chat</span>
<span className="absolute top-1 right-1 w-4 h-4 bg-primary text-on-primary font-label-sm text-label-sm rounded-full flex items-center justify-center leading-none">3</span>
</button>
<div className="absolute left-14 ml-2 px-space-sm py-space-xs rounded bg-surface-bright text-on-surface font-label-md text-label-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
              CONDUITS [CHATS]
            </div>
</div>

<div className="group relative flex items-center justify-center w-full">
<button className="w-11 h-11 rounded-DEFAULT text-on-surface-variant flex items-center justify-center hover:bg-surface-container-high hover:text-on-surface transition-colors" data-testid="rail-item-groups">
<span className="material-symbols-outlined text-[20px]">group_work</span>
</button>
<div className="absolute left-14 ml-2 px-space-sm py-space-xs rounded bg-surface-bright text-on-surface font-label-md text-label-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
              WORKGROUPS (12)
            </div>
</div>

<div className="group relative flex items-center justify-center w-full">
<button className="w-11 h-11 rounded-DEFAULT text-on-surface-variant flex items-center justify-center hover:bg-surface-container-high hover:text-on-surface relative transition-colors" data-testid="rail-item-friends">
<span className="material-symbols-outlined text-[20px]">hub</span>
<span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
</button>
<div className="absolute left-14 ml-2 px-space-sm py-space-xs rounded bg-surface-bright text-on-surface font-label-md text-label-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
              PEERS & CADETS
            </div>
</div>

<div className="group relative flex items-center justify-center w-full">
<button className="w-11 h-11 rounded-DEFAULT text-on-surface-variant flex items-center justify-center hover:bg-surface-container-high hover:text-on-surface relative transition-colors">
<span className="material-symbols-outlined text-[20px]">contact_page</span>
<span className="absolute top-1 right-1 w-3.5 h-3.5 bg-secondary-container text-on-surface font-label-sm text-label-sm rounded-full flex items-center justify-center">2</span>
</button>
<div className="absolute left-14 ml-2 px-space-sm py-space-xs rounded bg-surface-bright text-on-surface font-label-md text-label-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
              INCOMING REQS (2)
            </div>
</div>

<div className="group relative flex items-center justify-center w-full">
<button className="w-11 h-11 rounded-DEFAULT text-on-surface-variant flex items-center justify-center hover:bg-surface-container-high hover:text-on-surface transition-colors" data-testid="rail-item-stories">
<div className="w-7 h-7 rounded-full p-[1.5px] bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-surface-container-lowest text-[15px]">motion_photos_on</span>
</div>
</button>
<div className="absolute left-14 ml-2 px-space-sm py-space-xs rounded bg-surface-bright text-on-surface font-label-md text-label-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
              DRAFT TIMELINES
            </div>
</div>

<div className="group relative flex items-center justify-center w-full">
<button className="w-11 h-11 rounded-DEFAULT text-on-surface-variant flex items-center justify-center hover:bg-surface-container-high hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[20px]">shield_lock</span>
</button>
<div className="absolute left-14 ml-2 px-space-sm py-space-xs rounded bg-surface-bright text-on-surface font-label-md text-label-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap shadow-lg">
              SILENCED / MUTED
            </div>
</div>
</nav>

<div className="w-8 h-px bg-outline-variant/40 my-space-xs"></div>

<div className="flex flex-col items-center gap-space-xs">
<div className="group relative cursor-pointer">
<div className="w-7 h-7 rounded-full p-[2px] bg-primary flex items-center justify-center">
<img className="w-full h-full rounded-full object-cover" data-alt="Mechanical designer avatar portrait headshot under industrial blue lighting in high fidelity dark atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBe6T4Nkdpq7pxnd9332h-mtf8V38jIcaO3rHEuDKeCEb7Lto6QZikhegSDQGghKhVYjWwLW_j1TZTf8KpBhKMl9gyNatHzER5NKBnTe44Zmg3AilBnzIB5HOQVPt2hS-ISCYFUoh6-vibc6Kh49ej6nTnPZWmnAbRynLT1aW5HALFKSckxFlLNMv0zdUKph05xf4WH9tXRYR3kh1_MT3englvYNA7tjLqlw8rBNsyc3gN9jmJSsJtk"/>
</div>
<div className="absolute left-12 ml-2 px-space-xs py-0.5 rounded bg-surface-bright text-on-surface font-label-sm text-label-sm opacity-0 pointer-events-none group-hover:opacity-100 z-50 whitespace-nowrap">
              Maya Chen: Wireframe V3
            </div>
</div>
<div className="group relative cursor-pointer">
<div className="w-7 h-7 rounded-full p-[2px] bg-outline-variant flex items-center justify-center">
<img className="w-full h-full rounded-full object-cover" data-alt="Robotics technician profile close-up with neon green safety glasses in schematic design center" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfuNNW7offdsn0944pAqjOnvd9sPLjqOar26IQZ5-XRJaYtwmCsjixtLijUjRXRhpm0ONGzU_JQmMvoWy0-uBRg5yD2v5Etqp5XgLq55wiwImh53qCe_ydE_m0Vswap_41tJ4NmuLWhLIovEgR1_ZJ5zAOBYSfsUkPobKYMGUXDLSL2U4uwWbsVsTf0irHOU_1H3LlaJW_plazUp2yFPVLSq_Ody2WXywBFzpsQTyv9FFwjwHyRbaR"/>
</div>
<div className="absolute left-12 ml-2 px-space-xs py-0.5 rounded bg-surface-bright text-on-surface font-label-sm text-label-sm opacity-0 pointer-events-none group-hover:opacity-100 z-50 whitespace-nowrap">
              Dr. Marcus: Stress Mesh
            </div>
</div>
</div>
</div>

<div className="flex flex-col items-center gap-space-sm w-full pt-space-sm">
<div className="group relative flex items-center justify-center">
<div className="relative w-9 h-9 rounded-full bg-surface-container-highest flex items-center justify-center cursor-pointer">
<img className="w-8 h-8 rounded-full object-cover" data-alt="System operator digital illustration with holographic monocle and carbon fiber headset" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6oQxEGdYxczTjkp1E0xRh7NUqZhLP4LOMAfnyaDBwbjOrr5-JH8GPaei7XT4joPZlROzeKA25FUOk7BIwd2upgPrKb6XeNOSLbOaHMhU7fo9Rh34HFNg4AZ_vDTMJn6cQUdTx-cCx9eeI2Tggcx1UJd1BteUfJmKrEYPKCxSqJV5vlpBQ2oYjmCTF6e35byv6QzZuJt4ewEwncBoNxuPMer5RTJpqJB8P6jH7KJ7aC5bC9Np_dTyO"/>
<div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-container ring-2 ring-surface-container-low"></div>
</div>
<div className="absolute left-14 ml-2 px-space-sm py-space-xs rounded bg-surface-bright text-on-surface font-label-sm text-label-sm opacity-0 pointer-events-none group-hover:opacity-100 z-50 whitespace-nowrap shadow-lg">
            OPERATOR::OP_892 [ONLINE]
          </div>
</div>
<button className="w-9 h-9 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high flex items-center justify-center transition-colors" title="System Settings">
<span className="material-symbols-outlined text-[19px]">settings</span>
</button>
</div>
</aside>

<section className="relative z-20 w-60 shrink-0 bg-surface-container-low/70 flex flex-col justify-between py-space-sm">
<div className="flex flex-col h-full">

<div className="px-space-md pb-space-sm flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm tracking-wider uppercase text-secondary">CONDUITS // ACTIVE</span>
<button className="w-6 h-6 rounded flex items-center justify-center text-outline hover:text-on-surface transition-colors" title="Filter Threads">
<span className="material-symbols-outlined text-[16px]">tune</span>
</button>
</div>

<div className="relative w-full mt-1">
<span className="material-symbols-outlined absolute left-2 top-2 text-outline text-[16px]">search</span>
<input className="w-full bg-surface-container-high/60 text-on-surface placeholder-outline font-label-sm text-label-sm pl-7 pr-space-sm py-1.5 rounded-DEFAULT focus:outline-none focus:bg-surface-container-high transition-all" placeholder="FILTER CONDUIT..." type="text"/>
</div>
</div>

<div className="flex-1 overflow-y-auto px-space-xs flex flex-col gap-space-xs">

<div className="p-space-sm rounded-DEFAULT bg-surface-container-high/90 shadow-md cursor-pointer relative overflow-hidden transition-all group">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-container"></div>
<div className="flex items-center justify-between mb-0.5">
<span className="font-label-md text-label-md text-primary font-bold truncate">Maya Chen</span>
<span className="font-label-sm text-label-sm text-secondary">14:32</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 group-hover:text-on-surface">Actuator load vectors updated to 4.2kN</p>
<div className="mt-1.5 flex items-center gap-space-xs font-label-sm text-label-sm text-primary">
<span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
<span>SYNCHRONIZED // CAD-DXF</span>
</div>
</div>

<div className="p-space-sm rounded-DEFAULT hover:bg-surface-container-high/50 cursor-pointer transition-all">
<div className="flex items-center justify-between mb-0.5">
<span className="font-label-md text-label-md text-on-surface font-medium truncate">Stress-Calc Bot</span>
<span className="font-label-sm text-label-sm text-outline">13:10</span>
</div>
<p className="font-body-sm text-body-sm text-outline line-clamp-1">Mesh converged at 99.4% threshold</p>
<div className="mt-1 flex items-center gap-space-xs font-label-sm text-label-sm text-outline">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
<span>BATCH COMPLETE</span>
</div>
</div>

<div className="p-space-sm rounded-DEFAULT hover:bg-surface-container-high/50 cursor-pointer transition-all">
<div className="flex items-center justify-between mb-0.5">
<span className="font-label-md text-label-md text-on-surface font-medium truncate">Gantry Arm V3</span>
<span className="font-label-sm text-label-sm text-outline">11:05</span>
</div>
<p className="font-body-sm text-body-sm text-outline line-clamp-1">Kinematics collision test: PASS</p>
<div className="mt-1 flex items-center gap-space-xs font-label-sm text-label-sm text-outline">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span>3 NEW CADETS</span>
</div>
</div>

<div className="p-space-sm rounded-DEFAULT hover:bg-surface-container-high/50 cursor-pointer transition-all">
<div className="flex items-center justify-between mb-0.5">
<span className="font-label-md text-label-md text-on-surface font-medium truncate">Avionics HUD</span>
<span className="font-label-sm text-label-sm text-outline">YESTERDAY</span>
</div>
<p className="font-body-sm text-body-sm text-outline line-clamp-1">Refined symbology vectors published</p>
<div className="mt-1 flex items-center gap-space-xs font-label-sm text-label-sm text-outline">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
<span>READ_ONLY</span>
</div>
</div>
</div>

<div className="px-space-md pt-space-xs">
<div className="p-space-xs rounded bg-surface-container-highest/40 flex items-center justify-between font-label-sm text-label-sm text-secondary">
<span>THREADS: 04</span>
<span className="text-primary-container">POLL: 500MS</span>
</div>
</div>
</div>
</section>

<div className="relative z-10 flex-1 flex flex-col justify-between overflow-hidden bg-surface-container-lowest" data-testid="chat-view">

<div className="h-14 px-space-lg flex items-center justify-between bg-surface-container-low/50 backdrop-blur-md shrink-0">
<div className="flex items-center gap-space-md">
<div className="relative">
<div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="Mechanical lead engineer portrait with holographic blueprints background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFHLi8GDD9Jbq8SuYOVsDU2oStBRmzECI0vrLKmiJCXY_pjlXNO20nMcg1tzXqp0s9FLEjmenPt3WIAB-zh60kaoe_lAZlxfKIq2e6irfZLRSllGXFytSZ5T_CH1XIsBQBj5a02XfxgAVZnYQcda4zaTd5xVPupW8iEefTmZPPfoCuGqqan4qTpqEKWTlrf6zDWe4rEo_zBfaGs4auMdf5HTf4ZeoOY-7ZoxaQDimZkdtSg2u-mKnY"/>
</div>
<div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-container ring-2 ring-surface-container-low"></div>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-space-xs">
<span className="font-headline-md text-headline-md tracking-tight text-on-surface">Maya Chen</span>
<span className="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary font-label-sm text-label-sm uppercase">LEAD_ARCH</span>
</div>
<div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm">
<span className="text-primary-container font-mono">[FREQ: 0x7F // LAT: 18ms]</span>
<span>•</span>
<span>DRAFTING RIG V2.4 RUNNING</span>
</div>
</div>
</div>
<div className="flex items-center gap-space-sm">
<button className="w-8 h-8 rounded-DEFAULT bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" title="Voice Comm">
<span className="material-symbols-outlined text-[18px]">call</span>
</button>
<button className="w-8 h-8 rounded-DEFAULT bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors" title="Search Stream">
<span className="material-symbols-outlined text-[18px]">search</span>
</button>
<button className="w-8 h-8 rounded-DEFAULT bg-surface-container flex items-center justify-center text-primary-container hover:bg-surface-container-high transition-colors" title="Toggle Inspector Pane">
<span className="material-symbols-outlined text-[18px]">view_sidebar</span>
</button>
</div>
</div>

<div className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-lg">

<div className="flex flex-col items-start max-w-2xl">
<div className="flex items-center gap-space-xs mb-space-xs">
<span className="font-label-sm text-label-sm text-secondary font-bold">MAYA CHEN</span>
<span className="font-label-sm text-label-sm text-outline">14:28:11</span>
<span className="px-1 py-0.2 rounded bg-surface-container-high font-annotation text-annotation text-secondary">DXF_EXPORT</span>
</div>
<div className="w-full rounded-DEFAULT bg-surface-container-low p-space-md shadow-xl relative overflow-hidden">

<div className="absolute top-2 left-2 font-label-sm text-label-sm text-outline-variant">+</div>
<div className="absolute top-2 right-2 font-label-sm text-label-sm text-outline-variant">+</div>
<div className="absolute bottom-2 left-2 font-label-sm text-label-sm text-outline-variant">+</div>
<div className="absolute bottom-2 right-2 font-label-sm text-label-sm text-outline-variant">+</div>
<div className="flex items-center justify-between mb-space-sm">
<span className="font-label-md text-label-md text-primary font-mono tracking-wider">SCHEMATIC://GANTRY_HYDRAULIC_04.SVG</span>
<span className="font-label-sm text-label-sm text-outline">SCALE 1:20 // ISO-8888</span>
</div>

<div className="w-full h-44 bg-surface-container-lowest rounded flex items-center justify-center p-2 relative overflow-hidden">
<svg className="w-full h-full text-primary-container" viewBox="0 0 500 160">
<defs>
<pattern height="20" id="cad-grid" patternUnits="userSpaceOnUse" width="20">
<circle cx="2" cy="2" fill="#3e484e" r="0.75"></circle>
</pattern>
</defs>
<rect fill="url(#cad-grid)" height="100%" width="100%"></rect>

<path d="M 40 80 L 140 80 L 180 50 L 320 50 L 360 80 L 460 80" fill="none" stroke="currentColor" strokeDasharray="4 2" strokeWidth="2"></path>
<rect fill="#282a2d" height="20" rx="4" stroke="#6fd3ff" strokeWidth="1.5" width="140" x="180" y="40"></rect>

<line marker-end="url(#arrow)" stroke="#c1e9ff" strokeWidth="2" x1="250" x2="250" y1="20" y2="40"></line>
<circle cx="250" cy="50" fill="#6fd3ff" r="5"></circle>
<text fill="#c1e9ff" font-family="JetBrains Mono" font-size="9" x="260" y="30">F_MAX = 4.2 kN</text>

<line stroke="#889299" strokeWidth="1" x1="80" x2="80" y1="70" y2="90"></line>
<line stroke="#889299" strokeWidth="1" x1="70" x2="90" y1="80" y2="80"></line>
<line stroke="#889299" strokeWidth="1" x1="420" x2="420" y1="70" y2="90"></line>
<line stroke="#889299" strokeWidth="1" x1="410" x2="430" y1="80" y2="80"></line>
<text fill="#889299" font-family="Space Mono" font-size="8" x="50" y="140">TOLERANCE: ±0.015mm</text>
<text fill="#889299" font-family="Space Mono" font-size="8" x="360" y="140">MATERIAL: Ti-6Al-4V</text>
</svg>
</div>
<p className="mt-space-sm font-body-md text-body-md text-on-surface">
              I’ve recalibrated the pivot load vectors according to the new stress simulation. Run the tolerance sanity checker before we cut the test plate.
            </p>
</div>
</div>

<div className="flex flex-col items-end self-end max-w-xl">
<div className="flex items-center gap-space-xs mb-space-xs">
<span className="font-label-sm text-label-sm text-primary">OPERATOR (YOU)</span>
<span className="font-label-sm text-label-sm text-outline">14:32:05</span>
</div>
<div className="w-full rounded-DEFAULT bg-surface-container p-space-md shadow-xl relative overflow-hidden">
<p className="font-body-md text-body-md text-on-surface">
              Running verification against the ANSYS batch profile. Initial yield envelope checks clear. Injecting telemetry stream into your local CAD viewport now.
            </p>
<div className="mt-space-sm pt-space-xs flex items-center justify-between text-outline font-label-sm text-label-sm">
<span className="text-primary-container font-mono">STATUS: ACK // INJECTED</span>
<div className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-[14px]">done_all</span>
<span>SEEN 14:32</span>
</div>
</div>
</div>
</div>

<div className="flex items-center gap-space-sm px-space-md py-space-xs opacity-80 self-center">
<svg className="text-primary-container" fill="none" height="24" viewBox="0 0 24 24" width="24">
<path d="M4 18 C 10 12, 14 16, 20 6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
<path d="M16 6 L 20 6 L 19 10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
</svg>
<span className="font-annotation text-annotation text-primary tracking-wide">
            note: verify pin shear angle along axis theta = 33.4°
          </span>
</div>
</div>

<div className="p-space-md bg-surface-container-low/90 backdrop-blur-md shrink-0">
<div className="relative w-full rounded-full bg-surface-container-high/90 shadow-2xl flex items-center px-space-md py-space-xs transition-all focus-within:shadow-[0_0_16px_rgba(111,211,255,0.2)]">
<button className="w-9 h-9 rounded-full text-secondary hover:text-primary flex items-center justify-center hover:bg-surface-bright transition-colors" title="Attach Schematic (.DWG, .DXF)">
<span className="material-symbols-outlined text-[20px]">attach_file</span>
</button>
<button className="w-9 h-9 rounded-full text-secondary hover:text-primary flex items-center justify-center hover:bg-surface-bright transition-colors" title="Insert Coordinate Macro">
<span className="material-symbols-outlined text-[20px]">add_location_alt</span>
</button>
<input className="flex-1 bg-transparent px-space-md py-2 font-body-md text-body-md text-on-surface placeholder-outline focus:outline-none" data-testid="chat-input" id="chat-prompt-input" placeholder="TRANSMIT DIRECTIVE OR DROP PARAMETERS [ALT+ENTER FOR CODE]..." type="text"/>
<div className="flex items-center gap-space-xs">
<button className="w-9 h-9 rounded-full text-secondary hover:text-primary flex items-center justify-center hover:bg-surface-bright transition-colors" title="Voice Channel Macro">
<span className="material-symbols-outlined text-[20px]">mic</span>
</button>
<button className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg hover:shadow-[0_0_12px_rgba(111,211,255,0.5)] transition-all" data-testid="chat-send" id="chat-btn-send">
<span className="material-symbols-outlined text-[20px]">send</span>
</button>
</div>
</div>
</div>

      </div>
</div>
      </div>
    </>
  );
}
