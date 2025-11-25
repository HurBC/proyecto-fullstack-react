import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/auth";

const STORAGE_TOKEN_KEY = "token";

const AuthContext = createContext(null);

const saveToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(STORAGE_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_TOKEN_KEY);
    }
  } catch (e) {
    console.error("Failed to save token to localStorage", e);
  }
};

const loadToken = () => {
  try {
    return localStorage.getItem(STORAGE_TOKEN_KEY);
  } catch (e) {
    console.error("Failed to load token from localStorage", e);
    return null;
  }
};

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => loadToken());
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = parseJwt(token);
      setUser(decoded);
      saveToken(token);
    } else {
      setUser(null);
      saveToken(null);
    }
  }, [token]);

  const register = async ({ name, email, password }) => {
    try {
      await authService.signup(name, email, password);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await authService.signin(email, password);
      if (response.data.token) {
        setToken(response.data.token);
        return { ok: true };
      }
      return { ok: false, message: "Login failed" };
    } catch (error) {
      return {
        ok: false,
        message: error.response?.data?.message || "Invalid credentials",
      };
    }
  };

  const logout = () => {
    setToken(null);
  };

  const value = {
    user,
    token,
    register,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthProvider;
