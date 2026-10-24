# Rankings, visitors and customers — measurement setup

## Current state

- Search Console is connected to OpenSEO with owner access for `sc-domain:sayanthecoder.in`. Its first queried window, September 24–October 21, 2026, returned no rows; this is not proof of a current indexing problem.
- Six mobile, English, depth-40 country trackers are prepared in OpenSEO: India, United States, United Kingdom, Australia, Canada and United Arab Emirates. Each has six keywords and remains **manual**, with no run or future paid schedule.
- Keywords: Sayan Mondal, Opslin, Shotlin, grocery delivery app development, flutter app development service, devops consulting. The first three are branded; compare commercial terms separately.
- The current live-check estimate is at most 84 credits ($0.07988) per country, including retry allowance. All six caps total 504 credits ($0.47928). The available balance at setup was 219 credits. No live rank check was purchased. A recurring schedule needs a separate provider estimate and approval.
- GA4 property `properties/560564558` is connected to OpenSEO, with stream `16195557281` and measurement ID `G-FEVEM1S803`. Enhanced Measurement was verified globally disabled through GA4 Admin on October 24, 2026. The local activation flag is now enabled; a new deployment is required before it runs on the live site. No visitor or customer counts have been fabricated.

## Activate Google Analytics

1. Create the account and website property. Account name: Sayan Mondal. Property/stream name: SayanTheCoder Website. Website: `https://www.sayanthecoder.in`.
2. Select the real business size, Computers & Electronics category, and the Generate leads / Understand web and/or app traffic objectives. Those objectives tailor reports rather than prevent other measurement.
3. **Turn all Enhanced measurement off in the web stream before activation.** Automatic outbound-link and form events can expose enquiry draft URLs, which contain name/email/message data. Automatic history pageviews can also duplicate our explicit pageviews. Do not install a second automatic Google tag, Tag Manager snippet or analytics integration alongside this one.
4. Copy the public `G-...` measurement ID. Configure `NEXT_PUBLIC_GA4_MEASUREMENT_ID` with it and `NEXT_PUBLIC_GA4_MANUAL_MEASUREMENT=true` only after step 3. These public settings are build-time configuration, so deploy a new build afterward.
5. Test with optional analytics allowed. Check Realtime/DebugView for one page_view per navigation, enquiry_draft_prepared after a valid form, and enquiry_handoff on a Gmail/WhatsApp continuation. Verify no name, email, phone, project text or full draft URL is in event parameters.
6. Test Decline and withdrawal through Analytics preferences. The site must remain usable; tracking is disabled and no analytics script loads before the initial consent. Previously accepted visits are not retroactively erased by withdrawing consent. Ad blockers and visitors who decline cause incomplete coverage.
7. Connect the GA4 property on the project's OpenSEO Integrations page. Then use measurement health, country audience breakdown, traffic sources, landing-page and event reports. A Google login alone does not establish GA4 property access.

The environment flag is an explicit setup acknowledgement, not an API verification of GA4 settings. Recheck Enhanced measurement if another administrator or integration changes the stream.

## What each number means

| Number                                       | Source                           | Meaning and limit                                                                                                                                                                  |
| -------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Keyword position by country                  | OpenSEO Rank Tracking            | Dated sample for a keyword, country and device. A missing position means not found in the returned sample, not proof of being below the configured depth. No samples have run yet. |
| Impressions, Google clicks, average position | Search Console                   | Actual Google Search report for the property. Filter query, page, country and device. Average position is not a fixed universal rank.                                              |
| Visitors, sessions, country, landing page    | GA4                              | Observed consented analytics traffic after activation. Country is approximate and may reflect a VPN; blocked/declined traffic is not counted reliably.                             |
| Enquiry draft prepared                       | GA4 custom event                 | Valid form prepared a draft. The visitor may never continue or send it.                                                                                                            |
| Enquiry handoff                              | GA4 custom event                 | Visitor continued toward Gmail or WhatsApp. It is not proof of a sent message or a unique lead. Repeated clicks may count more than once.                                          |
| Received enquiry                             | Private inbox / CRM              | An actual message arrived. Deduplicate repeated conversations and record a private lead reference.                                                                                 |
| Qualified lead                               | Private CRM                      | Owner confirms the scope/budget is a real fit. Do not infer this from a click.                                                                                                     |
| Customer won and revenue                     | Private CRM / accepted agreement | Owner records an accepted paid engagement and actual revenue. The public website cannot observe a WhatsApp/Gmail sale automatically.                                               |

The application sends only event name, contact channel, budget currency and sanitized page location. It omits query strings/fragments, personal fields and outbound draft URLs from its explicit events. It does not install advertising tracking or claim complete legal/privacy compliance.

## Where to view results

- Google Search Console: Performance → country, query and page comparisons; Pages for indexing status.
- OpenSEO: Rank Tracking → the desired country tracker and its last-checked timestamp. All prepared trackers are currently manual and have no observations.
- Google Analytics: Realtime for activation, traffic acquisition/landing pages for sources, country audience breakdown for geography, Events for the two enquiry events. If marking enquiry_handoff as a key event, label it a contact attempt, not a customer or confirmed lead.
- Private CRM: use `customer-pipeline-template.csv` as an empty starting template. Store real records outside the public repository and public reports.

## Customer accounting

Use one private lead reference per distinct enquiry and a consistent stage: received, qualified, proposal, won or lost. Ask the client how they found the site and which country they operate in; record source and country as unknown if not confirmed. This is self-reported attribution, not automatic linkage to an anonymous GA4 visitor.

For the same reporting cohort, calculate qualified-lead rate as qualified received leads / all received leads. Calculate closed-deal win rate as won / (won + lost); show still-open proposals separately. Count revenue by currency; do not sum INR and USD without a recorded accounting conversion method. A high page-view count is not evidence of real customers.

## Review cadence

Once enough real data exists, compare country-specific non-branded impressions, clicks, relevant landing-page traffic, contact attempts, received qualified leads and wins. Preserve date range, device and measurement coverage in each report. Review the proposed grocery buyer guide and the existing Flutter/DevOps pages against that evidence. Do not repeatedly rewrite titles or publish country clones while waiting for a new site to be crawled.

This document establishes a workflow and a prepared implementation; it is not a promise of rankings or a claim that monitoring is already collecting data.

## Implementation references

- [Google pageview measurement](https://developers.google.com/analytics/devguides/collection/ga4/views) — manual pageviews and disabling automatic history measurement to avoid duplicates.
- [Google consent setup](https://developers.google.com/tag-platform/security/guides/consent) — default/update consent sequencing.
