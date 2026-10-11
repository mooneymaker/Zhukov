"use client";

import { useEffect, useRef } from "react";
import { createProgram, prefersReducedMotion, startLoop, trackPointer } from "@/lib/webgl";

// Палітра фону від найглибшого тону до найсвітлішого. Кольори з макета.
const RAMP = ["#c94a2b", "#ee6a3a", "#f98a4d", "#fcab69", "#fdc283", "#fed092"];
const CORNER = "#7a3c25"; // затемнення правого нижнього кута, як у макеті

// Налаштування руху.
const SPEED = 1; // загальна швидкість течії
const SCALE = 1; // розмір плям: менше число = більші плями
const WARP = 0.6; // наскільки плями деформуються, перетікаючи
const CONTRAST = 0.58; // різниця між світлими й темними плямами
const CURSOR_SHIFT = 0.9; // наскільки курсор зсуває шар плям
const CURSOR_GLOW = 0.2; // наскільки фон світлішає під курсором
const CURSOR_RADIUS = 0.42; // радіус світлої плями під курсором
const CURSOR_EASE = 1.7; // інерція курсора: менше число = плавніше й повільніше
const RESOLUTION = 0.5; // фон мʼякий, тож малюємо в половину розміру

const VERTEX = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 uResolution;
uniform vec2 uCursor;
uniform float uPresence;
uniform float uTime;
uniform vec3 uRamp[6];
uniform vec3 uCorner;

const float SCALE = ${SCALE.toFixed(3)};
const float WARP = ${WARP.toFixed(3)};
const float CONTRAST = ${CONTRAST.toFixed(3)};
const float CURSOR_SHIFT = ${CURSOR_SHIFT.toFixed(3)};
const float CURSOR_GLOW = ${CURSOR_GLOW.toFixed(3)};
const float CURSOR_RADIUS = ${CURSOR_RADIUS.toFixed(3)};

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// Плавний градієнтний шум, приблизно від -0.7 до 0.7
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(
    mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

vec3 ramp(float value) {
  float x = clamp(value, 0.0, 1.0) * 5.0;
  int i = int(min(floor(x), 4.0));
  return mix(uRamp[i], uRamp[i + 1], smoothstep(0.0, 1.0, x - float(i)));
}

vec3 toSrgb(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  uv.y = 1.0 - uv.y;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  // Поле плям: розтягнуте вшир, повільно дрейфує і саме себе деформує
  vec2 q = p * vec2(0.62, 1.05) * SCALE;
  q += vec2(sin(uTime * 0.11), cos(uTime * 0.09)) * 0.22;
  vec2 warp = vec2(
    noise(q * 0.8 + vec2(0.0, uTime * 0.07)),
    noise(q * 0.8 + vec2(4.7, -uTime * 0.06))
  );
  q += warp * WARP;

  // Два шари: другий зсувається разом із курсором, а його вага залежить
  // від положення курсора по горизонталі, тому рух миші перебудовує плями
  float still = noise(q + vec2(7.3, 2.1) + uTime * 0.02);
  float moved = noise(q * 1.15 + uCursor * CURSOR_SHIFT + vec2(1.7, 9.2));
  float balance = mix(0.35, 0.65, uCursor.x);
  float field = (still * (1.0 - balance) + moved * balance) * 1.9;

  // Композиція з макета: світло за портретом, глибші краї
  vec2 fromCenter = (uv - vec2(0.5, 0.36)) * vec2(0.8, 1.0);
  float center = exp(-dot(fromCenter, fromCenter) / 0.16);

  // Лампа під курсором
  vec2 toCursor = p - vec2(uCursor.x * aspect, uCursor.y);
  float lamp = exp(-dot(toCursor, toCursor) / (CURSOR_RADIUS * CURSOR_RADIUS)) * uPresence;

  float value = 0.4 + 0.36 * center + CONTRAST * field + CURSOR_GLOW * lamp;
  vec3 color = ramp(value);

  float corner = smoothstep(0.85, 0.0, distance(uv, vec2(1.0, 1.0))) * (0.55 - 0.25 * field);
  color = mix(color, uCorner, clamp(corner, 0.0, 1.0) * (1.0 - 0.6 * lamp));

  // Ледь помітний шум прибирає сходинки на плавних переходах
  float grain = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  outColor = vec4(toSrgb(color) + (grain - 0.5) / 255.0, 1.0);
}`;

function linear(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  const convert = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return [convert(((n >> 16) & 255) / 255), convert(((n >> 8) & 255) / 255), convert((n & 255) / 255)];
}

/**
 * Живий фон hero: великі мʼякі плями кольору, які течуть і перебудовуються,
 * коли рухається курсор. Курсор діє з інерцією, тому рух виходить плавним.
 * Без WebGL або з вимкненою анімацією в системі лишається нерухома картинка,
 * яку малює батьківський блок.
 */
export function LiveGradient({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;

    let cleanup = () => {};
    // Фон запускається, лише коли секція наближається до екрана:
    // так сторінка не витрачає сили на те, чого ще не видно
    const starter = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        starter.disconnect();
        cleanup = start(canvas);
      },
      { rootMargin: "50% 0px" },
    );
    starter.observe(canvas);

    return () => {
      starter.disconnect();
      cleanup();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ opacity: 0, transition: "opacity 1.4s ease" }}
    />
  );
}

function start(canvas: HTMLCanvasElement): () => void {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    powerPreference: "low-power",
  });
  if (!gl) return () => {};

  let program: WebGLProgram;
  try {
    program = createProgram(gl, VERTEX, FRAGMENT);
  } catch {
    return () => {};
  }
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  gl.uniform3fv(gl.getUniformLocation(program, "uRamp"), RAMP.flatMap(linear));
  gl.uniform3fv(gl.getUniformLocation(program, "uCorner"), linear(CORNER));
  const uResolution = gl.getUniformLocation(program, "uResolution");
  const uCursor = gl.getUniformLocation(program, "uCursor");
  const uPresence = gl.getUniformLocation(program, "uPresence");
  const uTime = gl.getUniformLocation(program, "uTime");

  const resize = () => {
    const width = Math.max(2, Math.round(canvas.clientWidth * RESOLUTION));
    const height = Math.max(2, Math.round(canvas.clientHeight * RESOLUTION));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  const { pointer, stop: stopPointer } = trackPointer(canvas);
  const cursor = { x: 0.5, y: 0.4, presence: 0 };
  let shown = false;

  const stopLoop = startLoop(canvas, (time, delta) => {
    const rect = canvas.getBoundingClientRect();
    const ease = 1 - Math.exp(-delta * CURSOR_EASE);
    if (pointer.active) {
      cursor.x += ((pointer.x - rect.left) / rect.width - cursor.x) * ease;
      cursor.y += ((pointer.y - rect.top) / rect.height - cursor.y) * ease;
    }
    cursor.presence += ((pointer.active ? 1 : 0) - cursor.presence) * ease;

    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform2f(uCursor, cursor.x, cursor.y);
    gl.uniform1f(uPresence, cursor.presence);
    gl.uniform1f(uTime, time * SPEED);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (!shown) {
      shown = true;
      canvas.style.opacity = "1";
    }
  });

  return () => {
    stopLoop();
    stopPointer();
    resizeObserver.disconnect();
  };
}
