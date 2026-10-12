"use client";
import { Button } from "@/components/ui/button";
import { User, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import logo from '../../img/Logo_2.png'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCacheStore } from "@/app/dashboard/components/Cache_store";



const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const clearcache = useCacheStore((s) => s.clear)

  const navItems = [
    { label: "Home", href: "#" },
    { label: "Chat", href: "#" },
    { label: "Rooms", href: "#" },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Help", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <nav className="p-6">
    <div className="flex items-center  justify-center space-x-3 ">
            <Image src={logo} alt="Logo" width={40} height={40} className="rounded-full" />
          <span className="text-xl font-bold text-white">Chat-box</span>
        </div>
    </nav>
  );
};

export default Navigation;
