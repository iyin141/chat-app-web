"use client"
import { Dispatch, SetStateAction } from "react";

type NotificationState = {
  messages: boolean;
  calls: boolean;
  groupUpdates: boolean;
  statusUpdates: boolean;
};

const NotificationsTab = ({
  notifications,
  setNotifications,
}: {
  notifications: NotificationState;
  setNotifications: Dispatch<SetStateAction<NotificationState>>;
}) => {
  return (
    <div>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>Notifications</h2>
      <p style={{ fontSize: "15px", color: "#808080", marginBottom: "32px" }}>
        Manage how you receive notifications
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {Object.entries(notifications).map(([key, value]) => (
          <div
            key={key}
            style={{
              padding: "20px",
              backgroundColor: "#1a1a1a",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #333333",
            }}
          >
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0, marginBottom: "4px" }}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
              </h3>
              <p style={{ fontSize: "14px", color: "#808080", margin: 0 }}>
                Receive notifications for {key.replace(/([A-Z])/g, " $1").toLowerCase()}
              </p>
            </div>

            <button
              onClick={() =>
                setNotifications((prev) => ({ ...prev, [key]: !value }))
              }
              style={{
                width: "52px",
                height: "28px",
                backgroundColor: value ? "#00ff00" : "#333333",
                borderRadius: "14px",
                border: "none",
                cursor: "pointer",
                position: "relative",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#ffffff",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "2px",
                  left: value ? "26px" : "2px",
                  transition: "all 0.2s",
                }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsTab;
