# Project imagery and SEO

The four client projects are FreshCart, Dealker, Bakaloo and Radha. The owner confirmed the fourth name as Radha. Opslin is Sayan’s own product and has its own section, distinct from client work. Other previously listed work remains under “More from the studio.”

## Screenshots

The images in `public/assets/projects/` are compressed WebP versions of the five screenshots supplied on 24 October 2026:

| Asset                   | Supplied screenshot                       | Presentation       |
| ----------------------- | ----------------------------------------- | ------------------ |
| `freshcart-home.webp`   | `Screenshot_20261024_150708.jpg.jpeg`     | Mobile phone frame |
| `dealker-home.webp`     | `Screenshot_20261024_150725.jpg.jpeg`     | Mobile phone frame |
| `bakaloo-home.webp`     | `Screenshot_20261024_150800.jpg.jpeg`     | Mobile phone frame |
| `radha-dashboard.webp`  | `Screenshot_20261024_150923.jpg.jpeg`     | Mobile phone frame |
| `opslin-dashboard.webp` | `Screenshot 2026-10-24 at 3.10.18 PM.png` | Browser frame      |

No application interface was generated or painted over. The Radha frame uses CSS cropping to present the dashboard below the temporary loading notice captured at the top; the full source screenshot remains intact. The phone hardware and browser toolbar are CSS, without additional mockup image downloads. Product screenshots load lazily through Next Image with responsive sizes.

## Brand assets

Original assets were copied from the matching local product sources into `public/assets/brands/`:

- FreshCart: `FreshCuts X Shotlin/meet-commerce-mobile-main/assets/icon/brand_logo.png`.
- Dealker: `dealker X shotlin/dealker-backend/src/assets/dealker-logo.png`.
- Bakaloo: `Bakaloo X Shotlin/Bakaloo-website/assets/icon/brand_logo.png`.
- Radha: `Radha X shotlin/Radha-APP/assets/v2/brand/icon.png`.
- Opslin: `Project_opslin/logo/opslin-logo-black.png`.

These are the original project brands, not similarly named businesses found in search. Only verified destinations are linked externally: Bakaloo and Opslin. The other showcases link to their own local case study pages.

## Search and sharing

Each project has a statically generated `/work/[slug]` page with a unique title, concise description, canonical URL, social sharing image, semantic heading hierarchy, image alternatives and CreativeWork/BreadcrumbList structured data. The homepage includes Person, WebSite and project ItemList structured data. All nine project pages appear in `sitemap.xml`; `robots.txt` points to it.

Set `SITE_URL` to the chosen public origin before the production build, especially for a custom domain. Otherwise Vercel’s production domain is used when available, with `http://127.0.0.1:3000` only as the local fallback. The shared origin in `lib/site.ts` drives canonical URLs, structured data, sitemap and robots output. Search indexing and rankings depend on deployment and search-engine crawling.

## LNDRY and LNDRY POS — separate projects

Added two distinct featured showcases:

- **LNDRY** (`/work/lndry`): the customer mobile application and public website at https://lndry.in/.
- **LNDRY POS** (`/work/lndry-pos`): the in-store laundry operations system, with a mobile app and desktop counter workspace at https://pos.lndry.in/.

The customer gallery contains six views: the supplied customer home screen, three browser captures from the public site, and the existing tracking and confirmation screens. The POS gallery contains all five supplied POS screenshots: two desktop and three mobile. Neither project is labelled as Opslin or combined into the other LNDRY case study.

| Asset                            | Source                                                              |
| -------------------------------- | ------------------------------------------------------------------- |
| `lndry-customer-home.webp`       | `WhatsApp Image 2026-10-24 at 3.28.52 PM.jpeg`                      |
| `lndry-pos-mobile-overview.webp` | `Screenshot_20261024_153304.jpg.jpeg`                               |
| `lndry-pos-mobile-booking.webp`  | `Screenshot_20261024_153320.jpg.jpeg`                               |
| `lndry-pos-mobile-order.webp`    | `Screenshot_20261024_153329.jpg.jpeg`                               |
| `lndry-pos-web-booking.webp`     | `Screenshot 2026-10-24 at 3.32.36 PM.png`                           |
| `lndry-pos-web-overview.webp`    | `Screenshot 2026-10-24 at 3.32.47 PM.png`                           |
| `lndry-website-home.webp`        | Browser capture of https://lndry.in/ on 24 October 2026             |
| `lndry-website-services.webp`    | Browser capture of https://lndry.in/services on 24 October 2026     |
| `lndry-website-journey.webp`     | Browser capture of https://lndry.in/how-it-works on 24 October 2026 |

The horizontal LNDRY wordmark is the original observed website asset, https://lndry.in/brand/logos/lndry-primary-horizontal.png, saved under `public/assets/brands/lndry-horizontal.png`. Screenshots were compressed to WebP; desktop originals were resized proportionally to a maximum width of 2400 pixels. No application interface was generated or painted over.

The POS destination was checked and presents a vendor sign-in page. No sign-in, order creation, payment or store-state changes were performed. The gallery therefore uses the owner-supplied POS screenshots rather than accessing live store records.

Interactive galleries have labelled thumbnail selectors, previous/next controls, full-size image links, and no-JavaScript direct-image links. Each case study links to its companion project and its real external destination. Both have separate titles, canonical URLs, sharing images and gallery image references in structured data; the sitemap now has eleven URLs including the homepage.

## Bakaloo platform, Agnix Studio and privacy

Bakaloo’s separate platform case study includes the supplied inbox, team chat, customer pipeline, templates and B2B/B2C theme builder screens. Rustbloom uses all six supplied gameplay/settings screenshots and is marked in development, as confirmed by the owner. ANTAR — The Last Flame is separate and marked preparing for launch; its production readiness was confirmed by the owner. The Agnix Studio website has its own case study. Its screenshot was captured from the public website, and the original logo was saved from `https://www.agnixstudio.com/assets/agnix-logo-transparent.png`. Both supplied domains were checked in the browser.

At the owner’s request, the inbox, team chat and customer pipeline screenshots have been replaced with flattened privacy-redacted image exports using the image editing skill. Phone numbers, customer identifiers, personal names and private conversations are covered. The original public filenames were overwritten with the same redacted exports, new `-redacted.webp` filenames are used in the gallery and homepage, and cached Next Image derivatives were removed. The outdated unredacted portfolio preview was removed. Original screenshots outside the project remain the owner’s private source files.
