import { sobreNosotros } from "@/data/content";
import Reveal from "./Reveal";

export default function SobreNosotros() {
  return (
    <section id="nosotros" className="py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="rounded-2xl bg-ants-surface border border-dashed border-ants-border h-64 flex items-center justify-center text-ants-ink-muted text-sm">
          Foto del equipo (reemplazar en public/)
        </div>
        <Reveal>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-ants-ink mb-4">Sobre nosotros</h2>
            <p className="text-ants-ink-muted mb-6">{sobreNosotros.texto}</p>
            <div className="flex flex-wrap gap-2">
              {sobreNosotros.badges.map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-semibold border border-ants-lila text-ants-ink rounded-full px-3 py-1"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
