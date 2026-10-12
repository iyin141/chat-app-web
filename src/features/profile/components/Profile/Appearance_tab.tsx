"use client"

const AppearanceTab = () => {
  return (
    <div>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>Appearance</h2>
      <p style={{ fontSize: "15px", color: "#808080", marginBottom: "32px" }}>Customize how the app looks</p>

      <div
        style={{
          padding: "24px",
          backgroundColor: "#1a1a1a",
          borderRadius: "12px",
          border: "1px solid #333333",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px" }}>Theme</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#000000",
              border: "2px solid #ffffff",
              borderRadius: "12px",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "15px", fontWeight: "600", marginBottom: "8px" }}>Dark</div>
            <div style={{ fontSize: "13px", color: "#808080" }}>Current theme</div>
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#ffffff",
              border: "2px solid #333333",
              borderRadius: "12px",
              cursor: "pointer",
              textAlign: "center",
              color: "#000000",
            }}
          >
            <div style={{ fontSize: "15px", fontWeight: "600", marginBottom: "8px" }}>Light</div>
            <div style={{ fontSize: "13px", color: "#666666" }}>Coming soon</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
