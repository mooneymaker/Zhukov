"use client";

import { useState } from "react";
import { formatPhone, localDigits, PHONE_PREFIX, phoneValue } from "@/lib/phone";

// Маска разом із пробілом після неї
const MASK_LENGTH = PHONE_PREFIX.length + 1;

type Props = {
  label: string;
  className: string;
  invalid?: boolean;
};

/**
 * Поле телефону з уже надрукованим кодом +380. Людина вводить лише номер;
 * якщо вона набере чи вставить його разом із кодом (або браузер підставить
 * збережений номер), код не продублюється. У форму йде повний номер
 * у вигляді +380XXXXXXXXX, а якщо номер не вводили, то порожнє значення.
 */
export function PhoneField({ label, className, invalid }: Props) {
  const [local, setLocal] = useState("");

  return (
    <>
      <input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        aria-label={label}
        aria-invalid={invalid}
        value={formatPhone(local)}
        onChange={(event) => setLocal(localDigits(event.target.value))}
        // Курсор не заходить у код країни: якщо клікнути в маску,
        // він стає одразу після неї
        onSelect={(event) => {
          const input = event.currentTarget;
          const start = input.selectionStart ?? 0;
          const end = input.selectionEnd ?? 0;
          // Виділення всього поля (Cmd+A) не чіпаємо, щоб номер можна було стерти
          if (start < MASK_LENGTH && !(start === 0 && end === input.value.length)) {
            input.setSelectionRange(MASK_LENGTH, Math.max(end, MASK_LENGTH));
          }
        }}
        className={`${className} ${local ? "" : "text-page/70"}`}
      />
      <input type="hidden" name="phone" value={phoneValue(local)} />
    </>
  );
}
