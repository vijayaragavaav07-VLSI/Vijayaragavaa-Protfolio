import React, { useState } from 'react';
import { X, Lock, ShieldAlert } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice('Notice: Authentication & Supabase backend integration scheduled for Step 2.');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full bg-[#07111f] border border-[#00d9ff] rounded-lg p-7 sm:p-9 shadow-[0_0_50px_rgba(0,217,255,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8ea3bd] hover:text-[#00d9ff] rounded bg-[#06182a] border border-[#10304d] hover:border-[#00d9ff] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo and Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 border border-[#00d9ff] bg-[#062434] rounded flex items-center justify-center font-mono font-bold text-[#00d9ff] text-lg shadow-[0_0_15px_rgba(0,217,255,0.4)]">
            VV
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#00d9ff]" />
              <span>ADMIN ACCESS</span>
            </h2>
            <div className="font-mono text-[11px] text-[#8ea3bd] uppercase tracking-wider mt-0.5">
              AUTHORIZED PERSONNEL ONLY
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[11px] text-[#8ea3bd] uppercase tracking-wider mb-1.5">
              Email / Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@vijayaragavaa.vlsi"
              className="w-full bg-[#040c16] border border-[#10304d] rounded p-3 font-mono text-sm text-[#e8f1fb] focus:outline-none focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff]/50 transition-all placeholder:text-[#8ea3bd]/40"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] text-[#8ea3bd] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#040c16] border border-[#10304d] rounded p-3 font-mono text-sm text-[#e8f1fb] focus:outline-none focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff]/50 transition-all placeholder:text-[#8ea3bd]/40 pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#00d9ff] hover:text-[#2fe0ff] uppercase tracking-wider"
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          {notice && (
            <div className="p-3 bg-[#06182a] border border-[#00d9ff]/40 rounded text-xs font-mono text-[#00d9ff] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{notice}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full justify-center mt-2 shadow-[0_0_20px_rgba(0,217,255,0.4)]"
          >
            <span>LOGIN →</span>
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-xs text-[#8ea3bd] hover:text-white transition-colors"
            >
              ← Back to portfolio
            </button>
          </div>

          <div className="font-mono text-[10px] text-[#8ea3bd]/80 leading-relaxed pt-3 border-t border-[#0d2238] text-center">
            Step 1 status: Frontend UI verified. Supabase Auth & Admin CMS hooks will be enabled in Step 2.
          </div>
        </form>
      </div>
    </div>
  );
};
