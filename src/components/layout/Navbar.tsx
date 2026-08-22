"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState, startTransition } from "react";
import { BrandLockup } from "@/components/brand/BrandLogo";
import MotionPress from "@/components/motion/MotionPress";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/referral", label: "Referral" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [accountHref, setAccountHref] = useState("/contact");
  const [accountLabel, setAccountLabel] = useState("Start a project");
  const [signedIn, setSignedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        // Past ~half the hero on home; sooner on inner pages
        const threshold =
          pathname === "/" ? Math.min(window.innerHeight * 0.55, 420) : 24;
        setScrolled(window.scrollY > threshold);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!hasSupabaseEnv()) return;
    let alive = true;

    try {
      const supabase = createClient();

      async function syncAccount(userId: string | undefined) {
        if (!alive) return;
        if (!userId) {
          startTransition(() => {
            setSignedIn(false);
            setAccountHref("/contact");
            setAccountLabel("Start a project");
          });
          return;
        }

        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userId)
          .maybeSingle();

        if (!alive) return;
        const admin = data?.role === "admin";
        startTransition(() => {
          setSignedIn(true);
          setAccountHref(admin ? "/admin" : "/dashboard");
          setAccountLabel(admin ? "Admin" : "Dashboard");
        });
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event: string, session) => {
        void syncAccount(session?.user?.id);
      });

      return () => {
        alive = false;
        subscription.unsubscribe();
      };
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <nav
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 md:h-16 md:px-4 ${
          scrolled
            ? "border border-navy/8 bg-white/90 shadow-[0_10px_30px_-12px_rgba(7,20,38,0.06)] backdrop-blur-xl"
            : pathname === "/"
              ? "border border-transparent bg-transparent backdrop-blur-0"
              : "border border-navy/10 bg-white shadow-[0_4px_20px_rgba(7,20,38,0.04)]"
        }`}
      >
        <Link
          href="/"
          aria-label="Zynovex Technologies home"
          className="flex shrink-0 items-center pl-1.5 pr-1"
        >
          <BrandLockup priority size="sm" />
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-navy/8 bg-navy/[0.02] px-2 py-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-steel transition-colors hover:bg-navy/5 hover:text-navy"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {!signedIn && (
            <MotionPress>
              <Link
                href="/auth/login"
                prefetch
                className="btn-ghost inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
              >
                Client login
              </Link>
            </MotionPress>
          )}
          <MotionPress>
            <Link
              href={accountHref}
              prefetch
              className="btn-primary inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold"
            >
              {accountLabel}
              {accountHref === "/contact" && <span aria-hidden>→</span>}
            </Link>
          </MotionPress>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="mr-1 text-navy md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-navy/10 bg-white px-5 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} prefetch className="py-2 text-foreground/80 hover:text-navy">
                {link.label}
              </Link>
            ))}
            {!signedIn && (
              <Link
                href="/auth/login"
                prefetch
                className="btn-ghost mt-2 rounded-full px-4 py-2.5 text-center text-sm font-semibold"
              >
                Client login
              </Link>
            )}
            <Link
              href={accountHref}
              prefetch
              className="btn-primary mt-2 rounded-full px-4 py-2.5 text-center text-sm font-semibold"
            >
              {accountLabel}
              {accountHref === "/contact" ? " →" : ""}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
