import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  return NextResponse.json({
    configured: Boolean(url && key && url.startsWith("http")),
    urlHost: url ? new URL(url).host : null,
    anonKeyLength: key.length,
  });
}
