// src/components/Hero.tsx
import { hero } from "@/data/content";

export default function Hero() {
  const [before] = hero.mantra.includes(hero.mantraHighlight)
    ? hero.mantra.split(hero.mantraHighlight)
    : [hero.mantra, ""];

  if (process.env.NODE_ENV !== "production" && !hero.mantra.includes(hero.mantraHighlight)) {
    console.warn(
      "hero.mantraHighlight debe ser una sub-cadena exacta de hero.mantra (src/data/content.ts), si no el degradé de color no se aplica."
    );
  }

  return (
    <section className="pt-32 pb-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-ants-ink">
          {before}
          <span className="bg-gradient-to-r from-ants-lila to-ants-menta bg-clip-text text-transparent">
            {hero.mantraHighlight}
          </span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-ants-ink-muted max-w-xl mx-auto">
          {hero.subheadline}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contacto"
            className="rounded-full bg-ants-ink text-white font-semibold px-7 py-3 hover:bg-ants-ink/90 transition-colors"
          >
            {hero.ctaPrimary}
          </a>
          <a
            href="#servicios"
            className="rounded-full border border-ants-ink text-ants-ink font-semibold px-7 py-3 hover:bg-ants-ink/5 transition-colors"
          >
            {hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
