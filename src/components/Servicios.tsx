import { servicios } from "@/data/content";

const ICON_BG = [
  "bg-ants-lila",
  "bg-ants-menta",
  "bg-ants-amarillo",
  "bg-ants-lila",
  "bg-ants-menta",
];

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
  const items = [...servicios, ...servicios];

  return (
    <section id="servicios" className="py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-ants-ink">
          Lo que hacemos
        </h2>
      </div>

      <div className="group overflow-hidden">
        <div className="flex gap-5 animate-marquee will-change-transform group-hover:[animation-play-state:paused]">
          {items.map((servicio, i) => {
            const idx = i % servicios.length;
            return (
              <div
                key={`${servicio.titulo}-${i}`}
                className="min-w-[260px] shrink-0 rounded-2xl border border-ants-border bg-ants-surface p-6 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-14 h-14 rounded-lg ${ICON_BG[idx % ICON_BG.length]} flex items-center justify-center mb-4`}
                >
                  <span
                    className="font-graffiti text-ants-ink text-xl"
                    style={{ letterSpacing: 1 }}
                  >
                    {getInitials(servicio.titulo)}
                  </span>
                </div>
                <h3 className="font-semibold text-ants-ink mb-2">{servicio.titulo}</h3>
                <p className="text-sm text-ants-ink-muted">{servicio.descripcion}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
