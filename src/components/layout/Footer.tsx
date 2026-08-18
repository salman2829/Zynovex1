import Link from "next/link";
import { BrandLockup } from "@/components/brand/BrandLogo";
import { services } from "@/lib/content";
import {
  foundersContact,
  primaryWhatsApp,
  telLink,
  whatsappLink,
} from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-8 md:py-16">
        <div>
          <BrandLockup size="sm" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/45">
            Digital products engineered to move the needle — websites, AI,
            dashboards, and more.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={whatsappLink(primaryWhatsApp.whatsapp, "Hi Zynovex — I’d like a quote.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent/20 px-3 py-1.5 text-xs font-semibold text-signal"
            >
              WhatsApp
            </a>
            <a
              href={telLink(primaryWhatsApp.phone)}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/70"
            >
              Call
            </a>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">
            Services
          </p>
          <ul className="mt-4 space-y-2.5">
            {services.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/#${service.slug}`}
                  className="text-sm text-white/55 transition hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">
            Company
          </p>
          <ul className="mt-4 space-y-2.5">
            {[
              { href: "/about", label: "About" },
              { href: "/referral", label: "Referral program" },
              { href: "/contact", label: "Contact / Quote" },
              { href: "/auth/login", label: "Client login" },
              { href: "/admin/login", label: "Admin portal" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/55 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">
            Call founders
          </p>
          <ul className="mt-4 space-y-3">
            {foundersContact.map((person) => (
              <li key={person.phone}>
                <p className="text-sm font-medium text-white/80">{person.name}</p>
                <a
                  href={telLink(person.phone)}
                  className="text-sm text-signal transition hover:text-white"
                >
                  {person.phoneDisplay}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-white/30 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Zynovex Technologies</p>
          <p>Solutions · Innovation · Growth</p>
        </div>
      </div>
    </footer>
  );
}
