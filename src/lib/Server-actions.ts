"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export type ConvoData = {
  convoId: string;
  friendId: string ,
  friendname: string
};

const COOKIE_OPTS = { path: "/", httpOnly: true, sameSite: "lax" as const };

export async function selectFriend(friendId: string , friendname: string , Convo_id: string , senderid:string) {
  const store = await cookies();
  store.set("selectedFriendId", friendId, COOKIE_OPTS);
  store.set("selectedFriendName", friendname, COOKIE_OPTS);
  store.set("selectedConvoId", Convo_id, COOKIE_OPTS);
  store.set("selectedSenderId", senderid, COOKIE_OPTS);
}

/**
 * Stores the active conversation per browser session (cookies).
 * This used to be a module-level Map shared by every user on the server, which could
 * show one user's selected conversation to another. Cookies are scoped to the requester.
 */
export async function setServerConvoCache( convoId: string , friendId: string ,  friendname: string) {
  const store = await cookies();
  store.set("selectedConvoId", convoId, COOKIE_OPTS);
  store.set("selectedFriendId", friendId, COOKIE_OPTS);
  store.set("selectedFriendName", friendname, COOKIE_OPTS);
}


export async function getServerConvo(): Promise<ConvoData | string> {
  const store = await cookies();
  const convoId = store.get("selectedConvoId")?.value;
  if (!convoId) return '';
  return {
    convoId,
    friendId: store.get("selectedFriendId")?.value ?? '',
    friendname: store.get("selectedFriendName")?.value ?? '',
  };
}

export async function revalidateMessages(convoId: string) {
 
  revalidatePath(`/chat/${convoId}`);
}
 

export async function saveMessages(ids: number[]) {
  const idsString = ids.join(",");
  (await cookies()).set("messages_ids", idsString, { httpOnly: false }); 
  return idsString;
}
