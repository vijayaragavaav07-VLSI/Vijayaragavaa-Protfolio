import React from 'react';
import { Lock } from 'lucide-react';

interface FooterProps {
  name1: string;
  name2: string;
  onAdminClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ name1, name2, onAdminClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#0d2238] py-8 sm:py-10 bg-[#030609]">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8ea3bd] uppercase tracking-wider">
        <div className="text-center sm:text-left">
          © {currentYear} {name1} {name2}. ALL RIGHTS RESERVED. ARCHITECTURE POWERED BY SUPABASE & REACT.
        </div>

        {/* Discreet Admin Login Button */}
        <div>
          <button
            onClick={onAdminClick}
            className="inline-flex items-center gap-1.5 opacity-60 hover:opacity-100 hover:text-[#00d9ff] transition-all py-1 px-2.5 rounded border border-transparent hover:border-[#10304d] text-[11px]"
            title="Admin CMS authentication (configured in Step 2)"
          >
            <Lock className="w-3 h-3" />
            <span>ADMIN LOGIN</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
