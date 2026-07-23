import { describe, expect, test } from "bun:test";
import { fieldAccessibility } from "@/lib/forms/field";
import { serializeJsonLd } from "@/lib/seo/jsonLd";
import { canonicalForPath, toAbsoluteUrl } from "@/lib/seo/urls";

describe("field accessibility", () => {
  test("connects help, errors, and external descriptions", () => {
    expect(
      fieldAccessibility({
        id: "email",
        help: "Use a work address.",
        error: "Enter a valid address.",
        describedBy: "privacy-note",
      }),
    ).toEqual({
      helpId: "email-help",
      errorId: "email-error",
      describedBy: "privacy-note email-help email-error",
      errorMessage: "email-error",
      invalid: "true",
    });
  });

  test("does not emit empty ARIA state", () => {
    expect(fieldAccessibility({ id: "name" })).toEqual({
      helpId: undefined,
      errorId: undefined,
      describedBy: undefined,
      errorMessage: undefined,
      invalid: undefined,
    });
  });

  test("deduplicates description IDs", () => {
    expect(
      fieldAccessibility({
        id: "message",
        help: "Add context.",
        describedBy: "message-help external-note message-help",
      }).describedBy,
    ).toBe("message-help external-note");
  });
});

describe("SEO helpers", () => {
  test("normalizes a canonical URL without query or hash", () => {
    expect(
      canonicalForPath("/work/?source=test#project", "https://example.com"),
    ).toBe("https://example.com/work/");
  });

  test("resolves absolute URLs", () => {
    expect(toAbsoluteUrl("/social/card.jpg", "https://example.com")).toBe(
      "https://example.com/social/card.jpg",
    );
  });

  test("escapes markup-sensitive JSON-LD characters", () => {
    expect(serializeJsonLd({ name: "</script>" })).toBe(
      '{"name":"\\u003c/script>"}',
    );
  });
});
