"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import RegistrationModal from "./RegistrationModal";
import type { EventWithSpots } from "@/lib/types";

const EMOJI_MAP: Record<string, string> = {
  "Populær": "🌃",
  "Trail": "🏔️",
  "Nybegynder": "⛵",
  "Ultra": "🔥",
};

export default function Events() {
  const [events, setEvents] = useState<EventWithSpots[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventWithSpots | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("events_with_spots")
        .select("*")
        .eq("is_published", true)
        .order("date", { ascending: true });

      if (data) setEvents(data as EventWithSpots[]);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const formatPrice = (priceOre: number) => `${Math.floor(priceOre / 100)} kr`;

  return (
    <section id="events" className="py-24 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider">
            Kalender
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Kommende events
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            Find dit næste løb og tilmeld dig i dag. Vi har events for alle niveauer.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-8 animate-pulse">
                <div className="h-6 bg-gray-100 rounded w-1/3 mb-4" />
                <div className="h-8 bg-gray-100 rounded w-2/3 mb-6" />
                <div className="h-4 bg-gray-100 rounded w-full mb-3" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => {
              const spotsPercent = ((event.max_spots - event.spots_left) / event.max_spots) * 100;
              const almostFull = event.spots_left < 20;

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          {event.tag && (
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                              {event.tag}
                            </span>
                          )}
                          {event.distance && (
                            <span className="text-xs font-medium text-[var(--color-muted)]">{event.distance}</span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[var(--color-accent)] transition">
                          {event.title}
                        </h3>
                      </div>
                      <span className="text-4xl">{EMOJI_MAP[event.tag || ""] || "🏃"}</span>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-sm text-[var(--color-muted)]">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(event.date).toLocaleDateString("da-DK", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </span>
                    </div>

                    {/* Spots bar */}
                    <div className="mt-5">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className={`font-medium ${almostFull ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"}`}>
                          {almostFull ? `Kun ${event.spots_left} pladser tilbage!` : `${event.spots_left} pladser ledige`}
                        </span>
                        <span className="text-[var(--color-muted)]">{event.max_spots} total</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all ${almostFull ? "bg-[var(--color-accent)]" : "bg-emerald-500"}`}
                          style={{ width: `${spotsPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">{formatPrice(event.price)}</span>
                        <span className="text-sm text-[var(--color-muted)]"> / person</span>
                      </div>
                      <button className="gradient-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition shadow-md shadow-[var(--color-accent)]/20">
                        Tilmeld dig →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <RegistrationModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}
