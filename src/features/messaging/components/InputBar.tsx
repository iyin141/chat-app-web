"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendMessage } from "@/features/messaging/api/client";
import { useAuthStore } from "@/components/Value";
import { generateTempId } from "@/components/functions";
import { useCacheStore } from "@/features/messaging/store/messageStore";

type FormValues = {
  message: string;
};

type Prop = {
  convo_id: string;
  friend_id: string;
  sender_id: string;
};

const Input_bar = ({ convo_id, friend_id, sender_id }: Prop) => {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      message: "",
    },
  });

  const [allow, setallow] = useState(true);
  const status = useAuthStore((s) => s.setstatus);
  const addMessageToCache = useCacheStore((s) => s.addMessage);

  const onSubmit = async (data: FormValues) => {
    if (!data.message.trim()) return;
    reset();
    setallow(false);
    const temp_id = await generateTempId();
    addMessageToCache("/api/messages?convoId=" + convo_id, { sender_id, receiver_id: friend_id, content: data.message, seen: false, Temp_id: temp_id });

    const result = await sendMessage(convo_id, friend_id, sender_id, data.message, temp_id);
    if (result.success) {
      setallow(true);
    } else {
      status("Error sending message");
      setallow(true);
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 px-margin-mobile pb-space-sm pt-2 bg-gradient-to-t from-surface via-surface/95 to-transparent">
      {/* Blueprint Annotation Handcrafted Whisper */}
      <div className="flex items-center justify-between px-2 mb-1 pointer-events-none">
        <div className="flex items-center gap-1 text-primary-fixed-dim font-annotation text-[11px] opacity-75">
          <span>say hi →</span>
        </div>
        <div className="font-label-sm text-[9px] text-outline tracking-widest uppercase">
          HUD_COORD // 390x844
        </div>
      </div>
      
      {/* Active Input Pill Capsule */}
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="relative w-full rounded-full bg-surface-container-high/95 p-1.5 shadow-xl backdrop-blur-xl flex items-center gap-1.5" 
        data-testid="chat-input"
      >
        {/* L-Bracket Blueprint Corner Accents on Card Reticles */}
        <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-primary-container/60 rounded-tl pointer-events-none"></span>
        <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-primary-container/60 rounded-tr pointer-events-none"></span>
        <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-primary-container/60 rounded-bl pointer-events-none"></span>
        <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-primary-container/60 rounded-br pointer-events-none"></span>
        
        <button type="button" aria-label="Add blueprint attachment" className="w-9 h-9 rounded-full bg-surface-container-highest/60 flex items-center justify-center text-outline hover:text-primary transition-colors shrink-0">
          <span className="material-symbols-outlined text-[19px]">attach_file</span>
        </button>
        <button type="button" aria-label="Insert snippet" className="w-9 h-9 rounded-full bg-surface-container-highest/60 flex items-center justify-center text-outline hover:text-primary transition-colors shrink-0">
          <span className="material-symbols-outlined text-[18px]">code</span>
        </button>
        
        <input
          {...register("message")}
          className="flex-1 min-w-0 bg-transparent text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none px-2 py-1"
          placeholder="Type a message..."
          autoComplete="off"
        />
        
        <button
          type="submit"
          disabled={!allow}
          aria-label="Send message"
          className="w-10 h-10 rounded-full bg-on-surface text-surface flex items-center justify-center shadow-md active:scale-95 hover:bg-primary transition-all shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="chat-send"
        >
          <span className="material-symbols-outlined text-[20px] font-bold">arrow_upward</span>
        </button>
      </form>
    </div>
  );
};

export default Input_bar;
