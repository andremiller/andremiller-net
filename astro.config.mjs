// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site:'https://andremiller.net',
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
    })
  ]
});