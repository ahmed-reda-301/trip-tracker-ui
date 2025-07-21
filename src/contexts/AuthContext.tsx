"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import AuthService, {
  User,
  LoginCredentials,
  LoginResponse,
} from "@/services/authService";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResponse>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const authService = AuthService.getInstance();

  const checkAuth = useCallback(() => {
    try {
      const currentUser = authService.getCurrentUser();
      const isAuth = authService.isAuthenticated();

      if (isAuth && currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [authService]);

  useEffect(() => {
    checkAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<LoginResponse> => {
      setIsLoading(true);
      try {
        const response = await authService.login(credentials);
        if (response.success && response.user) {
          setUser(response.user);
        }
        return response;
      } finally {
        setIsLoading(false);
      }
    },
    [authService]
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    // Redirect to login page
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, [authService]);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      checkAuth,
    }),
    [user, isLoading, login, logout, checkAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
