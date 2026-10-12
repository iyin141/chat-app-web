import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_BASE_URL, ApiError, TOKEN_COOKIE } from "@/lib/api/config";
import { decodeJwt, isTokenValid } from "@/lib/auth/jwt";

/** Returns the session token from the httpOnly cookie, or null if absent/expired. */
export async function getServerAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;
  return isTokenValid(token) ? (token as string) : null;
}

/** Current user id from the (validated) JWT `sub` claim. Redirects to login when unauthenticated. */
export async function getCurrentUserId(): Promise<string> {
  const token = await getServerAccessToken();
  const sub = decodeJwt(token)?.sub;
  if (!sub) redirect("/auth/login?expired=1");
  return sub;
}

export async function apiFetchServer<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await getServerAccessToken();
  if (!token) redirect("/auth/login?expired=1");

  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${token}`);

  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (response.status === 401) {
    // Token rejected by the API (revoked / secret rotated). Middleware clears the stale
    // cookie when the user lands on the login page.
    redirect("/auth/login?expired=1");
  }

  if (!response.ok) {
    let errorDetail = `Request failed with status ${response.status}`;
    try {
      const problem = await response.json();
      errorDetail = problem.detail || problem.title || errorDetail;
    } catch {
      // ignore
    }
    throw new ApiError(errorDetail, response.status);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}
