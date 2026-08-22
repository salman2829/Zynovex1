import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-grade flex min-h-[70vh] flex-col items-center justify-center text-white px-5 py-24 md:px-8 md:py-32">
      <section className="atmosphere w-full max-w-2xl text-center rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-14">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-signal">
          404 Error
        </p>
        <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          Page Not <span className="text-signal">Found</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-steel md:text-lg">
          The page you are looking for does not exist or has been moved. Let's get you back on track.
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="btn-primary inline-flex rounded-full px-6 py-3.5 text-sm font-semibold"
          >
            Back to homepage
          </Link>
        </div>
      </section>
    </div>
  );
}
