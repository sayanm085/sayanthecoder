import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./icons";
import { getProject } from "@/lib/projects";

function BrowserBar({ address }: { address: string }) {
  return (
    <div className="product-browser-toolbar" aria-hidden="true">
      <span className="browser-lights">
        <i />
        <i />
        <i />
      </span>
      <span className="browser-address">{address}</span>
      <span>↗</span>
    </div>
  );
}

export function CommerceShowcase() {
  const project = getProject("bakaloo-platform")!;
  return (
    <section
      className="commerce-showcase"
      id="bakaloo-platform"
      aria-labelledby="commerce-title"
    >
      <div className="extended-section-heading" data-reveal>
        <div>
          <div className="section-label">
            <span className="section-dot" />
            Behind the storefront
          </div>
          <h2 id="commerce-title">
            Commerce, conversations.
            <br />
            <span className="muted">One connected platform.</span>
          </h2>
        </div>
        <p>
          Another side of Bakaloo.
          <br />
          WhatsApp CRM, agentic AI,
          <br />
          B2B commerce and a visual builder.
        </p>
      </div>
      <article className="commerce-platform-card" data-reveal>
        <div className="commerce-platform-copy">
          <div className="commerce-brand">
            <Image
              src={project.logo!}
              width={150}
              height={55}
              alt="Bakaloo logo"
            />
            <span className="project-relationship">Client project</span>
          </div>
          <h3>
            WhatsApp CRM
            <br />& Theme Builder.
          </h3>
          <p>
            The tools behind the customer experience: shared conversations, AI
            workflows, B2B commerce and storefront composition.
          </p>
          <ul>
            <li>Shared inbox, team chat & customer pipeline</li>
            <li>Agentic AI & human handoff</li>
            <li>B2B / B2C themes, sections & publishing</li>
          </ul>
          <Link href="/work/bakaloo-platform" className="pill pill-dark">
            Explore 5 platform views
            <span className="button-icon">
              <Arrow />
            </span>
          </Link>
          <Link href="/work/bakaloo" className="text-link">
            Explore the customer app <Arrow />
          </Link>
        </div>
        <Link
          href="/work/bakaloo-platform"
          className="commerce-platform-visual"
          aria-label="Bakaloo WhatsApp CRM and theme builder project"
        >
          <div className="commerce-main-screen product-browser">
            <BrowserBar address="Bakaloo / Storefront builder" />
            <Image
              src={project.image!}
              width={2400}
              height={1242}
              alt={project.imageAlt!}
              sizes="(max-width:700px) 85vw, 800px"
            />
          </div>
          <div className="commerce-inbox-screen product-browser">
            <BrowserBar address="WhatsApp / Shared inbox" />
            <Image
              src="/assets/projects/bakaloo-crm-inbox-redacted.webp"
              width={2400}
              height={1241}
              alt="Bakaloo WhatsApp CRM shared customer inbox"
              sizes="(max-width:700px) 45vw, 420px"
            />
          </div>
          <span className="commerce-demo-note">
            Actual builder + CRM interfaces
          </span>
        </Link>
      </article>
    </section>
  );
}

export function GameStudioShowcase() {
  const game = getProject("rustbloom")!;
  const antar = getProject("antar")!;
  const studio = getProject("agnix-studio")!;
  return (
    <section
      className="game-studio-showcase"
      id="games"
      aria-labelledby="games-title"
    >
      <div className="extended-section-heading" data-reveal>
        <div>
          <div className="section-label">
            <span className="section-dot" />
            Game design & development
          </div>
          <h2 id="games-title">
            From game design
            <br />
            <span className="muted">to playable worlds.</span>
          </h2>
        </div>
        <p>
          2D and 2.5D. Mobile and PC.
          <br />
          Game design, gameplay engineering,
          <br />
          and the studio’s public website.
        </p>
      </div>
      <div
        className="game-capabilities"
        aria-label="Game development capabilities"
        data-reveal
      >
        {[
          "Unity",
          "Godot",
          "2D / 2.5D",
          "Mobile / PC",
          "Game UI & systems",
        ].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <article className="game-feature-card" data-reveal>
        <Link
          href="/work/rustbloom"
          className="game-feature-image"
          aria-label="Rustbloom game development showcase"
        >
          <Image
            src={game.image!}
            width={2400}
            height={1080}
            alt={game.imageAlt!}
            sizes="(max-width:700px) 95vw, 1320px"
          />
        </Link>
        <div className="game-feature-caption">
          <div>
            <span className="project-status">{game.status}</span>
            <h3>Rustbloom</h3>
            <p>
              An ongoing game project. Explore the actual mobile gameplay, world
              detail, settings and graphics interface.
            </p>
          </div>
          <Link href="/work/rustbloom" className="pill pill-dark">
            Explore 6 game views
            <span className="button-icon">
              <Arrow />
            </span>
          </Link>
        </div>
      </article>
      <div className="studio-project-grid">
        <article className="studio-project-card antar-project" data-reveal>
          <div className="studio-project-top">
            <span className="agnix-brand">
              <Image
                src={antar.logo!}
                width={150}
                height={60}
                alt="Agnix Studio logo"
              />
            </span>
            <span className="project-status">{antar.status}</span>
          </div>
          <Link
            href="/work/antar"
            className="studio-project-image"
            aria-label="ANTAR — The Last Flame game project"
          >
            <Image
              src={antar.image!}
              width={1280}
              height={720}
              alt={antar.imageAlt!}
              sizes="(max-width:700px) 90vw, 640px"
            />
          </Link>
          <div className="studio-project-copy">
            <span className="studio-project-kicker">
              Production ready · Launch preparation
            </span>
            <h3>ANTAR — The Last Flame</h3>
            <p>
              A distinct Agnix Studio game, preparing for launch. See the
              official announcement and production status.
            </p>
            <Link href="/work/antar">
              Explore the game <Arrow />
            </Link>
          </div>
        </article>
        <article
          className="studio-project-card studio-website-project"
          data-reveal
        >
          <div className="studio-project-top">
            <span className="agnix-brand">
              <Image
                src={studio.logo!}
                width={150}
                height={60}
                alt="Agnix Studio logo"
              />
            </span>
            <span className="project-relationship">Company website</span>
          </div>
          <Link
            href="/work/agnix-studio"
            className="studio-project-image studio-browser-image"
            aria-label="Agnix Studio company website project"
          >
            <div className="product-browser">
              <BrowserBar address="agnixstudio.com" />
              <Image
                src={studio.image!}
                width={1280}
                height={720}
                alt={studio.imageAlt!}
                sizes="(max-width:700px) 90vw, 640px"
              />
            </div>
          </Link>
          <div className="studio-project-copy">
            <span className="studio-project-kicker">
              Web design & development
            </span>
            <h3>Agnix Studio website</h3>
            <p>
              The company’s cinematic web presence, built around the original
              studio identity and game announcement.
            </p>
            <Link href="/work/agnix-studio">
              Explore the website project <Arrow />
            </Link>
            <div className="studio-domains">
              <a
                href="https://www.agnixstudio.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                agnixstudio.com ↗
              </a>
              <a
                href="https://www.agnixstudio.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                agnixstudio.in ↗
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
