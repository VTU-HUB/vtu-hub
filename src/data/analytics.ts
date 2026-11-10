/**
 * Third-party site integrations. Every field is optional: empty = nothing is loaded.
 *
 * - cloudflareToken: Cloudflare dashboard → Web Analytics → Add a site → copy the token
 *   from the snippet (`data-cf-beacon='{"token": "…"}'`). Cookie-free.
 * - ga4MeasurementId: Google Analytics → Admin → Data streams → Web → "G-XXXXXXXXXX".
 *   GA sets cookies; the privacy policy mentions it automatically once this is set.
 */
export const analyticsConfig = {
  cloudflareToken: "",
  ga4MeasurementId: "",
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
