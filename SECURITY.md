# Security

## What's in place now (static site on GitHub Pages)

| Protection | Where |
| --- | --- |
| Content Security Policy — the browser only loads scripts, styles, fonts, media, frames and form posts from this site and the services listed | `src/lib/security.ts`, added to every page as a `<meta>` tag by `src/layouts/Layout.astro` |
| Referrer policy — other sites don't see full page URLs | `src/layouts/Layout.astro` |
| Full security headers (also blocks framing / clickjacking, forces HTTPS, …) | `netlify.toml` for Netlify; `src/middleware.ts` for a future server. GitHub Pages can't send headers. |
| Deploys stop if an installed package has a known high/critical vulnerability | `audit` job in `.github/workflows/deploy.yml` |
| Weekly update pull requests for packages and GitHub Actions (incl. security fixes) | `.github/dependabot.yml` |
| Contact form: spam trap field; server replies are shown as plain text only | `src/components/Contact.astro` |
| No secrets in the repo; `.env` files are git-ignored | `.gitignore` |

**Adding an outside service** (analytics, another embed, a different form provider)? Add its address to the
right list in `src/lib/security.ts`, or the browser will block it.

## Account hygiene (most real-world breaches start here)

- Turn on two-factor authentication for GitHub, Netlify and the email inbox the contact form sends to.
- GitHub → repo **Settings → Code security**: enable *Dependabot alerts* and *Secret scanning*.
- GitHub → **Settings → Branches**: protect `main` (require pull requests) if more people get access.

## If the site becomes dynamic (server, database, logins, payments)

The headers in `src/middleware.ts` switch on automatically once an SSR adapter is added in
`astro.config.mjs`. On top of that, a dynamic site needs:

1. **Secrets in environment variables only** (`.env` locally, the host's settings in production) — never in
   code or the repo. Read them with `import.meta.env` on the server; never send them to the browser.
2. **Validate every input on the server** (form fields, URL params, uploads) — type, length, format. Never
   trust what the browser sends, even if the page already checks it.
3. **Database:** parameterised queries or an ORM only — never build SQL from user input.
4. **Logins:** use a proven auth library/service (e.g. Lucia, Auth.js, Clerk, Supabase Auth) instead of
   writing your own; hash passwords (argon2/bcrypt); sessions in `HttpOnly; Secure; SameSite=Lax` cookies.
5. **CSRF protection** for forms that change data (Astro's `security.checkOrigin`, on by default for SSR).
6. **Rate limiting** on login, contact and any endpoint that sends email or costs money.
7. **Tighten the CSP:** replace `'unsafe-inline'` scripts with nonces (Astro supports CSP hashes/nonces).
8. **Uploads:** check type and size, store outside the web root or in object storage, never execute them.
9. **Errors and logs:** show users generic errors; log details on the server; never log passwords or tokens.
10. **Payments:** use a hosted checkout (Stripe, PayMongo, etc.) so card details never touch the site.

## Reporting a problem

Found a security issue? Email jameelbelza@gmail.com rather than opening a public issue.
