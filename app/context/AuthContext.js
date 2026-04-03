"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores { name, email, role }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Check session on load (Call your backend /me or /verify route)
  useEffect(() => {
    const initAuth = async () => {
      try {
        // In a startup, you'd fetch your backend here. 
        // The browser automatically sends the HttpOnly Cookie.
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          credentials: "include", // CRITICAL for HttpOnly Cookies
        });
        
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Auth initialization failed");
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    router.push("/");
  };

  const logout = async () => {
    // Call backend to clear cookie
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, { method: "POST", credentials: "include" });
    setUser(null);
    setIsLoggedIn(false);
    router.push("/register");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);