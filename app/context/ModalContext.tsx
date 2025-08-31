import { useContext, createContext } from "react";

interface ModalContextType {
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) throw new Error("Add Modal provider before usage");

  return context;
};

export const ModalProvider: React.FC<{
  children: React.ReactNode;
  closeModal: () => void;
}> = ({ children, closeModal }) => {
  return (
    <ModalContext.Provider value={{ closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
