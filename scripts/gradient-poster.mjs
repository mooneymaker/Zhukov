// Малює нерухомий кадр градієнта hero у крихітний PNG і вбудовує його в код.
// Цю картинку браузер показує одразу, ще до запуску анімації.
//
//   node scripts/gradient-poster.mjs
//
// Запускати після зміни кольорів у src/components/sections/hero/mesh.ts.

import { writeFileSync } from "node:fs";
import { encodePng } from "./png.mjs";
import { sampleMesh } from "../src/components/sections/hero/mesh.ts";

const WIDTH = 32;
const HEIGHT = 18;

const rgb = new Uint8Array(WIDTH * HEIGHT * 3);
for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    const [r, g, b] = sampleMesh(x / (WIDTH - 1), y / (HEIGHT - 1));
    const i = (y * WIDTH + x) * 3;
    rgb[i] = r;
    rgb[i + 1] = g;
    rgb[i + 2] = b;
  }
}

const base64 = encodePng(WIDTH, HEIGHT, rgb).toString("base64");
const target = new URL("../src/components/sections/hero/gradient-poster.ts", import.meta.url);

writeFileSync(
  target,
  `// Згенеровано scripts/gradient-poster.mjs, руками не правити.\n` +
    `export const gradientPoster =\n  "data:image/png;base64,${base64}";\n`,
);
console.log(`gradient-poster.ts: ${WIDTH}×${HEIGHT}, ${base64.length} символів`);
