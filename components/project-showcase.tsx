import Image from "next/image";
import Link from "next/link";
import { CommerceShowcase, GameStudioShowcase } from "./extended-showcases";
import { Arrow, Spark } from "./icons";
import {
  clientProjects,
  otherProjects,
  laundryProjects,
  ownProduct,
  type Project,
} from "@/lib/projects";

export function ProjectBrand({ project }: { project: Project }) {
  const isIcon = project.id === "freshcart" || project.id === "radha";
  if (!project.logo)
    return <span className="project-brand-text">{project.name}</span>;
  return (
    <span
      className={`project-brand project-brand-${project.id}${isIcon ? " project-brand-with-name" : ""}`}
    >
      <span className="project-brand-mark">
        <Image
          src={project.logo}
          alt={`${project.name} logo`}
          width={isIcon ? 42 : 150}
          height={42}
          className="project-brand-image"
        />
      </span>
      {isIcon ? <strong>{project.name}</strong> : null}
    </span>
  );
}

export function PhoneMockup({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <div
      className={`product-phone product-phone-${project.id}${large ? " product-phone-large" : ""}`}
    >
      <span
        className="phone-side-button phone-side-button-left"
        aria-hidden="true"
      />
      <span
        className="phone-side-button phone-side-button-right"
        aria-hidden="true"
      />
      <div className="product-phone-screen">
        <Image
          src={project.image!}
          alt={
            project.imageAlt || `${project.name} mobile application screenshot`
          }
          width={project.imageWidth || 1080}
          height={project.imageHeight || 2400}
          sizes={
            large
              ? "(max-width:700px) 70vw, 310px"
              : "(max-width:700px) 46vw, 215px"
          }
          className="product-phone-shot"
        />
      </div>
    </div>
  );
}

export function BrowserMockup({ project }: { project: Project }) {
  return (
    <div className="product-browser">
      <div className="product-browser-toolbar" aria-hidden="true">
        <span className="browser-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-address">
          {project.browserLabel ||
            (project.id === "opslin" ? "dash.opslin.com" : project.name)}
        </span>
        <span>↗</span>
      </div>
      <Image
        src={project.image!}
        alt={project.imageAlt || `${project.name} dashboard`}
        width={project.imageWidth || 2940}
        height={project.imageHeight || 1512}
        sizes="(max-width:700px) 90vw, 800px"
      />
    </div>
  );
}

const cardLabels: Record<string, string[]> = {
  freshcart: ["B2C + B2B", "Fresh food commerce"],
  dealker: ["Shop. Bid. Repair.", "Electronics marketplace"],
  bakaloo: ["Local stores, connected", "Grocery delivery"],
  radha: ["Scan. Track. Act.", "Retail command center"],
};

export function ProjectShowcase() {
  return (
    <section
      className="client-showcase shell section-space"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <div className="section-label" data-reveal>
            <span className="section-dot" />
            Selected work <span className="section-number">02 /</span>
          </div>
          <h2 id="work-title" data-reveal>
            Client work.
            <br />
            <span className="muted">Made for real people.</span>
          </h2>
        </div>
        <p className="section-intro" data-reveal>
          Real interfaces. Real products.
          <br />A closer look at the mobile experiences
          <br />
          I’ve built for clients.
        </p>
      </div>
      <div className="client-project-grid">
        {clientProjects.map((project, index) => (
          <article
            className={`client-project-card client-card-${project.id}`}
            key={project.id}
            data-reveal
          >
            <Link
              href={`/work/${project.id}`}
              className="client-project-link"
              aria-label={`${project.name} — client project details`}
            >
              <div className="client-card-top">
                <ProjectBrand project={project} />
                <span className="project-relationship">Client project</span>
              </div>
              <div className="client-card-art">
                <span className="client-art-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="client-art-name" aria-hidden="true">
                  {project.name}
                </span>
                <div className="client-art-labels" aria-hidden="true">
                  <span>{cardLabels[project.id][0]}</span>
                  <span>{cardLabels[project.id][1]}</span>
                </div>
                <PhoneMockup project={project} />
              </div>
              <div className="client-card-caption">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.category}</p>
                </div>
                <span className="client-card-arrow">
                  <Arrow />
                </span>
              </div>
            </Link>
            <div className="client-card-meta">
              <span>{project.tags.slice(0, 2).join(" / ")}</span>
              <Link href={`/work/${project.id}`}>
                Explore project <Arrow />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <CommerceShowcase />
      <section
        className="laundry-projects"
        id="lndry-projects"
        aria-labelledby="laundry-title"
      >
        <div className="laundry-section-heading" data-reveal>
          <div>
            <div className="section-label">
              <span className="section-dot" />
              Product systems
            </div>
            <h2 id="laundry-title">
              One brand.
              <br />
              <span className="muted">Two distinct projects.</span>
            </h2>
          </div>
          <p>
            The customer experience.
            <br />
            And the tools behind the counter.
            <br />
            Explore LNDRY and LNDRY POS separately.
          </p>
        </div>
        <div className="laundry-project-grid">
          {laundryProjects.map((project) => {
            const webImage = project.gallery!.find(
              (item) => item.format === "desktop",
            )!;
            const phoneImage = project.gallery!.find(
              (item) => item.format === "mobile",
            )!;
            return (
              <article
                className={`laundry-project-card laundry-card-${project.id}`}
                key={project.id}
                data-reveal
              >
                <Link
                  href={`/work/${project.id}`}
                  aria-label={`${project.name} — ${project.id === "lndry" ? "customer app and website" : "store POS system"}`}
                  className="laundry-project-main"
                >
                  <div className="laundry-card-top">
                    <ProjectBrand project={project} />
                    <span className="project-relationship">
                      {project.id === "lndry"
                        ? "Customer app + website"
                        : "Store POS · Mobile + web"}
                    </span>
                  </div>
                  <div className="laundry-preview-stage">
                    <BrowserMockup
                      project={{
                        ...project,
                        image: webImage.src,
                        imageWidth: webImage.width,
                        imageHeight: webImage.height,
                        imageAlt: webImage.alt,
                      }}
                    />
                    <PhoneMockup
                      project={{
                        ...project,
                        image: phoneImage.src,
                        imageWidth: phoneImage.width,
                        imageHeight: phoneImage.height,
                        imageAlt: phoneImage.alt,
                      }}
                    />
                  </div>
                  <div className="laundry-card-copy">
                    <div>
                      <span className="laundry-card-kicker">
                        {project.id === "lndry"
                          ? "For the customer"
                          : "For the physical store"}
                      </span>
                      <h3>{project.name}</h3>
                      <p>
                        {project.id === "lndry"
                          ? "Discover care. Book a pickup. Follow every stage."
                          : "Book orders. Manage garments. Run the counter."}
                      </p>
                    </div>
                    <span className="client-card-arrow">
                      <Arrow />
                    </span>
                  </div>
                </Link>
                <div className="laundry-card-footer">
                  <span>
                    {project.gallery!.length} real screens /{" "}
                    {project.id === "lndry"
                      ? "App & website"
                      : "Mobile & desktop"}
                  </span>
                  <Link href={`/work/${project.id}`}>
                    Explore all views <Arrow />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <GameStudioShowcase />
      <div className="own-product-heading" data-reveal>
        <div className="section-label">
          <span className="section-dot" />
          Built by me
        </div>
        <h2>
          A product of my own.
          <br />
          <span className="muted">From code to control plane.</span>
        </h2>
      </div>
      <article className="own-product-panel" data-reveal>
        <div className="own-product-copy">
          <span className="own-product-badge">
            My product / Founder & engineer
          </span>
          <ProjectBrand project={ownProduct} />
          <h3>
            Your server.
            <br />
            Your rules.
          </h3>
          <p>
            I founded Opslin to make deploying and operating software on your
            own VPS feel clear and connected.
          </p>
          <ul>
            <li>Apps, deployments & databases</li>
            <li>Monitoring, alerts & recovery</li>
            <li>Permissioned AI operations through MCP beta</li>
          </ul>
          <Link className="pill pill-dark" href="/work/opslin">
            Explore Opslin
            <span className="button-icon">
              <Arrow />
            </span>
          </Link>
          <a
            className="text-link"
            href="https://www.opslin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit the product <Arrow />
          </a>
        </div>
        <Link
          href="/work/opslin"
          className="own-product-demo"
          aria-label="Explore the Opslin deployment platform"
        >
          <BrowserMockup project={ownProduct} />
          <span className="own-demo-caption">
            <span className="availability-dot" />
            Actual Opslin product interface
          </span>
        </Link>
      </article>
      <div className="more-work" data-reveal>
        <span>More from the studio.</span>
        <div>
          {otherProjects.map((project) => (
            <Link
              className="more-work-link"
              href={`/work/${project.id}`}
              key={project.id}
            >
              {project.name}
              <span>{project.category}</span>
              <Arrow />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectDetailVisual({ project }: { project: Project }) {
  if (project.format === "game" && project.image)
    return (
      <div className="detail-game-art">
        <Image
          src={project.image}
          width={project.imageWidth || 2400}
          height={project.imageHeight || 1080}
          alt={project.imageAlt || project.name}
          sizes="(max-width:700px) 90vw, 1200px"
        />
      </div>
    );
  if (project.format === "mobile" && project.image)
    return (
      <div className={`detail-product-stage client-card-${project.id}`}>
        <span className="detail-stage-word" aria-hidden="true">
          {project.name}
        </span>
        <PhoneMockup project={project} large />
      </div>
    );
  if (project.image)
    return (
      <div className="detail-browser-stage">
        <BrowserMockup project={project} />
      </div>
    );
  return (
    <div className="detail-product-stage detail-type-stage">
      <Spark />
      <span>{project.name}</span>
    </div>
  );
}
