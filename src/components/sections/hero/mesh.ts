// Сітчастий градієнт фону hero. Перенесено з шейдера Mesh gradient у Figma:
// сітка 4×4 кольорових точок, між ними кубічна інтерполяція Catmull-Rom
// у лінійному кольоровому просторі.
//
// Точки йдуть рядками згори донизу, у рядку зліва направо.
// Щоб змінити кольори фону, правте лише цей список, а потім запустіть
//   node scripts/gradient-poster.mjs
// (оновить статичну картинку, яку видно до старту анімації).

export const MESH_COLORS: readonly string[] = [
  "#fec887", "#ee9559", "#f97a43", "#f16c3f",
  "#dd8d55", "#fcb573", "#fdca89", "#fc8d55",
  "#f16238", "#fca764", "#fc985a", "#d65330",
  "#ce4f2e", "#e4916c", "#fe874d", "#804027",
];

// Положення вузлів сітки по кожній осі, як у макеті
export const MESH_STOPS: readonly number[] = [0, 0.33, 0.67, 1];

function srgbToLinear(value: number): number {
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(value: number): number {
  const v = Math.max(0, value);
  return v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055;
}

/** Кольори точок у лінійному просторі: 16 трійок підряд */
export function meshLinearColors(): Float32Array {
  const out = new Float32Array(MESH_COLORS.length * 3);
  MESH_COLORS.forEach((hex, i) => {
    const n = parseInt(hex.slice(1), 16);
    out[i * 3] = srgbToLinear(((n >> 16) & 255) / 255);
    out[i * 3 + 1] = srgbToLinear(((n >> 8) & 255) / 255);
    out[i * 3 + 2] = srgbToLinear((n & 255) / 255);
  });
  return out;
}

function catmull(a: number, b: number, c: number, d: number, t: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    0.5 *
    (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3)
  );
}

/** Колір нерухомого градієнта в точці (u, v), 0..1. Повертає sRGB 0..255 */
export function sampleMesh(u: number, v: number): [number, number, number] {
  const colors = meshLinearColors();
  const sx = Math.min(Math.max(u, 0), 1) * 3;
  const sy = Math.min(Math.max(v, 0), 1) * 3;
  const ix = Math.min(Math.floor(sx), 2);
  const iy = Math.min(Math.floor(sy), 2);
  const tx = sx - ix;
  const ty = sy - iy;
  const xs = [Math.max(ix - 1, 0), ix, ix + 1, Math.min(ix + 2, 3)];
  const ys = [Math.max(iy - 1, 0), iy, iy + 1, Math.min(iy + 2, 3)];

  const out: [number, number, number] = [0, 0, 0];
  for (let channel = 0; channel < 3; channel++) {
    const rows = ys.map((row) => {
      const [a, b, c, d] = xs.map((col) => colors[(row * 4 + col) * 3 + channel]);
      return catmull(a, b, c, d, tx);
    });
    const linear = catmull(rows[0], rows[1], rows[2], rows[3], ty);
    out[channel] = Math.round(Math.min(1, Math.max(0, linearToSrgb(linear))) * 255);
  }
  return out;
}
