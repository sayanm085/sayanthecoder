import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/icons";
import {
  opslinGuideDescription,
  opslinGuidePath,
  opslinGuideSections,
  opslinGuideTitle,
} from "@/lib/opslin-content";
import { jsonLd, siteOrigin } from "@/lib/site";

export const metadata: Metadata = {
  title: opslinGuideTitle,
  description: opslinGuideDescription,
  authors: [{ name: "Sayan Mondal", url: siteOrigin }],
  alternates: { canonical: opslinGuidePath },
  openGraph: {
    type: "article",
    title: opslinGuideTitle,
    description: opslinGuideDescription,
    url: opslinGuidePath,
    authors: [siteOrigin],
    images: [
      {
        url: "/work/opslin/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Opslin — VPS deployment platform founded by Sayan Mondal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: opslinGuideTitle,
    description: opslinGuideDescription,
    images: ["/work/opslin/opengraph-image"],
  },
};

export default function OpslinGuide() {
  const url = `${siteOrigin}${opslinGuidePath}`;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                "@id": `${url}#article`,
                headline: opslinGuideTitle,
                description: opslinGuideDescription,
                mainEntityOfPage: url,
                url,
                inLanguage: "en",
                dateCreated: "2026-10-24",
                dateModified: "2026-10-24",
                author: {
                  "@type": "Person",
                  "@id": `${siteOrigin}/#sayan`,
                  name: "Sayan Mondal",
                  url: siteOrigin,
                  sameAs: ["https://www.linkedin.com/in/sayanthe-coder/"],
                },
                publisher: { "@id": `${siteOrigin}/#sayan` },
                image: `${siteOrigin}/assets/projects/opslin-dashboard.webp`,
                about: {
                  "@type": "SoftwareApplication",
                  "@id": `${siteOrigin}/work/opslin#project`,
                  name: "Opslin",
                  url: "https://www.opslin.com/",
                },
                articleSection: "Cloud infrastructure and DevOps",
                articleBody: opslinGuideSections
                  .map((s) => `${s.title}\n${s.paragraphs.join("\n")}`)
                  .join("\n\n"),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: siteOrigin,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Opslin deployment guide",
                    item: url,
                  },
                ],
              },
            ],
          }),
        }}
      />
      <header className="work-detail-header shell">
        <Brand href="/" />
        <Link className="text-link" href="/work/opslin">
          Explore Opslin →
        </Link>
      </header>
      <main id="main" className="opslin-guide shell">
        <nav className="project-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Opslin deployment guide</span>
        </nav>
        <article>
          <header>
            <span className="section-label">
              Founder’s notes / Cloud & DevOps
            </span>
            <h1>{opslinGuideTitle}</h1>
            <p className="opslin-guide-deck">
              Your server. Your software. One connected path from code to
              operation.
            </p>
            <p className="opslin-byline">
              By <Link href="/#about">Sayan Mondal</Link> · Founder of Opslin
              and Shotlin
            </p>
            <p className="opslin-byline">
              Written and reviewed{" "}
              <time dateTime="2026-10-24">24 October 2026</time>
            </p>
          </header>
          <nav className="opslin-guide-contents" aria-label="In this article">
            <strong>In this guide</strong>
            {opslinGuideSections.map((s, i) => (
              <a key={s.title} href={`#section-${i + 1}`}>
                {s.title}
              </a>
            ))}
          </nav>
          {opslinGuideSections.map((section, i) => (
            <section key={section.title} id={`section-${i + 1}`}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}
          <aside className="opslin-guide-sources">
            <h2>Product reference</h2>
            <p>
              Capabilities and availability checked against the{" "}
              <a
                href="https://www.opslin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                official Opslin website
              </a>{" "}
              on 24 October 2026. Check the product site for current
              compatibility and beta limits.
            </p>
          </aside>
          <footer className="project-detail-cta">
            <div>
              <span className="section-label">Explore my product</span>
              <h2>Meet Opslin.</h2>
            </div>
            <a
              className="pill pill-dark"
              href="https://www.opslin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Opslin →
            </a>
            <Link className="text-link" href="/work/opslin">
              See the product overview →
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}
