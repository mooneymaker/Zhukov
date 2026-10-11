"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { createProgram, prefersReducedMotion, startLoop, trackPointer } from "@/lib/webgl";

// Налаштування світла від курсора.
const STRENGTH = 1.6; // загальна сила ефекту, у ступенях експозиції
const RELIEF = 2.1; // наскільки виразний рельєф (нахил поверхонь)
const LIGHT_HEIGHT = 0.42; // висота «лампи» над фото, у частках його висоти
const POOL = 0.5; // додаткове освітлення плямою навколо курсора
const POOL_RADIUS = 0.38; // радіус цієї плями
const WARMTH = 0.3; // наскільки освітлені місця теплішають
const FOLLOW_EASE = 7; // як швидко світло наздоганяє курсор
const FADE_EASE = 2.2; // як швидко ефект зʼявляється і згасає
const MAX_PIXEL_RATIO = 2;

const VERTEX = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = vec2(aPosition.x * 0.5 + 0.5, 0.5 - aPosition.y * 0.5);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uPhoto;
uniform sampler2D uNormal;
uniform vec2 uLight;
uniform float uAspect;
uniform float uAmount;

const float STRENGTH = ${STRENGTH.toFixed(3)};
const float RELIEF = ${RELIEF.toFixed(3)};
const float LIGHT_HEIGHT = ${LIGHT_HEIGHT.toFixed(3)};
const float POOL = ${POOL.toFixed(3)};
const float POOL_RADIUS = ${POOL_RADIUS.toFixed(3)};
const float WARMTH = ${WARMTH.toFixed(3)};

void main() {
  vec4 photo = texture(uPhoto, vUv);
  vec3 map = texture(uNormal, vUv).rgb;

  // Нахил поверхні з карти нормалей (червоний і зелений канали)
  vec3 normal = normalize(vec3((map.rg * 2.0 - 1.0) * RELIEF, 1.0));

  // Вектор від точки фото до лампи під курсором
  vec3 toLight = vec3((uLight - vUv) * vec2(uAspect, 1.0), LIGHT_HEIGHT);
  float distance2 = dot(toLight.xy, toLight.xy);
  vec3 light = normalize(toLight);

  // Рельєф: наскільки ця ділянка повернута до лампи порівняно з пласкою
  float relief = dot(normal, light) - light.z;
  // Пляма світла: ближче до курсора світліше, далеко трохи темніше
  float pool = exp(-distance2 / (POOL_RADIUS * POOL_RADIUS)) - 0.35;

  float stops = uAmount * STRENGTH * (relief + pool * POOL);
  // Текстура з уже помноженою прозорістю: рахуємо світло на чистому кольорі
  vec3 color = photo.rgb / max(photo.a, 0.0001) * exp2(stops);
  color *= mix(vec3(1.0), vec3(1.0, 0.86, 0.7), clamp(stops, 0.0, 1.0) * WARMTH);
  // Мʼяке плече замість різкого пересвіту
  color = mix(color, 1.0 - exp(-color), smoothstep(0.6, 1.4, color));

  outColor = vec4(clamp(color, 0.0, 1.0) * photo.a, photo.a);
}`;

type Props = {
  src: StaticImageData;
  /** Адреса карти нормалей, зібраної scripts/normal-map.mjs */
  normalSrc: string;
  alt: string;
  sizes: string;
  className?: string;
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

/**
 * Портрет, на якому світло рухається за курсором.
 * Звичайне <img> вантажиться одразу й лишається запасним варіантом:
 * на телефонах, без WebGL і з вимкненою анімацією видно саме його.
 */
export function RelitPortrait({ src, normalSrc, alt, sizes, className }: Props) {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    if (!image || !canvas || prefersReducedMotion()) return;
    // Ефект тільки для миші: на дотикових екранах курсора немає
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let cancelled = false;
    let cleanup = () => {};

    const start = async () => {
      if (!image.complete) await new Promise((r) => image.addEventListener("load", r, { once: true }));
      await image.decode().catch(() => {});
      const normalMap = await loadImage(normalSrc);
      if (cancelled) return;

      const gl = canvas.getContext("webgl2", { alpha: true, antialias: false, premultipliedAlpha: true });
      if (!gl) return;
      const program = createProgram(gl, VERTEX, FRAGMENT);
      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const aPosition = gl.getAttribLocation(program, "aPosition");
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

      const upload = (unit: number, source: HTMLImageElement, premultiply: boolean, mipmaps: boolean) => {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiply);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        if (mipmaps) {
          gl.generateMipmap(gl.TEXTURE_2D);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        } else {
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
      };
      upload(0, image, true, true);
      upload(1, normalMap, false, false);
      gl.uniform1i(gl.getUniformLocation(program, "uPhoto"), 0);
      gl.uniform1i(gl.getUniformLocation(program, "uNormal"), 1);
      const uLight = gl.getUniformLocation(program, "uLight");
      const uAspect = gl.getUniformLocation(program, "uAspect");
      const uAmount = gl.getUniformLocation(program, "uAmount");

      const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
        const width = Math.max(2, Math.round(canvas.clientWidth * ratio));
        const height = Math.max(2, Math.round(canvas.clientHeight * ratio));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
          dirty = true;
        }
      };

      const zone = canvas.closest("[data-pointer-zone]") ?? canvas;
      const { pointer, stop: stopPointer } = trackPointer(zone);
      const light = { x: 0.5, y: 0.3, amount: 0 };
      let dirty = true;
      let shown = false;

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      resize();

      const stopLoop = startLoop(canvas, (_time, delta) => {
        const rect = canvas.getBoundingClientRect();
        const follow = 1 - Math.exp(-delta * FOLLOW_EASE);
        const fade = 1 - Math.exp(-delta * FADE_EASE);

        if (pointer.active) {
          const targetX = (pointer.x - rect.left) / rect.width;
          const targetY = (pointer.y - rect.top) / rect.height;
          // Перша поява курсора: лампа одразу там, де він є, без прольоту через фото
          if (light.amount < 0.01) {
            light.x = targetX;
            light.y = targetY;
          }
          light.x += (targetX - light.x) * follow;
          light.y += (targetY - light.y) * follow;
        }
        const targetAmount = pointer.active ? 1 : 0;
        const moving =
          Math.abs(targetAmount - light.amount) > 0.001 || (pointer.active && follow > 0);
        light.amount += (targetAmount - light.amount) * fade;
        if (!moving && !dirty) return;
        dirty = false;

        gl.uniform2f(uLight, light.x, light.y);
        gl.uniform1f(uAspect, rect.width / rect.height);
        gl.uniform1f(uAmount, light.amount);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        if (!shown) {
          // Перший кадр збігається з оригіналом, тож підміна непомітна
          shown = true;
          canvas.style.opacity = "1";
          image.style.opacity = "0";
        }
      });

      cleanup = () => {
        stopLoop();
        stopPointer();
        resizeObserver.disconnect();
        canvas.style.opacity = "0";
        image.style.opacity = "1";
      };
    };

    start().catch(() => {});

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [normalSrc]);

  return (
    <div className={className}>
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        sizes={sizes}
        preload
        className="block h-full w-full"
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
