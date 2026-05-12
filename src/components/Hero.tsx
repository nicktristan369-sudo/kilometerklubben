export default function Hero() {
  return (
    <section className="gradient-hero relative min-h-screen flex items-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium">Sæson 2025 — Tilmelding åben</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight text-balance">
            Løb med i{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-pink-400">
              Danmarks
            </span>{" "}
            fedeste løbe-events
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl leading-relaxed">
            Fra trail runs i skoven til byløb langs havnen — Kilometerklubben samler de bedste løbe-oplevelser i
            Danmark. Uanset om du er nybegynder eller veteran.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#events"
              className="gradient-accent text-white px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition shadow-lg shadow-[var(--color-accent)]/25"
            >
              Se kommende events →
            </a>
            <a
              href="#om-os"
              className="glass text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/10 transition"
            >
              Læs mere
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-md">
            <div>
              <div className="text-3xl font-bold text-white">12+</div>
              <div className="text-sm text-white/50 mt-1">Events i 2025</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-white/50 mt-1">Deltagere</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">8</div>
              <div className="text-sm text-white/50 mt-1">Byer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
