import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene3D({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050812, 0.08);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return; // Graceful WebGL fallback
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 1. Nanite Particle Field
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x42eaff); // Cyan
    const color2 = new THREE.Color(0x987bff); // Violet
    const color3 = new THREE.Color(0x2ee5d4); // Turquoise

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 2. 3D Holographic Concentric Reticles
    const ringGroup = new THREE.Group();
    const ringMatCyan = new THREE.MeshBasicMaterial({
      color: 0x42eaff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const ringMatViolet = new THREE.MeshBasicMaterial({
      color: 0x987bff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });

    const ring1 = new THREE.Mesh(new THREE.RingGeometry(2.4, 2.44, 64), ringMatCyan);
    const ring2 = new THREE.Mesh(new THREE.RingGeometry(2.9, 2.93, 48), ringMatViolet);
    const ring3 = new THREE.Mesh(new THREE.RingGeometry(1.8, 1.83, 32), ringMatCyan);
    
    ring2.rotation.x = Math.PI * 0.15;
    ring3.rotation.y = Math.PI * 0.25;

    ringGroup.add(ring1);
    ringGroup.add(ring2);
    ringGroup.add(ring3);
    ringGroup.position.set(1.2, 0, -1);
    scene.add(ringGroup);

    // 3. Dynamic Volumetric Lights
    const lightCyan = new THREE.PointLight(0x42eaff, 3, 10);
    lightCyan.position.set(2, 2, 2);
    scene.add(lightCyan);

    const lightViolet = new THREE.PointLight(0x987bff, 2.5, 10);
    lightViolet.position.set(-2, -1, 1);
    scene.add(lightViolet);

    // 4. Mouse Parallax State
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.2;
      targetY = -y * 0.8;
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

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX;
      camera.position.y = mouseY;
      camera.lookAt(0.3, 0, 0);

      // Rotate particle field slowly
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.015;

      // Animate rings
      ring1.rotation.z = elapsedTime * 0.08;
      ring2.rotation.z = -elapsedTime * 0.05;
      ring3.rotation.z = elapsedTime * 0.12;

      // Orbit dynamic lights
      lightCyan.position.x = Math.sin(elapsedTime * 0.7) * 3 + 1;
      lightCyan.position.y = Math.cos(elapsedTime * 0.5) * 2;
      lightViolet.position.x = -Math.sin(elapsedTime * 0.6) * 3;

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
      geometry.dispose();
      particleMaterial.dispose();
      ring1.geometry.dispose();
      ring2.geometry.dispose();
      ring3.geometry.dispose();
      ringMatCyan.dispose();
      ringMatViolet.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
      style={{ overflow: 'hidden' }}
    />
  );
}
