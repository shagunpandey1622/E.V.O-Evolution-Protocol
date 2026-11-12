import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { WORLD_LOCATIONS } from '../../data/upgrades';

export default function UnifiedWorldCanvas({
  scrollProgress = 0,
  activeLocationIndex = 0,
  coreSurge = false,
  sonarPing = false,
  activeModule = 'neural'
}) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    scrollProgress: 0,
    coreSurge: false,
    sonarPing: false,
    activeModule: 'neural'
  });

  stateRef.current = { scrollProgress, coreSurge, sonarPing, activeModule };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Fog & Perspective Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050812, 0.005);

    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      600
    );
    camera.position.set(0, 8, 40);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Continuous 3D Camera Waypoint Spline Path
    const cameraWaypoints = WORLD_LOCATIONS.map(
      (loc) => new THREE.Vector3(loc.coords.x, loc.coords.y, loc.coords.z)
    );
    const lookWaypoints = WORLD_LOCATIONS.map(
      (loc) => new THREE.Vector3(loc.lookAt.x, loc.lookAt.y, loc.lookAt.z)
    );

    const camCurve = new THREE.CatmullRomCurve3(cameraWaypoints, false, 'catmullrom', 0.2);
    const lookCurve = new THREE.CatmullRomCurve3(lookWaypoints, false, 'catmullrom', 0.2);

    // 3. Ground Cybernetic Grid Plane
    const gridHelper = new THREE.GridHelper(700, 140, 0x42eaff, 0x091426);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // 4. Megacity Architectural Towers
    const towerGroup = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);
    
    // Cyber tower materials
    const towerMatDark = new THREE.MeshStandardMaterial({
      color: 0x0b1322,
      roughness: 0.35,
      metalness: 0.85
    });

    const towerMatGlass = new THREE.MeshStandardMaterial({
      color: 0x07111e,
      roughness: 0.1,
      metalness: 0.95
    });

    // Create 45 futuristic skyscrapers along the civilization corridor
    const towerCount = 45;
    for (let i = 0; i < towerCount; i++) {
      const h = 25 + Math.random() * 70;
      const w = 8 + Math.random() * 12;
      const d = 8 + Math.random() * 12;
      const mesh = new THREE.Mesh(boxGeo, i % 2 === 0 ? towerMatDark : towerMatGlass);
      mesh.scale.set(w, h, d);

      // Distribute on both sides of central corridor
      const side = i % 2 === 0 ? 1 : -1;
      const x = side * (26 + Math.random() * 60);
      const z = 40 - (i / towerCount) * 400 + (Math.random() - 0.5) * 20;
      const y = h / 2 - 2;

      mesh.position.set(x, y, z);
      towerGroup.add(mesh);

      // Add illuminated beacon spire on top of select towers
      if (i % 3 === 0) {
        const spireGeo = new THREE.CylinderGeometry(0.1, 0.4, 8, 8);
        const spireMat = new THREE.MeshBasicMaterial({ color: 0x42eaff });
        const spire = new THREE.Mesh(spireGeo, spireMat);
        spire.position.set(x, h + 2, z);
        towerGroup.add(spire);
      }
    }
    scene.add(towerGroup);

    // 5. Atmospheric Floating Nanite Particle System
    const particleCount = 2000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const cCyan = new THREE.Color(0x42eaff);
    const cViolet = new THREE.Color(0x987bff);
    const cTurquoise = new THREE.Color(0x2ee5d4);

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 160;
      pPos[i * 3 + 1] = Math.random() * 80 - 5;
      pPos[i * 3 + 2] = 50 - Math.random() * 420;

      const c = i % 3 === 0 ? cCyan : i % 3 === 1 ? cViolet : cTurquoise;
      pColors[i * 3] = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particleCloud = new THREE.Points(pGeo, pMat);
    scene.add(particleCloud);

    // 6. Central Planetary Core Installation (Sector 07 Landmark)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 50, -350);

    const coreSphereGeo = new THREE.IcosahedronGeometry(12, 4);
    const coreSphereMat = new THREE.MeshBasicMaterial({
      color: 0x42eaff,
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    coreGroup.add(coreSphere);

    // Inner bright core
    const innerCoreGeo = new THREE.SphereGeometry(6, 32, 32);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreGroup.add(innerCore);

    // Giant Gyroscopic Torus Rings around the Core
    const ringGeo1 = new THREE.TorusGeometry(20, 0.4, 16, 64);
    const ringGeo2 = new THREE.TorusGeometry(26, 0.4, 16, 64);
    const ringGeo3 = new THREE.TorusGeometry(32, 0.3, 16, 64);

    const coreRingMat = new THREE.MeshBasicMaterial({
      color: 0x987bff,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });

    const coreRing1 = new THREE.Mesh(ringGeo1, coreRingMat);
    const coreRing2 = new THREE.Mesh(ringGeo2, coreRingMat);
    const coreRing3 = new THREE.Mesh(ringGeo3, coreRingMat);
    coreGroup.add(coreRing1);
    coreGroup.add(coreRing2);
    coreGroup.add(coreRing3);

    scene.add(coreGroup);

    // Core Light
    const coreLight = new THREE.PointLight(0x42eaff, 8, 250);
    coreLight.position.set(0, 50, -350);
    scene.add(coreLight);

    // 7. Sector 02 Landmark: The Evolution Chamber Stasis Pod in 3D
    const chamberGroup = new THREE.Group();
    chamberGroup.position.set(0, 15, -60);

    const stasisCageGeo = new THREE.CylinderGeometry(4, 4, 12, 16, 4, true);
    const stasisCageMat = new THREE.MeshBasicMaterial({
      color: 0x42eaff,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const stasisCage = new THREE.Mesh(stasisCageGeo, stasisCageMat);
    chamberGroup.add(stasisCage);

    // Central 3D Specimen in Chamber
    const specimenGeo = new THREE.IcosahedronGeometry(2.2, 2);
    const specimenMat = new THREE.MeshBasicMaterial({
      color: 0x42eaff,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const specimenMesh = new THREE.Mesh(specimenGeo, specimenMat);
    chamberGroup.add(specimenMesh);

    scene.add(chamberGroup);

    // 8. Sonar Ping Wave Mesh
    const pingGeo = new THREE.SphereGeometry(1, 32, 16);
    const pingMat = new THREE.MeshBasicMaterial({
      color: 0x42eaff,
      wireframe: true,
      transparent: true,
      opacity: 0
    });
    const pingMesh = new THREE.Mesh(pingGeo, pingMat);
    scene.add(pingMesh);

    // 9. Ambient & Directional City Lighting
    const ambLight = new THREE.AmbientLight(0x0a1324, 2);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0x42eaff, 1.5);
    dirLight.position.set(20, 60, 40);
    scene.add(dirLight);

    const violetRim = new THREE.DirectionalLight(0x987bff, 1.2);
    violetRim.position.set(-30, 40, -100);
    scene.add(violetRim);

    // 10. Mouse Parallax Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 3;
      targetMouseY = -y * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();
    let currentCamT = 0;
    let pingScale = 0;
    let pingActive = false;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation along Catmull-Rom Curve
      const targetT = THREE.MathUtils.clamp(stateRef.current.scrollProgress, 0, 1);
      currentCamT += (targetT - currentCamT) * 0.06;

      const pathPoint = camCurve.getPointAt(currentCamT);
      const lookPoint = lookCurve.getPointAt(currentCamT);

      // Smooth mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.set(
        pathPoint.x + mouseX,
        pathPoint.y + mouseY,
        pathPoint.z
      );
      camera.lookAt(lookPoint.x, lookPoint.y, lookPoint.z);

      // Rotate Nanite Cloud
      particleCloud.rotation.y = elapsedTime * 0.02;

      // Animate Stasis Chamber Specimen (Fade in when approaching Sector 02)
      const chamberT = THREE.MathUtils.clamp((currentCamT - 0.04) / 0.12, 0, 1);
      chamberGroup.visible = chamberT > 0.01;
      stasisCageMat.opacity = chamberT * 0.5;
      specimenMat.opacity = chamberT * 0.85;

      if (chamberGroup.visible) {
        specimenMesh.rotation.y = elapsedTime * 0.4;
        specimenMesh.rotation.x = elapsedTime * 0.2;
        stasisCage.rotation.y = -elapsedTime * 0.15;
      }

      // Animate Civilization Core
      const surgeMult = stateRef.current.coreSurge ? 4.5 : 1;
      coreSphere.rotation.y = elapsedTime * 0.3 * surgeMult;
      coreSphere.rotation.z = elapsedTime * 0.15 * surgeMult;
      coreRing1.rotation.x = elapsedTime * 0.4 * surgeMult;
      coreRing1.rotation.y = elapsedTime * 0.2 * surgeMult;
      coreRing2.rotation.y = -elapsedTime * 0.5 * surgeMult;
      coreRing3.rotation.z = elapsedTime * 0.35 * surgeMult;

      if (stateRef.current.coreSurge) {
        coreLight.intensity = 18 + Math.sin(elapsedTime * 15) * 6;
        coreSphereMat.color.setHex(0xffffff);
      } else {
        coreLight.intensity = 8 + Math.sin(elapsedTime * 2) * 2;
        coreSphereMat.color.setHex(0x42eaff);
      }

      // Trigger Sonar Ping Animation
      if (stateRef.current.sonarPing && !pingActive) {
        pingActive = true;
        pingScale = 0;
        pingMesh.position.copy(camera.position);
      }

      if (pingActive) {
        pingScale += 1.8;
        pingMesh.scale.set(pingScale, pingScale, pingScale);
        pingMat.opacity = Math.max(0, 0.7 - pingScale / 90);
        if (pingScale > 90) {
          pingActive = false;
          pingMat.opacity = 0;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      boxGeo.dispose();
      towerMatDark.dispose();
      towerMatGlass.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
