
"use client";
import React, { useEffect, useRef, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { apiFetch } from '@/lib/api/client';
import { toast } from "sonner";
import { useSearchParams, useRouter } from 'next/navigation';

function groupLabel(g: any) {
  return g?.name || "Group";
}

export default function SketchbotGroupWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId');

  const { data: groups, mutate: mutateGroups } = useSWR<any>('/groups', apiFetch);
  const { data: messages } = useSWR<any>(groupId ? `/conversations/${groupId}/messages` : null, apiFetch);
  const { data: profile } = useSWR<any>('/me', apiFetch);
  const user_id = profile?.id;
  const activeGroup = groups?.find((g: any) => g.id === groupId);

  const [search, setSearch] = useState('');
  const [inputText, setInputText] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [membersOpen, setMembersOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const { data: friends } = useSWR<any>(isCreateModalOpen ? '/friends' : null, apiFetch);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredGroups = groups?.filter((g: any) =>
    groupLabel(g).toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const selectGroup = (id: string | null) => {
    if (id) router.push(`?groupId=${id}`);
    else router.push(window.location.pathname);
    setMembersOpen(false);
    setConfigOpen(false);
  };

  const handleLeaveGroup = async (id: string) => {
    try {
      await apiFetch(`/groups/${id}/leave`, { method: 'DELETE' });
      toast("Left group");
      setConfigOpen(false);
      if (groupId === id) selectGroup(null);
      mutateGroups();
    } catch (e: any) {
      toast(e?.message || "Failed to leave group");
    }
  };

  const toggleFriend = (id: string) => {
    setSelectedFriends(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      toast("Group name is required");
      return;
    }
    if (selectedFriends.length === 0) {
      toast("Select at least one friend");
      return;
    }
    setIsSubmitting(true);
    try {
      const created = await apiFetch('/groups', {
        method: "POST",
        body: JSON.stringify({ name: groupName, userIds: selectedFriends })
      });
      setIsCreateModalOpen(false);
      setGroupName('');
      setSelectedFriends([]);
      toast("Group created");
      await mutateGroups();
      if (created?.id) selectGroup(created.id);
    } catch (e: any) {
      toast("Failed to create group: " + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !groupId) return;
    try {
      await apiFetch(`/conversations/${groupId}/messages`, {
        method: "POST",
        body: JSON.stringify({
          content: inputText,
          tempId: Date.now().toString(),
        }),
      });
      setInputText('');
      mutate(`/conversations/${groupId}/messages`);
      mutateGroups();
    } catch (error) {
      toast("Failed to send");
    }
  };

  const memberCount = activeGroup?.memberCount ?? activeGroup?.memberIds?.length ?? 0;

  const list = (
    <>
      <div className="px-3 py-2 border-b border-black flex items-center justify-between bg-white">
        <h2 className="font-sans font-bold text-[14px] text-black tracking-tight">Groups</h2>
        <button onClick={() => setIsCreateModalOpen(true)} className="border border-black px-2 py-0.5 text-[11px] font-sans font-semibold hover:bg-black hover:text-white transition-colors flex items-center gap-1">
          <span>+</span><span>New</span>
        </button>
      </div>
      <div className="p-2 border-b border-black">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined text-[14px] absolute left-[0.5px] text-gray-500 pointer-events-none pt-[1px]">search</span>
          <input
            className="w-full h-7 pl-6 pr-2 text-[12px] font-sans bg-white border border-black focus:outline-none focus:bg-gray-100 placeholder:text-gray-500"
            placeholder="Search groups"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-black font-sans">
        {!filteredGroups ? (
          <div className="flex justify-center p-10"><span className="material-symbols-outlined animate-spin text-[24px]">sync</span></div>
        ) : filteredGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10">
            <span className="font-sans text-[12px] text-gray-500 uppercase">NO GROUPS</span>
          </div>
        ) : (
          filteredGroups.map((g: any) => (
            <div
              key={g.id}
              onClick={() => selectGroup(g.id)}
              className={`p-2.5 cursor-pointer transition-colors bg-white text-black font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px] border border-black mb-1 hover:mt-[-2px]`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[13px] truncate tracking-tight">{groupLabel(g)}</span>
                <span className={`text-[11px] ${groupId === g.id ? 'text-gray-400' : 'text-gray-500'}`}>
                  {g.lastMessageAt ? new Date(g.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
              <div className={`text-[12px] truncate ${groupId === g.id ? 'text-gray-300' : 'text-gray-600'}`}>
                {g.lastMessageContent || `${g.memberCount ?? g.memberIds?.length ?? 0} members`}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );

  return (
    <div className="flex w-full h-full bg-white font-sans text-[12px] divide-x divide-black relative">

      <div className={`md:hidden flex-col w-full h-full bg-white ${groupId ? 'hidden' : 'flex'}`}>
        {list}
      </div>

      <div className="w-[260px] shrink-0 hidden md:flex flex-col bg-white min-h-0">
        {list}
      </div>

      <div className={`flex-1 flex-col bg-white min-h-0 relative ${groupId ? 'flex' : 'hidden md:flex'}`}>
        {groupId && activeGroup ? (
          <>
            <div className="h-10 shrink-0 border-b border-black flex items-center justify-between px-3 bg-white z-10">
              <div className="flex items-center gap-2.5">
                <button onClick={() => selectGroup(null)} className="md:hidden border border-black w-6 h-6 flex items-center justify-center mr-1">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                </button>
                <div className="w-7 h-7 border border-black bg-black text-white flex items-center justify-center font-bold text-[10px] uppercase">
                  {groupLabel(activeGroup).charAt(0)}
                </div>
                <div className="flex flex-col font-sans">
                  <span className="font-bold text-[13px] text-black leading-none">{groupLabel(activeGroup)}</span>
                  <span className="text-[11px] text-gray-500 leading-tight mt-0.5">{memberCount} members</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-sans">
                <button onClick={() => { setMembersOpen(true); setConfigOpen(false); }} className="border border-black px-2 py-0.5 text-[11px] font-semibold hover:bg-black hover:text-white transition-colors">Members</button>
                <button onClick={() => { setConfigOpen(true); setMembersOpen(false); }} className="border border-black px-2 py-0.5 text-[11px] font-semibold hover:bg-black hover:text-white transition-colors">Settings</button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {!messages ? (
                <div className="flex justify-center p-10"><span className="material-symbols-outlined animate-spin text-[24px]">sync</span></div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <span className="font-sans text-[14px]">No messages yet.</span>
                </div>
              ) : (
                messages.map((msg: any) => {
                  const isOwn = msg.senderId === user_id;
                  return (
                    <div key={msg.id || msg.tempId} className={`flex flex-col max-w-[85%] space-y-1 ${isOwn ? 'items-end self-end ml-auto' : 'items-start'}`}>
                      <span className="text-[10px] text-gray-500">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <div className={`p-3 text-[12px] leading-relaxed border border-black ${isOwn ? 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-black text-white'}`}>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-black bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Write a message..."
                  className="flex-1 bg-white border border-black p-2 font-sans text-[13px] text-black focus:outline-none placeholder:text-gray-400"
                />
                <button onClick={handleSendMessage} className="border border-black bg-black text-white px-4 py-2 font-sans text-[13px] font-bold hover:bg-white hover:text-black transition-colors shrink-0">
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-white p-10">
            <span className="material-symbols-outlined text-[48px] text-gray-300 mb-4">groups</span>
            <h2 className="font-sans font-bold text-[16px] text-black uppercase tracking-widest mb-2">SELECT A GROUP</h2>
            <p className="font-sans text-[13px] text-gray-500 max-w-sm text-center">
              Pick a group from the list to open the latest thread.
            </p>
          </div>
        )}
      </div>

      {membersOpen && activeGroup && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setMembersOpen(false)}>
          <div className="bg-white w-full max-w-sm border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-3 border-b-2 border-black bg-gray-100">
              <h2 className="font-sans font-bold text-[14px] uppercase">Members</h2>
              <button onClick={() => setMembersOpen(false)} className="w-6 h-6 flex items-center justify-center hover:bg-black hover:text-white">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="p-4 font-sans text-[13px]">
              {memberCount} people in {groupLabel(activeGroup)}.
            </div>
          </div>
        </div>
      )}

      {configOpen && activeGroup && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setConfigOpen(false)}>
          <div className="bg-white w-full max-w-sm border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-3 border-b-2 border-black bg-gray-100">
              <h2 className="font-sans font-bold text-[14px] uppercase">Group settings</h2>
              <button onClick={() => setConfigOpen(false)} className="w-6 h-6 flex items-center justify-center hover:bg-black hover:text-white">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div className="text-[13px] font-sans">
                <div className="font-bold">{groupLabel(activeGroup)}</div>
                <div className="text-gray-500 mt-1">{memberCount} members</div>
              </div>
              <button onClick={() => handleLeaveGroup(activeGroup.id)} className="w-full py-2 border border-black font-sans text-[11px] font-bold uppercase hover:bg-red-50 text-red-600">
                Leave group
              </button>
            </div>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
            <div className="flex items-center justify-between p-3 border-b-2 border-black bg-gray-100">
              <h2 className="font-sans font-bold text-[14px] text-black uppercase tracking-wider">New group</h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="w-6 h-6 flex items-center justify-center hover:bg-black hover:text-white">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-sans text-[11px] font-bold text-black uppercase">Name</label>
                <input
                  type="text"
                  placeholder="Group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full bg-white border-2 border-black py-2 px-3 font-sans text-[13px] text-black focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-sans text-[11px] font-bold text-black uppercase flex justify-between">
                  <span>Friends</span>
                  <span>{selectedFriends.length} selected</span>
                </label>
                <div className="border-2 border-black bg-gray-50 h-48 overflow-y-auto flex flex-col p-2 gap-1">
                  {!friends ? (
                    <div className="flex justify-center p-4"><span className="material-symbols-outlined animate-spin text-[24px]">sync</span></div>
                  ) : friends.length === 0 ? (
                    <div className="text-center p-4 font-sans text-[12px] text-gray-500 uppercase font-bold">NO FRIENDS</div>
                  ) : (
                    friends.map((f: any) => {
                      const peerId = f.friendId || f.id;
                      const selected = selectedFriends.includes(peerId);
                      return (
                        <button
                          type="button"
                          key={f.id}
                          onClick={() => toggleFriend(peerId)}
                          className={`flex items-center gap-3 p-2 border text-left ${selected ? 'border-black bg-black text-white' : 'border-transparent hover:border-black text-black'}`}
                        >
                          <div className="w-4 h-4 border border-black bg-white flex items-center justify-center shrink-0">
                            {selected && <div className="w-2 h-2 bg-black"></div>}
                          </div>
                          <span className="font-sans font-bold text-[13px]">{f.displayName || f.username}</span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            <div className="p-3 border-t-2 border-black flex justify-end gap-2 bg-gray-50">
              <button onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 border border-black bg-white text-black font-sans text-[11px] font-bold uppercase">Cancel</button>
              <button
                onClick={handleCreateGroup}
                disabled={isSubmitting}
                className="px-6 py-2 bg-black text-white border border-black font-sans text-[11px] font-bold uppercase disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
