import { CacheBootstrapper } from "./components/Preload/Swrpersist";
import { ResponsiveShell } from "@/components/sketchbot/ResponsiveShell";
import { getServerUser } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getServerUser();
  if (!currentUser) {
    redirect("/auth/login");
  }

  return (
    <>
      <CacheBootstrapper />
      <ResponsiveShell activeRoute="chats">
        {children}
      </ResponsiveShell>
    </>
  );
}
