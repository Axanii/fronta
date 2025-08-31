'use client'
import { useRouter } from "next/navigation";
import style from "@/app/styles/style-for-components/buttons.module.scss"

const ReturnToMain = () => {
    const router = useRouter()
  return (
    <button className={style.backButton}
     onClick={() => router.push("/")}>
      Back to main
    </button>
  );
};

export default ReturnToMain;