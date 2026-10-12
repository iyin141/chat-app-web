import { apiFetchServer, getCurrentUserId } from "@/lib/api/server";
import type { Friend, FriendsServerApi, SuggestedUser } from "../types";

type FriendDto = {
  id: number;
  friendId: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  savedName: string | null;
  conversationId: string;
  status: string;
  createdAt: string;
};

type UserSummaryDto = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  createdAt: string;
};

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

export const friendsServerApi: FriendsServerApi = {
  async getFriends() {
    const currentUserId = await getCurrentUserId();
    const dtos = await apiFetchServer<FriendDto[]>("/friends");

    const friends: Friend[] = dtos.map((f) => ({
      id: String(f.id),
      created_at: f.createdAt,
      user_id: currentUserId,
      friend_id: f.friendId,
      status: f.status,
      Convo_id: f.conversationId,
      Saved_name: f.savedName ?? f.displayName,
      latest_message_content: null,
    }));
    return friends;
  },

  async getSuggestedUsers() {
    const currentUserId = await getCurrentUserId();

    const [users, friendDtos, incoming, outgoing] = await Promise.all([
      apiFetchServer<UserSummaryDto[]>("/users"),
      apiFetchServer<FriendDto[]>("/friends"),
      apiFetchServer<FriendRequestDto[]>("/friend-requests"),
      apiFetchServer<FriendRequestDto[]>("/friend-requests?direction=outgoing"),
    ]);

    const excludeIds = new Set<string>([currentUserId]);
    for (const f of friendDtos) excludeIds.add(f.friendId);
    for (const r of incoming) excludeIds.add(r.senderId);
    for (const r of outgoing) excludeIds.add(r.receiverId);

    const suggested: SuggestedUser[] = users
      .filter((u) => !excludeIds.has(u.id))
      .map((u) => ({
        User_name: u.username,
        uid: u.id,
        created_at: u.createdAt,
      }));
    return suggested;
  },
};
