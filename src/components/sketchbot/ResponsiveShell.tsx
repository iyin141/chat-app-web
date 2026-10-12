import { ReactNode } from "react";
import { Toaster } from "sonner";
import MessageListener from "@/features/messaging/components/MessageListener";
import { DesktopShell } from "./DesktopShell";
import { MobileShell } from "./MobileShell";

export function ResponsiveShell({ children, activeRoute = "chats" }: { children: ReactNode, activeRoute?: string }) {
  return (
    <>
      <MessageListener />
      <Toaster theme="light" position="bottom-right" />
      <div className="hidden md:block h-full">
        <DesktopShell activeRoute={activeRoute}>
          {children}
        </DesktopShell>
      </div>
      <div className="block md:hidden h-full">
        <MobileShell activeRoute={activeRoute}>
          {children}
        </MobileShell>
      </div>
    </>
  );
}
