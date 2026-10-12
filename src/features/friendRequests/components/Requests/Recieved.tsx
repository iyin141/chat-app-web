import Accept_or_Reject_button from '@/components/Accept_or_Reject_button';
import { calctime } from '@/components/functions';
import Pages from '@/components/Pages';
import { useThemeStore } from '@/components/Theme';
import { useAuthStore } from '@/components/Value';
import React from 'react'




export  type User = {
  id:string
  created_at: string
  sender_id: string;
  reciever_id: string;
  status: string;
  sender_name: string
  reciever_name: string

};




const Received = ({ users }: { users: User[] }) => {
 
  const min = useAuthStore((s) => s.min)
    const max = useAuthStore((s) => s.max)
    const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const search = useAuthStore((s) => s.search)
  const { isDark } = useThemeStore();
    
  return (
    <div>
      <Pages length={users.length} page_length={5}>
        {users
          .filter((u, index) => {
            const name = clean(String(u.reciever_name));
            const match = [...name].some(char => clean(search).includes(char));
            const inRange = index >= min && index < max;

            if (search === '') return inRange;
            return match;
          })
          .map((u) => {
            const name = u.sender_name
            
            const time = calctime(u.created_at)
          return (
             <div
                    key={u.id}
                    style={{
                      padding: "20px",
                      backgroundColor: isDark ? "#1a1a1a" : "#ffffff",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: `1px solid ${isDark ? "#333333" : "#e5e5e5"}`,
                      transition: "all 0.2s",
                    }}
                    className="mt-5"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark
                        ? "#222222"
                        : "#f1f1f1";
                      e.currentTarget.style.borderColor = isDark
                        ? "#444444"
                        : "#d0d0d0";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDark
                        ? "#1a1a1a"
                        : "#ffffff";
                      e.currentTarget.style.borderColor = isDark
                        ? "#333333"
                        : "#e5e5e5";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        flex: 1,
                      }}
                    >
                      <div style={{ position: "relative" }}>
                        <div
                          style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: isDark ? "#333333" : "#eeeeee",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: isDark ? "#fff" : "#000",
                          }}
                        >
                          {name[0]}
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0, marginBottom: "4px" }}>
                          {name}
                        </h3>
                        <p style={{ fontSize: "14px", color: isDark ? "#808080" : "#555", margin: 0, marginBottom: "4px" }}>
                          <span >Sent: </span>{time === 0 ? 'Today' : time} <span className={`${time === 0 ? 'hidden' : ''} `}>  Days ago</span>
                       </p>
                        <p style={{ fontSize: "13px", color: isDark ? "#606060" : "#777", margin: 0 }}>
                         8 mutual friends 
                        </p>
                     </div>
                     <div>
                       <Accept_or_Reject_button receiver_id={u.reciever_id} sender_id={u.sender_id} reciever_name={u.reciever_name} sender_name={u.sender_name} />
                     </div>
                    </div>
                  </div>
          )
        })}
      </Pages>
    </div>
  )
}

export default Received
