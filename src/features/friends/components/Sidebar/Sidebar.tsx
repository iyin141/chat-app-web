import { getServerUser } from "@/lib/auth/server";
import { getFriends } from "@/features/friends/api/server";
import type { Friend } from "@/features/friends/api/types";
import Display from './Display'
import { redirect } from "next/navigation";

const Sidebar = async () => {
  const user = await getServerUser();

  if (!user) {
    redirect("/auth/login");
  }

  let friends: Friend[];
  try {
    friends = await getFriends();
  } catch (userError) {
    console.error("Error fetching friends:", userError);
    return <div>Failed to load users.</div>;
  }

  return (
    <>
      <Display users={friends} />
    </>
  )
}

export default Sidebar
