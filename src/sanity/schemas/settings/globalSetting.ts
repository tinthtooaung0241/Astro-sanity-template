import { defineField, defineType } from "sanity";
import { FaCog, FaBell } from "react-icons/fa";

export const globalSettings = defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",
  icon: FaCog,
  groups: [
    { name: "seo", title: "SEO", default: true },
    { name: "navigation", title: "Navigation" },
    { name: "footer", title: "Footer" },
    { name: "integrations", title: "Integrations" },
  ],
  fields: [
    // SEO Setup
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
      group: "seo",
    }),

    // Announcement Bar
    // defineField({
    //   name: "announcementBar",
    //   title: "Announcement Bar",
    //   type: "object",
    //   group: "navigation",
    //   icon: FaBell,
    //   fields: [
    //     defineField({
    //       name: "enabled",
    //       title: "Enabled",
    //       type: "boolean",
    //       initialValue: false,
    //     }),
    //     defineField({
    //       name: "text",
    //       title: "Announcement Text",
    //       type: "string",
    //       validation: (Rule) => Rule.max(150),
    //       hidden: ({ parent }) => !parent?.enabled,
    //     }),
    //     defineField({
    //       name: "backgroundColor",
    //       title: "Background Color",
    //       type: "colorPicker",
    //       hidden: ({ parent }) => !parent?.enabled,
    //     }),
    //     defineField({
    //       name: "textColor",
    //       title: "Text Color",
    //       type: "colorPicker",
    //       hidden: ({ parent }) => !parent?.enabled,
    //     }),
    //     defineField({
    //       name: "ctaButton",
    //       title: "CTA Button",
    //       type: "ctaButton",
    //       hidden: ({ parent }) => !parent?.enabled,
    //     }),
    //   ],
    // }),

    // Navigation
    defineField({
      name: "header",
      title: "Header/Navigation",
      type: "header",
      group: "navigation",
      validation: (Rule) => Rule.required(),
    }),

    // Footer
    defineField({
      name: "footer",
      title: "Footer",
      type: "footer",
      group: "footer",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Global Settings",
        subtitle: "Site-wide configuration",
      };
    },
  },
});
