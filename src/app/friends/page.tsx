import { Suspense } from 'react';
import { ResponsiveShell } from "@/components/sketchbot/ResponsiveShell";
import SketchbotFriendsRequests from "@/features/sketchbot_ui_ports/sketchbot_friends_requests";

export default function FriendsPage() {
  return (
    <ResponsiveShell activeRoute="friends">
      <Suspense fallback={<div>Loading...</div>}>
      <SketchbotFriendsRequests />
          </Suspense>
    </ResponsiveShell>
  );
}

