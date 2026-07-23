interface FieldAccessibilityOptions {
  id: string;
  help?: string | undefined;
  error?: string | undefined;
  describedBy?: string | undefined;
}

export interface FieldAccessibility {
  helpId: string | undefined;
  errorId: string | undefined;
  describedBy: string | undefined;
  errorMessage: string | undefined;
  invalid: "true" | undefined;
}

export function fieldAccessibility({
  id,
  help,
  error,
  describedBy,
}: FieldAccessibilityOptions): FieldAccessibility {
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const descriptionIds = [
    ...new Set(
      [describedBy, helpId, errorId]
        .flatMap((value) => value?.trim().split(/\s+/) ?? [])
        .filter(Boolean),
    ),
  ];

  return {
    helpId,
    errorId,
    describedBy:
      descriptionIds.length > 0 ? descriptionIds.join(" ") : undefined,
    errorMessage: errorId,
    invalid: error ? "true" : undefined,
  };
}
