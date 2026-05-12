"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import AuthModal from "./AuthModal";
import { createClient } from "@/lib/supabase/client";
import type { EventWithSpots } from "@/lib/types";

interface RegistrationModalProps {
  event: EventWithSpots | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ event, isOpen, onClose }: RegistrationModalProps) {
  const { user, profile } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "already">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !event) return null;

  const formatPrice = (priceOre: number) => {
    return `${Math.floor(priceOre / 100)} kr`;
  };

  const handleRegister = async () => {
    if (!user) {
      setShowAuth(true);
      return;
    }

    setStatus("loading");
    const supabase = createClient();

    // Check if already registered
    const { data: existing } = await supabase
      .from("registrations")
      .select("id, status")
      .eq("event_id", event.id)
      .eq("user_id", user.id)
      .single();

    if (existing && existing.status === "confirmed") {
      setStatus("already");
      return;
    }

    // If cancelled before, update to confirmed
    if (existing && existing.status === "cancelled") {
      const { error } = await supabase
        .from("registrations")
        .update({ status: "confirmed" })
        .eq("id", existing.id);

      if (error) {
        setStatus("error");
        setErrorMsg(error.message);
        return;
      }
      setStatus("success");
      return;
    }

    // New registration
    const { error } = await supabase.from("registrations").insert({
      event_id: event.id,
      user_id: user.id,
      status: event.spots_left > 0 ? "confirmed" : "waitlist",
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }

    setStatus("success");
  };

  const difficultyLabels: Record<string, string> = {
    beginner: "Nybegynder",
    intermediate: "Mellem",
    advanced: "Avanceret",
    ultra: "Ultra",
  };

  return (
    <>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

        <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
          {/* Header */}
          <div className="gradient-hero p-6 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-2 mb-2">
              {event.tag && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10">
                  {event.tag}
                </span>
              )}
              {event.distance && (
                <span className="text-xs font-medium text-white/60">{event.distance}</span>
              )}
            </div>
            <h3 className="text-2xl font-bold">{event.title}</h3>
          </div>

          {/* Body */}
          <div className="p-6">
            {status === "success" ? (
              <div className="text-center py-6">
                <span className="text-5xl">🎉</span>
                <h4 className="mt-4 text-xl font-bold text-gray-900">Du er tilmeldt!</h4>
                <p className="mt-2 text-[var(--color-muted)]">
                  Du er nu tilmeldt <strong>{event.title}</strong>.
                  Vi glæder os til at se dig!
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 gradient-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition"
                >
                  Luk
                </button>
              </div>
            ) : status === "already" ? (
              <div className="text-center py-6">
                <span className="text-5xl">✅</span>
                <h4 className="mt-4 text-xl font-bold text-gray-900">Allerede tilmeldt</h4>
                <p className="mt-2 text-[var(--color-muted)]">
                  Du er allerede tilmeldt dette event.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 text-sm text-[var(--color-accent)] hover:underline font-medium"
                >
                  Luk
                </button>
              </div>
            ) : (
              <>
                {event.description && (
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5">
                    {event.description}
                  </p>
                )}

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-lg">📅</span>
                    <span className="text-gray-700">
                      {new Date(event.date).toLocaleDateString("da-DK", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-lg">📍</span>
                    <span className="text-gray-700">{event.address || event.location}</span>
                  </div>
                  {event.difficulty && (
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-lg">💪</span>
                      <span className="text-gray-700">
                        {difficultyLabels[event.difficulty] || event.difficulty}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-lg">👥</span>
                    <span className={`font-medium ${event.spots_left < 20 ? "text-[var(--color-accent)]" : "text-gray-700"}`}>
                      {event.spots_left > 0
                        ? `${event.spots_left} pladser ledige af ${event.max_spots}`
                        : "Fuldt booket — venteliste"}
                    </span>
                  </div>
                </div>

                {/* Price + Register */}
                <div className="border-t border-gray-100 pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">
                        {formatPrice(event.price)}
                      </span>
                      <span className="text-sm text-[var(--color-muted)]"> / person</span>
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-500 mb-3">{errorMsg}</p>
                  )}

                  <button
                    onClick={handleRegister}
                    disabled={status === "loading"}
                    className="w-full gradient-accent text-white py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition shadow-lg shadow-[var(--color-accent)]/25 disabled:opacity-50"
                  >
                    {status === "loading"
                      ? "Tilmelder..."
                      : !user
                      ? "Log ind og tilmeld dig"
                      : event.spots_left > 0
                      ? "Bekræft tilmelding"
                      : "Tilmeld venteliste"}
                  </button>

                  {user && profile && (
                    <p className="mt-3 text-xs text-center text-[var(--color-muted)]">
                      Logget ind som {profile.full_name || profile.email}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
