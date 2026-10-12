// app/dashboard/components/Preload/CacheBootstrapper.tsx
"use client";

import { useEffect } from "react";
import { getPreloadData } from "./Preload"; // server function (called via client)
import { useCacheStore } from "../Cache_store";
import type { Message } from "../Cache_store";
import { useLoadingStore } from "../LoadingScreen/Loadstore";

export function CacheBootstrapper() {
  const hydrated = useCacheStore((s) => s.hydrated);
  const setMessages = useCacheStore((s) => s.setMessages);
  const hasAnyMessages = useCacheStore((s) => s.hasAnyMessages); // ✅ fixed variable name
  const { setIsLoading } = useLoadingStore();

  useEffect(() => {
    // Wait until Zustand persist rehydrates storage
    if (!hydrated) return;

    let mounted = true;

    (async () => {
      try {
        const preload: Record<string, Message[]> = await getPreloadData();

        for (const [key, value] of Object.entries(preload)) {
          if (!mounted) break;
          setMessages(key, value); // merge-safe
        }

        // ✅ Only stop loading once messages exist in cache
        if (hasAnyMessages()) {
          setIsLoading(false);
        } else {
          console.log("[Bootstrapper] Waiting for messages to populate...");
        }
      } catch (err) {
        console.error("[Bootstrapper] preload failed:", err);
        setIsLoading(false); // fallback to avoid lock state
      }
    })();

    return () => {
      mounted = false;
    };
  }, [hydrated, setMessages, hasAnyMessages, setIsLoading]);

  return null;
}
