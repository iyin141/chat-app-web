'use client'
import React, { useEffect, useRef } from 'react'
import type { Message } from './addreplies'
import { extractTimeAMPM } from '@/components/functions'
import { useAuthStore } from '@/components/Value'
import { useRouter, useSearchParams } from 'next/navigation'
import DropdownMenu from '@/features/messaging/components/MessageOptionsDropdown'

type Prop = {
  messages: Message[]
  friend_id: string
  extramessages: Message[]
  convo_id?: string
}

const Display = ({ messages, friend_id, extramessages, convo_id }: Prop) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const messagesRef = useRef<HTMLDivElement>(null)

  const setlimit = useAuthStore(s => s.setlimit)
  const limit = useAuthStore(s => s.limit)

  const updateView = (id: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('id', id.toString())
    router.push(`?${params.toString()}`)
  }

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, extramessages])

  useEffect(() => {
    if (extramessages.length > 0) {
      setlimit(extramessages[0].id || 0)
    } else if (messages.length > 0) {
      setlimit(messages[0].id || 0)
    }
  }, [extramessages, messages, setlimit])

  const handleScroll = () => {
    const el = messagesRef.current
    if (el && el.scrollTop === 0) {
      updateView(limit)
    }
  }

  const renderMessages = (list: Message[]) => {
    return list.map((msg) => {
      const time = extractTimeAMPM(msg.Temp_id);
      const sent = msg.sender_id !== friend_id;
      const type_delete = sent ? "Delete for all" : "Delete for reciever";
      
      let content = msg.content;
      if (msg.deleted) {
        if(msg.deleted === "Delete for all") {
          content = "This message was deleted";
        } else if(msg.deleted === "Delete for reciever" && !sent) {
          content = "You deleted this message";
        }
      }

      if (sent) {
        return (
          <div key={msg.Temp_id} className="flex flex-col items-end max-w-[85%] self-end" data-own="true" data-testid="message-item">
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="font-label-md text-label-md text-primary">You</span>
              <DropdownMenu id={msg.Temp_id} content={content} convo_id={convo_id || ''} isDark={true} type_delete={type_delete} />
            </div>
            <div className="relative bg-primary-container/15 text-on-surface px-4 py-3 rounded-[14px] rounded-tr-[4px] shadow-sm">
              <p className="font-body-md text-body-md leading-relaxed text-on-surface">{content}</p>
              <div className="flex items-center justify-end mt-1.5 gap-1.5" data-testid="message-seen">
                <span className="font-label-sm text-label-sm text-outline">{time}</span>
                <span className="font-label-sm text-label-sm text-primary-fixed-dim font-medium tracking-tight flex items-center gap-0.5">
                  {msg.seen ? 'Seen' : 'Sent'}
                  <span className="material-symbols-outlined text-[13px] text-primary-fixed-dim">
                    {msg.seen ? 'done_all' : 'check'}
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div key={msg.Temp_id} className="flex flex-col items-start max-w-[85%] self-start" data-own="false" data-testid="message-item">
            <div className="flex items-center gap-1.5 mb-1 px-1">
              <span className="font-headline-md text-body-sm font-semibold text-primary-container">Friend</span>
              <DropdownMenu id={msg.Temp_id} content={content} convo_id={convo_id || ''} isDark={true} type_delete={type_delete} />
            </div>
            <div className="relative bg-surface-container-high/90 text-on-surface px-4 py-3 rounded-[14px] rounded-tl-[4px] shadow-sm backdrop-blur-md">
              <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-primary-container/40 pointer-events-none"></span>
              <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-primary-container/40 pointer-events-none"></span>
              <p className="font-body-md text-body-md leading-relaxed text-on-surface">{content}</p>
              <div className="flex items-center justify-end mt-1.5 gap-1">
                <span className="font-label-sm text-label-sm text-outline">{time}</span>
              </div>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div
      ref={messagesRef}
      onScroll={handleScroll}
      className="flex-1 flex flex-col gap-space-md w-full h-full pb-8 pr-4"
      style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
    >
      {renderMessages(extramessages)}
      {renderMessages(messages)}
    </div>
  )
}

export default Display
