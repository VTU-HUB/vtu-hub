# Deployment

## Build

```sh
npm run build        # writes dist/
npm run check:seo    # audits every built page
```

The `astro.config.mjs` integrations also produce:

- `dist/sitemap.xml`, plus `sitemap-index.xml` and one sitemap per section (pages,
  programmes, subjects, updates, tools, kannada, hindi). Each page is included only
  if its robots meta allows indexing and its canonical points to itself.
- `dist/_redirects`: 301s for every legacy URL.

## Hosting

Cloudflare Workers static assets ([wrangler.jsonc](../wrangler.jsonc)). Pushing to
`main` deploys.

Recommended Cloudflare settings (done in the Cloudflare dashboard):

- SSL/TLS → Edge Certificates → **Always Use HTTPS**: on.
- DNS: a `www` CNAME to `vtuhub.site`, plus a redirect rule from `www.vtuhub.site/*`
  to `https://vtuhub.site/$1` (301).

## Search engines

- **Google Search Console:** domain property `vtuhub.site`; sitemap `sitemap.xml` submitted.
- **IndexNow (Bing, Yandex):** `.github/workflows/indexnow.yml` submits changed URLs on
  every push to `main`. The key file is in `public/`.

## Analytics and ads

- Google tag ID in `src/data/analytics.ts`.
- AdSense: put the `ca-pub-…` ID in `src/data/ads.ts`; `/ads.txt` is generated from it.

## CI

[.github/workflows/ci.yml](../.github/workflows/ci.yml) runs lint, typecheck, tests,
build and the SEO check on every pull request.
