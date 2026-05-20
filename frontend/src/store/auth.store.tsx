import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loginApi, registerApi } from "../api/auth.api";
import { LoginPayload, RegisterPayload, User } from "../types/auth.types";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USER_KEY = "smart_leads_user";
const TOKEN_KEY = "smart_leads_token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    const savedToken = localStorage.getItem(TOKEN_KEY);

    try {
      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser) as User);
        setToken(savedToken);
      }
    } catch {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const saveSession = (nextUser: User, nextToken: string) => {
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    localStorage.setItem(TOKEN_KEY, nextToken);
    setUser(nextUser);
    setToken(nextToken);
  };

  const login = async (payload: LoginPayload): Promise<void> => {
    const result = await loginApi(payload);
    saveSession(result.user, result.token);
  };

  const register = async (payload: RegisterPayload): Promise<void> => {
    const result = await registerApi(payload);
    saveSession(result.user, result.token);
  };

  const logout = (): void => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isAuthLoading,
      login,
      register,
      logout,
    }),
    [user, token, isAuthLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthStore = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthStore must be used inside AuthProvider");
  }

  return context;
};
