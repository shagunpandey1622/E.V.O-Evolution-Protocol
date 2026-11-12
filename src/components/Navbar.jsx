import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Terminal, Shield, Cpu } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function Navbar({ onOpenTerminal, onOpenProtocol }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = cyberAudio.toggleSound();
    setSoundActive(newState);
  };

  const navLinks = [
    { name: 'Awakening', href: '#hero' },
    { name: 'Chamber', href: '#chamber' },
    { name: 'Genesis', href: '#builder' },
    { name: 'Technology', href: '#technology' },
    { name: 'Human vs Machine', href: '#comparison' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Ethics', href: '#ethics' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    cyberAudio.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#050812]/90 backdrop-blur-md border-b border-[#42EAFF]/20 shadow-[0_4px_30px_rgba(5,8,18,0.8)] py-3'
          : 'bg-transparent py-5 border-b border-transparent'
        }`}
    >
      <div className="evo-container flex items-center justify-between">
        {/* Brand Logo & Glyph */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="flex items-center gap-3 group text-decoration-none"
        >
          {/* Animated Cyber Hexagon Emblem */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#42EAFF]/10 rounded-sm border border-[#42EAFF]/60 rotate-45 group-hover:rotate-90 group-hover:border-[#987BFF] transition-transform duration-500" />
            <Cpu className="w-5 h-5 text-[#42EAFF] group-hover:text-[#987BFF] transition-colors relative z-10" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-lg md:text-xl tracking-wider text-white group-hover:text-[#42EAFF] transition-colors">
                E.V.O.
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#8899A6] uppercase -mt-1 hidden sm:block">
              THE EVOLUTION PROTOCOL
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-heading tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              onMouseEnter={() => cyberAudio.playHover()}
              className="text-[#C4D1DF] hover:text-[#42EAFF] relative py-1 transition-colors duration-200 group text-decoration-none"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#42EAFF] to-[#987BFF] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right Action Group: Sound Toggle & Initialize Access CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            title={soundActive ? 'Audio Feedback Enabled' : 'Audio Feedback Disabled (Click to Enable)'}
            className={`p-2 rounded border transition-all duration-200 ${soundActive
                ? 'bg-[#42EAFF]/15 border-[#42EAFF] text-[#42EAFF] shadow-[0_0_12px_rgba(66,234,255,0.4)]'
                : 'bg-[#091426]/60 border-[#8899A6]/30 text-[#8899A6] hover:text-white'
              }`}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* INITIALIZE ACCESS Button */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              onOpenTerminal();
            }}
            className="btn-cyber-primary text-xs !py-2.5 !px-4"
          >
            <Terminal className="w-4 h-4" />
            <span>INITIALIZE ACCESS</span>
          </button>
        </div>

        {/* Mobile Hamburger & Sound Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className={`p-2 rounded border transition-all ${soundActive
                ? 'bg-[#42EAFF]/15 border-[#42EAFF] text-[#42EAFF]'
                : 'bg-[#091426]/60 border-[#8899A6]/30 text-[#8899A6]'
              }`}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              cyberAudio.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Open Mobile Menu"
            className="p-2 text-[#42EAFF] border border-[#42EAFF]/30 rounded bg-[#091426]/80 hover:bg-[#42EAFF]/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050812]/98 border-b border-[#42EAFF]/30 px-6 py-6 backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-col gap-4 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-heading text-base tracking-widest text-[#C4D1DF] hover:text-[#42EAFF] py-2 border-b border-[#42EAFF]/10"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="btn-cyber-primary w-full text-center py-3"
              >
                <Terminal className="w-4 h-4" />
                INITIALIZE ACCESS
              </button>
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  setMobileMenuOpen(false);
                  onOpenProtocol();
                }}
                className="btn-cyber-secondary w-full text-center py-2.5"
              >
                EXPLORE PROTOCOL BRIEF
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
