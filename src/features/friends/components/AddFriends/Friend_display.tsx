'use client'
import { Inter } from 'next/font/google';
import React from 'react'
import { useAuthStore } from '@/components/Value';

import Pages from '@/components/Pages';
import Top from './Top';
import { useThemeStore } from '@/components/Theme';
import Filter from './Search';
import { calctime } from '@/components/functions';
import Add_button_Friends from '@/components/Add_button_Friends';




type User = {
  User_name: string;
  uid: string;
  created_at: string;
};

type Props = {
  users: User[];
  currentUsername: string;
};

const font = Inter({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
});

const Friend_dsiplay = ({ users, currentUsername }: Props) => {
  const { isDark } = useThemeStore();
  const min = useAuthStore((s) => s.min);
  const max = useAuthStore((s) => s.max);
  const search = useAuthStore((s) => s.search);
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");


  return (
    <div
      className={`${font.className} flex flex-col h-screen`}
      style={{
        backgroundColor: isDark ? "#000000" : "#f9f9f9",
        color: isDark ? "#ffffff" : "#000000",
        transition: "all 0.3s ease",
      }}
    >
      {/* Fixed top section */}
      <div className="flex-shrink-0">
        <Top />
      </div>

      {/* Scrollable section */}
      <div
        className="flex-1 overflow-y-auto pt-5 pl-10 pr-10 flex flex-col hide-scrollbar"
      >
        <Filter placeholder="Search users" type={1} />
        <div className="pl-1 flex flex-col">
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "20px",
              color: isDark ? "#808080" : "#444444",
            }}
          >
            Suggested Friends ({users.length})
          </h2>

          <Pages length={users.length} page_length={10}>
            {users
              .filter((u, index) => {
                const name = clean(String(u.User_name));
                
                const match = [...name].some((char) =>
                  clean(search).includes(char)
                );
                const inRange = index >= min && index < max;
                if (search === "") return inRange;
                return match;
              })
              .map((u) => {
                  const time = calctime(u.created_at)
               return (
                 <div
  key={u.uid}
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
  className="mt-5 flex-col xl:flex-row gap-4"
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = isDark ? "#222222" : "#f1f1f1";
    e.currentTarget.style.borderColor = isDark ? "#444444" : "#d0d0d0";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = isDark ? "#1a1a1a" : "#ffffff";
    e.currentTarget.style.borderColor = isDark ? "#333333" : "#e5e5e5";
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "16px",
      flex: 1,
    }}
    className="w-full"
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
        {u.User_name[0]}
      </div>
    </div>
    <div style={{ flex: 1 }}>
      <h3
        style={{
          fontSize: "16px",
          fontWeight: "600",
          margin: 0,
          marginBottom: "4px",
        }}
      >
        {u.User_name}
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: isDark ? "#808080" : "#555",
          margin: 0,
          marginBottom: "4px",
        }}
      >
        <span>Joined: </span>
        {time === 0 ? "Today" : time}
        <span className={`${time === 0 ? "hidden" : ""}`}> Days ago</span>
      </p>
      <p
        style={{
          fontSize: "13px",
          color: isDark ? "#606060" : "#777",
          margin: 0,
        }}
      >
        8 mutual friends
      </p>
    </div>
  </div>

  {/* This will move below text on xl and smaller */}
  <div className="w-full xl:w-auto">
    <Add_button_Friends
      uid={u.uid}
      currentusername={currentUsername}
      friendusername={u.User_name}
    />
  </div>
</div>

                )
              })}
          </Pages>
        </div>
      </div>

      {/* Scrollbar hiding styles */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default Friend_dsiplay;
