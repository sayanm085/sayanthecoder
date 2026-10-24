# Live technical SEO audit — 24 October 2026

Observed at approximately 12:58–13:00 UTC (18:28–18:30 IST). This is a read-only public production audit. No deployment, domain setting, search submission or website code was changed by this audit.

## Main finding

**P1: Production redirects the apex domain to `www`, while canonical URLs, sitemap URLs and structured-data identifiers declare the apex domain.** These are conflicting consolidation signals. They do not prove that Google has indexed the wrong URL or that rankings are affected.

Evidence: `https://sayanthecoder.in/` returned HTTP 308 with `Location: https://www.sayanthecoder.in/`. The `www` homepage returned 200 but its actual HTML includes `<link rel="canonical" href="https://sayanthecoder.in"/>`. The same mismatch occurs on the sampled Opslin, service and article URLs. All 19 sitemap entries use `https://sayanthecoder.in`; the live sitemap and robots files themselves are served on `www` after an apex redirect.

Choose one public origin and align the redirect, `SITE_URL`/`lib/site.ts`, canonical URLs, sitemap, robots sitemap location, social URLs and entity identifiers. The existing production routing favors `https://www.sayanthecoder.in`. If the owner requires the apex as canonical instead, reverse the production host redirect before treating apex URLs as final. Verify the chosen origin returns 200 directly and every alternate host permanently redirects to it, preserving the path and query; verify canonicals and sitemap entries then point to the final 200 URLs.

## HTTP and discovery evidence

These were actual GET responses collected with curl, without following redirects when measuring the initial response. Headers identify Vercel as the server.

| Requested URL                                                   | Response | Location / observation                                        |
| --------------------------------------------------------------- | -------- | ------------------------------------------------------------- |
| `http://sayanthecoder.in/`                                      | 308      | `https://sayanthecoder.in/`, followed by another 308 to `www` |
| `http://www.sayanthecoder.in/`                                  | 308      | `https://www.sayanthecoder.in/`                               |
| `https://sayanthecoder.in/`                                     | 308      | `https://www.sayanthecoder.in/`                               |
| `https://www.sayanthecoder.in/`                                 | 200      | HTML homepage                                                 |
| `https://sayanthecoder.in/work/opslin`                          | 308      | `https://www.sayanthecoder.in/work/opslin`                    |
| `https://sayanthecoder.in/robots.txt`                           | 308      | Same path on `www`                                            |
| `https://sayanthecoder.in/sitemap.xml`                          | 308      | Same path on `www`                                            |
| `https://www.sayanthecoder.in/robots.txt`                       | 200      | `text/plain`; allows `/` for `*`                              |
| `https://www.sayanthecoder.in/sitemap.xml`                      | 200      | `application/xml`; 19 URL entries                             |
| `https://www.sayanthecoder.in/work/opslin`                      | 200      | Opslin case study                                             |
| `https://www.sayanthecoder.in/services/devops-cloud-deployment` | 200      | Service landing page                                          |
| `https://www.sayanthecoder.in/insights/opslin-vps-deployment`   | 200      | Founder deployment article                                    |
| `https://www.sayanthecoder.in/seo-audit-nonexistent-20261024`   | 404      | Actual missing-page HTTP status, with `noindex` in HTML       |

Live robots content:

```text
User-Agent: *
Allow: /

Sitemap: https://sayanthecoder.in/sitemap.xml
```

Four additional homepage GETs using Googlebot, Bingbot, OAI-SearchBot and PerplexityBot User-Agent strings each returned **200** with the page title, one H1 and the same apex canonical. None of these responses included an `X-Robots-Tag` header. This is only a User-Agent compatibility sample from the audit client's network. Spoofed strings do not establish access for verified crawler IPs, CDN bot classifications or search/AI indexing; no verified-crawler log evidence was available.

All 19 sitemap paths returned 200 when requested directly on the final `www` host: `/`, `/insights/opslin-vps-deployment`, `/services/devops-cloud-deployment`, `/services/flutter-app-development`, `/services/custom-software-ai-development`, and `/work/` pages for `freshcart`, `dealker`, `bakaloo`, `bakaloo-platform`, `radha`, `opslin`, `lndry`, `lndry-pos`, `rustbloom`, `antar`, `agnix-studio`, `shotvault`, `fullbag`, `shotlin`. Only the four representative content pages received the deeper metadata/content inspection; status checks do not establish content quality for every case study.

## Representative pages

All four pages have a title, description, one H1, a canonical link and HTML robots directives `index, follow` / Googlebot `index, follow, max-image-preview:large`. No `X-Robots-Tag` was present in the sampled homepage/service/article response headers. Their HTML is populated with readable content before client interaction. This demonstrates crawlable content and permissive declarations; it does not establish search-engine indexing.

| Page                                                                            | Live title                                                             | H1                                                    | JSON-LD types                                                             |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------- |
| [Home](https://www.sayanthecoder.in/)                                           | Sayan Mondal \| DevOps & App Developer \| Opslin Founder               | Thoughtful design. Powerful engineering.              | Person, Organization (Opslin and Shotlin), ProfilePage, WebSite, ItemList |
| [Opslin](https://www.sayanthecoder.in/work/opslin)                              | Opslin — VPS Deployment & AI DevOps \| SayanTheCoder                   | Opslin.                                               | SoftwareApplication, BreadcrumbList                                       |
| [DevOps service](https://www.sayanthecoder.in/services/devops-cloud-deployment) | DevOps & Cloud Deployment — Sayan Mondal                               | DevOps & Cloud Deployment                             | WebPage, Service, BreadcrumbList                                          |
| [Opslin article](https://www.sayanthecoder.in/insights/opslin-vps-deployment)   | Opslin: simpler VPS deployment and AI-assisted DevOps \| SayanTheCoder | Opslin: simpler VPS deployment and AI-assisted DevOps | BlogPosting, BreadcrumbList                                               |

Metadata is specific to each purpose. The homepage identifies the Kolkata location and founder role in its description and nearby visible text. The service description names Linux VPS, Docker, CI/CD and monitoring. The Opslin/article copy accurately distinguishes the beta deployment platform and MCP from Launchpad and Marketplace marked coming soon. The public pages already contain this expanded material; an earlier local note saying it was only prepared locally is no longer an accurate description of these observed pages.

Homepage links connect to all 19 sitemap paths, including the service pages and article. Opslin links to the founder guide and official product; the guide links back to Opslin; the DevOps page links to Opslin, ShotVault, the other service pages and the guide. These sampled pages are discoverable through ordinary anchors. All 33 homepage image elements have an `alt` attribute; this is an attribute-presence check rather than a claim that every description is optimal. The two sampled share-image endpoints `/opengraph-image` and `/work/opslin/opengraph-image` returned 200 on `www`.

JSON-LD parses as JSON. The homepage connects founder and organization entities and publishes the LinkedIn profile in `sameAs`; Opslin uses SoftwareApplication without invented reviews or ratings. The service and article have breadcrumbs, and the article names its author. No external rich-result validator was run; syntactic parsing and appropriate types do not imply eligibility for every Google enhancement.

## Lower-priority cleanup and opportunities

1. **P2: Missing page inherits homepage metadata alongside Next.js error metadata.** The tested nonexistent URL is a true 404 with an explicit `<meta name="robots" content="noindex"/>`. It also contains inherited `index, follow`, a homepage canonical, and two title tags (homepage and `404: This page could not be found.`). This is not a demonstrated soft 404; status and `noindex` already provide strong exclusion signals. Give the error route a clear title and `noindex` and avoid inheriting the homepage canonical where the framework allows. Recheck the raw response after deployment.
2. **P3: Add a truthful publication date for the article.** Its live BlogPosting includes `dateCreated` and `dateModified` equal to `2026-10-24`, but no `datePublished`. Add the actual original publication date and a visible date if useful to readers; update the modified date only for substantive changes. Do not fabricate freshness. Recheck JSON-LD and visible author/date context.
3. **P3: Homepage H1 can be more descriptive if the design permits.** The present creative headline is supported by specific adjacent founder/DevOps/app copy and a descriptive title. This is an editorial opportunity rather than missing content. Consider incorporating a succinct professional descriptor without keyword repetition.

## Live evidence versus local source

At audit time `lib/site.ts` defaulted to `https://sayanthecoder.in` with an optional `SITE_URL` environment override. `app/sitemap.ts`, `app/robots.ts`, layout metadata and page schemas derive URLs from that value; `next.config.ts` contained no host redirect rule. This explains how application URLs can disagree with hosting-level redirects, but does not reveal the actual Vercel dashboard settings or environment variables. The live apex canonicals were independently confirmed from production HTML, not inferred from source. Later local fixes need a deployment and a repeat live check before being described as resolved in production.

## Measurement limits and next verification

- Firecrawl live requests used `maxAge: 0`, `onlyMainContent: false`, and raw HTML/markdown/links for relevant page inspections. Initial homepage and Opslin retrievals and article retrieval succeeded; subsequent homepage/service Firecrawl responses did not provide usable page data, so direct public GET HTML and headers supplied those checks. A scrape transport failure was not reported as a site failure.
- Direct public PageSpeed Insights mobile API request returned **429 RESOURCE_EXHAUSTED**, stating a daily query quota was exceeded. No Lighthouse score, loading metric, lab result or real-user Core Web Vitals measurement is available from this audit. HTML transfer sizes are not performance scores.
- No Google Search Console, Bing Webmaster Tools, analytics, server logs or backlink provider was accessed. Index coverage, Google-selected canonical, impressions, search queries, ranking, click-through rate, crawl history, backlinks and conversions remain unmeasured. Sitemap availability is not proof of submission or indexing.
- No full asset/link crawl, security review, mobile interaction test, or external schema validation was performed. Query-string redirect preservation and every possible legacy URL alias remain unverified.
- After canonical-host alignment is deployed, rerun the alias/header and metadata checks above; inspect the chosen canonical in Search Console, submit the final sitemap, and measure actual search/performance results before making further causal claims.
