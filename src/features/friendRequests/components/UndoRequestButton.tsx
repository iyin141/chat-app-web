import React, { useState } from 'react'
import { useThemeStore } from '@/lib/utils/theme';
import { cancelFriendRequest } from '@/features/friendRequests/api/client';
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
    receiver_id: string,
    sender_id: string,
    
};

const Undo_request_button = ({ receiver_id, sender_id }: Props) => {
    
    const [sending, setSending] = useState(false);
        const { isDark } = useThemeStore();
        
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
              disabled={sending} onClick={() => { setSending(true); cancelFriendRequest(receiver_id, sender_id); updateView('Friends');   }}
                    >
                      <div className='flex gap-4 items-center font-medium'>
                        undo
                      </div>
                    </button>
    </div>
  )
}

export default Undo_request_button
