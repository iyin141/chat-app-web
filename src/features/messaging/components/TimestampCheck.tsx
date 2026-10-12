// CacheValidator.tsx
"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/features/messaging/store/uiStore";


const FIVE_MINUTES = 5 * 60 * 1000;

export function CacheValidator() {
  const { timestamp_object, settimestamp_object } = useAuthStore();

  useEffect(() => {
    const now = Date.now();
    // Update validity based on lastRefresh
    settimestamp_object({ isvalid: now - (timestamp_object?.timestamp || 0) < FIVE_MINUTES, timestamp: now });
  }, [timestamp_object, settimestamp_object]);
  console.log('ran',timestamp_object)
  return null; // runs silently
}


  // runs silently

