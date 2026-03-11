// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://alexhagemeister.dev',
	trailingSlash: 'always',
	redirects: {
		'/blog/2026/02/12/narrative-as-cognitive-technology/': '/blog/narrative-as-cognitive-technology/',
	},
});
