import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import fetchLogin from "../../hooks/login";
import fetchUser from "../../hooks/fetchUser";
import fetchLogout from "../../hooks/logout";
import LoadingContext from "../loading/LoadingContext";
import { loginCredentials } from "./AuthContext";

export default function AuthProvider({ children }: {children: React.ReactNode}) {
  const [user, setUser] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);
  useLayoutEffect(() => {
    const setAuth = async () => {
      setIsLoading(true);
      const { user } = await fetchUser();
      if (user) {
        setUser(user);
      }
      setIsLoading(false);
    };
    setAuth();
  }, []);

  const login = async ({ email, password }: loginCredentials) => {
    let user = await fetchLogin({ email, password });
    console.log({ user });
    setUser(user);
  };

  const logout = async () => {
    let loggedOut = await fetchLogout();
    if (loggedOut) {
      setUser(null);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {false ? null : children}
    </AuthContext.Provider>
  );
}
