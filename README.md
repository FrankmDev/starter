# Starter personal de Astro

Base mínima y reutilizable para comenzar proyectos Astro con arquitectura,
estilos globales, SEO, imágenes, accesibilidad, documentación para IA y un gate
de producción ya resueltos.

## Núcleo permanente

- Astro estático y TypeScript `strictest`.
- Tailwind CSS 4 mediante su plugin oficial de Vite.
- Tokens y reglas base únicamente en `src/styles/globals.css`.
- Sitemap, canonical, robots, Open Graph y JSON-LD.
- Imágenes responsive con `astro:assets`.
- Layout, skip link, contenedores, secciones, botones y formularios accesibles.
- Configuración tipada de páginas, navegación, apariencia, negocio y contenido.
- Inicialización dirigida por `AGENTS.md`, `PROJECT_START.md` y plantillas
  documentales.
- Prettier para Astro y orden estable de utilidades Tailwind.
- Un único build determinista: formato, validator, diagnósticos, tests unitarios
  y producción.

No incluye Playwright, frameworks cliente, CMS, analítica, ecommerce,
autenticación, i18n, theme switch, proveedor de formularios, adaptador de
despliegue, librerías de motion ni componentes comerciales. Se añaden solo
cuando el proyecto confirma la necesidad.

## Preparar el repositorio como plantilla

Este comando se ejecuta una sola vez:

```bash
gh auth login
gh repo edit FrankmDev/starter --template
```

## Crear un proyecto nuevo

Desde la carpeta donde guardas tus proyectos:

```bash
cd /Users/frnq/Documents/PROJECTS

gh repo create FrankmDev/mi-nuevo-proyecto \
  --private \
  --template FrankmDev/starter \
  --clone

cd mi-nuevo-proyecto
bun ci
bun run build
```

Cambia `mi-nuevo-proyecto` en ambos lugares. Usa `--public` si el nuevo
repositorio debe ser público.

El comando crea un repositorio con historial independiente y clona su carpeta
local. No uses `git clone` directamente sobre el starter para iniciar un
proyecto: conservaría `origin` apuntando a la plantilla.

Si solo quieres una carpeta local sin crear un repositorio remoto:

```bash
bun create astro@latest mi-nuevo-proyecto --template FrankmDev/starter
```

## Inicializar la copia

Cada copia comienza con `projectConfig.meta.initialized: false`.

1. Abre `START_HERE.md`.
2. Describe el proyecto, páginas, navegación, funcionalidades, contenido y
   estética.
3. Añade referencias a `references/` cuando existan.
4. Envía el briefing a la IA comenzando por:

```text
Inicializa este proyecto.
```

La IA registra primero los hechos confirmados en `project.config.ts`, genera los
documentos y planes de ruta, define el sistema visual global, prepara rutas y
configuración técnica, valida el resultado renderizado y solo entonces marca el
proyecto como inicializado.

La inicialización prepara la plataforma; no construye automáticamente páginas
comerciales terminadas.

## Fuentes de verdad

- `AGENTS.md`: reglas permanentes de trabajo para la IA.
- `PROJECT_START.md`: protocolo de inicialización y ejecución.
- `project.config.ts`: hechos estructurados y estado.
- `docs/project/PROJECT.md`: negocio, audiencia, alcance, rutas y navegación.
- `docs/project/CONTENT.md`: fuentes, voz, mensajes y copy.
- `docs/project/DESIGN.md`: sistema visual, referencias y tokens.
- `docs/project/ARCHITECTURE.md`: implementación, datos y dependencias.
- `docs/project/QA.md`: checks y evidencia de entrega.
- `docs/project/pages/`: un contrato ejecutable por ruta.

`AGENTS.md` nunca contiene hechos del cliente. Los documentos no deben duplicar
responsabilidades entre sí.

## Arquitectura

```text
src/
├── components/
│   ├── core/          # SEO, JSON-LD, imágenes y accesibilidad técnica
│   ├── layout/        # documento y shells compartidos
│   └── primitives/    # contratos pequeños y neutrales
├── config/            # sitio, SEO, navegación y copy de sistema
├── layouts/
├── lib/               # transformaciones y contratos sin presentación
├── pages/             # rutas declarativas
└── styles/
    └── globals.css    # único tema global
```

`assets/`, `content/`, `data/`, `sections/` y `ui/` se crean durante la
inicialización únicamente cuando el proyecto los necesita.

## Comandos

```bash
bun run dev           # desarrollo
bun run format        # aplica formato
bun run format:check  # comprueba formato sin escribir
bun run validate      # configuración, rutas, navegación y documentos
bun run check         # validate + diagnósticos Astro/TypeScript
bun run test          # contratos permanentes con el runner de Bun
bun run build         # format:check + check + test + producción
bun run qa            # alias del gate completo build
bun run audit         # seguridad; consulta externa e independiente
bun run preview       # sirve el build local
```

## Dependencias permanentes

- `astro` y `@astrojs/sitemap`.
- `tailwindcss` y `@tailwindcss/vite`.
- `typescript`, `@astrojs/check` y `@types/bun`.
- `prettier`, `prettier-plugin-astro` y
  `prettier-plugin-tailwindcss`.

TypeScript permanece en la última versión compatible con la API de
`astro check`; no se fuerza una major incompatible solo porque exista en el
registro.

## Mantenimiento

```bash
bun outdated
bun run build
bun run audit
```

Actualiza Astro y sus integraciones tras revisar la guía de migración. Confirma
que la plantilla mantiene `initialized: false` y no copies de vuelta branding,
rutas comerciales, integraciones o decisiones visuales de un cliente.
