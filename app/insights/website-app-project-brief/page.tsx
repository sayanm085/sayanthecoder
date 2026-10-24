import type { Metadata } from "next";
import Link from "next/link";
import { Brand } from "@/components/icons";
import {
  projectBriefPath,
  projectBriefTitle,
  projectBriefDescription,
  projectBriefSections,
} from "@/lib/project-brief";
import { siteOrigin, jsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${projectBriefTitle} — Sayan Mondal` },
  description: projectBriefDescription,
  alternates: { canonical: projectBriefPath },
  authors: [{ name: "Sayan Mondal", url: siteOrigin }],
  openGraph: {
    type: "article",
    url: projectBriefPath,
    title: projectBriefTitle,
    description: projectBriefDescription,
    authors: [siteOrigin],
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: projectBriefTitle,
    description: projectBriefDescription,
    images: ["/opengraph-image"],
  },
};
export default function ProjectBrief() {
  const url = `${siteOrigin}${projectBriefPath}`;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": `${url}#article`,
                headline: projectBriefTitle,
                description: projectBriefDescription,
                url,
                mainEntityOfPage: url,
                inLanguage: "en",
                dateCreated: "2026-10-24",
                dateModified: "2026-10-24",
                author: {
                  "@type": "Person",
                  "@id": `${siteOrigin}/#sayan`,
                  name: "Sayan Mondal",
                  url: siteOrigin,
                },
                image: `${siteOrigin}/opengraph-image`,
                articleBody: projectBriefSections
                  .map((s) => `${s.title}\n${s.text}`)
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
                    name: projectBriefTitle,
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
        <Link className="text-link" href="/services">
          Development services →
        </Link>
      </header>
      <main id="main" className="opslin-guide shell">
        <article>
          <header>
            <span className="section-label">
              A practical guide / Planning a build
            </span>
            <h1>{projectBriefTitle}</h1>
            <p className="opslin-guide-deck">
              Describe the work clearly before choosing a developer, agency or
              technology.
            </p>
            <p className="opslin-byline">
              By <Link href="/#about">Sayan Mondal</Link> · Written and reviewed{" "}
              <time dateTime="2026-10-24">24 October 2026</time>
            </p>
          </header>
          <p>
            A useful brief explains the business task, who needs to complete it,
            the essential workflows and the systems involved. Add your
            constraints, estimate assumptions and handover expectations. This
            checklist helps you prepare that conversation without needing
            technical vocabulary.
          </p>
          <p>
            <a
              className="text-link"
              href="/resources/project-brief-template.txt"
              download
            >
              Download the editable project brief template →
            </a>
          </p>
          {projectBriefSections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          <section>
            <h2>Explore the work that fits your brief.</h2>
            <div className="service-cross-links">
              <Link
                className="text-link"
                href="/services/website-web-app-development"
              >
                Websites & web applications →
              </Link>
              <Link
                className="text-link"
                href="/services/flutter-app-development"
              >
                Flutter mobile apps →
              </Link>
              <Link
                className="text-link"
                href="/services/custom-software-ai-development"
              >
                Custom software & AI →
              </Link>
              <Link
                className="text-link"
                href="/services/devops-cloud-deployment"
              >
                DevOps & deployment →
              </Link>
            </div>
          </section>
          <footer className="project-detail-cta">
            <div>
              <span className="section-label">Tell me what you need</span>
              <h2>Start with your project.</h2>
            </div>
            <Link className="pill pill-dark" href="/#contact">
              Discuss your brief →
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}
