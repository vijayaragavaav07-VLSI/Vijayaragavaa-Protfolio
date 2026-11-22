import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Send, Cpu } from 'lucide-react';

interface HeaderProps {
  name1: string;
  name2: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ name1, name2, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'achievements', label: 'Awards' },
    { id: 'certificates', label: 'Certs' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll-spy active section detection
      const scrollPosition = window.scrollY + 100;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const sectionId = navLinks[i].id;
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#02060d]/90 backdrop-blur-md border-[#102a45] shadow-[0_4px_24px_rgba(2,6,13,0.8)]'
          : 'bg-[#02060d]/75 backdrop-blur-sm border-[#102a45]/60'
      }`}
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group select-none"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-9 h-9 border border-[#00d9ff] bg-[#051a2d] rounded-lg flex items-center justify-center font-mono font-bold text-[#00d9ff] text-sm shadow-[0_0_12px_rgba(0,217,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.6)] group-hover:scale-105 transition-all">
            <Cpu className="w-4 h-4 text-[#00d9ff]" />
          </div>
          <div className="font-mono text-xs tracking-wider text-white">
            <span className="font-bold group-hover:text-[#00d9ff] transition-colors">
              {name1} {name2}
            </span>
            <small className="block text-[9.5px] text-[#8ea3bd] font-normal tracking-widest leading-none mt-0.5">
              RTL & VLSI ARCHITECT
            </small>
          </div>
        </div>

        {/* Desktop Navigation with Active Section Highlight */}
        <nav className="hidden xl:flex items-center gap-1 ml-auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`font-mono text-[11.5px] tracking-wider uppercase px-2.5 py-1.5 rounded transition-all relative ${
                  isActive
                    ? 'text-[#00d9ff] font-semibold bg-[#00d9ff]/10 shadow-[0_0_10px_rgba(0,217,255,0.15)]'
                    : 'text-[#8ea3bd] hover:text-white hover:bg-[#071729]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#00d9ff] rounded-full shadow-[0_0_6px_#00d9ff]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 ml-auto xl:ml-4">
          <button
            onClick={() => handleNavClick('resume')}
            className="hidden sm:inline-flex items-center gap-1.5 font-mono font-semibold text-[11px] uppercase tracking-wider px-3 py-1.5 border border-[#00d9ff]/70 text-[#00d9ff] rounded bg-[#00d9ff]/5 hover:bg-[#00d9ff]/15 hover:shadow-[0_0_15px_rgba(0,217,255,0.3)] transition-all h-9"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="inline-flex items-center gap-1.5 font-mono font-bold text-[11px] uppercase tracking-wider px-3.5 py-1.5 bg-[#00d9ff] text-[#020812] rounded hover:bg-[#38e1ff] hover:shadow-[0_0_18px_rgba(0,217,255,0.5)] transition-all h-9"
          >
            <span>CONNECT</span>
            <Send className="w-3 h-3" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#00d9ff] border border-[#102a45] rounded-md bg-[#051729] hover:border-[#00d9ff] transition-colors ml-1 h-9 w-9 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#030a16]/98 border-b border-[#102a45] px-4 py-4 backdrop-blur-xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left font-mono text-xs px-3 py-2 rounded uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#00d9ff]/15 text-[#00d9ff] font-bold border-l-2 border-[#00d9ff]'
                      : 'text-[#8ea3bd] hover:text-white hover:bg-[#061525]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2 pt-2 border-t border-[#102a45]">
            <button
              onClick={() => handleNavClick('resume')}
              className="flex-1 btn-outline py-2 text-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="flex-1 btn-primary py-2 text-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
