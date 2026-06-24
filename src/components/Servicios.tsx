import { servicios } from "@/data/content";
import Reveal from "./Reveal";

const ICON_BG = ["bg-ants-lila", "bg-ants-amarillo", "bg-ants-menta", "bg-ants-lila", "bg-ants-menta"];

const INICIALES_OVERRIDE: Record<string, string> = {
  "Diseño Gráfico UBA": "DG",
  "Coaching y PNL": "CO",
  "Marketing Digital": "MKT",
};

function getInitials(titulo: string) {
  if (INICIALES_OVERRIDE[titulo]) return INICIALES_OVERRIDE[titulo];
  return titulo
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function Servicios() {
  return (
    <section id="servicios" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-ants-ink mb-12">
          Lo que hacemos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
          {servicios.map((servicio, i) => (
            <Reveal key={servicio.titulo} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-ants-border bg-ants-surface p-6 hover:shadow-lg hover:-translate-y-2 hover:border-ants-lila/40 transition-all duration-300 cursor-default">
                <div
                  className={`w-14 h-14 rounded-lg ${ICON_BG[i % ICON_BG.length]} flex items-center justify-center mb-4`}
                >
                  <span className="font-graffiti text-ants-ink text-xl" style={{ letterSpacing: 1 }}>
                    {getInitials(servicio.titulo)}
                  </span>
                </div>
                <h3 className="font-semibold text-ants-ink mb-2">{servicio.titulo}</h3>
                <p className="text-sm text-ants-ink-muted">{servicio.descripcion}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
