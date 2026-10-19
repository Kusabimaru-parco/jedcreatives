// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages: https://kusabimaru-parco.github.io/jedcreatives/
  // `base` must match the repository name. All asset paths go through src/lib/asset.ts, so nothing else
  // needs changing. Moving to a custom domain later? Set `site` to it, remove `base`, add public/CNAME.
  site: 'https://kusabimaru-parco.github.io',
  base: '/jedcreatives',
  vite: {
    plugins: [tailwindcss()],
  },
});
