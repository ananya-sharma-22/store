import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/checkout(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // 🚫 Always allow Clerk auth routes
  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return NextResponse.next();
  }

  // 🔑 auth() RETURNS A PROMISE in your version
  const { userId } = await auth();

  // 🔒 Protect checkout
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
