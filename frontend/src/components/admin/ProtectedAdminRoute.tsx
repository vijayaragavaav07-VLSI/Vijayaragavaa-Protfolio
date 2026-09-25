import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading, isAdmin, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030609] flex items-center justify-center">
        <div className="flex flex-col items-center text-[#00d9ff]">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p className="text-sm font-mono tracking-wider">VERIFYING ADMIN CREDENTIALS...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (session && !isAdmin) {
    // Authenticated but not an admin
    return (
      <div className="min-h-screen bg-[#030609] flex items-center justify-center p-4">
        <div className="bg-[#07111f] border border-red-500/30 p-8 max-w-md w-full rounded text-center shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <span className="text-red-500 text-2xl font-bold">!</span>
          </div>
          <h1 className="text-xl font-bold text-white mb-2 tracking-widest">ACCESS DENIED</h1>
          <p className="text-[#8ea3bd] mb-8 text-sm">
            Your account does not have administrator privileges. Only authorized users can access the portfolio control center.
          </p>
          <button
            onClick={signOut}
            className="w-full bg-[#1a2b44] hover:bg-[#253959] text-white py-2 px-4 rounded border border-[#00d9ff]/30 transition-colors tracking-widest text-sm"
          >
            LOGOUT
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
