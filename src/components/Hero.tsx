export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-banner.jpg"
          alt="Kilometerklubben — løbefællesskab i Silkeborg"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay — heavier at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        {/* Subtle warm tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 pt-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
          <span className="text-white/80 text-sm font-medium">Nyt løbefællesskab i Silkeborg</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight text-balance max-w-3xl">
          Bevægelse{" · "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)]">
            Fællesskab
          </span>
          {" · "}Livsglæde
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-white/65 max-w-xl leading-relaxed">
          Kilometerklubben er et helt nyt løbefællesskab i Silkeborg — skabt af kærlighed til
          løb, natur og de mennesker man møder undervejs. Alle er velkomne.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#event"
            className="gradient-accent text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-[var(--color-accent)]/25"
          >
            Se næste event
          </a>
          <a
            href="#om-os"
            className="bg-white/10 backdrop-blur-md border border-white/15 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/15 transition"
          >
            Læs mere om os
          </a>
        </div>

        {/* Tagline */}
        <p className="mt-12 text-xs text-white/25 uppercase tracking-[0.2em] font-medium">
          Kom som du er — alle er velkomne
        </p>
      </div>
    </section>
  );
}
