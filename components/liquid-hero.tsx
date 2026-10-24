"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const BASE_IMAGE = "/assets/img/hero-studio-wide-4k.webp";
const REVEAL_IMAGE = "/assets/img/hero-studio-reveal-4k.webp";
const BRUSH_RADIUS = 143;
const DECAY = 0.016;

/** A fading soft-brush reveal, drawn only while a pointer trail is active. */
export function LiquidHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    const mask = document.createElement("canvas");
    const maskContext = mask.getContext("2d");
    const cover = document.createElement("canvas");
    const coverContext = cover.getContext("2d");
    if (!context || !maskContext || !coverContext) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const smallScreen = matchMedia("(max-width: 700px)");
    const canAnimate = () =>
      !reduced.matches && finePointer.matches && !smallScreen.matches;
    let disposed = false;
    let visible = true;
    let loaded = false;
    let frame = 0;
    let idle = 0;
    let dpr = 1;
    let radius = BRUSH_RADIUS;
    let bounds = container.getBoundingClientRect();
    let lastPoint: { x: number; y: number } | null = null;
    let points: { x: number; y: number }[] = [];
    const image = new window.Image();
    image.decoding = "async";

    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      points = [];
      lastPoint = null;
      idle = 0;
      context.clearRect(0, 0, canvas.width, canvas.height);
      maskContext.clearRect(0, 0, mask.width, mask.height);
      canvas.dataset.trail = "idle";
    };

    const resize = () => {
      clear();
      bounds = container.getBoundingClientRect();
      if (!canAnimate()) {
        // Keep the sharp static portrait without allocating desktop-sized buffers.
        canvas.width = mask.width = cover.width = 1;
        canvas.height = mask.height = cover.height = 1;
        return;
      }
      // Preserve Retina detail while bounding the three canvas buffers.
      dpr = Math.min(
        window.devicePixelRatio || 1,
        3,
        Math.sqrt(12_000_000 / Math.max(1, bounds.width * bounds.height)),
      );
      radius = BRUSH_RADIUS * dpr;
      const width = Math.max(1, Math.round(bounds.width * dpr));
      const height = Math.max(1, Math.round(bounds.height * dpr));
      canvas.width = mask.width = cover.width = width;
      canvas.height = mask.height = cover.height = height;
      context.imageSmoothingQuality = "high";
      coverContext.imageSmoothingQuality = "high";
      if (!loaded) return;
      // Match the base image's centered object-fit: cover crop exactly.
      const scale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight,
      );
      const imageWidth = image.naturalWidth * scale;
      const imageHeight = image.naturalHeight * scale;
      coverContext.drawImage(
        image,
        (width - imageWidth) / 2,
        (height - imageHeight) / 2,
        imageWidth,
        imageHeight,
      );
    };

    const tick = () => {
      frame = 0;
      if (disposed || !visible || !canAnimate() || document.hidden) {
        clear();
        return;
      }
      const drawing = points.length > 0;
      idle = drawing ? 0 : idle + 1;
      maskContext.globalCompositeOperation = "destination-out";
      maskContext.fillStyle = `rgba(0,0,0,${drawing ? DECAY : Math.min(DECAY + idle * 0.004, 0.5)})`;
      maskContext.fillRect(0, 0, mask.width, mask.height);
      maskContext.globalCompositeOperation = "source-over";
      for (const point of points) {
        const brush = maskContext.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          radius,
        );
        brush.addColorStop(0, "rgba(255,255,255,1)");
        brush.addColorStop(0.7, "rgba(255,255,255,1)");
        brush.addColorStop(1, "rgba(255,255,255,0)");
        maskContext.fillStyle = brush;
        maskContext.fillRect(
          point.x - radius,
          point.y - radius,
          radius * 2,
          radius * 2,
        );
      }
      points = [];
      context.globalCompositeOperation = "source-over";
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(cover, 0, 0);
      context.globalCompositeOperation = "destination-in";
      context.drawImage(mask, 0, 0);
      context.globalCompositeOperation = "source-over";
      if (idle >= 120) {
        clear();
        return;
      }
      canvas.dataset.trail = drawing ? "drawing" : "fading";
      frame = requestAnimationFrame(tick);
    };

    const move = (event: PointerEvent) => {
      if (!loaded || !visible || !canAnimate() || event.pointerType === "touch")
        return;
      // Re-read the rect for scroll movement; a ResizeObserver alone cannot do this.
      bounds = container.getBoundingClientRect();
      const x = (event.clientX - bounds.left) * dpr;
      const y = (event.clientY - bounds.top) * dpr;
      if (
        x < -radius ||
        y < -radius ||
        x > canvas.width + radius ||
        y > canvas.height + radius
      ) {
        lastPoint = null;
        return;
      }
      if (lastPoint) {
        const distance = Math.hypot(x - lastPoint.x, y - lastPoint.y);
        const steps = Math.min(
          60,
          Math.max(1, Math.ceil(distance / Math.max(radius * 0.3, 1))),
        );
        for (let step = 1; step <= steps; step++)
          points.push({
            x: lastPoint.x + ((x - lastPoint.x) * step) / steps,
            y: lastPoint.y + ((y - lastPoint.y) * step) / steps,
          });
      } else points.push({ x, y });
      points = points.slice(-180);
      lastPoint = { x, y };
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const visibility = () => {
      if (document.hidden) clear();
    };
    const preferenceChange = () => {
      resize();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) clear();
    });
    intersectionObserver.observe(container);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", preferenceChange);
    finePointer.addEventListener("change", preferenceChange);
    smallScreen.addEventListener("change", preferenceChange);
    image.onload = () => {
      if (!disposed) {
        loaded = true;
        resize();
      }
    };
    // Keep the static portrait usable when the reveal image cannot load.
    image.onerror = clear;
    if (canAnimate()) image.src = REVEAL_IMAGE;
    const loadOnDesktop = () => {
      if (canAnimate() && !loaded && !image.src) image.src = REVEAL_IMAGE;
    };
    smallScreen.addEventListener("change", loadOnDesktop);
    finePointer.addEventListener("change", loadOnDesktop);
    reduced.addEventListener("change", loadOnDesktop);

    return () => {
      disposed = true;
      clear();
      image.onload = null;
      image.onerror = null;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", preferenceChange);
      finePointer.removeEventListener("change", preferenceChange);
      smallScreen.removeEventListener("change", preferenceChange);
      smallScreen.removeEventListener("change", loadOnDesktop);
      finePointer.removeEventListener("change", loadOnDesktop);
      reduced.removeEventListener("change", loadOnDesktop);
    };
  }, []);

  return (
    <div className="hero-scene" ref={containerRef}>
      <Image
        className="hero-scene-image"
        src={BASE_IMAGE}
        alt="Sayan Mondal in a colorful studio portrait"
        fill
        sizes="100vw"
        // A narrow viewport still covers a tall crop of the wide portrait.
        // Load the full-resolution source instead of a small viewport derivative.
        unoptimized
        priority
        draggable={false}
      />
      <canvas
        className="hero-liquid-canvas"
        ref={canvasRef}
        aria-hidden="true"
      />
    </div>
  );
}
