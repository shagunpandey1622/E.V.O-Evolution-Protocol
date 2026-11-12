import React, { useState } from 'react';
import { TECH_PILLARS } from '../data/upgrades';
import { cyberAudio } from '../utils/audio';

export default function Technology() {
  const [activeTab, setActiveTab] = useState(0);

  const techImages = [
    '/assets/neural-core.jpg',
    '/assets/ocular-matrix.jpg',
    '/assets/robotic-limb.jpg',
    '/assets/evolution-chamber.jpg'
  ];

  const currentPillar = TECH_PILLARS[activeTab] || TECH_PILLARS[0];

  const handleSelectTab = (idx) => {
    cyberAudio.playClick();
    setActiveTab(idx);
  };

  return (
    <section id="technology" className="evo-section select-none">
      <div className="container position-relative z-10 d-flex flex-column justify-content-between my-auto">
        
        {/* Section Header Card */}
        <div className="evo-glass-panel mb-4 p-3 p-md-4">
          <div className="row align-items-center justify-content-between g-3">
            <div className="col-12 col-md-6">
              <div className="sub-headline-evo">
                <span className="w-2 h-2 rounded-full bg-[#42EAFF] animate-pulse" />
                <span>LOCATION 04 // MONUMENTAL INSTALLATIONS</span>
              </div>
              <h2 className="section-heading-evo mb-0">
                TECHNOLOGY ARCHIVE
              </h2>
            </div>

            {/* Navigation Pill Selectors */}
            <div className="col-12 col-md-6 d-flex flex-wrap gap-2 justify-content-md-end">
              {TECH_PILLARS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectTab(idx)}
                  onMouseEnter={() => cyberAudio.playHover()}
                  className={`px-3 py-1.5 rounded font-mono text-xs tracking-wider text-uppercase transition-all cursor-pointer ${
                    activeTab === idx
                      ? 'bg-[#42EAFF] text-black fw-bold shadow-[0_0_15px_rgba(66,234,255,0.4)]'
                      : 'bg-[#091426]/80 text-[#8899A6] border border-white/10 hover:text-white hover:border-[#42EAFF]/40'
                  }`}
                >
                  0{idx + 1}. {p.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Large Cinematic Showcase Viewport */}
        <div className="position-relative w-100 rounded-lg overflow-hidden border border-[#42EAFF]/30 shadow-[0_0_50px_rgba(66,234,255,0.15)] my-auto group" style={{ minHeight: '440px', maxHeight: '620px' }}>
          
          {/* Full-Bleed Large Visual Environment */}
          <img
            src={techImages[activeTab]}
            alt={currentPillar.title}
            className="w-100 h-100 object-cover object-center filter brightness-[0.7] contrast-[1.15] scale-100 group-hover:scale-105 transition-transform duration-1000"
          />

          {/* Vignette */}
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-t from-[#050812] via-[#050812]/20 to-transparent pointer-events-none" />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-r from-[#050812]/90 via-transparent to-[#050812]/40 pointer-events-none" />

          {/* Overlay Content with Bootstrap Row */}
          <div className="position-absolute bottom-0 start-0 end-0 p-3 p-sm-4 p-md-5 z-20">
            <div className="row g-4 align-items-end justify-content-between">
              
              <div className="col-12 col-lg-8 space-y-2">
                <div className="d-inline-flex align-items-center gap-2 px-2.5 py-1 rounded bg-[#42EAFF]/15 border border-[#42EAFF]/40 text-[#42EAFF] font-mono text-xs text-uppercase tracking-widest backdrop-blur-md">
                  <span>{currentPillar.code}</span>
                  <span>//</span>
                  <span>{currentPillar.category}</span>
                </div>

                <h3 className="section-heading-evo mb-0 text-white drop-shadow-md">
                  {currentPillar.title}
                </h3>

                <div className="font-mono text-xs sm:text-sm text-[#42EAFF] tracking-wide">
                  "{currentPillar.tagline}"
                </div>

                <p className="lead-text-evo text-xs sm:text-sm text-[#C4D1DF] max-w-xl mb-0 drop-shadow">
                  {currentPillar.description}
                </p>
              </div>

              {/* Hardware Telemetry Box */}
              <div className="col-12 col-lg-4">
                <div className="evo-glass-panel p-3 font-mono text-xs shadow-xl">
                  <div className="text-[10px] text-[#546575] text-uppercase tracking-widest border-bottom border-[#42EAFF]/20 pb-1 mb-2">
                    HARDWARE BENCHMARKS
                  </div>

                  {currentPillar.specs.map((s, idx) => (
                    <div key={idx} className="d-flex justify-content-between align-items-center py-0.5">
                      <span className="text-[#8899A6]">{s.label}:</span>
                      <span className="fw-bold text-white" style={{ color: currentPillar.accent }}>
                        {s.val}
                      </span>
                    </div>
                  ))}

                  <div className="pt-2 border-top border-[#42EAFF]/15 text-[10px] text-[#546575] mt-2">
                    ARCHITECTURE: {currentPillar.architecture}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="pt-3 border-top border-[#42EAFF]/15 d-flex align-items-center justify-content-between text-[11px] font-mono text-[#546575] mt-3">
          <span>LOCATION 04 // PROPRIETARY INSTALLATIONS</span>
          <span>STABILITY: MAXIMUM</span>
        </div>

      </div>
    </section>
  );
}
