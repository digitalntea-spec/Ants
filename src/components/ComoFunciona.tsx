"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { pasos } from "@/data/content";

const STEP_STYLES = [
  { badge: "bg-ants-lila", card: "border-ants-lila/30 hover:border-ants-lila/60" },
  { badge: "bg-ants-menta", card: "border-ants-menta/30 hover:border-ants-menta/60" },
  { badge: "bg-ants-amarillo", card: "border-ants-amarillo/30 hover:border-ants-amarillo/60" },
];

export default function ComoFunciona() {
  return (
    <section className="py-24 px-6 bg-ants-surface">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center text-ants-ink mb-16"
        >
          Cómo funciona
        </motion.h2>

        <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-0">
          {pasos.map((paso, i) => {
            const style = STEP_STYLES[i % STEP_STYLES.length];
            return (
              <Fragment key={paso.numero}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex-1 group"
                >
                  <div
                    className={`h-full rounded-2xl border-2 ${style.card} bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${style.badge} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="text-lg font-bold text-ants-ink">{paso.numero}</span>
                    </div>
                    <h3 className="font-bold text-ants-ink text-xl mb-3">{paso.titulo}</h3>
                    <p className="text-sm text-ants-ink-muted leading-relaxed">
                      {paso.descripcion}
                    </p>
                  </div>
                </motion.div>

                {i < pasos.length - 1 && (
                  <div className="hidden md:flex items-center justify-center px-3 shrink-0">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-ants-border"
                      aria-hidden
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
