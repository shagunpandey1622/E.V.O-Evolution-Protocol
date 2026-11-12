import React, { useState, useEffect } from 'react';
import { ArrowUp, Cpu, Radio, Terminal } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function Footer({ onOpenTerminal, onOpenProtocol }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toUTCString().replace('GMT', 'UTC-CYBER'));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToTop = () => {
    cyberAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Awakening', href: '#awakening' },
    { name: 'Chamber', href: '#chamber' },
    { name: 'Genesis', href: '#genesis' },
    { name: 'Technology', href: '#technology' },
    { name: 'Metamorphosis', href: '#metamorphosis' },
    { name: 'Chronicles', href: '#chronicles' },
    { name: 'Core', href: '#core' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    cyberAudio.playClick();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="position-relative z-10 bg-[#050812]/95 border-top border-[#42EAFF]/20 pt-5 pb-4 text-[#8899A6] overflow-hidden">
      <div className="container">

        {/* Top Grid with Bootstrap Row */}
        <div className="row g-4 pb-4 border-bottom border-[#42EAFF]/15">

          {/* Brand Col */}
          <div className="col-12 col-lg-5 space-y-3">
            <div className="d-flex align-items-center gap-2.5">
              <div className="position-relative w-7 h-7 d-flex align-items-center justify-content-center">
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-[#42EAFF]/10 rounded-sm border border-[#42EAFF]/60 rotate-45" />
                <Cpu className="w-3.5 h-3.5 text-[#42EAFF] position-relative z-10" />
              </div>
              <span className="font-heading fw-black text-lg text-white tracking-wider">
                PROJECT E.V.O.
              </span>
            </div>

            <p className="text-xs text-[#8899A6] font-body max-w-sm leading-relaxed mb-0">
              Project E.V.O. is a unified cybernetic world engine exploring the post-biological convergence of human cognition, synthetic physiology, and planetary stewardship.
            </p>

            <div className="d-flex align-items-center gap-2 pt-1 font-mono text-xs">
              <span className="badge-tech !text-[9px]">
                <Radio className="w-3 h-3 text-[#42EAFF] animate-pulse" />
                <span>SECTOR: 07 VALKYRIE CORE</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-12 col-sm-6 col-lg-4 space-y-2">
            <div className="font-heading fw-bold text-xs text-white text-uppercase tracking-widest mb-2">
              NAVIGATION PROTOCOL
            </div>
            <div className="row g-1 text-xs font-mono">
              {navLinks.map((link) => (
                <div key={link.name} className="col-6">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-[#8899A6] hover:text-[#42EAFF] transition-colors py-1 d-flex align-items-center gap-1 text-decoration-none"
                  >
                    <span className="text-[#42EAFF] text-[9px]">&gt;</span>
                    <span>{link.name}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Core Telemetry & Terminal Link */}
          <div className="col-12 col-sm-6 col-lg-3 space-y-2">
            <div className="font-heading fw-bold text-xs text-white text-uppercase tracking-widest mb-2">
              CENTRAL ACCESS
            </div>
            <div className="evo-glass-panel p-2.5 font-mono text-xs space-y-2">
              <div className="text-white fw-semibold">PLANETARY MAINFRAME</div>
              <div className="text-[10px] text-[#8899A6]">Autonomous Cybernetic Core </div>
              <button
                onClick={() => {
                  cyberAudio.playClick();
                  onOpenTerminal();
                }}
                className="w-100 mt-1 btn-cyber-secondary !py-1.5 !text-[10px]"
              >
                <Terminal className="w-3.5 h-3.5" />
                OPEN CLI TERMINAL
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Clock, Back to Top, Copyright */}
        <div className="pt-3 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 text-xs font-mono text-[#546575]">
          <div className="d-flex align-items-center gap-2">
            <span>© PROJECT E.V.O.</span>
            <span>//</span>
            <span>AUTONOMOUS CONVERGENCE</span>
          </div>

          <div className="text-center text-[10px] text-[#8899A6]">
            {timeStr}
          </div>

          {/* Back to Top */}
          <button
            onClick={handleScrollToTop}
            onMouseEnter={() => cyberAudio.playHover()}
            className="d-flex align-items-center gap-1.5 text-[#8899A6] hover:text-[#42EAFF] transition-colors border border-[#8899A6]/20 hover:border-[#42EAFF] px-2.5 py-1 rounded text-xs"
          >
            <span>RETURN TO ZENITH</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
