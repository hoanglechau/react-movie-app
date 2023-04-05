import { createContext, useContext, useState } from "react";

const AuthContextType = {
  user: "",
  signin: null,
  signout: null
};
const AuthContext = createContext(AuthContextType);

export function AuthProvider({ children }) {
  let [user, setUser] = useState("");
  let signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };
  let signout = () => {
    setUser(null);
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
