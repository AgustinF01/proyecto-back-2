import { createContext, useState } from "react";
import useAuth from "./useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const user = useAuth();

    const login = (token) => {
        localStorage.setItem("token", token);
    };

    const logout = () => {
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;