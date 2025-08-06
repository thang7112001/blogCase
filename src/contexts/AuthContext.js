
import { createContext, useState, useEffect } from "react";
import { getLocalUser, setLocalUser, clearLocalUser } from "../utils/storage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(getLocalUser());

    useEffect(() => {
        setLocalUser(user);
    }, [user]);

    const login = (userData) => setUser(userData);
    const logout = () => {
        setUser(null);
        clearLocalUser();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
