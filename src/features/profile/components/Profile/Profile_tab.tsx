"use client"
import { Camera, Mail,  Calendar } from "lucide-react";

const ProfileTab = ({
  profile,
  setProfile,
}: {
  profile: {
 
    username: string;
    email: string;
    joinDate: string;
  };
  setProfile: (p: typeof profile) => void;
  }) => {
  


  return (
    <div>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "32px" }}>Profile & Account</h2>

      {/* Profile Picture */}
      <div style={{ marginBottom: "40px" }}>
        <label style={{ fontSize: "14px", color: "#808080", marginBottom: "12px", display: "block" }}>Profile Picture</label>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#333333",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              A
            </div>
            <button
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "36px",
                height: "36px",
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                border: "3px solid #000000",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Camera className="w-4 h-4" style={{ color: "#000000" }} />
            </button>
          </div>
          <div>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                marginRight: "12px",
              }}
            >
              Upload Photo
            </button>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "transparent",
                color: "#ff4444",
                border: "1px solid #ff4444",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Profile Fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        

        <div>
          <label style={{ fontSize: "14px", color: "#808080", marginBottom: "8px", display: "block" }}>Username</label>
          <input
            type="text"
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            style={{
              width: "100%",
              padding: "14px 16px",
              backgroundColor: "#1a1a1a",
              border: "1px solid #333333",
              borderRadius: "12px",
              color: "#ffffff",
              outline: "none",
              fontSize: "15px",
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: "14px", color: "#808080", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Mail className="w-4 h-4" />
            Email Address
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            style={{
              width: "100%",
              padding: "14px 16px",
              backgroundColor: "#1a1a1a",
              border: "1px solid #333333",
              borderRadius: "12px",
              color: "#ffffff",
              outline: "none",
              fontSize: "15px",
            }}
          />
        </div>

        
        

        <div
          style={{
            padding: "16px",
            backgroundColor: "#1a1a1a",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "1px solid #333333",
          }}
        >
          <Calendar className="w-5 h-5" style={{ color: "#808080" }} />
          <div>
            <p style={{ margin: 0, fontSize: "14px", color: "#808080" }}>Member since</p>
            <p style={{ margin: 0, fontSize: "15px", fontWeight: "600" }}>{profile.joinDate}</p>
          </div>
        </div>

        <button
          style={{
            padding: "14px 32px",
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "15px",
            marginTop: "16px",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileTab;
