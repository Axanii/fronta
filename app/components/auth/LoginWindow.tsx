"use client";
import style from "@/app/styles/style-for-components/login.module.scss";
// import { blackhole } from "@/app/utils/blackholeStars";
import { useState } from "react";
import useLoginStore from "@/app/store/loginStore";
import Close from "../CloseButton";
import { useActionState } from "react";

import { useRouter } from "next/navigation";
// import { signup } from "@/app/actions/signup";


const LoginWindow: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [pass, setPass] = useState("");
  const [needReg, setNeedReg] = useState(false);
  const [regNickname, setRegNickname] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const token = useLoginStore((state) => state.token);
  const login = useLoginStore((state) => state.login);

  // const [state,action] = useActionState(signup, undefined)

  const router = useRouter();

  const handleNeedRegister = () => {
    console.log("clicked");
    setNeedReg(true);
  };
  const handleRegitration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("nickname", regNickname);
    localStorage.setItem("password", regPassword);
    setNeedReg(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nickname && pass) {
      try {
        login({ username: nickname, password: pass });
        router.push("/");
      } catch (err) {
        alert((err as Error).message);
      }
    }
  };

  return (
    <>
      {!token && (
        <>
          <div className={style.background}></div>
          {needReg ? (
            <div className={style.modal}>
              <Close />
              <h1>Register</h1>
              <form onSubmit={handleRegitration} className={style.loginForm}>
                <div className={style.emailInput}>
                  <label htmlFor="regName">Nickname</label>
                  <input
                    value={regNickname}
                    onChange={(e) => setRegNickname(e.target.value)}
                    type="text"
                    name="regName"
                  />
                </div>
                      {/* {state?.errors?.regName && <p>{state.errors.regName}</p>} */}

                <div className={style.passwordInput}>
                  <label htmlFor="regPassword">Password</label>
                  <input
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    type="password"
                    name="regPassword"
                  />
                </div>
                {/* {state?.errors?.regPassword && <p>{state.errors.regPassword }</p>} */}
                <button className={style.loginButton} type="submit">
                  {" "}
                  {/* mirrored styles for register and login   */}
                  Register
                </button>
              </form>
              <button
                className={style.regButton}
                type="button"
                onClick={() => setNeedReg(false)}
              >
                Back
              </button>
            </div>
          ) : (
            <div className={style.modal}>
              <Close />
              <h1>Login</h1>
              <form onSubmit={handleSubmit} className={style.loginForm}>
                <div className={style.emailInput}>
                  <label htmlFor="name">Nickname</label>
                  <input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    type="text"
                    name="name"
                    required
                  />
                </div>
                <div className={style.passwordInput}>
                  <label htmlFor="password">Password</label>
                  <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    name="password"
                  />
                </div>
                <button className={style.loginButton} type="submit">
                  Log in
                </button>
              </form>
              <button
                className={style.regButton}
                onClick={handleNeedRegister}
                type="button"
              >
                Register
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LoginWindow;
