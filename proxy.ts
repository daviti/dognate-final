import { NextResponse } from "next/server";
import { auth } from "@/auth";

const editPathPattern = /^\/(wishlist|supplies)\/[^/]+\/edit$/;

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const requiresAuth =
    pathname.startsWith("/account") ||
    pathname === "/wishlist/new" ||
    pathname === "/supplies/new" ||
    editPathPattern.test(pathname);

  if (requiresAuth && !req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/account/:path*", "/wishlist/:path*", "/supplies/:path*"],
};
