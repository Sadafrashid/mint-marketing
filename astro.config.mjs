import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// EDIT ME: replace with the real production domain before deploying.
// This is used to generate absolute URLs for the sitemap, canonical tag,
// and Open Graph/Twitter meta tags.
const SITE_URL = 'https://www.mintmarketing.example';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  compressHTML: true,
});
