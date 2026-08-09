import type { Metadata } from "next";
import AuthForm from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create account",
};

export default function SignupPage() {
  return (
    <div className="section-grid bg-paper px-5 pb-20 pt-28 md:px-8 md:pb-28 md:pt-32">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-deep">
          Get started
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
          Create your account
        </h1>
        <p className="mt-3 text-steel">
          Join as a client to submit briefs and track conversations securely.
        </p>
      </div>
      <div className="mt-10">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}
