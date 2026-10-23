import assert from "node:assert/strict";
import {
  projectConfig,
  type ProjectConfig,
  type ProjectNavigationHref,
} from "../project.config";
import { validateProjectConfig } from "./config-validation";

const valid: ProjectConfig = {
  ...projectConfig,
  initialized: true,
  site: {
    ...projectConfig.site,
    name: "Example Studio",
    company: "Example Studio S.L.",
    url: "https://example-studio.es",
  },
  seo: {
    defaultTitle: "Example Studio",
    defaultDescription: "A real example description.",
    defaultImage: "/og.jpg",
  },
  navigation: {
    primary: [{ label: "Services", href: "/services/" }],
    cta: { label: "Contact", href: "#contact" },
    footer: [{ label: "Email", href: "mailto:hello@studio.example" }],
  },
};

assert.deepEqual(validateProjectConfig(valid), []);
assert.deepEqual(validateProjectConfig({ ...valid, initialized: false }), []);

function expectError(edit: (config: ProjectConfig) => void, expected: string) {
  const candidate = structuredClone(valid);
  edit(candidate);
  const errors = validateProjectConfig(candidate);
  assert(
    errors.some((error) => error.includes(expected)),
    "Expected " + expected + "; received " + errors.join(", "),
  );
}

expectError((c) => {
  c.site.name = "";
}, "site.name");
expectError((c) => {
  c.site.url = "http://example-studio.es";
}, "must use https");
expectError((c) => {
  c.site.url = "https://example.com";
}, "production domain");
expectError((c) => {
  c.site.url = "https://example-studio.es/page";
}, "origin");
expectError((c) => {
  c.seo.defaultDescription = "";
}, "seo.defaultDescription");
expectError((c) => {
  c.seo.defaultImage = "javascript:alert(1)";
}, "seo.defaultImage");
expectError((c) => {
  c.navigation.primary[0]!.label = "";
}, "needs a label");
expectError((c) => {
  c.navigation.primary[0]!.href = "//bad.example" as ProjectNavigationHref;
}, "invalid href");

console.log("Configuration smoke tests passed.");
