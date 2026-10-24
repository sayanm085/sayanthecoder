"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Arrow } from "./icons";
import type { ProjectImage } from "@/lib/projects";

export function ProjectGallery({
  name,
  images,
  address,
}: {
  name: string;
  images: ProjectImage[];
  address?: string;
}) {
  const [index, setIndex] = useState(0);
  const galleryRef = useRef<HTMLElement>(null);
  function selectImage(nextIndex: number) {
    setIndex(nextIndex);
    galleryRef.current?.scrollIntoView({
      block: "start",
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  const current = images[index];
  const isGame = images.some((image) => image.format === "game");
  const move = (delta: number) =>
    setIndex((value) => (value + delta + images.length) % images.length);
  return (
    <section
      ref={galleryRef}
      className="project-gallery"
      aria-label={`${name} screenshot gallery`}
    >
      <div className="gallery-heading">
        <div>
          <span className="section-label">
            {isGame ? "Explore the game" : "Explore the interfaces"}
          </span>
          <p>
            {isGame
              ? "Gameplay, worlds and the details of play."
              : "Mobile and web. Every view, up close."}
          </p>
        </div>
        <div className="gallery-controls">
          <span aria-live="polite">
            {String(index + 1).padStart(2, "0")}{" "}
            <i>/ {String(images.length).padStart(2, "0")}</i>
          </span>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous screenshot"
          >
            <Arrow diagonal={false} />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next screenshot"
          >
            <Arrow diagonal={false} />
          </button>
        </div>
      </div>
      <div
        className={`project-gallery-stage gallery-stage-${current.format}`}
        id="project-gallery-view"
        aria-live="polite"
      >
        {current.format === "mobile" ? (
          <a
            href={current.src}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-phone"
            aria-label={`Open full-size ${current.label} screenshot`}
          >
            <Image
              key={current.id}
              src={current.src}
              width={current.width}
              height={current.height}
              alt={current.alt}
              sizes="(max-width:600px) 65vw, 270px"
            />
          </a>
        ) : current.format === "game" ? (
          <a
            href={current.src}
            target="_blank"
            rel="noopener noreferrer"
            className="gallery-game"
            aria-label={`Open full-size ${current.label} screenshot`}
          >
            <Image
              key={current.id}
              src={current.src}
              width={current.width}
              height={current.height}
              alt={current.alt}
              sizes="(max-width:700px) 90vw, 1200px"
            />
          </a>
        ) : (
          <div className="gallery-browser product-browser">
            <div className="product-browser-toolbar" aria-hidden="true">
              <span className="browser-lights">
                <i />
                <i />
                <i />
              </span>
              <span className="browser-address">{address || name}</span>
              <span>↗</span>
            </div>
            <a
              href={current.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open full-size ${current.label} screenshot`}
            >
              <Image
                key={current.id}
                src={current.src}
                width={current.width}
                height={current.height}
                alt={current.alt}
                sizes="(max-width:700px) 90vw, 1100px"
              />
            </a>
          </div>
        )}
      </div>
      <div className="gallery-caption">
        <span>{current.label}</span>
        <a href={current.src} target="_blank" rel="noopener noreferrer">
          Open full-size image <Arrow />
        </a>
      </div>
      <div className="gallery-thumbnails" aria-label="Choose a screenshot">
        {images.map((item, imageIndex) => (
          <button
            key={item.id}
            type="button"
            className={index === imageIndex ? "is-selected" : ""}
            onClick={() => selectImage(imageIndex)}
            aria-label={`Show ${item.label}`}
            aria-pressed={index === imageIndex}
            aria-controls="project-gallery-view"
          >
            <span
              className={`gallery-thumb-image gallery-thumb-${item.format}`}
            >
              <Image
                src={item.src}
                width={item.width}
                height={item.height}
                alt=""
                sizes="(max-width:600px) 40vw, 180px"
              />
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      <noscript>
        <p>Open any screenshot below to inspect it at full size.</p>
        <div className="gallery-fallback-links">
          {images.map((item) => (
            <a href={item.src} key={item.id}>
              {item.label}
              <Arrow />
            </a>
          ))}
        </div>
      </noscript>
    </section>
  );
}
