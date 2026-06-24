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

type StackItem = {
  nombre: string;
  icon: { path: string } | null;
};

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

function StackPill({ item }: { item: StackItem }) {
  return (
    <div className="shrink-0 flex items-center gap-2 rounded-full border border-ants-border bg-ants-bg px-4 py-2 text-sm font-medium text-ants-ink-muted">
      {item.icon && (
        <svg role="img" viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
          <path d={item.icon.path} />
        </svg>
      )}
      {item.nombre}
    </div>
  );
}

export default function StackTecnologico() {
  const items = [...STACK, ...STACK];

  return (
    <section className="py-16 bg-ants-surface overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center mb-10">
        <h2 className="text-xl md:text-2xl font-bold text-ants-ink mb-2">Stack tecnológico</h2>
        <p className="text-sm text-ants-ink-muted">
          Tecnologías y herramientas que integramos para construir tus sistemas de venta.
        </p>
      </div>

      <div className="group overflow-hidden">
        <div className="flex gap-3 animate-marquee will-change-transform group-hover:[animation-play-state:paused]">
          {items.map((item, i) => (
            <StackPill key={`${item.nombre}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
