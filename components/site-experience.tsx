"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import type Lenis from "lenis";
import { Arrow, Brand, Close, Spark } from "./icons";
import { ProjectGallery } from "./project-gallery";
import { projects } from "@/lib/projects";
import { ContactForm } from "./contact-form";
import { gmailComposeUrl } from "@/lib/contact";

type Overlay =
  | { type: "menu" }
  | { type: "contact"; hint?: string }
  | { type: "project"; id: string }
  | null;

function LocalClock() {
  const [time, setTime] = useState("Kolkata, India · UTC+5:30");
  useEffect(() => {
    const update = () =>
      setTime(
        `${new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit", hour12: true }).format(new Date())} in Kolkata`,
      );
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);
  return <span>{time}</span>;
}

export function SiteExperience() {
  const [overlay, setOverlay] = useState<Overlay>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reducedQuery = matchMedia("(prefers-reduced-motion: reduce)");
    const doc = document.documentElement;
    let disposed = false;
    let frame = 0;
    let loaderFrame = 0;
    const start = performance.now();
    const duration = reducedQuery.matches ? 0 : 850;
    const count = (now: number) => {
      const progress = duration ? Math.min((now - start) / duration, 1) : 1;
      const eased = 1 - Math.pow(1 - progress, 3);
      if (counterRef.current)
        counterRef.current.textContent = String(
          Math.round(eased * 100),
        ).padStart(3, "0");
      if (progress < 1) loaderFrame = requestAnimationFrame(count);
    };
    loaderFrame = requestAnimationFrame(count);
    const timer = window.setTimeout(() => {
      loaderRef.current?.classList.add("loader-out");
      doc.dataset.ready = "true";
    }, duration);
    const removeTimer = window.setTimeout(() => {
      if (loaderRef.current) loaderRef.current.hidden = true;
    }, duration + 700);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -25px 0px" },
    );
    doc.classList.add("motion-ready");
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));

    if (!reducedQuery.matches) {
      import("lenis")
        .then(({ default: SmoothScroll }) => {
          if (disposed) return;
          const lenis = new SmoothScroll({
            smoothWheel: true,
            anchors: { offset: -32 },
            duration: 1.05,
          });
          lenisRef.current = lenis;
          const initialAnchor = document.getElementById(
            window.location.hash.slice(1),
          );
          if (initialAnchor)
            lenis.scrollTo(initialAnchor, { immediate: true, offset: -32 });
          if (dialogRef.current?.open) lenis.stop();
          const tick = (time: number) => {
            lenis.raf(time);
            frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        })
        .catch(() => {
          /* Native scrolling remains available. */
        });
    }

    const click = (event: globalThis.MouseEvent) => {
      const button = (event.target as Element)?.closest<HTMLElement>(
        "[data-contact], [data-menu], [data-project]",
      );
      if (!button) return;
      returnFocusRef.current = button;
      if (button.hasAttribute("data-contact"))
        setOverlay({ type: "contact", hint: button.dataset.service });
      else if (button.hasAttribute("data-menu")) setOverlay({ type: "menu" });
      else if (button.dataset.project)
        setOverlay({ type: "project", id: button.dataset.project });
    };
    document.addEventListener("click", click);

    const reducedChange = () => {
      if (reducedQuery.matches) {
        cancelAnimationFrame(frame);
        lenisRef.current?.destroy();
        lenisRef.current = null;
      }
    };
    reducedQuery.addEventListener("change", reducedChange);
    return () => {
      disposed = true;
      clearTimeout(timer);
      clearTimeout(removeTimer);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(loaderFrame);
      observer.disconnect();
      doc.classList.remove("motion-ready");
      lenisRef.current?.destroy();
      lenisRef.current = null;
      document.removeEventListener("click", click);
      reducedQuery.removeEventListener("change", reducedChange);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (overlay) {
      if (!dialog.open) dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      lenisRef.current?.stop();
      const focusTarget =
        overlay.type === "contact"
          ? dialog.querySelector<HTMLElement>("input")
          : dialog.querySelector<HTMLElement>(".menu-close, .dialog-close");
      focusTarget?.focus({ preventScroll: true });
    } else {
      if (dialog.open) dialog.close();
      document.documentElement.style.removeProperty("overflow");
      lenisRef.current?.start();
      if (returnFocusRef.current?.isConnected)
        returnFocusRef.current.focus({ preventScroll: true });
    }
    return () => {
      document.documentElement.style.removeProperty("overflow");
    };
  }, [overlay]);

  function close() {
    setOverlay(null);
  }
  function backdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) close();
  }
  function navigate(event: MouseEvent<HTMLAnchorElement>, target: string) {
    event.preventDefault();
    close();
    window.setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      history.replaceState(null, "", target);
    }, 30);
  }

  const project =
    overlay?.type === "project"
      ? projects.find((item) => item.id === overlay.id)
      : undefined;

  return (
    <>
      <div className="page-loader" ref={loaderRef} aria-hidden="true">
        <div className="loader-word">
          <Spark />
          sayan<span>the</span>coder.
        </div>
        <div className="loader-bottom">
          <span>GOOD THINGS TAKE A LITTLE CARE.</span>
          <span ref={counterRef}>000</span>
        </div>
        <div className="loader-track" />
      </div>
      <dialog
        ref={dialogRef}
        className={`overlay-dialog${overlay?.type === "menu" ? " menu-dialog" : ""}${overlay?.type === "project" ? " project-dialog" : ""}`}
        aria-labelledby="overlay-title"
        onClick={backdrop}
        onCancel={close}
        onClose={close}
        data-lenis-prevent
      >
        {overlay?.type === "menu" ? (
          <div className="menu-panel">
            <div className="menu-top">
              <Brand light onClick={(event) => navigate(event, "#home")} />
              <button className="menu-close" onClick={close}>
                Close <Close />
              </button>
            </div>
            <div className="menu-body">
              <p className="modal-eyebrow" id="overlay-title">
                A little look around
              </p>
              <nav aria-label="Expanded navigation">
                {[
                  { label: "Home", href: "#home" },
                  { label: "Selected work", href: "#work" },
                  { label: "Games", href: "#games" },
                  { label: "About me", href: "#about" },
                  { label: "Expertise", href: "#services" },
                  { label: "The process", href: "#approach" },
                ].map((item, i) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => navigate(event, item.href)}
                    style={{ animationDelay: `${i * 45}ms` }}
                  >
                    <span>0{i + 1}</span>
                    {item.label}
                    <Arrow />
                  </a>
                ))}
                <button onClick={() => setOverlay({ type: "contact" })}>
                  <span>07</span>Let’s talk
                  <Arrow />
                </button>
              </nav>
            </div>
            <div className="menu-bottom">
              <LocalClock />
              <a
                href={gmailComposeUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                sayan@opslin.com <Arrow />
              </a>
            </div>
          </div>
        ) : overlay ? (
          <div className="modal-panel">
            <button
              className="dialog-close"
              onClick={close}
              aria-label="Close dialog"
            >
              <Close />
            </button>
            {overlay.type === "contact" ? (
              <ContactForm
                key={overlay.hint || "contact"}
                hint={overlay.hint}
                onClose={close}
              />
            ) : project ? (
              <div className="case-study">
                <div className="modal-eyebrow">
                  {project.relationship} / {project.category}
                </div>
                <h2 id="overlay-title">
                  {project.name}
                  <span>↗</span>
                </h2>
                <h3>{project.headline}</h3>
                <p>{project.description}</p>
                <div className="case-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                {project.gallery ? (
                  <ProjectGallery
                    name={project.name}
                    images={project.gallery}
                    address={project.browserLabel}
                  />
                ) : project.image ? (
                  <div
                    className={`case-gallery${project.format === "mobile" ? " case-gallery-phones" : ""}`}
                  >
                    {[project.image, project.secondary]
                      .filter((src): src is string => Boolean(src))
                      .map((src, index) => (
                        <Image
                          key={src}
                          src={src}
                          alt={`${project.name} ${index === 0 ? "product overview" : "product detail"}`}
                          width={
                            (index === 0
                              ? project.imageWidth
                              : project.secondaryWidth) || 1800
                          }
                          height={
                            (index === 0
                              ? project.imageHeight
                              : project.secondaryHeight) || 738
                          }
                          sizes="(max-width:700px) 85vw, 700px"
                        />
                      ))}
                  </div>
                ) : (
                  <div className="case-type-art">
                    <Spark />
                    <span>
                      {project.name}
                      <sup>®</sup>
                    </span>
                  </div>
                )}
                <Link
                  className="text-link case-full-link"
                  href={`/work/${project.id}`}
                >
                  Full project details <Arrow />
                </Link>
                <div className="case-actions">
                  {project.href ? (
                    <a
                      className="text-link"
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.linkLabel}
                      <Arrow />
                    </a>
                  ) : (
                    <span className="case-private">
                      A closer walkthrough is available on request.
                    </span>
                  )}
                  <button
                    className="pill pill-dark"
                    onClick={() =>
                      setOverlay({
                        type: "contact",
                        hint: `a project like ${project.name}`,
                      })
                    }
                  >
                    Build something together{" "}
                    <span className="button-icon">
                      <Arrow />
                    </span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}
