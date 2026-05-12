"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, profile, signOut } = useAuth();

  return (
    <>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />

      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🏃</span>
              <span className="text-white font-bold text-lg tracking-tight">
                Kilometer<span className="text-[var(--color-accent)]">klubben</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#events" className="text-white/80 hover:text-white transition text-sm font-medium">Events</a>
              <a href="#om-os" className="text-white/80 hover:text-white transition text-sm font-medium">Om os</a>
              <a href="#kontakt" className="text-white/80 hover:text-white transition text-sm font-medium">Kontakt</a>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 glass rounded-full pl-2 pr-4 py-1.5 hover:bg-white/10 transition"
                  >
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="" className="w-7 h-7 rounded-full" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold">
                        {(profile?.full_name || profile?.email || "?")[0].toUpperCase()}
                      </div>
                    )}
                    <span className="text-white text-sm font-medium truncate max-w-[120px]">
                      {profile?.full_name || profile?.email || "Profil"}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      {profile?.is_admin && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setShowUserMenu(false)}
                        >
                          🔧 Admin panel
                        </Link>
                      )}
                      <Link
                        href="/profil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        👤 Min profil
                      </Link>
                      <button
                        onClick={() => { signOut(); setShowUserMenu(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Log ud
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="gradient-accent text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition"
                >
                  Log ind
                </button>
              )}
            </div>

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

          {mobileOpen && (
            <div className="md:hidden pb-4 space-y-3">
              <a href="#events" onClick={() => setMobileOpen(false)} className="block text-white/80 hover:text-white text-sm font-medium">Events</a>
              <a href="#om-os" onClick={() => setMobileOpen(false)} className="block text-white/80 hover:text-white text-sm font-medium">Om os</a>
              <a href="#kontakt" onClick={() => setMobileOpen(false)} className="block text-white/80 hover:text-white text-sm font-medium">Kontakt</a>
              {user ? (
                <>
                  {profile?.is_admin && (
                    <Link href="/admin" onClick={() => setMobileOpen(false)} className="block text-white/80 hover:text-white text-sm font-medium">🔧 Admin</Link>
                  )}
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="block text-red-400 text-sm font-medium">Log ud</button>
                </>
              ) : (
                <button onClick={() => { setShowAuth(true); setMobileOpen(false); }} className="inline-block gradient-accent text-white px-5 py-2 rounded-full text-sm font-semibold">Log ind</button>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
