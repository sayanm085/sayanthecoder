import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import ts from "typescript";
const source = await fs.readFile(
  new URL("../lib/contact.ts", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
  },
});
const {
  gmailComposeUrl,
  whatsappComposeUrl,
  createEnquiryText,
  projectTypeForHint,
} = await import(
  "data:text/javascript;base64," + Buffer.from(outputText).toString("base64")
);

test("Gmail draft preserves recipient, Unicode, line breaks and reserved characters", () => {
  const body =
    "Hi Sayan,\nGrocery & delivery + payments?\nBudget: ₹50,000\nEmail: a+b@example.com";
  const url = new URL(gmailComposeUrl({ subject: "Enquiry from A & B", body }));
  assert.equal(url.origin, "https://mail.google.com");
  assert.equal(url.searchParams.get("to"), "sayan@opslin.com");
  assert.equal(url.searchParams.get("su"), "Enquiry from A & B");
  assert.equal(url.searchParams.get("body"), body);
  assert.equal(url.searchParams.get("view"), "cm");
});
test("WhatsApp chat targets the confirmed international number with complete draft", () => {
  const url = new URL(
    whatsappComposeUrl(
      "+91 90000 00000",
      "Hi Sayan,\nNeed an online shop & billing.",
    ),
  );
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/919000000000");
  assert.equal(
    url.searchParams.get("text"),
    "Hi Sayan,\nNeed an online shop & billing.",
  );
});
test("Missing or malformed WhatsApp numbers never produce a chat link", () => {
  for (const phone of ["", "00000", "not-a-phone", "919000000000?text=bad"]) {
    assert.throws(() => whatsappComposeUrl(phone, "test"));
  }
});
test("Optional email and budget have understandable defaults without undefined data", () => {
  const text = createEnquiryText({
    name: "Sam",
    project: "A local grocery app",
    type: "Grocery & delivery app",
  });
  assert.match(text, /Sam/);
  assert.match(text, /A local grocery app/);
  assert.match(text, /Budget: Let’s discuss/);
  assert.doesNotMatch(text, /undefined|null|Email:/);
});
test("Existing service buttons still preselect the relevant plain-language enquiry type", () => {
  assert.equal(
    projectTypeForHint("Grocery Delivery App Development"),
    "Grocery & delivery app",
  );
  assert.equal(
    projectTypeForHint("Game design & development"),
    "Game design & development",
  );
  assert.equal(
    projectTypeForHint("Cloud & infrastructure"),
    "Hosting & app deployment",
  );
  assert.equal(
    projectTypeForHint("AI & intelligent automation"),
    "Business automation & AI",
  );
});

test("Shared enquiry form keeps Gmail email required and WhatsApp email optional", async () => {
  const { createRequire } = await import("node:module");
  const path = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const react = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const require = createRequire(import.meta.url);
  const root = fileURLToPath(new URL("../", import.meta.url));
  const cache = new Map();
  async function load(file) {
    if (cache.has(file)) return cache.get(file);
    const source = await fs.readFile(file, "utf8");
    const compiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX,
      },
    }).outputText;
    const locals = {};
    for (const match of compiled.matchAll(/require\("([^\"]+)"\)/g)) {
      const spec = match[1];
      if (!spec.startsWith(".") && !spec.startsWith("@/")) continue;
      const base = spec.startsWith("@/")
        ? path.join(root, spec.slice(2))
        : path.resolve(path.dirname(file), spec);
      let resolved;
      for (const ext of [".tsx", ".ts"]) {
        try {
          await fs.access(base + ext);
          resolved = base + ext;
          break;
        } catch {}
      }
      if (!resolved) throw new Error("Cannot resolve " + spec);
      locals[spec] = await load(resolved);
    }
    const compiledModule = { exports: {} };
    new Function("module", "exports", "require", compiled)(
      compiledModule,
      compiledModule.exports,
      (spec) => locals[spec] ?? require(spec),
    );
    cache.set(file, compiledModule.exports);
    return compiledModule.exports;
  }
  const { ContactForm } = await load(
    path.join(root, "components/contact-form.tsx"),
  );
  for (const channel of ["gmail", "whatsapp"]) {
    const markup = renderToStaticMarkup(
      react.createElement(ContactForm, { channel, onClose() {} }),
    );
    const email = markup.match(/<input[^>]*name="email"[^>]*>/)[0];
    assert.equal(email.includes('required=""'), channel === "gmail");
    assert.equal((markup.match(/type="radio"/g) || []).length, 14);
    assert.match(markup, /Grocery &amp; delivery app/);
    assert.match(
      markup,
      channel === "gmail" ? /Create Gmail draft/ : /Continue to WhatsApp/,
    );
  }
});
