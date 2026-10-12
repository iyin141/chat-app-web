import { Suspense } from 'react';
import { ResponsiveShell } from "@/components/sketchbot/ResponsiveShell";
import SketchbotSettingsAppearance from "@/features/sketchbot_ui_ports/sketchbot_settings_appearance";

export default function SettingsPage() {
  return (
    <ResponsiveShell activeRoute="settings">
      <Suspense fallback={<div>Loading...</div>}>
      <SketchbotSettingsAppearance />
          </Suspense>
    </ResponsiveShell>
  );
}

