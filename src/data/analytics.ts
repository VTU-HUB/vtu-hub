/**
 * Third-party site integrations. Every field is optional: empty = nothing is loaded.
 *
 * - cloudflareToken: Cloudflare dashboard → Web Analytics → Add a site → copy the token
 *   from the snippet (`data-cf-beacon='{"token": "…"}'`). Cookie-free.
 * - googleTagId: a Google Tag Manager container (`GTM-…`) or a direct GA4
 *   Measurement ID (`G-…`). This repo cannot see which tags fire inside GTM.
 *   The privacy policy names GTM vs GA4 from the prefix.
 */
export const analyticsConfig = {
  cloudflareToken: "",
  // GTM container for vtuhub.site. Not a GA4 Measurement ID (those start with G-).
  googleTagId: "GTM-5L4TQMT3",
};

/**
 * Search-engine ownership verification (HTML-tag method). Paste only the `content`
 * value of the meta tag each console gives you.
 *
 * - google: Search Console → Add property → URL prefix → HTML tag
 *   (or use a Domain property with a DNS TXT record in Cloudflare and leave this empty)
 * - bing: Bing Webmaster Tools → Add site → HTML Meta Tag (or "Import from Google Search Console")
 * - yandex: Yandex Webmaster → Add site → Meta tag
 */
export const siteVerification = {
  google: "",
  bing: "",
  yandex: "",
};

/** IndexNow key — must match the file public/<key>.txt. Used by scripts/indexnow.mjs. */
export const INDEXNOW_KEY = "0f64dbc213419a25149e73d56cf9b2ec";
