import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import ts from "typescript";
const source = await fs.readFile(
  new URL("../lib/site.ts", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
});
const { canonicalSiteOrigin } = await import(
  "data:text/javascript;base64," + Buffer.from(outputText).toString("base64")
);
test("Production aliases always match the observed www HTTPS redirect destination", () => {
  for (const value of [
    undefined,
    "https://sayanthecoder.in",
    "http://sayanthecoder.in/",
    "https://www.sayanthecoder.in/",
  ]) {
    assert.equal(canonicalSiteOrigin(value), "https://www.sayanthecoder.in");
  }
});
test("An intentional alternate deployment origin remains configurable without paths", () => {
  assert.equal(
    canonicalSiteOrigin("https://preview.example.com/test/"),
    "https://preview.example.com",
  );
});
