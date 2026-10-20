// Adds security headers to every response the server sends.
//
// While the site is fully static (GitHub Pages), this only runs at build time and has no effect — the
// <meta> policy in Layout.astro does the job instead. Once the site runs on a server (an SSR adapter is
// added in astro.config.mjs), every page and API route gets these headers automatically.
import { defineMiddleware } from 'astro:middleware';
import { securityHeaders } from './lib/security';

export const onRequest = defineMiddleware(async (_context, next) => {
	const response = await next();
	// Dev server: Vite needs inline scripts/websockets the policy would block, so skip it there.
	if (import.meta.env.DEV) return response;
	for (const [name, value] of Object.entries(securityHeaders)) {
		if (!response.headers.has(name)) response.headers.set(name, value);
	}
	return response;
});
