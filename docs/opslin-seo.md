# Opslin content and search preparation

Production origin: https://sayanthecoder.in (confirmed by the owner, 24 October 2026). The site is being prepared locally; no live deployment or search-index submission was performed.

## Implemented

- Corrected Sayan Mondal's role to founder of Opslin and Shotlin in homepage copy, metadata, social image and entity descriptions.
- Added the owner's LinkedIn profile to visible social links and Person `sameAs`.
- Connected Person and Organization entities through founder references. Opslin's product page uses SoftwareApplication structured data without invented ratings or reviews.
- Expanded `/work/opslin` with the deployment workflow, MCP beta, visible questions and answers, and a product-specific CTA. Other client case studies retain their project-enquiry CTAs.
- Added the internally linked `/insights/opslin-vps-deployment` article with author, product attribution, canonical, social metadata, BlogPosting structured data and breadcrumbs.
- Added the article to the sitemap. Canonicals, robots sitemap location, structured data and share images use the purchased production domain by default, including when hosted on Vercel.

## Evidence and limits

Product reference: [official Opslin website](https://www.opslin.com/), retrieved on 24 October 2026. It describes bring-your-own Linux VPS deployment, GitHub or upload workflows, domains and SSL, database views, logs, monitoring, health checks, rollback and permissioned MCP beta. It marks Launchpad and Marketplace coming soon. The copy preserves these availability distinctions and does not invent performance measurements or deployment guarantees.

Identity reference: the owner's explicit confirmation that he founded Opslin and Shotlin. [LinkedIn profile](https://www.linkedin.com/in/sayanthe-coder/) retrieval was unavailable: Firecrawl returned “Enrichment is not enabled for person profiles on this team”; a public web fetch also failed. No employment history, awards or third-party endorsements were inferred from that profile. A later public search result exposed the profile headline and confirmed the spelling Shotlin; see search-research-2026-10-24.md for the current review.

These changes make the pages clearer and technically discoverable. They do not establish rankings, indexing, traffic gains, “best engineer” status or AI recommendations. No keyword-volume, ranking, backlink or Core Web Vitals measurements were collected.

## After hosting

Deploy the production build on the confirmed domain, check that HTTPS and public URLs resolve, and verify `/robots.txt` and `/sitemap.xml`. The owner can then verify the domain in Google Search Console and Bing Webmaster Tools and submit the sitemap. Search engines choose whether and when to index and rank pages. Keep product availability accurate as the beta changes and link the founder profile from official company properties where appropriate.
