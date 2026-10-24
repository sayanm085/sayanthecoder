import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/icons";
import { CONTACT_EMAIL, gmailComposeUrl } from "@/lib/contact";
import { jsonLd, siteOrigin } from "@/lib/site";

const title = "Website Privacy & Analytics — Sayan Mondal";
const description =
  "How this portfolio handles optional analytics, enquiry drafts, Gmail and WhatsApp handoffs, and preferences. Contact Sayan Mondal with privacy questions.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title, description, url: "/privacy", type: "website" },
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            description,
            url: `${siteOrigin}/privacy`,
            isPartOf: { "@id": `${siteOrigin}/#website` },
          }),
        }}
      />
      <header className="work-detail-header shell">
        <Brand href="/" />
        <Link className="text-link" href="/">
          Back to the portfolio →
        </Link>
      </header>
      <main id="main" className="opslin-guide shell">
        <article>
          <header>
            <span className="section-label">About this website</span>
            <h1>Privacy and optional analytics.</h1>
            <p>
              Updated <time dateTime="2026-10-24">24 October 2026</time>. This
              page explains the portfolio’s current enquiry and measurement
              features.
            </p>
          </header>
          <section>
            <h2>Enquiry drafts and messages</h2>
            <p>
              The enquiry form prepares a draft in your browser. You choose
              whether to open it in Gmail or WhatsApp, review it and send it.
              Preparing or opening a draft does not confirm that a message was
              sent. The current form does not submit its contents to a portfolio
              enquiry database.
            </p>
            <p>
              A draft can include the name, email, project description, service
              and budget you enter. Those details are passed to the selected
              external service when you open the draft. Gmail and WhatsApp
              handle information under their own terms and privacy policies.
              Avoid including passwords, access tokens or other secrets in a
              project enquiry.
            </p>
          </section>
          <section>
            <h2>Optional Google Analytics</h2>
            <p>
              Google Analytics loads after you choose Allow analytics. It helps
              measure page visits, approximate country and enquiry-button
              activity. The site’s explicit enquiry events contain the contact
              channel and budget currency, rather than your name, email, phone
              number or project message.
            </p>
            <p>
              Page measurement excludes URL query strings and fragments. The
              site sends the referring website’s origin rather than its full
              page address. Analytics may also process browser, device and
              session information as part of Google’s service. This website’s
              configuration disables advertising personalisation and Google
              Signals.
            </p>
          </section>
          <section>
            <h2>Your preferences</h2>
            <p>
              The site remembers your analytics choice in browser local storage.
              You can revisit Analytics preferences and decline future
              measurement. This does not erase information already processed by
              Google. Clearing browser storage removes the saved choice on that
              browser.
            </p>
            <p>
              The enquiry form also remembers a selected budget currency. An
              approximate country setting supplied by the hosting platform helps
              select INR or USD initially; you can change the currency yourself.
              These settings do not prevent you from viewing the site or
              contacting Sayan.
            </p>
          </section>
          <section>
            <h2>Hosting and external websites</h2>
            <p>
              The hosting platform processes requests needed to deliver the
              site. External project, social, Gmail and WhatsApp links take you
              to other services. Their handling of requests and messages is
              separate from this portfolio’s optional analytics controls.
            </p>
          </section>
          <section>
            <h2>Questions about information you share</h2>
            <p>
              Contact Sayan Mondal at{" "}
              <a
                href={gmailComposeUrl({ subject: "Website privacy question" })}
                target="_blank"
                rel="noopener noreferrer"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              with questions about this website or an enquiry you sent. Describe
              the request without including sensitive account credentials.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
