"use client";
import React, { useEffect, useState } from "react";
import Display from "./MessageList";
import { Message, orderMessages } from "./addreplies";
import { useCacheStore } from "@/features/messaging/store/messageStore";

type Prop = {
  tick: string;
  convo_id: string;
  friend_id: string;
  message: Message[];
};

const Join = ({ convo_id, friend_id, message }: Prop) => {
  const getMessages = useCacheStore((s) => s.getMessages);
  const data = useCacheStore((s) => s.data);

  const [msgs, setMsgs] = useState<Message[]>([]);

  useEffect(() => {
    const convoMsgs = getMessages("/api/messages?convoId=" + convo_id);
    setMsgs(convoMsgs);
    
  }, [data]);

  const sortedMessages = orderMessages(msgs || []);
  const extraSortedMessages = orderMessages(message || []);

  return (
    <div>
      <Display
        messages={sortedMessages}
        friend_id={friend_id}
        extramessages={extraSortedMessages}
        convo_id={convo_id}
      />
    </div>
  );
};

export default Join;
