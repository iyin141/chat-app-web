import { MessageSquare, Grid3x3, Phone, User } from "lucide-react";

const BottomNav = ({ isDark }: { isDark: boolean }) => {
  const buttons = [
    {
      label: "Message",
      icon: <MessageSquare className="w-5 h-5" />,
      active: true,
      badge: null,
    },
    {
      label: "Status",
      icon: <Grid3x3 className="w-5 h-5" />,
      active: false,
      badge: null,
    },
    {
      label: "Add",
      icon: <span className="text-2xl font-bold">+</span>,
      isCenter: true,
      badge: null,
    },
    {
      label: "Calls",
      icon: <Phone className="w-5 h-5" />,
      active: false,
      badge: "2",
    },
    {
      label: "Profile",
      icon: <User className="w-5 h-5" />,
      active: false,
      badge: null,
    },
  ];

  return (
    <div
      className="p-3 border-t"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(10px)",
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb",
      }}
    >
      <div className="flex items-center justify-around">
        {buttons.map((btn, i) =>
          btn.isCenter ? (
            <button
              key={i}
              className="w-14 h-14 rounded-full -mt-8 hover:scale-110 transition-all border flex items-center justify-center"
              style={{
                backgroundColor: "#fff",
                color: "#000",
                borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb",
                backdropFilter: "blur(10px)",
              }}
            >
              {btn.icon}
            </button>
          ) : (
            <button
              key={i}
              className="flex flex-col items-center py-2 gap-1 hover:scale-105 transition-all relative"
              style={{
                color: btn.active
                  ? isDark
                    ? "#fff"
                    : "#000"
                  : isDark
                  ? "#9ca3af"
                  : "#6b7280",
              }}
            >
              {btn.icon}
              <span className="text-xs">{btn.label}</span>
              {btn.badge && (
                <div
                  className="absolute -top-1 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] animate-pulse"
                  style={{
                    backgroundColor: "rgb(239,68,68)",
                    color: "#fff",
                  }}
                >
                  {btn.badge}
                </div>
              )}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default BottomNav;
