"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { apiFetch } from "@/lib/api/client";
import { getSignalRConnection } from "@/lib/realtime/connection";
import { registerSignalRHandlers } from "@/lib/realtime/handlers";

export default function MessageListener() {
  const { data: profile } = useSWR<any>("/me", apiFetch);
  const userId = profile?.id;

  useEffect(() => {
    if (!userId) return;

    let mounted = true;
    let cleanup: (() => void) | null = null;

    (async () => {
      try {
        const connection = await getSignalRConnection();
        if (!mounted) return;
        registerSignalRHandlers(connection);
        await connection.invoke("JoinUser", userId).catch(() => undefined);
        cleanup = () => {
          connection.off("MessageCreated");
          connection.off("MessageUpdated");
          connection.off("MessageDeleted");
          connection.off("MessagesSeen");
          connection.off("FriendRequestReceived");
          connection.off("FriendRequestUpdated");
          connection.off("FriendshipCreated");
        };
      } catch (err) {
        console.error("[SignalR] setup error:", err);
      }
    })();

    return () => {
      mounted = false;
      cleanup?.();
    };
  }, [userId]);

  return null;
}
