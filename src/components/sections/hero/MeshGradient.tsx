"use client";

import { useEffect, useRef } from "react";
import { createProgram, prefersReducedMotion, startLoop, trackPointer } from "@/lib/webgl";
import { MESH_STOPS, meshLinearColors } from "./mesh";

// Налаштування руху. Усі відстані в частках ширини й висоти фону (0..1).
const DRIFT = 0.055; // наскільки точки плавають самі
const DRIFT_SPEED = 1; // множник швидкості плавання
const CURSOR_PULL = 0.13; // наскільки сильно точки тягнуться до курсора
const CURSOR_RADIUS = 0.34; // на якій відстані курсор ще діє
const CURSOR_EASE = 3; // плавність реакції, більше = швидше
const RESOLUTION = 0.5; // градієнт мʼякий, тож малюємо в половину розміру
const SEGMENTS = 28; // щільність сітки

const VERTEX = `#version 300 es
in vec2 aUv;
uniform vec2 uPoints[16];
uniform vec3 uColors[16];
out vec3 vColor;

vec2 catmull(vec2 a, vec2 b, vec2 c, vec2 d, float t) {
  float t2 = t * t;
  float t3 = t2 * t;
  return 0.5 * ((2.0 * b) + (-a + c) * t + (2.0 * a - 5.0 * b + 4.0 * c - d) * t2 + (-a + 3.0 * b - 3.0 * c + d) * t3);
}

vec3 catmull(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
  float t2 = t * t;
  float t3 = t2 * t;
  return 0.5 * ((2.0 * b) + (-a + c) * t + (2.0 * a - 5.0 * b + 4.0 * c - d) * t2 + (-a + 3.0 * b - 3.0 * c + d) * t3);
}

void main() {
  vec2 scaled = clamp(aUv, 0.0, 1.0) * 3.0;
  vec2 cell = min(floor(scaled), 2.0);
  vec2 t = scaled - cell;
  int ix = int(cell.x);
  int iy = int(cell.y);
  int xs[4] = int[4](max(ix - 1, 0), ix, ix + 1, min(ix + 2, 3));
  int ys[4] = int[4](max(iy - 1, 0), iy, iy + 1, min(iy + 2, 3));

  vec2 rowPoint[4];
  vec3 rowColor[4];
  for (int r = 0; r < 4; r++) {
    int o = ys[r] * 4;
    rowPoint[r] = catmull(uPoints[o + xs[0]], uPoints[o + xs[1]], uPoints[o + xs[2]], uPoints[o + xs[3]], t.x);
    rowColor[r] = catmull(uColors[o + xs[0]], uColors[o + xs[1]], uColors[o + xs[2]], uColors[o + xs[3]], t.x);
  }
  vec2 position = catmull(rowPoint[0], rowPoint[1], rowPoint[2], rowPoint[3], t.y);
  vColor = clamp(catmull(rowColor[0], rowColor[1], rowColor[2], rowColor[3], t.y), 0.0, 1.0);
  gl_Position = vec4(position.x * 2.0 - 1.0, 1.0 - position.y * 2.0, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
in vec3 vColor;
out vec4 outColor;

vec3 toSrgb(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  // Ледь помітний шум прибирає сходинки на плавних переходах
  float noise = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
  outColor = vec4(toSrgb(vColor) + (noise - 0.5) / 255.0, 1.0);
}`;

/**
 * Фон hero: сітчастий градієнт, який повільно плаває і тягнеться за курсором.
 * Без WebGL або з вимкненою анімацією в системі лишається нерухома картинка,
 * яку малює батьківський блок.
 */
export function MeshGradient({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    let program: WebGLProgram;
    try {
      program = createProgram(gl, VERTEX, FRAGMENT);
    } catch {
      return;
    }
    gl.useProgram(program);

    // Рівна сітка вершин, яку шейдер згинає за 16 опорними точками
    const side = SEGMENTS + 1;
    const vertices = new Float32Array(side * side * 2);
    for (let row = 0, i = 0; row < side; row++) {
      for (let col = 0; col < side; col++) {
        vertices[i++] = col / SEGMENTS;
        vertices[i++] = row / SEGMENTS;
      }
    }
    const indices = new Uint16Array(SEGMENTS * SEGMENTS * 6);
    for (let row = 0, i = 0; row < SEGMENTS; row++) {
      for (let col = 0; col < SEGMENTS; col++) {
        const a = row * side + col;
        indices.set([a, a + side, a + 1, a + 1, a + side, a + side + 1], i);
        i += 6;
      }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const aUv = gl.getAttribLocation(program, "aUv");
    gl.enableVertexAttribArray(aUv);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.uniform3fv(gl.getUniformLocation(program, "uColors"), meshLinearColors());
    const uPoints = gl.getUniformLocation(program, "uPoints");
    const points = new Float32Array(32);

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
    const cursor = { x: 0.5, y: 0.5, presence: 0 };
    let shown = false;

    const stopLoop = startLoop(canvas, (time, delta) => {
      const rect = canvas.getBoundingClientRect();
      const ease = 1 - Math.exp(-delta * CURSOR_EASE);
      if (pointer.active) {
        cursor.x += ((pointer.x - rect.left) / rect.width - cursor.x) * ease;
        cursor.y += ((pointer.y - rect.top) / rect.height - cursor.y) * ease;
      }
      cursor.presence += ((pointer.active ? 1 : 0) - cursor.presence) * ease;

      // Перші секунди рух наростає з нуля, щоб не було стрибка від статичної картинки
      const ramp = Math.min(time / 2.5, 1);
      const start = ramp * ramp * (3 - 2 * ramp);
      const aspect = rect.width / rect.height;
      const t = time * DRIFT_SPEED;

      for (let row = 0, k = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++, k++) {
          const baseX = MESH_STOPS[col];
          const baseY = MESH_STOPS[row];
          // Точки на краях ковзають лише вздовж краю, кути стоять на місці
          const freeX = col === 0 || col === 3 ? 0 : 1;
          const freeY = row === 0 || row === 3 ? 0 : 1;

          let x = freeX * DRIFT * Math.sin(t * (0.27 + 0.031 * k) + k * 1.7);
          let y = freeY * DRIFT * Math.cos(t * (0.23 + 0.027 * ((k * 7) % 16)) + k * 2.3);

          const dx = cursor.x - baseX;
          const dy = cursor.y - baseY;
          const distance2 = dx * dx * aspect * aspect + dy * dy;
          const pull =
            CURSOR_PULL *
            cursor.presence *
            Math.exp(-distance2 / (CURSOR_RADIUS * CURSOR_RADIUS));
          x += freeX * dx * pull * 2.2;
          y += freeY * dy * pull * 2.2;

          points[k * 2] = baseX + x * start;
          points[k * 2 + 1] = baseY + y * start;
        }
      }

      gl.uniform2fv(uPoints, points);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ opacity: 0, transition: "opacity 0.6s ease" }}
    />
  );
}
