export const siteOrigin = (
  process.env.SITE_URL || "https://sayanthecoder.in"
).replace(/\/$/, "");

export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
