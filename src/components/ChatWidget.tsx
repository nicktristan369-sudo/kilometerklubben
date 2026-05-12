"use client";

import { useState, useEffect } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Show the bubble after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const text = `Hej Frida! Jeg hedder ${name}. ${message}`;
    const phone = "4529426055";
    
    // Direct navigation works on mobile (window.open gets blocked)
    window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    setMessageSent(true);
  };

  return (
    <>
      {/* Floating bubble hint */}
      {showBubble && !isOpen && (
        <div
          className="fixed bottom-24 right-4 sm:right-6 z-50 animate-in fade-in slide-in-from-bottom-4 cursor-pointer"
          onClick={() => { setIsOpen(true); setShowBubble(false); }}
        >
          <div className="bg-white rounded-2xl rounded-br-sm shadow-xl border border-gray-100 px-5 py-3.5 max-w-[260px]">
            <p className="text-sm text-gray-800 leading-snug">
              <strong>Hej!</strong> Har du lyst til at løbe med os? Skriv til mig ✦
            </p>
            <p className="text-xs text-[var(--color-muted)] mt-1">Frida — Kilometerklubben</p>
          </div>
          {/* Close bubble */}
          <button
            onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs transition"
          >
            ✕
          </button>
        </div>
      )}

      {/* Chat button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setShowBubble(false); }}
        className="fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 gradient-accent rounded-full shadow-lg shadow-[var(--color-accent)]/30 flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Skriv til os"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="gradient-accent px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                F
              </div>
              <div>
                <div className="text-white font-semibold text-sm">Frida</div>
                <div className="text-white/70 text-xs">Kilometerklubben · Silkeborg</div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            {messageSent ? (
              <div className="text-center py-4">
                <p className="text-lg font-semibold text-[var(--color-primary)]">Tak for din besked!</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">Frida vender tilbage hurtigst muligt.</p>
                <button
                  onClick={() => { setMessageSent(false); setName(""); setMessage(""); }}
                  className="mt-4 text-sm text-[var(--color-accent)] hover:underline font-medium"
                >
                  Skriv en ny besked
                </button>
              </div>
            ) : (
              <>
                {/* Chat bubble from Frida */}
                <div className="mb-5">
                  <div className="bg-[var(--color-surface)] rounded-2xl rounded-tl-sm px-4 py-3 inline-block max-w-[85%]">
                    <p className="text-sm text-[var(--color-primary)] leading-snug">
                      Hej! Jeg er Frida ✦<br />
                      Har du lyst til at løbe med os, eller har du spørgsmål? Skriv endelig!
                    </p>
                  </div>
                  <p className="text-[10px] text-[var(--color-muted)] mt-1 ml-1">Frida · Kilometerklubben</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSend} className="space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Dit navn"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)]"
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={3}
                    placeholder="Skriv din besked..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)] resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full gradient-accent text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition"
                  >
                    Send via WhatsApp
                  </button>
                  <a
                    href="tel:+4529426055"
                    className="block w-full text-center text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition py-1"
                  >
                    Eller ring direkte: +45 29 42 60 55
                  </a>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
