import { cookies } from "next/headers";
import { TOKEN_COOKIE, USER_COOKIE } from "@/lib/api/config";
import { decodeJwt, isTokenValid } from "@/lib/auth/jwt";

export interface ServerUser {
  id: string;
  email: string;
  displayName: string;
  createdAt?: string;
}

/**
 * Resolves the signed-in user from the httpOnly JWT cookie.
 * The JWT is the source of truth (id and expiry). The `chatapp_user` cookie only
 * supplies display fields. Returns null if the token is missing or expired.
 */
export async function getServerUser(): Promise<ServerUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;
  if (!isTokenValid(token)) return null;

  const payload = decodeJwt(token);
  if (!payload?.sub) return null;

  let profile: { email?: string; displayName?: string; username?: string; createdAt?: string } = {};
  const userJson = cookieStore.get(USER_COOKIE)?.value;
  if (userJson) {
    try {
      profile = JSON.parse(userJson);
    } catch {
      // ignore malformed cookie
    }
  }

  return {
    id: payload.sub,
    email: profile.email || (payload.email as string | undefined) || "",
    displayName: profile.displayName || profile.username || "",
    createdAt: profile.createdAt,
  };
}
