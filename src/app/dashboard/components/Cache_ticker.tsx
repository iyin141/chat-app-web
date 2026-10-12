import { cookies } from "next/headers";
import { getServerConvo, ConvoData } from "@/lib/Server-actions";
import { markMessagesFromCache } from "@/features/messaging/api/server";


export default async function Cache_ticker() {

   const y : ConvoData | string = await getServerConvo();
  const Convo_id = y instanceof Object ? y.convoId : y;


   const cookieStore = await cookies();
  const idsCookie = cookieStore.get("messages_ids")?.value ?? "";
  const id = idsCookie ? idsCookie.split(",").map(Number) : [];

  try {
    await markMessagesFromCache(Convo_id, id);
  } catch (error) {
    console.log(error)
    return null
  }


  return <></>;
}
