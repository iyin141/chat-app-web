"use client"

const PrivacyTab = () => {
  return (
    <div>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>Privacy & Security</h2>
      <p style={{ fontSize: "15px", color: "#808080", marginBottom: "32px" }}>Control who can see your information</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            padding: "24px",
            backgroundColor: "#1a1a1a",
            borderRadius: "12px",
            border: "1px solid #333333",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Account Privacy</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
              <input type="radio" name="privacy" defaultChecked style={{ width: "18px", height: "18px" }} />
              <div>
                <div style={{ fontSize: "15px", fontWeight: "500" }}>Public</div>
                <div style={{ fontSize: "13px", color: "#808080" }}>Anyone can see your profile</div>
              </div>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
              <input type="radio" name="privacy" style={{ width: "18px", height: "18px" }} />
              <div>
                <div style={{ fontSize: "15px", fontWeight: "500" }}>Private</div>
                <div style={{ fontSize: "13px", color: "#808080" }}>Only friends can see your profile</div>
              </div>
            </label>
          </div>
        </div>

        <div
          style={{
            padding: "24px",
            backgroundColor: "#1a1a1a",
            borderRadius: "12px",
            border: "1px solid #333333",
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Security</h3>
          <button
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "transparent",
              border: "1px solid #333333",
              borderRadius: "8px",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "500",
              marginBottom: "12px",
            }}
          >
            Change Password
          </button>
          <button
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "transparent",
              border: "1px solid #333333",
              borderRadius: "8px",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            Enable Two-Factor Authentication
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyTab;
