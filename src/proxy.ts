import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_COOKIE, USER_COOKIE } from "@/lib/api/config";
import { isTokenValid } from "@/lib/auth/jwt";

const AUTH_PAGES = ["/auth/login", "/auth/sign-up"];

function isPublic(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/Home") ||
    pathname.startsWith("/auth") ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/api/proxy/api/v1/auth/forgot-password" ||
    pathname === "/api/proxy/api/v1/auth/reset-password" ||
    pathname.startsWith("/api/auth")
  );
}

function clearSession(response: NextResponse): NextResponse {
  response.cookies.delete(TOKEN_COOKIE);
  response.cookies.delete(USER_COOKIE);
  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const valid = isTokenValid(token);

  // The server bounced us here because the API rejected the session: drop the stale cookies.
  if (searchParams.get("expired") === "1") {
    return clearSession(NextResponse.next());
  }

  // Signed-in users don't need the login / sign-up pages.
  if (valid && AUTH_PAGES.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isPublic(pathname)) {
    // Clean up an expired/garbage cookie so it can't masquerade as a session.
    if (token && !valid) return clearSession(NextResponse.next());
    return NextResponse.next();
  }

  if (!valid) {
    if (pathname.startsWith("/api/")) {
      return clearSession(NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
    }
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.search = `?expired=1&next=${encodeURIComponent(pathname + request.nextUrl.search)}`;
    return clearSession(NextResponse.redirect(url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
