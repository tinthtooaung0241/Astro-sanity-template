import type { StructureResolver } from "sanity/structure";
import { FaCog } from "react-icons/fa";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // 1. Singleton: Global Settings
      // We use documentId() to ensure there is only ever one instance
      S.listItem()
        .title("Global Settings")
        .id("globalSettings")
        .icon(FaCog)
        .child(
          S.document()
            .schemaType("globalSettings")
            .documentId("globalSettings")
        ),

      // 2. A divider to separate settings from repeatable content
      S.divider(),

      // 3. All other document types
      // We filter out 'globalSettings' from this list so it doesn't appear twice
      ...S.documentTypeListItems().filter(
        (listItem) => !["globalSettings"].includes(listItem.getId() as string)
      ),
    ]);
