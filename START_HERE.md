# Empieza aquí

No necesitas editar los documentos del proyecto ni decidir la arquitectura. Abre el repositorio nuevo con tu agente y envíale un único briefing como este:

```text
Inicializa este proyecto.

Identidad
- Proyecto y empresa:
- Dominio, si existe:
- Idioma, país y dirección de lectura si no es LTR:

Negocio
- Qué ofrece:
- A quién:
- Objetivo principal:
- Acción que debe completar el usuario:
- Servicios o productos:
- Diferencias o pruebas reales:

Estructura
- Páginas necesarias:
- Secciones deseadas por página y su orden:
- Navegación principal:
- CTA de navegación:
- Enlaces de footer:
- Funcionalidades:
- Integraciones confirmadas:

Contenido
- Copy o documentos disponibles:
- Mensajes que deben aparecer:
- Tono de voz:
- Afirmaciones que no deben inventarse o usarse:

Estética
- Dirección visual:
- Tipografías o sensación tipográfica:
- Colores o sensación cromática:
- Esquema del navegador: light, dark o ambos:
- Uso de imágenes:
- Movimiento:
- Qué evitar:
- Referencias y para qué debe servir cada una:

Restricciones
- Legales:
- Técnicas o de despliegue:
- Accesibilidad:
- Rendimiento:
- Fuera de alcance:
```

Puedes dejar líneas vacías. El agente inspeccionará `references/`, escribirá los hechos confirmados en `project.config.ts` y preguntará una sola vez por los datos que sean realmente bloqueantes.

Después generará:

- contexto de proyecto, contenido, diseño, arquitectura y QA;
- un plan ejecutable por cada ruta;
- el sistema completo de tokens globales en `src/styles/globals.css`;
- configuración separada de páginas, navegación, apariencia, sitio, SEO,
  imágenes, robots y sitemap;
- la base técnica y las dependencias justificadas;
- una validación local y renderizada.

La inicialización no crea una web comercial terminada. Deja el sistema listo para implementar página por página sin volver a decidir cómo organizarlo.
