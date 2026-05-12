"use client";

export default function Social() {
  return (
    <section className="py-16 bg-[var(--color-surface)] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">Følg med</h2>
          <p className="mt-2 text-[var(--color-muted)]">
            Hold dig opdateret på sociale medier — vi deler løbebilleder, events og nyt fra fællesskabet.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/frillepigen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 px-6 py-4 hover:shadow-lg hover:border-[var(--color-accent)]/20 transition-all duration-300"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FD5" />
                  <stop offset="50%" stopColor="#F56040" />
                  <stop offset="100%" stopColor="#C13584" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-gradient)" strokeWidth="2" />
              <circle cx="12" cy="12" r="5" stroke="url(#ig-gradient)" strokeWidth="2" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-gradient)" />
            </svg>
            <div className="text-left">
              <div className="text-sm font-semibold text-[var(--color-primary)]">Instagram</div>
              <div className="text-xs text-[var(--color-muted)]">@frillepigen</div>
            </div>
          </a>

          {/* Facebook like */}
          <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 hover:shadow-lg transition-all duration-300">
            <div
              className="fb-like"
              data-href="https://kilometerklubben.dk"
              data-width=""
              data-layout="button_count"
              data-action="like"
              data-size="large"
              data-share="true"
            />
            <noscript>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://kilometerklubben.dk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 font-medium"
              >
                Synes godt om på Facebook
              </a>
            </noscript>
          </div>
        </div>
      </div>
    </section>
  );
}
