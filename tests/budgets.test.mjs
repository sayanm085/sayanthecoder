import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import ts from "typescript";

const source = await fs.readFile(new URL("../lib/budgets.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
});
const { currencyForCountry, enquiryBudget, budgetBands, isBudgetCurrency } = await import(
  "data:text/javascript;base64," + Buffer.from(outputText).toString("base64")
);

test("Visitor endpoint uses country headers and prevents shared geo caching", async () => {
  const budgetsUrl = "data:text/javascript;base64," + Buffer.from(outputText).toString("base64");
  const routeSource = (await fs.readFile(new URL("../app/api/visitor-currency/route.ts", import.meta.url), "utf8"))
    .replace('"@/lib/budgets"', JSON.stringify(budgetsUrl));
  const route = ts.transpileModule(routeSource, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const { GET } = await import("data:text/javascript;base64," + Buffer.from(route).toString("base64"));
  for (const [country, currency] of [["IN", "INR"], ["US", "USD"], ["", "USD"]]) {
    const response = GET(new Request("https://example.test/api/visitor-currency", {
      headers: country ? { "x-vercel-ip-country": country } : {},
    }));
    assert.deepEqual(await response.json(), { currency });
    assert.match(response.headers.get("cache-control"), /private, no-store/);
  }
});

test("India uses INR; international and unavailable geolocation use USD", () => {
  assert.equal(currencyForCountry("IN"), "INR");
  assert.equal(currencyForCountry("in"), "INR");
  for (const country of ["US", "GB", "AE", "AU", "CA", null, "", "unknown"]) {
    assert.equal(currencyForCountry(country), "USD");
  }
});

test("USD budgets use independent approved bands and drafts identify the currency", () => {
  assert.deepEqual(budgetBands.USD, ["Under $1,000", "$1,000 – $3,000", "$3,000 – $10,000", "$10,000+"]);
  assert.equal(enquiryBudget("USD", "$3,000 – $10,000"), "$3,000 – $10,000 (USD)");
  assert.equal(enquiryBudget("INR", "Under ₹50,000"), "Under ₹50,000 (INR)");
  assert.equal(enquiryBudget("USD", "Under ₹50,000"), "Let’s discuss");
  assert.equal(enquiryBudget("USD", "Let’s discuss"), "Let’s discuss");
  assert.equal(isBudgetCurrency("EUR"), false);
});
