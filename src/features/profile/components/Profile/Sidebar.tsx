"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Menu,
  X,
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
} from "lucide-react";

const Sidebar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

 useEffect(() => {
  const mq = window.matchMedia("(max-width: 768px)");
  const handle = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);

  handle(mq);

  if (mq.addEventListener) {
    mq.addEventListener("change", handle);
  } else {
    mq.addListener(handle);
  }

  return () => {
    if (mq.removeEventListener) {
      mq.removeEventListener("change", handle);
    } else {
      mq.removeListener(handle);
    }
  };
}, []);


  const settingsSections = [
    { id: "profile", icon: User, label: "Profile & Account" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "privacy", icon: Lock, label: "Privacy & Security" },
    { id: "appearance", icon: Palette, label: "Appearance" },
    { id: "language", icon: Globe, label: "Language & Region" },
    { id: "help", icon: HelpCircle, label: "Help & Support" },
  ];

  // Desktop full sidebar style
  const desktopSidebarStyle: React.CSSProperties = {
    width: "320px",
    backgroundColor: "#000000",
    borderRight: "1px solid #1a1a1a",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "relative",
  };

  // Narrow left bar shown on mobile (icons only)
  const iconBarStyle: React.CSSProperties = {
    position: "fixed",
    left: 0,
    top: 0,
    height: "100vh",
    width: "64px", // narrow icon-only bar
    backgroundColor: "#000000",
    borderRight: "1px solid #1a1a1a",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "16px",
    gap: "8px",
    zIndex: 1000,
  };

  // Full overlay sidebar that slides in from left on mobile
  const overlaySidebarStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "260px",
    maxWidth: "80vw",
    backgroundColor: "#000000",
    borderRight: "1px solid #1a1a1a",
    display: "flex",
    flexDirection: "column",
    zIndex: 1100,
    // slide in/out using transform for smoother animation
    transform: open ? "translateX(0)" : "translateX(-110%)",
    transition: "transform 280ms cubic-bezier(.2,.8,.2,1)",
    boxShadow: open ? "rgba(0,0,0,0.5) 6px 0px 20px" : "none",
  };

  // Overlay background (click to close)
  const overlayBgStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    zIndex: 1050,
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none",
    transition: "opacity 240ms ease",
  };

  // helper to render menu items (shared between desktop & overlay)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderMenuItem = (section: { id: string; icon: any; label: string }, compact = false) => {
    const Icon = section.icon;
    const isActive = activeTab === section.id;
    const baseBtn: React.CSSProperties = {
      width: compact ? "56px" : "100%",
      padding: compact ? "12px 0" : "16px 20px",
      backgroundColor: isActive ? "#1a1a1a" : "transparent",
      border: "none",
      borderRadius: "12px",
      color: "#ffffff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: compact ? "0" : "12px",
      justifyContent: compact ? "center" : "flex-start",
      marginBottom: "8px",
      transition: "background-color 160ms ease",
    };

    const iconStyle: React.CSSProperties = {
      color: isActive ? "#ffffff" : "#808080",
      width: "20px",
      height: "20px",
      flexShrink: 0,
    };

    const labelStyle: React.CSSProperties = {
      fontSize: "15px",
      fontWeight: isActive ? 600 : 400,
      color: "#ffffff",
    };

    return (
      <button
        key={section.id}
        onClick={() => {
          setActiveTab(section.id);
          if (isMobile) setOpen(false);
        }}
        style={baseBtn}
        onMouseEnter={(e) => {
          if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "#0f0f0f";
        }}
        onMouseLeave={(e) => {
          if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
        }}
      >
        <Icon style={iconStyle} />
        {!compact && <span style={labelStyle}>{section.label}</span>}
      </button>
    );
  };

  return (
    <>
      {/* Desktop: full sidebar (hidden on mobile) */}
      {!isMobile && (
        <div style={desktopSidebarStyle}>
          <div style={{ padding: "24px", borderBottom: "1px solid #1a1a1a" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "16px", textDecoration: "none", color: "#ffffff", marginBottom: "20px" }}>
              <ArrowLeft style={{ width: 24, height: 24 }} />
              <h1 style={{ fontSize: 24, fontWeight: "bold", margin: 0 }}>Settings</h1>
            </Link>
          </div>

          <div style={{ flex: 1, padding: "16px" }}>
            {settingsSections.map((section) => renderMenuItem(section, false))}
          </div>

          <div style={{ padding: "16px", borderTop: "1px solid #1a1a1a" }}>
            <button
              style={{
                width: "100%",
                padding: "16px 20px",
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "12px",
                color: "#ff4444",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "15px",
                fontWeight: 600,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <LogOut style={{ width: 20, height: 20 }} />
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Mobile: narrow left icon bar (always visible on mobile) */}
      {isMobile && (
        <div style={iconBarStyle}>
          {/* menu toggle at top */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#ffffff",
            }}
          >
            <Menu style={{ width: 20, height: 20 }} />
          </button>

          {/* icons list */}
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            {settingsSections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveTab(s.id);
                  setOpen(false);
                }}
                title={s.label}
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: activeTab === s.id ? "#1a1a1a" : "transparent",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  color: activeTab === s.id ? "#ffffff" : "#808080",
                }}
              >
                <s.icon style={{ width: 18, height: 18 }} />
              </button>
            ))}
          </div>

          {/* spacer */}
          <div style={{ flex: 1 }} />

          {/* logout icon at bottom */}
          <div style={{ paddingBottom: 12 }}>
            <button
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                color: "#ff4444",
              }}
              onClick={() => {
                /* keep same behavior — implement logout elsewhere */
              }}
              title="Log Out"
            >
              <LogOut style={{ width: 18, height: 18 }} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile overlay background (click to close) */}
      {isMobile && <div style={overlayBgStyle} onClick={() => setOpen(false)} />}

      {/* Mobile overlay sliding sidebar */}
      {isMobile && (
        <div style={overlaySidebarStyle} role="dialog" aria-hidden={!open}>
          <div style={{ padding: "20px 16px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: "#ffffff" }}>
              <ArrowLeft style={{ width: 20, height: 20 }} />
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Settings</h2>
            </Link>
            <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ffffff" }}>
              <X style={{ width: 20, height: 20 }} />
            </button>
          </div>

          <div style={{ padding: "16px", flex: 1, overflowY: "auto" }}>
            {settingsSections.map((section) => renderMenuItem(section, false))}
          </div>

          <div style={{ padding: "16px", borderTop: "1px solid #1a1a1a" }}>
            <button
              style={{
                width: "100%",
                padding: "12px 14px",
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "12px",
                color: "#ff4444",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              <LogOut style={{ width: 18, height: 18 }} />
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
