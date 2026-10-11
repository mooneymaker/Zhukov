// Будує карту нормалей для портрета з карти глибини.
//
//   node scripts/normal-map.mjs <фото.png> <глибина.png> <результат.png>
//
// Фото: вирізаний портрет із прозорим фоном. Глибина: сірий PNG того самого
// кадру (ближче = світліше), бажано 16-бітний. Результат: PNG, де червоний
// і зелений канали це нахил поверхні по X і Y, синій це висота.
// Шейдер портрета (RelitPortrait) читає саме цей файл.

import { readPng, writePng } from "./png.mjs";

const [photoPath, depthPath, outPath] = process.argv.slice(2);
if (!photoPath || !depthPath || !outPath) {
  console.error("node scripts/normal-map.mjs <фото.png> <глибина.png> <результат.png>");
  process.exit(1);
}

const OUT_WIDTH = 736; // ширина результату, деталей дрібніших карта глибини не має
const ERODE = 10; // на скільки пікселів відступити від краю силуету
const SMOOTH = 3; // радіус згладжування висоти
const RELIEF = 110; // множник нахилу перед записом у 8 біт

const photo = readPng(photoPath);
const depth = readPng(depthPath);
if (photo.channels !== 4) throw new Error("Фото має бути PNG з прозорістю");

const width = OUT_WIDTH;
const height = Math.round((photo.height / photo.width) * width);
const size = width * height;

// Зменшення усередненням: бере один канал зображення й повертає width × height
function resample(image, channel) {
  const out = new Float32Array(size);
  const sx = image.width / width;
  const sy = image.height / height;
  for (let y = 0; y < height; y++) {
    const y0 = Math.floor(y * sy);
    const y1 = Math.max(y0 + 1, Math.floor((y + 1) * sy));
    for (let x = 0; x < width; x++) {
      const x0 = Math.floor(x * sx);
      const x1 = Math.max(x0 + 1, Math.floor((x + 1) * sx));
      let sum = 0;
      for (let yy = y0; yy < y1; yy++) {
        for (let xx = x0; xx < x1; xx++) {
          sum += image.data[(yy * image.width + xx) * image.channels + channel];
        }
      }
      out[y * width + x] = sum / ((y1 - y0) * (x1 - x0));
    }
  }
  return out;
}

// Розмиття прямокутним вікном, окремо по рядках і стовпцях
function boxBlur(src, radius) {
  const tmp = new Float32Array(size);
  const out = new Float32Array(size);
  const win = radius * 2 + 1;
  for (let y = 0; y < height; y++) {
    let sum = 0;
    for (let x = -radius; x <= radius; x++) {
      sum += src[y * width + Math.min(width - 1, Math.max(0, x))];
    }
    for (let x = 0; x < width; x++) {
      tmp[y * width + x] = sum / win;
      const add = Math.min(width - 1, x + radius + 1);
      const drop = Math.max(0, x - radius);
      sum += src[y * width + add] - src[y * width + drop];
    }
  }
  for (let x = 0; x < width; x++) {
    let sum = 0;
    for (let y = -radius; y <= radius; y++) {
      sum += tmp[Math.min(height - 1, Math.max(0, y)) * width + x];
    }
    for (let y = 0; y < height; y++) {
      out[y * width + x] = sum / win;
      const add = Math.min(height - 1, y + radius + 1);
      const drop = Math.max(0, y - radius);
      sum += tmp[add * width + x] - tmp[drop * width + x];
    }
  }
  return out;
}

const alpha = resample(photo, 3);
const rawDepth = resample(depth, 0);

// Біля краю силуету глибина «перетікає» у фон, тому беремо тільки серцевину
const core = boxBlur(alpha, ERODE);
const inside = new Uint8Array(size);
const values = [];
for (let i = 0; i < size; i++) {
  if (core[i] > 0.995) {
    inside[i] = 1;
    values.push(rawDepth[i]);
  }
}
if (values.length < size * 0.02) throw new Error("Силует замалий або фото без прозорості");

// Розтягуємо глибину фігури на весь діапазон, відкинувши по 1% викидів
values.sort((a, b) => a - b);
const lo = values[Math.floor(values.length * 0.01)];
const hi = values[Math.floor(values.length * 0.99)];
const heightMap = new Float32Array(size);
const weight = new Float32Array(size);
for (let i = 0; i < size; i++) {
  if (inside[i]) {
    heightMap[i] = Math.min(1, Math.max(0, (rawDepth[i] - lo) / (hi - lo)));
    weight[i] = 1;
  }
}

// За межами серцевини продовжуємо найближчі значення, щоб на краях не було сходинки
for (const radius of [3, 6, 12, 24, 48, 96, 192]) {
  const blurredValue = boxBlur(heightMap, radius);
  const blurredWeight = boxBlur(weight, radius);
  let left = 0;
  for (let i = 0; i < size; i++) {
    if (weight[i] === 0) {
      if (blurredWeight[i] > 0.02) {
        heightMap[i] = blurredValue[i] / blurredWeight[i];
        weight[i] = -1; // заповнено на цьому кроці
      } else {
        left++;
      }
    }
  }
  for (let i = 0; i < size; i++) if (weight[i] === -1) weight[i] = 1;
  if (left === 0) break;
}

let smooth = heightMap;
for (let pass = 0; pass < 3; pass++) smooth = boxBlur(smooth, SMOOTH);

// Нахил поверхні (оператор Собеля) і запис у 8 біт на канал
const rgb = new Uint8Array(size * 3);
const at = (x, y) =>
  smooth[Math.min(height - 1, Math.max(0, y)) * width + Math.min(width - 1, Math.max(0, x))];
let clipped = 0;
let figure = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const dx =
      (at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1) -
        at(x - 1, y - 1) - 2 * at(x - 1, y) - at(x - 1, y + 1)) / 8;
    const dy =
      (at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1) -
        at(x - 1, y - 1) - 2 * at(x, y - 1) - at(x + 1, y - 1)) / 8;
    const nx = -dx * RELIEF;
    const ny = -dy * RELIEF;
    if (alpha[y * width + x] > 0.5) {
      figure++;
      if (Math.abs(nx) > 1 || Math.abs(ny) > 1) clipped++;
    }
    const i = (y * width + x) * 3;
    rgb[i] = Math.round((Math.min(1, Math.max(-1, nx)) * 0.5 + 0.5) * 255);
    rgb[i + 1] = Math.round((Math.min(1, Math.max(-1, ny)) * 0.5 + 0.5) * 255);
    rgb[i + 2] = Math.round(smooth[y * width + x] * 255);
  }
}

writePng(outPath, width, height, rgb);
console.log(
  `${outPath}: ${width}×${height}, глибина фігури ${lo.toFixed(4)}…${hi.toFixed(4)}, ` +
    `обрізано нахилів у фігурі ${((clipped / figure) * 100).toFixed(2)}%`,
);
