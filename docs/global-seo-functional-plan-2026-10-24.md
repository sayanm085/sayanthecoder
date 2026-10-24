# Global SEO, GEO and enquiry plan — 24 October 2026

## Recommendation and repository comparison

Use Claude SEO as the audit toolkit and OpenSEO as the connected research service. Keep the existing portfolio and its repeatable checks. Installing a toolkit does not change Google's ranking or grant access to Search Console.

| Candidate                                                  | Evidence from inspected source                                                                                                                    | Best use here                                                                                                 | Limitation                                                                                                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [Claude SEO](https://github.com/AgriciDaniel/claude-seo)   | Version 2.5.0; technical/content/schema/international/GEO workflows; Python execution scripts; optional data integrations                         | Stronger of the two supplied AgriciDaniel repositories for a developer-led site audit and implementation plan | Primarily a Claude Code plugin; its Python toolkit can run here, but Claude commands and orchestration are not automatically Codex tools |
| [ChatGPT SEO](https://github.com/AgriciDaniel/chatgpt-seo) | SEO-pro 0.2.16; ChatGPT uploadable plugin; 27 task workflows; nine optional offline commands                                                      | Reviewing pages, drafts and supplied SEO exports inside ChatGPT                                               | Cloning does not install the ChatGPT plugin or connect live Google data                                                                  |
| [OpenSEO](https://github.com/every-app/open-seo)           | Official Codex marketplace; bundled HTTP MCP connection and 12 public skills; project, keyword, competitor and connected Search Console workflows | Fill the measurement gap once the current chat can invoke its authenticated tools                             | Authentication, tool discovery, Google property connection and paid research credits are separate states                                 |

The GitHub pages showed approximately 20,000 stars for Claude SEO and 854 for ChatGPT SEO when inspected. These are changing popularity figures, not comparative accuracy tests. Source coverage and compatibility drive the recommendation. No benchmark demonstrating that either improves rankings more was found.

Inspected commits: Claude SEO `6be93f45064ffbadced572b5d5c95f55fd263af0`; ChatGPT SEO `b9dd5c8fab722c7610184927a902ca689165d322`; OpenSEO `2d8236a4fd5d799bf5c089187d0131f4dac4f38c`. All three were cloned for inspection. The selected Claude toolkit is also retained in `/Users/sayan/.codex/tools/claude-seo`, outside the website repository. Do not commit its dependencies, credentials or embedded Git checkout to the portfolio.

## OpenSEO prompt review and setup

The supplied attachment is a setup proposal, not website copy or repository policy. Its core approach is sound: inspect the client, avoid duplicate connections, install the public bundled skills, use OAuth, and verify actual account reads before claiming readiness. Its regular-ChatGPT and Claude instructions do not apply to this Codex session. Local CLI help confirmed the supported commands before execution.

Installed `openseo@openseo` 1.0.25 through its official marketplace. Verified the installed manifest, 12 bundled skills and HTTPS MCP endpoint. OAuth reported successful login. No duplicate standalone MCP server or second set of OpenSEO skills was added; existing integrations were preserved. No paid OpenSEO research ran during setup.

**Remaining verification:** this active chat has not exposed OpenSEO tools. Start a fresh Codex chat with this project; if discovery does not refresh, restart the desktop app. Ask: “Use OpenSEO to check my connection and list my projects.” Only successful free account/project reads establish usable account access. If no matching project exists, create one for `https://www.sayanthecoder.in`. Then connect the owner's actual Search Console property in OpenSEO. OAuth to OpenSEO alone does not establish Google property access. See the [OpenSEO Codex guide](https://openseo.so/docs/codex-plugin) and [official OpenAI plugin documentation](https://developers.openai.com/plugins/build/plugins).

Claude SEO's isolated Python runtime was set up without Chromium. The read-only homepage parser ran successfully; its structured output is saved in `claude-seo-homepage-2026-10-24.json`. Browser scrolling, visual interaction, field Core Web Vitals and Claude-native subagent commands were not verified by that run.

## Production audit findings

Fresh read-only HTTP evidence is saved in `live-seo-recheck-2026-10-24.json`. This rechecks the deployed release, rather than treating the local build as production.

| Check                      | Observed result                                                     | Implication                                                                                     |
| -------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| XML sitemap                | 22 URLs; HTTP 200                                                   | Crawl discovery file is reachable; submission and indexing remain separate                      |
| All sitemap destinations   | 22 HTTP 200 responses, one H1 each, self-referencing www canonicals | No sampled status/canonical/H1 failure                                                          |
| Titles and descriptions    | Unique titles; descriptions present on all 22 pages                 | Basic metadata coverage is working                                                              |
| Structured data            | JSON-LD present and parseable on all 22 pages                       | Syntax presence verified; this is not Google rich-result eligibility validation                 |
| Image alternative text     | No missing alt attributes in sampled server HTML                    | Does not establish that every description is useful or that images load visually                |
| Robots                     | Allows crawling; references the www sitemap                         | No robots.txt blanket restriction observed                                                      |
| Host consolidation         | Apex resolves to www                                                | Preserve the existing redirect and canonical host                                               |
| Unknown URL                | True HTTP 404; no home canonical                                    | Keep excluded from sitemap; inspect all emitted robots directives                               |
| Crawler user-agent samples | Googlebot, bingbot, OAI-SearchBot and PerplexityBot returned 200    | Header-only requests do not impersonate verified crawlers or prove CDN treatment from their IPs |

The homepage's independent Claude parser found the expected founder description, one H1 and six schema blocks. There is no new evidence here of an indexing blocker. This does not prove inclusion in Google's index, a keyword position, backlink authority or AI citation frequency. No numeric SEO “health score” is assigned to unmeasured categories.

## First implementation: currency and enquiry behaviour

The owner approved independent USD budgets, not converted INR amounts.

| India — INR         | International — USD |
| ------------------- | ------------------- |
| Under ₹50,000       | Under $1,000        |
| ₹50,000–₹1,50,000   | $1,000–$3,000       |
| ₹1,50,000–₹5,00,000 | $3,000–$10,000      |
| ₹5,00,000+          | $10,000+            |

Both retain “Let’s discuss.” These qualify enquiries; they are not published package promises or exchange-rate calculations.

Implementation:

1. A dedicated, uncached `/api/visitor-currency` endpoint reads Vercel's country header. India selects INR; other or unavailable countries select USD. [Vercel documents the country headers](https://vercel.com/kb/guide/geo-ip-headers-geolocation-vercel-functions). The site does not request GPS or call an external IP lookup provider.
2. The shared Gmail/WhatsApp form offers an explicit INR/USD selector. A remembered manual preference takes priority over automatic detection. VPNs, travel and missing geo headers can be corrected by the visitor.
3. Detection has a four-second timeout. A late result cannot replace a manual currency choice. Changing currency resets the old budget to “Let’s discuss,” avoiding accidental currency relabelling.
4. Drafts contain the selected amount and the explicit `USD` or `INR` code. WhatsApp continues to the confirmed number, `+91 97758 45587`; visitors review and send their own message.
5. Only the currency endpoint is dynamic. Public SEO pages remain statically generated with stable canonical URLs and the same useful English content internationally. Do not create country doorway pages merely to change currency.

Acceptance: test India, US, UK, Australia, UAE, Canada and unavailable location; manual preference persistence; blocked storage; detection timeout; switching after entering a budget; Gmail/WhatsApp encoding; no public-page cache contamination. Automated coverage verifies mapping, independent bands and draft labels; real Vercel country routing and interactive mobile/desktop behaviour need production/browser verification after release.

## International pricing research and positioning

The user wants international value without appearing low quality. The approved USD bands are appropriate as an intake segmentation choice; they are not evidence of a universal market rate.

Published models differ substantially. [Thoughtbot's own business playbook](https://thoughtbot.com/playbook/the-thoughtbot-way/operations/business-development) describes per-person weekly billing with scope determined after discovery. [GoodBarber's official e-commerce pricing](https://www.goodbarber.com/pricing/ecommerce/) lists subscription and one-time app-builder licensing, with currency varying by location. These cover different deliverables and are not interchangeable custom-development quotes. A Designjoy page inspection did not expose a reliable current numeric price; no amount from memory was used. A Cleveroad estimate PDF could not be fetched through the research tool and was not used as a price benchmark.

**Discount method:** after a specific scope exists, compare three current, comparable proposals or published offers from the target market. Match platforms, number of roles, payments, admin, design, migration, testing, ownership, support, infrastructure and taxes. Record source/date/currency. If a like-for-like reference is $10,000, 20–30% below would be $7,000–$8,000; this is an illustration, not an observed quote or public offer. Check effort and margin before quoting. Do not advertise an invented crossed-out “market price” or promise a full grocery marketplace for the lowest intake band.

For positioning, lead with real project interfaces, founder expertise, scope clarity, source ownership, staged delivery and maintenance terms. Show a proposal with milestones after discovery. Separate setup/development, ongoing hosting/API costs and support.

## Staged global SEO and GEO plan

Timeframes below are work phases, not promises of ranking dates.

| Phase                              | Work                                                                                                              | Acceptance evidence                                                                                                                                                  |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Now                                | Currency implementation, deployed metadata recheck, tool setup                                                    | Passing build and tests; 22-page HTTP evidence; separate installation/authentication/tool-read states                                                                |
| First data session                 | Verify OpenSEO free reads; select/create project; connect GSC; confirm sitemap and representative URL inspections | Actual property and inspection results; dated query/page/country/device exports; no guessed property or metrics                                                      |
| Week 1                             | Compare UK, US, Australia, Canada and UAE with country-specific English SERPs and keyword batches                 | Query, country, language, date, organic position, matching URL, provider and metric date captured; choose two initial markets based on demand and qualified-lead fit |
| Weeks 1–2                          | Prioritize service-page changes against existing project proof and actual gaps                                    | Each edit tied to a real query cluster, user decision and measurable page; protect already successful pages                                                          |
| Weeks 2–4                          | Publish a small number of original case studies and buyer guides where research identifies gaps                   | Real screens, problem, scope, implementation tradeoffs, author and honest project status; no invented client outcomes                                                |
| Weeks 2–6                          | Earn relevant links and mentions                                                                                  | Owner-approved founder/product profiles and editorial contributions; actual destination URLs verified; no bulk backlink packages                                     |
| Following recrawls and enough data | Review impressions, clicks, country/service enquiries and conversions                                             | Comparable periods and cohorts; title experiments on demonstrated low CTR; no universal CTR assumption                                                               |

Start with narrow buyer intent: website/web-app development, Flutter app development, DevOps/VPS deployment, and custom software/AI automation. Use actual FreshCart/Bakaloo/LNDRY/POS/CRM work as proof. Develop use-case content for grocery, laundry/POS and WhatsApp CRM where country research supports it. Treat Opslin as the founder's own product with product-specific documentation, rather than offering to clone it for clients.

For GSC triage: segment branded versus non-branded queries, then examine positions 4–15 with meaningful impressions; inspect beyond-20 queries only when the landing page matches intent; investigate low CTR against country/device/position peers. Do not label any phrase “trending” from an autocomplete suggestion or one SERP snapshot. Paid OpenSEO keyword/backlink/SERP work should use an agreed credit cap; none was purchased in this setup.

For GEO: preserve crawlable server-rendered answers and consistent Sayan Mondal/Opslin/Shotlin entities, original engineering explanations, clear author attribution and accurate schema. Include concise answers to real buyer questions followed by evidence. Evaluate AI visibility with a dated, repeatable prompt set per engine and country, logging citations and repeat samples. An `llms.txt` file or schema alone is not a citation guarantee.

For international architecture: retain the English site and real Kolkata base. The `.in` domain is an India country signal; do not invent overseas offices. Consider a separate generic domain or localization only if sustained country data and business needs justify the cost. Add hreflang only when genuine language/region alternatives exist. Do not translate by swapping country names into identical service pages.

## Boundaries and next measurable decision

No ranking, search volume, backlink count, indexed-page count or AI share-of-voice was obtained from an authenticated SEO data tool in this active chat. The next key step is free OpenSEO account/project verification and actual GSC access. Public crawling can continue independently, but those measurements cannot be fabricated from a successful installation.

No ranking in two or three days is promised. [Google explains that changes can take time to show effects](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Judge this programme by verified indexing, relevant country-level visibility and qualified enquiries rather than an installation badge or repository stars.
