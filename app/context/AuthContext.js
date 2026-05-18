"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores { name, email, role }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loginUser = async (email, password)=>{
    const res = await fetch(`/api/auth/login`,{
      method:"POST",
      headers:{ "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({email, password})
    });
     const data =await res.json();
     if(data.success === true)
      toast.success(data.message);
    if(res.ok){
     
      setUser(data.user);
      setIsLoggedIn(true);
      router.push("/")
    }
    else{
      throw new Error(data.message || "Login Failed");
    }
  }

  // 1. Check session on load (Call your backend /me or /verify route)
  useEffect(() => {
    const initAuth = async () => {
      try {
        
        const res = await fetch(`/api/auth/me`, {
          credentials: "include", // CRITICAL for HttpOnly Cookies
        });
        
        if (res.ok) {
          const data = await res.json();


          setUser(data.user);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Auth initialization failed");
        toast.error(data.message);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  


  const register = async (email, password, name)=>{
    const res = await fetch(`/api/auth/register`,{
      method: "POST",
      credentials:"include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({name, password, email})
    });
    const data =await res.json();

    if(data.success){
      toast.success(data.message);
    }
    if(res.ok){
      setUser(data.user);
      setIsLoggedIn(true);
      router.push("/")
    } else{
      toast.error("Authentication Failed");
      throw new Error(data.message || "Signup failed")
    }
  }

  const logout = async () => {
    
    const res = await fetch(`/api/auth/logout`, { method: "POST", credentials: "include" });
    const data = await res.json();
    if(data.success){
      toast.success(data.message);
    }
    setUser(null);
    setIsLoggedIn(false);
    router.push("/register");
  };

  const isAdmin = user?.role === "ADMIN"

  return (
    <AuthContext.Provider value={{ user, setIsLoggedIn, loading,  logout, loginUser, register, isLoggedIn, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);