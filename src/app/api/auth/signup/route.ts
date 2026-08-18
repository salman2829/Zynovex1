import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { authEmailExists } from "@/lib/auth/email";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
      fullName?: string;
    };

    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";
    const fullName = body.fullName?.trim() ?? "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 },
      );
    }

    if (await authEmailExists(email)) {
      return NextResponse.json(
        {
          error: "This email is already registered. Please sign in.",
          exists: true,
        },
        { status: 409 },
      );
    }

    const admin = createAdminClient();

    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("already") || msg.includes("registered")) {
        return NextResponse.json(
          {
            error: "This email is already registered. Please sign in.",
            exists: true,
          },
          { status: 409 },
        );
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const userId = data.user?.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Could not create account. Try again." },
        { status: 500 },
      );
    }

    await admin.from("profiles").upsert(
      {
        id: userId,
        full_name: fullName,
        role: "client",
      },
      { onConflict: "id" },
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Signup failed. Try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
