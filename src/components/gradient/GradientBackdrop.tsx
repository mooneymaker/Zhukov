import { gradientPoster } from "./gradient-poster";
import { LiveGradient } from "./LiveGradient";

/**
 * Живий помаранчевий фон секції. Кладеться першим у секцію з класами
 * relative isolate overflow-hidden. Одразу видно нерухому картинку
 * з макета, поверх неї проявляється рухомий градієнт.
 */
export function GradientBackdrop() {
  return (
    <div
      className="absolute inset-0 -z-10 bg-[length:100%_100%]"
      style={{ backgroundImage: `url(${gradientPoster})` }}
    >
      <LiveGradient className="block h-full w-full" />
    </div>
  );
}
