import { createContext, useState, useContext } from "react";
import { encryptStorage } from "../components/utils/storage";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [routePath, setRoutePath] = useState(
    encryptStorage.getItem("routePath")
  );
  const [user, setUser] = useState(encryptStorage.getItem(`${routePath}User`));

  const data = {
    user,
    setUser,
    routePath,
    setRoutePath,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export const useAuth = () => useContext(Context);
