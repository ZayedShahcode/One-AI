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
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize user from localStorage
  useEffect(() => {
    if (!isClient) return;

    try {
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
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("expiry");
    }
  }, [isClient]);

  // Handle session expiry
  useEffect(() => {
    if (!isClient || !currentUser) return;

    try {
      const expiry = localStorage.getItem("expiry");

      if (expiry) {
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
    } catch (error) {
      console.error("Error handling session expiry:", error);
    }
  }, [currentUser, isClient]);

  const login = (userData: User) => {
    if (!isClient) return;

    const expiresInMs = 60 * 60 * 1000; // 1 hour
    const expiryTime = new Date().getTime() + expiresInMs;

    setCurrentUser(userData);
    
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("expiry", expiryTime.toString());
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    
    if (isClient) {
      try {
        localStorage.removeItem("user");
        localStorage.removeItem("expiry");
      } catch (error) {
        console.error("Error removing from localStorage:", error);
      }
      
      toast.info("Logged out successfully.");
      router.push("/login");
    }
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
