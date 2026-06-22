// src/components/Servicios.tsx
import { servicios } from "@/data/content";

export default function Servicios() {
  return (
    <section id="servicios" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-ants-ink mb-12">
          Lo que hacemos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicios.map((servicio) => (
            <div
              key={servicio.titulo}
              className="rounded-2xl border border-ants-border bg-ants-surface p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ants-lila to-ants-menta mb-4" />
              <h3 className="font-semibold text-ants-ink mb-2">{servicio.titulo}</h3>
              <p className="text-sm text-ants-ink-muted">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
