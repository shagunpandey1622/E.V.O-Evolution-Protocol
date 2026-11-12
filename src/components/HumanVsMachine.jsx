import React, { useState } from 'react';
import { ArrowLeftRight, Info } from 'lucide-react';
import { COMPARISON_METRICS } from '../data/upgrades';

export default function HumanVsMachine() {
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100 percentage

  const handleSliderChange = (e) => {
    setSliderPos(Number(e.target.value));
  };

  return (
    <section id="metamorphosis" className="evo-section select-none">
      <div className="container position-relative z-10 d-flex flex-column justify-content-between my-auto">

        {/* Section Header */}
        <div className="evo-glass-panel text-center max-w-2xl mx-auto mb-4 p-3 p-md-4">
          <div className="sub-headline-evo justify-content-center">
            LOCATION 05 // TRANSFORMATION FACILITY
          </div>
          <h2 className="section-heading-evo mb-1">
            METAMORPHOSIS FACILITY
          </h2>
          <p className="text-xs font-mono text-[#8899A6] tracking-wider text-uppercase mb-0">
            Drag the transformation divider to reveal internal cybernetics
          </p>
        </div>

        {/* Central Dramatic Interactive Transformation Viewport */}
        <div className="position-relative w-100 max-w-5xl mx-auto rounded-lg overflow-hidden border border-[#42EAFF]/40 shadow-[0_0_60px_rgba(66,234,255,0.2)] bg-black my-auto select-none" style={{ minHeight: '320px', aspectRatio: '21/9' }}>

          {/* Base Layer: Cybernetic Machine Endoskeleton */}
          <div className="position-absolute top-0 start-0 w-100 h-100">
            <img
              src="/assets/human-vs-machine.jpg"
              alt="Cybernetic Machine Endoskeleton"
              className="w-100 h-100 object-cover object-center filter contrast-125 brightness-90"
            />
            {/* Machine Side Tag */}
            <div className="position-absolute top-3 end-3 z-10 px-2.5 py-1 rounded bg-black/75 border border-[#42EAFF]/40 text-[#42EAFF] font-mono text-[10px] sm:text-xs tracking-widest text-uppercase backdrop-blur-md">
              SYNTHETIC MACHINE ARCHITECTURE
            </div>
          </div>

          {/* Top Layer: Organic Human Silhouette (Revealed via Clip-Path) */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100 transition-none"
            style={{
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
            }}
          >
            <img
              src="/assets/human-vs-machine-split.jpg"
              alt="Biological Human Silhouette"
              className="w-100 h-100 object-cover object-center filter contrast-110 brightness-85"
            />
            {/* Human Side Tag */}
            <div className="position-absolute top-3 start-3 z-10 px-2.5 py-1 rounded bg-black/75 border border-white/30 text-white font-mono text-[10px] sm:text-xs tracking-widest text-uppercase backdrop-blur-md">
              ORGANIC BIOLOGICAL BASELINE
            </div>
          </div>

          {/* Divider Line in Center */}
          <div
            className="position-absolute top-0 bottom-0 bg-[#42EAFF] shadow-[0_0_20px_#42EAFF] pointer-events-none z-20"
            style={{ left: `${sliderPos}%`, width: '2px' }}
          >
            <div className="position-absolute top-50 start-50 translate-middle w-8 h-8 rounded-full bg-[#050812] border-2 border-[#42EAFF] d-flex align-items-center justify-content-center text-[#42EAFF] shadow-[0_0_15px_#42EAFF]">
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Invisible Range Input Overlay */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={handleSliderChange}
            className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-ew-resize z-30"
            title="Drag left or right to inspect transition"
          />

          {/* Bottom Live Telemetry Overlay */}
          <div className="position-absolute bottom-3 inset-x-3 z-20 p-2.5 bg-[#050812]/85 backdrop-blur-md rounded border border-white/10 d-flex align-items-center justify-content-between font-mono text-[10px] sm:text-xs">
            <span className="text-[#8899A6]">ORGANIC BIOLOGY: {100 - sliderPos}%</span>
            <span className="text-[#42EAFF] fw-bold">
              {sliderPos === 50 ? '50/50 CONVERGENCE' : `${sliderPos}% CYBERNETIC`}
            </span>
            <span className="text-[#987BFF]">SYNTHETIC TITANIUM: {sliderPos}%</span>
          </div>

        </div>

        {/* 5 Minimal Telemetry Metric Readouts with Bootstrap Grid */}
        <div className="row g-2 max-w-5xl mx-auto w-100 mt-3 justify-content-center">
          {COMPARISON_METRICS.map((m) => {
            const currentScore = Math.round(m.human.score + ((m.augmented.score - m.human.score) * (sliderPos / 100)));
            return (
              <div key={m.category} className="col-6 col-sm-4 col-md">
                <div className="p-2.5 bg-[#091426]/75 border border-[#42EAFF]/15 rounded font-mono text-xs space-y-1 h-100">
                  <div className="text-[10px] text-[#546575] text-uppercase">{m.category}</div>
                  <div className="text-[#42EAFF] fw-bold text-sm">{currentScore}%</div>
                  <div className="w-100 bg-[#050812] rounded-full overflow-hidden" style={{ height: '4px' }}>
                    <div
                      className="h-100 bg-gradient-to-r from-white to-[#42EAFF]"
                      style={{ width: `${currentScore}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* In-world Disclaimer */}
        <div className="text-center text-[10px] font-mono text-[#546575] mt-3 d-flex align-items-center justify-content-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#42EAFF]" />
          <span>Fictional demonstration telemetry for E.V.O. Protocol simulation.</span>
        </div>

      </div>
    </section>
  );
}
