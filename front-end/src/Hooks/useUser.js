import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ Use named import


// Hook to get user information from token
const useUser = (token) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token); // Decode JWT token
        setUser(decodedUser); // Store user info
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  return user;
};

export default useUser;
