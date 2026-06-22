import { pasos } from "@/data/content";

export default function ComoFunciona() {
  return (
    <section className="py-20 px-6 bg-ants-surface">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-ants-ink mb-12">
          Cómo funciona
        </h2>
        <div className="flex flex-col md:flex-row gap-10 md:gap-0">
          {pasos.map((paso, i) => (
            <div key={paso.numero} className="flex-1 relative text-center px-4">
              <div className="relative z-10 mx-auto w-10 h-10 rounded-full bg-ants-surface border-2 border-ants-amarillo flex items-center justify-center font-bold text-ants-ink mb-3">
                {paso.numero}
              </div>
              <h3 className="font-semibold text-ants-ink mb-1">{paso.titulo}</h3>
              <p className="text-sm text-ants-ink-muted">{paso.descripcion}</p>
              {i < pasos.length - 1 && (
                <div
                  aria-hidden
                  className="hidden md:block absolute top-5 left-1/2 w-full border-t-2 border-dashed border-ants-menta"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
