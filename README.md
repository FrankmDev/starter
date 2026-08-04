# Astro starter

Base estática, mínima y reutilizable para crear webs con Astro. Incluye solo la
infraestructura que todas las webs necesitan: TypeScript estricto, Tailwind 4,
tokens globales, layout accesible, SEO, sitemap, robots, JSON-LD seguro, CSP
nativo, formato y validación.

El starter se mantiene deliberadamente neutral. No trae diseño de marca,
componentes comerciales, contenido de ejemplo ni decisiones que pertenezcan a
un proyecto concreto.

## Principios

- Astro estático, HTML semántico y comportamiento nativo por defecto.
- Cero JavaScript cliente hasta que una interacción real lo necesite.
- Tailwind para composición; tokens y reglas universales en `globals.css`.
- Dependencias nuevas solo cuando Astro o el navegador no resuelven la necesidad.
- Configuración y contenido no publicados hasta completar la inicialización.
- Trabajo directo en `main`, sin bots, ramas automáticas ni pull requests.

No incluye React/Vue/Svelte, CMS, auth, ecommerce, analytics, GTM, consent, i18n,
theme switch, motion, formularios, APIs, bases de datos, adapters, observabilidad,
Playwright, GitHub Actions, Dependabot, GitHub Pages ni configuración de deploy.

## Crear un proyecto

Convierte este repositorio en template una sola vez:

```bash
gh repo edit FrankmDev/starter --template
```

Crea un repositorio independiente y clónalo:

```bash
gh repo create FrankmDev/mi-proyecto \
  --private \
  --template FrankmDev/starter \
  --clone

cd mi-proyecto
git branch -M main
bun ci
bun run build
```

Usa `--public` cuando corresponda. `bun ci` instala exactamente las versiones de
`bun.lock` y falla si el manifiesto y el lock no coinciden.

Para crear únicamente una copia local:

```bash
bun create astro@latest mi-proyecto --template FrankmDev/starter
cd mi-proyecto
git branch -M main
bun ci
bun run build
```

## Inicializar la web

1. Completa el briefing de `START_HERE.md` solo con información confirmada.
2. Añade `references/` únicamente si existen referencias visuales reales.
3. Pide a la IA: `Inicializa este proyecto`.
4. Revisa el resultado renderizado y los documentos generados.
5. Publica cuando `bun run build` y `bun run audit` terminen correctamente.

Mientras `projectConfig.initialized` sea `false`, la web usa contenido neutro,
añade `noindex, nofollow`, bloquea el rastreo en `robots.txt` y no genera sitemap.
La inicialización completa:

- los valores runtime de `project.config.ts`;
- `docs/PROJECT.md` con producto, contenido, rutas, SEO y decisiones técnicas;
- `docs/DESIGN.md` con dirección visual y tokens;
- `src/styles/globals.css` con el sistema visual confirmado;
- solo las rutas, assets, componentes e integraciones que el proyecto necesita.

## Estructura

```text
project.config.ts       # valores runtime, navegación, SEO y textos universales
PROJECT_START.md        # contrato de inicialización para la IA
START_HERE.md           # briefing breve para una web nueva
docs/
  PROJECT.md            # decisiones del proyecto una vez inicializado
  DESIGN.md             # decisiones visuales una vez inicializado
  templates/            # estructura fuente de ambos documentos
scripts/
  validate-config.ts    # impide publicar configuración incompleta o insegura
src/
  components/           # primitivas reutilizables, SEO y JSON-LD
  layouts/              # documento HTML y landmarks compartidos
  pages/                # rutas estáticas, 404 y robots
  styles/               # tokens y reglas globales
```

`src/assets/` se crea cuando haya imágenes o fuentes locales optimizables.
`public/` se crea solo para archivos que deban copiarse sin procesamiento. No se
mantienen carpetas vacías ni arquitectura especulativa.

## Dependencias

Solo hay nueve dependencias directas, agrupadas por una responsabilidad real:

| Responsabilidad     | Paquetes                                                           |
| ------------------- | ------------------------------------------------------------------ |
| Generación estática | `astro`, `@astrojs/sitemap`                                        |
| Estilos             | `tailwindcss`, `@tailwindcss/vite`                                 |
| Diagnósticos        | `typescript`, `@astrojs/check`                                     |
| Formato             | `prettier`, `prettier-plugin-astro`, `prettier-plugin-tailwindcss` |

Los paquetes transitivos proceden de estas herramientas oficiales: compilador,
Vite, optimización de imágenes, language server y binarios de Tailwind. No hay
framework cliente, librería de componentes ni dependencia de runtime añadida por
conveniencia.

## Scripts

```bash
bun run dev           # desarrollo local
bun run check         # configuración peligrosa + diagnósticos de Astro
bun run build         # check + build estático de producción
bun run preview       # sirve el resultado de dist/
bun run format        # aplica Prettier y ordena clases Tailwind
bun run format:check  # comprueba formato sin escribir
bun run audit         # falla ante advisories de severidad alta
```

## Reglas de implementación

- Usa componentes `.astro` y rendering estático salvo necesidad confirmada.
- Usa `astro:assets` para media local. Elige `layout="constrained"` para imágenes
  responsivas normales, `layout="full-width"` para media realmente fluida y
  tamaño fijo para logos o iconos fijos. Reserva `priority` para la imagen LCP.
- Mantén el contenido largo dentro de `Container size="reading"`; usa el
  contenedor general para composiciones amplias.
- Conserva landmarks, jerarquía de headings, labels, alt, navegación por teclado,
  foco visible, contraste, reflow y reduced motion.
- Amplía la CSP al añadir un origen externo; nunca la desactives para resolver una
  integración.
- No añadas adapters ni `vercel.json` para una web estática. Vercel puede compilar
  y publicar el resultado de Astro sin ellos. Un adapter solo se justifica si el
  proyecto adopta rendering bajo demanda.

## Mantenimiento

No hay Dependabot ni automatizaciones que creen ramas. El mantenimiento es
manual e intencional:

```bash
bun outdated
bun update
bun run format
bun run format:check
bun run build
bun run audit
git push origin main
```

No actualices un major sin revisar su guía de migración. TypeScript se mantiene en
la última versión compatible con `@astrojs/check`. En este repositorio plantilla,
mantén `projectConfig.initialized: false`.
