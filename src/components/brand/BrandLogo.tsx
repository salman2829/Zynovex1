import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  /** `full` = complete logo lockup, `mark` = Z icon only */
  variant?: "full" | "mark";
};

export function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="font-display flex items-center text-2xl font-bold tracking-[0.1em] text-white sm:text-3xl md:text-4xl">
        ZYNOV
        <span
          className="mx-[0.08em] inline-flex h-[0.72em] w-[0.52em] flex-col justify-between py-[0.06em]"
          aria-hidden
        >
          <span className="block h-[0.14em] w-full rounded-[1px] bg-signal" />
          <span className="block h-[0.14em] w-full rounded-[1px] bg-signal" />
          <span className="block h-[0.14em] w-full rounded-[1px] bg-signal" />
        </span>
        X
      </span>
      <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.38em] text-white/55 sm:text-[11px]">
        Technologies
      </span>
    </div>
  );
}

export default function BrandLogo({
  className = "h-12",
  priority = false,
  variant = "full",
}: BrandLogoProps) {
  const isMark = variant === "mark";

  return (
    <Image
      src={isMark ? "/logo-mark.png" : "/logo-transparent.png"}
      alt="Zynovex Technologies"
      width={isMark ? 727 : 865}
      height={isMark ? 291 : 606}
      priority={priority}
      sizes={isMark ? "(max-width: 768px) 110px, 140px" : "(max-width: 768px) 200px, 280px"}
      className={`w-auto object-contain object-left ${className}`}
    />
  );
}
