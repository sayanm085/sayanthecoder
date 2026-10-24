# Search and AI visibility: research and implementation

Reviewed 24 October 2026 for Sayan Mondal’s portfolio, https://sayanthecoder.in. The owner confirms the domain is purchased and not hosted yet. Scope: identity, Opslin, Shotlin, DevOps/cloud, Flutter apps and custom software. No live deployment or index submission was performed.

## Data availability

The exposed VibeSEO `list_projects`, `search_locations` and `question_keywords` operations returned MCP `Unknown tool`. Its Google Search Console status requires a project ID, which could not be retrieved; no project ID was invented. A Windsor.ai integration was discovered and suggested as an alternative, but its connector inventory also returned `Unknown tool`. Therefore no Search Console account, property, date range or rows were accessible in this session.

**Unavailable measurements:** impressions, clicks, CTR, positions, keyword volumes/difficulty, competitor traffic and trend growth. This report does not classify any query as ranking 4–15 or beyond 20, and does not claim a measured CTR deficit. Missing data is not zero performance.

## Sources and observed patterns

- [Sayan’s public LinkedIn result](https://in.linkedin.com/in/sayanthe-coder): the public search result describes Sayan as founder of Opslin and Shotlin. This resolves the earlier Shortlin spelling. No private profile data was retrieved.
- [Official Opslin about page](https://www.opslin.com/about): category, audience and founder attribution. The product is described as a VPS deployment platform for customer-controlled Linux servers.
- [Official Opslin website](https://www.opslin.com/): deployment workflow, monitoring, supported AI operations, beta availability; Launchpad and Marketplace are marked coming soon.
- [Brittany Chiang](https://brittanychiang.com/): a clear professional introduction linked to experience, projects and writing. Observed presentation pattern, not a measured ranking cause.
- [Purrweb’s portfolio](https://www.purrweb.com/portfolio/): project descriptions organized around platforms and capabilities. Adaptation: connect each service to real screenshots and scope. No client results or metrics were copied.
- [Coolify’s VPS deployment guide](https://coolify.io/deploy-apps-on-your-own-vps): direct deployment question, answer, requirements, workflow and limitations. This supports practical question-led content ideas; it does not establish that Coolify is trending.
- [Flutter FAQ](https://docs.flutter.dev/resources/faq): shared code/platforms and production-app questions. Technical platform reference, not evidence of keyword demand.
- [Google title-link guidance](https://developers.google.com/search/docs/appearance/title-link): concise descriptive titles; avoid keyword stuffing. Google chooses the displayed title.
- [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features): indexable textual content, useful internal links and matching structured data remain relevant. No special schema or AI text file is required, and inclusion is not guaranteed.
- [Search Console metrics and filtering](https://developers.google.com/search/blog/2022/10/performance-data-deep-dive): clicks, impressions, CTR and average position have aggregation/privacy limitations.

Public search phrases included `Shotlin Sayan`, `Sayan Mondal Opslin` and official Google queries on AI visibility, titles and Search Console performance. The research reviewer also examined software/app portfolio and VPS deployment questions. These are search observations, not a Google rank tracker or Google Trends study.

## Keyword-to-page map

These are relevance-based opportunities, **not measured search-volume findings**.

| Intent / phrases                                             | Primary page                               | Evidence on the page                                                                    |
| ------------------------------------------------------------ | ------------------------------------------ | --------------------------------------------------------------------------------------- |
| Sayan Mondal, SayanTheCoder, Opslin founder, Shotlin founder | `/`                                        | Visible identity, company relationships, LinkedIn, Person/ProfilePage/Organization data |
| Opslin, VPS deployment platform, AI-assisted DevOps          | `/work/opslin`                             | Actual product interface, workflow, beta status, founder and official product link      |
| Shotlin, Sayan Mondal studio                                 | `/work/shotlin`                            | Consistent name, founder-led design/software scope                                      |
| DevOps engineer, cloud deployment, deploy app to own VPS     | `/services/devops-cloud-deployment`        | Linux/Docker/release/monitoring scope, Opslin proof, preparation and rollback questions |
| Flutter app developer, Android and iOS app development       | `/services/flutter-app-development`        | Platform considerations, real app galleries, backend integration questions              |
| Custom software developer, Next.js dashboards, AI workflows  | `/services/custom-software-ai-development` | Workflow scope, CRM/POS proof, permissioned automation questions                        |
| How does Opslin work? AI deployment on a VPS                 | `/insights/opslin-vps-deployment`          | Founder-authored explanation, workflow, limits, official reference, visible review date |

Brand queries and precise service intent are more appropriate editorial targets than calling Sayan “the best DevOps engineer” without independent evidence. No unsupported awards, statistics, reviews, locations or superlatives were added.

## Implemented

- Descriptive homepage browser/search title and aligned social title/description.
- Early visible Sayan/DevOps/app/founder introduction while preserving the visual hero design.
- Shotlin spelling aligned in active copy and entity identifiers.
- Three distinct, server-rendered service pages with specific scope, visible Q&A, project links, cross-links and Service/WebPage/BreadcrumbList data.
- Homepage visible identity/product Q&A and ProfilePage entity connecting the page to Sayan.
- Expanded studio description, with actual founder role and product boundaries.
- XML sitemap expanded with all service pages; existing project/article coverage retained.
- Optional Google/Bing ownership-verification token environment fields; no tokens fabricated and no ownership verification claimed.
- Article written/reviewed date matches `dateCreated`/`dateModified`. No prelaunch `datePublished` claim; set an actual publication date when first published.

## Required live-data analysis after access exists

Use the verified `sc-domain:sayanthecoder.in` property, or the actual HTTPS URL-prefix property the owner can access. Inspect a recent complete 28-day period and compare the previous 28 days; expand to 90 days if impressions are sparse. Respect Search Console’s data delay. Pull query + page + country + device rows with clicks, impressions, CTR and average position. Keep brand and non-brand intent separate, paginate within API limits and disclose privacy filtering.

1. **Positions 4–15, high impressions:** filter the measured rows, sort by impressions and group each query to its landing page. Positions 4–10 may already be page-one results; 11–15 are near-page-one opportunities. Review intent, title, opening answer, internal links and proof before changing copy.
2. **Positions beyond 20 with impressions:** group relevant queries by topic and existing landing page. Diagnose whether content answers the task, whether a more suitable page exists and whether the page is indexed/canonical. Ignore irrelevant impressions rather than adding unrelated keywords.
3. **Low CTR for position:** calculate impression-weighted CTR by comparable position band, device, country and brand intent. Compare against the site’s own sufficiently sampled cohort, not a universal CTR benchmark. Small samples and unusual SERP features should be flagged. Review titles/descriptions as candidates, not proven causes; change one hypothesis and evaluate after recrawling.

No exact ranking improvement, page-one deadline or AI citation can be promised. Sitemap priority and extra keywords are not ranking guarantees.

## Hosting handoff

Deploy on HTTPS at the confirmed canonical domain. Ensure aliases redirect to it, routes return HTTP 200, unknown pages return 404, and the hosting/CDN layer does not block wanted crawlers. Verify ownership with real DNS or verification tokens, then submit `https://sayanthecoder.in/sitemap.xml`. Check the homepage, Opslin and service URLs with URL Inspection. No DNS, Search Console, Bing or hosting changes were made by this task.

## Verification completed

The final production build, ESLint and formatting checks passed. Generated HTML for all 19 sitemap pages was checked for unique nonempty titles, descriptions, one H1, matching production canonicals, social metadata and parseable JSON-LD. All internal page and anchor links resolved against the generated pages. Service entries and the production sitemap reference were verified. This confirms the local build output, not Google indexing, live hosting, rankings or field performance.
