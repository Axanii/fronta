"use client";
import style from "@/app/styles/style-for-components/login.module.scss";
// import { blackhole } from "@/app/utils/blackholeStars";
import { useState } from "react";
import useLoginStore from "@/app/store/loginStore";

const LoginWindow: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [pass, setPass] = useState("");
  const [needReg, setNeedReg] = useState(false);
  const [regNickname, setRegNickname] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const token = useLoginStore((state) => state.token);
  const login = useLoginStore((state) => state.login);

  const handleNeedRegister = () => {
    setNeedReg(true);
  };
  const handleRegitration = () => {
    localStorage.setItem("nickname", regNickname);
    localStorage.setItem("password", regPassword);
    setNeedReg(false);
  };

  const handleSubmit = () => {
    if (nickname && pass) {
      try {
        login({ username: nickname, password: pass });
      } catch (err) {
        alert((err as Error).message);
      }
    }
  };

  // useEffect(() => {
  //     blackhole(`.${style.stars}`)
  // }
  // ,[])
  return (
    <>
      {!token && (
        <>
          <div className={style.background}>
            {/* <div className={style.stars}></div> */}
          </div>
          {needReg ? (
            <div className={style.modal}>
              <h1>Register</h1>
              <form className={style.loginForm}>
                <div className={style.emailInput}>
                  <label htmlFor="regName">Nickname</label>
                  <input
                    value={regNickname}
                    onChange={(e) => setRegNickname(e.target.value)}
                    type="text"
                    name="regName"
                  />
                </div>
                <div className={style.passwordInput}>
                  <label htmlFor="regPassword">Password</label>
                  <input
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    type="password"
                    name="regPassword"
                  />
                </div>
              </form>
              <div className={style.buttonContainer}>
                <button type="button" onClick={() => setNeedReg(false)}>
                  Back
                </button>
                <button onClick={() => handleRegitration()} type="button">
                  Register
                </button>
              </div>
            </div>
          ) : (
            <div className={style.modal}>
              <h1>Login</h1>
              <form className={style.loginForm}>
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
                    type="text"
                    name="password"
                  />
                </div>
              </form>
              <div className={style.buttonContainer}>
                <button onClick={handleNeedRegister}>Register</button>
                <button onClick={() => handleSubmit()}>
                  Log in
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LoginWindow;
