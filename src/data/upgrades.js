// Project E.V.O. — Comprehensive Cybernetic Telemetry & Protocol Dataset
// Autonomous Planetary Sector 07 // Archive 

export const LAB_MODULES = [
  {
    id: 'neural',
    code: 'MOD-01',
    name: 'Neural Intelligence',
    category: 'Cognitive Matrix',
    icon: 'Brain',
    accentColor: '#42EAFF',
    glowColor: 'rgba(66, 234, 255, 0.4)',
    shortDesc: 'An advanced neural interface designed to explore enhanced cognitive interaction.',
    fullDesc: 'Bidirectional carbon-nanotube neural mesh integrating directly into neocortical synapses. Enables non-invasive thought-to-data computing, sub-millisecond information recall, and multi-threaded consciousness partitioning.',
    specs: [
      { label: 'Neural Connectivity', value: '99.8%', detail: 'Sub-synaptic latency < 0.2ms' },
      { label: 'Adaptive Learning', value: '14.8 PFLOPS', detail: 'Real-time synaptic plasticity' },
      { label: 'Pattern Recognition', value: 'Sub-picosecond', detail: 'Multi-variable heuristic analysis' }
    ],
    hotspot: {
      x: 50,
      y: 22,
      label: 'Cerebral Cortex Bridge'
    },
    metrics: {
      powerEfficiency: '96.4%',
      bandwidth: '4.2 TB/s',
      coherence: '99.1%'
    }
  },
  {
    id: 'vision',
    code: 'MOD-02',
    name: 'Cybernetic Vision',
    category: 'Ocular Matrix',
    icon: 'Eye',
    accentColor: '#987BFF',
    glowColor: 'rgba(152, 123, 255, 0.4)',
    shortDesc: 'A futuristic optical system that explores expanded visual capabilities.',
    fullDesc: 'Quantum dot micro-retinal array equipped with optical phase-shifting and dynamic LiDAR synthesis. Renders continuous hyper-spectrum data streams directly across the visual cortex with zero focal lag.',
    specs: [
      { label: 'Multi-spectrum Vision', value: '0.1nm – 1000μm', detail: 'UV, Infrared, Terahertz & Optical' },
      { label: 'Low-light Perception', value: '0.00005 Lux', detail: 'Photon-multiplying night aperture' },
      { label: 'Environmental Mapping', value: '360° Realtime LiDAR', detail: 'Sub-millimeter mesh resolution' }
    ],
    hotspot: {
      x: 53,
      y: 26,
      label: 'Quantum Retinal Array'
    },
    metrics: {
      powerEfficiency: '92.1%',
      bandwidth: '2.8 TB/s',
      coherence: '98.7%'
    }
  },
  {
    id: 'limbs',
    code: 'MOD-03',
    name: 'Robotic Limbs',
    category: 'Biomechanical Actuation',
    icon: 'Shield',
    accentColor: '#2EE5D4',
    glowColor: 'rgba(46, 229, 212, 0.4)',
    shortDesc: 'Advanced mechanical systems designed to complement human movement.',
    fullDesc: 'Carbon-titanium skeleton wrapped in electro-active polymer artificial muscles (EAP). Delivers industrial-grade kinetic torque with micro-surgical tactile sensitivity and adaptive shock mitigation.',
    specs: [
      { label: 'Precision Movement', value: '±0.002 mm', detail: 'Micro-actuator closed loop' },
      { label: 'Force Calibration', value: '1,850 N·m', detail: 'Dynamic torque limiter' },
      { label: 'Haptic Feedback', value: '48,000 pts/cm²', detail: 'Full-spectrum synthetic touch' }
    ],
    hotspot: {
      x: 72,
      y: 52,
      label: 'Titanium-Polymer Myomers'
    },
    metrics: {
      powerEfficiency: '94.8%',
      bandwidth: '1.9 TB/s',
      coherence: '97.5%'
    }
  },
  {
    id: 'reflexes',
    code: 'MOD-04',
    name: 'Enhanced Reflexes',
    category: 'Kinetics & Neuro-Relay',
    icon: 'Zap',
    accentColor: '#FFB347',
    glowColor: 'rgba(255, 179, 71, 0.4)',
    shortDesc: 'An intelligent sensor network designed to explore faster response systems.',
    fullDesc: 'Spinal super-conducting bio-bus coupled with localized edge micro-processors. Bypasses peripheral somatic nerve latency, intercepting physical threats before sensory signals reach conscious threshold.',
    specs: [
      { label: 'Motion Prediction', value: '42 ms Pre-event', detail: 'Kinematic trajectory simulation' },
      { label: 'Response Optimization', value: '8.4x Baseline', detail: 'Autonomic spinal micro-switches' },
      { label: 'Balance Assistance', value: 'Tri-axial Gyro 10kHz', detail: 'Zero-gravity momentum stabilizer' }
    ],
    hotspot: {
      x: 50,
      y: 44,
      label: 'Spinal Bio-Bus Relay'
    },
    metrics: {
      powerEfficiency: '97.2%',
      bandwidth: '3.6 TB/s',
      coherence: '99.4%'
    }
  }
];

// Custom Cyborg Builder Options
export const BUILDER_OPTIONS = {
  neural: [
    {
      id: 'quantum-core',
      name: 'Quantum Synapse Core',
      tier: 'Tier IV',
      desc: 'Superconducting qubit mesh allowing quantum parallel decision processing.',
      bonus: '+38% Cognitive Bandwidth',
      statMods: { cognitive: 38, kinetic: 0, latency: -22, integrity: 98 }
    },
    {
      id: 'cortex-hivemind',
      name: 'Cortex Hivemind V3',
      tier: 'Tier III',
      desc: 'Distributed swarm neural node capable of real-time planetary data synthesis.',
      bonus: '+29% Pattern Intuition',
      statMods: { cognitive: 29, kinetic: 5, latency: -15, integrity: 95 }
    },
    {
      id: 'subzero-cognition',
      name: 'Sub-Zero Cryo-Cognition',
      tier: 'Tier V',
      desc: 'Liquid nitrogen micro-chilled silicon-carbon brain overclocking module.',
      bonus: '+45% Calculation Speed',
      statMods: { cognitive: 45, kinetic: -5, latency: -30, integrity: 92 }
    }
  ],
  vision: [
    {
      id: 'thermal-ocular',
      name: 'Thermal-Ocular Matrix',
      tier: 'Tier III',
      desc: 'Infrared & electromagnetic spectrum overlay for zero-visibility planetary navigation.',
      bonus: '+25% Threat Detection',
      statMods: { cognitive: 15, kinetic: 10, latency: -12, integrity: 97 }
    },
    {
      id: 'chrono-vector',
      name: 'Chrono-Vector HUD',
      tier: 'Tier IV',
      desc: 'Predictive kinematic trajectory projection on retina.',
      bonus: '+34% Target Acquisition',
      statMods: { cognitive: 25, kinetic: 15, latency: -18, integrity: 96 }
    },
    {
      id: 'quantum-lidar',
      name: 'Quantum LiDAR Eye',
      tier: 'Tier V',
      desc: 'Photonic pulsed laser scanning generating 360-degree volumetric models.',
      bonus: '+40% Spatial Telemetry',
      statMods: { cognitive: 32, kinetic: 12, latency: -20, integrity: 94 }
    }
  ],
  mechanical: [
    {
      id: 'carbon-titanium',
      name: 'Carbon-Titanium Exoskeleton',
      tier: 'Tier IV',
      desc: 'Forged alloy frame resistant to extreme gravitational and kinetic shocks.',
      bonus: '+42% Impact Resistance',
      statMods: { cognitive: 0, kinetic: 42, latency: -5, integrity: 99 }
    },
    {
      id: 'nanotech-myomer',
      name: 'Nanotech Myomer Fibers',
      tier: 'Tier V',
      desc: 'Self-repairing synthetic muscle strands with exponential tensile strength.',
      bonus: '+50% Continuous Torque',
      statMods: { cognitive: 5, kinetic: 50, latency: -10, integrity: 96 }
    },
    {
      id: 'hyper-hydraulic',
      name: 'Hyper-Hydraulic Actuators',
      tier: 'Tier III',
      desc: 'Pressurized liquid-metal pistons optimized for instantaneous kinetic leaps.',
      bonus: '+35% Kinetic Output',
      statMods: { cognitive: -5, kinetic: 35, latency: -8, integrity: 93 }
    }
  ],
  reflex: [
    {
      id: 'synaptic-overclock',
      name: 'Synaptic Overclocking',
      tier: 'Tier IV',
      desc: 'Sub-spinal bio-electric relays bypassing biological motor pathway bottlenecks.',
      bonus: '-28ms Reaction Delay',
      statMods: { cognitive: 20, kinetic: 15, latency: -28, integrity: 95 }
    },
    {
      id: 'tachyon-reflex',
      name: 'Tachyon Reflex Array',
      tier: 'Tier V',
      desc: 'Pre-cognition algorithmic loop executing prior to conscious perception.',
      bonus: '-38ms Reaction Delay',
      statMods: { cognitive: 30, kinetic: 25, latency: -38, integrity: 91 }
    },
    {
      id: 'bioelectric-surge',
      name: 'Bio-Electric Surge Relay',
      tier: 'Tier III',
      desc: 'Capacitive charge packs discharging bursts for lightning-fast evasion.',
      bonus: '-20ms Reaction Delay',
      statMods: { cognitive: 12, kinetic: 22, latency: -20, integrity: 97 }
    }
  ]
};

// Technology Pillars
export const TECH_PILLARS = [
  {
    id: 'pillar-1',
    code: 'PIL-01',
    title: 'Neural Intelligence',
    category: 'Cognitive Computing',
    accent: '#42EAFF',
    icon: 'Brain',
    tagline: 'Bridging Silicon and Synapses',
    description: 'Ultra-high density bio-compatible electrode arrays capable of bidirectional communication with 100 billion neurons simultaneously without cellular degradation.',
    specs: [
      { label: 'Bandwidth', val: '4.8 TB/s' },
      { label: 'Cell Longevity', val: '25+ Years' },
      { label: 'Latency', val: '< 0.15ms' }
    ],
    architecture: 'Multi-layer graphene nanofiber woven through vascular pathways, powered by glucose-harvesting bio-fuel cells.'
  },
  {
    id: 'pillar-2',
    code: 'PIL-02',
    title: 'Expanded Vision',
    category: 'Opto-Electronics',
    accent: '#987BFF',
    icon: 'Eye',
    tagline: 'Perceiving Beyond the Visible',
    description: 'Translating ultraviolet, thermal infrared, and radio-frequency spectrums into coherent visual patterns mapped directly to ocular sensory nerve pathways.',
    specs: [
      { label: 'Spectral Range', val: '10nm - 1mm' },
      { label: 'Resolution', val: '120 Megapixels' },
      { label: 'Refresh Rate', val: '480 Hz' }
    ],
    architecture: 'Monolithic perovskite photodetector array integrated with synthetic sapphire crystalline lenses.'
  },
  {
    id: 'pillar-3',
    code: 'PIL-03',
    title: 'Engineered Movement',
    category: 'Kinetic Mechatronics',
    accent: '#2EE5D4',
    icon: 'Cpu',
    tagline: 'Strength Redefined Through Carbon',
    description: 'Musculoskeletal mechanics using carbon-nanotube artificial myomers that achieve 20x the energy density of organic biological muscle.',
    specs: [
      { label: 'Max Tensile Strength', val: '3,200 MPa' },
      { label: 'Weight Reduction', val: '-45%' },
      { label: 'Precision', val: '2.5 Microns' }
    ],
    architecture: 'Additive titanium-matrix composite endoskeleton powered by high-flux brushless magnetic linear actuators.'
  },
  {
    id: 'pillar-4',
    code: 'PIL-04',
    title: 'Adaptive Reflexes',
    category: 'Autonomic Cybernetics',
    accent: '#FFB347',
    icon: 'Zap',
    tagline: 'Sub-Millisecond Response Arc',
    description: 'Autonomous spinal micro-controllers executing protective maneuvers and tactical corrections in fractions of a millisecond before the brain processes stimuli.',
    specs: [
      { label: 'Reaction Window', val: '1.2ms' },
      { label: 'Gyro Sampling', val: '12 kHz' },
      { label: 'Shock Damping', val: '98.5%' }
    ],
    architecture: 'Distributed micro-FPGA neural compute nodes embedded along vertebral column with opto-isolated high-speed relays.'
  }
];

// Human vs Machine Comparison Dataset
export const COMPARISON_METRICS = [
  {
    category: 'Perception',
    human: {
      score: 35,
      label: 'Biological Standard',
      detail: 'Limited to 380–750nm optical spectrum; 60Hz flicker fusion rate; restricted night acuity.'
    },
    augmented: {
      score: 96,
      label: 'Hyper-Spectrum LiDAR Matrix',
      detail: '0.1nm to 1000μm multi-spectral detection, 480Hz refresh, algorithmic depth calculation in total darkness.'
    }
  },
  {
    category: 'Processing',
    human: {
      score: 42,
      label: 'Electrochemical Synapses',
      detail: 'Signal propagation at 120 m/s; subject to cognitive fatigue, emotional bias, and memory limits.'
    },
    augmented: {
      score: 98,
      label: 'Quantum Neuromorphic Bus',
      detail: 'Sub-picosecond optical routing; 14.8 PFLOPS parallel processing with zero cognitive exhaustion.'
    }
  },
  {
    category: 'Movement',
    human: {
      score: 48,
      label: 'Organic Muscle Fibers',
      detail: 'Actin-myosin contraction limited to 0.3 MPa; prone to lactic acid buildup and cellular wear.'
    },
    augmented: {
      score: 94,
      label: 'Titanium-Polymer Myomers',
      detail: 'Carbon nanotube bundles delivering 1,850 N·m torque; sustained operation without cellular degradation.'
    }
  },
  {
    category: 'Response',
    human: {
      score: 30,
      label: 'Somatic Reflex Arc',
      detail: '150–250ms visual reaction time; 120ms acoustic reflex; delayed by synaptic transmission.'
    },
    augmented: {
      score: 99,
      label: 'Predictive Spinal Micro-Relay',
      detail: '1.2ms response threshold; predictive kinetic pathing intercepts physical events before impact.'
    }
  },
  {
    category: 'Adaptability',
    human: {
      score: 85,
      label: 'Biological Plasticity & Intuition',
      detail: 'Superior abstract reasoning, empathy, novel creative heuristics, and moral discernment in ambiguity.'
    },
    augmented: {
      score: 92,
      label: 'Hybrid Intuition Synthesis',
      detail: 'Fuses organic emotional subtlety with artificial algorithmic certainty; the ultimate symbiosis.'
    }
  }
];

// Evolution Timeline Stages
export const TIMELINE_STAGES = [
  {
    step: '01',
    year: '2024 — 2030',
    title: 'The Human Beginning',
    tagline: 'Biological Fragility & Organic Ceilings',
    desc: 'The dawn of human curiosity meeting biological boundaries. Early invasive neural implants restore basic motor function. Mechanical prosthetics remain slow and motor-tethered.',
    milestone: 'First commercial high-channel neural link trials; mechanical limbs achieve basic 5-finger articulation.',
    accent: '#8899A6'
  },
  {
    step: '02',
    year: '2031 — 2038',
    title: 'Neural Revolution',
    tagline: 'Direct Cortex Synthesis',
    desc: 'Bio-compatible graphenic lace allows bidirectional communications with human cortex. Thought-to-speech achieves 99.4% fluency. Human cognitive augmentation shifts into an evolutionary choice.',
    milestone: 'First direct brain-to-quantum cloud interface; cognitive retention rates multiply 400%.',
    accent: '#42EAFF'
  },
  {
    step: '03',
    year: '2039 — 2045',
    title: 'Mechanical Integration',
    tagline: 'Biomechanical Equilibrium',
    desc: 'Artificial myomers surpass biological tissue in tensile strength, longevity, and efficiency. Cybernetic limbs gain sub-millimeter precision and high-density synthetic haptics.',
    milestone: 'Titanium-exoskeletons integrate with central nervous system; synthetic reflex circuits reduce trauma by 94%.',
    accent: '#987BFF'
  },
  {
    step: '04',
    title: 'Beyond Human',
    tagline: 'The E.V.O. Convergence',
    desc: 'The realization of Project E.V.O. Complete human-machine parity. Cognitive consciousness seamlessly transitions between organic brains and cybernetic hardware.',
    milestone: 'Project E.V.O. Protocol activated globally; the birth of the augmented transhuman civilization.',
    accent: '#2EE5D4'
  }
];

// Ethics and Humanity Points
export const ETHICS_POINTS = [
  {
    id: 'identity',
    icon: 'Fingerprint',
    title: 'Human Identity',
    question: 'When the biological body is replaced piece by piece, where does the authentic human self reside?',
    argument: 'E.V.O. philosophy posits that humanity is not defined by carbon chemistry, but by consciousness, empathy, and the intentional pursuit of growth. Every cybernetic augmentation should serve as an amplifier of human soul, not its replacement.',
    principle: 'Protocol Safeguard: Neural integrity retains biological emotional centers with strict cryptographic sovereignty.'
  },
  {
    id: 'responsibility',
    icon: 'Scale',
    title: 'Technological Responsibility',
    question: 'How do we prevent cybernetic enhancement from creating insurmountable evolutionary inequality?',
    argument: 'Technological evolution cannot become the privilege of an elite caste. Project E.V.O. champions open neural protocols and democratic augmentation access, ensuring that human elevation remains universal, voluntary, and decentralized.',
    principle: 'Protocol Safeguard: Open-source neural firmware covenants and zero-monopoly biometric architecture.'
  },
  {
    id: 'boundary',
    icon: 'ShieldCheck',
    title: 'The Human-Machine Boundary',
    question: 'Can algorithmic perfection coexist with human vulnerability, curiosity, and artistic freedom?',
    argument: 'Machines calculate optimization; humans seek meaning. The objective of Project E.V.O. is not to transform humans into rigid automatons, but to liberate the human spirit from physical frailty, enabling unfettered creative exploration.',
    principle: 'Protocol Safeguard: Hardwired autonomy overrides ensuring human will always holds terminal supremacy.'
  }
];

// 7 Unified World Locations
export const WORLD_LOCATIONS = [
  {
    id: 'awakening',
    sector: 'SECTOR 01',
    name: 'THE AWAKENING',
    shortLabel: 'AWAKENING',
    subtitle: 'Megacity Zenith // Specimen Alpha',
    coords: { x: 0, y: 8, z: 40 },
    lookAt: { x: 0, y: 6, z: 0 },
    elevation: '412m',
    anchorId: 'awakening'
  },
  {
    id: 'chamber',
    sector: 'SECTOR 02',
    name: 'THE EVOLUTION CHAMBER',
    shortLabel: 'CHAMBER',
    subtitle: 'Cryogenic Stasis Laboratory',
    coords: { x: 0, y: 15, z: -45 },
    lookAt: { x: 0, y: 15, z: -60 },
    elevation: '284m',
    anchorId: 'chamber'
  },
  {
    id: 'genesis',
    sector: 'SECTOR 03',
    name: 'GENESIS ENGINE',
    shortLabel: 'GENESIS',
    subtitle: 'Biomechanical Identity Forge',
    coords: { x: 12, y: 18, z: -100 },
    lookAt: { x: 0, y: 17, z: -115 },
    elevation: '240m',
    anchorId: 'genesis'
  },
  {
    id: 'technology',
    sector: 'SECTOR 04',
    name: 'TECHNOLOGY ARCHIVE',
    shortLabel: 'ARCHIVE',
    subtitle: 'Monumental Installation Hall',
    coords: { x: -18, y: 26, z: -145 },
    lookAt: { x: -30, y: 25, z: -160 },
    elevation: '310m',
    anchorId: 'technology'
  },
  {
    id: 'metamorphosis',
    sector: 'SECTOR 05',
    name: 'METAMORPHOSIS FACILITY',
    shortLabel: 'METAMORPHOSIS',
    subtitle: 'Bio-Synthetic Containment Bay',
    coords: { x: 20, y: 32, z: -205 },
    lookAt: { x: 30, y: 30, z: -220 },
    elevation: '360m',
    anchorId: 'metamorphosis'
  },
  {
    id: 'chronicles',
    sector: 'SECTOR 06',
    name: 'EVOLUTION CHRONICLES',
    shortLabel: 'CHRONICLES',
    subtitle: 'Chronological Holographic Spire',
    coords: { x: 0, y: 40, z: -270 },
    lookAt: { x: 0, y: 42, z: -295 },
    elevation: '495m',
    anchorId: 'chronicles'
  },
  {
    id: 'core',
    sector: 'SECTOR 07',
    name: 'THE CIVILIZATION CORE',
    shortLabel: 'CORE',
    subtitle: 'Planetary Convergence Reactor',
    coords: { x: 0, y: 52, z: -315 },
    lookAt: { x: 0, y: 50, z: -350 },
    elevation: '620m',
    anchorId: 'core'
  }
];
