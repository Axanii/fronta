'use client'

import style from "@/app/styles/style-for-components/buttons.module.scss";

import CloseIcon from "@/app/assets/svg/close.svg"
import { useRouter } from "next/navigation";

const Close: React.FC = () => {

  const router = useRouter();
  return (
    <button className={style.close} onClick={()=> router.push('/')}>
      <CloseIcon className={style.closeIcon}/>
    </button>
  );
};

export default Close;
