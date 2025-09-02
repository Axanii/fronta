"use client";
import style from "@/app/styles/style-for-components/landingAuth.module.scss";
import useLoginStore from "@/app/store/loginStore";
import { useRouter } from "next/navigation";


const LandingAuth = () => {
  const { logout, token } = useLoginStore((state) => state);

  const router = useRouter()

  return (
    <>
      {token ? (
        <button className={style.landingLogout} onClick={logout}>
          Log Out
        </button>
      ) : (
        <>
          <button
            className={style.landingLogin}
            onClick={() => router.push('/auth')}
          >
            Log In / Sign Up
          </button>
        </>
      )}
    </>
  );
};

export default LandingAuth;
