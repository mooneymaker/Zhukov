// Спільні дрібниці для WebGL-ефектів: збірка шейдерів, цикл кадрів, курсор.

export function createProgram(
  gl: WebGL2RenderingContext,
  vertexSource: string,
  fragmentSource: string,
): WebGLProgram {
  const program = gl.createProgram();
  for (const [type, source] of [
    [gl.VERTEX_SHADER, vertexSource],
    [gl.FRAGMENT_SHADER, fragmentSource],
  ] as const) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) ?? "Шейдер не зібрався");
    }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "Програма не зібралась");
  }
  return program;
}

/**
 * Викликає frame на кожен кадр, але тільки поки елемент на екрані
 * і вкладка активна. Повертає функцію зупинки.
 */
export function startLoop(
  element: Element,
  frame: (seconds: number, delta: number) => void,
): () => void {
  let raf = 0;
  let last = 0;
  let clock = 0;
  let inView = false;

  const tick = (now: number) => {
    const delta = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;
    clock += delta;
    frame(clock, delta);
    raf = requestAnimationFrame(tick);
  };

  const update = () => {
    const shouldRun = inView && !document.hidden;
    if (shouldRun && !raf) {
      last = 0;
      raf = requestAnimationFrame(tick);
    } else if (!shouldRun && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    update();
  });
  observer.observe(element);
  document.addEventListener("visibilitychange", update);

  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", update);
    cancelAnimationFrame(raf);
    raf = 0;
  };
}

export type Pointer = {
  /** Координати курсора у вікні */
  x: number;
  y: number;
  /** true, поки курсор над зоною */
  active: boolean;
};

/** Стежить за курсором миші над зоною. Дотики ігнорує. */
export function trackPointer(zone: Element): { pointer: Pointer; stop: () => void } {
  const pointer: Pointer = { x: 0, y: 0, active: false };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const rect = zone.getBoundingClientRect();
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
  };
  const onLeave = () => {
    pointer.active = false;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);

  return {
    pointer,
    stop: () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    },
  };
}

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
