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

Cloudflare Workers static assets ([wrangler.jsonc](../wrangler.jsonc)). Production
should track `VTU-HUB/vtu-hub` `main`.

Two deploy paths (either is enough if it tracks this repo):

1. **Cloudflare Workers Builds** (dashboard): GitHub app connected to `VTU-HUB/vtu-hub`,
   production branch `main`, build command `npm run build`, output `dist`.
2. **Repo workflow** [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml):
   needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.

After a deploy, `https://vtuhub.site/version.json` must show the same `sha` as
`git rev-parse HEAD` on `main`. Check with `npm run smoke:live` (optional
`SMOKE_SHA=<sha>`). [`.github/workflows/smoke.yml`](../.github/workflows/smoke.yml)
runs that script on a schedule.

Recommended Cloudflare settings (done in the Cloudflare dashboard):

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

[.github/workflows/ci.yml](../.github/workflows/ci.yml) on every pull request and on
`main`:

```
npm run lint
npm run typecheck
npm run validate:data
node scripts/vtu/exceptions.mjs --check
npm test
npm run build
npm run check:seo
npm run audit:routes
```
