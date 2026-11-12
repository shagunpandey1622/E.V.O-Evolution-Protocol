import React, { useState } from 'react';
import { Radio } from 'lucide-react';
import { TIMELINE_STAGES } from '../data/upgrades';
import { cyberAudio } from '../utils/audio';

export default function EvolutionTimeline() {
  const [activeStageIdx, setActiveStageIdx] = useState(3); // 04 - Beyond Human by default

  const activeStage = TIMELINE_STAGES[activeStageIdx];

  const handleStageClick = (idx) => {
    cyberAudio.playClick();
    setActiveStageIdx(idx);
  };

  return (
    <section id="chronicles" className="evo-section select-none">
      <div className="container position-relative z-10 d-flex flex-column justify-content-between my-auto">

        {/* Section Header Card */}
        <div className="evo-glass-panel mb-4 p-3 p-md-4">
          <div className="row align-items-center justify-content-between g-3">
            <div className="col-12 col-md-8">
              <div className="sub-headline-evo">
                <span className="w-2 h-2 rounded-full bg-[#42EAFF] animate-pulse" />
                <span>LOCATION 06 // MONUMENTAL CHRONOLOGY</span>
              </div>
              <h2 className="section-heading-evo mb-0">
                EVOLUTION CHRONICLES
              </h2>
            </div>

            <div className="col-12 col-md-4 d-flex align-items-center justify-content-md-end gap-2">
              <Radio className="w-3.5 h-3.5 text-[#2EE5D4] animate-pulse" />
              <span className="text-xs font-mono text-[#2EE5D4]">CHRONOLOGICAL SPIRE </span>
            </div>
          </div>
        </div>

        {/* 4 Stage Milestones with Bootstrap Grid */}
        <div className="row g-2 g-md-3 mb-4">
          {TIMELINE_STAGES.map((s, idx) => {
            const isAct = activeStageIdx === idx;
            return (
              <div key={s.step} className="col-6 col-lg-3">
                <div
                  onClick={() => handleStageClick(idx)}
                  onMouseEnter={() => cyberAudio.playHover()}
                  className={`p-3 rounded border backdrop-blur-xl cursor-pointer transition-all duration-300 h-100 ${isAct
                      ? 'bg-[#091426]/90 border-[#42EAFF] shadow-[0_0_20px_rgba(66,234,255,0.3)] -translate-y-1'
                      : 'bg-[#050812]/75 border-white/10 hover:border-[#42EAFF]/40'
                    }`}
                >
                  <div className="d-flex justify-content-between align-items-center text-xs font-mono mb-1.5">
                    <span className={`fw-bold ${isAct ? 'text-[#42EAFF]' : 'text-[#8899A6]'}`}>
                      ERA {s.step}
                    </span>
                    <span className="text-[10px] text-[#546575]">{s.year}</span>
                  </div>
                  <div className="font-heading fw-bold text-xs sm:text-sm text-white mb-1">
                    {s.title}
                  </div>
                  <div className="text-[11px] font-mono text-[#8899A6] text-truncate">
                    {s.tagline}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Era Spotlight View */}
        <div className="evo-glass-panel p-3 p-sm-4 p-md-5 shadow-2xl my-auto">
          <div className="max-w-3xl space-y-3">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded bg-[#42EAFF]/15 border border-[#42EAFF]/30 text-[#42EAFF] font-mono text-xs text-uppercase tracking-widest">
              <span>ERA {activeStage.step} // {activeStage.year}</span>
            </div>

            <h3 className="section-heading-evo mb-0 text-white">
              {activeStage.title}
            </h3>

            <div className="font-mono text-xs sm:text-sm text-[#42EAFF]">
              {activeStage.tagline}
            </div>

            <p className="lead-text-evo text-xs sm:text-base text-[#C4D1DF] mb-2">
              {activeStage.desc}
            </p>

            <div className="p-3 bg-black/60 border border-white/10 rounded font-mono text-xs text-[#8899A6] max-w-xl">
              <span className="text-white fw-bold d-block mb-1">HISTORICAL PROTOCOL MILESTONE:</span>
              {activeStage.milestone}
            </div>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="pt-3 border-top border-[#42EAFF]/15 d-flex align-items-center justify-content-between text-[11px] font-mono text-[#546575] mt-3">
          <span>LOCATION 06 // CONVERGENCE CHRONOLOGY</span>
          <span>STAGE: TRANSHUMAN ACHIEVED</span>
        </div>

      </div>
    </section>
  );
}
