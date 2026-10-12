import { ResponsiveShell } from "@/components/sketchbot/ResponsiveShell";
import SketchbotSilencedModeration from "@/features/sketchbot_ui_ports/sketchbot_silenced_moderation";

export default function SilencedPage() {
  return (
    <ResponsiveShell activeRoute="settings">
      <SketchbotSilencedModeration />
    </ResponsiveShell>
  );
}
