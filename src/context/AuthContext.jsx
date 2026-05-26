import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, signIn, signUp, signOut } from '../lib/supabase';

const AuthContext = createContext(null);

// Helper: extract display name from a Supabase user object
export const getUserDisplayName = (user) => {
  if (!user) return null;
  return (
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    null
  );
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from Supabase (handles localStorage internally)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Keep state in sync across tabs / token refreshes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // name: string (required for register, ignored for login)
  const login = async (email, password) => {
    const { error } = await signIn(email, password);
    if (error) throw error;
  };

  const register = async (email, password, name) => {
    const { error } = await signUp(email, password, name);
    if (error) throw error;
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  // Convenience getter so consumers don't import getUserDisplayName separately
  const displayName = getUserDisplayName(user);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, displayName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};