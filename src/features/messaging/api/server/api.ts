import { apiFetchServer } from "@/lib/api/server";
import type { Message, MessagingServerApi } from "../types";

type MessageDto = {
  id: number;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  replyToId: number | null;
  tempId: string | null;
  seen: boolean;
  seenAt: string | null;
  createdAt: string;
  editedAt: string | null;
  deletedAt: string | null;
};

type ConversationSummaryDto = {
  id: string;
  otherUserId: string;
  otherUsername: string;
  otherDisplayName: string;
  otherAvatarUrl: string | null;
  savedName: string | null;
  lastMessageId: number | null;
  lastMessageContent: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
};

// Matches generateTempId()'s YYYYMMDDHHMMSSmmm shape so the UI can parse it.
function tempIdFromCreatedAt(createdAt: string): string {
  const d = new Date(createdAt);
  const p = (n: number, len = 2) => String(n).padStart(len, "0");
  return (
    `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}` +
    `${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}${p(d.getMilliseconds(), 3)}`
  );
}

export function adaptMessage(m: MessageDto): Message {
  return {
    id: m.id,
    convo_id: m.conversationId,
    sender_id: m.senderId,
    receiver_id: m.receiverId,
    content: m.content,
    created_at: m.createdAt,
    seen: m.seen,
    reply_to: m.replyToId != null ? String(m.replyToId) : null,
    deleted: m.deletedAt ? "Delete for all" : undefined,
    Temp_id: m.tempId ?? tempIdFromCreatedAt(m.createdAt),
  };
}

export const messagingServerApi: MessagingServerApi = {
  async getConvoMessages(convoId, start) {
    if (start === "0") return [];
    const dtos = await apiFetchServer<MessageDto[]>(
      `/conversations/${convoId}/messages?before=${encodeURIComponent(start)}&limit=50`
    );
    return dtos.map(adaptMessage);
  },

  async markMessagesFromCache(convoId, ids) {
    await apiFetchServer(`/conversations/${convoId}/read`, {
      method: "POST",
      body: JSON.stringify({ messageIds: ids }),
    });
  },

  async getPreloadData() {
    const convos = await apiFetchServer<ConversationSummaryDto[]>("/conversations");
    const preload: Record<string, Message[]> = {};

    for (const convo of convos) {
      try {
        const dtos = await apiFetchServer<MessageDto[]>(
          `/conversations/${convo.id}/messages?limit=50`
        );
        preload[`/api/messages?convoId=${convo.id}`] = dtos.map(adaptMessage);
      } catch (err) {
        console.error(`Unexpected error for convo ${convo.id}:`, err);
        preload[`/api/messages?convoId=${convo.id}`] = [];
      }
    }

    return preload;
  },
};
