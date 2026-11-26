// NationScope — the hand-in program for the national statistics site.
// Node 22, standard library only. It takes app/ and screenshots/ from
// beside this file, copies them into /output, and writes
// /output/dossier.json using the make.fun library in
// vendor/makefun-frontend.ts (the kit's copy, unchanged). The scorer
// needs dossier.json to be exactly what that library writes, so this
// program never edits the dossier — it only writes the library's output.
//
// To check locally without the grader:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const root = fileURLToPath(new URL(".", import.meta.url));
const output = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const site = join(root, "app");
const shots = join(root, "screenshots");

if (!existsSync(join(site, "index.html"))) {
  throw new Error("app/index.html is missing — the site is not built");
}
const shotFiles = existsSync(shots)
  ? readdirSync(shots).filter((name) => statSync(join(shots, name)).isFile())
  : [];
if (shotFiles.length !== 4) {
  throw new Error(`expected exactly 4 screenshots, found ${shotFiles.length}`);
}

mkdirSync(output, { recursive: true });
cpSync(site, join(output, "app"), { recursive: true });
cpSync(shots, join(output, "screenshots"), { recursive: true });

// The same caps the scorer enforces: app/ at most 993 files and 16 MiB,
// 4 screenshots at most 256 KiB each, dossier text at most 160 KiB.
writeFileSync(
  join(output, "dossier.json"),
  buildDossier(output, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

// Read the dossier back and say what was handed in, so a bad build
// shows up here instead of at the gate.
function walk(dir) {
  let files = 0;
  let bytes = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = walk(path);
      files += sub.files;
      bytes += sub.bytes;
    } else if (entry.isFile()) {
      files += 1;
      bytes += statSync(path).size;
    }
  }
  return { files, bytes };
}
const appCount = walk(join(output, "app"));
const dossierBytes = statSync(join(output, "dossier.json")).size;
if (dossierBytes === 0) throw new Error("dossier.json came out empty");
console.log(
  `Handed in: ${appCount.files} app files (${appCount.bytes} bytes), ${shotFiles.length} screenshots, dossier ${dossierBytes} bytes.`,
);
