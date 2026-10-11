// Мінімальне читання й запис PNG без сторонніх пакетів.
// Читає 8- і 16-бітні файли (сірі, RGB, з альфою), пише 8-бітний RGB.

import { deflateSync, inflateSync } from "node:zlib";
import { readFileSync, writeFileSync } from "node:fs";

const SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const CHANNELS = { 0: 1, 2: 3, 4: 2, 6: 4 };

/** Повертає { width, height, channels, data: Float32Array зі значеннями 0..1 } */
export function readPng(path) {
  const file = readFileSync(path);
  if (!file.subarray(0, 8).equals(SIGNATURE)) throw new Error(`${path}: не PNG`);

  let width = 0;
  let height = 0;
  let depth = 0;
  let colorType = 0;
  const idat = [];

  for (let offset = 8; offset < file.length; ) {
    const length = file.readUInt32BE(offset);
    const type = file.toString("latin1", offset + 4, offset + 8);
    const body = file.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = body.readUInt32BE(0);
      height = body.readUInt32BE(4);
      depth = body[8];
      colorType = body[9];
      if (body[12] !== 0) throw new Error(`${path}: interlaced PNG не підтримується`);
    } else if (type === "IDAT") {
      idat.push(body);
    }
    offset += 12 + length;
  }

  const channels = CHANNELS[colorType];
  if (!channels || (depth !== 8 && depth !== 16)) {
    throw new Error(`${path}: непідтримуваний формат (тип ${colorType}, ${depth} біт)`);
  }

  const bytesPerSample = depth / 8;
  const bpp = channels * bytesPerSample;
  const stride = width * bpp;
  const raw = inflateSync(Buffer.concat(idat));
  const pixels = Buffer.alloc(stride * height);

  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = y * (stride + 1) + 1;
    const out = y * stride;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? pixels[out + x - bpp] : 0;
      const b = y > 0 ? pixels[out + x - stride] : 0;
      const c = x >= bpp && y > 0 ? pixels[out + x - stride - bpp] : 0;
      let predicted = 0;
      if (filter === 1) predicted = a;
      else if (filter === 2) predicted = b;
      else if (filter === 3) predicted = (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        predicted = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      pixels[out + x] = (raw[line + x] + predicted) & 255;
    }
  }

  const data = new Float32Array(width * height * channels);
  const max = depth === 16 ? 65535 : 255;
  for (let i = 0; i < data.length; i++) {
    data[i] =
      (depth === 16 ? pixels.readUInt16BE(i * 2) : pixels[i]) / max;
  }

  return { width, height, channels, data };
}

function crc32(buffer) {
  let crc = ~0;
  for (let i = 0; i < buffer.length; i++) {
    crc ^= buffer[i];
    for (let k = 0; k < 8; k++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return ~crc >>> 0;
}

function chunk(type, body) {
  const head = Buffer.alloc(8);
  head.writeUInt32BE(body.length, 0);
  head.write(type, 4, "latin1");
  const tail = Buffer.alloc(4);
  tail.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), body])), 0);
  return Buffer.concat([head, body, tail]);
}

/** rgb: Uint8Array довжиною width * height * 3 */
export function encodePng(width, height, rgb) {
  const stride = width * 3;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    Buffer.from(rgb.buffer, rgb.byteOffset + y * stride, stride).copy(
      raw,
      y * (stride + 1) + 1,
    );
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 2;
  return Buffer.concat([
    SIGNATURE,
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

export function writePng(path, width, height, rgb) {
  writeFileSync(path, encodePng(width, height, rgb));
}
