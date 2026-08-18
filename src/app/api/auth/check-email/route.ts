import { NextResponse } from "next/server";
import { authEmailExists } from "@/lib/auth/email";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    const exists = await authEmailExists(email);
    return NextResponse.json({
      exists,
      message: exists
        ? "This email is already registered. Please sign in."
        : "Email is available.",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not verify email.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
