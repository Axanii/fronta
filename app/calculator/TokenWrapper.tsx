"use client";
import useLoginStore from "../store/loginStore";
import ReturnToMain from "../components/ReturnToMain";
import CalcGrid from "./CalculatorGrid";
import style from "./calculator.module.scss";
import LoginWindow from "../components/auth/LoginWindow";

const TokenWrapperCalculator = () => {
  const token = useLoginStore((state) => state.token);



  return token ? (
    
    <div className={style.wrapper}>
      <ReturnToMain />
      <div className={style.page}>
        <h1>Basic Calculator</h1>
        <CalcGrid />
      </div>
    </div>
  ) : (
    <LoginWindow />
  );
};
export default TokenWrapperCalculator;
