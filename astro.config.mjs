import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Set `site` to the production URL once the Vercel domain is known
  // (needed for sitemap/canonical URLs, not for local dev or deploys).
  vite: {
    plugins: [tailwindcss()],
  },
});
