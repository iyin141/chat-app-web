import React from 'react'
import { ArrowLeft } from "lucide-react";
import { useThemeStore } from '@/components/Theme';
import Link from 'next/link';
import { useRouter, useSearchParams } from "next/navigation";





const Top = () => {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") || "Friends";
  const { isDark } = useThemeStore();
  const router = useRouter();
    
  
  const updateView = (view: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className=''>
      <div
        style={{
          padding: "24px 32px",
          borderBottom: `1px solid ${isDark ? "#1a1a1a" : "#e5e5e5"}`,
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link href='/dashboard' onClick={() => updateView('default')} style={{ background: "none", border: "none", cursor: "pointer", textDecoration: "none" }}>
              <ArrowLeft className="w-6 h-6" style={{ color: isDark ? "#fff" : "#000" }} />
            </Link>
            <h1 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
              {view}
            </h1>
          </div>
          
        </div>
          <div
          style={{
            maxWidth: "700px",
            margin: "24px auto 0",
            display: "flex",
            gap: "8px",
            padding: "3px",
            backgroundColor: isDark ? "#1a1a1a" : "#e5e5e5",
            borderRadius: "10px",
          }}
        >
          <button
            
            style={{
              flex: 1,
              padding: "8px 10px",
              backgroundColor: view === "Friends" ? (isDark ?  "#ffffff" :"#000000"  ) : "transparent",
              color: view === "Friends" ? (isDark ?   "#000000" : "#ffffff" ) : isDark ? "#808080" : "#666666",
              border: "none",
              borderRadius: "7px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              transition: "all 0.2s",
            }}
            onClick={() => updateView('Friends')}
          >
            Add Friends
          </button>
         
          <button
           
            style={{
              flex: 1,
              padding: "8px 10px",
              backgroundColor: view === "Requests" ? (isDark ?  "#ffffff" :"#000000"  ) : "transparent",
              color: view === "Requests" ? (isDark ?   "#000000" : "#ffffff" ) : isDark ? "#808080" : "#666666",
              border: "none",
              borderRadius: "7px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              transition: "all 0.2s",
            }}
             onClick={() => updateView('Requests')}
          >
            Requests
          </button>
        </div>
      </div>
    
      </div>
  )
}

export default Top
