import { NextResponse } from "next/server";
import { API_BASE_URL, TOKEN_COOKIE, TOKEN_MAX_AGE_SECONDS, USER_COOKIE } from "@/lib/api/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    const response = NextResponse.json(data);
    const secure = process.env.NODE_ENV === "production";
    response.cookies.set(TOKEN_COOKIE, data.token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: TOKEN_MAX_AGE_SECONDS,
    });
    response.cookies.set(USER_COOKIE, JSON.stringify(data.user), {
      httpOnly: false,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: TOKEN_MAX_AGE_SECONDS,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
