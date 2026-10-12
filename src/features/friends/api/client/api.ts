import { apiFetch } from "@/lib/api/client";
import type { FriendsClientApi } from "../types";

export const friendsClientApi: FriendsClientApi = {
  async sendFriendRequest(receiverId) {
    await apiFetch("/friend-requests", {
      method: "POST",
      body: JSON.stringify({ receiverId }),
    });
    return { success: true };
  },
};
