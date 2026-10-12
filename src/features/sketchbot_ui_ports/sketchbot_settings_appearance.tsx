
"use client";
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { apiFetch } from '@/lib/api/client';
import { toast } from "sonner";

export default function SketchbotSettingsAppearance() {
  const { data: profile, mutate } = useSWR<any>('/me', apiFetch);
  const [displayName, setDisplayName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (profile?.displayName) setDisplayName(profile.displayName);
  }, [profile]);

  const handleUpdateProfile = async () => {
    if (!displayName.trim()) return;
    setIsUpdating(true);
    try {
      await apiFetch('/me', {
        method: 'PUT',
        body: JSON.stringify({ displayName })
      });
      toast.success("Profile parameters synced.");
      mutate();
    } catch(e) {
      toast.error("Sync failed.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex w-full h-full bg-white font-sans text-[12px] divide-x divide-black">
      
      {/* ====== MOBILE VIEW (M-05) ====== */}
      <div className="flex md:hidden flex-col w-full h-full bg-gray-50 relative">
        {/* System Architecture Pill */}
        <div className="px-3 pt-3 pb-2 border-b border-black bg-white">
          <div className="w-full bg-black text-white p-2 font-mono text-[10px] flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="truncate">[NODE: M-05 | ROUTE: /settings | PARENT: M-01 | CONNECTS_TO: AUTH]</span>
            </div>
            <span className="material-symbols-outlined text-[14px]">tune</span>
          </div>
        </div>

        {/* Header */}
        <div className="px-3 py-4 border-b border-black bg-white">
          <h1 className="font-sans font-bold text-[20px] text-black tracking-tight uppercase">System Configuration</h1>
          <p className="font-sans text-[12px] text-gray-500 mt-1">Manage node profile and parameters.</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Active Profile Header */}
          <div className="border border-black bg-white p-4 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-16 h-16 border-2 border-black bg-black text-white flex items-center justify-center font-bold text-[24px] uppercase shrink-0">
               {profile?.username?.charAt(0) || "U"}
            </div>
            <div className="flex flex-col min-w-0">
               <span className="font-sans font-bold text-[18px] text-black truncate">{profile?.username || "OPERATOR"}</span>
               <span className="font-mono text-[11px] text-gray-500 truncate mt-1">ID: {profile?.id || "XXXXXXXX"}</span>
               <div className="flex items-center gap-1.5 mt-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse border border-black"></span>
                 <span className="font-sans font-bold text-[10px] text-black uppercase">Online</span>
               </div>
            </div>
          </div>

          {/* Config Modules */}
          <div className="border border-black bg-white flex flex-col">
             <div className="p-3 border-b border-black bg-gray-100 flex items-center gap-2">
               <span className="material-symbols-outlined text-[16px]">id_card</span>
               <span className="font-sans font-bold text-[12px] uppercase tracking-widest">Identity Override</span>
             </div>
             <div className="p-4 flex flex-col gap-3">
               <div className="flex flex-col gap-1">
                 <label className="font-sans text-[11px] font-bold text-gray-500 uppercase">Display Alias</label>
                 <input 
                   type="text" 
                   value={displayName}
                   onChange={e => setDisplayName(e.target.value)}
                   className="w-full bg-white border border-black px-3 py-2 font-sans text-[13px] text-black focus:outline-none focus:ring-2 focus:ring-black/20"
                 />
               </div>
               <button 
                 onClick={handleUpdateProfile}
                 disabled={isUpdating}
                 className="w-full py-2.5 bg-black text-white font-sans text-[12px] font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50"
               >
                 {isUpdating ? 'Applying...' : 'Commit Changes'}
               </button>
             </div>
          </div>



        </div>
      </div>

      {/* ====== DESKTOP VIEW ====== */}
      <div className="hidden md:flex w-full h-full bg-white divide-x divide-black relative">
        {/* LEFT COLUMN: NAVIGATION */}
        <div className="w-[240px] shrink-0 flex flex-col bg-gray-50">
          <div className="px-4 py-5 border-b border-black bg-white">
            <h2 className="font-sans font-bold text-[18px] text-black tracking-tight uppercase">Config</h2>
          </div>
          <div className="flex flex-col p-2 gap-1 flex-1">
            <button className="flex items-center gap-3 p-3 font-sans text-[13px] font-bold bg-black text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
              <span>Node Profile</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: MAIN CONTENT */}
        <div className="flex-1 flex flex-col bg-white min-h-0">
          <div className="h-14 shrink-0 border-b border-black flex items-center px-6 bg-white z-10">
            <span className="font-bold text-[16px] text-black uppercase tracking-tight">Identity Parameters</span>
          </div>

          <div className="flex-1 overflow-y-auto p-8 bg-gray-50 flex justify-center">
            <div className="w-full max-w-2xl space-y-6">
              
              {/* Profile Card */}
              <div className="border-2 border-black bg-white p-6 flex items-center gap-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-black bg-black text-white flex items-center justify-center font-bold text-[36px] uppercase shrink-0">
                     {profile?.username?.charAt(0) || "U"}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 border-2 border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors" onClick={() => toast("Upload avatar")}>
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                </div>
                <div className="flex flex-col min-w-0">
                   <span className="font-sans font-bold text-[24px] text-black tracking-tight">{profile?.username || "OPERATOR_NODE"}</span>
                   <span className="font-mono text-[13px] text-gray-500 mt-1 uppercase">Registry ID: {profile?.id || "XXXXXXXX-XXXX"}</span>
                   <div className="flex gap-2 mt-4">
                     <span className="px-2 py-1 border border-black bg-gray-100 font-mono text-[10px] font-bold">TIER-1</span>
                     <span className="px-2 py-1 border border-black bg-green-50 text-green-700 font-mono text-[10px] font-bold flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                       ACTIVE
                     </span>
                   </div>
                </div>
              </div>

              {/* Form Config */}
              <div className="border-2 border-black bg-white flex flex-col">
                 <div className="p-4 border-b-2 border-black bg-gray-100 flex items-center gap-2">
                   <span className="material-symbols-outlined text-[18px]">tune</span>
                   <span className="font-sans font-bold text-[14px] uppercase tracking-widest">Metadata Override</span>
                 </div>
                 <div className="p-6 flex flex-col gap-5">
                   
                   <div className="flex flex-col gap-1.5">
                     <label className="font-sans text-[12px] font-bold text-black uppercase tracking-wider">Display Alias</label>
                     <p className="font-sans text-[11px] text-gray-500 mb-1">Human-readable identifier broadcasted to peers.</p>
                     <input 
                       type="text" 
                       value={displayName}
                       onChange={e => setDisplayName(e.target.value)}
                       className="w-full max-w-md bg-white border-2 border-black px-4 py-2.5 font-sans text-[14px] text-black focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all"
                     />
                   </div>

                   <div className="flex flex-col gap-1.5">
                     <label className="font-sans text-[12px] font-bold text-black uppercase tracking-wider">System Username</label>
                     <p className="font-sans text-[11px] text-gray-500 mb-1">Immutable core registry handle.</p>
                     <input 
                       type="text" 
                       value={profile?.username || ""}
                       disabled
                       className="w-full max-w-md bg-gray-100 border-2 border-gray-300 text-gray-500 px-4 py-2.5 font-sans text-[14px] cursor-not-allowed"
                     />
                   </div>

                   <div className="pt-4 border-t-2 border-gray-100 flex items-center gap-3">
                     <button 
                       onClick={handleUpdateProfile}
                       disabled={isUpdating || displayName === (profile?.displayName || "")}
                       className="px-6 py-2.5 bg-black text-white font-sans text-[12px] font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 border-2 border-black"
                     >
                       {isUpdating ? 'Transmitting...' : 'Commit Overrides'}
                     </button>
                     {displayName !== (profile?.displayName || "") && !isUpdating && (
                       <button onClick={() => setDisplayName(profile?.displayName || "")} className="px-4 py-2.5 bg-white text-black font-sans text-[12px] font-bold uppercase hover:bg-gray-100 transition-colors">
                         Revert
                       </button>
                     )}
                   </div>
                   
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

