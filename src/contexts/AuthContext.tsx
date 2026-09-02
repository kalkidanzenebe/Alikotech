import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { api, setAuthToken, getAuthToken } from "@/lib/api-client";
import type { UserProfile, LoginCredentials, LoginResponse } from "@/types";

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Fetch profile using stored token
  const fetchProfile = useCallback(async () => {
    try {
      const profile = await api.get<UserProfile>("/profile");
      setState({ user: profile, isAuthenticated: true, isLoading: false });
    } catch {
      setAuthToken(null);
      localStorage.removeItem("auth_token");
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  // On mount — restore token and fetch profile
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setAuthToken(storedToken);
      fetchProfile();
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [fetchProfile]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const res = await api.post<LoginResponse>("/auth/login", credentials);
    setAuthToken(res.token);
    localStorage.setItem("auth_token", res.token);
    setState({ user: res.user, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    localStorage.removeItem("auth_token");
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const refreshProfile = fetchProfile;

  return (
    <AuthContext.Provider value={{ ...state, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
