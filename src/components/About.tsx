export default function About() {
  return (
    <section id="om-os" className="py-24 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-widest">
              Om Kilometerklubben
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-[var(--color-primary)] tracking-tight leading-tight">
              Skabt af{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)]">
                kærlighed
              </span>{" "}
              til løb
            </h2>
            <div className="mt-6 space-y-4 text-[var(--color-muted)] leading-relaxed text-lg">
              <p>
                Hej — jeg hedder <strong className="text-[var(--color-primary)]">Frida</strong>, og jeg elsker at løbe. 
                Ikke for tider eller præstationer, men for følelsen af frisk luft, naturens stilhed 
                og den energi man får af at bevæge sig sammen med andre.
              </p>
              <p>
                Kilometerklubben er mit forsøg på at skabe et rum, hvor det handler om mere end 
                kilometerne. Det handler om fællesskabet. Om at møde nye mennesker, dele en tur i 
                skoven og gå hjem med et smil og måske et nyt venskab.
              </p>
              <p>
                Vi er helt nye — dette er starten på noget, vi håber kan vokse. Alle er velkomne, 
                uanset om du aldrig har løbet før, eller om du har hundredvis af kilometer i benene. 
                Der er ingen krav — bare lyst.
              </p>
            </div>
            <p className="mt-8 text-sm text-[var(--color-muted)] italic">
              ✦ Bevægelse · Fællesskab · Livsglæde
            </p>
          </div>

          {/* Values */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-[var(--color-accent)]/20 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                <span className="text-[var(--color-accent)] text-lg">✦</span>
              </div>
              <h3 className="font-bold text-[var(--color-primary)]">Fællesskab først</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                Vi løber sammen — ikke mod hinanden. Her er plads til alle tempi og alle niveauer.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-[var(--color-accent)]/20 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                <span className="text-[var(--color-accent)] text-lg">◆</span>
              </div>
              <h3 className="font-bold text-[var(--color-primary)]">Nyd naturen</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                Silkeborgs skove og søer er vores løberuter. Frisk luft og smukke stier.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-[var(--color-accent)]/20 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                <span className="text-[var(--color-accent)] text-lg">◈</span>
              </div>
              <h3 className="font-bold text-[var(--color-primary)]">Nye venskaber</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                Mød nye mennesker der deler din passion. De bedste samtaler sker undervejs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-[var(--color-accent)]/20 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                <span className="text-[var(--color-accent)] text-lg">✧</span>
              </div>
              <h3 className="font-bold text-[var(--color-primary)]">Flotte medaljer</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                Alle deltagere modtager en unik, hånddesignet medalje som minde om dagen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
