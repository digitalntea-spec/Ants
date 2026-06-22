import { testimonios } from "@/data/content";

export default function Testimonios() {
  return (
    <section id="testimonios" className="py-20 px-6 bg-ants-surface">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-ants-ink mb-12">
          Lo que dicen de nosotros
        </h2>
        <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto snap-x snap-mandatory pb-4 md:overflow-visible md:pb-0">
          {testimonios.map((testimonio, i) => (
            <div
              key={i}
              className="min-w-[80%] sm:min-w-[60%] md:min-w-0 snap-center rounded-2xl border border-ants-border bg-ants-bg p-6"
            >
              <p className="text-sm text-ants-ink-muted mb-4">&ldquo;{testimonio.texto}&rdquo;</p>
              <p className="text-sm font-semibold text-ants-ink">
                {testimonio.nombre}{" "}
                <span className="font-normal text-ants-ink-muted">— {testimonio.empresa}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
