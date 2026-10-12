export interface UserDto {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string | null;
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || "Failed to log in");
  }

  const data: AuthResponse = await response.json();
  if (typeof window !== "undefined") {
    localStorage.setItem("chatapp_token", data.token);
    localStorage.setItem("chatapp_user", JSON.stringify(data.user));
  }
  return data;
}

export async function register(
  email: string,
  password: string,
  username: string,
  displayName?: string
): Promise<AuthResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username, displayName }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || "Failed to sign up");
  }

  const data: AuthResponse = await response.json();
  if (typeof window !== "undefined") {
    localStorage.setItem("chatapp_token", data.token);
    localStorage.setItem("chatapp_user", JSON.stringify(data.user));
  }
  return data;
}

export async function logout(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
  if (typeof window !== "undefined") {
    localStorage.removeItem("chatapp_token");
    localStorage.removeItem("chatapp_user");
  }
}

export function getClientToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("chatapp_token");
}

export function getClientUser(): UserDto | null {
  if (typeof window === "undefined") return null;
  const userJson = localStorage.getItem("chatapp_user");
  if (!userJson) return null;
  try {
    return JSON.parse(userJson) as UserDto;
  } catch {
    return null;
  }
}
