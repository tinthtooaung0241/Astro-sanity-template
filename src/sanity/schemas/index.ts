import { commonSchemas } from "./common";
import { documentSchemas } from "./documents";
import { navigationSchemas } from "./navigation";
import { sectionSchemas } from "./sections";
import { settingsSchemas } from "./settings";
import type { SchemaTypeDefinition } from "sanity";

export const schemas: { types: SchemaTypeDefinition[] } = {
  types: [
    ...commonSchemas,
    ...documentSchemas,
    ...navigationSchemas,
    ...sectionSchemas,
    ...settingsSchemas,
  ],
};
