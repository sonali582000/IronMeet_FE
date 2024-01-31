import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  const saveToken = (tokenFromLogin) => {
    setToken(tokenFromLogin);
    setIsAuthenticated(true);
    window.localStorage.setItem("authToken", tokenFromLogin);
    const { userId } = jwtDecode(tokenFromLogin);
    setUserId(userId);
  };

  const verifyToken = async (tokenFromLocalStorage) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          headers: { Authorization: `Bearer ${tokenFromLocalStorage}` },
        }
      );
      if (response.status === 200) {
        setIsAuthenticated(true);
        setToken(tokenFromLocalStorage);
        setIsLoading(false);
        const { userId } = jwtDecode(tokenFromLocalStorage);
        setUserId(userId);
      } else {
        setIsLoading(false);
        window.localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      window.localStorage.removeItem("authToken");
    }
  };

  const fetchWithToken = async (endpoint, method = "GET", payload) => {
    try {
      const response = await axios({
        method,
        url: `${import.meta.env.VITE_API_URL}/${endpoint}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        data: payload,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setToken();
    window.localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUserId();
    navigate("/login");
  };

  useEffect(() => {
    const tokenFromLocalStorage = window.localStorage.getItem("authToken");
    if (tokenFromLocalStorage) {
      // We have a token, we need to verify it
      verifyToken(tokenFromLocalStorage);
    } else {
      // No token, we don't have to do anything
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        saveToken,
        isAuthenticated,
        isLoading,
        fetchWithToken,
        logout,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
