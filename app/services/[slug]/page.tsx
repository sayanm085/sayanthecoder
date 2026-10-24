import { gmailComposeUrl } from "@/lib/contact";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Brand } from "@/components/icons";
import { ServiceEnquiry } from "@/components/service-enquiry";
import { servicePages } from "@/lib/services";
import { getProject } from "@/lib/projects";
import { jsonLd, siteOrigin } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePages.find((s) => s.slug === slug);
  if (!service) return {};
  const path = `/services/${service.slug}`;
  return {
    title: { absolute: service.seoTitle },
    description: service.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: service.seoTitle,
      description: service.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.description,
      images: ["/opengraph-image"],
    },
  };
}
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicePages.find((s) => s.slug === slug);
  if (!service) notFound();
  const url = `${siteOrigin}/services/${slug}`;
  const proof = service.projectIds
    .map(getProject)
    .filter((p) => p !== undefined);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `${url}#page`,
                url,
                name: service.seoTitle,
                description: service.description,
                inLanguage: "en",
                mainEntity: { "@id": `${url}#service` },
                isPartOf: { "@id": `${siteOrigin}/#website` },
              },
              {
                "@type": "Service",
                "@id": `${url}#service`,
                name: service.title,
                description: service.description,
                url,
                serviceType: service.title,
                provider: {
                  "@type": "Person",
                  "@id": `${siteOrigin}/#sayan`,
                  name: "Sayan Mondal",
                  url: siteOrigin,
                },
                areaServed: { "@type": "Place", name: "Worldwide" },
                mainEntityOfPage: { "@id": `${url}#page` },
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
                    name: "Development services",
                    item: `${siteOrigin}/services`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: service.title,
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
          All development services →
        </Link>
      </header>
      <main id="main" className="opslin-guide service-page shell">
        <nav className="project-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/services">Development services</Link>
          <span>/</span>
          <span aria-current="page">{service.title}</span>
        </nav>
        <article>
          <header>
            <span className="section-label">
              Sayan Mondal / Engineering services
            </span>
            <h1>{service.title}</h1>
            <p>{service.intro}</p>
          </header>
          {service.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          <section aria-labelledby="remote-delivery-title">
            <h2 id="remote-delivery-title">Working together across borders.</h2>
            <p>
              I’m based in Kolkata, India and available for remote projects
              worldwide, including the UK, Australia, UAE, US and Canada. Share
              your country, time zone and preferred review times when you
              enquire. Scope, communication, account access, handover and
              support expectations should be agreed before development starts.
            </p>
            <p>
              <Link href="/insights/website-app-project-brief">
                Use the website and app project brief checklist
              </Link>{" "}
              to describe what your business needs before requesting an
              estimate.
            </p>
          </section>
          <section aria-labelledby="service-proof-title">
            <h2 id="service-proof-title">Explore the related work.</h2>
            <div className="service-proof-grid">
              {proof.map((project) => (
                <Link key={project.id} href={`/work/${project.id}`}>
                  <span>{project.relationship}</span>
                  <h3>{project.name}</h3>
                  <p>{project.category}</p>
                  <span>View project →</span>
                </Link>
              ))}
            </div>
          </section>
          <section aria-labelledby="service-questions-title">
            <h2 id="service-questions-title">
              Questions before getting started.
            </h2>
            <div className="opslin-faqs">
              {service.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
          <section>
            <h2>Other ways I can help.</h2>
            <div className="service-cross-links">
              <Link className="text-link" href="/services">
                Browse all development services →
              </Link>
              {servicePages
                .filter((s) => s.slug !== slug)
                .map((s) => (
                  <Link
                    className="text-link"
                    key={s.slug}
                    href={`/services/${s.slug}`}
                  >
                    {s.title} →
                  </Link>
                ))}
              <Link
                className="text-link"
                href="/insights/opslin-vps-deployment"
              >
                Opslin deployment guide →
              </Link>
            </div>
          </section>
          <footer className="project-detail-cta">
            <div>
              <span className="section-label">Discuss the scope</span>
              <h2>Let’s understand your project.</h2>
            </div>
            <div>
              <ServiceEnquiry service={service.title} />
              <a
                className="text-link"
                href={gmailComposeUrl({ subject: service.title + " enquiry" })}
                target="_blank"
                rel="noopener noreferrer"
              >
                Or open Gmail directly →
              </a>
            </div>
          </footer>
        </article>
      </main>
    </>
  );
}
