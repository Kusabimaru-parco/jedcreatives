// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages: https://kusabimaru-parco.github.io/jedcreatives/
  // `base` must match the repository name. All asset paths go through src/lib/asset.ts, so nothing else
  // needs changing. Moving to a custom domain later? Set `site` to it, remove `base`, add public/CNAME.
  // Netlify (it sets NETLIFY=true while building) serves the site from the root of its own address, so no base
  // path there. Building locally for a Netlify drag-and-drop upload: `npm run build:netlify`.
  site: process.env.NETLIFY ? process.env.URL : 'https://kusabimaru-parco.github.io',
  base: process.env.NETLIFY ? '/' : '/jedcreatives',
  vite: {
    plugins: [tailwindcss()],
  },
});
