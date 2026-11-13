// Network helper shared by the VTU sync scripts: a timeout on every request and a few
// retries with back-off for network errors and VTU's transient 5xx / 429 responses.
export const UA = { "User-Agent": "vtuhub-sync/1.0 (+https://vtuhub.site/about)" };

const TRANSIENT = new Set([408, 425, 429, 500, 502, 503, 504]);

/**
 * fetch() with a per-request timeout and retries. A 404 (or any other non-transient
 * status) is returned at once so the caller can decide what a missing file means.
 * @param {string} url
 * @param {{ tries?: number, timeout?: number, wait?: number }} [opts]
 */
export async function fetchRetry(url, { tries = 4, timeout = 60_000, wait = 2000 } = {}) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(timeout) });
      if (!TRANSIENT.has(res.status) || i >= tries) return res;
    } catch (e) {
      if (i >= tries) throw new Error(`${url} → ${e.cause?.code ?? e.message} after ${tries} tries`);
    }
    await new Promise((r) => setTimeout(r, wait * i));
  }
}
