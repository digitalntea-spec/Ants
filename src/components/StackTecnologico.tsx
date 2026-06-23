import {
  siNextdotjs,
  siVercel,
  siResend,
  siTailwindcss,
  siFramer,
  siWhatsapp,
  siCalendly,
  siGoogleads,
  siMeta,
  siN8n,
} from "simple-icons";
import Reveal from "./Reveal";

type StackItem = {
  nombre: string;
  icon: { path: string } | null;
};

// OpenAI no tiene icono disponible en simple-icons (solo "OpenAI Gym", logo distinto) — se muestra solo el texto.
const STACK: StackItem[] = [
  { nombre: "Next.js", icon: siNextdotjs },
  { nombre: "Vercel", icon: siVercel },
  { nombre: "Resend", icon: siResend },
  { nombre: "Tailwind CSS", icon: siTailwindcss },
  { nombre: "Framer Motion", icon: siFramer },
  { nombre: "n8n", icon: siN8n },
  { nombre: "WhatsApp", icon: siWhatsapp },
  { nombre: "Calendly", icon: siCalendly },
  { nombre: "OpenAI", icon: null },
  { nombre: "Meta Ads", icon: siMeta },
  { nombre: "Google Ads", icon: siGoogleads },
];

export default function StackTecnologico() {
  return (
    <section className="py-16 px-6 bg-ants-surface">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold text-ants-ink mb-2">Stack tecnológico</h2>
        <p className="text-sm text-ants-ink-muted mb-10">
          Tecnologías y herramientas que integramos para construir tus sistemas de venta.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {STACK.map((item, i) => (
            <Reveal key={item.nombre} delay={i * 0.04}>
              <div className="flex items-center gap-2 rounded-full border border-ants-border bg-ants-bg px-4 py-2 text-sm font-medium text-ants-ink-muted">
                {item.icon && (
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current"
                    aria-hidden
                  >
                    <path d={item.icon.path} />
                  </svg>
                )}
                {item.nombre}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
