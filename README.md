# Astro starter

Starter estático y mínimo con Astro, TypeScript estricto, Tailwind 4, tokens
globales, SEO, sitemap, robots, JSON-LD seguro, CSP nativo, accesibilidad base,
Prettier y CI reproducible.

No incluye frameworks cliente, CMS, auth, ecommerce, analytics, consent, i18n,
theme switch, motion, forms, APIs, base de datos, adapters, observability,
Playwright ni componentes comerciales. Todo eso se añade solo cuando el proyecto
lo necesita.

## Crear un proyecto

Marca este repositorio como template una sola vez:

```bash
gh repo edit FrankmDev/starter --template
```

Crea un repositorio nuevo con historial independiente y clónalo:

```bash
gh repo create FrankmDev/mi-proyecto \
  --private \
  --template FrankmDev/starter \
  --clone

cd mi-proyecto
bun ci
bun run build
```

Usa `--public` si corresponde. Para una copia únicamente local:

```bash
bun create astro@latest mi-proyecto --template FrankmDev/starter
```

## Inicializar con IA

1. Completa el briefing breve de `START_HERE.md`.
2. Añade una carpeta `references/` solo si tienes referencias visuales.
3. Pide: `Inicializa este proyecto`.

La IA completará la configuración runtime, `docs/PROJECT.md`,
`docs/DESIGN.md`, los tokens globales y únicamente las rutas y capacidades
confirmadas.

## Scripts

```bash
bun run dev
bun run check
bun run build
bun run preview
bun run format
bun run format:check
bun run audit
```

`check` valida únicamente la configuración peligrosa y ejecuta los diagnósticos
de Astro. `build` ejecuta `check` y el build de producción. El formato se
comprueba en CI, no en cada build local.

## Estructura mínima

```text
docs/                 # PROJECT, DESIGN y sus dos templates
scripts/              # validator pequeño de configuración runtime
src/components/       # Container, SEO y JsonLd
src/layouts/          # BaseLayout
src/pages/            # home, 404 y robots
src/styles/           # tokens y reglas globales
```

## Mantenimiento

Dependabot revisa dependencias semanalmente. Para mantenimiento manual:

```bash
bun outdated
bun update
bun run format
bun run build
bun run audit
```

Revisa las migraciones antes de actualizar majors y mantén
`projectConfig.initialized: false` en la plantilla.
