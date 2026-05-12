"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="kontakt" className="py-24 gradient-hero relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div>
            <span className="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-widest">
              Kontakt
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Har du spørgsmål?
            </h2>
            <p className="mt-4 text-lg text-white/50 leading-relaxed">
              Du er altid velkommen til at skrive eller ringe — vi svarer så hurtigt vi kan.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                  <span className="text-[var(--color-accent)]">✦</span>
                </div>
                <div>
                  <div className="text-sm text-white/40">Telefon</div>
                  <a href="tel:+4529426055" className="text-white font-medium hover:text-[var(--color-accent)] transition">
                    +45 29 42 60 55
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                  <span className="text-[var(--color-accent)]">◆</span>
                </div>
                <div>
                  <div className="text-sm text-white/40">MobilePay</div>
                  <span className="text-white font-medium">+45 29 42 60 55</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                  <span className="text-[var(--color-accent)]">◈</span>
                </div>
                <div>
                  <div className="text-sm text-white/40">Instagram</div>
                  <a
                    href="https://www.instagram.com/frillepigen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-medium hover:text-[var(--color-accent)] transition"
                  >
                    @frillepigen
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            {submitted ? (
              <div className="glass-light rounded-2xl p-8 text-center">
                <p className="text-xl font-semibold text-white">Tak for din besked</p>
                <p className="mt-2 text-white/50">Vi vender tilbage hurtigst muligt.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Navn</label>
                    <input
                      type="text"
                      required
                      className="w-full glass-light rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                      placeholder="Dit navn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full glass-light rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                      placeholder="din@email.dk"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Besked</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full glass-light rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 resize-none"
                    placeholder="Skriv din besked her..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full gradient-accent text-white py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition shadow-lg shadow-[var(--color-accent)]/20"
                >
                  Send besked
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
