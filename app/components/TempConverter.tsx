"use client";
import styles from "@/app/styles/style-for-components/tempconverter.module.scss";
import { useState, useRef, useEffect } from "react";

const TempConverter = () => {
  const [input, setInput] = useState<number>(0);
  const [resVal, setResVal] = useState<number>();
  const fromRef = useRef<HTMLSelectElement>(null);
  const toRef = useRef<HTMLSelectElement>(null);

  // lookup table. less verbose in terms of readability + extendable.
  const conversions: Record<string, (temp: number) => number> = {
    "Celsius-Farenheit": (t) => (t * 9) / 5 + 32,
    "Farenheit-Celsius": (t) => ((t - 32) * 5) / 9,
    "Kelvin-Celsius": (t) => t - 273.15,
    "Celsius-Kelvin": (t) => t + 273.15,
    "Kelvin-Farenheit": (t) => ((t - 273.15) * 9) / 5 + 32,
    "Farenheit-Kelvin": (t) => ((t - 32) * 5) / 9 + 273.15,
  };

  function convertFunc(temp: number, from: string, to: string) {
    const key = `${from}-${to}`;
    const fn = conversions[key];
    if (from === to) return temp;
    if (!fn) return new Error("Wrong conversion");
    const res = fn(temp);
    setResVal(res);
    return resVal;
  }

  return (
    <section className={styles.tempConverterContainer}>
      <h1>Temperature Converter</h1>
      <div className={styles.tempOptions}>
        <input
          id="tempInput"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(Number(e.target.value))
          }
          value={input}
          type="number"
          className={styles.tempText}
        />
        <select ref={fromRef} name="FromTemp" id="FromTemp">
          <option value="Celsius">Celsius</option>
          <option value="Farenheit">Farenheit</option>
          <option value="Kelvin">Kelvin</option>
        </select>
        <select ref={toRef} name="ToTemp" id="ToTemp">
          <option value="Celsius">Celsius</option>
          <option value="Farenheit">Farenheit</option>
          <option value="Kelvin">Kelvin</option>
        </select>
        <button
          onClick={() => {
            const from = fromRef.current?.value ?? "";
            const to = toRef.current?.value ?? "";
            convertFunc(input, from, to);
          }}
          type="button"
          name="convert"
        >
          Convert
        </button>
      </div>
      <span>{resVal}</span>
    </section>
  );
};

export default TempConverter;
