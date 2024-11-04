import { createContext } from "react";

export type AuthContextProps = {
    user: string | null;
    login: (credentials : loginCredentials ) => void;
    logout: Function;
}

export interface loginCredentials {
    email: string
    password: string
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => {},
    logout: () => {}
})

export default AuthContext;