"use client";
import styles from "@/app/styles/style-for-components/tempconverter.module.scss";
import { to } from "mathjs";
import { useState, useRef, useEffect } from "react";

const TempConverter = () => {
  const [input, setInput] = useState<string>("");
  const [resVal, setResVal] = useState<number>();
  const [fromUnit, setFromUnit] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("");

  let inputToNum = parseInt(input);

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
    const res = parseFloat(fn(temp).toFixed(3))
    setResVal(res);
    return resVal;
  }

  return (
    <section className={styles.tempConverterContainer}>
      <h1>Temperature Converter</h1>
      <div className={styles.tempOptions}>
        <input
        placeholder="0"
          id="tempInput"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          value={input}
          type="number"
          className={styles.tempText}
        />
        <div className={styles.fromContainer}>
          <span>From:</span>
          <select
            onChange={(e) => setFromUnit(e.target.value)}
            name="FromTemp"
            id="FromTemp"
          >
            <option></option>
            <option value="Celsius">Celsius</option>
            <option value="Farenheit">Farenheit</option>
            <option value="Kelvin">Kelvin</option>
          </select>
        </div>
        <div className={styles.toContainer}>
            <span>To:</span>
          <select
            onChange={(e) => setToUnit(e.target.value)}
            name="ToTemp"
            id="ToTemp"
          >
            <option></option>
            <option value="Celsius">Celsius</option>
            <option value="Farenheit">Farenheit</option>
            <option value="Kelvin">Kelvin</option>
          </select>
        </div>

        <button
          onClick={() => {
            convertFunc(inputToNum, fromUnit, toUnit);
          }}
          disabled={!fromUnit || !toUnit}
          type="button"
          name="convert"
          className={styles.button}
        >
          Convert
        </button>
      </div>
      <span className={styles.result}>
          {resVal && `Converted ${fromUnit} to ${toUnit}: ${resVal}`}

      </span>
    </section>
  );
};

export default TempConverter;
