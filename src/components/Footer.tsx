export default function Footer() {
  return (
    <footer className="bg-[#0d0d1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏃</span>
            <span className="text-white font-bold text-sm">
              Kilometer<span className="text-[var(--color-accent)]">klubben</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#events" className="text-white/40 hover:text-white/80 transition text-sm">
              Events
            </a>
            <a href="#om-os" className="text-white/40 hover:text-white/80 transition text-sm">
              Om os
            </a>
            <a href="#kontakt" className="text-white/40 hover:text-white/80 transition text-sm">
              Kontakt
            </a>
          </div>

          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Kilometerklubben. Alle rettigheder forbeholdt.
          </p>
        </div>
      </div>
    </footer>
  );
}
