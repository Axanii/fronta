import style from "@/app/styles/style-for-components/buttons.module.scss"
import useLoginStore from "../store/loginStore";

// type LogOut = {
//     handleLougout: () => void;
// }


const LogOut: React.FC = () => {
     const logout = useLoginStore((state) => state.logout);

 
    return (
        <button
        onClick={logout}
        className={style.logout}>
            LogOut
        </button>
    )
}


export default LogOut