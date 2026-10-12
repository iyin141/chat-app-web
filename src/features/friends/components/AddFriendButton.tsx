"use client"
import React, { useState } from 'react'
import { sendFriendRequest } from '@/features/friends/api/client';
import { useThemeStore } from '@/lib/utils/theme';
import { useRouter, useSearchParams } from "next/navigation";
import { UserPlus } from 'lucide-react';

type Props = {
    uid: string,
    currentusername: string,
    friendusername:string
};



const Add_button_Friends = ({ uid, currentusername, friendusername }: Props) => {
    const { isDark } = useThemeStore();
    const [sending, setSending] = useState(false);
    const searchParams = useSearchParams();
 const router = useRouter();

    const updateView = (view: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.push(`?${params.toString()}`);
  };

  return (
      <div>
           <button
                      style={{
                        padding: "12px 24px",
                        backgroundColor: 
                          isDark
                          ? "#ffffff"
                          : "#000000",
                        color: isDark
                          ? "#000000"
                          : "#ffffff",
                        border: "none",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "all 0.2s",
        }}
        className='max-xl:w-[100%]'
                      disabled={sending} onClick={() => {  setSending(true); sendFriendRequest(uid , currentusername , friendusername); updateView('Requests')   }}
                    >
                      <div className='flex gap-4 items-center font-medium'>
                        <UserPlus className="w-4 h-4" />
                          Add Friend
                      </div>
                    </button>
    </div>
  )
}

export default Add_button_Friends
