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
