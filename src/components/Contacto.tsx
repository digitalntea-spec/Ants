"use client";

import { FormEvent, useState } from "react";
import { contact } from "@/data/content";
import { contactSchema } from "@/lib/validation";

type Status = "idle" | "sending" | "success" | "error";

export default function Contacto() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      nombre: String(form.get("nombre") || ""),
      email: String(form.get("email") || ""),
      whatsapp: String(form.get("whatsapp") || ""),
      mensaje: String(form.get("mensaje") || ""),
      honeypot: String(form.get("empresa_web") || ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setStatus("error");
      setErrorMsg(Object.values(parsed.error.flatten().fieldErrors)[0]?.[0] ?? "Revisá el formulario");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setErrorMsg("No pudimos enviar tu mensaje. Escribinos directo por WhatsApp mientras lo resolvemos.");
    }
  }

  return (
    <section id="contacto" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-ants-ink mb-12">
          Agendá tu diagnóstico
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <iframe
            title="Calendly"
            src={contact.calendlyUrl}
            className="w-full h-[480px] rounded-2xl border border-ants-border"
          />

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="empresa_web"
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
              aria-hidden
            />
            <input
              name="nombre"
              placeholder="Nombre"
              required
              className="w-full rounded-lg border border-ants-border px-4 py-3 text-sm"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-lg border border-ants-border px-4 py-3 text-sm"
            />
            <input
              name="whatsapp"
              placeholder="WhatsApp"
              required
              className="w-full rounded-lg border border-ants-border px-4 py-3 text-sm"
            />
            <textarea
              name="mensaje"
              placeholder="Contanos sobre tu negocio"
              required
              rows={4}
              className="w-full rounded-lg border border-ants-border px-4 py-3 text-sm"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-ants-ink text-white font-semibold px-6 py-3 disabled:opacity-50"
            >
              {status === "sending" ? "Enviando..." : "Enviar"}
            </button>

            {status === "success" && (
              <p className="text-sm text-ants-verde">¡Listo! Te respondemos a la brevedad.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600">
                {errorMsg}{" "}
                <a href={`https://wa.me/${contact.whatsapp}`} className="underline">
                  Escribinos por WhatsApp
                </a>
                .
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
