import { useState, useLayoutEffect, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import fetchLogin from "../../hooks/login";
import fetchUser from "../../hooks/fetchUser"
import fetchLogout from "../../hooks/logout";
import LoadingContext from "../loading/LoadingContext";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const {isLoading, setIsLoading} = useContext(LoadingContext);
    useLayoutEffect(() => {
        const setAuth = async () => {
            setIsLoading(true);
            const { user } = await fetchUser();
            if (user) {
                setUser(user);
            }
            setIsLoading(false);
        }
        setAuth();
    }, [])

    const login = async ({email, password}) => {
        let user = await fetchLogin({email, password});
        console.log({user})
        setUser(user);
    }

    const logout = async () => {
        let loggedOut = await fetchLogout();
        if (loggedOut) {
            setUser(null);
        }
        
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {isLoading ? null : children}
        </AuthContext.Provider>

    )
}