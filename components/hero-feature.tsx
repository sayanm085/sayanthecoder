"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./icons";
import { clientProjects, ownProduct, laundryProjects } from "@/lib/projects";

const features = [ownProduct, ...clientProjects, ...laundryProjects];

export function HeroFeature() {
  const [index, setIndex] = useState(0);
  const feature = features[index];
  return (
    <aside className="hero-side" aria-label="Featured projects" data-reveal>
      <div className="hero-feature-card">
        <button
          className="hero-feature-open"
          data-project={feature.id}
          aria-label={`Explore ${feature.name}`}
        >
          <span className="hero-feature-icon hero-project-logo">
            <Image
              src={feature.logo!}
              width={65}
              height={65}
              alt={`${feature.name} logo`}
            />
          </span>
          <span className="hero-feature-copy" key={feature.id}>
            <span>{feature.relationship}</span>
            <strong>{feature.name}</strong>
            <small>{feature.category}</small>
          </span>
        </button>
        <div className="hero-feature-controls">
          <span aria-live="polite">
            0{index + 1} <i>/ 0{features.length}</i>
          </span>
          <div>
            <button
              onClick={() =>
                setIndex(
                  (value) => (value + features.length - 1) % features.length,
                )
              }
              aria-label="Previous featured project"
            >
              <Arrow diagonal={false} />
            </button>
            <button
              onClick={() => setIndex((value) => (value + 1) % features.length)}
              aria-label="Next featured project"
            >
              <Arrow diagonal={false} />
            </button>
          </div>
        </div>
      </div>
      <div className="hero-made">
        <span>Ideas turned into real things</span>
        <div>
          {clientProjects.map((project) => (
            <Link href={`/work/${project.id}`} key={project.id}>
              {project.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

export function HeroClock() {
  const [time, setTime] = useState("UTC +5:30");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="hero-clock">
      <span>Kolkata</span>
      <time>{time}</time>
      <span className="section-dot" />
    </div>
  );
}
