export type Message = {
  id?: number;
  convo_id?: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at?: string;
  seen: boolean;
  reply_to?: string | null;
  deleted?: string;
  Temp_id: string;
};

export interface MessagingServerApi {
  getConvoMessages(convoId: string, start: string): Promise<Message[]>;
  markMessagesFromCache(convoId: string, ids: number[]): Promise<void>;
  getPreloadData(): Promise<Record<string, Message[]>>;
}

export interface MessagingClientApi {
  sendMessage(
    convoId: string,
    friendId: string,
    senderId: string,
    message: string,
    tempId: string,
    replyTo?: string
  ): Promise<{ success: boolean }>;
  manipulateMessage(
    type: "EDIT" | "DELETE",
    tempId: string,
    convoId: string,
    content?: string,
    typeDelete?: string
  ): Promise<{ success: boolean }>;
}
