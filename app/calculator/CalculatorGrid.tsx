"use client";

import { evaluate } from "mathjs";
import { useState, useRef, useEffect, useCallback } from "react";
import style from "./calculator.module.scss";
import { Button } from "./CalcButton";

// interface CalcGridProps {
//   addition: () => void;
//   subtraction: () => void;
//   division: () => void;
//   multiplication: () => void;
// }

const CalcGrid: React.FC = () => {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState("");
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
      const safeNum = value.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
      /* 
	(\d+(\.\d+)?) → matches a number:
	\d+ → one or more digits (e.g., 50)
	(\.\d+)? → optional decimal part (e.g., .25 in 50.25)
	Outer parentheses (...) → capture the entire number, so you can reference it in replacement as $1.
	% → matches a literal percent sign.
      */
      const res = evaluate(safeNum).toString();
      setHistory(value);
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

  const clearVal = useCallback(() => {
    setValue("");
    setHistory("");
  }, []);

  useEffect(() => {
    const isEditable = (el: Element | null) =>
      !!el && (el.tagName === "INPUT" || (el as HTMLElement).isContentEditable);

    const onKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement;

      // If user is typing inside an editable element, let that element handle it
      if (isEditable(active)) return;

      // Prevent the browser going back on backspace when not focused in an input
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
      <input value={history} readOnly className={style.history} />
      <input
        ref={inputRef}
        value={value}
        readOnly
        autoFocus
        type="text"
        pattern="[0-9]*"
        inputMode="numeric"
        className={style.screen}
        onChange={handleChange}
      />

      <section className={style.grid}>
        <section className={style.basicFuncs}>
          <Button label={"AC"} onClick={clearVal} className={style.ac} />

          <Button
            label="+/-"
            onClick={() => handleButtonClick("-")}
            className={style.plusminus}
          />
          <Button
            label="%"
            onClick={() => handleButtonClick("%")}
            className={style.percent}
          />
          <Button
            label="÷"
            onClick={() => handleButtonClick("/")}
            className={`${style.division} ${style.calcs}`}
          />
        </section>
        <section className={style.upperRow}>
          <Button label="7" onClick={() => handleButtonClick("7")} />
          <Button label="8" onClick={() => handleButtonClick("8")} />
          <Button label="9" onClick={() => handleButtonClick("9")} />
          <Button
            className={style.calcs}
            label="X"
            onClick={() => handleButtonClick("*")}
          />
        </section>
        <section className={style.middleRow}>
          <Button label="4" onClick={() => handleButtonClick("4")} />
          <Button label="5" onClick={() => handleButtonClick("5")} />
          <Button label="6" onClick={() => handleButtonClick("6")} />
          <Button
            className={style.calcs}
            label="-"
            onClick={() => handleButtonClick("-")}
          />
        </section>
        <section className={style.lowerRow}>
          <Button label="1" onClick={() => handleButtonClick("1")} />
          <Button label="2" onClick={() => handleButtonClick("2")} />
          <Button label="3" onClick={() => handleButtonClick("3")} />
          <Button
            className={style.calcs}
            label="+"
            onClick={() => handleButtonClick("+")}
          />
        </section>
        <section className={style.lastRow}>
          <Button
            label="0"
            className={style.zero}
            onClick={() => handleButtonClick("0")}
          />
          <Button label="." onClick={() => handleButtonClick(".")} />
          <Button className={style.calcs} label="=" onClick={calculate} />
        </section>
      </section>
    </div>
  );
};

export default CalcGrid;
