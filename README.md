# SayanTheCoder — portfolio

A complete Next.js App Router redesign for Sayan Mondal, with a colorful cobalt, peach, mint and lilac palette on white, a natural-color professional portrait, local fonts, real product imagery, accessible native dialogs, and motion that respects reduced-motion preferences.

## Run locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000.

## Production

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

No environment variables are needed locally. The production canonical domain is `https://www.sayanthecoder.in`, matching the live apex-to-www redirect. Canonical URLs, the sitemap, structured data and social sharing images default to that origin. Set `SITE_URL` before building only if the production domain changes. Both purchased domain variants normalize to the www HTTPS origin so an old apex environment value cannot recreate conflicting canonicals. See `.env.example`. Next.js serves and optimizes the local images. The two fonts are self-hosted and loaded with `next/font/local`. Lenis is loaded on the client only when reduced motion is off; native scrolling remains available if it cannot load.

## Content and structure

- `app/page.tsx`: server-rendered page sections.
- `app/globals.css`: responsive styles and reduced-motion rules.
- `app/color-theme.css`: the color system, component palettes and full-color product imagery.
- `app/immersive-hero.css`: full-width portrait hero, overlay navigation, wordmark and responsive composition.
- `components/liquid-hero.tsx`: the cursor-driven, fading before/after image reveal. It interpolates soft brush stamps, caps pixel density at 2, pauses offscreen and stops drawing when the trail clears. Touch and reduced-motion visitors receive the static color portrait.
- `components/hero-feature.tsx`: the hero carousel with real project logos and Kolkata clock.
- `components/project-showcase.tsx`: the client gallery, separate LNDRY/customer and LNDRY POS showcases, original brand marks, CSS phone frames and Opslin browser showcase.
- `components/project-gallery.tsx`: accessible multi-screen mobile/web galleries with thumbnail selection, previous/next controls and full-size image links.
- `app/laundry-gallery.css`: LNDRY showcase composition and responsive screenshot galleries.
- `app/project-showcase.css`: responsive client cards and case study page layouts.
- `app/work/[slug]/`: fourteen statically generated project pages with individual metadata and sharing images.
- `app/sitemap.ts`, `app/robots.ts` and `lib/site.ts`: shared canonical origin, sitemap and crawler output.
- `components/site-experience.tsx`: navigation, project previews, enquiry draft form, reveals and smooth scrolling.
- `lib/projects.ts`: project copy, tags, screenshots and verified existing outbound destinations.
- `public/assets/img/`: original project screenshots and the generated portrait.
- `app/opengraph-image.tsx`: generated social sharing image.
- `public/assets/projects/` and `public/assets/brands/`: the five supplied product screenshots and original project branding.
- `docs/project-assets.md`: image provenance, client/product classification and production SEO configuration.
- `docs/portrait.md`: image generation prompt and provenance.
- `docs/hero-assets.md`: the two aligned hero images, generation prompts and design reference.

## Enquiry form

The enquiry form validates a visitor’s name, email and project details and prepares a Gmail compose link addressed to `sayan@opslin.com`. The visitor opens Gmail, reviews the draft and sends it themselves. The global WhatsApp corner button opens a plain-language form; its validated submit opens `wa.me` with a message for the owner-confirmed `+91 97758 45587`. Email and budget are optional in the WhatsApp form. Neither flow sends automatically or stores enquiries on a server. Gmail/WhatsApp sign-in and installed-app handoff depend on the visitor’s device. A copy-draft fallback is provided. Run contact URL tests with `node --test tests/contact.test.mjs`.

## Previous static implementation

The earlier static HTML, CSS and JavaScript are preserved in `legacy/` for reference. The active site is the Next.js application at the workspace root.

Game work includes Rustbloom (in development), ANTAR — The Last Flame (preparing for launch), and the separate Agnix Studio company website. Bakaloo’s CRM, agentic AI, B2B and theme builder platform has its own case study. Game design/development capabilities include Unity, Godot, 2D/2.5D, mobile and PC.
