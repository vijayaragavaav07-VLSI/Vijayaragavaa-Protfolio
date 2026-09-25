import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Lock, Mail, Key, Loader2, ArrowLeft } from 'lucide-react';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const { session, isAdmin, refreshAdminStatus } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in and admin, redirect to admin or previous page
  useEffect(() => {
    if (session && isAdmin) {
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [session, isAdmin, navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }
      
      // Wait for auth context to update and check admin status
      await refreshAdminStatus();

    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to authenticate');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030609] flex flex-col justify-center items-center p-4 relative selection:bg-[#00d9ff]/30 selection:text-white">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-[#00d9ff]/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-[#00d9ff]/5 blur-[100px]" />
      </div>

      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center text-[#8ea3bd] hover:text-[#00d9ff] transition-colors font-mono text-sm group z-10"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        RETURN TO PORTFOLIO
      </button>

      <div className="w-full max-w-md z-10">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-4 border border-[#00d9ff]/30 bg-[#00d9ff]/10 rounded shadow-[0_0_15px_rgba(0,217,255,0.2)]">
            <Lock className="w-5 h-5 text-[#00d9ff]" />
          </div>
          <h1 className="text-2xl font-bold tracking-[0.2em] text-white">VIJAYARAGAVAA V</h1>
          <p className="text-[#00d9ff] mt-2 font-mono tracking-widest text-sm">ADMIN ACCESS</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#07111f] border border-[#1a2b44] p-8 rounded shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent opacity-30"></div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm font-mono flex items-start">
              <span className="mr-2 mt-0.5">!</span>
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-[#8ea3bd] mb-2 tracking-widest">
                EMAIL IDENTIFIER
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-[#4a5f78]" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#030609] border border-[#1a2b44] text-white pl-10 pr-4 py-3 rounded focus:outline-none focus:border-[#00d9ff]/50 focus:ring-1 focus:ring-[#00d9ff]/50 transition-all font-mono"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#8ea3bd] mb-2 tracking-widest">
                AUTHENTICATION KEY
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="h-4 w-4 text-[#4a5f78]" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#030609] border border-[#1a2b44] text-white pl-10 pr-4 py-3 rounded focus:outline-none focus:border-[#00d9ff]/50 focus:ring-1 focus:ring-[#00d9ff]/50 transition-all font-mono"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full relative group overflow-hidden bg-[#00d9ff]/10 hover:bg-[#00d9ff]/20 text-[#00d9ff] border border-[#00d9ff]/30 py-3 rounded font-mono tracking-[0.2em] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  AUTHENTICATING...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  INITIALIZE SESSION
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
