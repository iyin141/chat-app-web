import { apiFetch } from "@/lib/api/client";
import type { MessagingClientApi } from "../types";

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

async function resolveMessageIdByTempId(convoId: string, tempId: string): Promise<number> {
  const dtos = await apiFetch<MessageDto[]>(`/conversations/${convoId}/messages?limit=100`);
  const match = dtos.find((m) => m.tempId === tempId);
  if (!match) throw new Error("Message not found for tempId");
  return match.id;
}

export const messagingClientApi: MessagingClientApi = {
  async sendMessage(convoId, _friendId, _senderId, message, tempId, replyTo) {
    await apiFetch(`/conversations/${convoId}/messages`, {
      method: "POST",
      body: JSON.stringify({
        content: message,
        tempId,
        replyToId: replyTo ? Number(replyTo) : null,
      }),
    });
    return { success: true };
  },

  async manipulateMessage(type, tempId, convoId, content, typeDelete) {
    // "Delete for reciever" is a legacy per-recipient soft delete the .NET API
    // does not model (DELETE is sender-only, delete-for-all). Keep it cache-only.
    if (type === "DELETE" && typeDelete === "Delete for reciever") {
      return { success: true };
    }

    const messageId = await resolveMessageIdByTempId(convoId, tempId);

    if (type === "EDIT") {
      await apiFetch(`/messages/${messageId}`, {
        method: "PATCH",
        body: JSON.stringify({ content }),
      });
    } else {
      await apiFetch(`/messages/${messageId}`, { method: "DELETE" });
    }
    return { success: true };
  },
};
