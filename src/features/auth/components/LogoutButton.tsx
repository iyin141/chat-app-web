"use client";

import { useCacheStore } from "@/app/dashboard/components/Cache_store";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout as apiLogout } from "@/features/auth/api/auth";

export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const { clear } = useCacheStore();

  const handleLogout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      clear();
      await apiLogout();
    } finally {
      router.replace("/auth/login");
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button disabled={busy} onClick={handleLogout} aria-label="Logout">
        <LogOutIcon
          style={{
            width: "20px",
            height: "20px",
            strokeWidth: 2,
            cursor: busy ? "not-allowed" : "pointer",
            opacity: busy ? 0.5 : 1,
          }}
          color="white"
        />
      </button>
    </div>
  );
}
