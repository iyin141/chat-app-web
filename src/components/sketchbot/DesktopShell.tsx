
"use client";
import { ReactNode, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { apiFetch } from "@/lib/api/client";
import { logout } from "@/features/auth/api/auth";
import Image from "next/image";
import logo from "@/app/img/logo_black.png";

export function DesktopShell({
  children,
  activeRoute = "chats",
}: {
  children: ReactNode;
  activeRoute?: string;
}) {
  const router = useRouter();
  const { data: conversations } = useSWR<any>("/conversations", apiFetch);
  const { data: friends } = useSWR<any>("/friends", apiFetch);
  const { data: profile } = useSWR<any>("/me", apiFetch);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = conversations?.filter((c: any) => c.unreadCount > 0).length || 0;
  const friendsCount = friends?.length || 0;

  return (
    <main className="bg-white text-black font-sans antialiased overflow-hidden h-screen w-screen flex flex-col">
      
      {/* TOP GLOBAL HEADER */}
      <header className="h-10 shrink-0 border-b border-black flex items-center justify-between px-3 bg-white z-50">
        <div className="flex items-center gap-1">
          <Image src={logo} alt="ChatBox" width={32} height={32} className="rounded-full p-[2px]" />
          <span className="font-sans font-bold text-[15px] tracking-tight text-black">ChatBox</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-black px-2 py-0.5 text-[11px] font-sans font-medium hover:bg-black hover:text-white transition-colors">Help</button>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        
        {/* COLUMN 1: LEFT NAVIGATION (180px) */}
        <nav className="w-[185px] shrink-0 border-r border-black flex flex-col justify-between bg-white min-h-0 z-10">
          <div className="flex flex-col min-h-0 overflow-y-auto" data-testid="sidebar">
            <div className="flex flex-col p-1.5 gap-0.5 font-sans text-[12px]">
              
              <Link href="/dashboard" className={`flex items-center justify-between px-2.5 py-2 transition-all ${activeRoute === 'chats' ? 'bg-white text-black font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px] border border-black mb-1' : 'hover:bg-gray-100 text-black font-normal border border-transparent'}`}>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                  <span>Chats</span>
                </div>
                {unreadCount > 0 && <span className={`text-[10px] px-1.5 py-0.5 font-bold ${activeRoute === 'chats' ? 'bg-black text-white' : 'bg-black text-white'}`}>{unreadCount}</span>}
              </Link>
              
              <Link href="/groups" className={`flex items-center justify-between px-2.5 py-2 transition-all ${activeRoute === 'groups' ? 'bg-white text-black font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px] border border-black mb-1' : 'hover:bg-gray-100 text-black font-normal border border-transparent'}`}>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[16px]">groups</span>
                  <span>Groups</span>
                </div>
              </Link>
              
              <Link href="/friends" className={`flex items-center justify-between px-2.5 py-2 transition-all ${activeRoute === 'friends' ? 'bg-white text-black font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px] border border-black mb-1' : 'hover:bg-gray-100 text-black font-normal border border-transparent'}`}>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  <span>Friends</span>
                </div>
                {friendsCount > 0 && <span className={`text-[11px] font-medium ${activeRoute === 'friends' ? 'text-gray-400' : 'text-gray-500'}`}>{friendsCount}</span>}
              </Link>
              
              <Link href="/stories" className={`flex items-center justify-between px-2.5 py-2 transition-all ${activeRoute === 'stories' ? 'bg-white text-black font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px] border border-black mb-1' : 'hover:bg-gray-100 text-black font-normal border border-transparent'}`}>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[16px]">history_edu</span>
                  <span>Stories</span>
                </div>
              </Link>
              
              <div className="my-1.5 border-t border-black"></div>
              
              <Link href="/settings" className={`flex items-center gap-2.5 px-2.5 py-2 transition-all ${activeRoute === 'profile' || activeRoute === 'settings' ? 'bg-white text-black font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px] border border-black mb-1' : 'hover:bg-gray-100 text-black font-normal border border-transparent'}`}>
                <span className="material-symbols-outlined text-[16px]">settings</span>
                <span>Settings</span>
              </Link>
              
            </div>
          </div>
          
          <div className="border-t border-black p-2 bg-white flex items-center justify-between relative">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 border border-black bg-black text-white flex items-center justify-center font-bold text-[10px] shrink-0 uppercase">
                {profile?.username?.charAt(0) || "U"}
              </div>
              <div className="min-w-0 flex flex-col font-sans">
                <span className="text-[12px] font-semibold leading-none truncate text-black">{profile?.username || "Operator"}</span>
                <span className="text-[10px] text-gray-500 font-bold tracking-widest mt-1">SYNCED</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 relative" ref={menuRef}>
              <button
                className="border border-black px-2 py-1 text-[11px] font-sans hover:bg-black hover:text-white transition-colors"
                onClick={() => setShowMenu(!showMenu)}
                title="Menu"
              >
                <span className="material-symbols-outlined text-[16px]">more_horiz</span>
              </button>
              {showMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[150px] z-50">
                  <Link href="/settings" className="block px-3 py-2 text-[12px] font-sans hover:bg-gray-100 transition-colors border-b border-black">
                    Settings
                  </Link>
                  <button
                    className="w-full text-left px-3 py-2 text-[12px] font-sans hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={async () => {
                      await logout();
                      router.replace("/auth/login");
                      router.refresh();
                    }}
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* COMPONENT CONTENT AREA (Inherits full height) */}
        <div className="flex-1 min-w-0 relative flex bg-white [&>div]:border-none [&>div]:h-full [&>div]:w-full">
          {children}
        </div>
        
      </div>
    </main>
  );
}

