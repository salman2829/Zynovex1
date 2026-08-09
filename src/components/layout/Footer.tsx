import Link from "next/link";
import BrandLogo from "@/components/brand/BrandLogo";
import { services } from "@/lib/content";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/auth/login", label: "Client login" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <div className="inline-flex items-center gap-3">
            <BrandLogo variant="mark" className="h-11" />
            <div>
              <p className="font-display flex items-center text-lg font-bold tracking-[0.1em] text-white">
                ZYNOV
                <span
                  className="mx-[0.08em] inline-flex h-[0.72em] w-[0.5em] flex-col justify-between py-[0.05em]"
                  aria-hidden
                >
                  <span className="block h-[0.14em] w-full rounded-[1px] bg-signal" />
                  <span className="block h-[0.14em] w-full rounded-[1px] bg-signal" />
                  <span className="block h-[0.14em] w-full rounded-[1px] bg-signal" />
                </span>
                X
              </p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/50">
                Technologies
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            Solutions · Innovation · Growth. We build websites, AI automations,
            dashboards, booking platforms, marketing systems, and design — with
            ongoing support.
          </p>
          <p className="mt-4 text-sm text-white/45">
            Founded by Mohammad Salman &amp; Korlapally Jashwanth
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Services</p>
          <ul className="mt-4 space-y-2">
            {services.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link
                  href="/services"
                  className="text-sm text-white/60 hover:text-signal"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Company</p>
          <ul className="mt-4 space-y-2">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/60 hover:text-signal">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-white/45 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Zynovex Technologies. All rights reserved.</p>
          <p>Solutions · Innovation · Growth</p>
        </div>
      </div>
    </footer>
  );
}
