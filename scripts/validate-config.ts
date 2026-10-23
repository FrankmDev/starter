import { projectConfig } from "../project.config";
import { validateProjectConfig } from "./config-validation";

const errors = validateProjectConfig(projectConfig);

if (errors.length > 0) {
  throw new Error("Invalid project configuration:\n- " + errors.join("\n- "));
}
