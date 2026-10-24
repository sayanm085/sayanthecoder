import { gmailComposeUrl } from "@/lib/contact";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Brand } from "@/components/icons";
import {
  ProjectBrand,
  ProjectDetailVisual,
} from "@/components/project-showcase";
import { getProject, projects } from "@/lib/projects";
import { ProjectGallery } from "@/components/project-gallery";
import { jsonLd, siteOrigin } from "@/lib/site";
import { OpslinProductDetails } from "@/components/opslin-product-details";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const title =
    project.id === "opslin"
      ? "Opslin — VPS Deployment & AI DevOps"
      : `${project.name} — ${project.category}`;
  return {
    title,
    description: project.seoDescription,
    alternates: { canonical: `/work/${project.id}` },
    openGraph: {
      title: `${title} | SayanTheCoder`,
      description: project.seoDescription,
      url: `/work/${project.id}`,
      type: "article",
      images: [
        {
          url: `/work/${project.id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.name} — ${project.relationship} by Sayan Mondal`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.seoDescription,
      images: [`/work/${project.id}/opengraph-image`],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const companion = project.companionId
    ? getProject(project.companionId)
    : undefined;
  const related = projects
    .filter((item) => item.id !== project.id && item.image)
    .slice(0, 3);
  const pageUrl = `${siteOrigin}/work/${project.id}`;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type":
                  project.id === "opslin"
                    ? "SoftwareApplication"
                    : project.format === "game"
                      ? "VideoGame"
                      : "CreativeWork",
                ...(project.id === "opslin"
                  ? {
                      applicationCategory: "DeveloperApplication",
                      operatingSystem: "Web dashboard; supported Linux VPS",
                      sameAs: "https://www.opslin.com/",
                      publisher: {
                        "@type": "Organization",
                        "@id": `${siteOrigin}/#opslin`,
                        name: "Opslin",
                        url: "https://www.opslin.com/",
                        founder: {
                          "@type": "Person",
                          "@id": `${siteOrigin}/#sayan`,
                          name: "Sayan Mondal",
                        },
                      },
                    }
                  : {}),
                creativeWorkStatus: project.status,
                "@id": `${pageUrl}#project`,
                name: project.name,
                description: project.description,
                url: pageUrl,
                image: project.gallery
                  ? project.gallery.map((item) => `${siteOrigin}${item.src}`)
                  : project.image
                    ? `${siteOrigin}${project.image}`
                    : undefined,
                creator: {
                  "@type": "Person",
                  "@id": `${siteOrigin}/#sayan`,
                  name: "Sayan Mondal",
                  url: siteOrigin,
                },
                genre: project.category,
                keywords: project.tags.join(", "),
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
                    name: "Selected work",
                    item: `${siteOrigin}/#work`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: project.name,
                    item: pageUrl,
                  },
                ],
              },
            ],
          }),
        }}
      />
      <header className="work-detail-header shell">
        <Brand href="/" />
        <Link href="/#work" className="text-link">
          All projects <Arrow diagonal={false} />
        </Link>
      </header>
      <main className={`project-detail-page detail-${project.id}`} id="main">
        <div className="shell">
          <nav className="project-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/#work">Work</Link>
            <span>/</span>
            <span aria-current="page">{project.name}</span>
          </nav>
          <div className="project-detail-heading">
            <div>
              <div className="project-detail-kicker">
                <span className="project-relationship">
                  {project.relationship}
                </span>
                {project.status ? (
                  <span className="project-status">{project.status}</span>
                ) : null}
              </div>
              <h1
                className={
                  project.name.length > 15 ? "project-title-long" : undefined
                }
              >
                {project.name}
                <span>.</span>
              </h1>
              <p className="project-detail-headline">{project.headline}</p>
            </div>
            <div className="project-detail-summary">
              <ProjectBrand project={project} />
              <p>{project.description}</p>
              <div className="case-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
          {project.gallery ? (
            <ProjectGallery
              name={project.name}
              images={project.gallery}
              address={project.browserLabel}
            />
          ) : (
            <ProjectDetailVisual project={project} />
          )}
          <div className="project-detail-caption">
            <span>
              {project.imageCaption ||
                `Actual ${project.name} product ${project.format === "desktop" ? "dashboard" : "interface"}`}
            </span>
            <span>
              {project.relationship} · {project.category}
            </span>
          </div>
          <section
            className="project-story"
            aria-labelledby="project-story-title"
          >
            <div>
              <span className="section-label">
                <span className="section-dot" />
                The project
              </span>
              <h2 id="project-story-title">
                The thinking
                <br />
                behind the screen.
              </h2>
              <p>
                {project.relationship === "My product"
                  ? "An independent product I created and continue to build."
                  : "A closer look at the experience, the workflows and the systems that connect them."}
              </p>
            </div>
            <div className="project-story-points">
              {project.highlights.map((highlight, index) => (
                <article key={highlight.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{highlight.title}</h3>
                    <p>{highlight.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          {project.id === "opslin" ? <OpslinProductDetails /> : null}
          {project.secondary ? (
            <section
              className="project-secondary"
              aria-label={`${project.name} additional product screenshot`}
            >
              <h2>Another view of the product.</h2>
              <Image
                src={project.secondary}
                alt={`${project.name} additional product interface`}
                width={project.secondaryWidth || project.imageWidth || 1800}
                height={project.secondaryHeight || project.imageHeight || 738}
                sizes="(max-width:700px) 90vw, 1000px"
              />
            </section>
          ) : null}
          {companion ? (
            <aside className="companion-project">
              <div>
                <span className="section-label">A related project</span>
                <h2>{companion.name}</h2>
                <p>
                  {project.companionText ||
                    `Explore ${companion.name} as a separate project with its own screens and details.`}
                </p>
              </div>
              <Link href={`/work/${companion.id}`} className="pill pill-dark">
                Explore {companion.name}
                <span className="button-icon">
                  <Arrow />
                </span>
              </Link>
            </aside>
          ) : null}
          <section className="project-detail-cta">
            <div>
              <span className="section-label">
                {project.id === "opslin"
                  ? "My independent product"
                  : "Have a similar idea?"}
              </span>
              <h2>
                {project.id === "opslin"
                  ? "Explore Opslin."
                  : "Let’s make it real."}
              </h2>
            </div>
            <div>
              {project.id === "opslin" ? (
                <a
                  href="https://www.opslin.com/"
                  className="pill pill-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Opslin{" "}
                  <span className="button-icon">
                    <Arrow />
                  </span>
                </a>
              ) : (
                <Link href="/#contact" className="pill pill-dark">
                  Discuss your project{" "}
                  <span className="button-icon">
                    <Arrow />
                  </span>
                </Link>
              )}
              {project.href && project.id !== "opslin" ? (
                <a
                  className="text-link"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.linkLabel}
                  <Arrow />
                </a>
              ) : null}
              {project.externalLinks?.map((link) => (
                <a
                  className="text-link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={link.href}
                >
                  {link.label}
                  <Arrow />
                </a>
              ))}
            </div>
          </section>
          <section className="related-projects" aria-labelledby="related-title">
            <h2 id="related-title">More work to explore.</h2>
            <div>
              {related.map((item) => (
                <Link href={`/work/${item.id}`} key={item.id}>
                  <span>{item.relationship}</span>
                  <strong>{item.name}</strong>
                  <span>{item.category}</span>
                  <Arrow />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <footer className="project-detail-footer shell">
        <Brand href="/" />
        <span>© 2026 Sayan Mondal</span>
        <a href={gmailComposeUrl()} target="_blank" rel="noopener noreferrer">
          sayan@opslin.com <Arrow />
        </a>
      </footer>
    </>
  );
}
