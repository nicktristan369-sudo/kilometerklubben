export default function Hero() {
  return (
    <section className="gradient-hero relative min-h-screen flex items-center overflow-hidden">
      {/* Warm ambient glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-accent)]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-800/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Logo + Badge */}
          <div className="mb-10">
            <img src="/images/logo.svg" alt="Kilometerklubben" className="w-24 h-24 sm:w-28 sm:h-28 object-contain mb-6" />
          </div>
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
            <span className="text-white/70 text-sm font-medium">Nyt løbefællesskab i Silkeborg</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight text-balance">
            Bevægelse{" · "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)]">
              Fællesskab
            </span>
            {" · "}Livsglæde
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed">
            Kilometerklubben er et helt nyt løbefællesskab i Silkeborg — skabt af kærlighed til 
            løb, natur og de mennesker man møder undervejs. Vi er lige startet, og alle er velkomne. 
            Uanset tempo, erfaring eller ambition.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#event"
              className="gradient-accent text-white px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition shadow-lg shadow-[var(--color-accent)]/20"
            >
              Se næste event
            </a>
            <a
              href="#om-os"
              className="glass-light text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/10 transition"
            >
              Læs mere om os
            </a>
          </div>

          {/* Tagline */}
          <p className="mt-16 text-sm text-white/30 uppercase tracking-widest font-medium">
            Kom som du er — alle er velkomne
          </p>
        </div>
      </div>
    </section>
  );
}
