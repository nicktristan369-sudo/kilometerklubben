export default function Medals() {
  return (
    <section className="py-24 gradient-warm relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-widest">
            Medaljer
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Unikke medaljer til alle deltagere
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            Alle der gennemfører løbet modtager en hånddesignet medalje som minde om en fantastisk dag.
            Vores medaljer er noget helt særligt — designet med kærlighed til Silkeborg og fællesskabet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden bg-black/30 p-6 flex items-center justify-center">
            <img
              src="/images/medal-front.jpg"
              alt="Kilometerklubben medalje — forside"
              className="max-h-[500px] w-auto object-contain rounded-xl"
            />
          </div>
          <div className="rounded-2xl overflow-hidden bg-black/30 p-6 flex items-center justify-center">
            <img
              src="/images/medals-both.jpg"
              alt="Kilometerklubben medaljer — for- og bagside med bånd"
              className="max-h-[500px] w-auto object-contain rounded-xl"
            />
          </div>
        </div>

        <p className="mt-8 text-center text-white/40 text-sm">
          Fællesskab ✦ Livsglæde — Kilometerklubben, Silkeborg
        </p>
      </div>
    </section>
  );
}
