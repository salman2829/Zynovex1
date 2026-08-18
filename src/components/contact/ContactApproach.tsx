import { MessageCircle, Phone } from "lucide-react";
import {
  agencyEmail,
  foundersContact,
  primaryWhatsApp,
  telLink,
  whatsappLink,
} from "@/lib/contact";

const defaultMsg =
  "Hi Zynovex — I’d like a free project quote.";

export default function ContactApproach() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappLink(primaryWhatsApp.whatsapp, defaultMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp
        </a>
        <a
          href={telLink(primaryWhatsApp.phone)}
          className="btn-ghost inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold"
        >
          <Phone size={18} />
          Call us
        </a>
      </div>

      <div className="space-y-3">
        {foundersContact.map((person) => (
          <div
            key={person.phone}
            className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-white">{person.name}</p>
              <p className="text-xs text-steel">{person.role}</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={telLink(person.phone)}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:border-signal hover:text-signal"
              >
                {person.phoneDisplay}
              </a>
              <a
                href={whatsappLink(person.whatsapp, defaultMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent/20 px-3 py-1.5 text-xs font-semibold text-signal transition hover:bg-accent/30"
              >
                WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1 text-sm text-steel">
        <p>
          <span className="font-semibold text-white/80">Email:</span> {agencyEmail}
        </p>
        <p>Free quote · Fast delivery · Clear ownership</p>
      </div>
    </div>
  );
}
