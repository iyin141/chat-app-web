export type Message = {
  id?: number;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at?: string;
  seen: boolean;
  reply_to?: string | null;
  deleted?: string;
  Temp_id:string 
};




export function orderMessages(messages: Message[]): Message[] {
  return messages.sort((a, b) => {
    const aKey = a.Temp_id ;
    const bKey = b.Temp_id ;
    return aKey.localeCompare(bKey);
  });
}
