
"use client";
import React, { useState } from 'react';
import useSWR from 'swr';
import { apiFetch } from '@/lib/api/client';
import { toast } from 'sonner';

export default function SketchbotFriendsRequests() {
  const { data: friends, mutate: mutateFriends } = useSWR<any>('/friends', apiFetch);
  const { data: requests, mutate: mutateRequests } = useSWR<any>('/friend-requests', apiFetch);
  const { data: profile } = useSWR<any>('/me', apiFetch);

  const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends');
  const [selectedFriendId, setSelectedFriendId] = useState<number | null>(null);
  
  const [findUsername, setFindUsername] = useState('');
  const [showFindModal, setShowFindModal] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [filterText, setFilterText] = useState('');

  const selectedFriend = friends?.find((f: any) => f.id === selectedFriendId);

  const handleSendRequest = async (userId: string) => {
    try {
      await apiFetch('/friend-requests', {
        method: "POST",
        body: JSON.stringify({ receiverId: userId })
      });
      toast("Friend request sent");
      mutateRequests();
    } catch (e: any) {
      toast(e?.message || "Failed to send request");
    }
  };

  const loadPeople = async (q?: string) => {
    try {
      const query = (q ?? findUsername).trim();
      const results = query
        ? await apiFetch(`/users/search?q=${encodeURIComponent(query)}`)
        : await apiFetch('/users');
      setSearchResults(Array.isArray(results) ? results : []);
    } catch (e) {
      toast("Search failed");
    }
  };

  const openFindModal = () => {
    setShowFindModal(true);
    loadPeople('');
  };

  const handleSearch = async () => {
    await loadPeople(findUsername);
  };

  const openChat = (friend: any) => {
    if (!friend?.conversationId) {
      toast("No conversation yet");
      return;
    }
    window.location.href = `/dashboard?convoId=${friend.conversationId}`;
  };

  const blockFriend = async (friend: any) => {
    try {
      // Use friend.friendId which is the actual user ID of the friend
      await apiFetch('/blocks', {
        method: "POST",
        body: JSON.stringify({ blockedUserId: friend.friendId })
      });
      await apiFetch(`/friends/${friend.id}`, { method: "DELETE" });
      mutateFriends();
      if (selectedFriendId === friend.id) setSelectedFriendId(null);
      toast("User blocked");
    } catch (e: any) {
      toast(e?.message || "Failed to block");
    }
  };

  const acceptRequest = async (requestId: number) => {
    try {
      await apiFetch(`/friend-requests/${requestId}/accept`, {
        method: "POST"
      });
      mutateRequests();
      mutateFriends();
      toast("Request accepted");
    } catch (e) {
      toast("Failed to accept request");
    }
  };

  const rejectRequest = async (requestId: number) => {
    try {
      await apiFetch(`/friend-requests/${requestId}/reject`, {
        method: "POST"
      });
      mutateRequests();
      toast("Request rejected");
    } catch (e) {
      toast("Failed to reject request");
    }
  };

  const unfriend = async (friendId: number) => {
    try {
      await apiFetch(`/friends/${friendId}`, { method: "DELETE" });
      mutateFriends();
      if (selectedFriendId === friendId) setSelectedFriendId(null);
      toast("Friend removed");
    } catch (e) {
      toast("Failed to remove friend");
    }
  };

  const filteredFriends = friends?.filter((f: any) => {
    const q = filterText.toLowerCase();
    return (f.username || '').toLowerCase().includes(q) || (f.displayName || '').toLowerCase().includes(q);
  });

  return (
    <div className="flex w-full h-full bg-white font-sans text-[12px] text-black">
      
      {/* ====== MOBILE VIEW (M-02) ====== */}
      <div className="md:hidden flex flex-col w-full h-full bg-white">
        <div className="px-3 pt-3 pb-2 border-b border-black">
          <div className="w-full bg-black text-white p-2 font-mono text-[10px] flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="truncate">[NODE: M-02 | ROUTE: /friends | CONNECTS_TO: M-01, M-10]</span>
            </div>
            <span className="material-symbols-outlined text-[14px]">hub</span>
          </div>
        </div>

        <div className="p-2.5 border-b border-black flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-[14px] font-sans tracking-tight uppercase">Network Hub</h2>
            <button onClick={openFindModal} className="bg-black text-white text-[11px] font-sans px-2.5 py-1 hover:bg-[#222] transition-colors flex items-center gap-1 font-medium">
              <span className="font-bold">+</span><span>Find peers</span>
            </button>
          </div>
          <div className="flex border border-black text-[11px] font-sans mt-1">
            <button onClick={() => setActiveTab('friends')} className={`flex-1 py-1 px-2 font-medium flex items-center justify-center gap-1.5 ${activeTab === 'friends' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}>
              <span>Friends</span><span className={`text-[10px] px-1 font-bold ${activeTab === 'friends' ? 'bg-white text-black' : 'border border-black bg-gray-200'}`}>{friends?.length || 0}</span>
            </button>
            <button onClick={() => setActiveTab('requests')} className={`flex-1 py-1 px-2 font-medium flex items-center justify-center gap-1.5 border-l border-black ${activeTab === 'requests' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}>
              <span>Requests</span><span className={`text-[10px] px-1 font-bold ${activeTab === 'requests' ? 'bg-white text-black' : 'border border-black bg-gray-200'}`}>{requests?.length || 0}</span>
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-white flex flex-col divide-y divide-black">
          {activeTab === 'friends' ? (
            !friends ? <div className="p-10 flex justify-center"><span className="material-symbols-outlined animate-spin text-[24px]">sync</span></div> :
            friends.length === 0 ? <div className="p-10 flex flex-col items-center justify-center text-gray-500 uppercase font-sans">No connected peers</div> :
            friends.map((f: any) => (
              <div key={f.id} className="p-3 bg-white flex flex-col gap-3">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 border border-black bg-black text-white flex items-center justify-center font-bold text-[14px] uppercase shrink-0">
                     {f.username.charAt(0)}
                   </div>
                   <div className="flex flex-col min-w-0 flex-1">
                     <span className="font-bold text-[14px] text-black truncate">{f.displayName || f.username}</span>
                     <span className="text-[10px] text-gray-500 uppercase">Confirmed Peer</span>
                   </div>
                   <button onClick={() => openChat(f)} className="border border-black p-1 hover:bg-black hover:text-white transition-colors" title="Message">
                     <span className="material-symbols-outlined text-[14px] block">chat</span>
                   </button>
                   <button onClick={() => unfriend(f.id)} className="border border-black p-1 hover:bg-black hover:text-white transition-colors" title="Remove Peer">
                     <span className="material-symbols-outlined text-[14px] block">person_remove</span>
                   </button>
                </div>
              </div>
            ))
          ) : (
            !requests ? <div className="p-10 flex justify-center"><span className="material-symbols-outlined animate-spin text-[24px]">sync</span></div> :
            requests.length === 0 ? <div className="p-10 flex flex-col items-center justify-center text-gray-500 uppercase font-sans">No pending requests</div> :
            requests.map((r: any) => (
              <div key={r.id} className="p-3 bg-white flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-black bg-gray-200 text-black flex items-center justify-center font-bold text-[14px] uppercase shrink-0">
                    {(r.senderDisplayName || r.senderUsername || "?").charAt(0)}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-bold text-[14px] text-black truncate">{r.senderDisplayName || r.senderUsername}</span>
                    <span className="text-[10px] text-gray-500 uppercase">Incoming Request</span>
                  </div>
                </div>
                <div className="flex gap-2 font-mono text-[11px]">
                  <button onClick={() => acceptRequest(r.id)} className="flex-1 bg-black text-white border border-black py-1.5 hover:bg-gray-800 uppercase font-bold text-center">Accept</button>
                  <button onClick={() => rejectRequest(r.id)} className="flex-1 bg-white text-black border border-black py-1.5 hover:bg-gray-100 uppercase font-bold text-center">Reject</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ====== DESKTOP VIEW ====== */}
      <div className="hidden md:flex w-full h-full border-l-0 divide-x divide-black bg-white">
        
        {/* MIDDLE COLUMN: DIRECTORY & THREAD LIST (w-[300px]) */}
        <section className="w-[300px] border-r border-black flex flex-col justify-between shrink-0 bg-white">
          <div className="flex flex-col flex-1 min-h-0">
            {/* Header with Segmented Tabs and + Find People */}
            <div className="p-2.5 border-b border-black flex flex-col gap-2 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[14px] font-sans tracking-tight">Friends</h2>
                <button onClick={openFindModal} className="bg-black text-white text-[11px] font-sans px-2.5 py-1 hover:bg-[#222] transition-colors flex items-center gap-1 font-medium">
                  <span className="font-bold">+</span>
                  <span>Find people</span>
                </button>
              </div>
              <div className="flex border border-black text-[11px] font-sans">
                <button onClick={() => setActiveTab('friends')} className={`flex-1 py-1 px-2 font-medium flex items-center justify-center gap-1.5 ${activeTab === 'friends' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#f5f5f5]'}`}>
                  <span>Friends</span>
                  <span className={`text-[10px] px-1 font-bold ${activeTab === 'friends' ? 'bg-white text-black' : 'border border-black bg-[#eee]'}`}>{friends?.length || 0}</span>
                </button>
                <button onClick={() => setActiveTab('requests')} className={`flex-1 py-1 px-2 font-medium flex items-center justify-center gap-1.5 border-l border-black ${activeTab === 'requests' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#f5f5f5]'}`}>
                  <span>Requests</span>
                  <span className={`text-[10px] px-1 font-bold ${activeTab === 'requests' ? 'bg-white text-black' : 'border border-black bg-[#eee]'}`}>{requests?.length || 0}</span>
                </button>
              </div>
            </div>
            
            {/* Filter bar */}
            {activeTab === 'friends' && (
              <div className="p-2 border-b border-black bg-[#fafafa]">
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-2 text-[14px] text-gray-500">search</span>
                  <input 
                    className="w-full h-7 pl-7 pr-1 text-[11px] font-sans border border-black bg-white focus:outline-none placeholder:text-gray-500" 
                    placeholder="Filter friends..." 
                    type="text"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            {/* Directory Listing */}
            <div className="flex flex-col divide-y divide-black overflow-y-auto">
              {activeTab === 'friends' ? (
                !filteredFriends ? (
                  <div className="p-10 flex justify-center"><span className="material-symbols-outlined animate-spin text-[24px]">sync</span></div>
                ) : filteredFriends.length === 0 ? (
                  <div className="p-10 text-center text-[12px] text-gray-500 font-sans">No friends found</div>
                ) : (
                  filteredFriends.map((f: any) => (
                    <div 
                      key={f.id} 
                      onClick={() => setSelectedFriendId(f.id)}
                      className={`p-2.5 cursor-pointer transition-all ${selectedFriendId === f.id ? 'bg-black text-white border-l-4 border-black' : 'hover:bg-[#f5f5f5] bg-white text-black'}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[12px] font-sans">{f.displayName || f.username}</span>
                        </div>
                        <span className={`text-[9px] border px-1 font-sans font-semibold ${selectedFriendId === f.id ? 'border-white text-white' : 'border-black text-black bg-[#eee]'}`}>ONLINE</span>
                      </div>
                      <div className={`flex items-center justify-between text-[11px] font-sans ${selectedFriendId === f.id ? 'opacity-80' : 'text-gray-500'}`}>
                        <span>Confirmed Peer</span>
                      </div>
                    </div>
                  ))
                )
              ) : (
                <div className="p-3 text-[12px] font-sans text-gray-600 bg-[#fafafa] italic text-center">
                  Select requests tab in main inspector
                </div>
              )}
            </div>
          </div>
          
          {/* Footer count status */}
          <div className="p-2 border-t border-black font-sans text-[11px] flex items-center justify-between text-gray-500 bg-[#fafafa] shrink-0">
            <span>{activeTab === 'friends' ? `${friends?.length || 0} total friends` : `${requests?.length || 0} total requests`}</span>
            <span className="text-black font-medium">Updated now</span>
          </div>
        </section>

        {/* RIGHT MAIN PANEL: INSPECTOR / MEMBERS & SPECIFICATION */}
        <main className="flex-1 flex flex-col justify-between bg-white overflow-y-auto min-w-0">
          <div className="flex flex-col h-full">
            
            {/* Top Header for Contact Details */}
            <div className="p-3 border-b border-black flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
              <div>
                <div className="text-[11px] text-gray-500 font-sans">{selectedFriend ? 'Contact Info' : 'Global Inspector'}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <h1 className="font-bold text-[16px] tracking-tight font-sans text-black">
                    {selectedFriend ? (selectedFriend.displayName || selectedFriend.username) : 'Network Overview'}
                  </h1>
                  {selectedFriend && <span className="border border-black text-[9px] font-sans px-1 font-semibold uppercase bg-[#eee]">Friend</span>}
                </div>
              </div>
              {selectedFriend && (
                <div className="flex items-center gap-1.5 font-sans text-[11px]">
                  <button onClick={() => openChat(selectedFriend)} className="bg-black text-white px-3 py-1 hover:bg-[#222] transition-colors font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">chat</span>
                    <span>Message</span>
                  </button>
                </div>
              )}
            </div>

            {/* SPECIFICATION & ACTIVE SECTIONS GRID */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-black border-b border-black">
              
              {/* LEFT SUB-SECTION: CONTACT PROFILE & METADATA */}
              <div className="lg:col-span-5 p-3 flex flex-col gap-3 bg-[#fafafa]">
                {selectedFriend ? (
                  <>
                    <div className="text-[11px] font-bold tracking-wider text-gray-500 uppercase font-sans">
                      Contact Profile
                    </div>
                    <div className="flex items-center gap-3 border border-black p-2.5 bg-white">
                      <div className="w-12 h-12 border border-black bg-black text-white flex items-center justify-center font-bold text-[14px] font-sans shrink-0 uppercase">
                        {selectedFriend.username.charAt(0)}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[10px] text-gray-500 font-sans uppercase">Display Name</span>
                        <span className="font-bold text-[13px] font-sans text-black truncate">{selectedFriend.displayName || selectedFriend.username}</span>
                        <span className="text-[11px] text-gray-500 font-sans">Active now</span>
                      </div>
                    </div>
                    
                    {/* Mutual Groups & Details */}
                    <div className="border border-black bg-white divide-y divide-black font-sans text-[11px]">
                      <div className="p-2 flex justify-between">
                        <span className="text-gray-500">Friend Status</span>
                        <span className="font-medium text-black">Confirmed</span>
                      </div>
                      <div className="p-2 flex justify-between">
                        <span className="text-gray-500">Direct Messages</span>
                        <span className="font-medium text-black">Enabled</span>
                      </div>
                    </div>

                    {/* Relationship Management Actions */}
                    <div className="flex flex-col gap-1.5 pt-1 mt-auto">
                      <button onClick={() => unfriend(selectedFriend.id)} className="border border-black px-2.5 py-1.5 bg-white hover:bg-[#f5f5f5] text-left font-sans text-[11px] flex items-center justify-between">
                        <span>Remove friend</span>
                        <span className="material-symbols-outlined text-[14px] text-gray-500">person_remove</span>
                      </button>
                      <button onClick={() => blockFriend(selectedFriend)} className="border border-black px-2.5 py-1.5 bg-white hover:bg-red-50 text-left font-sans text-[11px] flex items-center justify-between text-red-600">
                        <span>Block</span>
                        <span className="material-symbols-outlined text-[14px]">block</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 font-sans">
                    <span className="material-symbols-outlined text-[48px] mb-2">person_search</span>
                    <span className="text-[13px] uppercase tracking-wider font-bold text-gray-600">No contact selected</span>
                  </div>
                )}
              </div>

              {/* RIGHT SUB-SECTION: INCOMING REQUESTS & RECENT ACTIVITY */}
              <div className="lg:col-span-7 p-3 flex flex-col gap-3 bg-white">
                <div className="border border-black p-2.5 bg-[#fcfcfc]">
                  <div className="flex items-center justify-between pb-1.5 font-sans text-[11px] border-b border-black">
                    <span className="font-bold text-black uppercase tracking-wider">Incoming Requests ({requests?.length || 0})</span>
                    <span className="text-gray-500 text-[10px]">Pending approval</span>
                  </div>
                  <div className="divide-y divide-[#ececec] text-[12px] font-sans">
                    {!requests ? (
                      <div className="py-4 text-center"><span className="material-symbols-outlined animate-spin text-[20px]">sync</span></div>
                    ) : requests.length === 0 ? (
                      <div className="py-4 text-center text-gray-500">No incoming requests</div>
                    ) : (
                      requests.map((r: any) => (
                        <div key={r.id} className="py-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-8 h-8 border border-black bg-[#eee] flex items-center justify-center font-bold text-[11px] text-black shrink-0 uppercase">
                              {(r.senderDisplayName || r.senderUsername || "?").charAt(0)}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-semibold text-black truncate text-[12px]">{r.senderDisplayName || r.senderUsername}</span>
                              <span className="text-[10px] text-gray-500">Sent recently</span>
                            </div>
                          </div>
                          <div className="flex gap-1.5 text-[10px] shrink-0 font-medium">
                            <button onClick={() => acceptRequest(r.id)} className="border border-black px-2.5 py-1 bg-black text-white hover:bg-[#222] transition-colors">Accept</button>
                            <button onClick={() => rejectRequest(r.id)} className="border border-black px-2.5 py-1 bg-white hover:bg-[#f5f5f5] transition-colors">Decline</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
      
      {/* ====== MODALS ====== */}
      {showFindModal && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col w-[400px]">
            <div className="flex items-center justify-between p-3 border-b-2 border-black bg-gray-100">
              <h2 className="font-sans font-bold text-[14px] text-black uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                Initialize Peer Connection
              </h2>
              <button onClick={() => setShowFindModal(false)} className="hover:text-red-600 transition-colors">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <p className="font-sans text-[12px] text-gray-700">Enter a peer's exact handle to transmit a connection request. Synchronization requires mutual approval.</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-2 top-1.5 text-[16px] text-gray-500 pointer-events-none">alternate_email</span>
                  <input 
                    type="text" 
                    value={findUsername}
                    onChange={(e) => setFindUsername(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Peer handle" 
                    className="w-full border-2 border-black pl-8 pr-2 py-1 font-mono text-[12px] bg-white focus:outline-none focus:ring-1 focus:ring-black focus:bg-gray-50 placeholder:text-gray-400"
                  />
                </div>
                <button onClick={handleSearch} className="bg-black text-white px-3 py-1 font-sans text-[12px] font-bold uppercase tracking-wider hover:bg-white hover:text-black hover:border-black border-2 border-black transition-all">
                  Locate
                </button>
              </div>
              
              <div className="border border-black mt-2 bg-gray-50 flex-1 min-h-[150px] max-h-[300px] overflow-y-auto">
                <div className="bg-black text-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest border-b border-black flex justify-between">
                  <span>Query Results</span>
                  <span>{searchResults.length} Match(es)</span>
                </div>
                <div className="divide-y divide-black font-sans text-[12px]">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 uppercase tracking-wider text-[11px]">No Matches Found</div>
                  ) : (
                    searchResults.map(user => (
                      <div key={user.id} className="p-3 flex items-center justify-between hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 border border-black bg-white flex items-center justify-center font-bold text-[12px] uppercase">{user.username.charAt(0)}</div>
                          <span className="font-bold">{user.username}</span>
                        </div>
                        <button onClick={() => handleSendRequest(user.id)} className="border border-black px-2 py-1 bg-white hover:bg-black hover:text-white transition-colors text-[10px] font-bold uppercase tracking-wider">
                          Connect
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

