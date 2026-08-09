import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { hasSupabaseEnv } from "@/lib/supabase/config";

export async function middleware(request: NextRequest) {
  if (!hasSupabaseEnv()) {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/auth/login";
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
