"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function NextEvent() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    // Get the first published event
    const { data: events } = await supabase
      .from("events_with_spots")
      .select("id")
      .eq("is_published", true)
      .order("date", { ascending: true })
      .limit(1);

    if (!events || events.length === 0) {
      setError("Ingen aktive events fundet.");
      setLoading(false);
      return;
    }

    // Insert registration with contact info (no login required)
    const { error: regError } = await supabase.from("registrations").insert({
      event_id: events[0].id,
      participant_name: form.name,
      participant_email: form.email,
      participant_phone: form.phone,
      status: "confirmed",
    });

    if (regError) {
      if (regError.code === "23505") {
        setError("Denne email er allerede tilmeldt.");
      } else {
        setError("Noget gik galt — prøv igen.");
      }
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  };

  return (
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
                <span className="text-xl mt-0.5 text-[var(--color-accent)]">◆</span>
                <div>
                  <div className="font-semibold text-[var(--color-primary)]">Dato & tid</div>
                  <div className="text-[var(--color-muted)]">1. august 2025 — kl. 12:00</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                <span className="text-xl mt-0.5 text-[var(--color-accent)]">◆</span>
                <div>
                  <div className="font-semibold text-[var(--color-primary)]">Sted & parkering</div>
                  <div className="text-[var(--color-muted)]">Bøgely Haveforening ved Fælleshuset<br/>Bøgelyvej 11, Silkeborg</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                <span className="text-xl mt-0.5 text-[var(--color-accent)]">◆</span>
                <div>
                  <div className="font-semibold text-[var(--color-primary)]">Pris</div>
                  <div className="text-[var(--color-muted)]">80 kr. — betal via MobilePay til <strong>+45 29 42 60 55</strong></div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                <span className="text-xl mt-0.5 text-[var(--color-accent)]">◆</span>
                <div>
                  <div className="font-semibold text-[var(--color-primary)]">Depoter & forplejning</div>
                  <div className="text-[var(--color-muted)]">I målområdet vil der være væske og frisk frugt til alle deltagere. Der er depoter på ruterne.</div>
                </div>
              </div>
            </div>

            {/* Registration */}
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                <p className="text-lg font-semibold text-emerald-800">✦ Du er tilmeldt!</p>
                <p className="mt-1 text-sm text-emerald-600">Vi glæder os til at se dig den 1. august. Husk at betale 80 kr. via MobilePay til +45 29 42 60 55.</p>
              </div>
            ) : showForm ? (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <h4 className="text-lg font-bold text-[var(--color-primary)]">Tilmeld dig</h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Navn *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Dit fulde navn"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="din@email.dk"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefon *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+45 12 34 56 78"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)]"
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-accent text-white py-3.5 rounded-full text-base font-semibold hover:opacity-90 transition shadow-lg shadow-[var(--color-accent)]/25 disabled:opacity-50"
                >
                  {loading ? "Tilmelder..." : "Bekræft tilmelding"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition py-1"
                >
                  Annuller
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="w-full gradient-accent text-white py-4 rounded-full text-lg font-semibold hover:opacity-90 transition shadow-lg shadow-[var(--color-accent)]/25"
              >
                Tilmeld dig nu
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
