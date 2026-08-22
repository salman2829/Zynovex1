import type { Metadata } from "next";
import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Client login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="page-grade px-5 pb-20 pt-28 text-white md:px-8 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-signal">
          Client portal
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          Sign in to Zynovex
        </h1>
        <p className="mt-3 text-white/55">
          Enter your email and we’ll send a one-time password (OTP) to sign you in.
        </p>
        <p className="mt-2 text-sm text-white/40">
          Founders use the{" "}
          <Link href="/admin/login" className="font-semibold text-signal hover:text-white">
            admin portal
          </Link>
          .
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-lg rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 md:p-8">
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
