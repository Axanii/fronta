import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LoginState {
  username: string | null;
  token: string | null;
  login: (payload: { username: string; password: string }) => void;
  logout: () => void;
}

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      username: null as string | null,
      token: null as string | null,
      login: ({ username, password }) => {
        const checkUsername = localStorage.getItem("nickname");
        const checkPassword = localStorage.getItem("password");
        if (checkPassword === password && checkUsername === username) {
          const token = `${Date.now()}_${username}`;
          set({ username, token });
        } else {
          throw Error("Wrong credentials, lad. Try again.");
        }
      },
      logout: () => set({ username: null, token: null }),
    }),
    {
      name: "user-storage", // key
      storage: createJSONStorage(() => sessionStorage), // optional, default is localStorage
      partialize: (state: LoginState) => ({
        token: state.token,
        username: state.username,
      }), //Enables you to pick some of the state's fields to be stored in the storage.
    },
  ),
);

export default useLoginStore;
