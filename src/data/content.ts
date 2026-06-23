// src/data/content.ts
// Editar este archivo para cambiar cualquier texto del sitio.
// No requiere tocar componentes ni JSX.

export const siteMeta = {
  title: "ANTS — Sistemas de venta inteligentes",
  description:
    "Creamos sistemas de venta inteligentes con tecnología IA, diseño profesional y psicología cognitiva.",
  url: "https://ants-landing.vercel.app", // reemplazar cuando el dominio propio esté conectado
};

export const contact = {
  whatsapp: "5491140784646", // formato internacional sin '+' ni espacios, para links wa.me
  whatsappDisplay: "+54 11 4078-4646",
  email: "masiokas@gmail.com",
  calendlyUrl: "https://calendly.com/PENDIENTE", // reemplazar con el link real
};

export const hero = {
  mantra: "Creamos sistemas de venta inteligentes",
  mantraHighlight: "sistemas de venta inteligentes",
  subheadline:
    "Landing pages, automatización IA, diseño gráfico UBA y coaching PNL certificado — todo coordinado para convertir como una colonia de hormigas.",
  ctaPrimary: "Agenda tu diagnóstico gratis",
  ctaSecondary: "Ver servicios",
};

export type Servicio = {
  titulo: string;
  descripcion: string;
};

export const servicios: Servicio[] = [
  { titulo: "Landing Pages", descripcion: "Diseño y copy orientado a conversión, no solo a estética." },
  { titulo: "Automatización IA", descripcion: "Flujos que capturan y nutren leads mientras vos no estás." },
  { titulo: "Diseño Gráfico UBA", descripcion: "Identidad visual con respaldo académico y mirada estratégica." },
  { titulo: "Coaching PNL Certificado", descripcion: "Herramientas de venta y liderazgo basadas en psicología cognitiva." },
];

export type Paso = {
  numero: number;
  titulo: string;
  descripcion: string;
};

export const pasos: Paso[] = [
  { numero: 1, titulo: "Diagnóstico", descripcion: "Auditamos tu embudo de ventas actual." },
  { numero: 2, titulo: "Sistema", descripcion: "Diseñamos y automatizamos el proceso completo." },
  { numero: 3, titulo: "Resultados", descripcion: "Medís leads y ventas reales, no vanity metrics." },
];

export const sobreNosotros = {
  texto:
    "Somos ANTS: creemos que una hormiga sola no construye nada, pero miles coordinadas mueven montañas. Por eso no vendemos tácticas sueltas — construimos sistemas donde IA, diseño y psicología trabajan juntos.",
  badges: ["Diseño UBA", "PNL Certificado", "IA Aplicada"],
};

export type Testimonio = {
  texto: string;
  nombre: string;
  empresa: string;
};

export const testimonios: Testimonio[] = [
  { texto: "Texto placeholder de testimonio de cliente real — reemplazar en src/data/content.ts.", nombre: "Nombre Apellido", empresa: "Empresa" },
  { texto: "Texto placeholder de testimonio de cliente real — reemplazar en src/data/content.ts.", nombre: "Nombre Apellido", empresa: "Empresa" },
  { texto: "Texto placeholder de testimonio de cliente real — reemplazar en src/data/content.ts.", nombre: "Nombre Apellido", empresa: "Empresa" },
];
