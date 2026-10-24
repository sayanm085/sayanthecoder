import { gmailComposeUrl } from "@/lib/contact";
import { Arrow, Brand, Spark } from "@/components/icons";
import { SiteExperience } from "@/components/site-experience";
import { LiquidHero } from "@/components/liquid-hero";
import { HeroFeature, HeroClock } from "@/components/hero-feature";
import { projects } from "@/lib/projects";
import { ProjectShowcase, ProjectBrand } from "@/components/project-showcase";
import { siteOrigin, jsonLd } from "@/lib/site";
import { servicePages, profileFaqs } from "@/lib/services";

const services = [
  {
    title: "Web & product engineering",
    copy: "Fast, accessible websites and full-stack products. From the first wireframe to the API, database and production release.",
    tags: "Next.js / TypeScript / SaaS",
    detail:
      "Landing pages, dashboards, multi-tenant SaaS, authentication, payments and realtime experiences. Designed around the people using them and built for the teams maintaining them.",
  },
  {
    title: "Mobile app development",
    copy: "Thoughtfully crafted Flutter apps that feel at home on both iOS and Android.",
    tags: "Flutter / iOS / Android",
    detail:
      "Customer apps, vendor tools and delivery experiences, with clean architecture, dependable state management, notifications, payments and live tracking.",
  },
  {
    title: "AI & intelligent automation",
    copy: "Useful intelligence, woven into your product and the way your team works.",
    tags: "Agents / RAG / Workflows",
    detail:
      "Tool-using agents, retrieval systems and practical automations that connect to real operations. Clear inputs, measurable outputs and a human in control where it matters.",
  },
  {
    title: "Cloud & infrastructure",
    copy: "Reliable systems behind a seamless experience. Built to deploy, observe and grow.",
    tags: "Go / Docker / DevOps",
    detail:
      "Deployment pipelines, server provisioning, containerized services, SSL, monitoring and self-hosted infrastructure. A considered foundation from the start.",
  },
  {
    title: "Game design & development",
    copy: "Playable worlds for mobile and PC. 2D and 2.5D games designed and developed with Unity and Godot.",
    tags: "Unity / Godot / 2D & 2.5D / Mobile & PC",
    detail:
      "Game concepts, gameplay systems, level and environment design, prototyping, touch and desktop controls, game UI, animation integration and performance tuning. From an early playable build to production and launch preparation.",
  },
];

export default function Home() {
  return (
    <>
      <SiteExperience />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${siteOrigin}/#sayan`,
                name: "Sayan Mondal",
                alternateName: "SayanTheCoder",
                url: siteOrigin,
                jobTitle:
                  "Founder of Opslin and Shotlin; software and DevOps engineer",
                image: `${siteOrigin}/assets/img/sayan-studio-color.webp`,
                description:
                  "Sayan Mondal is the founder of Opslin and Shotlin, building software, cloud infrastructure and DevOps tools from Kolkata, India.",
                worksFor: [
                  { "@id": `${siteOrigin}/#opslin` },
                  { "@id": `${siteOrigin}/#shotlin` },
                ],
                sameAs: [
                  "https://www.linkedin.com/in/sayanthe-coder/",
                  "https://www.fiverr.com/sayanthecoder",
                  "https://www.instagram.com/sayanthecoder/",
                ],
                knowsAbout: [
                  "Flutter",
                  "Next.js",
                  "Full-stack development",
                  "AI automation",
                  "DevOps",
                  "Cloud computing",
                  "Cloud development",
                  "VPS deployment",
                  "CI/CD",
                  "AI-assisted deployment",
                  "Game design",
                  "Game development",
                  "Unity",
                  "Godot",
                  "2D and 2.5D games",
                ],
              },
              {
                "@type": "Organization",
                "@id": `${siteOrigin}/#opslin`,
                name: "Opslin",
                url: "https://www.opslin.com/",
                founder: { "@id": `${siteOrigin}/#sayan` },
                description:
                  "A bring-your-own-VPS deployment platform with a permissioned MCP beta for AI-assisted deployment operations.",
              },
              {
                "@type": "Organization",
                "@id": `${siteOrigin}/#shotlin`,
                name: "Shotlin",
                founder: { "@id": `${siteOrigin}/#sayan` },
                description:
                  "The independent product studio founded by Sayan Mondal.",
              },
              {
                "@type": "ProfilePage",
                "@id": `${siteOrigin}/#profile`,
                url: siteOrigin,
                name: "Sayan Mondal — DevOps and app developer",
                mainEntity: { "@id": `${siteOrigin}/#sayan` },
                isPartOf: { "@id": `${siteOrigin}/#website` },
              },
              {
                "@type": "WebSite",
                "@id": `${siteOrigin}/#website`,
                url: siteOrigin,
                name: "SayanTheCoder",
                alternateName: "Sayan Mondal",
                inLanguage: "en",
                publisher: { "@id": `${siteOrigin}/#sayan` },
              },
              {
                "@type": "ItemList",
                name: "Sayan Mondal — client projects and independent products",
                itemListElement: projects.map((project, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: project.name,
                  url: `${siteOrigin}/work/${project.id}`,
                })),
              },
            ],
          }),
        }}
      />
      <header className="header shell" id="home">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">Selected work</a>
          <a href="#games">Games</a>
          <a href="#about">About me</a>
          <a href="#services">Expertise</a>
        </nav>
        <div className="header-actions">
          <HeroClock />
          <button className="header-contact" data-contact>
            Let’s talk <Arrow />
          </button>
          <button
            className="menu-toggle"
            data-menu
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero immersive-hero" aria-labelledby="hero-title">
          <LiquidHero />
          <div className="hero-scene-shade" aria-hidden="true" />
          <div className="hero-watermark" aria-hidden="true">
            SAYAN
          </div>
          <div className="immersive-hero-inner shell">
            <div className="hero-copy">
              <div className="hero-eyebrow" data-reveal>
                <span className="availability-dot" />
                Independent engineer. Endlessly curious.
              </div>
              <h1
                id="hero-title"
                aria-label="Thoughtful design. Powerful engineering."
              >
                <span className="hero-line">
                  <span>Thoughtful design.</span>
                </span>
                <span className="hero-line">
                  <span>
                    Powerful engineering<span className="title-period">.</span>
                  </span>
                </span>
              </h1>
              <div className="hero-bottom" data-reveal>
                <p>
                  I’m Sayan Mondal, a DevOps and app developer in Kolkata, and
                  founder of Opslin and Shotlin.
                </p>
                <div className="hero-buttons">
                  <button
                    className="pill pill-dark hero-contact-button"
                    data-contact
                  >
                    Let’s talk{" "}
                    <span className="button-icon">
                      <Spark />
                    </span>
                  </button>
                  <a className="hero-work-link" href="#work">
                    View my work <Arrow />
                  </a>
                </div>
                <div className="hero-signature">
                  <span>Design. Develop. Deploy.</span>
                  <span>Founder, Opslin & Shotlin</span>
                </div>
              </div>
            </div>
            <HeroFeature />
          </div>
          <div className="immersive-hero-foot shell">
            <span>
              FULL-STACK <i>·</i> FLUTTER <i>·</i> AI <i>·</i> DEVOPS
            </span>
            <span className="hero-foot-location">
              Based in Kolkata. Building worldwide.
            </span>
            <a href="#work">
              Scroll to explore <span>↓</span>
            </a>
          </div>
        </section>

        <div
          className="product-strip project-logo-strip shell"
          aria-label="Client projects and independent product"
        >
          <span className="product-strip-label">
            Client work.
            <br />
            <strong>Products of my own.</strong>
          </span>
          {projects
            .filter((project) =>
              [
                "freshcart",
                "dealker",
                "bakaloo",
                "radha",
                "opslin",
                "lndry",
                "agnix-studio",
              ].includes(project.id),
            )
            .map((project) => (
              <a
                href={`/work/${project.id}`}
                key={project.id}
                aria-label={`${project.name} project`}
              >
                <ProjectBrand project={project} />
              </a>
            ))}
        </div>

        <section
          className="about-section shell section-space"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="section-label" data-reveal>
            <span className="section-dot" />A little about me{" "}
            <span className="section-number">01 /</span>
          </div>
          <div className="about-content">
            <h2 id="about-title" data-reveal>
              Good software starts
              <br />
              with a little curiosity.
              <br />
              <span className="muted">And a lot of care.</span>
            </h2>
            <div className="about-bottom" data-reveal>
              <p>
                I’m Sayan Mondal, an independent engineer and founder of Opslin
                and Shotlin. I bring design thinking and hands-on engineering
                together to build complete products — from the interface you
                touch to the infrastructure you don’t see.
              </p>
              <p>
                My cloud development and DevOps work covers deployment
                pipelines, Docker, server operations and AI-assisted workflows.
                Alongside web, mobile and games, I build the systems that keep
                products running.
              </p>
              <a className="text-link" href="#services">
                How I can help <Arrow />
              </a>
            </div>
            <ul
              className="capability-tags"
              aria-label="Engineering and game development skills"
            >
              {[
                "Next.js",
                "Flutter",
                "AI agents",
                "DevOps",
                "Cloud infrastructure",
                "Docker / CI/CD",
                "Unity",
                "Godot",
                "2D & 2.5D",
                "Mobile & PC games",
              ].map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </section>

        <div
          className="create-band shell"
          aria-label="Think, build, launch, repeat"
        >
          <div data-reveal>
            Think<span>01</span>
          </div>
          <div className="create-black" data-reveal>
            Build
            <Spark />
          </div>
          <div className="create-silver" data-reveal>
            <Arrow diagonal={false} />
            <span className="sr-only">then</span>
          </div>
          <div data-reveal>
            Better<span>↗</span>
          </div>
        </div>

        <ProjectShowcase />

        <section
          className="services-section shell section-space"
          id="services"
          aria-labelledby="services-title"
        >
          <div className="section-heading">
            <div>
              <div className="section-label" data-reveal>
                <span className="section-dot" />
                What I do <span className="section-number">03 /</span>
              </div>
              <h2 id="services-title" data-reveal>
                One partner.
                <br />
                <span className="muted">The whole picture.</span>
              </h2>
            </div>
            <p className="section-intro" data-reveal>
              A good product needs more than good code.
              <br />I connect the dots between design,
              <br />
              development, and delivery.
            </p>
          </div>
          <div className="service-list">
            {services.map((service, i) => (
              <details className="service" key={service.title} data-reveal>
                <summary>
                  <span className="service-index">0{i + 1}</span>
                  <span className="service-name">
                    {service.title}
                    <span>{service.tags}</span>
                  </span>
                  <span className="service-copy">{service.copy}</span>
                  <span className="service-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="service-detail">
                  <p>{service.detail}</p>
                  {servicePages.find((page) =>
                    page.serviceTitles.includes(service.title),
                  ) ? (
                    <a
                      className="text-link service-scope-link"
                      href={`/services/${servicePages.find((page) => page.serviceTitles.includes(service.title))!.slug}`}
                    >
                      Explore the scope and related projects <Arrow />
                    </a>
                  ) : null}
                  <button
                    className="text-link"
                    data-contact
                    data-service={service.title}
                  >
                    Let’s talk about your project <Arrow />
                  </button>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section
          className="profile-faq shell section-space"
          aria-labelledby="profile-faq-title"
        >
          <span className="section-label">About my work</span>
          <h2 id="profile-faq-title">A few useful answers.</h2>
          <div className="opslin-faqs">
            {profileFaqs.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className="approach-section shell section-space"
          id="approach"
          aria-labelledby="approach-title"
        >
          <div className="section-label" data-reveal>
            <span className="section-dot" />
            The way I work <span className="section-number">04 /</span>
          </div>
          <div className="approach-heading">
            <h2 id="approach-title" data-reveal>
              A clear process.
              <br />
              <span className="muted">A better outcome.</span>
            </h2>
            <p data-reveal>
              Good communication is part of good engineering.
              <br />
              You’ll know what we’re building, why it matters,
              <br />
              and what comes next.
            </p>
          </div>
          <div className="process-grid">
            {[
              {
                n: "01",
                title: "Find the right problem.",
                copy: "We talk through the idea, the people it’s for, and what success should look like.",
                mark: "◎",
              },
              {
                n: "02",
                title: "Make it feel right.",
                copy: "Turn the direction into clear flows, considered interfaces, and a practical plan.",
                mark: "✳",
              },
              {
                n: "03",
                title: "Build. Refine. Ship.",
                copy: "Thoughtful engineering, honest feedback, and the details that make it ready for the world.",
                mark: "↗",
              },
            ].map((step) => (
              <article className="process-card" key={step.n} data-reveal>
                <div className="process-top">
                  <span>{step.n} /</span>
                  <span className="process-mark" aria-hidden="true">
                    {step.mark}
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="principles-wrap shell"
          aria-labelledby="principles-title"
        >
          <div className="principles-panel" data-reveal>
            <div>
              <div className="section-label">
                <span className="section-dot" />A few things I believe
              </div>
              <h2 id="principles-title">
                The details make
                <br />
                the difference.
              </h2>
            </div>
            <div className="principles-grid">
              <div>
                <span>01</span>
                <h3>Design is engineering.</h3>
                <p>
                  Every pixel, interaction and loading state is part of how a
                  product works.
                </p>
              </div>
              <div>
                <span>02</span>
                <h3>Own the whole journey.</h3>
                <p>
                  From your first idea to the systems that keep it running after
                  launch.
                </p>
              </div>
              <div>
                <span>03</span>
                <h3>Build for real people.</h3>
                <p>
                  Useful, accessible software that makes someone’s day a little
                  easier.
                </p>
              </div>
            </div>
            <Spark className="principles-spark" />
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="shell">
          <div className="footer-top">
            <div className="section-label" data-reveal>
              <span className="availability-dot" />
              Have something in mind?
            </div>
            <span className="footer-location">
              KOLKATA, INDIA <span>↗ WORLDWIDE</span>
            </span>
          </div>
          <div className="footer-cta" data-reveal>
            <h2>
              Let’s make
              <br />
              <span>something matter.</span>
            </h2>
            <button
              className="footer-cta-button"
              data-contact
              aria-label="Start a project"
            >
              <Arrow />
            </button>
          </div>
          <div className="footer-middle">
            <a
              className="footer-email"
              href={gmailComposeUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              sayan@opslin.com <Arrow />
            </a>
            <span>
              Have an idea, a question, or a particularly
              <br />
              interesting problem? I’d love to hear it.
            </span>
          </div>
          <div className="footer-columns">
            <div>
              <Brand light />
              <p>
                Thoughtful design. Powerful engineering.
                <br />
                From first idea to what’s next.
              </p>
            </div>
            <nav aria-label="Footer navigation">
              <span>Explore</span>
              <a href="#work">Selected work</a>
              <a href="#about">About me</a>
              <a href="#services">Expertise</a>
              <a href="#approach">My process</a>
              <a href="/insights/opslin-vps-deployment">
                Opslin deployment guide
              </a>
            </nav>
            <nav aria-label="Social links">
              <span>Elsewhere</span>
              <a
                href="https://www.linkedin.com/in/sayanthe-coder/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <Arrow />
              </a>
              <a
                href="https://www.fiverr.com/sayanthecoder"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fiverr <Arrow />
              </a>
              <a
                href="https://www.instagram.com/sayanthecoder/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <Arrow />
              </a>
              <a
                href="https://www.opslin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Opslin <Arrow />
              </a>
            </nav>
            <div className="footer-note">
              <span>Built with intention.</span>
              <p>
                A little design.
                <br />A lot of engineering.
                <br />
                Care in every detail.
              </p>
              <button className="text-link" data-contact>
                Start a conversation <Arrow />
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Sayan Mondal</span>
            <span>Designed with care. Built with Next.js.</span>
            <a href="#home">Back to top ↑</a>
          </div>
          <div className="footer-watermark" aria-hidden="true">
            sayan<span>the</span>coder.
          </div>
        </div>
      </footer>
    </>
  );
}
