import type { HubConnection } from "@microsoft/signalr";
import { mutate } from "swr";

export function registerSignalRHandlers(connection: HubConnection): void {
  connection.off("MessageCreated");
  connection.on(
    "MessageCreated",
    (message: {
      id: number;
      conversationId: string;
      senderId: string;
      receiverId: string;
      content: string;
      tempId: string | null;
      seen: boolean;
      seenAt: string | null;
      createdAt: string;
      replyToId: number | null;
      editedAt: string | null;
      deletedAt: string | null;
    }) => {
      const normalized = {
        id: message.id,
        senderId: message.senderId,
        receiverId: message.receiverId,
        content: message.content,
        tempId: message.tempId ?? String(message.id),
        seen: message.seen,
        replyToId: message.replyToId,
        deletedAt: message.deletedAt,
        createdAt: message.createdAt,
      };
      
      const key = `/conversations/${message.conversationId}/messages`;
      
      mutate(key, (currentData: any) => {
        if (!currentData) return [normalized];
        if (currentData.some((m: any) => m.id === normalized.id || (normalized.tempId && m.tempId === normalized.tempId))) {
          return currentData.map((m: any) => (m.tempId === normalized.tempId ? normalized : m));
        }
        return [...currentData, normalized];
      }, { revalidate: false });

      mutate('/conversations');
      mutate('/groups');
    }
  );

  connection.off("FriendshipCreated");
  connection.on(
    "FriendshipCreated",
    () => {
      mutate('/friends');
      mutate('/conversations');
    }
  );

  connection.off("MessageUpdated");
  connection.on(
    "MessageUpdated",
    (message: { id: number; conversationId: string; content: string }) => {
      const key = `/conversations/${message.conversationId}/messages`;
      mutate(key, (currentData: any) => {
        if (!currentData) return currentData;
        return currentData.map((m: any) => m.id === message.id ? { ...m, content: message.content } : m);
      }, { revalidate: false });
    }
  );

  connection.off("MessageDeleted");
  connection.on(
    "MessageDeleted",
    (messageId: number, conversationId: string) => {
      const key = `/conversations/${conversationId}/messages`;
      mutate(key, (currentData: any) => {
        if (!currentData) return currentData;
        return currentData.filter((m: any) => m.id !== messageId);
      }, { revalidate: false });
    }
  );

  connection.off("FriendRequestReceived");
  connection.on("FriendRequestReceived", () => {
    mutate("/friend-requests");
  });

  connection.off("FriendRequestUpdated");
  connection.on("FriendRequestUpdated", () => {
    mutate("/friend-requests");
    mutate("/friends");
  });

  connection.off("MessagesSeen");
  connection.on(
    "MessagesSeen",
    (conversationId: string) => {
      const key = `/conversations/${conversationId}/messages`;
      mutate(key, (currentData: any) => {
        if (!currentData) return currentData;
        return currentData.map((m: any) => ({ ...m, seen: true }));
      }, { revalidate: false });
    }
  );
}
