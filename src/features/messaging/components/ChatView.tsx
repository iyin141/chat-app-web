import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth/server";
import { getServerConvo, ConvoData } from "@/lib/Server-actions";
import { getConvoMessages } from "@/features/messaging/api/server";
import type { Message } from "./addreplies";
import Topbar from "./ChatTopbar";
import Input_bar from "./InputBar";
import Error_sign from "./ErrorSign";
import Join from "./MessageJoin";
import { RightHudDrawer } from "@/components/sketchbot/RightHudDrawer";

type Props = {
  tick: string;
  id: string;
};

export default async function Messages({ tick, id }: Props) {
  const tickvalue = tick || "";
  const y: ConvoData | string = await getServerConvo();
  const Convo_id = y instanceof Object ? y.convoId : y;
  const friendId = y instanceof Object ? y.friendId : '';
  const friendname = y instanceof Object ? y.friendname : '';

  let dataset: Message[] = []

  const serverUser = await getServerUser();
  if (!serverUser) redirect("/auth/login?expired=1");
  const current_user_id = serverUser.id;

  if (id !== "0") {
    try {
      dataset = await getConvoMessages(Convo_id, id);
    } catch (error) {
      console.log(error)
      return null
    }
  }

  return (
    <div className="grid grid-cols-9 gap-space-md w-full h-[calc(100vh-64px)] xl:h-auto pb-16 xl:pb-0">
      {/* MAIN CHAT VIEW (6 cols on XL desktop, fills middle lane) */}
      <div className="col-span-9 xl:col-span-6 flex flex-col bg-surface-container-low/80 backdrop-blur-md rounded-none xl:rounded shadow-xl relative h-full xl:min-h-[780px]" data-testid="chat-view">
        <Topbar friend_name={friendname} />
        <Error_sign />
        
        {/* Chat Timeline Stream */}
        <div className="flex-1 flex flex-col p-space-md gap-space-md overflow-y-auto pb-28" data-testid="message-list">
          <Join convo_id={Convo_id} tick={tickvalue} friend_id={friendId} message={dataset} />
        </div>

        {/* Input Bar */}
        <Input_bar convo_id={Convo_id} friend_id={friendId} sender_id={current_user_id} />
      </div>

      {/* RIGHT HUD BLUEPRINT DRAWER & TELEMETRY NOTES (3 cols on desktop) */}
      <div className="col-span-9 xl:col-span-3 hidden xl:block">
        <RightHudDrawer />
      </div>
    </div>
  );
}
