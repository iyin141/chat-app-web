import { MobileShell } from "@/components/sketchbot/MobileShell";
import SketchbotMobileChatView from "@/features/sketchbot_ui_ports/sketchbot_mobile_chat_view";

export default function MobileChatPage() {
  return (
    <MobileShell activeRoute="chats">
      <div className="w-full h-full flex flex-col relative bg-surface-container-low">
        <SketchbotMobileChatView />
      </div>
    </MobileShell>
  );
}
