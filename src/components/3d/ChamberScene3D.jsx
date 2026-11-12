import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ChamberScene3D({ activeModule = 'neural', isActivated = false, onSelectNode }) {
  const mountRef = useRef(null);
  const activeModuleRef = useRef(activeModule);
  activeModuleRef.current = activeModule;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050812, 0.12);

    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0.8, 4.5);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Color definitions
    const colors = {
      neural: new THREE.Color(0x42eaff),
      vision: new THREE.Color(0x987bff),
      limbs: new THREE.Color(0x2ee5d4),
      reflexes: new THREE.Color(0xffb347)
    };

    // 1. Central 3D Humanoid Hologram Mesh Hierarchy
    const characterGroup = new THREE.Group();

    // Cranium / Head
    const headGeo = new THREE.IcosahedronGeometry(0.38, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: colors[activeModuleRef.current] || colors.neural,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const headMesh = new THREE.Mesh(headGeo, wireMat);
    headMesh.position.set(0, 1.4, 0);
    characterGroup.add(headMesh);

    // Spine & Vertebrae
    const spineGroup = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const vertGeo = new THREE.TorusGeometry(0.12 - i * 0.01, 0.02, 8, 16);
      const vertMat = new THREE.MeshBasicMaterial({
        color: 0x42eaff,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });
      const vert = new THREE.Mesh(vertGeo, vertMat);
      vert.rotation.x = Math.PI / 2;
      vert.position.set(0, 0.95 - i * 0.14, -0.05);
      spineGroup.add(vert);
    }
    characterGroup.add(spineGroup);

    // Torso Cage
    const torsoGeo = new THREE.CylinderGeometry(0.45, 0.32, 1.1, 16, 4, true);
    const torsoMat = new THREE.MeshBasicMaterial({
      color: 0x091426,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const torsoMesh = new THREE.Mesh(torsoGeo, torsoMat);
    torsoMesh.position.set(0, 0.6, 0);
    characterGroup.add(torsoMesh);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.9, 12, 3, true);
    const armLeft = new THREE.Mesh(armGeo, wireMat);
    armLeft.position.set(-0.65, 0.55, 0);
    armLeft.rotation.z = Math.PI * 0.08;
    characterGroup.add(armLeft);

    const armRight = new THREE.Mesh(armGeo, wireMat);
    armRight.position.set(0.65, 0.55, 0);
    armRight.rotation.z = -Math.PI * 0.08;
    characterGroup.add(armRight);

    scene.add(characterGroup);

    // 2. Interactive Hotspot Spheres in 3D Space
    const hotspots = [
      { id: 'neural', pos: [0, 1.4, 0.15], label: 'Neural Cortex' },
      { id: 'vision', pos: [0, 1.45, 0.38], label: 'Ocular Matrix' },
      { id: 'limbs', pos: [0.72, 0.35, 0], label: 'Titanium Myomer' },
      { id: 'reflexes', pos: [0, 0.65, -0.15], label: 'Spinal Bio-Bus' }
    ];

    const hotspotMeshes = [];
    hotspots.forEach((h) => {
      const geo = new THREE.SphereGeometry(0.08, 16, 16);
      const mat = new THREE.MeshBasicMaterial({
        color: colors[h.id],
        transparent: true,
        opacity: 0.9
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...h.pos);
      mesh.userData = { id: h.id };
      characterGroup.add(mesh);
      hotspotMeshes.push(mesh);

      // Pulsing outer halo ring
      const haloGeo = new THREE.RingGeometry(0.12, 0.14, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: colors[h.id],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.set(...h.pos);
      characterGroup.add(halo);
    });

    // 3. Stasis Laser Containment Rings
    const stasisRingGeo = new THREE.TorusGeometry(1.5, 0.015, 8, 48);
    const stasisRingMat = new THREE.MeshBasicMaterial({
      color: 0x42eaff,
      transparent: true,
      opacity: 0.3
    });
    const stasisRing1 = new THREE.Mesh(stasisRingGeo, stasisRingMat);
    stasisRing1.rotation.x = Math.PI / 2;
    stasisRing1.position.y = 1.8;
    scene.add(stasisRing1);

    const stasisRing2 = new THREE.Mesh(stasisRingGeo, stasisRingMat);
    stasisRing2.rotation.x = Math.PI / 2;
    stasisRing2.position.y = -0.5;
    scene.add(stasisRing2);

    // 4. Floating Holographic Particles
    const pCount = 500;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 5;
      pPos[i * 3 + 1] = Math.random() * 3 - 0.5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x42eaff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const pSystem = new THREE.Points(pGeo, pMat);
    scene.add(pSystem);

    // Camera target positions based on active module
    const cameraTargets = {
      neural: { cam: [0, 1.4, 2.2], look: [0, 1.4, 0] },
      vision: { cam: [0, 1.45, 1.8], look: [0, 1.45, 0.2] },
      limbs: { cam: [0.8, 0.5, 2.2], look: [0.5, 0.4, 0] },
      reflexes: { cam: [0, 0.7, 2.4], look: [0, 0.7, 0] }
    };

    // User Interactive Orbit Controls (Mouse Drag & Wheel)
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotY = 0;
    let targetRotY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouse.x;
      targetRotY += deltaX * 0.008;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

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

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation
      rotY += (targetRotY - rotY) * 0.1;
      characterGroup.rotation.y = rotY + (isDragging ? 0 : elapsedTime * 0.15);

      // Pulse active module color
      const activeColor = colors[activeModuleRef.current] || colors.neural;
      wireMat.color.lerp(activeColor, 0.1);

      // Camera smooth zoom transition toward target
      const targetConfig = cameraTargets[activeModuleRef.current] || cameraTargets.neural;
      camera.position.x += (targetConfig.cam[0] - camera.position.x) * 0.05;
      camera.position.y += (targetConfig.cam[1] - camera.position.y) * 0.05;
      camera.position.z += (targetConfig.cam[2] - camera.position.z) * 0.05;
      camera.lookAt(targetConfig.look[0], targetConfig.look[1], targetConfig.look[2]);

      // Vertical laser scan pulse
      stasisRing1.position.y = 1.6 + Math.sin(elapsedTime * 2) * 0.3;
      stasisRing2.position.y = -0.3 + Math.cos(elapsedTime * 2) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      headGeo.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing relative"
      title="Click and drag to orbit 3D holographic specimen"
    />
  );
}
