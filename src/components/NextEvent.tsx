"use client";

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import AuthModal from "./AuthModal";
import { createClient } from "@/lib/supabase/client";

export default function NextEvent() {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!user) {
      setShowAuth(true);
      return;
    }

    setLoading(true);
    const supabase = createClient();

    // Find the August 1st event
    const { data: events } = await supabase
      .from("events")
      .select("id")
      .eq("is_published", true)
      .order("date", { ascending: true })
      .limit(1);

    if (events && events.length > 0) {
      const { error } = await supabase.from("registrations").insert({
        event_id: events[0].id,
        user_id: user.id,
        status: "confirmed",
      });

      if (error && error.code === "23505") {
        // Already registered
        setRegistered(true);
      } else if (!error) {
        setRegistered(true);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />

      <section id="event" className="py-24 bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-widest">
              Næste event
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-[var(--color-primary)] tracking-tight">
              Vores første løb
            </h2>
            <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
              Bliv en del af starten på noget nyt. Vi glæder os til at løbe sammen med dig.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Event poster */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/event-poster.jpg"
                alt="Kilometerklubben løbeevent — 1. august 2025, Silkeborg"
                className="w-full h-auto"
              />
            </div>

            {/* Event details + registration */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">
                  Kilometerklubben ✦ Silkeborg
                </h3>
                <p className="mt-2 text-[var(--color-muted)] leading-relaxed">
                  Vores allerførste event — en dag i naturen med løb, fællesskab og gode oplevelser.
                  Alle er velkomne, uanset om du løber din første kilometer eller din hundrede.
                </p>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <span className="text-xl mt-0.5">◆</span>
                  <div>
                    <div className="font-semibold text-[var(--color-primary)]">Dato & tid</div>
                    <div className="text-[var(--color-muted)]">1. august 2025 — kl. 12:00</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <span className="text-xl mt-0.5">◆</span>
                  <div>
                    <div className="font-semibold text-[var(--color-primary)]">Sted & parkering</div>
                    <div className="text-[var(--color-muted)]">Bøgely Haveforening ved Fælleshuset<br/>Bøgelyvej 11, Silkeborg</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <span className="text-xl mt-0.5">◆</span>
                  <div>
                    <div className="font-semibold text-[var(--color-primary)]">Pris</div>
                    <div className="text-[var(--color-muted)]">80 kr. — betal via MobilePay til <strong>+45 29 42 60 55</strong></div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <span className="text-xl mt-0.5">◆</span>
                  <div>
                    <div className="font-semibold text-[var(--color-primary)]">Depoter & forplejning</div>
                    <div className="text-[var(--color-muted)]">I målområdet vil der være væske og frisk frugt til alle deltagere. Der er depoter på ruterne.</div>
                  </div>
                </div>
              </div>

              {/* Registration CTA */}
              {registered ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                  <p className="text-lg font-semibold text-emerald-800">✦ Du er tilmeldt</p>
                  <p className="mt-1 text-sm text-emerald-600">Vi glæder os til at se dig den 1. august.</p>
                </div>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full gradient-accent text-white py-4 rounded-full text-lg font-semibold hover:opacity-90 transition shadow-lg shadow-[var(--color-accent)]/25 disabled:opacity-50"
                >
                  {loading ? "Tilmelder..." : user ? "Tilmeld dig nu" : "Log ind og tilmeld dig"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
