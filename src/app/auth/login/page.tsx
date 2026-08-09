import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Client login",
};

export default function LoginPage() {
  return (
    <div className="section-grid bg-paper px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-deep">
          Client portal
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
          Sign in to Zynovex
        </h1>
        <p className="mt-3 text-steel">
          Access your inquiries and keep projects moving with the team.
        </p>
      </div>
      <div className="mt-10">
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
