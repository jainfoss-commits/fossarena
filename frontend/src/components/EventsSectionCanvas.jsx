import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function EventsSectionCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 700;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070f, 0.02);

    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 100);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle texture
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(56, 189, 248, 0.9)');
      grad.addColorStop(0.6, 'rgba(56, 189, 248, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const glowTex = createGlowTexture();

    // ─── Curated, Refined Particle System (~120 Particles) ─────────────────
    const COUNT = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const baseColors = new Float32Array(COUNT * 3);

    const cCyan = new THREE.Color(0x38bdf8);
    const cViolet = new THREE.Color(0x818cf8);
    const cMint = new THREE.Color(0x34d399);

    const particleData = [];

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 44;
      const y = (Math.random() - 0.5) * 28;
      const z = (Math.random() - 0.5) * 22;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const pick = Math.random();
      const col = pick < 0.45 ? cCyan : pick < 0.75 ? cViolet : cMint;

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      baseColors[i * 3] = col.r;
      baseColors[i * 3 + 1] = col.g;
      baseColors[i * 3 + 2] = col.b;

      particleData.push({
        origX: x,
        origY: y,
        origZ: z,
        freqX: 0.3 + Math.random() * 0.5,
        freqY: 0.3 + Math.random() * 0.5,
        ampX: 0.6 + Math.random() * 1.2,
        ampY: 0.6 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 1.0 + Math.random() * 2.0,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ─── Scroll Tracking ──────────────────────────────────────────────────
    let targetScrollRatio = 0;
    let currentScrollRatio = 0;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const totalDist = window.innerHeight + rect.height;
      const currentPos = window.innerHeight - rect.top;
      targetScrollRatio = Math.max(0, Math.min(1, currentPos / totalDist));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 700;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // ─── Render Loop ──────────────────────────────────────────────────────
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      currentScrollRatio += (targetScrollRatio - currentScrollRatio) * 0.05;

      const posArr = geometry.attributes.position.array;
      const colArr = geometry.attributes.color.array;

      for (let i = 0; i < COUNT; i++) {
        const d = particleData[i];
        posArr[i * 3] = d.origX + Math.sin(elapsed * d.freqX + d.phase) * d.ampX;
        posArr[i * 3 + 1] = d.origY + Math.cos(elapsed * d.freqY + d.phase) * d.ampY;

        const twinkle = 0.6 + 0.4 * Math.sin(elapsed * d.twinkleSpeed + d.phase);
        colArr[i * 3] = baseColors[i * 3] * twinkle;
        colArr[i * 3 + 1] = baseColors[i * 3 + 1] * twinkle;
        colArr[i * 3 + 2] = baseColors[i * 3 + 2] * twinkle;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      particles.rotation.y = elapsed * 0.02 + currentScrollRatio * 0.5;
      particles.position.y = (currentScrollRatio - 0.5) * 3;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      glowTex.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        opacity: 0.85,
      }}
      aria-hidden="true"
    />
  );
}
