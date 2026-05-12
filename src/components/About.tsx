const FEATURES = [
  {
    icon: "🗓️",
    title: "Kuraterede events",
    description: "Vi håndplukker de bedste ruter og lokationer, så du bare skal møde op og løbe.",
  },
  {
    icon: "📱",
    title: "Nem tilmelding",
    description: "Book din plads på under 30 sekunder. Bekræftelse direkte i din indbakke.",
  },
  {
    icon: "🗺️",
    title: "Detaljerede ruter",
    description: "Interaktive kort med elevation, vandposter og highlights langs ruten.",
  },
  {
    icon: "🤝",
    title: "Community",
    description: "Bliv en del af et fællesskab af passionerede løbere fra hele Danmark.",
  },
];

export default function About() {
  return (
    <section id="om-os" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <span className="text-[var(--color-accent)] font-semibold text-sm uppercase tracking-wider">
              Om Kilometerklubben
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Vi gør løb til en{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-pink-400">
                oplevelse
              </span>
            </h2>
            <p className="mt-6 text-lg text-[var(--color-muted)] leading-relaxed">
              Kilometerklubben er mere end bare løb. Vi organiserer unikke løbe-events på tværs af Danmark — fra
              natløb i storbyen til trail runs i nationalparker. Vores mission er at skabe uforglemmelige
              oplevelser der bringer løbere sammen.
            </p>
            <p className="mt-4 text-lg text-[var(--color-muted)] leading-relaxed">
              Uanset om du træner til dit første 5 km løb eller jagter en ny ultra-PR, har vi et event til dig.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[var(--color-surface)] border border-gray-100 hover:border-[var(--color-accent)]/20 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="mt-4 font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
