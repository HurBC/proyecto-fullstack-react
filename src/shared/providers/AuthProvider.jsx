import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_ACCOUNTS_KEY = "accounts";
const STORAGE_SESSION_KEY = "session";

const AuthContext = createContext(null);

const loadAccounts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load accounts from localStorage", e);
    return [];
  }
};

const saveAccounts = (accounts) => {
  try {
    localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch (e) {
    console.error("Failed to save accounts to localStorage", e);
  }
};

const saveSession = (user) => {
  try {
    if (user) localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_SESSION_KEY);
  } catch (e) {
    console.error("Failed to save session to localStorage", e);
  }
};

const loadSession = () => {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Failed to load session from localStorage", e);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => loadSession());
  const [accounts, setAccounts] = useState(() => loadAccounts());

  useEffect(() => {
    saveAccounts(accounts);
  }, [accounts]);

  useEffect(() => {
    saveSession(user);
  }, [user]);

  const register = ({ name, email, password }) => {
    if (!email || !password) {
      return { ok: false, message: "Email and password are required" };
    }

    const exists = accounts.find((a) => a.email === email.toLowerCase());

    if (exists) {
      return { ok: false, message: "Ya existe una cuenta con ese email" };
    }

    const newAccount = {
      name: name || "",
      email: email.toLowerCase(),
      password,
    };
    const updated = [...accounts, newAccount];

    setAccounts(updated);
    setUser({ email: newAccount.email, name: newAccount.name });

    return { ok: true };
  };

  const login = ({ email, password }) => {
    if (!email || !password) {
      return { ok: false, message: "Email and password are required" };
    }

    const ac = accounts.find(
      (a) => a.email === email.toLowerCase() && a.password === password
    );

    if (!ac) return { ok: false, message: "Credenciales inválidas" };

    setUser({ email: ac.email, name: ac.name });

    return { ok: true };
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    accounts,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthProvider;
