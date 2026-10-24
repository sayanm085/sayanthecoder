export type AnalyticsConsent = "granted" | "denied";
export const ANALYTICS_CONSENT_KEY = "site-analytics-consent-v1";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  siteAnalyticsAllowed?: boolean;
};

export function validMeasurementId(value?: string): string | null {
  return value && /^G-[A-Z0-9]{5,}$/.test(value) ? value : null;
}

export function analyticsPageLocation(
  origin: string,
  pathname: string,
): string {
  // Query strings and hash fragments can contain enquiry details. Never send them.
  const path = pathname.split(/[?#]/, 1)[0];
  const base = new URL(origin);
  const result = new URL(
    path.startsWith("/") && !path.startsWith("//") ? path : "/",
    base,
  );
  return result.origin === base.origin ? result.href : base.origin + "/";
}

export function trackEnquiry(
  event: "enquiry_draft_prepared" | "enquiry_handoff",
  channel: "gmail" | "whatsapp",
  currency: "INR" | "USD",
) {
  if (typeof window === "undefined") return;
  const analytics = window as AnalyticsWindow;
  if (!analytics.siteAnalyticsAllowed || !analytics.gtag) return;
  analytics.gtag("event", event, {
    contact_channel: channel,
    budget_currency: currency,
    transport_type: "beacon",
  });
}
