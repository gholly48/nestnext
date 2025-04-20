import { createContext, useState, ReactNode, useMemo, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  signin: (token: string) => void;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  // Initialize token from localStorage safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  const signin = (newToken: string) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', newToken);
        setToken(newToken);
      }
    } catch (error) {
      console.error('Failed to save token to localStorage', error);
    }
  };

  const signout = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch (error) {
      console.error('Failed to remove token from localStorage', error);
    }
  };

  const isAuthenticated = useMemo(() => !!token, [token]);

  const value = useMemo(() => ({
    token,
    isAuthenticated,
    signin,
    signout
  }), [token, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
