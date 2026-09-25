import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  refreshAdminStatus: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  // Start as true so ProtectedAdminRoute shows a spinner, not a flash redirect
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Prevent concurrent admin-profile checks from racing each other
  const adminCheckRef = useRef<AbortController | null>(null);

  const checkAdminStatus = async (currentUser: User | null): Promise<boolean> => {
    if (!currentUser) {
      return false;
    }

    // Cancel any in-flight check
    adminCheckRef.current?.abort();
    const controller = new AbortController();
    adminCheckRef.current = controller;

    try {
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('is_active')
        .eq('id', currentUser.id)
        .eq('is_active', true)
        .single();

      // If this check was superseded by a newer one, ignore the result
      if (controller.signal.aborted) return false;

      return !error && !!data;
    } catch {
      return false;
    }
  };

  const refreshAdminStatus = async () => {
    const result = await checkAdminStatus(user);
    setIsAdmin(result);
  };

  useEffect(() => {
    // onAuthStateChange fires immediately with the persisted session
    // (INITIAL_SESSION event on first mount). We use this as the single
    // source of truth — no separate getSession() call needed.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        const adminResult = await checkAdminStatus(currentSession.user);
        setIsAdmin(adminResult);
      } else {
        setIsAdmin(false);
      }

      // Mark auth as resolved — fires after every event including SIGNED_OUT
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
      adminCheckRef.current?.abort();
    };
  }, []);

  const signOut = async () => {
    // Clear local state first so the UI updates immediately
    setIsAdmin(false);
    setUser(null);
    setSession(null);
    // Then tell Supabase to invalidate the server token and clear localStorage
    await supabase.auth.signOut();
    // onAuthStateChange(SIGNED_OUT) will fire and confirm the cleared state
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        isAdmin,
        refreshAdminStatus,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
