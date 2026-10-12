
"use client";
import { ReactNode, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/features/auth/api/auth";
import Image from "next/image";
import logo from "@/app/img/Logo_2.png";

export function MobileTabBar({ activeRoute }: { activeRoute: string }) {
  const router = useRouter();
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

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
    router.refresh();
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 h-16 bg-white border-t-2 border-black flex items-center justify-around z-50">
      {[
        { id: "chats", icon: "chat", href: "/dashboard", label: "Chats" },
        { id: "groups", icon: "forum", href: "/groups", label: "Groups" },
        { id: "friends", icon: "group", href: "/friends", label: "Network" },
        { id: "stories", icon: "amp_stories", href: "/stories", label: "Stories" },
        { id: "settings", icon: "settings", href: "/settings", label: "Config" },
      ].map((item) => {
        const isActive = activeRoute === item.id || (activeRoute === 'dashboard' && item.id === 'chats') || (activeRoute === 'profile' && item.id === 'settings');
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center h-full transition-colors ${
              isActive ? "text-black bg-white border-t-[3px] border-black -mt-[2px]" : "text-gray-500 hover:text-black hover:bg-gray-50"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            <span className={`font-sans text-[10px] mt-0.5 ${isActive ? 'font-bold' : 'font-semibold'}`}>{item.label}</span>
          </Link>
        )
      })}
      <div className="flex-1 flex flex-col items-center justify-center h-full relative" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">more_horiz</span>
          <span className="font-sans text-[10px] mt-0.5 font-semibold">Menu</span>
        </button>
        {showMenu && (
          <div className="absolute bottom-full right-4 mb-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[150px] z-50">
            <button
              className="w-full text-left px-3 py-2 text-[12px] font-sans hover:bg-red-50 hover:text-red-600 transition-colors"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export function MobileShell({
  children,
  activeRoute = "chats",
}: {
  children: ReactNode;
  activeRoute?: string;
}) {
  return (
    <main className="w-full min-h-screen bg-white relative pb-16 font-sans [&>div]:border-none [&>div]:h-full [&>div]:min-h-[calc(100vh-4rem)]">
      <header className="h-10 shrink-0 border-b border-black flex items-center justify-between px-3 bg-white z-50">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="ChatBox" width={28} height={28} className="rounded-full" />
          <span className="font-sans font-bold text-[14px] tracking-tight text-black">ChatBox</span>
        </div>
      </header>
      {children}
      <MobileTabBar activeRoute={activeRoute} />
    </main>
  );
}
