# SEO / GEO audit and optimization — 24 October 2026

## Outcome and deployment boundary

The public audit found a host-consolidation conflict and verified that the sampled production pages can be fetched. The source fixes and content improvements below were implemented and verified before publication. The owner subsequently confirmed that GitHub `main` in `sayanm085/sayanthecoder` is the Vercel production source and authorized committing and pushing this release. This report records the pre-deployment audit and local checks; the production verification result is reported separately after publication. No DNS modification or search-index submission is part of this release.

## Confirmed production observations

| Priority | Finding                                                                 | Evidence / scope                                                                                                | Action prepared                                                                                                                                               |
| -------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1       | Canonical host differs from final redirect host                         | Apex HTTPS returns 308 to www, but sampled page canonicals, sitemap and schema identify apex                    | Normalize both production aliases to `https://www.sayanthecoder.in`, including old `SITE_URL` values; sitemap, robots, social URLs and schemas derive from it |
| P2       | Error page inherits a homepage canonical and redundant index directives | Tested URL is a real 404 with noindex, yet also inherits homepage metadata                                      | Move home canonical onto home only; remove redundant explicit root index directives. Generated404 retains noindex and no longer has a canonical               |
| P2       | International service scope and buyer decisions can be clearer          | Current English pages show relevant work but can better explain remote engagement and website/web-app decisions | Add a website/web-app service page, services hub, remote-delivery context and practical buyer checklist                                                       |
| P3       | Loader counter can become negative                                      | Firecrawl-rendered homepage text included negative loader values; source calculation had only an upper clamp    | Clamp progress to 0–1 while retaining reduced-motion handling and native-scroll fallback                                                                      |

All 19 original sitemap destinations returned 200 on www. Four homepage user-agent samples (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot) returned 200 with content. No sampled X-Robots-Tag block was found; robots allows `/`. These are public compatibility observations, not proof of verified crawler/CDN access, indexing or ranking. A true missing URL returns 404. Exact headers, dates and sample URLs are in [the live audit](live-seo-audit.md).

## Content and GEO work implemented

- Concise homepage title covering web, app and DevOps work, with truthful founder/location/global delivery description.
- A fourth dedicated service page: `/services/website-web-app-development`, linked to actual LNDRY, Agnix Studio and Bakaloo platform evidence.
- A crawlable `/services` hub with all four service pages and matching social metadata.
- Clear remote availability from Kolkata, including the UK, Australia, UAE, US and Canada, without overseas addresses or fabricated client claims.
- An original `/insights/website-app-project-brief` guide and downloadable editable template, covering scope, users, workflows, integrations, budget/currency, remote reviews, ownership and handover.
- Contextual internal links and sitemap coverage expanded to 22 pages. No duplicate country doorway pages or invented locale variants/hreflang were added.
- Existing Person, ProfilePage, Organization, Service, Article, SoftwareApplication and breadcrumb data stays tied to visible facts. Opslin’s publication date is based on the article being observed live on 24 October 2026. The new unpublished guide uses its written/modified date without claiming publication.

For AI search, the aim is accessible, clear and attributable material, not special ranking markup. Google says [normal SEO best practices apply to AI features](https://developers.google.com/search/docs/appearance/ai-features), and inclusion is not guaranteed. No hidden AI-only copy, fake citations, reviews, awards or measurable outcomes were added.

## Overseas markets and actual keyword evidence

Candidate markets are the **UK, Australia, UAE, US and Canada**. Their priority is a commercial hypothesis informed by government business/digital-adoption sources, service fit and remote-delivery considerations—not an ease-of-ranking forecast. See [international research](international-search-research.md) for dated primary sources and supplier page examples.

A small public Google autocomplete sample was also retrieved on 24 October 2026 with English and country parameters. [Raw responses and query URLs](keyword-suggestion-sample.json) are saved. Observed phrases include:

| Country parameter | Example observed suggestions                                                  | Sensible content response                                                    |
| ----------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| US                | website development costs; website development services; app development cost | Explain estimate inputs and included work, without invented fixed prices     |
| GB                | website development company; hiring flutter developer remote                  | Show who performs the work, relevant projects and remote collaboration scope |
| AU                | business website development services; custom software development services   | Distinguish websites, operational software and existing-tool alternatives    |
| CA                | app development company; business automation services                         | Connect app/automation scope to real workflows and project evidence          |
| AE                | website development UAE; mobile app development company                       | Explain remote delivery honestly, without claiming a Dubai office            |

Autocomplete is **not** search volume, competition, trend growth or a verified local SERP report. The supplied country parameter does not prove market-specific coverage. Course/software suggestions and unrelated results were not turned into service keywords. No phrase is labelled “trending” on this evidence.

The `.in` domain is a country signal to India under [Google’s international-site guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites). It can still be used for international business; no migration is justified by the evidence here. Assess real country-level impressions and enquiries before any domain decision.

## Backlinks: concrete preparation, no fabricated placements

A [backlink action kit](backlink-action-kit.md) supplies target assets, appropriate founder/profile/collaborator opportunities and reviewable attribution/resource-page drafts. The buyer guide and template provide something useful to reference. No outreach was sent and no third-party page was edited. Referring-domain counts, link gaps, link quality and placements remain unmeasured. External editorial links require the relevant owner/editor’s choice. No ranking-credit links were bought, exchanged or mass-created.

## Tools, skills and unavailable data

- Public checks: Firecrawl, direct HTTP headers/raw HTML, all original sitemap destinations, crawler-UA samples and source/build checks.
- PageSpeed API returned 429. No Core Web Vitals or lab scores were obtained; desktop/mobile scroll could not be visually exercised because local browser use is disabled in Work settings.
- No active Search Console or keyword/backlink data connection was confirmed. Firecrawl provider discovery found no matching measurement provider. Ahrefs was discovered, but its documentation operations returned MCP `Unknown tool`; no account/project ID was guessed. No GSC positions/CTR, volumes, difficulty, backlinks or AI recommendation rates were obtained.
- Installed the current reviewed `coreyhaines31/marketingskills` main snapshot, commit `e85f3cbc2e4a79bf33b2a12e9bdd9087d414735b` dated 19 October 2026: SEO Audit 2.2.2, AI SEO 2.10.1, Link Building 1.0.1. Source: [GitHub repository](https://github.com/coreyhaines31/marketingskills/tree/e85f3cbc2e4a79bf33b2a12e9bdd9087d414735b/skills). These installed skills are available on the next turn; they do not supply analytics access. Repository instructions were treated as workflow guidance, and ranking/citation statistics were not copied into this report as facts about this site.

## Measurement and release checklist

1. Deploy this reviewed build to the current production project. Existing apex→www redirect should remain; the final www pages must declare themselves. Check the 22 sitemap destinations, robots sitemap URL, social metadata and404 again on production.
2. Verify the actual domain property in Google Search Console and Bing Webmaster Tools with owner-controlled DNS or real verification tokens. This task did not obtain or modify verification status. Submit `https://www.sayanthecoder.in/sitemap.xml` and inspect representative pages; requesting indexing needs owner/full-user access.
3. Obtain a complete 28-day query/page/country/device baseline, expanding the window if impressions are sparse. Separate branded from non-branded intent and commercial from informational searches. Investigate measured positions 4–15 and beyond 20 only once real rows exist. Compare CTR with comparable country/device/position cohorts rather than an assumed universal benchmark.
4. Track qualified enquiries by service and country alongside impressions/clicks. Review after Google has recrawled and a meaningful sample accumulates. Repeated AI-query observations need dated prompts, engine settings and sample sizes; a single answer is not a ranking measurement.

A 2–3 day ranking promise is not supportable. Google explains that effects may appear in hours or months and recommends [waiting a few weeks to assess SEO changes](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). A [sitemap does not guarantee indexing or improve rankings by itself](https://developers.google.com/search/help/crawling-index-faq). No country-specific ranking date or top-position outcome is forecast here.

## Final local verification

Production build, ESLint, TypeScript and formatting passed. Eight contact/origin tests passed. The repeatable check `python3 scripts/verify-seo.py` passed across all 22 sitemap pages, checking unique titles, descriptions, one H1, production canonicals, social metadata, parsed JSON-LD and internal page/anchor reachability. All 22 local HTTP routes and the editable download returned 200. An unknown local page returned 404 with noindex and no canonical.

Two public discovery queries (`site:www.sayanthecoder.in` and `"Sayan Mondal" "sayanthecoder.in"`) returned no results in the available web search tool. This does **not** establish Google's indexing status or a ranking position; use the verified property's URL Inspection and Performance reports. The production audit and the modified local build remain separate evidence sets until deployment is confirmed.
