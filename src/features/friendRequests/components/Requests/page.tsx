import { getFriendRequests } from "@/features/friendRequests/api/server";
import type { LegacyFriendRequest } from "@/features/friendRequests/api/types";
import { CornerBrackets } from "@/components/sketchbot/primitives";
import Join from "./Join";

const EmptyRequestsState = ({ title, message, icon }: { title: string, message: string, icon: string }) => (
  <main className="flex-1 flex flex-col bg-surface-container-low/80 backdrop-blur-md rounded shadow-xl relative min-h-[780px] w-full justify-center items-center">
    <div className="relative p-space-xl flex flex-col items-center max-w-sm text-center">
      <CornerBrackets />
      <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary-fixed mb-space-md shadow-[0_0_24px_rgba(111,211,255,0.15)] relative">
        <span className="material-symbols-outlined text-[32px]">{icon}</span>
        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-primary-container shadow-[0_0_8px_rgba(111,211,255,0.9)] animate-pulse"></span>
      </div>
      <h2 className="font-headline-md text-headline-md text-on-surface mb-2 tracking-tight">
        {title}
      </h2>
      <p className="font-body-md text-body-md text-outline">
        {message}
      </p>
    </div>
  </main>
);

const View = async () => {
  let sent: LegacyFriendRequest[] = [];
  let received: LegacyFriendRequest[] = [];
  try {
    const result = await getFriendRequests();
    sent = result.sent || [];
    received = result.received || [];
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    return <EmptyRequestsState title="CONNECTION FAILED" message="Unable to sync with the peer network. Check your link." icon="wifi_off" />;
  }

  if (sent.length === 0 && received.length === 0) {
    return <EmptyRequestsState title="NO ACTIVE REQUESTS" message="You have no incoming or outgoing connection requests in the queue." icon="group_add" />;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <Join result_1={sent} result_2={received} />
    </div>
  );
}

export default View;
