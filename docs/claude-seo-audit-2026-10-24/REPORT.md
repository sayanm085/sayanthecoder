# Claude SEO audit — 24 October 2026

## Outcome

Claude SEO 2.5.0 ran against `https://www.sayanthecoder.in` using its installed, isolated Python runtime. Its parser processed **22 of 22 sitemap pages**. Sitemap discovery and HTTP agent-readiness checks completed. No observed issue in this run establishes a critical crawling or indexing restriction. Actual Google indexing and search positions remain unmeasured.

The strongest immediate improvement is the service-page enquiry journey: those landing pages previously opened an almost-empty Gmail draft and bypassed project details and currency selection. A local fix now opens the shared, service-prefilled form, with direct Gmail retained as a secondary link. The shared form also explains how drafts and the saved currency preference work. These changes and the preceding currency implementation are **local, not deployed**.

## Checks executed and evidence

| Area                              | Result                                                                                             | Evidence                                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Toolkit readiness                 | Runtime ready, Python 3.12, Claude SEO 2.5.0                                                       | `claude-seo doctor --json`; Chromium not installed                                                 |
| Sitemap discovery                 | Declared sitemap is HTTP 200 and a valid XML urlset; no warnings                                   | [sitemap.json](sitemap.json)                                                                       |
| Page-level SEO                    | All 22 pages parsed by Claude SEO's actual `parse_html.py`                                         | [page-analysis.json](page-analysis.json)                                                           |
| Live status/canonical cross-check | 22 HTTP 200 destinations, one H1 each, unique titles, descriptions and self-canonicals             | [HTTP evidence](../live-seo-recheck-2026-10-24.json)                                               |
| Server-rendered content           | Homepage readable without JavaScript; tool recorded 1,418 raw visible words and no JS-shell marker | [agent-readiness.json](agent-readiness.json)                                                       |
| Robots and AI search policy       | Robots reachable; no root-level blocks for the checked search agents                               | [agent-readiness.json](agent-readiness.json)                                                       |
| Structured data                   | Parser found schema blocks on all 22 pages; homepage has six                                       | [page-analysis.json](page-analysis.json); syntax presence is not rich-result validation            |
| Mobile performance                | Not measured: public PSI request returned a rate-limit error                                       | [pagespeed-mobile.json](pagespeed-mobile.json)                                                     |
| Browser/mobile visual behaviour   | Not measured: CUA reports “Local browser use is disabled in Work settings”                         | User permission was acknowledged; browser/Firefox controls are not exposed by the current settings |

Claude's parser counted 1,261 homepage words, whereas its agent-readiness script counted 1,418 using a different extraction method. These are extraction counts, not ranking targets. Neither is used to claim Google quality or citation likelihood.

Sitemap discovery also probed common alternatives such as `/wp-sitemap.xml`; their 404 responses are normal because the actual declared sitemap works. Agent discovery files for protocols this portfolio does not implement are also not required SEO files. Their absence is not an indexing defect.

## Prioritized findings and action

### P2 — Service enquiries skip useful scope and budget information

Observed in `app/services/[slug]/page.tsx`: the primary CTA called `gmailComposeUrl` with a subject only. Search landing visitors missed the shared form's project categories, project description and INR/USD budget selector.

**Fixed locally:** `components/service-enquiry.tsx` now provides a native dialog with the existing contact form and a service hint. Escape/backdrop closure, focus restoration and scroll locking follow the existing enquiry pattern. The direct Gmail link remains available. The shared form produces drafts using explicit currency codes. Interactive browser testing remains outstanding; passing compilation and server-rendered checks do not substitute for clicking the dialog.

### P2 — Case studies need stronger owner-confirmed evidence

The parser found approximately 186–224 words on FreshCart, Dealker, Radha and the Bakaloo consumer case. Several other own-product pages are shorter. This is not a word-count penalty. The useful gap is specificity: many descriptions list interface features without documenting Sayan's exact contribution, the starting problem, constraints, implementation choices and demonstrated delivery.

**Next content work:** expand two or three flagship cases with confirmed role, concrete scope, development decisions and screenshots that substantiate them. Keep client versus own-product labels and launch status accurate. Do not invent revenue gains, uptime, testimonials, client locations or delivery dates. This audit did not have evidence to publish those claims.

### P2 — Opslin deployment guide needs a reproducible example

The guide explains the deployment workflow and distinguishes beta/planned features. It would be more useful with one actually tested sample: runtime/version, redacted configuration, health-check result, deployment screenshot and rollback behaviour. Publish it after verifying the product behaviour, rather than guessing commands from a marketing description. Link the specific supported-runtime/onboarding documentation when available.

### P2 — Explain enquiry handling at the point of use

The form requested contact/project information without an immediate explanation of the draft journey or local currency preference.

**Fixed locally:** a short factual notice now explains that the form prepares a browser draft and the visitor reviews and sends it using Gmail or WhatsApp. This is not a full privacy policy. Hosting logs, email retention and external providers' policies have not been audited; no retention or compliance guarantee was added.

### P3 — International engagement details need confirmed commitments

Service pages describe a Kolkata base and worldwide remote work. Improve buyer confidence with confirmed proposal currency, milestone/review process, code/account handover and support boundaries. The owner approved independent USD intake bands; these are implemented locally. Do not turn an example budget into a guaranteed full application price or invent foreign offices and response-time commitments.

### P3 — Long titles are review candidates, not automatic failures

Claude's parser measured 79 characters for Bakaloo Platform and 78 for ANTAR. Review their search snippets after actual impressions accrue, and shorten if they obscure the important proposition. Google display width varies; character length alone does not establish lost rankings or low CTR. No titles were rewritten on that evidence alone.

## What is already working

Founder references consistently identify Sayan Mondal as founder of both Opslin and Shotlin. The four service pages have distinct intent and relevant project links. Opslin is presented as the founder's product; Rustbloom and ANTAR have distinct production states. Core page text, metadata and schema are available in the server response. The error-page cross-check returns a true 404 with noindex and no homepage canonical.

## Optional toolkit suggestions deliberately deferred

The agent-readiness script reports missing `llms.txt`, Markdown negotiation and discovery files as informational/optional. The current server-rendered site is already readable. No claim is made that adding those files would improve Google positions or make an AI cite the site. Search access and training permissions are different policies; no robots exclusions were added.

Hero image size warnings also require context. The owner explicitly requested face clarity and existing layout contains the image. Do not degrade that image solely to satisfy a generic file-size threshold. Measure LCP and rendered layout first; any responsive asset change must retain the requested clarity. Missing intrinsic dimensions alone do not prove layout shift when the CSS container reserves space.

## Coverage limits and next decisions

No authenticated GSC query/CTR/index inspection, backlink profile, country-specific keyword volume, AI share-of-voice, field LCP/INP/CLS or mobile browser score was obtained. No fabricated composite SEO score is assigned to those missing measurements. OpenSEO account authentication was previously successful, but its tools remain unavailable in this chat.

After tool discovery is repaired, use actual GSC query/page/country/device data to prioritize positions 4–15, beyond-20 intent gaps and CTR comparisons. The [global functional plan](../global-seo-functional-plan-2026-10-24.md) specifies market research, pricing, content and editorial-link phases. No ranking date is promised.

This report used the installed [Claude SEO source](https://github.com/AgriciDaniel/claude-seo/tree/6be93f45064ffbadced572b5d5c95f55fd263af0) and a separate read-only content review. External content and toolkit heuristics were treated as evidence to assess, not unquestioned ranking rules.

## Local verification

The production build, ESLint and TypeScript checks passed after the enquiry fixes. All 11 contact/currency/canonical tests passed. `scripts/verify-seo.py` passed for all 22 generated sitemap pages, including metadata, structured-data parsing, internal links and anchor reachability. Public pages remain statically generated; only the currency endpoint is dynamic. These are local checks, not proof of a deployed change or successful browser interaction.
