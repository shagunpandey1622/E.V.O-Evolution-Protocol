# PROJECT E.V.O. — THE UNIFIED 3D WORLD EXPERIENCE
### *ONE WORLD. ONE JOURNEY. ONE EVOLUTION.*
### *Humanity Was Just The Beginning.* // *EVOLVE BEYOND LIMITS.*

An independent, continuous, AAA-quality science-fiction 3D world experience exploring the cybernetic civilization.

---

## 🌌 The Creative Vision

**Project E.V.O.** is engineered not as disconnected website pages or slides, but as a **single, unified, playable 3D game world** through which the visitor continuously travels.

The experience fuses:
- **Persistent 3D World Canvas:** Built on Three.js WebGL, rendering a colossal alien megacity, metallic skyscrapers, stasis laboratories, technological monuments, and a massive planetary civilization core.
- **Continuous Camera Journey:** As the visitor scrolls, the Three.js camera travels forward along a 3D Catmull-Rom spline path, transitioning smoothly between 7 connected sectors without page reloading or background switching.
- **AAA Game HUD:** An in-world heads-up display featuring sector coordinates, real-time altitude/elevation telemetry, an interactive Sonar Radar Ping sensor (hotkey: `F`), planetary audio synthesis, and an interactive 7-location waypoint bar allowing instant camera navigation.
- **Interactive In-World Facilities:**
  - **Location 01 — The Awakening:** Establish contact with Specimen Alpha in front of the colossal megacity.
  - **Location 02 — The Evolution Chamber:** An in-world cryogenic stasis laboratory where users inspect and activate 4 cybernetic augmentations on a 3D specimen.
  - **Location 03 — Genesis Engine:** An advanced biomechanical engineering terminal to synthesize custom cybernetic identities and generate official accredited dossiers.
  - **Location 04 — Technology Archive:** Monumental physical installations representing Quantum Neural Intelligence, Macro Optical Vision, Bionic Movement, and Adaptive Reflexes.
  - **Location 05 — Metamorphosis Facility:** An interactive transformation bay with a dual-silhouette slider revealing the internal titanium endoskeleton.
  - **Location 06 — Evolution Chronicles:** A towering chronological installation tracking humanity's transition into post-biological transcendence.
  - **Location 07 — The Civilization Core:** The central planetary energy reactor. Clicking **IGNITE CIVILIZATION CORE** triggers an environmental reactor surge, erupting high-intensity light and hyper-speed gyroscopic rotation throughout the 3D world!

---

## 🛠 Tech Stack

- **3D Graphics & Engine:** Three.js + WebGL
- **Animation & Physics:** Catmull-Rom 3D Splines + GSAP
- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS v4 + Custom Cybernetic Design System (`global.css`, `responsive.css`)
- **Typography:** Orbitron (headings), Rajdhani (body), JetBrains Mono (telemetry/code)
- **Audio Synthesizer:** Browser Web Audio API (Zero external MP3 dependencies)
- **Icons & Celebration:** Lucide React + Canvas-Confetti

---

## 🚀 Execution & Verification

### Run Locally
```bash
cd project-evo
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build Production Bundle
```bash
npm run build
```

---

## 🎮 Game Controls & Navigation
- **Scroll Wheel / Touch:** Moves the 3D camera along the physical world path between sectors.
- **Bottom Waypoint Bar:** Click any of the 7 locations (`01 Awakening` to `07 Core`) to glide the camera through the world directly to that station.
- **Sonar Ping (`F` key or click HUD):** Emits an expanding 3D sonar pulse through the megacity with acoustic feedback.
- **Command Shell Terminal (`Terminal icon`):** Opens the interactive in-world CLI shell (`help`, `status`, `modules`, `evolve`, `protocol`, `access-code`, `clear`).
- **Planetary Audio (`Speaker icon`):** Enables synthetic ambient sci-fi drone and audio feedback (muted by default).
