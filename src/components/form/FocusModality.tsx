"use client";

import { useEffect } from "react";

/**
 * Стежить, чим користується людина: клавіатурою чи мишею. Після Tab ставить
 * на <html> позначку data-keyboard, після кліку знімає. За нею CSS вирішує,
 * чи показувати рамку фокуса (див. globals.css).
 */
export function FocusModality() {
  useEffect(() => {
    const root = document.documentElement;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Tab") root.setAttribute("data-keyboard", "");
    };
    const onPointer = () => root.removeAttribute("data-keyboard");
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerdown", onPointer, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("pointerdown", onPointer, true);
    };
  }, []);

  return null;
}
