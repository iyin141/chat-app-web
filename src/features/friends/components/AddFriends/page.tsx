import { getServerUser } from "@/lib/auth/server";
import { getSuggestedUsers } from "@/features/friends/api/server";
import type { SuggestedUser } from "@/features/friends/api/types";
import { CornerBrackets } from "@/components/sketchbot/primitives";
import Friend_dsiplay from "./Friend_display";

const EmptyNetworkState = ({ title, message, icon }: { title: string, message: string, icon: string }) => (
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

const Friends = async () => {
  const user = await getServerUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const currentUsername = user.displayName;

  let filteredUsers: SuggestedUser[] = [];
  try {
    filteredUsers = await getSuggestedUsers();
  } catch (err) {
    console.error("Error fetching suggested users:", err);
    return <EmptyNetworkState title="NETWORK ERROR" message="Unable to scan the peer network for connections." icon="cloud_off" />;
  }

  if (filteredUsers.length === 0) {
    return <EmptyNetworkState title="NO PEERS DETECTED" message="There are no users available to connect with on this node." icon="person_search" />;
  }

  return (
    <div className="w-full">
      <Friend_dsiplay users={filteredUsers} currentUsername={currentUsername} />
    </div>
  );
};

export default Friends;
