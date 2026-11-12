import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

export default function Hero({ onEnterEvolution }) {
  const [coords] = useState({ lat: '20.4900° N', lon: '107.0722° E' });

  const handleEnterEvolution = () => {
    cyberAudio.playActivation();
    onEnterEvolution();
  };

  return (
    <section
      id="awakening"
      className="evo-section select-none overflow-hidden"
    >
      {/* Vignette Layer */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-t from-[#050812] via-transparent to-[#050812]/50 pointer-events-none" />
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-[radial-gradient(circle_at_center,transparent_45%,#050812_85%)] pointer-events-none" />

      {/* Cybernetic Humanoid Specimen Visual Layer */}
      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center pointer-events-none z-[5]">
        <div className="position-relative w-100 h-100 d-flex align-items-end justify-content-center px-3" style={{ maxHeight: '88vh' }}>
          <img
            src="/assets/hero-cyborg-cinematic.jpg"
            alt="Project E.V.O. Cinematic Cybernetic Humanoid"
            className="h-100 w-auto object-contain object-bottom filter drop-shadow-[0_0_100px_rgba(66,234,255,0.4)] opacity-95"
            style={{
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
            }}
          />
        </div>
      </div>

      <div className="container position-relative z-20 d-flex flex-column justify-content-between h-100 my-auto py-4">

        {/* Minimal Top Sector Tag */}
        <div className="d-flex align-items-center justify-content-between text-xs font-mono tracking-widest text-[#8899A6] pt-4 mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#42EAFF] shadow-[0_0_10px_#42EAFF] animate-ping" />
            <span className="text-[#C4D1DF] fw-bold">SECTOR 01 // SPECIMEN ALPHA</span>
          </div>
          <div className="d-none d-md-flex align-items-center gap-3 text-[11px] text-[#546575]">
            <span>THE AWAKENING</span>
            <span>//</span>
            <span>ALTITUDE: 412m</span>
          </div>
        </div>

        {/* Dramatic Monolithic Headline with Zero-Overlap Fluid Typography */}
        <div className="text-center d-flex flex-column align-items-center my-auto py-3">

          <div className="sub-headline-evo justify-content-center">
            THE EVOLUTION PROTOCOL
          </div>

          <h1 className="hero-title-evo drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)]">
            <span>HUMANITY WAS</span>
            <br />
            <span className="bg-gradient-to-r from-white via-[#C4D1DF] to-[#42EAFF] bg-clip-text text-transparent">
              JUST THE BEGINNING.
            </span>
          </h1>

          <p className="lead-text-evo text-center text-[10px] sm:text-xs md:text-sm font-mono tracking-normal sm:tracking-widest text-[#8899A6] uppercase mb-3 mb-md-4 px-2 max-w-lg">
            One Continuous 3D World // Planetary Convergence
          </p>

          <button
            onClick={handleEnterEvolution}
            onMouseEnter={() => cyberAudio.playHover()}
            className="group relative d-inline-flex align-items-center justify-content-center gap-2 sm:gap-3 px-3.5 px-sm-5 py-2 py-sm-3 w-auto max-w-[85vw] bg-[#091426]/80 hover:bg-[#42EAFF]/20 border border-[#42EAFF]/50 hover:border-[#42EAFF] text-white font-heading text-[10px] sm:text-xs md:text-sm fw-bold tracking-[0.1em] sm:tracking-[0.25em] uppercase rounded-sm backdrop-blur-xl transition-all duration-300 shadow-[0_0_30px_rgba(66,234,255,0.25)] hover:shadow-[0_0_50px_rgba(66,234,255,0.6)] cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#42EAFF] group-hover:scale-150 transition-transform flex-shrink-0" />
            <span className="truncate">ENTER THE EVOLUTION</span>
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#42EAFF] group-hover:translate-y-1 transition-transform flex-shrink-0" />
          </button>

        </div>

        {/* Minimal Bottom Tag */}
        <div className="text-center text-[10px] font-mono text-[#546575] pb-2">
          COORDINATES: LAT: {coords.lat} LON: {coords.lon} // AUTONOMOUS SECTOR 07
        </div>

      </div>
    </section>
  );
}
