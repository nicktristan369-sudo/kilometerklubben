"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import type { RegistrationWithDetails } from "@/lib/types";
import Link from "next/link";

export default function ProfilPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [registrations, setRegistrations] = useState<RegistrationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");

  const supabase = createClient();

  useEffect(() => {
    if (!authLoading && user) {
      fetchRegistrations();
      setFormName(profile?.full_name || "");
      setFormPhone(profile?.phone || "");
    }
    if (!authLoading && !user) setLoading(false);
  }, [authLoading, user, profile]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchRegistrations = async () => {
    const { data } = await supabase
      .from("registrations")
      .select("*, events(*)")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false });
    setRegistrations((data as RegistrationWithDetails[]) || []);
    setLoading(false);
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("profiles").update({
      full_name: formName,
      phone: formPhone,
    }).eq("id", user!.id);
    setEditing(false);
    window.location.reload();
  };

  const cancelRegistration = async (regId: string) => {
    if (!confirm("Er du sikker på at du vil afmelde dig?")) return;
    await supabase.from("registrations").update({ status: "cancelled" }).eq("id", regId);
    fetchRegistrations();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl">👤</span>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Log ind først</h1>
          <p className="mt-2 text-[var(--color-muted)]">Du skal være logget ind for at se din profil.</p>
          <Link href="/" className="mt-4 inline-block text-[var(--color-accent)] hover:underline font-medium">
            ← Gå til forsiden
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-2xl">🏃</Link>
              <h1 className="text-lg font-bold text-gray-900">Min profil</h1>
            </div>
            <Link href="/" className="text-sm text-[var(--color-muted)] hover:text-gray-900 transition">
              ← Tilbage
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile card */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-4">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-16 h-16 rounded-full" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-2xl font-bold">
                {(profile?.full_name || profile?.email || "?")[0].toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              {editing ? (
                <form onSubmit={updateProfile} className="space-y-3">
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Dit navn"
                    className="block w-full max-w-xs rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                  />
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="Telefonnummer"
                    className="block w-full max-w-xs rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="text-sm font-medium text-[var(--color-accent)]">Gem</button>
                    <button type="button" onClick={() => setEditing(false)} className="text-sm text-[var(--color-muted)]">Annuller</button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900">{profile?.full_name || "Intet navn"}</h2>
                  <p className="text-sm text-[var(--color-muted)]">{profile?.email}</p>
                  {profile?.phone && <p className="text-sm text-[var(--color-muted)]">{profile.phone}</p>}
                  <button
                    onClick={() => setEditing(true)}
                    className="mt-2 text-sm text-[var(--color-accent)] hover:underline font-medium"
                  >
                    Rediger profil
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Registrations */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Mine tilmeldinger</h2>

        {registrations.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
            <span className="text-4xl">🏃‍♂️</span>
            <p className="mt-3 text-[var(--color-muted)]">Du er ikke tilmeldt nogen events endnu.</p>
            <Link href="/#events" className="mt-3 inline-block text-[var(--color-accent)] hover:underline font-medium">
              Se events →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {registrations.map((reg) => (
              <div key={reg.id} className="bg-white rounded-xl border border-gray-100 p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{reg.events?.title}</h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    {reg.events?.date && new Date(reg.events.date).toLocaleDateString("da-DK", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })} · {reg.events?.location}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    reg.status === "confirmed" ? "bg-emerald-50 text-emerald-700" :
                    reg.status === "waitlist" ? "bg-amber-50 text-amber-700" :
                    "bg-red-50 text-red-700"
                  }`}>
                    {reg.status === "confirmed" ? "Bekræftet" : reg.status === "waitlist" ? "Venteliste" : "Annulleret"}
                  </span>
                  {reg.status === "confirmed" && (
                    <button
                      onClick={() => cancelRegistration(reg.id)}
                      className="text-xs text-red-500 hover:underline font-medium"
                    >
                      Afmeld
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
