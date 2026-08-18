"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState, startTransition } from "react";
import { BrandLockup } from "@/components/brand/BrandLogo";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [accountHref, setAccountHref] = useState("/contact");
  const [accountLabel, setAccountLabel] = useState("Start a project");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hasSupabaseEnv()) return;
    let alive = true;

    try {
      const supabase = createClient();

      async function syncAccount(userId: string | undefined) {
        if (!alive) return;
        if (!userId) {
          startTransition(() => {
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
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full px-3 transition-colors duration-200 md:h-16 md:px-4 ${
          scrolled
            ? "border border-white/10 bg-ink/95"
            : "border border-white/5 bg-ink/70"
        }`}
      >
        <Link
          href="/"
          aria-label="Zynovex Technologies home"
          className="flex shrink-0 items-center pl-1.5 pr-1"
        >
          <BrandLockup priority size="sm" />
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-steel transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={accountHref}
            prefetch
            className="btn-primary inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold"
          >
            {accountLabel}
            {accountHref === "/contact" && <span aria-hidden>→</span>}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="mr-1 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-ink px-5 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} prefetch className="py-2 text-white/80">
                {link.label}
              </Link>
            ))}
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
