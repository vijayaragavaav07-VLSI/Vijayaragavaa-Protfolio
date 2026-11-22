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
    <footer className="border-t border-[#102a45] py-6 sm:py-7 bg-[#02060d]">
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[#8ea3bd] uppercase tracking-wider">
        <div className="text-center sm:text-left text-[11px]">
          © {currentYear} {name1} {name2} // VLSI & RTL ARCHITECTURE // ALL RIGHTS RESERVED
        </div>

        {/* Discreet Admin Login Button */}
        <div>
          <button
            onClick={onAdminClick}
            className="inline-flex items-center gap-1.5 opacity-60 hover:opacity-100 hover:text-[#00d9ff] transition-all py-1 px-2.5 rounded border border-transparent hover:border-[#102a45] text-[10.5px] cursor-pointer"
            title="Admin CMS portal"
          >
            <Lock className="w-3 h-3" />
            <span>ADMIN ACCESS</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
