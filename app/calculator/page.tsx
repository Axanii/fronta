import CalcGrid from "./CalculatorGrid";
import style from "./calculator.module.scss"

const CalculatorPage = () => {
  return (
    <div className={style.page}>
      <CalcGrid />
    </div>
  );
};

export default CalculatorPage;
