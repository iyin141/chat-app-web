import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { TOKEN_COOKIE, USER_COOKIE } from "@/lib/api/config";
import { isTokenValid } from "@/lib/auth/jwt";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value ?? null;
  const userJson = cookieStore.get(USER_COOKIE)?.value ?? null;

  const valid = isTokenValid(token);

  let user = null;
  if (valid && userJson) {
    try {
      user = JSON.parse(userJson);
    } catch {
      // ignore
    }
  }

  // The token is only exposed to the browser so SignalR / REST calls can authenticate.
  // Expired tokens are never returned.
  return NextResponse.json(
    {
      token: valid ? token : null,
      user,
      authenticated: valid,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
