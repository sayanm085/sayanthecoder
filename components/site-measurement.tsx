"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ANALYTICS_CONSENT_KEY,
  analyticsPageLocation,
  validMeasurementId,
  type AnalyticsConsent,
} from "@/lib/measurement";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  siteAnalyticsAllowed?: boolean;
};

export function SiteMeasurement({ measurementId }: { measurementId?: string }) {
  const id = validMeasurementId(measurementId);
  return id ? <MeasurementConsent measurementId={id} /> : null;
}

function MeasurementConsent({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const initialized = useRef(false);
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    let active = true;
    void Promise.resolve().then(() => {
      if (!active) return;
      try {
        const saved = localStorage.getItem(ANALYTICS_CONSENT_KEY);
        if (saved === "granted" || saved === "denied") setConsent(saved);
      } catch {
        /* A visitor can still choose for this page. */
      }
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const analytics = window as AnalyticsWindow;
    const disabled = window as unknown as Record<string, unknown>;
    analytics.siteAnalyticsAllowed = consent === "granted";
    disabled[`ga-disable-${measurementId}`] = consent !== "granted";
    if (consent !== "granted") {
      lastPage.current = null;
      if (initialized.current)
        analytics.gtag?.("consent", "update", { analytics_storage: "denied" });
      return;
    }
    analytics.dataLayer ??= [];
    analytics.gtag ??= function () {
      // Preserve Google's documented gtag command queue format.
      // eslint-disable-next-line prefer-rest-params
      analytics.dataLayer!.push(arguments);
    };
    if (!initialized.current) {
      analytics.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      analytics.gtag("js", new Date());
      analytics.gtag("config", measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: analyticsPageLocation(
          location.origin,
          location.pathname,
        ),
        page_referrer: document.referrer
          ? new URL(document.referrer).origin
          : "",
      });
      initialized.current = true;
    }
    analytics.gtag("consent", "update", { analytics_storage: "granted" });
    if (!document.getElementById("site-google-analytics")) {
      const script = document.createElement("script");
      script.id = "site-google-analytics";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
    }
    return () => {
      analytics.siteAnalyticsAllowed = false;
    };
  }, [consent, measurementId]);

  useEffect(() => {
    if (consent !== "granted" || lastPage.current === pathname) return;
    const analytics = window as AnalyticsWindow;
    if (!analytics.siteAnalyticsAllowed || !analytics.gtag) return;
    const page_location = analyticsPageLocation(location.origin, pathname);
    analytics.gtag("set", { page_location });
    analytics.gtag("event", "page_view", { page_location });
    lastPage.current = pathname;
  }, [pathname, consent]);

  function choose(value: AnalyticsConsent) {
    setConsent(value);
    setSettingsOpen(false);
    try {
      localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    } catch {
      /* Optional persistence. */
    }
  }

  if (!ready) return null;
  return (
    <>
      <button
        className="analytics-settings"
        onClick={() => setSettingsOpen(true)}
      >
        Analytics preferences
      </button>
      {consent === null || settingsOpen ? (
        <section
          className="analytics-consent"
          aria-label="Optional website analytics"
        >
          <p>
            <strong>Help improve this website?</strong> Optional Google
            Analytics measures visits, approximate country and enquiry-button
            activity. Your name, email and project message are excluded from our
            events. Your choice does not affect contacting Sayan.
          </p>
          <div>
            <button onClick={() => choose("denied")}>Decline</button>
            <button onClick={() => choose("granted")}>Allow analytics</button>
          </div>
        </section>
      ) : null}
    </>
  );
}
