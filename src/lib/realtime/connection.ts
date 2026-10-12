import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getAccessToken } from "../api/client";
import { HUB_URL } from "../api/config";

let connection: HubConnection | null = null;
const reconnectListeners: Set<() => void> = new Set();

export function onSignalRReconnected(callback: () => void): () => void {
  reconnectListeners.add(callback);
  return () => reconnectListeners.delete(callback);
}

export async function getSignalRConnection(): Promise<HubConnection> {
  if (connection && connection.state === "Connected") {
    return connection;
  }

  if (!connection) {
    connection = new HubConnectionBuilder()
      .withUrl(HUB_URL, {
        accessTokenFactory: async () => {
          const token = await getAccessToken();
          return token || "";
        },
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          // Exponential backoff with jitter: 0s, 2s, 5s, 10s, 20s, max 30s
          if (retryContext.previousRetryCount === 0) return 0;
          if (retryContext.previousRetryCount === 1) return 2000;
          if (retryContext.previousRetryCount === 2) return 5000;
          if (retryContext.previousRetryCount === 3) return 10000;
          return Math.min(30000, 10000 * Math.pow(1.5, retryContext.previousRetryCount - 3));
        },
      })
      .configureLogging(LogLevel.Information)
      .build();

    connection.onreconnecting((error) => {
      console.warn("[SignalR] Connection lost. Reconnecting...", error);
    });

    connection.onreconnected((connectionId) => {
      console.log("[SignalR] Reconnected successfully. New connectionId:", connectionId);
      reconnectListeners.forEach((listener) => {
        try {
          listener();
        } catch (e) {
          console.error("[SignalR] Error in reconnected listener:", e);
        }
      });
    });

    connection.onclose((error) => {
      console.error("[SignalR] Connection closed:", error);
    });
  }

  if (connection.state === "Disconnected") {
    try {
      await connection.start();
      console.log("[SignalR] Connected to chat hub");
    } catch (err) {
      console.error("[SignalR] Connection error:", err);
    }
  }

  return connection;
}
