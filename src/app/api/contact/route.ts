import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";
import { contact } from "@/data/content";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Datos inválidos", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (parsed.data.honeypot) {
    // Bot detectado: respondemos OK sin enviar nada, para no delatar el honeypot.
    return NextResponse.json({ ok: true });
  }

  const { nombre, email, whatsapp, mensaje } = parsed.data;
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "ANTS Web <onboarding@resend.dev>",
      to: contact.formNotificationEmail,
      replyTo: email,
      subject: `Nuevo lead de ${nombre}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nWhatsApp: ${whatsapp}\n\nMensaje:\n${mensaje}`,
    });
    // El SDK de Resend no lanza excepcion en errores de la API (dominio no verificado,
    // destinatario no permitido en modo sandbox, etc.) - los devuelve en `error`.
    if (error) {
      console.error("Resend rechazo el envio de contacto", error);
      return NextResponse.json({ ok: false, error: "No se pudo enviar el mensaje" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error enviando email de contacto", err);
    return NextResponse.json({ ok: false, error: "No se pudo enviar el mensaje" }, { status: 502 });
  }
}
