"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ensureClientProfile, portalPath } from "@/lib/auth/profile";

type Mode = "login" | "signup";
type Step = "email" | "otp";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-steel focus:border-accent";

export default function AuthForm({ mode }: { mode: Mode }) {
  const [step, setStep] = useState<Step>("email");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [emailStatus, setEmailStatus] = useState<
    "idle" | "checking" | "available" | "taken" | "missing"
  >("idle");
  const [emailHint, setEmailHint] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const checkSeq = useRef(0);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = window.setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [resendIn]);

  useEffect(() => {
    if (step !== "email") return;

    const normalized = email.trim().toLowerCase();
    if (!normalized || !normalized.includes("@") || !normalized.includes(".")) {
      setEmailStatus("idle");
      setEmailHint("");
      return;
    }

    const seq = ++checkSeq.current;
    setEmailStatus("checking");
    setEmailHint("Checking email…");

    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch("/api/auth/check-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: normalized }),
        });
        const payload = (await res.json()) as {
          exists?: boolean;
          message?: string;
        };

        if (seq !== checkSeq.current) return;
        if (!res.ok) {
          setEmailStatus("idle");
          setEmailHint("");
          return;
        }

        if (mode === "signup") {
          if (payload.exists) {
            setEmailStatus("taken");
            setEmailHint("This email is already registered. Please sign in with OTP.");
          } else {
            setEmailStatus("available");
            setEmailHint("Email is available — we’ll send a one-time code.");
          }
        } else if (payload.exists) {
          setEmailStatus("available");
          setEmailHint("Account found — we’ll send a one-time code.");
        } else {
          setEmailStatus("missing");
          setEmailHint("No account with this email. Create an account first.");
        }
      } catch {
        if (seq !== checkSeq.current) return;
        setEmailStatus("idle");
        setEmailHint("");
      }
    }, 450);

    return () => window.clearTimeout(timer);
  }, [email, mode, step]);

  async function sendOtp(trimmedEmail: string) {
    const supabase = createClient();

    if (mode === "signup") {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: trimmedEmail,
        options: {
          shouldCreateUser: true,
          data: { full_name: fullName.trim() },
        },
      });
      if (otpError) throw otpError;
    } else {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: trimmedEmail,
        options: { shouldCreateUser: false },
      });
      if (otpError) throw otpError;
    }

    setStep("otp");
    setInfo(`OTP sent to ${trimmedEmail}. Check your inbox (and spam).`);
    setResendIn(45);
    setOtp("");
  }

  async function onSendCode(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");

    const trimmedEmail = email.trim().toLowerCase();

    try {
      if (mode === "signup") {
        if (!fullName.trim()) throw new Error("Enter your full name.");
        if (emailStatus === "taken") {
          throw new Error("This email is already registered. Please sign in.");
        }

        const checkRes = await fetch("/api/auth/check-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail }),
        });
        const checkPayload = (await checkRes.json()) as { exists?: boolean };
        if (checkPayload.exists) {
          setEmailStatus("taken");
          throw new Error("This email is already registered. Please sign in.");
        }
      } else {
        if (emailStatus === "missing") {
          throw new Error("No account with this email. Create an account first.");
        }

        const checkRes = await fetch("/api/auth/check-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmedEmail }),
        });
        const checkPayload = (await checkRes.json()) as { exists?: boolean };
        if (!checkPayload.exists) {
          setEmailStatus("missing");
          throw new Error("No account with this email. Create an account first.");
        }
      }

      await sendOtp(trimmedEmail);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function onVerifyOtp(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const trimmedEmail = email.trim().toLowerCase();
    const token = otp.replace(/\s/g, "");

    try {
      if (!/^\d{6,8}$/.test(token)) {
        throw new Error("Enter the 6-digit OTP from your email.");
      }

      const supabase = createClient();
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: trimmedEmail,
        token,
        type: "email",
      });

      if (verifyError) throw verifyError;
      if (!data.user) throw new Error("Invalid or expired OTP. Try again.");

      const role = await ensureClientProfile(
        supabase,
        data.user.id,
        fullName.trim() || data.user.user_metadata?.full_name,
      );
      window.location.assign(portalPath(role));
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed.");
      setLoading(false);
    }
  }

  async function onResend() {
    if (resendIn > 0 || loading) return;
    setLoading(true);
    setError("");
    try {
      await sendOtp(email.trim().toLowerCase());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend OTP.");
    } finally {
      setLoading(false);
    }
  }

  if (step === "otp") {
    return (
      <form onSubmit={onVerifyOtp} className="mx-auto w-full max-w-md space-y-4">
        <div>
          <p className="text-sm text-steel">
            Code sent to <span className="font-semibold text-navy">{email.trim()}</span>
          </p>
          <button
            type="button"
            className="mt-1 text-xs font-semibold text-accent hover:text-accent-deep"
            onClick={() => {
              setStep("email");
              setOtp("");
              setError("");
              setInfo("");
            }}
          >
            Use a different email
          </button>
        </div>

        <div>
          <label htmlFor="otp" className="mb-0 block text-sm font-medium text-navy/80">
            One-time password (OTP)
          </label>
          <input
            id="otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            required
            maxLength={8}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="6-digit code"
            className={`${fieldClass} tracking-[0.35em]`}
          />
        </div>

        {info && (
          <p className="rounded-xl border border-accent/25 bg-accent/10 px-3 py-2 text-sm text-accent">
            {info}
          </p>
        )}
        {error && (
          <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || otp.length < 6}
          className="btn-primary w-full rounded-full px-4 py-3 text-sm font-semibold disabled:opacity-60"
        >
          {loading ? "Verifying…" : mode === "login" ? "Sign in with OTP" : "Verify & create account"}
        </button>

        <button
          type="button"
          disabled={loading || resendIn > 0}
          onClick={onResend}
          className="w-full text-center text-sm font-semibold text-steel transition hover:text-accent disabled:opacity-50"
        >
          {resendIn > 0 ? `Resend OTP in ${resendIn}s` : "Resend OTP"}
        </button>
      </form>
    );
  }

  const blockSubmit =
    loading ||
    emailStatus === "checking" ||
    (mode === "signup" && emailStatus === "taken") ||
    (mode === "login" && emailStatus === "missing");

  return (
    <form onSubmit={onSendCode} className="mx-auto w-full max-w-md space-y-4">
      {mode === "signup" && (
        <div>
          <label htmlFor="fullName" className="mb-0 block text-sm font-medium text-navy/80">
            Full name
          </label>
          <input
            id="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="mb-0 block text-sm font-medium text-navy/80">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          placeholder="you@gmail.com"
          className={fieldClass}
          aria-invalid={
            (mode === "signup" && emailStatus === "taken") ||
            (mode === "login" && emailStatus === "missing")
          }
        />
        {emailHint && (
          <p
            className={`mt-1.5 text-xs ${
              emailStatus === "taken" || emailStatus === "missing"
                ? "text-red-600"
                : emailStatus === "available"
                  ? "text-accent"
                  : "text-steel"
            }`}
          >
            {emailHint}
            {emailStatus === "taken" && (
              <>
                {" "}
                <Link href="/auth/login" className="font-semibold underline">
                  Go to sign in
                </Link>
              </>
            )}
            {emailStatus === "missing" && (
              <>
                {" "}
                <Link href="/auth/signup" className="font-semibold underline">
                  Create account
                </Link>
              </>
            )}
          </p>
        )}
      </div>

      {error && (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={blockSubmit}
        className="btn-primary w-full rounded-full px-4 py-3 text-sm font-semibold disabled:opacity-60"
      >
        {loading ? "Sending OTP…" : "Send OTP to email"}
      </button>

      <p className="text-center text-sm text-steel">
        {mode === "login" ? (
          <>
            New to Zynovex?{" "}
            <Link href="/auth/signup" prefetch className="font-semibold text-signal hover:text-accent">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/auth/login" prefetch className="font-semibold text-signal hover:text-accent">
              Sign in with OTP
            </Link>
          </>
        )}
      </p>

      {mode === "login" && (
        <p className="text-center text-xs text-steel/70">
          Founder?{" "}
          <Link href="/admin/login" prefetch className="font-semibold text-signal hover:text-accent">
            Admin portal login
          </Link>
        </p>
      )}
    </form>
  );
}
