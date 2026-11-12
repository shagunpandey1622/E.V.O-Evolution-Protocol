import React, { useState, useEffect } from 'react';
import UnifiedWorldCanvas from './components/3d/UnifiedWorldCanvas';
import GameHUD from './components/hud/GameHUD';
import BootScreen from './components/BootScreen';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import AugmentationLab from './components/AugmentationLab';
import CyborgBuilder from './components/CyborgBuilder';
import Technology from './components/Technology';
import HumanVsMachine from './components/HumanVsMachine';
import EvolutionTimeline from './components/EvolutionTimeline';
import EthicsSection from './components/EthicsSection';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import ProtocolModal from './components/ProtocolModal';
import TerminalModal from './components/TerminalModal';
import { WORLD_LOCATIONS } from './data/upgrades';
import { cyberAudio } from './utils/audio';

export default function App() {
  const [bootCompleted, setBootCompleted] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) return true;
    return false;
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const [coreSurge, setCoreSurge] = useState(false);
  const [sonarPing, setSonarPing] = useState(false);
  const [activeModule, setActiveModule] = useState('neural');
  const [protocolModalOpen, setProtocolModalOpen] = useState(false);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);

  // Handle URL hash navigation on mount / boot complete
  useEffect(() => {
    if (bootCompleted && window.location.hash) {
      const targetElem = document.querySelector(window.location.hash);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: 'auto' });
      }
    }
  }, [bootCompleted]);

  // Synchronize Scroll Progress with 3D Camera Travel
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      setScrollProgress(progress);

      // Map progress to closest location index (0 to 6)
      const locIdx = Math.min(
        WORLD_LOCATIONS.length - 1,
        Math.floor(progress * WORLD_LOCATIONS.length + 0.3)
      );
      setActiveLocationIndex(locIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigate to Location by Waypoint Index
  const handleNavigateToLocation = (index) => {
    const targetLoc = WORLD_LOCATIONS[index];
    if (!targetLoc) return;
    const elem = document.getElementById(targetLoc.anchorId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Trigger 3D Sonar Ping Radar Wave
  const handleTriggerSonar = () => {
    setSonarPing(true);
    setTimeout(() => {
      setSonarPing(false);
    }, 1800);
  };

  // Trigger 3D Planetary Core Illumination
  const handleTriggerCoreSurge = () => {
    setCoreSurge(true);
    setTimeout(() => {
      setCoreSurge(false);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#050812] text-[#F3F5F9] relative selection:bg-[#42EAFF] selection:text-black overflow-x-hidden">
      
      {/* 1. Desktop Targeting Reticle Cursor */}
      <CustomCursor />

      {/* 2. Initial Boot Screen Sequence */}
      {!bootCompleted && (
        <BootScreen onComplete={() => setBootCompleted(true)} />
      )}

      {/* 3. PERSISTENT SINGLE UNIFIED 3D WORLD CANVAS (Never Unmounts) */}
      <UnifiedWorldCanvas
        scrollProgress={scrollProgress}
        activeLocationIndex={activeLocationIndex}
        coreSurge={coreSurge}
        sonarPing={sonarPing}
        activeModule={activeModule}
      />

      {/* 4. AAA GAME HUD & WAYPOINT NAVIGATION BAR */}
      {bootCompleted && (
        <GameHUD
          activeLocationIndex={activeLocationIndex}
          onNavigateToLocation={handleNavigateToLocation}
          onTriggerSonar={handleTriggerSonar}
          onOpenTerminal={() => setTerminalModalOpen(true)}
          onOpenProtocol={() => setProtocolModalOpen(true)}
          scrollProgress={scrollProgress}
        />
      )}

      {/* 5. CONTINUOUS SECTOR EXPERIENCES (Spatial Holographic Overlays) */}
      <div className="relative z-10">
        
        {/* Sector 01: The Awakening */}
        <Hero
          onEnterEvolution={() => handleNavigateToLocation(1)}
        />

        {/* Sector 02: The Evolution Chamber */}
        <AugmentationLab
          onSelectModule={(id) => setActiveModule(id)}
        />

        {/* Sector 03: Genesis Engine */}
        <CyborgBuilder />

        {/* Sector 04: Technology Archive */}
        <Technology />

        {/* Sector 05: Metamorphosis Facility */}
        <HumanVsMachine />

        {/* Sector 06: Evolution Chronicles */}
        <EvolutionTimeline />

        {/* Philosophical Interlude: Ethics & Sovereignty */}
        <EthicsSection />

        {/* Sector 07: The Civilization Core */}
        <CallToAction
          onTriggerCoreSurge={handleTriggerCoreSurge}
        />

        {/* Planetary Telemetry Footer */}
        <Footer
          onOpenTerminal={() => setTerminalModalOpen(true)}
          onOpenProtocol={() => setProtocolModalOpen(true)}
        />

      </div>

      {/* Protocol Briefing Modal */}
      <ProtocolModal
        isOpen={protocolModalOpen}
        onClose={() => setProtocolModalOpen(false)}
      />

      {/* Command Shell Terminal Modal */}
      <TerminalModal
        isOpen={terminalModalOpen}
        onClose={() => setTerminalModalOpen(false)}
      />

    </div>
  );
}
