import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <div className="page-grade px-5 pb-20 pt-28 text-white md:px-8 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-signal">
          Get started
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Create your account
        </h1>
        <p className="mt-3 text-white/55">
          Enter your details — we’ll email a one-time password (OTP) to verify
          your Gmail and create your account.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-lg rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 md:p-8">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
