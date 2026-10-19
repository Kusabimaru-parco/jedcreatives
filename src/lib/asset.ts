// Prefixes a public/ path with the configured base, so the site still works
// when deployed under a sub-path (e.g. GitHub Pages at /JEDCREATIVES/).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const asset = (path: string) => `${base}/${path.replace(/^\//, '')}`;
