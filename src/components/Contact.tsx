"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="kontakt" className="py-24 gradient-hero relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider">
            Kontakt
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Har du spørgsmål?
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Skriv til os — vi svarer hurtigst muligt.
          </p>

          {submitted ? (
            <div className="mt-10 glass rounded-2xl p-8 text-center">
              <span className="text-4xl">✅</span>
              <h3 className="mt-4 text-xl font-bold text-white">Tak for din besked!</h3>
              <p className="mt-2 text-white/60">Vi vender tilbage hurtigst muligt.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-10 space-y-4 text-left"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">Navn</label>
                  <input
                    type="text"
                    required
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
                    placeholder="Dit navn"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50"
                    placeholder="din@email.dk"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">Besked</label>
                <textarea
                  required
                  rows={4}
                  className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 resize-none"
                  placeholder="Skriv din besked her..."
                />
              </div>
              <button
                type="submit"
                className="w-full gradient-accent text-white py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition shadow-lg shadow-[var(--color-accent)]/25"
              >
                Send besked
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
