import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useToken from "../Hooks/useToken";
import axios from "axios";

const PrivateRoute = ({ children }) => {
    const { token, removeToken } = useToken();
    const [isValid, setIsValid] = useState(null); // Track token validity

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                console.log("Token not found!!")
                setIsValid(false); // No token → redirect to login
                return;
            }

            try {
                const response = await axios.get("http://localhost:5000/api/verify-token",
                  {
                    headers: { Authorization: token }
                  }
                )
                console.log(response.data.user.username);
                // if (!response.ok) throw new Error("Invalid token");

                setIsValid(true);
                return; // Token is valid
            } catch (error) {
                removeToken();
                console.log(error); // Remove tampered/expired token
                setIsValid(false); // Redirect to login
            }
        };

        verifyToken();
    }, [token, removeToken]);

    // While verifying, show nothing (prevents flickering)
    if (isValid === null) return null;  

    return isValid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
