'use client'
import React, { useState } from 'react'
import Sent from './Sent';
import Received from './Recieved';
import Top from '@/features/friends/components/AddFriends/Top';
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { useThemeStore } from '@/components/Theme';
import { Inter } from 'next/font/google';
import Filter from '@/features/friends/components/AddFriends/Search';




const font = Inter({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});

type JoinProps = {
  result_1: User[];
  result_2: User[];
};


export  type User = {
  id:string
  created_at: string
  sender_id: string;
  reciever_id: string;
  status: string;
  sender_name: string
  reciever_name: string

};

const Join = ({ result_1, result_2 }: JoinProps) => { 
  const [toggle_2, settoggle_2] = useState(false)
     const { isDark } = useThemeStore();
  return (
      <div className={`${font.className} flex flex-col h-screen`}
      style={{
        backgroundColor: isDark ? "#000000" : "#f9f9f9",
        color: isDark ? "#ffffff" : "#000000",
        transition: "all 0.3s ease",
      }}>
      <div className=''>
        <Top />
        </div>
       <div
        className="flex-1 overflow-y-auto pt-5 pl-10 pr-10 flex flex-col hide-scrollbar"
      >
        <Filter placeholder="Search users" type={1} />
        <div className="pl-1 flex flex-col">
          <div className="flex items-center gap-2">
  <h2
    style={{
      fontSize: "18px",
      fontWeight: 600,
      color: isDark ? "#808080" : "#444444",
      margin: 0, // ❗ Remove margin-bottom
      lineHeight: "1", // keeps text centered vertically
    }}
  >
    {toggle_2 ? "Requests sent" : "Requests received"} (
    {toggle_2 ? result_1.length : result_2.length})
  </h2>

  <div
    onClick={() => settoggle_2(!toggle_2)}
    className="flex items-center justify-center border border-[#606b71] p-[6px] px-1 rounded-[5px] text-white cursor-pointer"
  >
    <ArrowUpIcon className="w-3 h-3" />
    <ArrowDownIcon className="w-3 h-3" />
  </div>
</div>
 <div>
          <div className={`${toggle_2 ? 'w-[100%]' : 'hidden'}`}><Sent users={result_1} /></div>
          <div className={`${toggle_2 ? 'hidden' : 'w-[100%]'}`}><Received users={result_2} /></div>
        </div>

        </div>
        </div>
      
    </div>
  )
}

export default Join
