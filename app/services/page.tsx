import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/icons";
import { servicePages } from "@/lib/services";
import { siteOrigin, jsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Website, App & Software Development Services — Sayan Mondal",
  },
  description:
    "Explore websites, Flutter apps, custom software, AI workflows and cloud deployment by Sayan Mondal. Based in Kolkata, serving remote businesses worldwide.",
  alternates: { canonical: "/services" },
  twitter: {
    card: "summary_large_image",
    title: "Development services — Sayan Mondal",
    description:
      "Websites, Flutter apps, custom software and cloud engineering for remote clients worldwide.",
    images: ["/opengraph-image"],
  },
  openGraph: {
    title: "Development services — Sayan Mondal",
    description:
      "Websites, mobile apps, business software and cloud engineering for remote clients worldwide.",
    url: "/services",
    type: "website",
    images: ["/opengraph-image"],
  },
};
export default function Services() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            url: `${siteOrigin}/services`,
            name: "Development services by Sayan Mondal",
            isPartOf: { "@id": `${siteOrigin}/#website` },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: servicePages.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.title,
                url: `${siteOrigin}/services/${s.slug}`,
              })),
            },
          }),
        }}
      />
      <header className="work-detail-header shell">
        <Brand href="/" />
        <Link className="text-link" href="/#work">
          See the work →
        </Link>
      </header>
      <main id="main" className="opslin-guide shell">
        <article>
          <header>
            <span className="section-label">
              Shotlin founder / Software engineer
            </span>
            <h1>Development services for the way your business works.</h1>
            <p>
              I’m Sayan Mondal, founder of Shotlin and Opslin. I build websites,
              mobile applications, custom software and the cloud systems behind
              them. I’m based in Kolkata, India and work remotely with
              businesses worldwide.
            </p>
          </header>
          <div className="service-proof-grid">
            {servicePages.map((s) => (
              <Link href={`/services/${s.slug}`} key={s.slug}>
                <h2>{s.title}</h2>
                <p>{s.description}</p>
                <span>Scope, project examples and questions →</span>
              </Link>
            ))}
          </div>
          <section>
            <h2>Start with a useful first release.</h2>
            <p>
              Tell me what your customers or team need to do, what is getting in
              the way today, and which systems are already in place. We can then
              discuss the smallest useful scope, the integrations it needs and
              how it will be maintained after launch.
            </p>
            <p>
              You can explore actual app and platform screenshots in the
              portfolio before making an enquiry. Budget and timing depend on
              the agreed work; a clear brief is more useful than an estimate
              made without requirements.
            </p>
          </section>
          <section>
            <h2>Prepare your project brief.</h2>
            <p>
              The{" "}
              <Link href="/insights/website-app-project-brief">
                website and app project brief checklist
              </Link>{" "}
              covers audiences, workflows, integrations, budget, delivery and
              handover. It works whether you are comparing an independent
              developer or a software agency.
            </p>
          </section>
          <footer className="project-detail-cta">
            <Link className="pill pill-dark" href="/#contact">
              Discuss your project →
            </Link>
            <Link className="text-link" href="/#work">
              Explore project evidence →
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}
