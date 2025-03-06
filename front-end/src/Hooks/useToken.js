import { useState } from "react";

// Hook to manage JWT token
const useToken = () => {
  const getToken = () => {
    return localStorage.getItem("token"); // Retrieve token from localStorage
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken); // Save token in localStorage
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token"); // Remove token on logout
    setToken(null);
  };

  return { token, saveToken, removeToken };
};

export default useToken;
