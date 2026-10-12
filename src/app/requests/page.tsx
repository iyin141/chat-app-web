import { ResponsiveShell } from "@/components/sketchbot/ResponsiveShell";
import SketchbotFriendsRequests from "@/features/sketchbot_ui_ports/sketchbot_friends_requests";

export default function RequestsPage() {
  return (
    <ResponsiveShell activeRoute="requests">
      <SketchbotFriendsRequests />
    </ResponsiveShell>
  );
}
