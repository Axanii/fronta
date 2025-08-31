"use client";
import style from "@/app/styles/style-for-components/landingAuth.module.scss";
import useLoginStore from "@/app/store/loginStore";
import { useState, useEffect } from "react";
import LoginWindow from "./LoginWindow";
import { ModalProvider } from "@/app/context/ModalContext";

const LandingAuth = () => {
  const { logout, token } = useLoginStore((state) => state);
  const [showModal, setShowModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

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
            onClick={() => setShowModal(true)}
          >
            Log In / Sign Up
          </button>
        </>
      )}
      {showModal && (
        <div className={style.modalOverlay}>
          <ModalProvider closeModal={handleCloseModal}>
            <LoginWindow />
          </ModalProvider>
        </div>
      )}
    </>
  );
};

export default LandingAuth;
