import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// In-memory flag that lives in module scope.
// When entering the site or refreshing (F5 / new tab), this is always false.
// When navigating between routes within the app (event <-> about), this stays true.
let hasRunInitialLoad = false;

export default function ThreeMotionCanvas({ onOpeningComplete }) {
  const mountRef = useRef(null);
  const alreadyOpened = hasRunInitialLoad;
  const [loadingPercent, setLoadingPercent] = useState(alreadyOpened ? 100 : 0);
  const [isOpeningDone, setIsOpeningDone] = useState(alreadyOpened);
  const onOpeningCompleteRef = useRef(onOpeningComplete);

  useEffect(() => {
    onOpeningCompleteRef.current = onOpeningComplete;
  }, [onOpeningComplete]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ─── Scene & Camera Setup ──────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070c, 0.0016);

    // Initial camera at Y = 0 so ball is dead-center during loading
    const camera = new THREE.PerspectiveCamera(
      56,
      container.clientWidth / container.clientHeight,
      0.1,
      1200
    );
    camera.position.set(0, 0, 42);
    camera.lookAt(0, 0, 0);

    // ─── High-performance WebGL Renderer ───────────────────────────────────
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

    // ─── Lighting ──────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x0d1527, 3.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 4.8, 95, 1.2);
    cyanLight.position.set(18, 16, 24);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x818cf8, 4.2, 90, 1.2);
    violetLight.position.set(-18, -8, 20);
    scene.add(violetLight);

    // ─── 1. Expansive Screen-Covering Particle Wave Lattice ─────────────────
    const GRID_X = 84;
    const GRID_Z = 84;
    const NUM_PARTICLES = GRID_X * GRID_Z;
    const SPACING = 1.6;

    const particlePositions = new Float32Array(NUM_PARTICLES * 3);
    const particleColors = new Float32Array(NUM_PARTICLES * 3);

    const colCyan = new THREE.Color(0x38bdf8);
    const colIndigo = new THREE.Color(0x818cf8);
    const colWhite = new THREE.Color(0xf0f9ff);

    for (let i = 0; i < GRID_X; i++) {
      for (let j = 0; j < GRID_Z; j++) {
        const idx = (i * GRID_Z + j) * 3;
        const x = (i - GRID_X / 2) * SPACING;
        const z = (j - GRID_Z / 2) * SPACING - 6;
        const y = 0;

        particlePositions[idx] = x;
        particlePositions[idx + 1] = y;
        particlePositions[idx + 2] = z;

        const dist = Math.sqrt(x * x + z * z) / 50;
        const mixCol = colCyan.clone().lerp(colIndigo, Math.min(1, dist));
        if (Math.random() > 0.94) mixCol.lerp(colWhite, 0.75);

        particleColors[idx] = mixCol.r;
        particleColors[idx + 1] = mixCol.g;
        particleColors[idx + 2] = mixCol.b;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(56, 189, 248, 0.9)');
      grad.addColorStop(0.65, 'rgba(129, 140, 248, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.05,
      map: createParticleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: alreadyOpened ? 0.8 : 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleGrid = new THREE.Points(particleGeometry, particleMaterial);
    particleGrid.position.set(0, -9.5, 0);
    particleGrid.rotation.x = 0.26;
    scene.add(particleGrid);

    // ─── 2. GEOMETRIC 3D WIREFRAME BALL (DURING LOADING SCREEN) ───────────
    const totemGroup = new THREE.Group();
    totemGroup.position.set(0, 0, 16);
    scene.add(totemGroup);

    const outlineGeo = new THREE.IcosahedronGeometry(7.8, 1);
    const outlineMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: alreadyOpened ? 0 : 0.88,
    });
    const outlineMesh = new THREE.Mesh(outlineGeo, outlineMat);
    totemGroup.add(outlineMesh);

    const innerWireGeo = new THREE.IcosahedronGeometry(7.7, 0);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: alreadyOpened ? 0 : 0.55,
    });
    const innerWireMesh = new THREE.Mesh(innerWireGeo, innerWireMat);
    totemGroup.add(innerWireMesh);

    const coreGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: alreadyOpened ? 0 : 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    totemGroup.add(coreMesh);

    const ring1Geo = new THREE.RingGeometry(8.8, 8.88, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: alreadyOpened ? 0 : 0.75,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    totemGroup.add(ring1);

    const ring2Geo = new THREE.RingGeometry(9.6, 9.68, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: alreadyOpened ? 0 : 0.65,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    totemGroup.add(ring2);

    const loadingSatellites = [];
    const satColors = [0x38bdf8, 0xa855f7, 0xec4899, 0xfacc15];
    for (let s = 0; s < 4; s++) {
      const satGeo = new THREE.SphereGeometry(0.42, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({
        color: satColors[s],
        transparent: true,
        opacity: alreadyOpened ? 0 : 0.9,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.userData = {
        radius: 11.2,
        speed: 1.8 + s * 0.4,
        phase: (s * Math.PI) / 2,
        tilt: (s * Math.PI) / 4,
      };
      totemGroup.add(satMesh);
      loadingSatellites.push(satMesh);
    }

    if (alreadyOpened) {
      totemGroup.visible = false;
    }

    // ─── 3. Floating Ambient Starfield Nodes ────────────────────────────────
    const STARS_COUNT = 340;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(STARS_COUNT * 3);
    const starCols = new Float32Array(STARS_COUNT * 3);

    for (let k = 0; k < STARS_COUNT; k++) {
      starPos[k * 3] = (Math.random() - 0.5) * 160;
      starPos[k * 3 + 1] = (Math.random() - 0.5) * 90;
      starPos[k * 3 + 2] = (Math.random() - 0.5) * 80;

      const c = Math.random() > 0.5 ? colCyan : colIndigo;
      starCols[k * 3] = c.r;
      starCols[k * 3 + 1] = c.g;
      starCols[k * 3 + 2] = c.b;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCols, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.75,
      map: createParticleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: alreadyOpened ? 0.65 : 0,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ─── Loading Flow & Percentage Sequence ───────────────────────────────
    let currentPhase = alreadyOpened ? 'docked' : 'loading';
    const loadStartTime = performance.now();
    const LOAD_DURATION = 2100; // Smooth loading duration

    if (alreadyOpened) {
      totemGroup.visible = false;
      particleMaterial.opacity = 0.8;
      starMat.opacity = 0.65;
      if (onOpeningCompleteRef.current) {
        onOpeningCompleteRef.current();
      }
    }

    // ─── Mouse Movement & Smooth Parallax Interaction ──────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / container.clientWidth) * 2 - 1;
      mouse.targetY = -(clientY / container.clientHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);
    onResize();

    // ─── Animation Loop (Runs continuously, ONCE only!) ────────────────────
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const now = performance.now();

      // ── Step A: Percentage Progression ────────────────
      if (currentPhase === 'loading') {
        const timePassed = now - loadStartTime;
        const pct = Math.min(100, Math.floor((timePassed / LOAD_DURATION) * 100));
        setLoadingPercent(pct);

        // Keep ball centered at (0, 0, 16) during loading
        totemGroup.position.set(0, 0, 16);

        // Clean rotation of loading wireframe ball
        outlineMesh.rotation.x += 0.016;
        outlineMesh.rotation.y += 0.022;
        innerWireMesh.rotation.x -= 0.012;
        innerWireMesh.rotation.y -= 0.016;
        ring1.rotation.z += 0.025;
        ring2.rotation.y += 0.02;

        loadingSatellites.forEach((sat) => {
          const { radius, speed, phase, tilt } = sat.userData;
          const a = elapsed * speed + phase;
          sat.position.x = Math.cos(a) * radius;
          sat.position.z = Math.sin(a) * radius;
          sat.position.y = Math.sin(a * 2 + tilt) * 3;
        });

        const pulse = 1 + Math.sin(elapsed * 4) * 0.08;
        coreMesh.scale.set(pulse, pulse, pulse);

        // Camera stays locked dead-center during loading
        camera.position.set(0, 0, 42);
        camera.lookAt(0, 0, 0);

        if (timePassed >= LOAD_DURATION) {
          currentPhase = 'opening';
          hasRunInitialLoad = true;
          if (onOpeningCompleteRef.current) {
            onOpeningCompleteRef.current();
          }
          setTimeout(() => {
            currentPhase = 'docked';
            setIsOpeningDone(true);
          }, 850);
        }
      } else {
        // Phase is 'opening' or 'docked':
        // Wireframe loading ball smoothly dissolves away
        outlineMat.opacity = Math.max(0, outlineMat.opacity - 0.08);
        innerWireMat.opacity = Math.max(0, innerWireMat.opacity - 0.08);
        coreMat.opacity = Math.max(0, coreMat.opacity - 0.08);
        ring1Mat.opacity = Math.max(0, ring1Mat.opacity - 0.08);
        ring2Mat.opacity = Math.max(0, ring2Mat.opacity - 0.08);
        loadingSatellites.forEach((sat) => {
          sat.material.opacity = Math.max(0, sat.material.opacity - 0.08);
        });

        if (outlineMat.opacity <= 0.01) {
          totemGroup.visible = false;
        }

        // Reveal background particle wave & stars smoothly
        particleMaterial.opacity += (0.82 - particleMaterial.opacity) * 0.05;
        starMat.opacity += (0.65 - starMat.opacity) * 0.05;

        // Camera smoothly glides to dynamic parallax angle based on mouse
        camera.position.x += (mouse.x * 6.0 - camera.position.x) * 0.04;
        camera.position.y += ((4.5 + mouse.y * 3.5) - camera.position.y) * 0.04;
        camera.lookAt(0, 0.5, 0);
      }

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      // ── Step C: Animate Wave Lattice (Only when visible) ─
      if (particleMaterial.opacity > 0.02) {
        const posAttr = particleGeometry.attributes.position;
        const posArray = posAttr.array;

        for (let i = 0; i < GRID_X; i++) {
          for (let j = 0; j < GRID_Z; j++) {
            const idx = (i * GRID_Z + j) * 3;
            const x = posArray[idx];
            const z = posArray[idx + 2];

            const wave1 = Math.sin(x * 0.14 + elapsed * 1.3) * 2.2;
            const wave2 = Math.cos(z * 0.12 + elapsed * 1.1) * 2.0;
            const wave3 = Math.sin((x + z) * 0.09 + elapsed * 0.8) * 1.4;

            const dx = x - mouse.x * 20;
            const dz = z - (-mouse.y * 20);
            const distToMouse = Math.sqrt(dx * dx + dz * dz);
            const mouseWave = Math.sin(Math.max(0, 16 - distToMouse) * 0.4 - elapsed * 3) * 1.2;

            posArray[idx + 1] = wave1 + wave2 + wave3 + (distToMouse < 16 ? mouseWave : 0);
          }
        }
        posAttr.needsUpdate = true;
      }

      // Ambient starfield drift
      starField.rotation.y = elapsed * 0.02;
      starField.rotation.x = Math.sin(elapsed * 0.015) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // ─── Cleanup on unmount ─────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      particleGeometry.dispose();
      particleMaterial.dispose();
      outlineGeo.dispose();
      outlineMat.dispose();
      innerWireGeo.dispose();
      innerWireMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []); // Runs once and only once!

  return (
    <>
      {/* 3D WebGL Canvas Mount */}
      <div
        ref={mountRef}
        className="three-motion-canvas-container"
        aria-hidden="true"
      />

      {/* Loading Percentage - Words only, no container */}
      {!isOpeningDone && (
        <div
          className={`words-loader-hud ${loadingPercent >= 100 ? 'preloader-fade-out' : ''}`}
          aria-live="polite"
        >
          <span className="words-loader-text">LOADING {loadingPercent}%</span>
        </div>
      )}
    </>
  );
}
