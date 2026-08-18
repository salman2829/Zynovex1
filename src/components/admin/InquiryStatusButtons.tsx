"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ContactInquiry } from "@/lib/types";

export default function InquiryStatusButtons({
  inquiryId,
  current,
}: {
  inquiryId: string;
  current: ContactInquiry["status"];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function setStatus(status: ContactInquiry["status"]) {
    if (status === current) return;
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("contact_inquiries")
        .update({ status })
        .eq("id", inquiryId);
      if (error) throw error;
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const options: ContactInquiry["status"][] = ["new", "reviewed", "closed"];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((status) => (
        <button
          key={status}
          type="button"
          disabled={loading}
          onClick={() => setStatus(status)}
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition disabled:opacity-50 ${
            current === status
              ? "bg-accent text-white"
              : "border border-white/15 text-steel hover:border-signal hover:text-signal"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
