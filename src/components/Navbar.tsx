"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏃</span>
            <span className="text-white font-bold text-lg tracking-tight">
              Kilometer<span className="text-[var(--color-accent)]">klubben</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#events" className="text-white/80 hover:text-white transition text-sm font-medium">
              Events
            </a>
            <a href="#om-os" className="text-white/80 hover:text-white transition text-sm font-medium">
              Om os
            </a>
            <a href="#kontakt" className="text-white/80 hover:text-white transition text-sm font-medium">
              Kontakt
            </a>
            <a
              href="#events"
              className="gradient-accent text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition"
            >
              Tilmeld dig
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a href="#events" onClick={() => setMobileOpen(false)} className="block text-white/80 hover:text-white text-sm font-medium">
              Events
            </a>
            <a href="#om-os" onClick={() => setMobileOpen(false)} className="block text-white/80 hover:text-white text-sm font-medium">
              Om os
            </a>
            <a href="#kontakt" onClick={() => setMobileOpen(false)} className="block text-white/80 hover:text-white text-sm font-medium">
              Kontakt
            </a>
            <a
              href="#events"
              onClick={() => setMobileOpen(false)}
              className="inline-block gradient-accent text-white px-5 py-2 rounded-full text-sm font-semibold"
            >
              Tilmeld dig
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
