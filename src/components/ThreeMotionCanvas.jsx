import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Three.js Interactive Background — wave particle lattice + starfield.
 * Scroll-driven reactions are intentionally subtle:
 *   - Gentle lattice tilt + wave speed change
 *   - Camera slow drift upward
 *   - Starfield slow roll + brightness boost
 * Everything stays legible and structured at all scroll positions.
 */

export default function ThreeMotionCanvas({ onOpeningComplete }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (onOpeningComplete) onOpeningComplete();

    // ─── Scene & Camera ─────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070c, 0.0016);

    const camera = new THREE.PerspectiveCamera(
      56,
      container.clientWidth / container.clientHeight,
      0.1,
      1200
    );
    camera.position.set(0, 4.5, 42);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ─── Lighting ───────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x0d1527, 3.2));
    const cyanLight = new THREE.PointLight(0x38bdf8, 4.8, 95, 1.2);
    cyanLight.position.set(18, 16, 24);
    scene.add(cyanLight);
    const violetLight = new THREE.PointLight(0x818cf8, 4.2, 90, 1.2);
    violetLight.position.set(-18, -8, 20);
    scene.add(violetLight);

    // ─── Particle glow texture ──────────────────────────────────────────────
    const mkTex = () => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0,    'rgba(255,255,255,1)');
      g.addColorStop(0.22, 'rgba(56,189,248,0.9)');
      g.addColorStop(0.62, 'rgba(129,140,248,0.35)');
      g.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(32, 32, 32, 0, Math.PI * 2); ctx.fill();
      return new THREE.CanvasTexture(c);
    };

    const colCyan   = new THREE.Color(0x38bdf8);
    const colIndigo = new THREE.Color(0x818cf8);
    const colWhite  = new THREE.Color(0xf0f9ff);

    // ─── Wave particle lattice ──────────────────────────────────────────────
    const GX = 84, GZ = 84, SP = 1.6;
    const NPTS = GX * GZ;
    const gPos = new Float32Array(NPTS * 3);
    const gCol = new Float32Array(NPTS * 3);

    // Store base XZ so we can reuse them without drift
    const baseX = new Float32Array(NPTS);
    const baseZ = new Float32Array(NPTS);

    for (let i = 0; i < GX; i++) {
      for (let j = 0; j < GZ; j++) {
        const flat = i * GZ + j;
        const x    = (i - GX / 2) * SP;
        const z    = (j - GZ / 2) * SP - 6;
        baseX[flat] = x;
        baseZ[flat] = z;
        gPos[flat * 3]     = x;
        gPos[flat * 3 + 1] = 0;
        gPos[flat * 3 + 2] = z;

        const dist = Math.sqrt(x * x + z * z) / 50;
        const col  = colCyan.clone().lerp(colIndigo, Math.min(1, dist));
        if (Math.random() > 0.94) col.lerp(colWhite, 0.75);
        gCol[flat * 3]     = col.r;
        gCol[flat * 3 + 1] = col.g;
        gCol[flat * 3 + 2] = col.b;
      }
    }

    const waveGeo = new THREE.BufferGeometry();
    waveGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
    waveGeo.setAttribute('color',    new THREE.BufferAttribute(gCol, 3));

    const waveMat = new THREE.PointsMaterial({
      size: 1.05, map: mkTex(), vertexColors: true,
      transparent: true, opacity: 0.82,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const waveGrid = new THREE.Points(waveGeo, waveMat);
    waveGrid.position.set(0, -9.5, 0);
    waveGrid.rotation.x = 0.26;
    scene.add(waveGrid);

    // ─── Ambient starfield ──────────────────────────────────────────────────
    const SCNT = 340;
    const sPos  = new Float32Array(SCNT * 3);
    const sCols = new Float32Array(SCNT * 3);
    for (let k = 0; k < SCNT; k++) {
      sPos[k * 3]     = (Math.random() - 0.5) * 160;
      sPos[k * 3 + 1] = (Math.random() - 0.5) * 90;
      sPos[k * 3 + 2] = (Math.random() - 0.5) * 80;
      const c = Math.random() > 0.5 ? colCyan : colIndigo;
      sCols[k * 3] = c.r; sCols[k * 3 + 1] = c.g; sCols[k * 3 + 2] = c.b;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    sGeo.setAttribute('color',    new THREE.BufferAttribute(sCols, 3));
    const sMat = new THREE.PointsMaterial({
      size: 0.75, map: mkTex(), vertexColors: true,
      transparent: true, opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(sGeo, sMat);
    scene.add(starField);

    // ─── Scroll tracking ─────────────────────────────────────────────────────
    // Track raw scrollY pixels — used directly to drive mesh rotation.
    const scroll = { raw: 0, smooth: 0 };
    const onScroll = () => {
      scroll.raw = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ─── Mouse parallax ─────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      const r = container.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / container.clientWidth)  * 2 - 1;
      mouse.ty = -((e.clientY - r.top) / container.clientHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ─── Helpers ────────────────────────────────────────────────────────────
    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp01 = (x) => Math.max(0, Math.min(1, x));
    // Remap x from [inMin,inMax] → [0,1], clamped
    const remap = (x, inMin, inMax) => clamp01((x - inMin) / (inMax - inMin));

    // ─── Animation loop ──────────────────────────────────────────────────────
    let rafId;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const el = clock.getElapsedTime();

      // Smooth scroll (raw px)
      scroll.smooth += (scroll.raw - scroll.smooth) * 0.06;
      // Normalise to 0-1 for camera bands
      const maxSc  = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const st     = Math.min(1, scroll.smooth / maxSc);

      // Scroll bands (0→1, smooth)
      const aboutT = remap(st, 0.15, 0.50);
      const deepT  = remap(st, 0.50, 0.85);

      // ── Mouse lerp ────────────────────────────────────────────────────────
      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;

      // ── Camera ────────────────────────────────────────────────────────────
      // As user scrolls into About: camera gently rises (+3 units Y) and
      // pulls back slightly (+4 units Z). Deep: rises a bit more.
      const targetCamY = lerp(4.5, lerp(7.5, 9.5, deepT), aboutT);
      const targetCamZ = lerp(42,  lerp(46,  50,   deepT), aboutT);

      camera.position.x += (mouse.x * 6.0 - camera.position.x) * 0.04;
      camera.position.y += ((targetCamY + mouse.y * 3.5) - camera.position.y) * 0.04;
      camera.position.z += (targetCamZ - camera.position.z) * 0.04;
      camera.lookAt(0, 0.5, 0);

      // ── Wave grid: continuous Y-spin driven by scrollY ────────────────────
      // 0.0008 rad/px → ~2.4 rad over a 3000px page. Very low, very smooth.
      const targetRotY = scroll.smooth * 0.0008;
      waveGrid.rotation.y += (targetRotY - waveGrid.rotation.y) * 0.05;

      // Wave speed & amplitude scale with scroll
      const speedMul = lerp(1.0, 1.55, aboutT);
      const ampMul   = lerp(1.0, 1.40, aboutT);

      const posAttr = waveGeo.attributes.position;
      const arr     = posAttr.array;

      for (let i = 0; i < GX; i++) {
        for (let j = 0; j < GZ; j++) {
          const flat = i * GZ + j;
          const idx  = flat * 3;
          const bx   = baseX[flat];
          const bz   = baseZ[flat];

          // Keep XZ positions exactly at base — no stretching or warping
          arr[idx]     = bx;
          arr[idx + 2] = bz;

          // Mouse ripple
          const dx = bx - mouse.x * 20;
          const dz = bz - (-mouse.y * 20);
          const dm = Math.sqrt(dx * dx + dz * dz);
          const mw = Math.sin(Math.max(0, 16 - dm) * 0.4 - el * 3) * 1.2;

          arr[idx + 1] = ampMul * (
            Math.sin(bx * 0.14 + el * 1.3 * speedMul) * 2.2 +
            Math.cos(bz * 0.12 + el * 1.1 * speedMul) * 2.0 +
            Math.sin((bx + bz) * 0.09 + el * 0.8 * speedMul) * 1.4 +
            (dm < 16 ? mw : 0)
          );
        }
      }
      posAttr.needsUpdate = true;

      // ── Starfield ─────────────────────────────────────────────────────────
      // Gentle continuous spin, scroll adds a slow roll on X.
      // Scale stays at 1 — no pulling inward.
      starField.rotation.y = el * 0.02 + aboutT * 0.08;
      starField.rotation.x = Math.sin(el * 0.015) * 0.05 + aboutT * 0.12;
      sMat.opacity = lerp(0.65, 0.85, aboutT);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      waveGeo.dispose(); waveMat.dispose();
      sGeo.dispose();    sMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={mountRef}
      className="three-motion-canvas-container"
      aria-hidden="true"
    />
  );
}
