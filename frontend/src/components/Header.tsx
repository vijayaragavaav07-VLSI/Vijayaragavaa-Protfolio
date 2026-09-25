import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Send } from 'lucide-react';

interface HeaderProps {
  name1: string;
  name2: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ name1, name2, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#030609]/95 backdrop-blur-md border-[#0d2238] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
          : 'bg-[#030609]/80 backdrop-blur-sm border-[#0d2238]/60'
      }`}
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNavClick('home')}>
          <div className="w-[42px] h-[42px] border border-[#00d9ff] bg-[#062434] rounded flex items-center justify-center font-mono font-bold text-[#00d9ff] text-base shadow-[0_0_12px_rgba(0,217,255,0.3)] hover:shadow-[0_0_18px_rgba(0,217,255,0.5)] transition-all">
            VV
          </div>
          <div className="font-mono font-bold text-xs tracking-wider text-[#e8f1fb]">
            <span className="hover:text-[#00d9ff] transition-colors">{name1} {name2}</span>
            <small className="block text-[10px] text-[#8ea3bd] font-normal tracking-widest mt-0.5">
              RTL / VLSI ARCHITECTURE
            </small>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-5 ml-auto">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="font-mono font-semibold text-xs tracking-widest uppercase text-[#e8f1fb] hover:text-[#00d9ff] transition-colors relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00d9ff] transition-all duration-200 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 ml-auto xl:ml-6">
          <button
            onClick={() => handleNavClick('resume')}
            className="hidden sm:inline-flex items-center gap-2 font-mono font-semibold text-xs uppercase tracking-wider px-4 py-2 border border-[#00d9ff] text-[#00d9ff] rounded hover:bg-[#00d9ff]/10 hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all min-h-[40px]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME.RTL</span>
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="inline-flex items-center gap-2 font-mono font-semibold text-xs uppercase tracking-wider px-4 py-2 bg-[#00d9ff] text-[#001018] rounded hover:bg-[#2fe0ff] hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] transition-all font-bold min-h-[40px]"
          >
            <span>CONNECT</span>
            <Send className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#00d9ff] border border-[#10304d] rounded bg-[#06182a] hover:border-[#00d9ff] transition-colors ml-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#030609]/98 border-b border-[#10304d] px-6 py-6 shadow-2xl backdrop-blur-xl animate-in fade-in duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left font-mono font-semibold text-sm tracking-wider uppercase py-2.5 px-3 rounded hover:bg-[#061d30] text-[#e8f1fb] hover:text-[#00d9ff] transition-all flex items-center justify-between border-l-2 border-transparent hover:border-[#00d9ff]"
              >
                <span>{link.label}</span>
                <span className="text-[#8ea3bd] text-xs">→</span>
              </button>
            ))}
            <div className="pt-4 border-t border-[#10304d] flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('resume')}
                className="w-full flex items-center justify-center gap-2 font-mono font-semibold text-xs uppercase tracking-wider py-3 border border-[#00d9ff] text-[#00d9ff] rounded hover:bg-[#00d9ff]/10"
              >
                <FileText className="w-4 h-4" />
                <span>RESUME.RTL</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
