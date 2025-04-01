
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type UserRole = "job_seeker" | "recruiter" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
  isRecruiter: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // For demo purposes, we'll check localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login for now
      // In a real app, this would call an API endpoint
      if (email === "admin@example.com" && password === "admin123") {
        const mockUser: User = {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin",
          verified: true
        };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast.success("Welcome back, Admin!");
        navigate("/dashboard");
      } else if (email === "recruiter@example.com" && password === "recruiter123") {
        const mockUser: User = {
          id: "2",
          email: "recruiter@example.com",
          name: "Recruiter User",
          role: "recruiter",
          verified: true
        };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else if (email === "user@example.com" && password === "user123") {
        const mockUser: User = {
          id: "3",
          email: "user@example.com",
          name: "Job Seeker",
          role: "job_seeker",
          verified: true
        };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        toast.success("Welcome back!");
        navigate("/jobs");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Mock registration for now
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role,
        verified: false
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      toast.success("Registration successful! Please verify your identity.");
      navigate("/verify-identity");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Logged out successfully");
  };

  const isAdmin = () => user?.role === "admin";
  const isRecruiter = () => user?.role === "recruiter";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isAdmin,
        isRecruiter
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
