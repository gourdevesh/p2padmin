import React, { createContext, useState, useEffect, ReactNode } from "react";
import { LoginResponse, login as loginService, logout as logoutService } from "../services/authService";
import api from "../api/api";
import { decryptData } from "../services/decryptService";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  admin: any;
  login: (username: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<User | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchAdminDetails(token);
    }
  }, []);

  const login = async (username: string, password: string): Promise<LoginResponse> => {
    const data = await loginService(username, password);

    if (data.status && data.token) {
      localStorage.setItem("authToken", data.token);
      fetchAdminDetails(data.token);
    }
    


    return data;
  };

  const fetchAdminDetails = async (token: string) => {
    try {
      const { data } = await api.get("/profile/admin-details", {
        headers: { Authorization: `Bearer ${token}` },
      });
              setAdmin(data?.data || {});

      // if (data?.data) {
      //   const decrypted = await decryptData(data?.data, token);
      //   setAdmin(decrypted?.data || {});
      // }

      setUser(data);
    }
    catch (error: any) {
      console.error("Failed to fetch admin profile:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/login");
      }
    }
  };
  const logout = () => {
    logoutService();
    setUser(null);
    setAdmin(null);
    localStorage.removeItem("authToken");

  };

  return (
    <AuthContext.Provider value={{ user, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
