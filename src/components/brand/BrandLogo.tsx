import Image from "next/image";

type Size = "sm" | "md" | "lg" | "hero";

const sizeMap: Record<Size, { className: string; width: number; height: number }> = {
  sm: { className: "h-11 w-auto md:h-12", width: 148, height: 130 },
  md: { className: "h-14 w-auto", width: 180, height: 159 },
  lg: { className: "h-20 w-auto md:h-24", width: 260, height: 230 },
  hero: { className: "h-28 w-auto sm:h-32 md:h-40", width: 360, height: 318 },
};

/** Official Zynovex agency logo lockup. */
export function BrandLockup({
  priority = false,
  size = "md",
  tone = "light",
}: {
  priority?: boolean;
  tone?: "light" | "dark";
  size?: Size;
}) {
  const { className, width, height } = sizeMap[size];
  const src = tone === "dark" ? "/logo-nav.png" : "/logo-transparent.png";

  return (
    <Image
      src={src}
      alt="Zynovex Technologies"
      width={width}
      height={height}
      priority={priority}
      quality={75}
      sizes={`${Math.round(width * 2)}px`}
      className={`${className} object-contain transition-all duration-300 ${
        tone === "dark" ? "brightness-0 invert" : ""
      }`}
    />
  );
}

export default function BrandLogo({
  className = "h-12 w-auto",
  priority = false,
  variant = "badge",
}: {
  className?: string;
  priority?: boolean;
  variant?: "badge" | "mark" | "full";
}) {
  const src =
    variant === "mark"
      ? "/logo-mark.png"
      : variant === "full"
        ? "/logo-badge.png"
        : "/logo-transparent.png";

  return (
    <Image
      src={src}
      alt="Zynovex Technologies"
      width={1128}
      height={996}
      priority={priority}
      quality={75}
      sizes="(max-width: 768px) 160px, 220px"
      className={`object-contain ${className}`}
    />
  );
}
