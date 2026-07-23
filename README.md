# Starter personal de Astro

Base reutilizable y deliberadamente mínima para comenzar proyectos Astro sin volver a decidir estructura, estilos globales, SEO, imágenes, accesibilidad, documentación y validación.

## Qué incluye

- Astro estático y TypeScript en modo `strictest`.
- Tailwind CSS 4 mediante su plugin oficial de Vite.
- Un único sistema de tokens y reglas globales en `src/styles/globals.css`.
- Sitemap, canonical, robots, Open Graph y JSON-LD.
- Imágenes responsive con `astro:assets`.
- Layout base, skip link y primitivas neutrales.
- Configuración central en `project.config.ts`.
- Onboarding guiado para agentes mediante `AGENTS.md` y `PROJECT_START.md`.
- Gate local y de GitHub Actions con `check` + `build`.

No incluye React, CMS, analítica, ecommerce, proveedor de formularios, adaptador de despliegue, animaciones ni automatización de navegador. Se añaden únicamente cuando un proyecto los necesita.

## Publicar este starter en GitHub por primera vez

### Opción recomendada: GitHub CLI

Instala [GitHub CLI](https://cli.github.com/), inicia sesión y ejecuta desde esta carpeta:

```bash
git init -b main
git add .
git commit -m "chore: prepare Astro starter"
gh auth login
gh repo create TU_USUARIO/frnq-astro-starter --private --source=. --remote=origin --push
gh repo edit TU_USUARIO/frnq-astro-starter --template
```

Sustituye `TU_USUARIO` por tu usuario de GitHub. El último comando marca el repositorio como plantilla.

### Opción visual en github.com

1. Crea un repositorio vacío llamado `frnq-astro-starter`.
2. Sube esta carpeta siguiendo los comandos que GitHub muestra para un repositorio existente.
3. Abre `Settings`.
4. En `General`, activa `Template repository`.

No uses un fork como base de cada cliente. Un repositorio creado desde una plantilla comienza con historial independiente.

## Crear y clonar un proyecto nuevo

Esta es la forma más directa. Desde la carpeta donde guardas tus proyectos:

```bash
gh repo create nuevo-proyecto \
  --private \
  --template TU_USUARIO/frnq-astro-starter \
  --clone

cd nuevo-proyecto
bun install
```

Ese único comando crea `nuevo-proyecto` en GitHub y clona una carpeta local nueva basada en el starter.

También puedes hacerlo desde la web:

1. Abre el repositorio starter.
2. Pulsa `Use this template` → `Create a new repository`.
3. Escribe el nombre y crea el repositorio.
4. Clónalo con `gh repo clone TU_USUARIO/nuevo-proyecto`.
5. Entra en la carpeta y ejecuta `bun install`.

Si solo quieres una carpeta local y el starter es accesible desde GitHub:

```bash
bun create astro@latest nuevo-proyecto --template TU_USUARIO/frnq-astro-starter
```

Esta última opción no crea automáticamente un repositorio remoto nuevo. Para starters privados, usa preferentemente el flujo con `gh repo create`.

## Inicializar la web

Cada copia comienza con `projectConfig.meta.initialized: false`. No cambies ese valor a mano.

1. Abre [START_HERE.md](START_HERE.md) y copia su briefing.
2. Describe negocio, páginas/secciones, funcionalidades, contenido y estética; puedes dejar vacíos los datos desconocidos.
3. Añade referencias visuales a `references/` y crea `references/references.json` a partir del ejemplo cuando existan.
4. Envía el briefing al agente empezando por:

```text
Inicializa el proyecto.
```

El agente escribe los hechos confirmados en `project.config.ts`; tú no necesitas editar los documentos. Después genera el contexto de negocio, contenido, diseño, arquitectura, QA y un plan por página; define todos los tokens globales; prepara la base técnica; valida configuración, tipos, build y viewports; y finalmente marca el proyecto como inicializado. No construye una web comercial completa durante este paso.

## Arquitectura

```text
src/
├── assets/              # fuentes, iconos e imágenes procesables
├── components/
│   ├── core/            # SEO, JSON-LD, imágenes y accesibilidad técnica
│   ├── layout/          # shells compartidos
│   ├── primitives/      # contratos UI pequeños y neutrales
│   ├── sections/        # secciones específicas del proyecto
│   └── ui/              # UI específica reutilizada
├── config/              # sitio, SEO y navegación
├── content/             # colecciones de contenido cuando existan
├── data/                # datos locales tipados
├── layouts/             # documento y layouts de ruta
├── lib/                 # transformaciones e integraciones
├── pages/               # rutas declarativas
└── styles/
    └── globals.css      # único tema global
```

Las páginas coordinan datos, SEO y orden. Los componentes renderizan. `data/` y `lib/` son dueños del contenido estructurado y las transformaciones. El JavaScript de cliente se reserva para interacción real.

## Estilos

`src/styles/globals.css` contiene:

- `@import "tailwindcss"`;
- tokens semánticos en `@theme`;
- variables compartidas que no encajan en namespaces de Tailwind;
- base tipográfica y de accesibilidad;
- comportamiento de movimiento reducido.

Durante la inicialización se sustituyen los tokens neutrales por el sistema visual del proyecto. Los componentes se componen con utilidades Tailwind; no se crean hojas CSS paralelas ni tokens con nombres de marca.

## Documentación de proyecto

- `docs/project/PROJECT.md`: negocio, audiencia, alcance y rutas.
- `docs/project/DESIGN.md`: sistema visual y referencias.
- `docs/project/ARCHITECTURE.md`: límites, datos, componentes e integraciones.
- `docs/project/CONTENT.md`: voz, fuentes, inventario y copy pendiente.
- `docs/project/QA.md`: checks y criterios de entrega.
- `docs/project/pages/`: un plan ejecutable por ruta.

`AGENTS.md` contiene reglas permanentes y rutas de contexto. No se reescribe con el briefing de cada cliente: los hechos variables viven en `project.config.ts` y en estos documentos, evitando duplicación y contexto innecesario.

## Comandos

```bash
bun run dev       # desarrollo
bun run sync      # regenera tipos después de cambiar integraciones
bun run validate  # coherencia de configuración y documentos
bun run audit     # vulnerabilidades; requiere acceso al registro
bun run check     # validate + diagnósticos Astro y TypeScript
bun run build     # build de producción
bun run qa        # check + build
bun run preview   # sirve el build localmente
```

## Dependencias permanentes

- `astro`: framework.
- `@astrojs/sitemap`: sitemap oficial.
- `tailwindcss` y `@tailwindcss/vite`: sistema visual sin configuración paralela.
- `typescript` y `@astrojs/check`: contratos y validación.

Toda dependencia adicional debe tener una necesidad concreta, coste de cliente conocido y una razón documentada.

TypeScript se mantiene en 6.0.3 aunque npm publique 7.x: la versión nativa 7 todavía no expone la API programática que necesita `astro check`. Es la versión más reciente compatible, no una dependencia olvidada.

## Mantenimiento del starter

Actualiza Astro y sus integraciones oficiales juntos, revisa la guía de migración y ejecuta:

```bash
bun outdated
# Actualiza solo las versiones compatibles que hayas revisado.
bun run qa
```

La plantilla fija Bun 1.3.14 y Node 24.18.0 LTS. Confirma que `projectConfig.meta.initialized` sigue siendo `false`. Nunca copies de vuelta al starter branding, contenido, rutas comerciales, integraciones o decisiones visuales de un cliente.
# starter
