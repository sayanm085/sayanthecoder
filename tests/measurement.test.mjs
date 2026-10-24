import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import ts from "typescript";

const source = await fs.readFile(new URL("../lib/measurement.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText;
const { validMeasurementId, analyticsPageLocation, trackEnquiry } = await import(
  "data:text/javascript;base64," + Buffer.from(compiled).toString("base64")
);

test("Measurement IDs must be actual GA4-style identifiers", () => {
  assert.equal(validMeasurementId("G-ABC1234567"), "G-ABC1234567");
  for (const value of [undefined, "", "G-", "UA-123456-1", "G-ABC123&email=private@example.com"]) {
    assert.equal(validMeasurementId(value), null);
  }
});

test("Page measurement excludes query and fragment data", () => {
  assert.equal(analyticsPageLocation("https://www.sayanthecoder.in", "/services?email=private@example.com#message"), "https://www.sayanthecoder.in/services");
  assert.equal(analyticsPageLocation("https://www.sayanthecoder.in", "https://outside.example"), "https://www.sayanthecoder.in/");
});

test("Enquiry tracking requires consent and sends only an allowlisted event payload", () => {
  const original = globalThis.window;
  const sent = [];
  try {
    globalThis.window = { siteAnalyticsAllowed: false, gtag: (...args) => sent.push(args) };
    trackEnquiry("enquiry_draft_prepared", "gmail", "USD");
    assert.equal(sent.length, 0);
    globalThis.window.siteAnalyticsAllowed = true;
    trackEnquiry("enquiry_handoff", "whatsapp", "INR");
    assert.deepEqual(sent, [["event", "enquiry_handoff", { contact_channel: "whatsapp", budget_currency: "INR", transport_type: "beacon" }]]);
  } finally {
    if (original === undefined) delete globalThis.window;
    else globalThis.window = original;
  }
});
