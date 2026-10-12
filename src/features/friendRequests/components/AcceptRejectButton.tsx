import React , { useState }  from 'react'
import { Check, X } from "lucide-react";
import { useThemeStore } from '@/lib/utils/theme';
import { acceptFriendRequest, declineFriendRequest } from '@/features/friendRequests/api/client';
import { useRouter, useSearchParams } from "next/navigation";


type Props = {
    receiver_id: string,
    sender_id: string,
    reciever_name: string,
    sender_name:string
};

const Accept_or_Reject_button = ({receiver_id , sender_id , reciever_name , sender_name}:Props) => {

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
      <div style={{ display: "flex", gap: "12px" }}>
          <button
              disabled={sending}
                            style={{
                              padding: "12px 24px",
                              backgroundColor: isDark ? "#ffffff" : "#000000",
                              color: isDark ? "#000000" : "#ffffff",
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
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = isDark ? "#e6e6e6" : "#333333";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = isDark ? "#ffffff" : "#000000";
              }}
              onClick={() => {setSending(true); acceptFriendRequest(receiver_id, sender_id, reciever_name, sender_name);   updateView('Friends')}}
                          >
                            <Check className="w-4 h-4" />
                            Accept
                          </button>
          <button
              disabled={sending}
                            style={{
                              padding: "12px 24px",
                              backgroundColor: isDark ? "#333333" : "#dddddd",
                              color: isDark ? "#ffffff" : "#000000",
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
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = isDark ? "#444444" : "#cccccc";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = isDark ? "#333333" : "#dddddd";
              }}
              onClick={() => {setSending(true); declineFriendRequest(receiver_id,sender_id);   updateView('Friends')}}
                          >
                            <X className="w-4 h-4" />
                            Decline
                          </button>
    </div>
  )
}

export default Accept_or_Reject_button
