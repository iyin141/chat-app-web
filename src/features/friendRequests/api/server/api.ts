import { apiFetchServer } from "@/lib/api/server";
import type {
  FriendRequestsResult,
  FriendRequestsServerApi,
  LegacyFriendRequest,
} from "../types";

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

export function adaptFriendRequest(r: FriendRequestDto): LegacyFriendRequest {
  return {
    id: String(r.id),
    created_at: r.createdAt,
    sender_id: r.senderId,
    reciever_id: r.receiverId,
    status: r.status,
    sender_name: r.senderDisplayName,
    reciever_name: r.receiverDisplayName,
  };
}

export const friendRequestsServerApi: FriendRequestsServerApi = {
  async getFriendRequests(): Promise<FriendRequestsResult> {
    const [incoming, outgoing] = await Promise.all([
      apiFetchServer<FriendRequestDto[]>("/friend-requests"),
      apiFetchServer<FriendRequestDto[]>("/friend-requests?direction=outgoing"),
    ]);

    return {
      received: incoming.map(adaptFriendRequest),
      sent: outgoing.map(adaptFriendRequest),
    };
  },
};
