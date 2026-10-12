import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/auth/server";

export default async function Redirect() {
  const user = await getServerUser();
  if (user) {
    redirect("/dashboard");
  }
  return null;
}
