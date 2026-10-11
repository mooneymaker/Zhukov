"use client";

import { useId, useState } from "react";

type Props = {
  items: { question: string; answer: string }[];
};

/**
 * Питання й відповіді. Одночасно відкрита одна відповідь, перша відкрита
 * одразу. Висота відповіді плавно розкривається на CSS.
 */
export function Accordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question} className="animate-rise border-t border-ink py-8" style={{ animationDelay: `${index * 90}ms` }}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full cursor-pointer items-center gap-6 rounded-sm text-left md:gap-10"
              >
                <span className="flex-1 text-h5 leading-none font-medium tracking-[-0.05em]">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={`relative grid size-12 shrink-0 place-items-center rounded-pill transition-[background-color,color,scale] duration-500 ease-out-expo group-hover:scale-110 ${
                    isOpen ? "bg-ink text-page" : "bg-plate text-ink"
                  }`}
                >
                  <span className="absolute h-0.5 w-4 bg-current" />
                  <span
                    className={`absolute h-4 w-0.5 bg-current transition-[rotate,scale] duration-500 ease-out-expo ${
                      isOpen ? "scale-y-0 rotate-90" : ""
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-${index}`}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pt-6 text-md font-normal lg:max-w-[55rem]">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
