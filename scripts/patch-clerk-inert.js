/**
 * @clerk/ui still passes inert="" for React 18 compatibility, which React 19
 * warns about. Rewrite those values to boolean true in the installed bundle.
 */
const fs = require("node:fs");
const path = require("node:path");

const clerkDist = path.join(__dirname, "..", "node_modules", "@clerk", "ui", "dist");

const replacements = [
  ['inert: !open ? "" : void 0', "inert: !open ? true : void 0"],
  ["...!isOpen && { inert: \"\" }", "...!isOpen && { inert: true }"],
  ["{inert:\"\"}", "{inert:true}"],
  [
    'inert: planPeriod !== "annual" ? "true" : void 0',
    'inert: planPeriod !== "annual" ? true : void 0',
  ],
];

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;

  for (const [from, to] of replacements) {
    if (!content.includes(from)) continue;
    content = content.split(from).join(to);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
  }

  return changed;
}

function walk(dir) {
  let patched = 0;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      patched += walk(fullPath);
      continue;
    }
    if (!entry.name.endsWith(".js")) continue;
    if (patchFile(fullPath)) patched += 1;
  }

  return patched;
}

if (!fs.existsSync(clerkDist)) {
  process.exit(0);
}

const patchedFiles = walk(clerkDist);
if (patchedFiles > 0) {
  console.log(`[patch-clerk-inert] Updated ${patchedFiles} @clerk/ui file(s).`);
}
