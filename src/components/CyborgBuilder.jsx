import React, { useState } from 'react';
import { Cpu, Eye, Shield, Zap, RefreshCw, Copy, Check, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BUILDER_OPTIONS } from '../data/upgrades';
import { cyberAudio } from '../utils/audio';

export default function CyborgBuilder() {
  const [codename, setCodename] = useState('NEXUS-09');
  const [selectedNeural, setSelectedNeural] = useState(BUILDER_OPTIONS.neural[0].id);
  const [selectedVision, setSelectedVision] = useState(BUILDER_OPTIONS.vision[1].id);
  const [selectedMechanical, setSelectedMechanical] = useState(BUILDER_OPTIONS.mechanical[0].id);
  const [selectedReflex, setSelectedReflex] = useState(BUILDER_OPTIONS.reflex[0].id);

  const [generatedProfile, setGeneratedProfile] = useState(null);
  const [copied, setCopied] = useState(false);

  const activeNeural = BUILDER_OPTIONS.neural.find((o) => o.id === selectedNeural);
  const activeVision = BUILDER_OPTIONS.vision.find((o) => o.id === selectedVision);
  const activeMechanical = BUILDER_OPTIONS.mechanical.find((o) => o.id === selectedMechanical);
  const activeReflex = BUILDER_OPTIONS.reflex.find((o) => o.id === selectedReflex);

  const cognitiveBandwidth = 120 + (activeNeural?.statMods.cognitive || 0) + (activeVision?.statMods.cognitive || 0);
  const kineticForce = 850 + ((activeMechanical?.statMods.kinetic || 0) * 18);
  const reactionLatency = Math.max(1.2, 45 + (activeReflex?.statMods.latency || -20));
  const neuralIntegrity = Math.min(100, Math.round(((activeNeural?.statMods.integrity || 95) + (activeMechanical?.statMods.integrity || 95)) / 2));

  const randomCodenames = ['VEX-404', 'AETHEL-CORE', 'VALKYRIE-X', 'KAI-OMEGA', 'SOLARIS-07', 'CHRONO-PULSE', 'TITAN-NINE'];

  const handleRandomize = () => {
    cyberAudio.playClick();
    setCodename(randomCodenames[Math.floor(Math.random() * randomCodenames.length)]);
  };

  const handleGenerate = () => {
    cyberAudio.playActivation();
    let classification = 'Class-IV Apex Synthetica';
    if (activeMechanical?.id === 'nanotech-myomer') classification = 'Titan Heavy Vanguard Mk-II';
    else if (activeVision?.id === 'chrono-vector') classification = 'Chrono Tactical Infiltrator';
    else if (activeNeural?.id === 'subzero-cognition') classification = 'Quantum Hyper-Cognitive Operator';

    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const uniqueId = `EVO-${randomHex}-${codename.substring(0, 3).toUpperCase()}`;

    setGeneratedProfile({
      name: codename || 'EVO-OPERATIVE',
      uniqueId,
      classification,
      modules: {
        neural: activeNeural?.name,
        vision: activeVision?.name,
        mechanical: activeMechanical?.name,
        reflex: activeReflex?.name
      },
      stats: {
        bandwidth: `${cognitiveBandwidth} TB/s`,
        force: `${kineticForce} N·m`,
        latency: `${reactionLatency.toFixed(1)} ms`,
        integrity: `${neuralIntegrity}%`
      },
      summary: `High-order cybernetic synthesis fusing ${activeNeural?.name} with ${activeMechanical?.name}. Engineered for sub-millisecond neural transmission (${reactionLatency.toFixed(1)}ms) and multi-spectral environmental dominance. Conforms to E.V.O. planetary transhuman standards.`
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#42EAFF', '#987BFF', '#2EE5D4', '#FFFFFF']
      });
    } catch { }
  };

  const handleCopy = () => {
    if (!generatedProfile) return;
    cyberAudio.playClick();
    const txt = `=== PROJECT E.V.O. CYBORG DOSSIER ===
ID: ${generatedProfile.uniqueId}
IDENTITY: ${generatedProfile.name}
CLASSIFICATION: ${generatedProfile.classification}
NEURAL: ${generatedProfile.modules.neural}
VISION: ${generatedProfile.modules.vision}
MECHANICAL: ${generatedProfile.modules.mechanical}
REFLEX: ${generatedProfile.modules.reflex}
=======================================`;
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="genesis" className="evo-section select-none">
      <div className="container position-relative z-10 d-flex flex-column justify-content-between my-auto">

        {/* Section Header */}
        <div className="evo-glass-panel text-center max-w-2xl mx-auto mb-4 p-3 p-md-4">
          <div className="sub-headline-evo justify-content-center">
            LOCATION 03 // GENESIS ENGINE
          </div>
          <h2 className="section-heading-evo mb-1">
            CYBORG CREATION TERMINAL
          </h2>
          <p className="text-xs font-mono text-[#8899A6] tracking-wider text-uppercase mb-0">
            Biomechanical Identity Forge // Sector 03
          </p>
        </div>

        {/* 2-Column Interface with Bootstrap Grid */}
        <div className="row g-4 items-start">

          {/* Controls: 4 Categories (Col 7) */}
          <div className="col-12 col-lg-7 space-y-3">

            {/* Identity Codename Input Bar */}
            <div className="evo-glass-panel p-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
              <span className="text-xs font-mono text-[#8899A6] text-uppercase tracking-widest">
                CYBORG DESIGNATION:
              </span>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="text"
                  value={codename}
                  onChange={(e) => setCodename(e.target.value.toUpperCase())}
                  maxLength={14}
                  className="bg-[#050812] border border-[#42EAFF]/40 text-[#42EAFF] font-mono fw-bold text-xs sm:text-sm px-3 py-1.5 rounded focus:outline-none focus:border-[#42EAFF] text-center text-uppercase"
                  style={{ width: '150px' }}
                />
                <button
                  onClick={handleRandomize}
                  title="Generate Random Codename"
                  className="p-2 bg-[#42EAFF]/10 border border-[#42EAFF]/30 hover:bg-[#42EAFF]/25 text-[#42EAFF] rounded transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category 1: Neural */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-[#8899A6] text-uppercase tracking-widest d-flex align-items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#42EAFF]" />
                <span>01. NEURAL ARCHITECTURE</span>
              </div>
              <div className="row g-2">
                {BUILDER_OPTIONS.neural.map((opt) => (
                  <div key={opt.id} className="col-12 col-sm-4">
                    <div
                      onClick={() => {
                        cyberAudio.playClick();
                        setSelectedNeural(opt.id);
                      }}
                      className={`p-2.5 rounded border backdrop-blur-xl cursor-pointer transition-all h-100 ${selectedNeural === opt.id
                          ? 'bg-[#091426] border-[#42EAFF] shadow-[0_0_15px_rgba(66,234,255,0.25)]'
                          : 'bg-[#050812]/75 border-white/10 hover:border-[#42EAFF]/40'
                        }`}
                    >
                      <div className="d-flex justify-content-between text-[10px] font-mono text-[#8899A6] mb-1">
                        <span>{opt.tier}</span>
                        <span className="text-[#42EAFF] fw-bold">{opt.bonus}</span>
                      </div>
                      <div className="font-heading fw-bold text-xs text-white">{opt.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 2: Vision */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-[#8899A6] text-uppercase tracking-widest d-flex align-items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-[#987BFF]" />
                <span>02. OPTICAL SENSOR MATRIX</span>
              </div>
              <div className="row g-2">
                {BUILDER_OPTIONS.vision.map((opt) => (
                  <div key={opt.id} className="col-12 col-sm-4">
                    <div
                      onClick={() => {
                        cyberAudio.playClick();
                        setSelectedVision(opt.id);
                      }}
                      className={`p-2.5 rounded border backdrop-blur-xl cursor-pointer transition-all h-100 ${selectedVision === opt.id
                          ? 'bg-[#091426] border-[#987BFF] shadow-[0_0_15px_rgba(152,123,255,0.25)]'
                          : 'bg-[#050812]/75 border-white/10 hover:border-[#987BFF]/40'
                        }`}
                    >
                      <div className="d-flex justify-content-between text-[10px] font-mono text-[#8899A6] mb-1">
                        <span>{opt.tier}</span>
                        <span className="text-[#987BFF] fw-bold">{opt.bonus}</span>
                      </div>
                      <div className="font-heading fw-bold text-xs text-white">{opt.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 3: Mechanical */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-[#8899A6] text-uppercase tracking-widest d-flex align-items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-[#2EE5D4]" />
                <span>03. MECHANICAL EXOSKELETON</span>
              </div>
              <div className="row g-2">
                {BUILDER_OPTIONS.mechanical.map((opt) => (
                  <div key={opt.id} className="col-12 col-sm-4">
                    <div
                      onClick={() => {
                        cyberAudio.playClick();
                        setSelectedMechanical(opt.id);
                      }}
                      className={`p-2.5 rounded border backdrop-blur-xl cursor-pointer transition-all h-100 ${selectedMechanical === opt.id
                          ? 'bg-[#091426] border-[#2EE5D4] shadow-[0_0_15px_rgba(46,229,212,0.25)]'
                          : 'bg-[#050812]/75 border-white/10 hover:border-[#2EE5D4]/40'
                        }`}
                    >
                      <div className="d-flex justify-content-between text-[10px] font-mono text-[#8899A6] mb-1">
                        <span>{opt.tier}</span>
                        <span className="text-[#2EE5D4] fw-bold">{opt.bonus}</span>
                      </div>
                      <div className="font-heading fw-bold text-xs text-white">{opt.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 4: Reflex */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono text-[#8899A6] text-uppercase tracking-widest d-flex align-items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#FFB347]" />
                <span>04. SPINAL AUTONOMIC RELAY</span>
              </div>
              <div className="row g-2">
                {BUILDER_OPTIONS.reflex.map((opt) => (
                  <div key={opt.id} className="col-12 col-sm-4">
                    <div
                      onClick={() => {
                        cyberAudio.playClick();
                        setSelectedReflex(opt.id);
                      }}
                      className={`p-2.5 rounded border backdrop-blur-xl cursor-pointer transition-all h-100 ${selectedReflex === opt.id
                          ? 'bg-[#091426] border-[#FFB347] shadow-[0_0_15px_rgba(255,179,71,0.25)]'
                          : 'bg-[#050812]/75 border-white/10 hover:border-[#FFB347]/40'
                        }`}
                    >
                      <div className="d-flex justify-content-between text-[10px] font-mono text-[#8899A6] mb-1">
                        <span>{opt.tier}</span>
                        <span className="text-[#FFB347] fw-bold">{opt.bonus}</span>
                      </div>
                      <div className="font-heading fw-bold text-xs text-white">{opt.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleGenerate}
              onMouseEnter={() => cyberAudio.playHover()}
              className="btn-cyber-primary w-100 py-3 text-xs fw-bold tracking-[0.2em] text-uppercase mt-2 shadow-xl"
            >
              <Sparkles className="w-4 h-4" />
              <span>SYNTHESIZE CYBORG PROFILE</span>
            </button>

          </div>

          {/* Right Column: Specimen Preview & Generated Dossier (Col 5) */}
          <div className="col-12 col-lg-5 space-y-3">

            {/* Visual Specimen Preview */}
            <div className="position-relative rounded-lg overflow-hidden border border-[#42EAFF]/40 bg-[#091426]/90 shadow-[0_0_40px_rgba(66,234,255,0.15)] group backdrop-blur-xl aspect-square">
              <img
                src="/assets/hero-cyborg-cinematic.jpg"
                alt="Custom Specimen Preview"
                className="w-100 h-100 object-cover object-top filter contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-t from-[#050812] via-transparent to-transparent pointer-events-none" />
              <div className="position-absolute top-3 start-3 px-2.5 py-1 rounded bg-black/70 border border-[#42EAFF]/30 text-[10px] font-mono text-[#42EAFF] backdrop-blur-md">
                SPECIMEN ID: {codename}
              </div>

              {/* Dynamic Telemetry Overlay at Bottom */}
              <div className="position-absolute bottom-3 inset-x-3 p-2.5 bg-[#050812]/90 backdrop-blur-md rounded border border-white/10 font-mono text-[10px] sm:text-[11px] row g-2 m-0">
                <div className="col-6">
                  <span className="text-[#546575] d-block text-[9px]">BANDWIDTH</span>
                  <span className="text-[#42EAFF] fw-bold">{cognitiveBandwidth} TB/s</span>
                </div>
                <div className="col-6">
                  <span className="text-[#546575] d-block text-[9px]">FORCE</span>
                  <span className="text-[#2EE5D4] fw-bold">{kineticForce} N·m</span>
                </div>
                <div className="col-6">
                  <span className="text-[#546575] d-block text-[9px]">REACTION</span>
                  <span className="text-[#FFB347] fw-bold">{reactionLatency.toFixed(1)} ms</span>
                </div>
                <div className="col-6">
                  <span className="text-[#546575] d-block text-[9px]">INTEGRITY</span>
                  <span className="text-[#987BFF] fw-bold">{neuralIntegrity}%</span>
                </div>
              </div>
            </div>

            {/* Generated Official Dossier Output */}
            {generatedProfile && (
              <div className="evo-glass-panel p-3 border-[#42EAFF] shadow-[0_0_30px_rgba(66,234,255,0.25)] animate-fadeIn">
                <div className="d-flex justify-content-between align-items-center pb-2 border-bottom border-[#42EAFF]/20 mb-2">
                  <div className="d-flex align-items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#42EAFF]" />
                    <span className="font-heading fw-bold text-xs text-white">E.V.O. DOSSIER // ACCREDITED</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#42EAFF]">{generatedProfile.uniqueId}</span>
                </div>

                <div className="font-heading fw-black text-base text-white mb-0.5">{generatedProfile.name}</div>
                <div className="font-mono text-xs text-[#987BFF] mb-2">{generatedProfile.classification}</div>

                <button
                  onClick={handleCopy}
                  className="w-100 btn-cyber-secondary !py-2 !text-xs font-mono d-flex align-items-center justify-content-center gap-2"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#00F5A0]" /> : <Copy className="w-3.5 h-3.5 text-[#42EAFF]" />}
                  <span>{copied ? 'DOSSIER COPIED' : 'COPY DOSSIER'}</span>
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
