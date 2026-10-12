import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL, TOKEN_COOKIE } from "@/lib/api/config";
import { isTokenValid } from "@/lib/auth/jwt";

// Handles all HTTP methods forwarding to backend API
async function handleProxy(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const targetSubpath = path.join("/");
  const url = new URL(req.url);
  const search = url.search;

  const targetUrl = `${API_BASE_URL}/${targetSubpath}${search}`;

  const token = req.cookies.get(TOKEN_COOKIE)?.value;

  // Build outbound headers
  const headers = new Headers();
  const contentType = req.headers.get("content-type");
  if (contentType) {
    headers.set("content-type", contentType);
  }
  const accept = req.headers.get("accept");
  if (accept) {
    headers.set("accept", accept);
  }

  // Attach token if valid
  if (isTokenValid(token)) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const method = req.method;
  const body = method !== "GET" && method !== "HEAD" ? await req.blob() : undefined;

  try {
    const backendRes = await fetch(targetUrl, {
      method,
      headers,
      body,
      cache: "no-store",
    });

    // If 401, return 401 with problem details so client knows to de-auth
    if (backendRes.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const resContentType = backendRes.headers.get("content-type") || "";
    if (resContentType.includes("application/json")) {
      const data = await backendRes.json().catch(() => ({}));
      const nextRes = NextResponse.json(data, { status: backendRes.status });
      if (backendRes.status === 401) {
        nextRes.cookies.delete(TOKEN_COOKIE);
      }
      return nextRes;
    }

    const blob = await backendRes.blob();
    const nextRes = new NextResponse(blob, {
      status: backendRes.status,
      headers: { "Content-Type": resContentType },
    });
    if (backendRes.status === 401) {
      nextRes.cookies.delete(TOKEN_COOKIE);
    }
    return nextRes;
  } catch (error) {
    console.error(`[API Proxy] Error forwarding to ${targetUrl}:`, error);
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Failed to connect to backend service" },
      { status: 502 }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;
