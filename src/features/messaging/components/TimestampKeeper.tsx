// CacheRefresher.tsx
"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/features/messaging/store/uiStore";


const TWO_MINUTES = 2 * 60 * 1000;

export function CacheRefresher() {
  const { settimestamp_object } = useAuthStore();

  useEffect(() => {
    const interval = setInterval(() => {
      // Update timestamp and keep cache valid
        settimestamp_object({ isvalid: true, timestamp: Date.now() });
        console.log('refreshed timestamp');
    }, TWO_MINUTES);
    
    return () => clearInterval(interval);
  }, [settimestamp_object]);

  return null; // runs silently
}
