import { Suspense } from 'react';
import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth/server";
import SketchbotChatWorkspace from "@/features/sketchbot_ui_ports/sketchbot_chat_workspace";

export default async function DashboardPage() {
  const currentUser = await getServerUser();
  if (!currentUser) {
    redirect("/auth/login");
  }

  return (
    <SketchbotChatWorkspace />
  );
}

