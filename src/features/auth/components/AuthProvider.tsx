"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { apiFetch, handleUnauthorized } from "@/lib/api/client";
import type { UserDto } from "@/features/auth/api/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearUser, setLoading } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    async function hydrate() {
      // Background verification against /api/v1/auth/me via BFF
      try {
        const user = await apiFetch<UserDto>("/auth/me");
        if (!mounted) return;
        setUser(user);
      } catch (err: unknown) {
        if (!mounted) return;
        const status = (err as { status?: number })?.status;
        // 404: token is valid but its user no longer exists (e.g. backend DB reset).
        if (status === 401 || status === 404) {
          clearUser();
          handleUnauthorized();
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    hydrate();

    return () => {
      mounted = false;
    };
  }, [setUser, clearUser, setLoading]);

  return <>{children}</>;
}
