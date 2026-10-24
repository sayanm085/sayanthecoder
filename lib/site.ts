/** Match the primary host selected by the live domain's permanent redirect. */
export function canonicalSiteOrigin(value?: string): string {
  const url = new URL(value || "https://www.sayanthecoder.in");
  if (["sayanthecoder.in", "www.sayanthecoder.in"].includes(url.hostname)) {
    return "https://www.sayanthecoder.in";
  }
  return url.origin;
}

export const siteOrigin = canonicalSiteOrigin(process.env.SITE_URL);

export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
