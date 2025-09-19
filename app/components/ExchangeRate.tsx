"use client";
import { useState, useEffect, useMemo } from "react";
import styles from "@/app/styles/style-for-components/currencyConv.module.scss";
import debounce from "lodash/debounce";
import { getTargetTriple } from "next/dist/build/swc/generated-native";
import { calcLength } from "framer-motion";

const ExchangeRateConverter = () => {
  const [rates, setRates] = useState<Record<string, number>>({}); //rates for currencies
  const [currencies, setCurrencies] = useState<string[]>([]); //currencies for seect
  const [base, setBase] = useState<string>(""); //from
  const [target, setTarget] = useState<string>(""); //to
  const [amount, setAmount] = useState<string>(""); //input from
  const [convertedAmount, setConvertedAmount] = useState<string>(""); //input to
  const [lastEdited, setLastEdited] = useState<"base" | "target">("base"); //two way exchange

  const debouncedConvert = useMemo(
    () =>
      debounce(
        async (
          amt: string,
          from: string,
          to: string,
          edited: "base" | "target",
        ) => {
          if (!amt || !from || !to) return;

          try {
            const res = await fetch(
              `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`,
            );
            const data = await res.json();

            if (edited === "base") {
              const calc = (Number(amt) * data.rates[to]).toFixed(2);
              setConvertedAmount(calc);
            } else {
              const calcReverse = (
                Number(convertedAmount) / data.rates[base]
              ).toFixed(2);
              setAmount(calcReverse);
            }
          } catch (err) {
            console.error("Conversion failed:", err);
          }
        },
        500,
      ),
    [],
  );

  useEffect(() => {
    if (!base || !target) return;
    if (lastEdited === "base" && amount) {
      debouncedConvert(amount, base, target, "base");
    } else if (lastEdited === "target" && convertedAmount) {
      debouncedConvert(convertedAmount, target, base, "target");
    }
  }, [amount, convertedAmount, base, target, lastEdited, debouncedConvert]);

  // 🔹 Cleanup: cancel debounce on unmount
  useEffect(() => {
    return () => {
      debouncedConvert.cancel();
    };
  }, [debouncedConvert]);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const res = await fetch("https://api.frankfurter.dev/v1/currencies");
        const cur = await res.json();
        const bases = Object.keys(cur);
        setCurrencies(bases);
        setBase("USD"); // default
        setTarget("EUR"); // default
      } catch (err) {
        console.error("Failed to fetch currencies:", err);
      }
    }
    fetchCurrencies();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Currency Converter</h1>
      <div className={styles.converter}>
        <div>
          <input
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setLastEdited("base");
            }}
          />
          <select
            value={base}
            onChange={(e) => setBase(e.target.value)}
            name="base_currency"
          >
            {currencies &&
              currencies.map((code) => <option key={code}>{code}</option>)}
          </select>
        </div>
        <div>
          <input
            value={convertedAmount}
            onChange={(e) => {
              setConvertedAmount(e.target.value);
              setLastEdited("target");
            }}
          />
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            name="target_currency"
          >
            {currencies &&
              currencies.map((code) => <option key={code}>{code}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateConverter;
