import style from "@/app/styles/style-for-components/buttons.module.scss";
import { useModal } from "../context/ModalContext";
import CloseIcon from "@/app/assets/svg/close.svg"

const Close: React.FC = () => {
  const { closeModal } = useModal();
  return (
    <button className={style.close} onClick={closeModal}>
      <CloseIcon className={style.closeIcon}/>
    </button>
  );
};

export default Close;
