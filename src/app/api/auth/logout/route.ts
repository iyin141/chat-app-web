import { NextResponse } from "next/server";
import { API_BASE_URL, TOKEN_COOKIE, USER_COOKIE } from "@/lib/api/config";

const SELECTION_COOKIES = ["selectedFriendId", "selectedFriendName", "selectedConvoId", "selectedSenderId"];

export async function POST(req: Request) {
  // Try to notify backend to revoke the token
  try {
    const cookieHeader = req.headers.get("cookie") ?? "";
    const tokenMatch = cookieHeader.match(new RegExp(`(?:^|;\\s*)${TOKEN_COOKIE}=([^;]+)`));
    const token = tokenMatch ? tokenMatch[1] : null;

    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        cache: "no-store",
      }).catch(() => {});
    }
  } catch {
    // Ignore backend failure so cookies are cleared regardless
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.delete(TOKEN_COOKIE);
  response.cookies.delete(USER_COOKIE);
  // Per-user chat selection must not leak into the next session on this browser.
  SELECTION_COOKIES.forEach((name) => response.cookies.delete(name));
  return response;
}
