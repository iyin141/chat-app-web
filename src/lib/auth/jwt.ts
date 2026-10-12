/**
 * Minimal, dependency-free JWT payload decoding (no signature verification).
 * Signature verification is the backend's job. This is used only to detect
 * missing/expired tokens early so the UI can send the user to /auth/login
 * instead of showing a "logged in" shell whose every request fails with 401.
 * Works in the Edge runtime (middleware), Node and the browser.
 */
export type JwtPayload = { sub?: string; exp?: number; [key: string]: unknown };

export function decodeJwt(token: string | null | undefined): JwtPayload | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const json = atob(padded);
    const utf8 = decodeURIComponent(
      Array.from(json)
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(utf8) as JwtPayload;
  } catch {
    return null;
  }
}

/** True when the token is well-formed and not expired (30s clock-skew allowance). */
export function isTokenValid(token: string | null | undefined): boolean {
  const payload = decodeJwt(token);
  if (!payload) return false;
  if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now() - 30_000) return false;
  return true;
}
