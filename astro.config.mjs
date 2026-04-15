// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

const envFile = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");
const projectId =
  envFile.PUBLIC_SANITY_PROJECT_ID ?? process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset =
  envFile.PUBLIC_SANITY_DATASET ?? process.env.PUBLIC_SANITY_DATASET;
const isPreview = (envFile.PREVIEW ?? process.env.PREVIEW) === "true";
const sanityToken =
  envFile.SANITY_API_READ_TOKEN ?? process.env.SANITY_API_READ_TOKEN;
const studioUrl =
  envFile.PUBLIC_SANITY_STUDIO_URL ??
  process.env.PUBLIC_SANITY_STUDIO_URL ??
  "/studio";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Set to 'server' for Visual Editing and on-demand rendering
  // Requires an adapter for deployment (Vercel, Netlify, Cloudflare, Node, etc.)
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [
    sanity({
      projectId,
      dataset,
      // studioBasePath: "/admin",
      // Set useCdn to false if you're building statically.
      useCdn: false,
      apiVersion: "2026-04-1", // Set to date of setup to use the latest API version
      stega: {
        studioUrl,
      },
    }),
    react(), // Required for Sanity Studio
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
