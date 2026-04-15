import { defineField } from "sanity";

export const imageType = defineField({
  name: "imageWithAlt",
  title: "Image with Alt Text",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
