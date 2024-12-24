import { createContext, useState, useContext } from "react";
import { encryptStorage } from "../components/utils/storage";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(encryptStorage.getItem(`user`));

  const data = {
    user,
    setUser,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useAuth = () => useContext(Context);
