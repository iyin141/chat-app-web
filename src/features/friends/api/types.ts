export type Friend = {
  id: string;
  created_at: string;
  user_id: string;
  friend_id: string;
  status: string;
  Convo_id: string;
  Saved_name: string;
  latest_message_content?: string | null;
};

export type SuggestedUser = {
  User_name: string;
  uid: string;
  created_at: string;
};

export interface FriendsServerApi {
  getFriends(): Promise<Friend[]>;
  getSuggestedUsers(): Promise<SuggestedUser[]>;
}

export interface FriendsClientApi {
  sendFriendRequest(
    receiverId: string,
    currentUsername: string,
    receiverUsername: string
  ): Promise<{ success: boolean }>;
}
