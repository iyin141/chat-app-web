"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ProfileTab from "./Profile_tab";
import NotificationsTab from "./Navigation";
import PrivacyTab from "./Privacy_tab";
import AppearanceTab from "./Appearance_tab";
import LanguageTab from "./Language_tab";
import HelpTab from "./Help_tab";

type SettingsProps = {
  
  username: string;
  email: string;
joindate: string;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (!dateString || Number.isNaN(date.getTime())) return "—";

  const options: Intl.DateTimeFormatOptions = { 
    day: "numeric", 
    month: "long", 
    year: "numeric" 
  };

  return date.toLocaleDateString("en-US", options);
}

const Settings = ({ username, email, joindate }: SettingsProps) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isMobile, setIsMobile] = useState(false);

  const formattedDate = formatDate(joindate);
  const [profile, setProfile] = useState({
    
    username: username,
    email: email,
    joinDate: formattedDate,
  });

  const [notifications, setNotifications] = useState({
    messages: true,
    calls: true,
    groupUpdates: false,
    statusUpdates: true,
  });

  // Detect screen size to switch between 30/70 and 10/90
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      {/* Sidebar — dynamic width */}
      <div
        style={{
          width: isMobile ? "10%" : "30%",
          minWidth: isMobile ? "64px" : "300px",
          transition: "width 0.3s ease-in-out",
          overflow: "hidden",
        }}
      >
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <div
        style={{
          width: isMobile ? "90%" : "70%",
          transition: "width 0.3s ease-in-out",
          overflowY: "auto",
          height: "100vh",
          padding: isMobile ? "20px" : "40px",
          boxSizing: "border-box",
        }}
      >
        {activeTab === "profile" && (
          <ProfileTab profile={profile} setProfile={setProfile} />
        )}
        {activeTab === "notifications" && (
          <NotificationsTab
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}
        {activeTab === "privacy" && <PrivacyTab />}
        {activeTab === "appearance" && <AppearanceTab />}
        {activeTab === "language" && <LanguageTab />}
        {activeTab === "help" && <HelpTab />}
      </div>
    </div>
  );
};

export default Settings;
