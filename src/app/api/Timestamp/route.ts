import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { value, timestamp } = await req.json();
  const cookieStore = await cookies();

  // store validity
  cookieStore.set("needs-preload", value ? "true" : "false", {
    path: "/",
    httpOnly: true,
  });

  // always store the provided timestamp (prevents drift)
  cookieStore.set("messages-cache-timestamp", String(timestamp), {
    path: "/",
    httpOnly: true,
  });

  return NextResponse.json({ ok: true });
}
