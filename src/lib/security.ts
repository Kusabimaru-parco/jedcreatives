// Security policy for the whole site — one place to edit.
//
// Used by:
//   • src/layouts/Layout.astro — a <meta> Content-Security-Policy in every built page (works on GitHub Pages,
//     which can't send custom headers).
//   • src/middleware.ts — the full set of response headers, for when the site runs on a server (SSR/dynamic).
//   • netlify.toml — the same headers for Netlify (keep it in sync with `securityHeaders` below).
//
// Adding a new outside service (analytics, a new embed, another form provider)? Add its address to the
// matching list below, or the browser will block it.

const csp = {
	'default-src': ["'self'"],
	// 'unsafe-inline' is needed for Astro's small inline scripts (intro, theme hooks). Move to nonces/hashes
	// if the site goes dynamic and you want to tighten this.
	'script-src': ["'self'", "'unsafe-inline'"],
	'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
	'font-src': ["'self'", 'https://fonts.gstatic.com'],
	'img-src': ["'self'", 'data:', 'blob:'],
	'media-src': ["'self'", 'blob:'],
	// Where the page may send data with fetch(): the contact form services.
	'connect-src': ["'self'", 'https://formsubmit.co', 'https://formspree.io'],
	// Video players the lightbox may embed.
	'frame-src': ['https://www.youtube-nocookie.com', 'https://player.vimeo.com'],
	'form-action': ["'self'", 'https://formsubmit.co', 'https://formspree.io'],
	'base-uri': ["'self'"],
	'object-src': ["'none'"],
	// Header-only (browsers ignore these in a <meta> tag): no framing by other sites; upgrade http → https.
	'frame-ancestors': ["'none'"],
	'upgrade-insecure-requests': [],
} satisfies Record<string, string[]>;

const HEADER_ONLY = new Set(['frame-ancestors']);

/** The Content-Security-Policy string. `meta: true` leaves out directives a <meta> tag can't use. */
export const contentSecurityPolicy = ({ meta = false } = {}) =>
	Object.entries(csp)
		.filter(([name]) => !(meta && HEADER_ONLY.has(name)))
		.map(([name, values]) => [name, ...values].join(' '))
		.join('; ');

/** Response headers for server-rendered pages (and the reference for netlify.toml). */
export const securityHeaders: Record<string, string> = {
	'Content-Security-Policy': contentSecurityPolicy(),
	'X-Frame-Options': 'DENY',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
	'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
	'Cross-Origin-Opener-Policy': 'same-origin',
};
