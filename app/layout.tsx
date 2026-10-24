import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./color-theme.css";
import "./immersive-hero.css";
import "./project-showcase.css";
import "./laundry-gallery.css";
import "./extended-showcases.css";
import { siteOrigin } from "@/lib/site";
import { WhatsAppEnquiry } from "@/components/whatsapp-enquiry";
import { SiteMeasurement } from "@/components/site-measurement";
import "./measurement.css";
import "./contact-channels.css";

const archivo = localFont({
  src: "../public/assets/fonts/Archivo-100-900-latin.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});
const space = localFont({
  src: "../public/assets/fonts/SpaceGrotesk-500-latin.woff2",
  variable: "--font-space",
  display: "swap",
  weight: "500",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  robots: {
    "max-image-preview": "large",
  },
  title: {
    default: "Sayan Mondal | Web, App & DevOps Developer",
    template: "%s | SayanTheCoder",
  },
  description:
    "Websites, Flutter apps, custom software and cloud deployment by Sayan Mondal, founder of Opslin and Shotlin. Based in Kolkata, working with businesses worldwide.",
  applicationName: "SayanTheCoder",
  authors: [{ name: "Sayan Mondal" }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: siteOrigin,
    title: "Sayan Mondal — Websites, Apps & Cloud Engineering",
    description:
      "Founder of Opslin and Shotlin. DevOps, cloud infrastructure, AI-assisted VPS deployment, web, mobile and game engineering by Sayan Mondal.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sayan Mondal — Founder of Opslin and Shotlin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sayan Mondal — Web, App & DevOps Developer",
    description:
      "Founder of Opslin and Shotlin. Cloud infrastructure, Flutter apps, custom software and AI engineering in Kolkata, India.",
    images: ["/opengraph-image"],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${space.variable}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <WhatsAppEnquiry />
        {process.env.NEXT_PUBLIC_GA4_MANUAL_MEASUREMENT === "true" ? (
          <SiteMeasurement
            measurementId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}
          />
        ) : null}
        <noscript>
          <style>{`.page-loader{display:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
