import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "siteUrl",
      title: "Site URL",
      type: "string",
    }),
    defineField({
      name: "robotsDirective",
      title: "Robots Directive",
      type: "string",
      options: {
        list: [
          { title: "Index, Follow", value: "index,follow" },
          { title: "No Index, Follow", value: "noindex,follow" },
          { title: "No Index, No Follow", value: "noindex,nofollow" },
          { title: "No Archive", value: "noarchive" },
          { title: "No Snippet", value: "nosnippet" },
        ],
        layout: "dropdown",
      },
      initialValue: "index,follow",
    }),
    defineField({ name: "canonicalUrl", title: "Canonical URL", type: "url" }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph Title",
      type: "string",
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph Description",
      type: "text",
      validation: (Rule) => Rule.max(300),
    }),
    // Twitter overrides (optional; can default to OG)
    defineField({
      name: "twitterTitle",
      title: "Twitter Title",
      type: "string",
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: "twitterDescription",
      title: "Twitter Description",
      type: "text",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "twitterImage",
      title: "Twitter Image",
      type: "image",
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "twitterCardType",
      title: "Twitter Card Type",
      type: "string",
      options: {
        list: [
          { title: "Summary", value: "summary" },
          { title: "Summary Large Image", value: "summary_large_image" },
        ],
        layout: "dropdown",
      },
      initialValue: "summary_large_image",
    }),
    defineField({
      name: "breadcrumbOverride",
      title: "Breadcrumb Override",
      type: "array",
      description:
        "Optional manual breadcrumb trail. Leave empty to auto-generate breadcrumbs from the URL.",
      of: [
        {
          type: "object",
          name: "breadcrumbItem",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Href",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  allowRelative: true,
                  scheme: ["http", "https", "mailto", "tel"],
                }),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "Breadcrumb Item",
                subtitle: subtitle || "Current page",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "includeInSitemap",
      title: "Include in Sitemap",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated Date",
      type: "date",
    }),
    defineField({
      name: "jsonLd",
      title: "JSON-LD Structured Data",
      type: "text",
      rows: 10,
      description:
        'Paste valid JSON-LD structured data. This will be rendered as a <script type="application/ld+json"> tag in the page head.',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true;
          try {
            JSON.parse(value);
            return true;
          } catch {
            return "Must be valid JSON";
          }
        }),
    }),
  ],
});
