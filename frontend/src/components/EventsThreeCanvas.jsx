import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * EventsThreeCanvas
 * Refined, minimalist, ultra-smooth particle cosmos for the Events page.
 * 
 * Features:
 * - Minimal, uncluttered particle density (~180 curated luminous nodes)
 * - Organic harmonic Lissajous floating & gentle orbital breathing
 * - Dynamic individual twinkle & luminance pulsations
 * - Soft cursor deflection & inertia
 * - Silky smooth scroll parallax with color temperature transitions
 */
export default function EventsThreeCanvas({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ─── Scene & Camera Setup ──────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070f, 0.0035);

    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 36);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // ─── High-Definition Radiant Particle Texture ──────────────────────────
    const createLuminousTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const center = 64;

      const grad = ctx.createRadialGradient(center, center, 0, center, center, center);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.12, 'rgba(240, 253, 250, 0.98)');
      grad.addColorStop(0.28, 'rgba(56, 189, 248, 0.85)');
      grad.addColorStop(0.55, 'rgba(56, 189, 248, 0.28)');
      grad.addColorStop(0.82, 'rgba(129, 140, 248, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createLuminousTexture();

    // ─── Curated, Low-Density Particle Cosmos (~180 Particles) ─────────────
    const COUNT = 190;
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const baseColors = new Float32Array(COUNT * 3);

    // Per-particle physical motion state
    const particleData = [];

    const colCyan = new THREE.Color(0x38bdf8);
    const colTeal = new THREE.Color(0x34d399);
    const colIndigo = new THREE.Color(0x818cf8);
    const colAmber = new THREE.Color(0xfbbf24);
    const colPureWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < COUNT; i++) {
      // Wide, spaced-out distribution across depth
      const x = (Math.random() - 0.5) * 78;
      const y = (Math.random() - 0.5) * 88;
      const z = (Math.random() - 0.5) * 44;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color gradation: Cyan & Teal near top, Indigo & Amber near bottom
      const yNorm = (y + 44) / 88; // 0 (bottom) to 1 (top)
      const roll = Math.random();
      let c;

      if (yNorm > 0.5) {
        c = roll < 0.5 ? colCyan.clone() : roll < 0.8 ? colTeal.clone() : colPureWhite.clone();
      } else {
        c = roll < 0.55 ? colIndigo.clone() : roll < 0.82 ? colAmber.clone() : colPureWhite.clone();
      }

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      baseColors[i * 3] = c.r;
      baseColors[i * 3 + 1] = c.g;
      baseColors[i * 3 + 2] = c.b;

      particleData.push({
        origX: x,
        origY: y,
        origZ: z,
        // Harmonic Lissajous oscillation speeds
        freqX: 0.3 + Math.random() * 0.7,
        freqY: 0.25 + Math.random() * 0.65,
        freqZ: 0.2 + Math.random() * 0.5,
        // Amplitudes
        ampX: 0.8 + Math.random() * 1.6,
        ampY: 0.9 + Math.random() * 1.8,
        ampZ: 0.6 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 1.2 + Math.random() * 2.2,
        twinklePhase: Math.random() * Math.PI * 2,
        driftY: 0.015 + Math.random() * 0.025,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.6,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // ─── Subtle Ambient Lighting ───────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x0a1224, 2.5);
    scene.add(ambientLight);

    const atmosphereLight = new THREE.PointLight(0x38bdf8, 3.2, 85, 1.2);
    atmosphereLight.position.set(0, 12, 18);
    scene.add(atmosphereLight);

    // ─── Smooth Interaction Tracking ───────────────────────────────────────
    let currentScroll = 0;
    let targetScroll = 0;
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = docHeight > 0 ? window.scrollY / docHeight : 0;
    };

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    // ─── Cinematic Entry Warp Transition on Mount ──────────────────────────
    const entryStartTime = performance.now();
    const ENTRY_DURATION = 1800;

    // ─── Render Animation Loop ─────────────────────────────────────────────
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const now = performance.now();

      // Smooth entry ease-out cubic
      const entryProgress = Math.min(1, (now - entryStartTime) / ENTRY_DURATION);
      const entryEase = 1 - Math.pow(1 - entryProgress, 3);
      const warpZOffset = (1 - entryEase) * 24;

      material.opacity = 0.85 * entryEase;

      // Fluid spring dampening for scroll & mouse
      currentScroll += (targetScroll - currentScroll) * 0.045;
      mouse.x += (mouse.targetX - mouse.x) * 0.038;
      mouse.y += (mouse.targetY - mouse.y) * 0.038;

      // Camera gently descends and frames the depth with parallax
      camera.position.y = 8 - currentScroll * 36 + mouse.y * 2.2;
      camera.position.x = Math.sin(currentScroll * 1.8) * 3.2 + mouse.x * 2.8;
      camera.position.z = (38 - currentScroll * 10) + warpZOffset;
      camera.lookAt(0, camera.position.y - 1.5, 0);

      // Light color transition smoothly shifting from Cyan/Mint to Violet/Amber
      const r = 0.22 + currentScroll * 0.58;
      const g = 0.74 - currentScroll * 0.42;
      const b = 0.97 - currentScroll * 0.38;
      atmosphereLight.color.setRGB(r, g, b);
      atmosphereLight.position.y = camera.position.y + 4;

      // Animate individual particles with organic harmonic motion and twinkling
      const posArray = geometry.attributes.position.array;
      const colArray = geometry.attributes.color.array;

      for (let i = 0; i < COUNT; i++) {
        const d = particleData[i];

        // Harmonic oscillation around origin
        const waveX = Math.sin(elapsed * d.freqX + d.phase) * d.ampX;
        const waveY = Math.cos(elapsed * d.freqY + d.phase) * d.ampY;
        const waveZ = Math.sin(elapsed * d.freqZ + d.phase) * d.ampZ;

        // Subtle upward drift that loops
        d.origY += d.driftY;
        if (d.origY > 44) d.origY = -44;

        // Mouse gentle deflection
        const dx = d.origX - mouse.x * 25;
        const dy = d.origY - mouse.y * 20;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelFactor = Math.max(0, 14 - dist) / 14;
        const repelX = (dx / (dist || 1)) * repelFactor * 1.8;
        const repelY = (dy / (dist || 1)) * repelFactor * 1.8;

        posArray[i * 3] = d.origX + waveX + repelX;
        posArray[i * 3 + 1] = d.origY + waveY + repelY;
        posArray[i * 3 + 2] = d.origZ + waveZ;

        // Twinkle luminance pulse
        const twinkle = 0.55 + 0.45 * Math.sin(elapsed * d.twinkleSpeed + d.twinklePhase);
        colArray[i * 3] = baseColors[i * 3] * twinkle;
        colArray[i * 3 + 1] = baseColors[i * 3 + 1] * twinkle;
        colArray[i * 3 + 2] = baseColors[i * 3 + 2] * twinkle;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;

      // Gentle global rotation
      particleSystem.rotation.y = elapsed * 0.018 + currentScroll * 0.4;
      particleSystem.rotation.x = Math.sin(elapsed * 0.012) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`events-three-viewport ${className}`}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  );
}
