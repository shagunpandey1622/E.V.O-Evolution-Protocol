import React from 'react';
import { X, Shield, Cpu, Activity, Sparkles, BookOpen, CheckCircle } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function ProtocolModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="cyber-modal-overlay animate-fadeIn">
      <div className="cyber-modal-box">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#42EAFF]/30 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#42EAFF]/15 border border-[#42EAFF]/40 rounded text-[#42EAFF]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#8899A6] uppercase">
                EXECUTIVE DOSSIER // CLASSIFIED
              </span>
              <h2 className="font-heading font-black text-xl text-white">
                PROJECT E.V.O. MANIFESTO
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              cyberAudio.playClick();
              onClose();
            }}
            className="p-2 text-[#8899A6] hover:text-[#42EAFF] border border-[#8899A6]/20 hover:border-[#42EAFF] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-sm text-[#C4D1DF] font-body leading-relaxed">
          <div className="p-4 bg-[#050812] border-l-4 border-[#42EAFF] rounded">
            <h3 className="font-heading font-bold text-white text-base mb-1">
              "HUMANITY WAS JUST THE BEGINNING."
            </h3>
            <p className="text-xs text-[#8899A6] font-mono">
              The Evolution Protocol represents the ultimate synthesis between carbon-based consciousness and superconducting silicon-titanium mechatronics.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#42EAFF]" />
              THE CORE PHILOSOPHY
            </h4>
            <p>
              For 300,000 years, Homo sapiens evolved through the sluggish randomness of natural selection. Project E.V.O. takes deliberate stewardship of evolution. We believe biological ceilings—such as fatigue, sensory blindness, physical frailty, and cognitive limits—are not sacred boundaries, but technical challenges waiting to be surmounted.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-[#050812]/70 border border-[#42EAFF]/15 rounded">
              <span className="text-xs font-mono font-bold text-[#42EAFF] block mb-1">
                01. AUTONOMOUS SOVEREIGNTY
              </span>
              <p className="text-xs text-[#8899A6]">
                Every cyborg upgrade is 100% voluntary, modular, and reversible. Human consciousness retains absolute root privileges.
              </p>
            </div>

            <div className="p-3 bg-[#050812]/70 border border-[#987BFF]/15 rounded">
              <span className="text-xs font-mono font-bold text-[#987BFF] block mb-1">
                02. BIO-SYNTHETIC PARITY
              </span>
              <p className="text-xs text-[#8899A6]">
                Zero neural rejection. Our graphene bio-mesh integrates seamlessly into capillary pathways without scarring.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#2EE5D4]" />
              SECTOR 07 COVENANT BRIEF
            </h4>
            <p className="text-xs text-[#8899A6] font-mono leading-relaxed bg-[#050812] p-3 rounded border border-white/5">
              Architected as an elite transhuman technological synthesis. Engineered to establish biological-silicon convergence, neural parity, and planetary cybernetic stewardship.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-[#42EAFF]/20 flex justify-end">
          <button
            onClick={() => {
              cyberAudio.playClick();
              onClose();
            }}
            className="btn-cyber-primary text-xs !py-2.5 !px-6"
          >
            ACKNOWLEDGE & PROCEED
          </button>
        </div>

      </div>
    </div>
  );
}
