"use client";

import { evaluate } from "mathjs";
import { useState, useRef, useEffect, useCallback } from "react";
import style from "./calculator.module.scss";

// interface CalcGridProps {
//   addition: () => void;
//   subtraction: () => void;
//   division: () => void;
//   multiplication: () => void;
// }

const CalcGrid: React.FC = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const val = e.target.value;
    if (/^\d*$/.test(val)) setValue(val);
  };

  const handleButtonClick = useCallback((num: string) => {
    setValue((prev) => (prev === "" ? num : prev + num));
  }, []);

  const calculate = useCallback(() => {
    try {
      const res = evaluate(value).toString();
      setValue(res);
      return res;
    } catch (err) {
      console.error("Invalid expression:", err);
      return value;
    }
  }, [value]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const clearVal = useCallback(() => setValue(""), []);

  useEffect(() => {
    const isEditable = (el: Element | null) =>
      !!el && (el.tagName === "INPUT" || (el as HTMLElement).isContentEditable);

    const onKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;

      // If user is typing inside an editable element, let that element handle it
      if (isEditable(active)) return;

      // Prevent the browser going back on Backspace when not focused in an input
      if (e.key === "Backspace")
        setValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));

      // Evaluate on Enter or NumpadEnter
      if (e.key === "Enter" || e.key === "NumpadEnter") calculate();

      // Allow numbers/operators even when input isn't focused
      if (/^[0-9+\-*/.]$/.test(e.key))
        setValue((prev) => (prev === "0" ? e.key : prev + e.key));

      // Optional: support decimal comma globally
      if (e.key === ",") setValue((prev) => (prev === "0" ? "." : prev + "."));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setValue, calculate]);

  return (
    <div className={style.container}>
      <input
        ref={inputRef}
        value={value}
        autoFocus
        type="text"
        pattern="[0-9]*"
        inputMode="numeric"
        className={style.screen}
        onChange={handleChange}
      />

      <section className={style.grid}>
        <section className={style.basicFuncs}>
          <button onClick={clearVal} className={style.ac}>
            {"AC"}
          </button>
          <button
            onClick={() => handleButtonClick("-")}
            className={style.plusminus}
          >
            +/-
          </button>
          <button
            onClick={() => handleButtonClick("%")}
            className={style.percent}
          >
            %
          </button>
          <button
            onClick={() => handleButtonClick("/")}
            className={style.division}
          >
            /
          </button>
        </section>
        <section className={style.upperRow}>
          <button onClick={() => handleButtonClick("7")}>7</button>
          <button onClick={() => handleButtonClick("8")}>8</button>
          <button onClick={() => handleButtonClick("9")}>9</button>
          <button onClick={() => handleButtonClick("*")}>*</button>
        </section>
        <section className={style.middleRow}>
          <button onClick={() => handleButtonClick("4")}>4</button>
          <button onClick={() => handleButtonClick("5")}>5</button>
          <button onClick={() => handleButtonClick("6")}>6</button>
          <button onClick={() => handleButtonClick("-")}>-</button>
        </section>
        <section className={style.lowerRow}>
          <button onClick={() => handleButtonClick("1")}>1</button>
          <button onClick={() => handleButtonClick("2")}>2</button>
          <button onClick={() => handleButtonClick("3")}>3</button>
          <button onClick={() => handleButtonClick("+")}>+</button>
        </section>
        <section className={style.lastRow}>
          <button>F(n)</button>
          <button onClick={() => handleButtonClick("0")}>0</button>
          <button onClick={() => handleButtonClick(",")}>,</button>
          <button onClick={calculate}>=</button>
        </section>
      </section>
    </div>
  );
};

export default CalcGrid;
