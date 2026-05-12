export default function PracticalInfo() {
  return (
    <section id="praktisk" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-widest">
            Praktisk info
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-[var(--color-primary)] tracking-tight">
            Godt at vide
          </h2>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-gray-100">
            <h3 className="text-lg font-bold text-[var(--color-primary)] flex items-center gap-2">
              <span className="text-[var(--color-accent)]">◆</span> Sted & parkering
            </h3>
            <p className="mt-2 text-[var(--color-muted)] leading-relaxed">
              Bøgely Haveforening ved Fælleshuset, Bøgelyvej 11, Silkeborg. 
              Der er parkering i nærheden af Fælleshuset.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-gray-100">
            <h3 className="text-lg font-bold text-[var(--color-primary)] flex items-center gap-2">
              <span className="text-[var(--color-accent)]">◆</span> Depoter & forplejning
            </h3>
            <p className="mt-2 text-[var(--color-muted)] leading-relaxed">
              I målområdet vil der være væske og frisk frugt til alle deltagere. 
              Der er depoter på ruterne, så du kan tanke op undervejs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-gray-100">
            <h3 className="text-lg font-bold text-[var(--color-primary)] flex items-center gap-2">
              <span className="text-[var(--color-accent)]">◆</span> Medaljer
            </h3>
            <p className="mt-2 text-[var(--color-muted)] leading-relaxed">
              Der vil være smukke, hånddesignede medaljer til alle deltagere, der gennemfører løbet. 
              En fantastisk belønning for en fantastisk dag.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-gray-100">
            <h3 className="text-lg font-bold text-[var(--color-primary)] flex items-center gap-2">
              <span className="text-[var(--color-accent)]">◆</span> Betaling
            </h3>
            <p className="mt-2 text-[var(--color-muted)] leading-relaxed">
              Pris: <strong>80 kr.</strong> — betal nemt via MobilePay til{" "}
              <strong className="text-[var(--color-accent)]">+45 29 42 60 55</strong>
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200">
            <h3 className="text-lg font-bold text-amber-900 flex items-center gap-2">
              <span>◈</span> Ansvar
            </h3>
            <p className="mt-2 text-amber-800/80 leading-relaxed text-sm">
              Alle deltagere løber på eget ansvar. Løbsledelsen kan ikke stilles til ansvar for 
              skader eller uheld før, under og efter løbet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
