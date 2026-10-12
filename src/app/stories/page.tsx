import { Suspense } from 'react';
import { ResponsiveShell } from "@/components/sketchbot/ResponsiveShell";
import SketchbotStoriesSuite from "@/features/sketchbot_ui_ports/sketchbot_stories_suite";

export default function StoriesPage() {
  return (
    <ResponsiveShell activeRoute="stories">
      <Suspense fallback={<div>Loading...</div>}>
      <SketchbotStoriesSuite />
          </Suspense>
    </ResponsiveShell>
  );
}

