"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/components/Value";
import { calctime_2 } from "@/components/functions";
import { setServerConvoCache } from "@/lib/Server-actions";
import { useBumpConvoParam } from "@/components/functions";
import { useCacheStore, Message } from "@/features/messaging/store/messageStore";

import { WorkspaceSidebar } from "@/components/sketchbot/WorkspaceSidebar";

type Friend = {
  id: string;
  created_at: string;
  user_id: string;
  friend_id: string;
  status: string;
  Convo_id: string;
  Saved_name: string;
  latest_message_content?: string | null;
};

const Display = ({ users }: { users: Friend[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = useAuthStore((s) => s.search_2);
  const getLatestMessage = useCacheStore((s) => s.getLatestMessage);
  const data = useCacheStore((s) => s.data);
  const bumpConvoParam = useBumpConvoParam();

  const [latestMessages, setLatestMessages] = useState<Record<string, Message | null>>({});

  useEffect(() => {
    const updated: Record<string, Message | null> = {};
    for (const user of users) {
      const key = `/api/messages?convoId=${user.Convo_id}`;
      updated[user.Convo_id] = getLatestMessage(key);
    }
    setLatestMessages(updated);
  }, [data, users, getLatestMessage]);

  const handleclick = async (convoId: string, friendId: string, senderid: string, friendname: string) => {
    await setServerConvoCache(convoId, friendId, friendname);
    bumpConvoParam();
  };

  const updateView = (view: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.push(`?${params.toString()}`);
  };

  const clean = (s: string) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");

  const filteredUsers = users.filter((u) => {
    const name = clean(String(u.Saved_name));
    const match = [...name].some((char) => clean(search).includes(char));
    if (search === "") return true;
    return match;
  });

  return (
    <WorkspaceSidebar>
      <div className="relative w-full">
        <span className="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-outline">search</span>
        <input 
          className="w-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm pl-8 pr-2 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-primary-container placeholder:text-outline" 
          placeholder="Filter channels, nodes..." 
          type="text"
          onChange={(e) => useAuthStore.setState({ search_2: e.target.value })}
          value={search}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="relative flex items-center justify-between px-space-sm py-1.5 rounded bg-surface-container-high text-primary font-label-md text-label-md cursor-pointer" onClick={() => updateView("default")}>
          <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-primary-container rounded-r"></div>
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>nav-chats</span>
          </div>
          <span className="font-label-sm text-label-sm bg-primary-container/20 text-primary-fixed px-1.5 py-0.2 rounded-full">ACTIVE</span>
        </div>
        <div className="flex items-center justify-between px-space-sm py-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-md text-label-md cursor-pointer" onClick={() => updateView("Friends")}>
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[16px]">group</span>
            <span>nav-friends</span>
          </div>
          <span className="font-label-sm text-label-sm text-secondary">{users.length}</span>
        </div>
        <div className="flex items-center justify-between px-space-sm py-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-md text-label-md cursor-pointer" onClick={() => updateView("Requests")}>
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[16px]">mark_email_unread</span>
            <span>nav-requests</span>
          </div>
          <span className="font-label-sm text-label-sm text-primary-container">REQ</span>
        </div>
        <div className="flex items-center justify-between px-space-sm py-1 rounded text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-md text-label-md cursor-pointer" onClick={() => updateView("Profile")}>
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[16px]">badge</span>
            <span>nav-profile</span>
          </div>
          <span className="font-annotation text-annotation text-primary-container">ACTV</span>
        </div>
      </div>

      <div className="flex flex-col gap-space-xs flex-1 overflow-y-auto mt-2" data-testid="conversation-list">
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">[ Active Threads ]</span>
        {filteredUsers.map((u) => {
          const latest = latestMessages[u.Convo_id];
          let content = latest?.content ?? u.latest_message_content ?? "";
          const isYou = latest?.sender_id === u.user_id;
          const time = latest?.Temp_id ? calctime_2(latest.Temp_id) : "";
          const seen = !latest || isYou || latest.seen;

          if (latest?.deleted) {
            if (latest?.deleted === "Delete for all") {
              content = "This message was deleted";
            } else if (latest?.deleted === "Delete for reciever" && !isYou) {
              content = "This message was deleted";
            }
          }



          return (
            <div 
              key={u.id}
              onClick={async () => {
                await handleclick(u.Convo_id, u.friend_id, u.user_id, u.Saved_name);
                updateView("Messages");
              }}
              className="group relative flex flex-col gap-1 p-space-sm rounded bg-surface-container-lowest hover:bg-surface-container-high transition-colors text-on-surface-variant cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-surface-container-high flex items-center justify-center text-primary-fixed text-xs font-bold uppercase">
                    {(u.Saved_name?.[0] ?? "?")}
                  </div>
                  <span className="font-label-md text-label-md text-on-surface">{u.Saved_name}</span>
                </div>
                <span className="font-label-sm text-label-sm text-outline">{time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-body-sm text-body-sm text-outline line-clamp-1">
                  <span>{isYou ? "You: " : ""}</span>
                  {content}
                </p>
                {!seen && (
                  <span className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_6px_#6fd3ff]"></span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-space-xs mt-auto bg-surface-container-lowest p-space-xs rounded">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary">
            <span className="material-symbols-outlined text-[16px]">engineering</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface">Omo Designer</span>
            <span className="font-annotation text-annotation text-[9px] text-outline">HUD_OPERATOR // 01</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-surface-container-high">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse shadow-[0_0_4px_#6fd3ff]"></span>
          <span className="font-label-sm text-label-sm text-primary">SYNCED</span>
        </div>
      </div>
    </WorkspaceSidebar>
  );
};

export default Display;
