import { apiFetch } from "@/lib/api/client";
import type { FriendRequestsClientApi } from "../types";

type FriendRequestDto = {
  id: number;
  senderId: string;
  senderUsername: string;
  senderDisplayName: string;
  senderAvatarUrl: string | null;
  receiverId: string;
  receiverUsername: string;
  receiverDisplayName: string;
  receiverAvatarUrl: string | null;
  status: string;
  createdAt: string;
  respondedAt: string | null;
};

async function findIncomingRequestId(senderId: string): Promise<number> {
  const dtos = await apiFetch<FriendRequestDto[]>("/friend-requests");
  const match = dtos.find((r) => r.senderId === senderId);
  if (!match) throw new Error("Friend request not found");
  return match.id;
}

async function findOutgoingRequestId(receiverId: string): Promise<number> {
  const dtos = await apiFetch<FriendRequestDto[]>("/friend-requests?direction=outgoing");
  const match = dtos.find((r) => r.receiverId === receiverId);
  if (!match) throw new Error("Friend request not found");
  return match.id;
}

export const friendRequestsClientApi: FriendRequestsClientApi = {
  async acceptFriendRequest(_receiverId, senderId) {
    const id = await findIncomingRequestId(senderId);
    await apiFetch(`/friend-requests/${id}/accept`, { method: "POST" });
    return { success: true };
  },

  async declineFriendRequest(_receiverId, senderId) {
    const id = await findIncomingRequestId(senderId);
    await apiFetch(`/friend-requests/${id}/reject`, { method: "POST" });
    return { success: true };
  },

  async cancelFriendRequest(receiverId) {
    const id = await findOutgoingRequestId(receiverId);
    await apiFetch(`/friend-requests/${id}`, { method: "DELETE" });
    return { success: true };
  },
};
