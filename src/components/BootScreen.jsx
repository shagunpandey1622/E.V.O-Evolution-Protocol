import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, Activity } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function BootScreen({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(12);

  const bootMessages = [
    'E.V.O. BIOS v4.9.2 // QUANTUM NEURAL HYPERVISOR INITIALIZED',
    'MEMORY INTEGRITY: 16,384 PFLOPS ALLOCATED [OK]',
    'BIOMETRIC TRANSLATION PROTOCOL: ACTIVE',
    'SYNAPSE BRIDGES: SYNCHRONIZING CORTEX TO TITANIUM BUS...',
    'CALIBRATING OCULAR SPECTRAL ARRAY [0.1nm — 1000μm]...',
    'NEURAL TELEMETRY: 98.4% HARMONIC EQUILIBRIUM ACHIEVED',
    'PROJECT E.V.O. // SYSTEM ONLINE // WELCOME'
  ];

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < bootMessages.length) {
        setLogs((prev) => [...prev, bootMessages[currentIdx]]);
        setProgress(Math.min(100, Math.round(((currentIdx + 1) / bootMessages.length) * 100)));
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    }, 130);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        cyberAudio.playClick();
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    cyberAudio.playClick();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-[#050812] flex flex-col items-center justify-center p-4 text-[#42EAFF] font-mono selection:bg-none">
      {/* Background Matrix/Grid */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* Center Boot Terminal Box */}
      <div className="relative max-w-xl w-full bg-[#091426]/90 border border-[#42EAFF]/40 p-6 md:p-8 rounded-sm shadow-[0_0_50px_rgba(66,234,255,0.2)]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-[#42EAFF]/20 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#42EAFF] animate-ping" />
            <span className="font-heading font-bold tracking-wider text-white text-sm md:text-base">
              PROJECT E.V.O. // BOOT SEQUENCE
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="text-xs text-[#8899A6] hover:text-[#42EAFF] border border-[#8899A6]/30 hover:border-[#42EAFF] px-2.5 py-1 rounded transition-colors uppercase tracking-widest"
          >
            Bypass [ESC]
          </button>
        </div>

        {/* Boot Logs */}
        <div className="h-44 overflow-y-auto space-y-1.5 text-xs md:text-sm text-left mb-6 font-mono text-[#8899A6]">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-2 animate-fadeIn">
              <span className="text-[#987BFF] select-none">&gt;</span>
              <span className={index === logs.length - 1 ? 'text-[#42EAFF] font-bold' : ''}>
                {log}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-1 text-[#42EAFF]">
            <span className="text-[#987BFF]">&gt;</span>
            <span className="inline-block w-2 h-4 bg-[#42EAFF] animate-pulse" />
          </div>
        </div>

        {/* Progress Bar & Status */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-[#8899A6]">
            <span>SYSTEM INITIALIZATION</span>
            <span className="text-[#42EAFF] font-bold">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#050812] rounded-full overflow-hidden border border-[#42EAFF]/20">
            <div
              className="h-full bg-gradient-to-r from-[#42EAFF] to-[#987BFF] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Tag */}
        <div className="mt-6 flex items-center justify-between text-[11px] text-[#546575]">
          <span>SECTOR 07 VALKYRIE // ARCHIVE</span>
          <span>SEC: QUANTUM-VERIFIED</span>
        </div>
      </div>
    </div>
  );
}
