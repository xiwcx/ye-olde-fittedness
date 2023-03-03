import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "~/env.mjs";

const productionCookiePrefix = "__Secure-";
const sessionTokenCooke = "next-auth.session-token";

/**
 * next-auth prefaces cookie names differently in production.
 *
 * source: https://next-auth.js.org/configuration/options#cookies
 */
const getCookieName = () =>
  env.NODE_ENV === "production"
    ? productionCookiePrefix + sessionTokenCooke
    : sessionTokenCooke;

export function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request;

  if (!cookies.has(getCookieName())) {
    const url = nextUrl.clone();
    url.pathname = "/api/auth/signin";
    url.searchParams.set("callbackUrl", nextUrl.href);

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/exercises/:path*", "/lifts/:path*"],
};
