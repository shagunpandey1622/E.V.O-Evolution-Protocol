import React, { useState } from 'react';
import { RotateCcw, Check, Zap, Sparkles } from 'lucide-react';
import { LAB_MODULES } from '../data/upgrades';
import { cyberAudio } from '../utils/audio';

export default function AugmentationLab({ onSelectModule }) {
  const [selectedId, setSelectedId] = useState('neural');
  const [activated, setActivated] = useState({
    neural: true,
    vision: false,
    limbs: false,
    reflexes: false
  });
  const [isActivating, setIsActivating] = useState(false);

  const activeMod = LAB_MODULES.find((m) => m.id === selectedId) || LAB_MODULES[0];

  const componentImages = {
    neural: '/assets/neural-core.jpg',
    vision: '/assets/ocular-matrix.jpg',
    limbs: '/assets/robotic-limb.jpg',
    reflexes: '/assets/evolution-chamber.jpg'
  };

  const handleSelect = (id) => {
    cyberAudio.playClick();
    setSelectedId(id);
    if (onSelectModule) onSelectModule(id);
  };

  const handleActivate = () => {
    cyberAudio.playActivation();
    setIsActivating(true);
    setTimeout(() => {
      setActivated((prev) => ({ ...prev, [selectedId]: true }));
      setIsActivating(false);
    }, 600);
  };

  const handleReset = () => {
    cyberAudio.playClick();
    setActivated({ neural: false, vision: false, limbs: false, reflexes: false });
  };

  const activeCount = Object.values(activated).filter(Boolean).length;
  const synergyRate = Math.min(100, Math.round(58 + activeCount * 10.5));

  return (
    <section id="chamber" className="evo-section select-none">
      <div className="container position-relative z-10 d-flex flex-column justify-content-between my-auto">

        {/* Section Header Card with Bootstrap Grid */}
        <div className="evo-glass-panel mb-4 p-3 p-md-4">
          <div className="row align-items-center justify-content-between g-3">
            <div className="col-12 col-md-7">
              <div className="sub-headline-evo">
                <span className="w-2 h-2 rounded-full bg-[#42EAFF] animate-pulse" />
                <span>LOCATION 02 // STASIS ARCHITECTURE</span>
              </div>
              <h2 className="section-heading-evo mb-0">
                THE EVOLUTION CHAMBER
              </h2>
            </div>

            <div className="col-12 col-md-5 d-flex align-items-center justify-content-md-end gap-3 font-mono text-xs">
              <div>
                <span className="text-[10px] text-[#546575] text-uppercase d-block">SYNTHESIS</span>
                <span className="text-[#42EAFF] fw-bold text-sm">{synergyRate}%</span>
              </div>
              <div className="vr bg-[#42EAFF] opacity-25" style={{ height: '24px' }} />
              <div>
                <span className="text-[10px] text-[#546575] text-uppercase d-block">MODULES</span>
                <span className="text-white fw-bold text-sm">{activeCount} / 4</span>
              </div>
              <div className="vr bg-[#42EAFF] opacity-25" style={{ height: '24px' }} />
              <button
                onClick={handleReset}
                onMouseEnter={() => cyberAudio.playHover()}
                className="text-[#8899A6] hover:text-[#42EAFF] border border-[#8899A6]/30 hover:border-[#42EAFF] p-2 rounded transition-colors"
                title="Reset All Augmentations"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Workspace: Responsive Bootstrap Columns */}
        <div className="row align-items-center g-4 my-auto">

          {/* Left Column: 4 Augmentation Control Stations */}
          <div className="col-12 col-lg-5 order-2 order-lg-1">
            <div className="text-[10px] font-mono tracking-widest text-[#546575] text-uppercase mb-2">
              [ HOLOGRAPHIC STATIONS // SELECT TO ENGAGE ]
            </div>

            <div className="d-flex flex-column gap-2.5">
              {LAB_MODULES.map((mod) => {
                const isSel = mod.id === selectedId;
                const isAct = activated[mod.id];

                return (
                  <div
                    key={mod.id}
                    onClick={() => handleSelect(mod.id)}
                    onMouseEnter={() => cyberAudio.playHover()}
                    className={`p-3 rounded border backdrop-blur-xl cursor-pointer transition-all duration-300 ${isSel
                        ? 'bg-[#091426]/90 border-[#42EAFF] shadow-[0_0_20px_rgba(66,234,255,0.3)] translate-x-2'
                        : 'bg-[#050812]/75 border-white/10 hover:border-[#42EAFF]/40'
                      }`}
                    style={{
                      borderLeftWidth: isSel ? '4px' : '1px',
                      borderLeftColor: isSel ? mod.accentColor : undefined
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span className="text-[10px] font-mono text-[#8899A6]">{mod.code}</span>
                      {isAct && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00F5A0]/20 text-[#00F5A0] border border-[#00F5A0]/40">
                          SYNCHRONIZED
                        </span>
                      )}
                    </div>
                    <div className="font-heading fw-bold text-sm sm:text-base text-white tracking-wide">
                      {mod.name}
                    </div>
                    <div className="text-xs font-mono text-[#8899A6] mt-0.5">
                      {mod.shortDesc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Callout: Focus on 3D Specimen */}
          <div className="col-12 col-lg-2 d-none d-lg-flex flex-column align-items-center justify-content-center text-center font-mono text-[10px] text-[#42EAFF] order-1 order-lg-2">
            <div className="p-3 bg-black/60 border border-[#42EAFF]/30 rounded backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#42EAFF] animate-ping d-inline-block mb-1" />
              <div>STASIS SPECIMEN</div>
              <div className="text-[#8899A6]">IN 3D VIEWPORT</div>
            </div>
          </div>

          {/* Right Column: Physical Component Telemetry & Activation */}
          <div className="col-12 col-lg-5 order-3 space-y-3">

            {/* Component Image */}
            <div className="position-relative rounded-lg overflow-hidden border border-[#42EAFF]/40 aspect-video bg-black/80 shadow-lg group">
              <img
                src={componentImages[selectedId]}
                alt={activeMod.name}
                className="w-100 h-100 object-cover object-center filter contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-t from-[#050812] via-transparent to-transparent pointer-events-none" />
              <div className="position-absolute top-2 start-2 px-2 py-0.5 rounded bg-black/70 border border-[#42EAFF]/40 text-[9px] font-mono text-[#42EAFF] backdrop-blur-md">
                COMPONENT TELEMETRY: {activeMod.category}
              </div>
            </div>

            {/* Hardware Readouts */}
            <div className="evo-glass-panel p-3 font-mono text-xs shadow-xl">
              <div className="text-[10px] text-[#546575] text-uppercase tracking-widest border-bottom border-[#42EAFF]/15 pb-1 mb-2">
                BENCHMARKS // {activeMod.name.toUpperCase()}
              </div>

              {activeMod.specs.map((s, idx) => (
                <div key={idx} className="d-flex justify-content-between align-items-center py-0.5">
                  <span className="text-[#8899A6]">{s.label}:</span>
                  <span className="fw-bold text-white" style={{ color: activeMod.accentColor }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            {/* ACTIVATE UPGRADE CTA */}
            <button
              onClick={handleActivate}
              disabled={isActivating || activated[selectedId]}
              onMouseEnter={() => cyberAudio.playHover()}
              className={`w-100 py-3 px-4 font-heading text-xs fw-bold tracking-[0.25em] text-uppercase rounded transition-all d-flex align-items-center justify-content-center gap-2 cursor-pointer shadow-lg ${activated[selectedId]
                  ? 'bg-[#00F5A0]/20 text-[#00F5A0] border border-[#00F5A0]/50'
                  : isActivating
                    ? 'bg-[#42EAFF]/30 text-white animate-pulse'
                    : 'btn-cyber-primary'
                }`}
            >
              {activated[selectedId] ? (
                <>
                  <Check className="w-4 h-4 text-[#00F5A0]" />
                  <span>UPGRADE HARMONIZED // ACTIVE</span>
                </>
              ) : isActivating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-black" />
                  <span>SYNCHRONIZING WITH STASIS FIELD...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>ACTIVATE UPGRADE</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* Bottom Status */}
        <div className="pt-4 border-top border-[#42EAFF]/15 d-flex align-items-center justify-content-between text-[11px] font-mono text-[#546575] mt-4">
          <span>LOCATION 02 // CORTICAL PROTOCOL</span>
          <span>STASIS COHERENCE: OPTIMAL</span>
        </div>

      </div>
    </section>
  );
}
