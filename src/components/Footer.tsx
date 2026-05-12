export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary-deep)] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/images/logo.svg" alt="Kilometerklubben" className="w-12 h-12 object-contain" />
            <div>
              <span className="text-white font-bold text-sm">
                Kilometer<span className="text-[var(--color-accent)]">klubben</span>
              </span>
              <span className="text-white/20 text-xs ml-2">Silkeborg</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#event" className="text-white/30 hover:text-white/60 transition text-sm">Næste event</a>
            <a href="#om-os" className="text-white/30 hover:text-white/60 transition text-sm">Om os</a>
            <a href="#praktisk" className="text-white/30 hover:text-white/60 transition text-sm">Praktisk info</a>
            <a href="#kontakt" className="text-white/30 hover:text-white/60 transition text-sm">Kontakt</a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/frillepigen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-[var(--color-accent)] transition"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>

          {/* Tagline */}
          <p className="text-white/15 text-xs uppercase tracking-widest">
            Bevægelse · Fællesskab · Livsglæde
          </p>

          <p className="text-white/15 text-xs">
            © {new Date().getFullYear()} Kilometerklubben · Silkeborg
          </p>
        </div>
      </div>
    </footer>
  );
}
