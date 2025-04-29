"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface User {
  username: string;
  token: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const expiry = localStorage.getItem("expiry");

    if (storedUser && expiry) {
      const now = new Date().getTime();
      if (now < parseInt(expiry)) {
        setCurrentUser(JSON.parse(storedUser));
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("expiry");
      }
    }
  }, []);

  useEffect(() => {
    const expiry = localStorage.getItem("expiry");

    if (currentUser && expiry) {
      const now = new Date().getTime();
      const timeout = parseInt(expiry) - now;

      if (timeout > 0) {
        const timer = setTimeout(() => {
          logout();
          toast.info("Session expired. Please log in again.");
        }, timeout);

        return () => clearTimeout(timer);
      }
    }
  }, [currentUser]);

  const login = (userData: User) => {
    const expiresInMs = 60 * 60 * 1000; // 1 hour
    const expiryTime = new Date().getTime() + expiresInMs;

    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("expiry", expiryTime.toString());
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("expiry");
    toast.info("Logged out successfully.");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, isAuthenticated: !!currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
