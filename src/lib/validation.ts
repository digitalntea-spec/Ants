// src/lib/validation.ts
import { z } from "zod";

export const contactSchema = z.object({
  nombre: z.string().min(2, "Decinos tu nombre").max(100),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(6, "Whatsapp inválido").max(20),
  mensaje: z.string().min(5, "Contanos un poco más").max(2000),
  honeypot: z.string().max(0).optional(), // campo invisible anti-spam, debe llegar vacío
});

export type ContactInput = z.infer<typeof contactSchema>;
