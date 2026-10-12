"use client";
import React, { useState, useRef, useEffect } from 'react';
import useSWR from 'swr';
import { apiFetch } from '@/lib/api/client';
import { toast } from "sonner";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SketchbotStoriesSuite() {
  const { data: stories, mutate } = useSWR<any>('/stories', apiFetch);
  
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [replyContent, setReplyContent] = useState('');
  
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadText, setUploadText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (stories && activeStoryIndex < stories.length - 1) setActiveStoryIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activeStoryIndex > 0) setActiveStoryIndex(prev => prev - 1);
  };

  const handleReply = async (story: any) => {
    if (!replyContent.trim() || !story?.id) return;
    try {
      await apiFetch(`/stories/${story.id}/reply`, {
        method: "POST",
        body: JSON.stringify({ content: replyContent })
      });
      setReplyContent('');
      toast("Reply sent");
    } catch(e: any) {
      toast(e?.message || "Reply failed.");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setUploadPreview(URL.createObjectURL(file));
    }
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    try {
      let mediaUrl = null;
      let mediaType = 'text';
      
      if (uploadFile) {
         mediaUrl = "https://fake.url/image.jpg"; // Mocked for now to skip s3 presign logic in UI
         mediaType = uploadFile.type.startsWith('video/') ? 'video' : 'image';
      }
      
      if (!mediaUrl && !uploadText.trim()) {
         toast("Please provide media or text for the story.");
         setIsSubmitting(false);
         return;
      }
      
      await apiFetch('/stories', {
         method: "POST",
         body: JSON.stringify({
            caption: uploadText,
            content: uploadText,
            mediaUrl: mediaUrl,
            mediaType: mediaType
         })
      });
      
      toast("Broadcast transmitted successfully!");
      setIsUploadModalOpen(false);
      setUploadFile(null);
      setUploadPreview(null);
      setUploadText('');
      mutate();
    } catch(e) {
       toast("Failed to publish broadcast.");
    } finally {
       setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full h-full bg-white text-black overflow-hidden font-sans relative divide-x border-black">
      
      {/* ====== MOBILE VIEW (M-04) ====== */}
      <div className="flex md:hidden flex-col w-full h-full relative">
        {/* System Architecture Pill */}
        <div className="absolute top-0 left-0 w-full px-3 py-2 z-50 pointer-events-none">
          <div className="w-full bg-white/90 backdrop-blur-sm border border-black p-2 font-mono text-[10px] flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
              <span className="truncate text-black">[NODE: M-04 | ROUTE: /stories | CONNECTS_TO: M-13]</span>
            </div>
            <span className="material-symbols-outlined text-[14px] text-black">motion_photos_on</span>
          </div>
        </div>

        {/* Action Triggers Overlay */}
        <div className="absolute top-14 left-0 w-full px-4 flex justify-between z-40 pointer-events-none">
          <button className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center pointer-events-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all" onClick={() => window.history.back()}>
             <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          
          <button onClick={() => setIsUploadModalOpen(true)} className="flex items-center gap-2 px-4 h-10 border-2 border-black bg-black text-white font-bold text-[11px] uppercase pointer-events-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
            <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
            PUBLISH
          </button>
        </div>

        {/* Stories Viewer Implementation */}
        {!stories ? (
          <div className="flex-1 flex justify-center items-center"><span className="material-symbols-outlined animate-spin text-[32px]">sync</span></div>
        ) : stories.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10">
            <span className="material-symbols-outlined text-[48px] text-gray-600 mb-2">blur_off</span>
            <span className="font-sans text-[14px] font-bold uppercase tracking-tight text-center text-gray-500">NO ACTIVE BROADCASTS</span>
          </div>
        ) : (
          <div className="flex-1 relative flex flex-col bg-gray-100">
            {/* Story Display Area */}
            {stories[activeStoryIndex]?.mediaUrl ? (
               <img src={stories[activeStoryIndex].mediaUrl} className="absolute inset-0 w-full h-full object-cover" alt="story" />
            ) : (
               <div className="absolute inset-0 w-full h-full flex items-center justify-center p-8 text-center text-2xl font-bold bg-gray-200 text-black">
                 {stories[activeStoryIndex]?.caption || stories[activeStoryIndex]?.content}
               </div>
            )}
            
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white/90 pointer-events-none"></div>

            {/* Navigation Overlay (Invisible split click areas) */}
            <div className="absolute inset-0 flex z-30 pt-24 pb-20">
              <div className="w-1/3 h-full" onClick={handlePrev}></div>
              <div className="w-2/3 h-full" onClick={handleNext}></div>
            </div>

            {/* Top Info Overlay */}
            <div className="absolute top-24 left-0 w-full px-4 z-40 pointer-events-none">
              {/* Progress Bars */}
              <div className="flex gap-1 mb-3">
                {stories.map((s: any, idx: number) => (
                  <div key={idx} className="h-1 flex-1 bg-black/20 overflow-hidden">
                    <div className={`h-full bg-black transition-all duration-300 ${idx === activeStoryIndex ? 'w-full' : idx < activeStoryIndex ? 'w-full' : 'w-0'}`}></div>
                  </div>
                ))}
              </div>
              {/* Profile Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-black bg-white flex items-center justify-center font-bold text-[14px] uppercase text-black">
                  {stories[activeStoryIndex]?.username?.charAt(0)}
                </div>
                <div className="flex flex-col drop-shadow-sm">
                  <span className="font-bold text-[14px] text-black">{stories[activeStoryIndex]?.username}</span>
                  <span className="text-[10px] text-gray-500 font-mono" suppressHydrationWarning>{new Date(stories[activeStoryIndex]?.expiresAt).toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="mt-3 text-[14px] drop-shadow-sm text-black font-medium">
                 {stories[activeStoryIndex]?.mediaUrl && (stories[activeStoryIndex]?.caption || stories[activeStoryIndex]?.content)}
              </div>
            </div>

            {/* Bottom Input Overlay */}
            <div className="absolute bottom-4 left-0 w-full px-4 z-40">
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={replyContent}
                  onChange={e => setReplyContent(e.target.value)}
                  placeholder="Transmit reply..." 
                  className="flex-1 bg-white/80 backdrop-blur-md border-2 border-black px-4 py-3 font-sans text-[13px] text-black focus:outline-none focus:bg-white placeholder:text-gray-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
                <button onClick={() => handleReply(stories[activeStoryIndex])} className="w-12 h-12 border-2 border-black bg-black text-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all shrink-0">
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ====== DESKTOP VIEW ====== */}
      <div className="hidden md:flex w-full h-full bg-white relative">
        {/* LEFT COLUMN: Feed/Users */}
        <div className="w-[300px] border-r border-black bg-white flex flex-col z-20 relative">
          <div className="px-4 py-5 border-b border-black">
            <h2 className="font-sans font-bold text-[18px] uppercase tracking-widest text-black">Broadcasts</h2>
            <p className="font-sans text-[11px] text-gray-500 mt-1">Ephemeral node transmissions.</p>
          </div>
          
          <div className="p-3 border-b border-black">
            <button onClick={() => setIsUploadModalOpen(true)} className="w-full py-2.5 bg-white border-black-1 text-black font-sans text-[12px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              New Broadcast
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {!stories ? (
               <div className="flex justify-center p-10"><span className="material-symbols-outlined animate-spin text-[24px] text-black">sync</span></div>
            ) : stories.length === 0 ? (
               <div className="p-4 border border-black border-dashed text-center">
                 <span className="text-[11px] font-bold text-gray-500 uppercase">Empty</span>
               </div>
            ) : (
               stories.map((s: any, idx: number) => (
                 <button 
                   key={idx} 
                   onClick={() => setActiveStoryIndex(idx)}
                   className={`w-full flex items-center gap-3 p-3 border-2 transition-all text-left ${activeStoryIndex === idx ? 'border-black bg-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -translate-y-1' : 'border-transparent hover:border-black text-black hover:bg-gray-50'}`}
                 >
                   <div className={`w-12 h-12 border-2 flex items-center justify-center font-bold text-[16px] uppercase ${activeStoryIndex === idx ? 'border-white bg-black text-white' : 'border-black bg-white text-black'}`}>
                     {s.username?.charAt(0)}
                   </div>
                   <div className="flex flex-col min-w-0">
                     <span className="font-bold text-[14px] truncate">{s.username}</span>
                     <span className={`text-[10px] font-mono truncate ${activeStoryIndex === idx ? 'text-gray-300' : 'text-gray-500'}`} suppressHydrationWarning>
                       {new Date(s.createdAt).toLocaleTimeString()}
                     </span>
                   </div>
                 </button>
               ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Viewport Area */}
        <div className="flex-1 relative flex items-center justify-center bg-gray-100">
          {!stories || stories.length === 0 ? (
             <div className="text-gray-500 font-sans text-[14px] uppercase tracking-widest font-bold">Select a broadcast to view</div>
          ) : (
             <div className="relative w-[360px] h-[720px] bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col group">
               {/* Progress Bar */}
               <div className="absolute top-0 left-0 w-full flex gap-1 p-3 z-50">
                 {stories.map((s: any, idx: number) => (
                    <div key={idx} className="h-1 flex-1 bg-black/20 overflow-hidden">
                      <div className={`h-full bg-black transition-all duration-300 ${idx === activeStoryIndex ? 'w-full' : idx < activeStoryIndex ? 'w-full' : 'w-0'}`}></div>
                    </div>
                  ))}
               </div>

               {/* Profile Info */}
               <div className="absolute top-6 left-0 w-full p-4 flex items-center gap-3 z-50">
                 <div className="w-10 h-10 border-2 border-black bg-white text-black flex items-center justify-center font-bold text-[14px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                   {stories[activeStoryIndex]?.username?.charAt(0)}
                 </div>
                 <div className="flex flex-col drop-shadow-sm">
                   <span className="font-bold text-[14px] text-black">{stories[activeStoryIndex]?.username}</span>
                   <span className="text-[10px] text-gray-600 font-mono" suppressHydrationWarning>{new Date(stories[activeStoryIndex]?.expiresAt).toLocaleTimeString()}</span>
                 </div>
               </div>

               {/* Content Area */}
               <div className="flex-1 relative overflow-hidden bg-gray-200">
                  {stories[activeStoryIndex]?.mediaUrl ? (
                     <img src={stories[activeStoryIndex].mediaUrl} className="absolute inset-0 w-full h-full object-cover" alt="story" />
                  ) : (
                     <div className="absolute inset-0 w-full h-full flex items-center justify-center p-8 text-center text-xl font-bold bg-gray-200 text-black">
                       {stories[activeStoryIndex]?.caption || stories[activeStoryIndex]?.content}
                     </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white/90 pointer-events-none"></div>
                  
                  {stories[activeStoryIndex]?.mediaUrl && stories[activeStoryIndex]?.content && (
                     <div className="absolute bottom-20 left-0 w-full p-4 z-40 text-sm font-bold text-black drop-shadow-sm">
                       {stories[activeStoryIndex]?.caption || stories[activeStoryIndex]?.content}
                     </div>
                  )}
               </div>

               {/* Click Navigation Overlays */}
               <div className="absolute inset-0 z-30 flex">
                 <div className="w-1/3 h-full cursor-w-resize" onClick={handlePrev}></div>
                 <div className="w-2/3 h-full cursor-e-resize" onClick={handleNext}></div>
               </div>

               {/* Reply Box */}
               <div className="absolute bottom-0 left-0 w-full p-4 z-50 bg-gradient-to-t from-white/90 to-transparent">
                 <div className="flex items-center gap-2 relative z-50">
                   <input 
                     type="text" 
                     value={replyContent}
                     onChange={e => setReplyContent(e.target.value)}
                     onClick={(e) => e.stopPropagation()}
                     placeholder="Transmit reply..." 
                     className="flex-1 bg-white/80 backdrop-blur-md border-2 border-black px-4 py-2.5 font-sans text-[12px] text-black focus:outline-none focus:bg-white placeholder:text-gray-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                   />
                   <button onClick={(e) => { e.stopPropagation(); handleReply(stories[activeStoryIndex].id); }} className="w-10 h-10 border-2 border-black bg-black text-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all shrink-0">
                     <span className="material-symbols-outlined text-[16px]">send</span>
                   </button>
                 </div>
               </div>
             </div>
          )}
        </div>
      </div>

      {/* Shared Upload Modal */}
      {isUploadModalOpen && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white text-black w-full max-w-md border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
            <div className="flex items-center justify-between p-3 border-b-2 border-black bg-gray-100">
              <h2 className="font-sans font-bold text-[14px] uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">publish</span>
                Initialize Broadcast
              </h2>
              <button onClick={() => setIsUploadModalOpen(false)} className="w-6 h-6 flex items-center justify-center hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            
            <div className="p-4 flex flex-col gap-4">
              {uploadPreview ? (
                <div className="w-full h-48 border-2 border-black relative overflow-hidden bg-black group">
                  <img src={uploadPreview} alt="Preview" className="w-full h-full object-contain opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setUploadFile(null); setUploadPreview(null); }} className="px-4 py-2 bg-red-600 text-white font-bold text-[11px] uppercase border border-red-800">
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-32 border-2 border-black border-dashed flex flex-col items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => document.getElementById('story-file')?.click()}>
                  <span className="material-symbols-outlined text-[32px] text-gray-400">add_photo_alternate</span>
                  <span className="font-sans text-[11px] font-bold text-gray-500 uppercase">Attach Media Payload</span>
                </div>
              )}
              <input type="file" id="story-file" className="hidden" accept="image/*,video/*" onChange={handleFileSelect} />

              <div className="flex flex-col gap-1">
                <label className="font-sans text-[11px] font-bold uppercase">Transmission Text</label>
                <textarea 
                  value={uploadText}
                  onChange={e => setUploadText(e.target.value)}
                  placeholder="Enter broadcast details..."
                  className="w-full bg-white border-2 border-black p-3 font-sans text-[13px] text-black focus:outline-none focus:ring-2 focus:ring-black/20 min-h-[100px] resize-none"
                ></textarea>
              </div>
            </div>

            <div className="p-3 border-t-2 border-black flex justify-end gap-2 bg-gray-50">
              <button onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 border border-black bg-white text-black font-sans text-[11px] font-bold uppercase hover:bg-gray-100 transition-colors">Cancel</button>
              <button 
                onClick={handlePublish}
                disabled={isSubmitting}
                className="px-6 py-2 bg-black text-white border border-black font-sans text-[11px] font-bold uppercase hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? <span className="material-symbols-outlined animate-spin text-[14px]">sync</span> : <span className="material-symbols-outlined text-[14px]">cell_tower</span>}
                {isSubmitting ? 'Transmitting...' : 'Broadcast'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
