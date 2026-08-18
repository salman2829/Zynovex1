import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAdminLogin = path === "/admin/login";
  const isAdminArea = path.startsWith("/admin") && !isAdminLogin;
  const isClientDashboard = path.startsWith("/dashboard");

  if (!hasSupabaseEnv()) {
    if (isAdminArea) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin/login";
      return NextResponse.redirect(redirectUrl);
    }
    if (isClientDashboard) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/auth/login";
      redirectUrl.searchParams.set("next", path);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  return updateSession(request);
}

/**
 * Only protect dashboards + admin + OAuth callback.
 * Public auth pages and APIs skip middleware so clicks stay fast.
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin",
    "/admin/((?!login$).*)",
    "/admin/login",
    "/auth/callback",
  ],
};
