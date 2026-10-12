
"use client";
import React, { useState, useEffect, useRef } from 'react';
import useSWR, { mutate } from 'swr';
import { apiFetch } from '@/lib/api/client';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SketchbotChatWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const convoId = searchParams.get('convoId');
  
  const { data: conversations } = useSWR<any>('/conversations', apiFetch);
  const { data: messages } = useSWR<any>(convoId ? `/conversations/${convoId}/messages` : null, apiFetch);
  const { data: stories } = useSWR<any>('/stories', apiFetch);
  const { data: profile } = useSWR<any>('/me', apiFetch);
  const user_id = profile?.id;
  
  const activeConvo = conversations?.find((c: any) => c.id === convoId);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredConversations = conversations?.filter((c: any) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const haystack = [c.otherUsername, c.otherDisplayName, c.savedName, c.name]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !convoId) return;
    try {
      toast("Uploading media...");
      const presignRes = await apiFetch("/uploads/presign", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, contentType: file.type })
      });
      const uploadRes = await fetch(presignRes.uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type }
      });
      if (!uploadRes.ok) throw new Error("S3 Upload Failed");
      const mediaUrl = presignRes.publicUrl;
      await apiFetch(`/conversations/${convoId}/messages`, {
        method: "POST",
        body: JSON.stringify({ content: `[MEDIA] ${mediaUrl}` })
      });
      toast("Media sent successfully");
    } catch (error) {
      console.error("Upload failed", error);
      toast("Media upload failed");
    }
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      await apiFetch(`/messages/${id}`, { method: "DELETE" });
      if (convoId) mutate(`/conversations/${convoId}/messages`);
      toast("Message deleted");
    } catch (e) {
      toast("Failed to delete message");
    }
  };

  const submitEdit = async () => {
    if (!editingId || !editContent.trim()) return;
    try {
      await apiFetch(`/messages/${editingId}`, {
        method: "PATCH",
        body: JSON.stringify({ content: editContent })
      });
      setEditingId(null);
      setEditContent('');
      if (convoId) mutate(`/conversations/${convoId}/messages`);
      toast("Message updated");
    } catch (e) {
      toast("Failed to edit message");
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !convoId) return;
    try {
      await apiFetch(`/conversations/${convoId}/messages`, {
        method: "POST",
        body: JSON.stringify({
          content: inputText,
          tempId: Date.now().toString(),
          replyToId: null,
        }),
      });
      setInputText('');
      mutate(`/conversations/${convoId}/messages`);
      mutate('/conversations');
    } catch (error) {
      console.error("Failed to send message", error);
      toast("Failed to send");
    }
  };

  const updateUrlWithConvo = (id: string | null) => {
    if (id) router.push(`?convoId=${id}`);
    else router.push(window.location.pathname);
  };

  return (
    <div className="flex w-full h-full bg-white divide-x divide-black font-sans">
      
      {/* ====== MOBILE VIEW (M-01) ====== */}
      <div className={`md:hidden flex-col w-full h-full bg-white ${convoId ? 'hidden' : 'flex'}`}>
        <div className="px-3 pt-3 pb-2 border-b border-black">
          <div className="w-full bg-black text-white p-2 font-mono text-[10px] flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="truncate">[NODE: M-01 | ROUTE: /chats | CONNECTS_TO: M-06, M-02]</span>
            </div>
            <span className="material-symbols-outlined text-[14px]">hub</span>
          </div>
        </div>

        <div className="px-3 py-2 border-b border-black">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-2 text-black text-[16px]">search</span>
            <input className="w-full bg-white border border-black pl-8 pr-8 py-1.5 text-black font-sans text-[13px] focus:outline-none placeholder:text-gray-500" placeholder="Search..." type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </div>
        
        {/* Mobile Stories Tray */}
        <div className="p-2 border-b border-black flex items-center gap-2 overflow-x-auto">
          <Link href="/stories" className="w-7 h-7 border border-black flex items-center justify-center text-[12px] font-bold hover:bg-black hover:text-white transition-colors shrink-0" title="Add story">+</Link>
          {stories?.map((s: any, i: number) => (
             <Link key={s.id || i} href="/stories" className="w-7 h-7 rounded-full border border-black bg-gray-100 flex items-center justify-center text-[10px] font-bold shrink-0 cursor-pointer hover:bg-black hover:text-white transition-colors" title={s.username}>
               {s.username?.charAt(0)}
             </Link>
          ))}
        </div>

        <div className="px-3 pt-3 pb-2 flex items-center justify-between border-b border-black">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[14px] font-bold text-black tracking-tight">Direct Threads</span>
            <span className="font-mono text-[10px] px-1 bg-black text-white">{conversations?.length || 0} Synced</span>
          </div>
          <Link href="/friends" className="flex items-center gap-1 px-2 py-1 bg-black text-white font-sans text-[11px] font-bold uppercase transition-colors active:scale-95">
            <span className="material-symbols-outlined text-[14px]">add</span>
            <span>New Chat</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto bg-white flex flex-col">
          {!filteredConversations ? (
            <div className="flex justify-center p-10"><span className="material-symbols-outlined animate-spin text-[24px]">sync</span></div>
          ) : filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 border-b border-black">
              <span className="material-symbols-outlined text-[48px] text-gray-400 mb-2">forum</span>
              <span className="font-sans text-[14px] font-bold text-black uppercase tracking-tight text-center">NO CHATS ACTIVE</span>
              <Link href="/friends" className="mt-4 px-4 py-2 border border-black font-sans text-[12px] font-bold hover:bg-black hover:text-white transition-colors">Find People</Link>
            </div>
          ) : (
            filteredConversations.map((c: any, i: number) => (
              <button key={c.id || i} onClick={() => updateUrlWithConvo(c.id)} className="flex items-center p-3 border-b border-black hover:bg-gray-100 transition-colors w-full text-left group">
                <div className="w-10 h-10 border border-black bg-white flex items-center justify-center font-bold font-sans text-[14px] text-black shrink-0">
                  {c.otherUsername?.charAt(0).toUpperCase() || c.savedName?.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-sans text-[14px] font-bold text-black truncate group-hover:underline">{c.savedName || c.otherDisplayName || c.otherUsername}</h3>
                    <span className="font-sans text-[11px] text-gray-500 shrink-0">{new Date(c.lastMessageAt || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <p className="font-sans text-[13px] text-gray-700 truncate">{c.lastMessageContent || "No messages yet"}</p>
                </div>
                {c.unreadCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-black text-white font-mono text-[10px] font-bold shrink-0">{c.unreadCount}</span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* ====== DESKTOP VIEW & MOBILE CHAT CANVAS ====== */}
      {/* On mobile, this acts as the full-screen chat modal when convoId is present. On desktop, it's always the split layout. */}
      
      {/* Desktop Column 2: Thread Directory */}
      <div className={`w-[260px] shrink-0 hidden md:flex flex-col bg-white min-h-0 border-r border-black`}>
        <div className="px-3 py-2 border-b border-black flex items-center justify-between bg-white">
          <h2 className="font-sans font-bold text-[14px] text-black tracking-tight">Chats</h2>
          <Link href="/friends" className="border border-black px-2 py-0.5 text-[11px] font-sans font-semibold hover:bg-black hover:text-white transition-colors flex items-center gap-1" title="New chat">
            <span>+</span><span>New</span>
          </Link>
        </div>
        
        <div className="p-2 border-b border-black">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined text-[5px] absolute left-1 text-gray-500 pointer-events-none pt-[0.5px] ">search</span>
            <input className="w-full h-7 pl-6 pr-2 text-[12px]font-sans bg-white border border-black focus:outline-none focus:bg-gray-100 placeholder:text-gray-500" placeholder="Search" type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </div>
        
        <div className="p-2 border-b border-black flex items-center gap-2 overflow-x-auto">
          <Link href="/stories" className="w-7 h-7 border border-black flex items-center justify-center text-[12px] font-bold hover:bg-black hover:text-white transition-colors shrink-0" title="Add story">+</Link>
          {stories?.map((s: any, i: number) => (
             <Link key={s.id || i} href="/stories" className="w-7 h-7 rounded-full border border-black bg-gray-100 flex items-center justify-center text-[10px] font-bold shrink-0 cursor-pointer hover:bg-black hover:text-white transition-colors" title={s.username}>
               {s.username?.charAt(0)}
             </Link>
          ))}
          {!stories?.length && (
            <div className="w-7 h-7 rounded-full border border-black bg-gray-100 flex items-center justify-center text-[10px] font-bold shrink-0 cursor-pointer hover:bg-black hover:text-white transition-colors" title="Marcus Vance">MV</div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto divide-y divide-black font-sans" data-testid="conversation-list">
          {!filteredConversations ? (
            <div className="flex justify-center p-10"><span className="material-symbols-outlined animate-spin text-[24px]">sync</span></div>
          ) : filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10">
              <span className="font-sans text-[12px] text-gray-500 uppercase">NO CHATS</span>
            </div>
          ) : (
            filteredConversations.map((c: any, i: number) => (
              <div key={c.id || i} onClick={() => updateUrlWithConvo(c.id)} className={`p-2.5 cursor-pointer transition-colors bg-white text-black font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-[2px] border border-black mb-1 hover:mt-[-2px]`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[13px] truncate tracking-tight">{c.savedName || c.otherDisplayName || c.otherUsername}</span>
                  <span className={`text-[11px] ${convoId === c.id ? 'text-gray-400' : 'text-gray-500'}`}>{new Date(c.lastMessageAt || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className={`truncate text-black`}>{c.lastMessageContent || "No messages yet"}</span>
                  {c.unreadCount > 0 && <span className={`border px-1 text-[9px] font-mono font-bold shrink-0  border-black text-white bg-black `}>{c.unreadCount}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Desktop Column 3 / Mobile Canvas */}
      <div className={`flex-1 flex-col bg-white min-h-0 relative ${convoId ? 'flex' : 'hidden md:flex'}`}>
        {convoId ? (
          <>
            {/* Header */}
            <div className="h-10 shrink-0 border-b border-black flex items-center justify-between px-3 bg-white z-10">
              <div className="flex items-center gap-2.5">
                <button onClick={() => updateUrlWithConvo(null)} className="md:hidden border border-black w-6 h-6 flex items-center justify-center mr-1">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                </button>
                <div className="w-7 h-7 rounded-full border border-black bg-black text-white flex items-center justify-center font-bold text-[10px] uppercase">
                  {activeConvo?.otherUsername?.charAt(0) || activeConvo?.savedName?.charAt(0)}
                </div>
                <div className="flex flex-col font-sans">
                  <span className="font-bold text-[13px] text-black leading-none">{activeConvo?.otherUsername || activeConvo?.savedName}</span>
                  <span className="text-[11px] text-gray-500 leading-tight mt-0.5">{activeConvo?.savedName ? "Group Thread" : "Direct Message"}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-sans">
                <button className="border border-black px-2 py-0.5 text-[11px] font-semibold hover:bg-black hover:text-white transition-colors">Info</button>
                <button className="border border-black w-6 h-6 text-[12px] font-bold hover:bg-black hover:text-white transition-colors flex items-center justify-center">...</button>
              </div>
            </div>

            {/* Messages Canvas */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white" id="thread-canvas">
              <div className="flex items-center justify-center">
                <span className="border border-black px-3 py-0.5 text-[11px] font-sans font-medium bg-white text-black">Today</span>
              </div>
              
              {!messages ? (
                <div className="flex justify-center p-10"><span className="material-symbols-outlined animate-spin text-[24px]">sync</span></div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <span className="font-sans text-[14px]">No message history. Transmit data to initialize.</span>
                </div>
              ) : (
                messages.map((msg: any) => {
                  const isOwn = msg.senderId === user_id;
                  const senderName = isOwn ? "You" : activeConvo?.otherUsername || "Peer";
                  
                  return (
                    <div key={msg.id || msg.tempId} className={`flex flex-col max-w-[85%] space-y-1 ${isOwn ? 'items-end self-end ml-auto' : 'items-start'}`}>
                      <div className={`flex items-center gap-2 text-[10px] tracking-tight ${isOwn ? 'flex-row-reverse' : ''}`}>
                        <span className="font-sans font-semibold text-[11px] text-black">{senderName}</span>
                        <span className="text-gray-500 text-[10px]">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                      
                      <div className={`p-3 text-[12px] leading-relaxed border border-black group relative ${isOwn ? 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'}`}>
                        {/* Hover Actions */}
                        {isOwn && (
                          <div className={`absolute top-0 right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1`}>
                             <button onClick={() => { setEditingId(msg.id); setEditContent(msg.content); }} className="border border-black bg-white text-black text-[10px] font-bold px-1.5 hover:bg-black hover:text-white">EDIT</button>
                             <button onClick={() => handleDeleteMessage(msg.id)} className="border border-black bg-white text-black text-[10px] font-bold px-1.5 hover:bg-black hover:text-white">DEL</button>
                          </div>
                        )}

                        {editingId === msg.id ? (
                          <div className="flex flex-col gap-2">
                            <input type="text" value={editContent} onChange={e => setEditContent(e.target.value)} className="text-black p-1 bg-white border border-gray-400 focus:outline-none" />
                            <div className="flex gap-2">
                              <button onClick={submitEdit} className="text-[10px] bg-white text-black font-bold px-2 py-1">SAVE</button>
                              <button onClick={() => setEditingId(null)} className="text-[10px] border border-white text-white px-2 py-1">CANCEL</button>
                            </div>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-black bg-white">
              <div className="flex items-center gap-2">
                <button onClick={() => document.getElementById('chat-file-upload')?.click()} className="border border-black bg-white text-black w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors shrink-0">
                  <span className="material-symbols-outlined text-[16px]">attach_file</span>
                </button>
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
            <span className="material-symbols-outlined text-[48px] text-gray-300 mb-4">terminal</span>
            <h2 className="font-sans font-bold text-[16px] text-black uppercase tracking-widest mb-2">AWAITING CONNECTION</h2>
            <p className="font-sans text-[13px] text-gray-500 max-w-sm text-center">
              Select a thread from the directory to initialize the communication stream.
            </p>
          </div>
        )}
      </div>
      
      <input type="file" id="chat-file-upload" className="hidden" accept="image/*,video/*" onChange={handleFileUpload} />
    </div>
  );
}

