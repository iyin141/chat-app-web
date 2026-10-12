import { ApiError } from "@/lib/api/config";
import { isTokenValid } from "@/lib/auth/jwt";
import { mutate } from "swr";

const STORAGE_KEY = "chatapp_token";

function clearClientSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("chatapp_user");
  // Persisted zustand stores: stale user/messages must not survive a dead session.
  localStorage.removeItem("chatapp-auth-storage");
  localStorage.removeItem("app-cache");
}

let inflight: Promise<string | null> | null = null;

/**
 * Returns a valid access token for browser-side calls (e.g. SignalR accessTokenFactory), or null.
 * Fetches from /api/auth/session if not available or expired in localStorage.
 */
export async function getAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;

  const local = localStorage.getItem(STORAGE_KEY);
  if (isTokenValid(local)) return local;
  if (local) clearClientSession();

  if (!inflight) {
    inflight = fetch("/api/auth/session", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((s: { token?: string | null } | null) => {
        const token = s?.token ?? null;
        if (isTokenValid(token)) {
          localStorage.setItem(STORAGE_KEY, token as string);
          return token;
        }
        return null;
      })
      .catch(() => null)
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

let redirecting = false;

/** Session is dead: wipe local state and send the user to login once. */
export function handleUnauthorized() {
  clearClientSession();
  
  if (typeof window !== "undefined") {
    // Clear all SWR cache by mutating all keys to undefined without revalidating
    mutate(() => true, undefined, { revalidate: false });
  }

  if (typeof window === "undefined" || redirecting) return;
  
  const p = window.location.pathname;
  if (
    p === "/" ||
    p.startsWith("/Home") ||
    p.startsWith("/auth") ||
    p === "/forgot-password" ||
    p === "/reset-password"
  ) {
    return;
  }
  
  redirecting = true;
  window.location.assign("/auth/login?expired=1");
}

/**
 * Browser-side fetcher: routes calls through the same-origin Next BFF proxy (/api/proxy/...)
 * HttpOnly cookies are attached automatically by the browser, shielding the JWT from JS exposure
 * and removing CORS issues.
 */
export async function apiFetch<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Strip leading slash if needed
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const proxyUrl = endpoint.startsWith("http")
    ? endpoint
    : `/api/proxy/${normalizedEndpoint}`;

  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(proxyUrl, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    handleUnauthorized();
    throw new ApiError("Session expired", 401);
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
