"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Розкладки схеми на компʼютері, у пікселях макета (1920 px завширшки).
// Порядок карток той самий, що в src/content/home.ts → map.areas:
// маркетинг, продукт і ціни, продажі, клієнтська база, команда і процеси, економіка.
// «tall» повторює макет. «wide» для невисоких вікон (типовий ноутбук): ті самі
// картки у два ряди, щоб схему не доводилось стискати до нечитабельного розміру.
// Компонент сам бере ту розкладку, яка у вікні виходить більшою.
const CARD_WIDTH = 283;
const LAYOUTS = {
  tall: {
    width: 1110,
    height: 790,
    positions: [
      { x: 298, y: 0 },
      { x: 827, y: 89 },
      { x: 0, y: 270 },
      { x: 449, y: 270 },
      { x: 298, y: 551 },
      { x: 747, y: 521 },
    ],
  },
  wide: {
    width: 1220,
    height: 550,
    positions: [
      { x: 120, y: 0 },
      { x: 937, y: 0 },
      { x: 0, y: 290 },
      { x: 528, y: 40 },
      { x: 409, y: 320 },
      { x: 818, y: 280 },
    ],
  },
};
type LayoutName = keyof typeof LAYOUTS;
// Які картки зʼєднані лініями: пари номерів зі списку вище
const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [2, 3],
  [3, 1],
  [1, 5],
  [3, 5],
  [3, 4],
  [2, 4],
  [4, 5],
];

// Сценарій прокрутки: частки шляху від 0 до 1
const SCROLL_LENGTH = 2.2; // скільки екранів прокрутки триває сцена
const CARDS_FROM = 0.05; // коли вилітає перша картка
const CARDS_STEP = 0.07; // затримка між картками
const CARD_FLIGHT = 0.3; // скільки триває політ однієї картки
const LINES_FROM = 0.58; // коли починають малюватись лінії
const LINES_STEP = 0.02;
const LINE_DRAW = 0.14;
const CLOSING_AT = 0.86; // коли зʼявляється підсумкова фраза
const EASE = 7; // плавність: менше число = мʼякше

const DESKTOP = "(min-width: 75rem)";
const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
// Вихід із невеликим перельотом і поверненням: картка «сідає» на місце
const settle = (t: number) => 1 + 2.4 * (t - 1) ** 3 + 1.4 * (t - 1) ** 2;
const smooth = (t: number) => t * t * (3 - 2 * t);

type Props = {
  heading: ReactNode;
  /** Вміст шести карток у порядку зі списку LAYOUTS */
  cards: ReactNode[];
  closing: ReactNode;
};

/**
 * Сцена «карта зростання». На компʼютері секція прилипає до екрана:
 * поки користувач гортає, картки по одній влітають поверх заголовка
 * (той розмивається), між ними промальовуються вигнуті лінії звʼязків,
 * по лініях біжать сигнали, наприкінці зʼявляється підсумкова фраза.
 * Наведення на картку підсвічує її звʼязки (самі картки не тьмяніють).
 * На телефоні й планшеті картки йдуть простим ланцюжком.
 */
export function GrowthMapStage({ heading, cards, closing }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [layoutName, setLayoutName] = useState<LayoutName>("tall");
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const board = boardRef.current;
    const headingBox = headingRef.current;
    const closingBox = closingRef.current;
    if (!section || !board || !headingBox || !closingBox) return;

    const desktop = window.matchMedia(DESKTOP);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = 0;
    let target = 0;
    let raf = 0;
    let last = 0;
    let enabled = false;

    const apply = (p: number) => {
      const veil = smooth(clamp((p - 0.04) / 0.36));
      headingBox.style.filter = veil > 0.01 ? `blur(${(veil * 18).toFixed(2)}px)` : "";
      headingBox.style.opacity = String(1 - veil * 0.8);

      const fall = window.innerHeight * 0.9;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const t = clamp((p - (CARDS_FROM + index * CARDS_STEP)) / CARD_FLIGHT);
        const e = settle(t);
        const side = index % 2 ? 1 : -1;
        const rest = 1 - e;
        card.style.transform =
          `translate3d(${(rest * side * 170).toFixed(1)}px, ${(rest * fall).toFixed(1)}px, 0) ` +
          `rotate(${(rest * side * 16).toFixed(2)}deg) scale(${(0.8 + 0.2 * e).toFixed(3)})`;
        card.style.opacity = String(clamp(t * 5));
      });

      pathRefs.current.forEach((path, index) => {
        if (!path) return;
        const t = smooth(clamp((p - (LINES_FROM + index * LINES_STEP)) / LINE_DRAW));
        path.style.strokeDashoffset = String(1 - t);
      });

      board.toggleAttribute("data-linked", p > LINES_FROM + EDGES.length * LINES_STEP + LINE_DRAW);
      closingBox.toggleAttribute("data-inview", p > CLOSING_AT);
    };

    const tick = (now: number) => {
      const delta = Math.min((now - last) / 1000, 0.1);
      last = now;
      current += (target - current) * (1 - Math.exp(-delta * EASE));
      if (Math.abs(target - current) < 0.0005) current = target;
      apply(current);
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!enabled) return;
      const rect = section.getBoundingClientRect();
      target = clamp(-rect.top / (rect.height - window.innerHeight));
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const measure = () => {
      enabled = desktop.matches && !reduced.matches;
      cancelAnimationFrame(raf);
      raf = 0;

      if (!desktop.matches) {
        // Телефон і планшет: звичайний потік, без сцени
        section.style.height = "";
        board.style.transform = "";
        headingBox.style.filter = "";
        headingBox.style.opacity = "";
        cardRefs.current.forEach((card) => {
          if (card) card.style.transform = card.style.opacity = "";
        });
        section.removeAttribute("data-ready");
        // Підсумкову фразу тут відкриває звичайна поява при прокрутці
        closingBox.setAttribute("data-inview", "");
        return;
      }

      // Схема завжди цілком вміщається у вікно: рахуємо масштаб для обох
      // розкладок і беремо ту, що виходить більшою (за рівності ту, що з макета)
      const fit = (name: LayoutName) =>
        Math.min(
          1,
          (window.innerWidth - 96) / LAYOUTS[name].width,
          (window.innerHeight - 250) / LAYOUTS[name].height,
        );
      const name: LayoutName = fit("wide") > fit("tall") + 0.02 ? "wide" : "tall";
      const layout = LAYOUTS[name];
      setLayoutName(name);
      board.style.transform = `scale(${fit(name).toFixed(4)})`;

      // Вигнуті лінії між центрами карток
      const centers = cardRefs.current.map((card, index) => ({
        x: layout.positions[index].x + CARD_WIDTH / 2,
        y: layout.positions[index].y + (card?.offsetHeight ?? 200) / 2,
      }));
      setPaths(
        EDGES.map(([from, to], index) => {
          const a = centers[from];
          const b = centers[to];
          const bend = (index % 2 ? 1 : -1) * 0.16;
          const cx = (a.x + b.x) / 2 - (b.y - a.y) * bend;
          const cy = (a.y + b.y) / 2 + (b.x - a.x) * bend;
          return `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
        }),
      );

      section.dataset.ready = "true";
      if (enabled) {
        section.style.height = `${(1 + SCROLL_LENGTH) * 100}svh`;
        onScroll();
        cancelAnimationFrame(raf);
        raf = 0;
        current = target;
        apply(current);
      } else {
        // Анімацію вимкнено в системі: одразу готова схема
        section.style.height = "";
        apply(1);
      }
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(board);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const layout = LAYOUTS[layoutName];
  const linked = (edge: [number, number]) => active !== null && edge.includes(active);
  return (
    <section ref={sectionRef} className="growth-map relative bg-page text-ink">
      <div className="flex flex-col gap-10 px-gutter py-section lg:sticky lg:top-0 lg:h-svh lg:items-center lg:justify-center lg:gap-0 lg:overflow-hidden lg:py-0">
        <div
          ref={headingRef}
          className="lg:absolute lg:inset-0 lg:grid lg:place-items-center lg:px-gutter lg:will-change-[filter]"
        >
          {heading}
        </div>

        <div
          ref={boardRef}
          className="growth-map-board group/board relative flex max-w-xl flex-col gap-4 lg:mb-[7svh] lg:block lg:h-(--board-h) lg:w-(--board-w) lg:max-w-none lg:shrink-0"
          style={
            {
              "--board-w": `${layout.width}px`,
              "--board-h": `${layout.height}px`,
            } as React.CSSProperties
          }
        >
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              onPointerEnter={() => setActive(index)}
              onPointerLeave={() => setActive(null)}
              className="growth-map-card relative z-10 max-lg:not-first:before:absolute max-lg:not-first:before:-top-4 max-lg:not-first:before:left-8 max-lg:not-first:before:h-4 max-lg:not-first:before:w-px max-lg:not-first:before:bg-line lg:absolute lg:top-(--y) lg:left-(--x) lg:w-[283px] lg:will-change-transform"
              style={
                {
                  "--x": `${layout.positions[index].x}px`,
                  "--y": `${layout.positions[index].y}px`,
                } as React.CSSProperties
              }
            >
              <div
                className="h-full lg:group-data-[linked]/board:animate-float"
                style={{ animationDelay: `${index * -1.3}s` }}
              >
                {card}
              </div>
            </div>
          ))}

          <svg
            aria-hidden
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            className="pointer-events-none absolute inset-0 hidden size-full overflow-visible lg:block"
            fill="none"
          >
            {paths.map((d, index) => (
              <g key={index}>
                <path
                  ref={(node) => {
                    pathRefs.current[index] = node;
                  }}
                  d={d}
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeDashoffset={1}
                  className={`transition-[stroke,stroke-width,opacity] duration-500 ${
                    linked(EDGES[index])
                      ? "stroke-accent stroke-2"
                      : active === null
                        ? "stroke-ink/35 stroke-[1.5]"
                        : "stroke-ink/35 stroke-[1.5] opacity-30"
                  }`}
                />
                {/* Сигнал: коротка помаранчева риска, що біжить уздовж лінії */}
                <path
                  d={d}
                  pathLength={1}
                  strokeDasharray="0.07 0.93"
                  strokeLinecap="round"
                  className="animate-signal stroke-accent stroke-2 opacity-0 transition-opacity duration-700 group-data-[linked]/board:opacity-100"
                  style={{
                    animationDelay: `${index * -0.37}s`,
                    animationDirection: index % 3 === 0 ? "reverse" : "normal",
                  }}
                />
              </g>
            ))}
          </svg>
        </div>

        <div ref={closingRef} className="reveal lg:absolute lg:inset-x-0 lg:bottom-[5svh] lg:px-gutter">
          {closing}
        </div>
      </div>
    </section>
  );
}
