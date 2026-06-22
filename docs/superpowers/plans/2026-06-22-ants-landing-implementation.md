# ANTS Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the ANTS one-page marketing/lead-gen site (Next.js + Tailwind + Framer Motion) per `docs/superpowers/specs/2026-06-22-ants-landing-design.md`, ending with a public Vercel URL.

**Architecture:** Single Next.js App Router project at the repo root (`E:\CLAUDE\Ants`). One route (`/`) assembled from independent section components. All copy lives in one data file (`src/data/content.ts`). A single API route handles the contact form via Resend. No automated test suite (explicit spec decision) — each task is verified by running the dev server / build instead of unit tests.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Zod, Resend, react-hook-form not used (plain controlled state, keep deps minimal).

---

## File Structure

```
E:\CLAUDE\Ants\
  package.json, tsconfig.json, next.config.mjs, tailwind.config.ts, postcss.config.js
  .env.example
  public\
    protologo3.png          (ya existe — logo B/N de respaldo)
    Logo_street_art.png     (ya existe — referencia de marca)
    favicon.ico
  src\
    app\
      layout.tsx             (metadata, fonts, viewport)
      page.tsx                (ensambla todas las secciones)
      globals.css             (tailwind directives + base styles)
      sitemap.ts
      robots.ts
      api\
        contact\
          route.ts             (POST handler -> Resend)
    components\
      Logo.tsx
      Header.tsx
      WhatsappFab.tsx
      Hero.tsx
      Servicios.tsx
      ComoFunciona.tsx
      SobreNosotros.tsx
      Testimonios.tsx
      Contacto.tsx
      Footer.tsx
      Reveal.tsx               (wrapper de scroll-reveal con Framer Motion)
    data\
      content.ts                (todo el copy + datos editables)
    lib\
      validation.ts             (Zod schema compartido cliente/servidor)
  docs\
    EDITAR-EL-SITIO.md          (guía de edición no técnica)
```

---

### Task 1: Scaffold del proyecto Next.js

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.js`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `.gitignore` (ya existe, ajustar)

- [ ] **Step 1: Generar el proyecto base**

Run:
```bash
cd "E:\CLAUDE\Ants"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
```
Cuando pregunte si el directorio no está vacío (ya hay `docs/`, `protologo3.png`, etc.), confirmar que continúe igual.

- [ ] **Step 2: Instalar dependencias adicionales**

Run:
```bash
npm install framer-motion zod resend
```

- [ ] **Step 3: Mover el logo de referencia a `public/`**

```bash
cp "E:\CLAUDE\Ants\protologo3.png" "E:\CLAUDE\Ants\public\protologo3.png"
cp "E:\CLAUDE\Ants\Logo_street_art.png" "E:\CLAUDE\Ants\public\Logo_street_art.png"
```

- [ ] **Step 4: Verificar que el dev server levanta**

Run: `npm run dev`
Expected: servidor en `http://localhost:3000` mostrando la página default de Next.js, sin errores en consola.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold proyecto Next.js con Tailwind, Framer Motion, Zod y Resend"
```

---

### Task 2: Theme de marca en Tailwind

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Configurar colores de marca**

Reemplazar el contenido de `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "ants-bg": "#FAFAFC",
        "ants-surface": "#FFFFFF",
        "ants-ink": "#1A1A2E",
        "ants-ink-muted": "#5B5B6E",
        "ants-lila": "#C4B5FD",
        "ants-menta": "#5EEAD4",
        "ants-amarillo": "#FFD60A",
        "ants-verde": "#34D399",
        "ants-border": "#ECECF2",
      },
      fontFamily: {
        graffiti: ["var(--font-graffiti)", "cursive"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Base styles**

Reemplazar el contenido de `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #FAFAFC;
  color: #1A1A2E;
}
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: build completa sin errores de TypeScript ni de Tailwind.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: theme de colores de marca ANTS en Tailwind"
```

---

### Task 3: Datos de contenido centralizados

**Files:**
- Create: `src/data/content.ts`

- [ ] **Step 1: Crear el archivo de contenido**

```ts
// src/data/content.ts
// Editar este archivo para cambiar cualquier texto del sitio.
// No requiere tocar componentes ni JSX.

export const siteMeta = {
  title: "ANTS — Sistemas de venta inteligentes",
  description:
    "Creamos sistemas de venta inteligentes con tecnología IA, diseño profesional y psicología cognitiva.",
  url: "https://ants.example.com", // reemplazar cuando el dominio esté conectado
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
  {
    titulo: "Landing Pages",
    descripcion: "Diseño y copy orientado a conversión, no solo a estética.",
  },
  {
    titulo: "Automatización IA",
    descripcion: "Flujos que capturan y nutren leads mientras vos no estás.",
  },
  {
    titulo: "Diseño Gráfico UBA",
    descripcion: "Identidad visual con respaldo académico y mirada estratégica.",
  },
  {
    titulo: "Coaching PNL Certificado",
    descripcion: "Herramientas de venta y liderazgo basadas en psicología cognitiva.",
  },
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
  {
    texto: "Texto placeholder de testimonio de cliente real — reemplazar en src/data/content.ts.",
    nombre: "Nombre Apellido",
    empresa: "Empresa",
  },
  {
    texto: "Texto placeholder de testimonio de cliente real — reemplazar en src/data/content.ts.",
    nombre: "Nombre Apellido",
    empresa: "Empresa",
  },
  {
    texto: "Texto placeholder de testimonio de cliente real — reemplazar en src/data/content.ts.",
    nombre: "Nombre Apellido",
    empresa: "Empresa",
  },
];
```

- [ ] **Step 2: Verificar que TypeScript compila**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/data/content.ts
git commit -m "feat: datos de contenido centralizados de ANTS"
```

---

### Task 4: Fuentes de marca en layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Cargar las fuentes con next/font/google**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Luckiest_Guy } from "next/font/google";
import "./globals.css";
import { siteMeta } from "@/data/content";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const graffiti = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-graffiti",
});

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteMeta.url,
    siteName: "ANTS",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${sans.variable} ${graffiti.variable} font-sans bg-ants-bg text-ants-ink`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verificar build**

Run: `npm run build`
Expected: compila sin errores, las fuentes se descargan en build time sin warnings.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: cargar fuentes de marca (Inter + Luckiest Guy) en el layout"
```

---

### Task 5: Componente Logo (bubble-letter graffiti)

**Files:**
- Create: `src/components/Logo.tsx`

- [ ] **Step 1: Crear el componente**

Implementa la dirección de logo aprobada: letras alternadas menta/lila sobre badge circular amarillo, contorno negro tinta, sombra tipo sticker, antena heredada del logo original sobre la "A". Acepta una prop `size` para reusarlo más chico en el header/footer y grande en el hero.

```tsx
// src/components/Logo.tsx
type LogoProps = {
  size?: number;
  showBadge?: boolean;
  className?: string;
};

const LETTER_COLORS = ["#C4B5FD", "#5EEAD4", "#C4B5FD", "#5EEAD4"]; // A N T S

export default function Logo({ size = 120, showBadge = true, className = "" }: LogoProps) {
  const letters = "ANTS".split("");

  const wordmark = (
    <div
      className={`relative inline-flex items-center font-graffiti select-none ${className}`}
      style={{
        fontSize: size * 0.32,
        letterSpacing: 1,
        transform: "rotate(-4deg)",
      }}
    >
      <span
        aria-hidden
        className="absolute rounded-full bg-ants-ink"
        style={{ width: size * 0.035, height: size * 0.035, top: -size * 0.06, left: size * 0.16 }}
      />
      <span
        aria-hidden
        className="absolute rounded-full bg-ants-ink"
        style={{ width: size * 0.035, height: size * 0.035, top: -size * 0.06, left: size * 0.26 }}
      />
      {letters.map((letter, i) => (
        <span
          key={`${letter}-${i}`}
          style={{
            color: LETTER_COLORS[i],
            WebkitTextStroke: `${Math.max(2, size * 0.02)}px #1A1A2E`,
            textShadow: [1, 2, 3, 4]
              .map((n) => `${n * 2}px ${n * 2}px 0 #1A1A2E`)
              .join(", "),
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );

  if (!showBadge) return wordmark;

  return (
    <div
      className="rounded-full bg-ants-amarillo flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      {wordmark}
      <span
        className="font-graffiti text-ants-ink"
        style={{ fontSize: size * 0.065, letterSpacing: 2, transform: "rotate(-2deg)" }}
      >
        CAMINO DE HORMIGAS
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Verificar visualmente**

Editar momentáneamente `src/app/page.tsx` para renderizar `<Logo size={300} />` solo, correr `npm run dev`, abrir `http://localhost:3000` y confirmar que se ve igual a la opción "2" validada en el companion visual (letras alternadas menta/lila, badge amarillo, antena sobre la A). Revertir el cambio temporal en `page.tsx` después de confirmar (Task 14 arma la página real).

- [ ] **Step 3: Commit**

```bash
git add src/components/Logo.tsx
git commit -m "feat: componente Logo bubble-letter graffiti"
```

---

### Task 6: Header/Nav + botón flotante de WhatsApp

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/WhatsappFab.tsx`

- [ ] **Step 1: Crear el Header**

Nav sticky, transparente arriba y blanco con sombra al hacer scroll (vía `useEffect` + `scroll` listener), menú hamburguesa en mobile.

```tsx
// src/components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { hero } from "@/data/content";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <a href="#" className="flex items-center">
          <Logo size={56} showBadge={false} />
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-ants-ink-muted">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-ants-ink transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden md:inline-block rounded-full bg-ants-ink text-white text-sm font-semibold px-5 py-2 hover:bg-ants-ink/90 transition-colors"
        >
          {hero.ctaPrimary}
        </a>

        <button
          aria-label="Abrir menú"
          className="md:hidden text-ants-ink"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-ants-border px-6 py-4 flex flex-col gap-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-ants-ink font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="rounded-full bg-ants-ink text-white text-sm font-semibold px-5 py-2 text-center"
            onClick={() => setMenuOpen(false)}
          >
            {hero.ctaPrimary}
          </a>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Crear el botón flotante de WhatsApp**

```tsx
// src/components/WhatsappFab.tsx
import { contact } from "@/data/content";

export default function WhatsappFab() {
  const message = encodeURIComponent("Hola ANTS! Quiero info sobre sus sistemas de venta.");
  return (
    <a
      href={`https://wa.me/${contact.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-105 transition-transform"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.27-1.38a9.9 9.9 0 0 0 4.77 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.06a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.13.82.84-3.05-.2-.31a8.15 8.15 0 0 1-1.25-4.29c0-4.51 3.67-8.18 8.18-8.18 4.51 0 8.18 3.67 8.18 8.18 0 4.51-3.67 8.18-8.18 8.18Z" />
      </svg>
    </a>
  );
}
```

- [ ] **Step 3: Verificar visualmente**

Importar ambos componentes momentáneamente en `src/app/page.tsx`, correr `npm run dev`, confirmar el header sticky cambia de transparente a blanco al scrollear y que el menú mobile abre/cierra en una ventana angosta (devtools responsive). Confirmar el FAB de WhatsApp abre `wa.me` con el mensaje precargado.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx src/components/WhatsappFab.tsx
git commit -m "feat: header sticky con menu mobile y boton flotante de WhatsApp"
```

---

### Task 7: Sección Hero

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/Hero.tsx
import { hero } from "@/data/content";

export default function Hero() {
  const [before, after] = hero.mantra.includes(hero.mantraHighlight)
    ? hero.mantra.split(hero.mantraHighlight)
    : [hero.mantra, ""];

  return (
    <section className="pt-32 pb-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-ants-ink">
          {before}
          <span className="bg-gradient-to-r from-ants-lila to-ants-menta bg-clip-text text-transparent">
            {hero.mantraHighlight}
          </span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-ants-ink-muted max-w-xl mx-auto">
          {hero.subheadline}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contacto"
            className="rounded-full bg-ants-ink text-white font-semibold px-7 py-3 hover:bg-ants-ink/90 transition-colors"
          >
            {hero.ctaPrimary}
          </a>
          <a
            href="#servicios"
            className="rounded-full border border-ants-ink text-ants-ink font-semibold px-7 py-3 hover:bg-ants-ink/5 transition-colors"
          >
            {hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar visualmente**

Renderizar `<Hero />` en `page.tsx` junto al `Header`, correr `npm run dev`, confirmar que el texto, el degradé lila→menta en la frase clave y los dos CTAs se ven y que los anchors `#contacto` / `#servicios` no rompen nada (las secciones destino aún no existen, es esperado).

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: seccion Hero con mantra y CTAs"
```

---

### Task 8: Sección Servicios

**Files:**
- Create: `src/components/Servicios.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/Servicios.tsx
import { servicios } from "@/data/content";

export default function Servicios() {
  return (
    <section id="servicios" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-ants-ink mb-12">
          Lo que hacemos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicios.map((servicio) => (
            <div
              key={servicio.titulo}
              className="rounded-2xl border border-ants-border bg-ants-surface p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ants-lila to-ants-menta mb-4" />
              <h3 className="font-semibold text-ants-ink mb-2">{servicio.titulo}</h3>
              <p className="text-sm text-ants-ink-muted">{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar visualmente**

Renderizar `<Servicios />` en `page.tsx`, correr `npm run dev`, confirmar el grid: 4 columnas en desktop, 2 en tablet, 1 en mobile (probar con devtools responsive).

- [ ] **Step 3: Commit**

```bash
git add src/components/Servicios.tsx
git commit -m "feat: seccion Servicios"
```

---

### Task 9: Sección Cómo funciona (3 pasos)

**Files:**
- Create: `src/components/ComoFunciona.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/ComoFunciona.tsx
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
              <div className="mx-auto w-10 h-10 rounded-full border-2 border-ants-amarillo flex items-center justify-center font-bold text-ants-ink mb-3">
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
```

- [ ] **Step 2: Verificar visualmente**

Renderizar `<ComoFunciona />` en `page.tsx`, confirmar el stepper horizontal en desktop (con línea punteada conectando los círculos) y vertical en mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/ComoFunciona.tsx
git commit -m "feat: seccion Como Funciona con 3 pasos"
```

---

### Task 10: Sección Sobre Nosotros

**Files:**
- Create: `src/components/SobreNosotros.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/SobreNosotros.tsx
import { sobreNosotros } from "@/data/content";

export default function SobreNosotros() {
  return (
    <section id="nosotros" className="py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="rounded-2xl bg-ants-surface border border-dashed border-ants-border h-64 flex items-center justify-center text-ants-ink-muted text-sm">
          Foto del equipo (reemplazar en public/)
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-ants-ink mb-4">Sobre nosotros</h2>
          <p className="text-ants-ink-muted mb-6">{sobreNosotros.texto}</p>
          <div className="flex flex-wrap gap-2">
            {sobreNosotros.badges.map((badge) => (
              <span
                key={badge}
                className="text-xs font-semibold border border-ants-lila text-ants-ink rounded-full px-3 py-1"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar visualmente**

Renderizar `<SobreNosotros />` en `page.tsx`, confirmar el layout de dos columnas en desktop y una columna apilada en mobile.

- [ ] **Step 3: Commit**

```bash
git add src/components/SobreNosotros.tsx
git commit -m "feat: seccion Sobre Nosotros"
```

---

### Task 11: Sección Testimonios

**Files:**
- Create: `src/components/Testimonios.tsx`

- [ ] **Step 1: Crear el componente**

Grid en desktop, scroll horizontal con snap en mobile (sin librería de carrusel).

```tsx
// src/components/Testimonios.tsx
import { testimonios } from "@/data/content";

export default function Testimonios() {
  return (
    <section id="testimonios" className="py-20 px-6 bg-ants-surface">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-ants-ink mb-12">
          Lo que dicen de nosotros
        </h2>
        <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto snap-x snap-mandatory pb-4 md:overflow-visible md:pb-0">
          {testimonios.map((testimonio, i) => (
            <div
              key={i}
              className="min-w-[80%] sm:min-w-[60%] md:min-w-0 snap-center rounded-2xl border border-ants-border bg-ants-bg p-6"
            >
              <p className="text-sm text-ants-ink-muted mb-4">&ldquo;{testimonio.texto}&rdquo;</p>
              <p className="text-sm font-semibold text-ants-ink">
                {testimonio.nombre}{" "}
                <span className="font-normal text-ants-ink-muted">— {testimonio.empresa}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar visualmente**

Renderizar `<Testimonios />` en `page.tsx`, confirmar grid de 3 columnas en desktop y scroll horizontal con snap en mobile (devtools responsive, deslizar con el mouse/touch).

- [ ] **Step 3: Commit**

```bash
git add src/components/Testimonios.tsx
git commit -m "feat: seccion Testimonios"
```

---

### Task 12: Validación compartida + API route de contacto

**Files:**
- Create: `src/lib/validation.ts`
- Create: `src/app/api/contact/route.ts`
- Modify: `.env.example`

- [ ] **Step 1: Schema de validación compartido**

```ts
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
```

- [ ] **Step 2: API route**

```ts
// src/app/api/contact/route.ts
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
    await resend.emails.send({
      from: "ANTS Web <onboarding@resend.dev>",
      to: contact.email,
      replyTo: email,
      subject: `Nuevo lead de ${nombre}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nWhatsApp: ${whatsapp}\n\nMensaje:\n${mensaje}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error enviando email de contacto", err);
    return NextResponse.json({ ok: false, error: "No se pudo enviar el mensaje" }, { status: 502 });
  }
}
```

- [ ] **Step 3: Documentar la variable de entorno**

```
# .env.example
RESEND_API_KEY=
```

- [ ] **Step 4: Verificar con un POST manual**

Run: `npm run dev`, en otra terminal:
```bash
curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d "{\"nombre\":\"Test\",\"email\":\"test@test.com\",\"whatsapp\":\"123456\",\"mensaje\":\"Hola\"}"
```
Expected (sin `RESEND_API_KEY` configurada todavía): `{"ok":false,"error":"No se pudo enviar el mensaje"}` con status 502 — confirma que la validación pasó y que el único punto que falta es la API key real de Resend (se configura en Vercel en el Task 17).

- [ ] **Step 5: Commit**

```bash
git add src/lib/validation.ts src/app/api/contact/route.ts .env.example
git commit -m "feat: validacion compartida y API route de contacto con Resend"
```

---

### Task 13: Sección Contacto (Calendly + formulario)

**Files:**
- Create: `src/components/Contacto.tsx`

- [ ] **Step 1: Crear el componente**

Formulario controlado, valida con el mismo `contactSchema` en cliente antes de pegarle a `/api/contact`, maneja estados `idle | sending | success | error`. Calendly se embebe como `<iframe>` apuntando a `contact.calendlyUrl` (más liviano y sin script externo que mantener; cuando el usuario tenga su cuenta real de Calendly, ese iframe ya funciona solo cambiando la URL en `content.ts`).

```tsx
// src/components/Contacto.tsx
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
```

- [ ] **Step 2: Verificar visualmente**

Renderizar `<Contacto />` en `page.tsx`, correr `npm run dev`, completar el formulario y confirmar que muestra el estado de error con el link a WhatsApp (esperado mientras `RESEND_API_KEY` no esté configurada — ver Task 17). Confirmar que el honeypot está oculto y no interfiere con el llenado normal.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contacto.tsx
git commit -m "feat: seccion Contacto con Calendly embebido y formulario"
```

---

### Task 14: Footer, ensamblado de page.tsx y SEO técnico

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

- [ ] **Step 1: Crear el Footer**

```tsx
// src/components/Footer.tsx
import Logo from "./Logo";
import { contact } from "@/data/content";

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-ants-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ants-ink-muted">
        <div className="flex items-center gap-2">
          <Logo size={36} showBadge={false} />
          <span>ANTS — Camino de Hormigas</span>
        </div>
        <div className="flex gap-4">
          <a href={`mailto:${contact.email}`} className="hover:text-ants-ink">
            {contact.email}
          </a>
          <a href={`https://wa.me/${contact.whatsapp}`} className="hover:text-ants-ink">
            {contact.whatsappDisplay}
          </a>
        </div>
        <span>© {new Date().getFullYear()} ANTS. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Ensamblar la página final**

```tsx
// src/app/page.tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import ComoFunciona from "@/components/ComoFunciona";
import SobreNosotros from "@/components/SobreNosotros";
import Testimonios from "@/components/Testimonios";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import WhatsappFab from "@/components/WhatsappFab";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Servicios />
        <ComoFunciona />
        <SobreNosotros />
        <Testimonios />
        <Contacto />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
```

- [ ] **Step 3: Sitemap y robots.txt**

```ts
// src/app/sitemap.ts
import { MetadataRoute } from "next";
import { siteMeta } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteMeta.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
```

```ts
// src/app/robots.ts
import { MetadataRoute } from "next";
import { siteMeta } from "@/data/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteMeta.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 4: Verificar la página completa**

Run: `npm run dev`, recorrer todas las secciones en `http://localhost:3000` de punta a punta en desktop y en vista mobile (devtools). Confirmar que los anchors del header navegan a la sección correcta.

Run: `npm run build`
Expected: build sin errores.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx src/app/page.tsx src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: footer, ensamblado de la pagina y sitemap/robots"
```

---

### Task 15: Animaciones suaves con Framer Motion

**Files:**
- Create: `src/components/Reveal.tsx`
- Modify: `src/components/Servicios.tsx`
- Modify: `src/components/ComoFunciona.tsx`
- Modify: `src/components/SobreNosotros.tsx`
- Modify: `src/components/Testimonios.tsx`

- [ ] **Step 1: Crear el wrapper de scroll-reveal**

```tsx
// src/components/Reveal.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Envolver el contenido de Servicios con Reveal por card**

En `src/components/Servicios.tsx`, importar `Reveal` y envolver cada card del `.map`, agregando un `delay` escalonado:

```tsx
import Reveal from "./Reveal";
// ...
{servicios.map((servicio, i) => (
  <Reveal key={servicio.titulo} delay={i * 0.08}>
    <div className="rounded-2xl border border-ants-border bg-ants-surface p-6 hover:shadow-md transition-shadow">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-ants-lila to-ants-menta mb-4" />
      <h3 className="font-semibold text-ants-ink mb-2">{servicio.titulo}</h3>
      <p className="text-sm text-ants-ink-muted">{servicio.descripcion}</p>
    </div>
  </Reveal>
))}
```

- [ ] **Step 3: Aplicar el mismo patrón en ComoFunciona, SobreNosotros y Testimonios**

En `ComoFunciona.tsx`, envolver cada `paso` del `.map` con `<Reveal delay={i * 0.12}>`. En `SobreNosotros.tsx`, envolver la columna de texto completa con `<Reveal>`. En `Testimonios.tsx`, envolver cada card del `.map` con `<Reveal delay={i * 0.08}>`. Mismo import `Reveal from "./Reveal"` en los tres.

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`, recorrer la página haciendo scroll lento y confirmar que cada sección aparece con un fade+slide suave al entrar en viewport, sin saltos ni animaciones agresivas.

- [ ] **Step 5: Commit**

```bash
git add src/components/Reveal.tsx src/components/Servicios.tsx src/components/ComoFunciona.tsx src/components/SobreNosotros.tsx src/components/Testimonios.tsx
git commit -m "feat: animaciones de scroll-reveal con Framer Motion"
```

---

### Task 16: Guía de edición no técnica + push a GitHub

**Files:**
- Create: `docs/EDITAR-EL-SITIO.md`

- [ ] **Step 1: Escribir la guía**

```md
# Cómo editar el sitio de ANTS

## Cambiar textos
Todo el texto del sitio (mantra, servicios, pasos, sobre nosotros, testimonios, WhatsApp, email, link de Calendly) está en un solo archivo:

`src/data/content.ts`

Abrilo, cambiá el texto entre comillas que quieras actualizar, guardá. No hace falta tocar ningún otro archivo.

## Cambiar imágenes y logos
Las imágenes van en la carpeta `public/`. Para reemplazar una imagen, subí el archivo nuevo con el mismo nombre (o cambiá la referencia en el componente que la usa).

El logo es un componente de código (`src/components/Logo.tsx`), no una imagen — así se ve nítido en cualquier tamaño. Si querés cambiar los colores del logo, son las dos primeras líneas del archivo (`LETTER_COLORS`).

## Cambiar colores de marca
Los colores están centralizados en `tailwind.config.ts`, dentro de `colors`. Cambiá el valor hexadecimal de `ants-lila`, `ants-menta`, `ants-amarillo`, etc. y se actualiza en todo el sitio.

## Publicar los cambios (redeploy)
1. Guardá los archivos que editaste.
2. En la terminal, dentro de la carpeta del proyecto:
   ```bash
   git add -A
   git commit -m "Actualizo contenido del sitio"
   git push
   ```
3. Vercel detecta el push a `main` y republica el sitio solo, en 1-2 minutos. No hace falta hacer nada más.

Si en algún momento preferís no usar la terminal, también podés editar el archivo directo en GitHub.com (botón de lápiz) y confirmar el cambio ahí — dispara el mismo redeploy automático.
```

- [ ] **Step 2: Crear el repo remoto y pushear**

Esto requiere que el usuario tenga un repo de GitHub creado (o se crea acá con `gh`):

```bash
cd "E:\CLAUDE\Ants"
gh repo create ants-landing --private --source=. --remote=origin
git add -A
git commit -m "docs: guia de edicion no tecnica del sitio"
git push -u origin main
```

- [ ] **Step 3: Confirmar**

Run: `git remote -v`
Expected: `origin` apunta al repo recién creado en GitHub.

---

### Task 17: Deploy a Vercel

**Files:**
- No crea archivos de código; configuración de infraestructura.

- [ ] **Step 1: Conectar el repo a Vercel**

```bash
npx vercel login
npx vercel link
```
Seguir el flujo interactivo (seleccionar/crear el proyecto "ants-landing").

- [ ] **Step 2: Configurar la variable de entorno de Resend**

```bash
npx vercel env add RESEND_API_KEY production
```
Pegar la API key real de Resend cuando la pida (el usuario la genera gratis en resend.com con su email).

- [ ] **Step 3: Deploy a producción**

```bash
npx vercel --prod
```
Expected: el comando termina mostrando una URL pública tipo `https://ants-landing-xxxx.vercel.app`.

- [ ] **Step 4: Verificar en la URL pública**

Abrir la URL devuelta, recorrer todas las secciones, probar el formulario de contacto (ahora con `RESEND_API_KEY` real debería enviar el email a masiokas@gmail.com) y el botón de WhatsApp.

- [ ] **Step 5: Entregar el link al usuario**

Pasarle la URL pública de Vercel para que la pueda mostrar desde cualquier lado. Aclarar que cuando compre el dominio en Hostinger, conectarlo es: agregar el dominio en el dashboard de Vercel (Settings → Domains) y apuntar los DNS de Hostinger según las instrucciones que Vercel muestra ahí mismo.

