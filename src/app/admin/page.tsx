"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import type { EventWithSpots, RegistrationWithDetails } from "@/lib/types";
import Link from "next/link";

export default function AdminPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<EventWithSpots[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationWithDetails[]>([]);
  const [activeTab, setActiveTab] = useState<"events" | "registrations">("events");
  const [selectedEventFilter, setSelectedEventFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Event form state
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventWithSpots | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    address: "",
    latitude: "",
    longitude: "",
    distance: "",
    difficulty: "intermediate",
    price: "",
    max_spots: "100",
    tag: "",
    is_published: true,
  });

  const supabase = createClient();

  useEffect(() => {
    if (!authLoading && profile?.is_admin) {
      fetchData();
    }
  }, [authLoading, profile]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setLoading(true);

    // Fetch all events (admin can see unpublished)
    const { data: eventsData } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    // Get spot counts
    const { data: spotsData } = await supabase
      .from("events_with_spots")
      .select("id, spots_left, registered_count");

    const eventsWithSpots = (eventsData || []).map((e) => {
      const spots = spotsData?.find((s) => s.id === e.id);
      return { ...e, spots_left: spots?.spots_left ?? e.max_spots, registered_count: spots?.registered_count ?? 0 };
    });

    setEvents(eventsWithSpots as EventWithSpots[]);

    // Fetch all registrations with user + event info
    const { data: regsData } = await supabase
      .from("registrations")
      .select("*, profiles(*), events(*)")
      .order("created_at", { ascending: false });

    setRegistrations((regsData as RegistrationWithDetails[]) || []);
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      address: "",
      latitude: "",
      longitude: "",
      distance: "",
      difficulty: "intermediate",
      price: "",
      max_spots: "100",
      tag: "",
      is_published: true,
    });
    setEditingEvent(null);
  };

  const openEditForm = (event: EventWithSpots) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || "",
      date: new Date(event.date).toISOString().slice(0, 16),
      location: event.location,
      address: event.address || "",
      latitude: event.latitude?.toString() || "",
      longitude: event.longitude?.toString() || "",
      distance: event.distance || "",
      difficulty: event.difficulty || "intermediate",
      price: Math.floor(event.price / 100).toString(),
      max_spots: event.max_spots.toString(),
      tag: event.tag || "",
      is_published: event.is_published,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description || null,
      date: new Date(formData.date).toISOString(),
      location: formData.location,
      address: formData.address || null,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      distance: formData.distance || null,
      difficulty: formData.difficulty || null,
      price: parseInt(formData.price) * 100,
      max_spots: parseInt(formData.max_spots),
      tag: formData.tag || null,
      is_published: formData.is_published,
    };

    if (editingEvent) {
      await supabase.from("events").update(payload).eq("id", editingEvent.id);
    } else {
      await supabase.from("events").insert(payload);
    }

    resetForm();
    setShowForm(false);
    fetchData();
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette dette event?")) return;
    await supabase.from("events").delete().eq("id", id);
    fetchData();
  };

  const updateRegStatus = async (regId: string, status: string) => {
    await supabase.from("registrations").update({ status }).eq("id", regId);
    fetchData();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || !profile?.is_admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl">🔒</span>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Ingen adgang</h1>
          <p className="mt-2 text-[var(--color-muted)]">Du har ikke admin-rettigheder.</p>
          <Link href="/" className="mt-4 inline-block text-[var(--color-accent)] hover:underline font-medium">
            ← Tilbage til forsiden
          </Link>
        </div>
      </div>
    );
  }

  const filteredRegs = selectedEventFilter === "all"
    ? registrations
    : registrations.filter((r) => r.event_id === selectedEventFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-2xl">🏃</Link>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-[var(--color-muted)]">Kilometerklubben</p>
              </div>
            </div>
            <Link href="/" className="text-sm text-[var(--color-muted)] hover:text-gray-900 transition">
              ← Tilbage til sitet
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{events.length}</div>
            <div className="text-sm text-[var(--color-muted)]">Events</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">
              {registrations.filter((r) => r.status === "confirmed").length}
            </div>
            <div className="text-sm text-[var(--color-muted)]">Tilmeldinger</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="text-2xl font-bold text-[var(--color-accent)]">
              {registrations.filter((r) => r.status === "waitlist").length}
            </div>
            <div className="text-sm text-[var(--color-muted)]">Venteliste</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="text-2xl font-bold text-emerald-600">
              {events.filter((e) => e.is_published).length}
            </div>
            <div className="text-sm text-[var(--color-muted)]">Publicerede</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 max-w-xs">
          <button
            onClick={() => setActiveTab("events")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
              activeTab === "events" ? "bg-white text-gray-900 shadow-sm" : "text-[var(--color-muted)]"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab("registrations")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
              activeTab === "registrations" ? "bg-white text-gray-900 shadow-sm" : "text-[var(--color-muted)]"
            }`}
          >
            Tilmeldinger
          </button>
        </div>

        {/* Events tab */}
        {activeTab === "events" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Alle events</h2>
              <button
                onClick={() => { resetForm(); setShowForm(!showForm); }}
                className="gradient-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition"
              >
                {showForm ? "Annuller" : "+ Opret event"}
              </button>
            </div>

            {/* Event form */}
            {showForm && (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 mb-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingEvent ? "Rediger event" : "Nyt event"}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titel *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                      placeholder="Copenhagen Night Run"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dato & tid *</label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beskrivelse</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 resize-none"
                    placeholder="Beskriv eventet..."
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">By / Location *</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                      placeholder="København"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                      placeholder="Rådhuspladsen 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                    <input
                      type="text"
                      value={formData.distance}
                      onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                      placeholder="10 km"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                    <input
                      type="text"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                      placeholder="55.6761"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                    <input
                      type="text"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                      placeholder="12.5683"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pris (DKK) *</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                      placeholder="149"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max pladser *</label>
                    <input
                      type="number"
                      required
                      value={formData.max_spots}
                      onChange={(e) => setFormData({ ...formData, max_spots: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sværhedsgrad</label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                    >
                      <option value="beginner">Nybegynder</option>
                      <option value="intermediate">Mellem</option>
                      <option value="advanced">Avanceret</option>
                      <option value="ultra">Ultra</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                    <input
                      type="text"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                      placeholder="Populær"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="rounded accent-[var(--color-accent)]"
                    id="is_published"
                  />
                  <label htmlFor="is_published" className="text-sm text-gray-700">Publicer event (synligt for brugere)</label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="gradient-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition">
                    {editingEvent ? "Opdater event" : "Opret event"}
                  </button>
                  <button type="button" onClick={() => { resetForm(); setShowForm(false); }} className="px-6 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
                    Annuller
                  </button>
                </div>
              </form>
            )}

            {/* Events table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-muted)]">Event</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-muted)]">Dato</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-muted)]">Sted</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-muted)]">Pris</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-muted)]">Tilmeldte</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-muted)]">Status</th>
                      <th className="text-right px-4 py-3 font-medium text-[var(--color-muted)]">Handlinger</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{event.title}</div>
                          <div className="text-xs text-[var(--color-muted)]">{event.distance}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {new Date(event.date).toLocaleDateString("da-DK", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{event.location}</td>
                        <td className="px-4 py-3 text-gray-600">{Math.floor(event.price / 100)} kr</td>
                        <td className="px-4 py-3">
                          <span className="font-medium">{event.registered_count}</span>
                          <span className="text-[var(--color-muted)]">/{event.max_spots}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            event.is_published ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                          }`}>
                            {event.is_published ? "Publiceret" : "Kladde"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => openEditForm(event)}
                            className="text-[var(--color-accent)] hover:underline text-xs font-medium mr-3"
                          >
                            Rediger
                          </button>
                          <button
                            onClick={() => deleteEvent(event.id)}
                            className="text-red-500 hover:underline text-xs font-medium"
                          >
                            Slet
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Registrations tab */}
        {activeTab === "registrations" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Alle tilmeldinger</h2>
              <select
                value={selectedEventFilter}
                onChange={(e) => setSelectedEventFilter(e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
              >
                <option value="all">Alle events</option>
                {events.map((e) => (
                  <option key={e.id} value={e.id}>{e.title}</option>
                ))}
              </select>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-muted)]">Deltager</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-muted)]">Email</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-muted)]">Event</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-muted)]">Status</th>
                      <th className="text-left px-4 py-3 font-medium text-[var(--color-muted)]">Dato</th>
                      <th className="text-right px-4 py-3 font-medium text-[var(--color-muted)]">Handlinger</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-[var(--color-muted)]">
                          Ingen tilmeldinger endnu
                        </td>
                      </tr>
                    ) : (
                      filteredRegs.map((reg) => (
                        <tr key={reg.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              {reg.profiles?.avatar_url ? (
                                <img src={reg.profiles.avatar_url} alt="" className="w-7 h-7 rounded-full" />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-xs font-bold">
                                  {(reg.profiles?.full_name || "?")[0].toUpperCase()}
                                </div>
                              )}
                              <span className="font-medium text-gray-900">{reg.profiles?.full_name || "Ukendt"}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{reg.profiles?.email}</td>
                          <td className="px-4 py-3 text-gray-600">{reg.events?.title}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              reg.status === "confirmed" ? "bg-emerald-50 text-emerald-700" :
                              reg.status === "waitlist" ? "bg-amber-50 text-amber-700" :
                              "bg-red-50 text-red-700"
                            }`}>
                              {reg.status === "confirmed" ? "Bekræftet" : reg.status === "waitlist" ? "Venteliste" : "Annulleret"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {new Date(reg.created_at).toLocaleDateString("da-DK", { day: "numeric", month: "short" })}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {reg.status === "confirmed" && (
                              <button
                                onClick={() => updateRegStatus(reg.id, "cancelled")}
                                className="text-red-500 hover:underline text-xs font-medium"
                              >
                                Annuller
                              </button>
                            )}
                            {reg.status === "cancelled" && (
                              <button
                                onClick={() => updateRegStatus(reg.id, "confirmed")}
                                className="text-emerald-600 hover:underline text-xs font-medium"
                              >
                                Genaktiver
                              </button>
                            )}
                            {reg.status === "waitlist" && (
                              <button
                                onClick={() => updateRegStatus(reg.id, "confirmed")}
                                className="text-emerald-600 hover:underline text-xs font-medium"
                              >
                                Bekræft
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
