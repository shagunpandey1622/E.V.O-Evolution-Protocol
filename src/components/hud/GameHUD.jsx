import React, { useState, useEffect } from 'react';
import { Radio, Volume2, VolumeX, Terminal, Radar } from 'lucide-react';
import { WORLD_LOCATIONS } from '../../data/upgrades';
import { cyberAudio } from '../../utils/audio';

export default function GameHUD({
  activeLocationIndex = 0,
  onNavigateToLocation,
  onTriggerSonar,
  onOpenTerminal,
  onOpenProtocol,
  scrollProgress = 0
}) {
  const [soundOn, setSoundOn] = useState(false);
  const activeLoc = WORLD_LOCATIONS[activeLocationIndex] || WORLD_LOCATIONS[0];

  const handleToggleSound = () => {
    const nextState = cyberAudio.toggleSound();
    setSoundOn(nextState);
  };

  const handleSonar = () => {
    cyberAudio.playClick();
    onTriggerSonar();
  };

  const handleWaypointClick = (index) => {
    cyberAudio.playClick();
    onNavigateToLocation(index);
  };

  // Keyboard shortcut 'f' for Sonar Ping
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        if (!e.target.matches('input, textarea')) {
          handleSonar();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-3 sm:p-5 select-none font-mono" aria-label="Game Navigation HUD">

      {/* 1. TOP HUD BAR */}
      <header className="w-full flex items-center justify-between gap-3">

        {/* Brand / Logo */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          <div className="relative w-8 h-8 flex items-center justify-center bg-[#091426]/90 border border-[#42EAFF]/60 rounded backdrop-blur-md">
            <Radio className="w-4 h-4 text-[#42EAFF] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xs sm:text-sm tracking-wider text-white">
                PROJECT E.V.O.
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] text-[#8899A6] tracking-widest uppercase">
              THE EVOLUTION PROTOCOL
            </span>
          </div>
        </div>

        {/* Current Sector Telemetry Header (Desktop / Tablet) */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 px-3.5 py-1.5 bg-[#050812]/85 backdrop-blur-md border border-[#42EAFF]/25 rounded text-xs shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#42EAFF] animate-ping" />
            <span className="text-[#C4D1DF] font-bold">
              {activeLoc.sector} // {activeLoc.name}
            </span>
          </div>
          <div className="h-4 w-[1px] bg-[#42EAFF]/20" />
          <div className="text-[10px] text-[#8899A6]">
            ALTITUDE: <span className="text-[#42EAFF] font-bold">{activeLoc.elevation}</span>
          </div>
          <div className="h-4 w-[1px] bg-[#42EAFF]/20" />
          <div className="text-[10px] text-[#546575]">
            POS: X:{activeLoc.coords.x.toFixed(0)} Y:{activeLoc.coords.y.toFixed(0)} Z:{activeLoc.coords.z.toFixed(0)}
          </div>
        </div>

        {/* Mobile Sector Badge (< 768px) */}
        <div className="flex md:hidden items-center gap-1.5 px-2 py-1 bg-[#050812]/80 backdrop-blur-md border border-[#42EAFF]/20 rounded text-[9px] text-[#42EAFF]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#42EAFF] animate-pulse" />
          <span>{activeLoc.sector} // {activeLoc.elevation}</span>
        </div>

        {/* Top-Right HUD Controls: Sonar Ping, Audio Toggle & Terminal */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Sonar Radar Ping */}
          <button
            onClick={handleSonar}
            title="Trigger Sonar Radar Ping [Hotkey: F]"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#091426]/85 border border-[#42EAFF]/40 hover:border-[#42EAFF] text-[#42EAFF] text-[10px] sm:text-[11px] rounded backdrop-blur-md transition-all hover:shadow-[0_0_15px_rgba(66,234,255,0.4)]"
          >
            <Radar className="w-3.5 h-3.5" />
            <span>SONAR [F]</span>
          </button>

          {/* Audio Synthesizer */}
          <button
            onClick={handleToggleSound}
            title={soundOn ? 'Planetary Audio Active' : 'Enable Planetary Audio'}
            className={`p-2 rounded border backdrop-blur-md transition-all ${soundOn
                ? 'bg-[#42EAFF]/20 border-[#42EAFF] text-[#42EAFF] shadow-[0_0_12px_rgba(66,234,255,0.4)]'
                : 'bg-[#091426]/80 border-white/20 text-[#8899A6] hover:text-white'
              }`}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Terminal Shell Button */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              onOpenTerminal();
            }}
            className="p-2 rounded bg-[#091426]/80 border border-[#42EAFF]/40 text-[#42EAFF] hover:bg-[#42EAFF]/20 transition-all backdrop-blur-md"
            title="Open E.V.O. Command Shell"
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>

      </header>

      {/* 2. BOTTOM WAYPOINT TRAVEL BAR (7 Connected World Locations) */}
      <footer className="w-full max-w-4xl mx-auto pointer-events-auto">
        <div className="p-1.5 sm:p-2 bg-[#050812]/90 backdrop-blur-xl border border-[#42EAFF]/30 rounded-lg shadow-[0_0_30px_rgba(5,8,18,0.9)] flex items-center justify-between gap-1 overflow-x-auto">
          {WORLD_LOCATIONS.map((loc, idx) => {
            const isCurrent = activeLocationIndex === idx;
            return (
              <button
                key={loc.id}
                onClick={() => handleWaypointClick(idx)}
                className={`flex-1 min-w-0 py-1 sm:py-1.5 px-0.5 sm:px-2 rounded font-mono transition-all duration-300 text-center whitespace-nowrap cursor-pointer ${isCurrent
                    ? 'bg-[#42EAFF] text-black font-bold shadow-[0_0_15px_rgba(66,234,255,0.6)] scale-[1.02]'
                    : 'text-[#8899A6] hover:text-[#42EAFF] hover:bg-[#42EAFF]/10'
                  }`}
              >
                <div className="text-[7px] sm:text-[8px] opacity-75">0{idx + 1}</div>
                <div className="truncate font-semibold text-[6.5px] xs:text-[7.5px] sm:text-[10px] tracking-tighter sm:tracking-wider">{loc.shortLabel || loc.name}</div>
              </button>
            );
          })}
        </div>
      </footer>

    </nav>
  );
}
