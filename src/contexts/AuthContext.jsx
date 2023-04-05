import { createContext, useContext, useState } from "react";

// This is the context that will be used to store the user data
const AuthContextType = {
  user: "",
  signin: null,
  signout: null
};
const AuthContext = createContext(AuthContextType);

// This component is used to provide the context to the children
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

// This hook is used to get the context
export function useAuth() {
  return useContext(AuthContext);
}
