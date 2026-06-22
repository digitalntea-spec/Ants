# ANTS — Landing page: diseño

Fecha: 2026-06-22
Estado: pendiente de aprobación del usuario

## Resumen

Landing page de una sola página (one-pager) para ANTS, agencia de "sistemas de venta inteligentes" (landing pages, automatización IA, diseño gráfico, coaching PNL). Objetivo: generación de leads y agendamiento de llamadas. Ver decisiones de marca completas en `docs/brand/brand-guidelines.md`.

## Concepto creativo

"Camino de Hormigas": una hormiga sola no construye nada, miles coordinadas mueven montañas — metáfora directa de "sistemas" vs. tácticas sueltas. Dirección visual: street art / bubble-letter graffiti (logo) sobre un sitio por lo demás limpio, claro y premium — el logo aporta la energía urbana, el resto de la marca debe leerse profesional y confiable para sostener credibilidad B2B.

## Stack técnico

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion para animaciones suaves (scroll-reveal, fade/slide, hover states).
- **Backend**: una API route (`src/app/api/contact/route.ts`) que recibe el formulario de contacto, valida con Zod, y envía el lead por email vía Resend (tier gratuito, hasta 3000 emails/mes). Honeypot field para anti-spam, sin captcha de pago.
- **Agendamiento**: Calendly embebido vía script oficial — no requiere backend propio.
- **Contenido**: centralizado en `src/data/content.ts` (textos, servicios, testimonios, pasos) para edición sin tocar JSX. Colores de marca como variables nombradas en `tailwind.config.ts` (no hardcodeados).
- **Hosting/CI**: GitHub → Vercel, deploy automático en cada push a `main`. Dominio final se conecta vía DNS en Hostinger cuando el usuario lo compre (no bloquea el desarrollo).
- **Testing**: sin suite de tests automatizados (decisión explícita del usuario, priorizando bajo mantenimiento sobre cobertura — es un sitio de marketing de una página, no un producto con lógica compleja). Gate de calidad: TypeScript estricto + build de Vercel + checklist manual de QA (mobile/desktop/formulario/Calendly) antes de cada deploy a producción.

## Datos de contacto (definitivos)

- WhatsApp: +54 11 4078-4646
- Email: masiokas@gmail.com
- Calendly: pendiente de que el usuario provea el link de su cuenta (placeholder hasta entonces)

## Paleta y tema

Ver `docs/brand/brand-guidelines.md` para la tabla completa. Resumen: fondo claro (`#FAFAFC`), texto `#1A1A2E`, acentos lila `#C4B5FD` / menta `#5EEAD4`, badge/acento amarillo `#FFD60A` heredado del logo original. Sin modo oscuro ni switch día/noche (descartado por costo de mantenimiento).

## Estructura de secciones (orden de scroll)

1. **Header/Nav** — sticky, transparente arriba → blanco + sombra al hacer scroll. Logo + links ancla (Servicios, Nosotros, Testimonios, Contacto) + CTA "Agenda tu diagnóstico". Mobile: menú hamburguesa fullscreen. Botón flotante de WhatsApp fijo abajo-derecha, persistente en toda la página, con mensaje precargado.

2. **Hero** — H1 con el mantra (palabra clave destacada en lila/menta), subheadline, CTA primario ("Agenda tu diagnóstico gratis" → ancla `#contacto`) y secundario ("Ver servicios" → ancla `#servicios`). Entrada con fade + slide-up suave al cargar (no scroll-triggered, está above the fold).

3. **Servicios** — grid de 4 cards (Landing Pages, Automatización IA, Diseño Gráfico UBA, Coaching PNL Certificado): 4 columnas desktop, 2x2 tablet, 1 columna mobile. Data-driven desde `content.ts`. Hover lift sutil.

4. **Cómo funciona** (3 pasos) — Diagnóstico → Sistema → Resultados. Stepper horizontal desktop / vertical mobile, línea punteada conectando los números (acento amarillo), scroll-reveal escalonado.

5. **Sobre nosotros** — dos columnas (foto/placeholder + texto), badges de confianza (Diseño UBA, PNL Certificado, IA Aplicada), párrafo corto reforzando el mantra y el concepto "camino de hormigas".

6. **Testimonios** — grid de 3 cards en desktop; scroll horizontal con snap en mobile (sin librería de carrusel externa, para no sumar dependencias). Contenido placeholder hasta que el usuario provea testimonios reales.

7. **Contacto** — split: Calendly embebido (placeholder hasta tener el link real) a la izquierda + formulario corto de respaldo a la derecha (nombre, email, WhatsApp, mensaje). Envía a `/api/contact`. Estado de éxito/error inline sin recargar la página.

8. **Footer** — logo, links repetidos, WhatsApp/email de contacto, copyright, línea de texto con keywords para SEO.

## SEO

- Next.js Metadata API: title, description, Open Graph image (versión del logo/hero).
- `sitemap.xml` y `robots.txt` autogenerados (convención de Next.js).
- Jerarquía semántica de headings (un solo H1 en el hero, H2 por sección).
- `alt` descriptivo en todas las imágenes.
- Keywords naturales en el copy: "landing pages", "automatización con IA", "diseño gráfico", "coaching PNL certificado", integradas en oraciones reales, no como lista forzada.

## Manejo de errores

- Formulario: validación en cliente (campos requeridos, formato de email) y en servidor (Zod).
- Si falla el envío del email vía Resend: mensaje de error amable en el formulario + link directo a WhatsApp como alternativa inmediata.
- Errores de servidor quedan en logs de Vercel (incluidos en el plan gratuito, sin servicio de monitoreo adicional).

## Contenido pendiente del usuario (placeholders a reemplazar)

- Testimonios reales (texto, nombre, empresa/rol).
- Fotos del equipo / casos de trabajo (sección Sobre Nosotros, portfolio de diseño gráfico).
- Link real de Calendly.
- Dominio final (se conecta cuando el usuario lo compre en Hostinger).
- Logo final vectorizado (ver brand-guidelines.md — la versión de esta spec usa la aproximación con web font, pendiente de vectorización fiel a `Logo_street_art.png`).

## Cómo editar después del deploy (a documentar en detalle durante implementación)

- **Textos**: editar `src/data/content.ts`, commit y push a `main` → Vercel redeploya solo.
- **Imágenes/logos**: reemplazar archivos en `public/`, mismo flujo de commit y push.
- **Colores**: editar las variables de marca en `tailwind.config.ts`.
- **Redeploy manual**: `git push origin main` (o desde el dashboard de Vercel, botón "Redeploy").

Esta guía se expande a una guía paso a paso real (con capturas si hace falta) como parte de la entrega final, no solo en la spec.

## Fuera de alcance (explícitamente descartado)

- Modo oscuro / switch día-noche.
- Versión en inglés / sitio bilingüe.
- Suite de tests automatizados.
- CMS de pago o base de datos — todo el contenido vive en código.
