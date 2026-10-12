export type LegacyFriendRequest = {
  id: string;
  created_at: string;
  sender_id: string;
  reciever_id: string;
  status: string;
  sender_name: string;
  reciever_name: string;
};

export type FriendRequestsResult = {
  sent: LegacyFriendRequest[];
  received: LegacyFriendRequest[];
};

export interface FriendRequestsServerApi {
  getFriendRequests(): Promise<FriendRequestsResult>;
}

export interface FriendRequestsClientApi {
  acceptFriendRequest(
    receiverId: string,
    senderId: string,
    receiverName: string,
    senderName: string
  ): Promise<{ success: boolean }>;
  declineFriendRequest(receiverId: string, senderId: string): Promise<{ success: boolean }>;
  cancelFriendRequest(receiverId: string, senderId: string): Promise<{ success: boolean }>;
}
