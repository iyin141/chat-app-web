/**
 * Central backend configuration.
 *
 * NEXT_PUBLIC_API_URL may be given either as an origin ("http://localhost:5000")
 * or with the version prefix ("http://localhost:5000/api/v1"). Both resolve to the same values.
 */
const RAW = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").trim().replace(/^"|"$/g, "");

/** e.g. http://localhost:5000 */
export const API_ORIGIN = RAW.replace(/\/+$/, "").replace(/\/api\/v1$/, "");

/** e.g. http://localhost:5000/api/v1 */
export const API_BASE_URL = `${API_ORIGIN}/api/v1`;

export const HUB_URL = process.env.NEXT_PUBLIC_SIGNALR_URL ?? `${API_ORIGIN}/hubs/chat`;

export const TOKEN_COOKIE = "chatapp_token";
export const USER_COOKIE = "chatapp_user";
export const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
