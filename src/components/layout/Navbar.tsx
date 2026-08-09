"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import BrandLogo from "@/components/brand/BrandLogo";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import type { User } from "@supabase/supabase-js";

const links = [
  { href: "/services", label: "Services" },
  { href: "/#approach", label: "Approach" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hasSupabaseEnv()) return;

    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const darkHero = pathname === "/";
  const lightNav = scrolled || !darkHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        lightNav
          ? "border-b border-line bg-paper/95 backdrop-blur-md"
          : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 md:h-[5rem] md:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Zynovex Technologies home"
        >
          <BrandLogo variant="mark" priority className="h-10 md:h-12" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                lightNav
                  ? "text-steel hover:text-ink"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <Link
              href="/dashboard"
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              Client login
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className={`md:hidden ${lightNav ? "text-ink" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-ink">
                {link.label}
              </Link>
            ))}
            <Link
              href={user ? "/dashboard" : "/auth/login"}
              className="mt-1 rounded-md bg-accent px-4 py-2 text-center text-sm font-semibold text-white"
            >
              {user ? "Dashboard" : "Client login"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
