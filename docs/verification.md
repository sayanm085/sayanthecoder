# Verification

Verified on 24 October 2026 against the local production build.

The visitor can browse Sayan’s work, inspect a project, expand an expertise area, and prepare an email enquiry without any contact data being sent automatically.

- `npm run build`: passed; homepage, sharing image and robots route prerendered successfully.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run format:check`: passed.
- Browser console: no errors or warnings in the checked production page.
- Images: no broken loaded images in the checked page.
- Responsive bounds: document width equals viewport width at 320, 390, 768 and 1440 pixels after the mobile layout fixes.
- Mobile menu: opens, routes to Expertise and closes correctly.
- Project preview: Opslin opens with its product screenshots, description, tags and external destination.
- Service disclosure: Mobile app development expands and opens an enquiry with the correct project type and prefilled text.
- Contact dialog: focuses the name field; Escape closes it and restores focus.
- Enquiry draft: test input produces an encoded `mailto:` draft with the expected recipient, subject, project, name, email, type and budget. No email was sent during verification.
- Home navigation: returns to scroll position zero with the complete header visible.

The form intentionally prepares an email draft. It does not have an email delivery API or database. Reduced-motion behavior is implemented in both CSS and the smooth-scroll initializer; OS preference switching was not manually exercised.

Screenshots are saved in `docs/previews/`.

## Color and immersive hero update

- Reviewed the public Lumora preview recording, including the full-width portrait, overlay navigation, featured card, wordmark and temporary image-reveal trail.
- Added a full-color studio portrait and an aligned alternate image with iridescent glasses; both images have matching dimensions.
- `npm run build`, lint, TypeScript and formatting checks pass for the new hero components.
- Browser pointer movement paints the alternate image under a soft radial mask. A screenshot captured the glasses visible under the cursor; the trail entered its fading state afterward.
- The hero carousel advances from Opslin to LNDRY, and its project button opens the LNDRY case study. Previous navigation returns to Opslin.
- The hero contact button opens the enquiry dialog and Escape closes it.
- At 390px, the canvas is hidden, the static color portrait loads, and document width equals viewport width. The 320px layout also has no horizontal overflow.
- Desktop screenshots include the full-bleed composition and the cursor-revealed glasses; the mobile screenshot shows the static composition.

Current previews: `hero-liquid-trail.jpg` and `hero-mobile.jpg`.

## Client gallery and case study update

Story: visitors browse the four supplied client apps, distinguish Opslin as Sayan’s own product, follow a real project link to a static case study, then return to contact and open the enquiry dialog. Data comes from the shared local project catalog; no remote API or account is required.

- FreshCart, Dealker, Bakaloo and Radha appear as four client cards with their actual supplied screenshots and original source logos. Radha’s name was confirmed by the owner.
- Opslin uses the new supplied light dashboard, original logo and a dedicated own-product section. The client cards use CSS phone frames; Opslin uses a CSS browser frame.
- The hero carousel advances from Opslin to FreshCart, displays the original logo and “Client project” label, and opens the correct screenshot preview with a link to full details.
- The standalone cursor helper is removed; the hero contact action has a compact metallic star.
- Radha and Dealker case studies render correctly on desktop/mobile. Navigation from Dealker back to `/#contact` places the contact section in view; the dialog opens, focuses the name field, closes with Escape and restores focus.
- Fixed competing native smooth scrolling during client navigation and synchronized Lenis to the incoming homepage anchor.
- Home document width equals viewport width at 320, 390, 768 and 1440 pixels. Radha and Dealker mobile detail pages also have no horizontal overflow. No broken loaded images were found.
- Parsed all ten prerendered HTML files: each has one H1, a unique title, description, canonical URL, nonempty image alternatives and valid JSON-LD.
- Sitemap contains the homepage and all nine case studies. Robots output links to the sitemap.
- Radha’s social sharing image endpoint returned HTTP 200 with `image/png` (43,618 bytes).
- Production build, ESLint and TypeScript pass. The public origin must be configured with `SITE_URL` for the chosen custom domain before the production build; current local canonical URLs intentionally use `127.0.0.1:3000`.

Preview: `client-work-desktop.jpg`. Original image and brand provenance: `project-assets.md`.

## LNDRY customer experience and separate POS project

Verified on 24 October 2026 against the updated production build.

- Captured the public LNDRY home, services and how-it-works pages in the browser and compressed the screenshots for the portfolio. Saved the original observed horizontal logo.
- LNDRY appears as a dedicated customer app/website showcase; LNDRY POS appears as a separate in-store system showcase. Both are promoted from the smaller studio links into the visible product gallery.
- All six LNDRY thumbnail selections update the main image, label and pressed state correctly. Previous from the first image wraps to `06 / 06`; next returns to `01 / 06`.
- All five POS thumbnail selections show the correct desktop/mobile image and full-size destination. The order booking mobile screen displays in a phone frame on narrow screens.
- Selecting a thumbnail brings the main gallery into view. Full-size links target the corresponding local source images, and no-JavaScript direct links are included.
- Companion links navigate from LNDRY to LNDRY POS and back. The external POS destination displays vendor sign-in; no authentication or state-changing store action was performed.
- Home has two laundry showcase cards and six brand links. Document width matches viewport at 320, 390, 768 and 1440 pixels; no broken loaded images or console errors/warnings were found.
- POS case study gallery fits 320, 390, 768 and 1440 pixels without horizontal overflow.
- Both pages are prerendered and have an H1, description and separate canonical URL. Structured data includes all six customer gallery image URLs and all five POS gallery image URLs. Sitemap includes eleven URLs.
- `npm run build`, `npm run lint`, `npm run typecheck` and `npm run format:check` pass.

Previews: `lndry-two-projects-desktop.jpg`, `lndry-pos-gallery-desktop.jpg` and `lndry-pos-gallery-mobile.jpg`.

## Game work, platform gallery and privacy update

- Production build, ESLint and TypeScript pass after the privacy replacement.
- All five Bakaloo platform views and all six Rustbloom views were exercised in the browser before the privacy edit. Rustbloom fits 320, 390, 768 and 1440 pixels; Bakaloo’s long case title fits 320 pixels. ANTAR’s separate launch status and mobile case study were checked.
- The game development service opens an enquiry with the game project type selected and its project text prefilled.
- New static case studies have individual canonical URLs and descriptions. Game pages include VideoGame structured data with their confirmed production statuses. Sitemap contains fifteen URLs.
- Redacted inbox, team chat and pipeline exports were visually inspected. Both old and new public image filenames contain identical redacted exports; prerendered homepage and case study HTML reference the new privacy-safe URLs. The optimized image cache was cleared.
- Final browser refresh was unavailable because local browser use was disabled in Work settings. Final asset/HTML verification and the production build completed successfully. Privacy preview: `bakaloo-crm-redacted.webp`.
