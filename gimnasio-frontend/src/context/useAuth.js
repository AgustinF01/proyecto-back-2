import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);
        } else {
            setUser(null);
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const token = localStorage.getItem("token");
            if (token) {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            } else {
                setUser(null);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return user;
};

export default useAuth;