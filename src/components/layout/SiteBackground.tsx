/** Lightweight static background — no scroll JS, no huge animated blurs. */
export default function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-8%,rgba(37,99,235,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_90%_60%,rgba(56,189,248,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/80" />
    </div>
  );
}
