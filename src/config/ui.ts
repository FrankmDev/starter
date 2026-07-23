import { projectConfig } from '../../project.config';

const fallback = {
  skipToContent: 'Saltar al contenido',
  foundationStatus: 'Base preparada',
  foundationDescription:
    'La base técnica funciona. Las páginas y secciones específicas del proyecto todavía no están implementadas.',
  notFoundTitle: 'Página no encontrada',
  notFoundDescription: 'La página solicitada no existe o ha cambiado de dirección.',
  returnHome: 'Volver al inicio',
} as const;

export const uiText = {
  skipToContent: projectConfig.content.ui.skipToContent || fallback.skipToContent,
  foundationStatus: projectConfig.content.ui.foundationStatus || fallback.foundationStatus,
  foundationDescription:
    projectConfig.content.ui.foundationDescription || fallback.foundationDescription,
  notFoundTitle: projectConfig.content.ui.notFoundTitle || fallback.notFoundTitle,
  notFoundDescription:
    projectConfig.content.ui.notFoundDescription || fallback.notFoundDescription,
  returnHome: projectConfig.content.ui.returnHome || fallback.returnHome,
} as const;
