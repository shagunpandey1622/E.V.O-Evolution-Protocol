import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Radio, Zap } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function CallToAction({ onTriggerCoreSurge }) {
  const [accessCode, setAccessCode] = useState('');
  const [isGranted, setIsGranted] = useState(false);
  const [isSurging, setIsSurging] = useState(false);

  const handleCoreActivation = () => {
    cyberAudio.playActivation();
    setIsSurging(true);
    if (onTriggerCoreSurge) onTriggerCoreSurge();
    setTimeout(() => {
      setIsSurging(false);
    }, 4500);
  };

  const handleRequestAccess = (e) => {
    e.preventDefault();
    if (!accessCode.trim()) return;
    cyberAudio.playActivation();
    setIsGranted(true);
    setTimeout(() => {
      setAccessCode('');
    }, 4000);
  };

  return (
    <section id="core" className="evo-section select-none">
      <div className="container position-relative z-10 d-flex flex-column align-items-center text-center my-auto py-3">

        {/* Transmission Badge */}
        <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded bg-[#42EAFF]/15 border border-[#42EAFF]/40 text-[#42EAFF] font-mono text-xs text-uppercase tracking-[0.25em] mb-4 backdrop-blur-md">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>LOCATION 07 // CIVILIZATION CORE REACHED</span>
        </div>

        {/* Monolithic Headlines with Fluid Typography */}
        <h2 className="hero-title-evo text-center mb-2 drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)]">
          THE NEXT SPECIES <br className="d-none d-sm-block" />
          <span className="bg-gradient-to-r from-white via-[#C4D1DF] to-[#42EAFF] bg-clip-text text-fill-transparent text-glow-cyan">
            IS ALREADY HERE.
          </span>
        </h2>

        <div className="text-xs sm:text-base font-heading fw-bold text-[#987BFF] tracking-[0.3em] text-uppercase mb-4 mb-md-5 text-glow-violet">
          EVOLVE BEYOND LIMITS.
        </div>

        {/* Visually Striking Final Activation Button */}
        <button
          onClick={handleCoreActivation}
          onMouseEnter={() => cyberAudio.playHover()}
          className={`group relative d-inline-flex align-items-center gap-3 px-4 px-sm-5 py-3.5 font-heading text-xs sm:text-sm fw-black tracking-[0.25em] text-uppercase rounded-sm transition-all duration-500 cursor-pointer mb-5 shadow-2xl ${isSurging
              ? 'bg-white text-black shadow-[0_0_100px_#ffffff] animate-pulse'
              : 'bg-[#42EAFF] hover:bg-[#78f1ff] text-[#050812] shadow-[0_0_50px_rgba(66,234,255,0.6)] hover:shadow-[0_0_80px_rgba(66,234,255,0.9)]'
            }`}
        >
          {isSurging ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>CORE REACTOR SURGING // TRANSHUMAN IGNITION</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-black" />
              <span>IGNITE CIVILIZATION CORE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </>
          )}
        </button>

        {/* Terminal Key Access Bar */}
        <div className="w-100 max-w-md p-3 bg-[#091426]/90 border border-[#42EAFF]/30 rounded-lg backdrop-blur-xl shadow-xl">
          <div className="text-[10px] font-mono text-[#546575] text-uppercase tracking-wider mb-2 d-flex align-items-center justify-content-between">
            <span>REQUEST PROTOCOL CREDENTIALS</span>
            <span className="text-[#42EAFF]">SEC: QUANTUM</span>
          </div>

          {!isGranted ? (
            <form onSubmit={handleRequestAccess} className="d-flex gap-2">
              <input
                type="text"
                placeholder="ENTER BIOMETRIC-ID OR EMAIL..."
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="flex-grow-1 bg-[#050812] border border-[#42EAFF]/30 text-xs font-mono text-[#42EAFF] px-3 py-2 rounded focus:outline-none focus:border-[#42EAFF]"
              />
              <button
                type="submit"
                className="btn-cyber-secondary !py-2 !px-3 text-xs font-mono"
              >
                REQUEST
              </button>
            </form>
          ) : (
            <div className="p-2 bg-[#00F5A0]/15 border border-[#00F5A0]/40 rounded text-xs font-mono text-[#00F5A0] d-flex align-items-center justify-content-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              <span>ACCREDITED // CHECK QUANTUM TERMINAL</span>
            </div>
          )}
        </div>

        {/* Bottom Transmission Tag */}
        <div className="text-center text-[10px] font-mono text-[#546575] pt-4 mt-2">
          PROJECT E.V.O. // ARCHIVE // TRANSHUMAN CONVERGENCE
        </div>

      </div>
    </section>
  );
}
