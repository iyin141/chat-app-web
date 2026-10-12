import { Suspense } from 'react';
import { ResponsiveShell } from "@/components/sketchbot/ResponsiveShell";
import SketchbotGroupWorkspace from "@/features/sketchbot_ui_ports/sketchbot_group_workspace";

export default function GroupsPage() {
  return (
    <ResponsiveShell activeRoute="groups">
      <Suspense fallback={<div>Loading...</div>}>
      <SketchbotGroupWorkspace />
          </Suspense>
    </ResponsiveShell>
  );
}

