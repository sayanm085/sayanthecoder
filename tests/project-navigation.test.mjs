import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const root = fileURLToPath(new URL("../", import.meta.url));
const modules = new Map();
function load(relative) {
  const filename = path.join(root, relative);
  if (modules.has(filename)) return modules.get(filename);
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const compiledModule = { exports: {} };
  new Function("module", "exports", "require", outputText)(
    compiledModule,
    compiledModule.exports,
    (spec) => {
      assert.ok(
        spec.startsWith("@/"),
        "Only repository data modules are expected",
      );
      return load(spec.slice(2) + ".ts");
    },
  );
  modules.set(filename, compiledModule.exports);
  return compiledModule.exports;
}
const { servicesForProject, relatedProjects } = load(
  "lib/project-navigation.ts",
);
test("Project evidence links back to the specific service it demonstrates", () => {
  assert.ok(
    servicesForProject("freshcart").some(
      (s) => s.slug === "grocery-delivery-app-development",
    ),
  );
  assert.ok(
    servicesForProject("lndry-pos").some(
      (s) => s.slug === "laundry-app-pos-development",
    ),
  );
  assert.ok(
    servicesForProject("rustbloom").some(
      (s) => s.slug === "game-development-unity-godot",
    ),
  );
  assert.deepEqual(servicesForProject("unknown"), []);
});
test("Related work follows topic and companion relationships instead of array order", () => {
  assert.equal(relatedProjects("rustbloom")[0].id, "agnix-studio");
  assert.ok(relatedProjects("rustbloom").some((p) => p.id === "antar"));
  assert.ok(
    !relatedProjects("rustbloom").some((p) =>
      ["freshcart", "dealker", "bakaloo"].includes(p.id),
    ),
  );
  assert.ok(relatedProjects("opslin").some((p) => p.id === "shotvault"));
  assert.ok(!relatedProjects("freshcart").some((p) => p.id === "freshcart"));
  assert.deepEqual(relatedProjects("unknown"), []);
});
