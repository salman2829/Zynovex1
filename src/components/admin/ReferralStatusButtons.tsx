"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Referral } from "@/lib/types";

export default function ReferralStatusButtons({
  referralId,
  current,
}: {
  referralId: string;
  current: Referral["status"];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function setStatus(status: Referral["status"]) {
    if (status === current) return;
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("referrals")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", referralId);
      if (error) throw error;
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const options: Referral["status"][] = [
    "new",
    "contacted",
    "won",
    "paid",
    "rejected",
  ];

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
