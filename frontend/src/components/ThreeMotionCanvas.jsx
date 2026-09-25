import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeMotionCanvas({ onOpeningComplete }) {
  const mountRef = useRef(null);
  const [loadingWord, setLoadingWord] = useState('INITIALIZING FOSS PROTOCOL');
  const [isOpeningDone, setIsOpeningDone] = useState(false);
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
      58,
      container.clientWidth / container.clientHeight,
      0.1,
      1200
    );
    camera.position.set(0, 0, 42);
    camera.lookAt(0, 0, 0);

    // ─── High-performance Renderer ─────────────────────────────────────────
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

    // ─── Lighting ──────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x0a1122, 2.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 4.5, 90, 1.2);
    cyanLight.position.set(16, 14, 22);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x818cf8, 4.0, 85, 1.2);
    violetLight.position.set(-18, -6, 18);
    scene.add(violetLight);

    const coreLight = new THREE.PointLight(0x38bdf8, 6.0, 45, 1.4);
    scene.add(coreLight);

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
        if (Math.random() > 0.93) mixCol.lerp(colWhite, 0.75);

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
      opacity: 0, // Starts at 0: completely blank during loading!
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleGrid = new THREE.Points(particleGeometry, particleMaterial);
    particleGrid.position.set(0, -9.5, 0);
    particleGrid.rotation.x = 0.26;
    scene.add(particleGrid);

    // ─── 2. HIGH-TECH 3D BALL (QUANTUM TOTEM) ──────────────────────────────
    const totemGroup = new THREE.Group();
    // Starts exactly in the geometric center of screen (0, 0, 16)
    totemGroup.position.set(0, 0, 16);
    totemGroup.scale.set(1.0, 1.0, 1.0);
    scene.add(totemGroup);

    // Layer A: Outer Geodesic Icosahedron Shield
    const icoGeo = new THREE.IcosahedronGeometry(8.6, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    totemGroup.add(icoMesh);

    // Layer B: Concentric Dodecahedron Crystal Lattice
    const ddecGeo = new THREE.DodecahedronGeometry(7.2, 0);
    const ddecMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const ddecMesh = new THREE.Mesh(ddecGeo, ddecMat);
    totemGroup.add(ddecMesh);

    // Layer C: Multi-Axis Armillary Gyroscope Rings
    const ring1Geo = new THREE.TorusGeometry(8.2, 0.1, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    totemGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(7.4, 0.09, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      emissive: 0x4f46e5,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3.2;
    ring2.rotation.y = Math.PI / 4;
    totemGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(6.4, 0.08, 16, 120);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x059669,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = -Math.PI / 3;
    totemGroup.add(ring3);

    // Layer D: Inner Metallic Chrome Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(4.4, 0.72, 128, 28, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x0b1329,
      emissive: 0x1e3a8a,
      roughness: 0.15,
      metalness: 0.95,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    totemGroup.add(knotMesh);

    // Layer E: Glowing Plasma Core
    const coreGeo = new THREE.SphereGeometry(2.1, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.92,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    totemGroup.add(coreMesh);

    // Layer F: Swarm of Micro-Particles in Spherical Aura
    const SWARM_COUNT = 90;
    const swarmGeo = new THREE.BufferGeometry();
    const swarmPos = new Float32Array(SWARM_COUNT * 3);
    for (let sw = 0; sw < SWARM_COUNT; sw++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 8.5 + (Math.random() - 0.5) * 1.5;
      swarmPos[sw * 3] = r * Math.sin(phi) * Math.cos(theta);
      swarmPos[sw * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      swarmPos[sw * 3 + 2] = r * Math.cos(phi);
    }
    swarmGeo.setAttribute('position', new THREE.BufferAttribute(swarmPos, 3));
    const swarmMat = new THREE.PointsMaterial({
      size: 0.65,
      color: 0x38bdf8,
      map: createParticleTexture(),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const swarmMesh = new THREE.Points(swarmGeo, swarmMat);
    totemGroup.add(swarmMesh);

    // Layer G: Orbiting Satellites
    const satellites = [];
    const satCount = 6;
    for (let s = 0; s < satCount; s++) {
      const satGeo = new THREE.OctahedronGeometry(0.65, 0);
      const satMat = new THREE.MeshBasicMaterial({
        color: s % 2 === 0 ? 0x38bdf8 : 0x34d399,
        wireframe: true,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.userData = {
        baseRadius: 11.2 + (s % 3) * 1.8,
        currentRadius: 5.5, // expands smoothly when opened
        speed: 0.75 + s * 0.15,
        phase: (s * Math.PI * 2) / satCount,
        tilt: (s * 0.4) - 0.6,
      };
      totemGroup.add(sat);
      satellites.push(sat);
    }

    // ─── 3. Floating Ambient Starfield Nodes ────────────────────────────────
    const STARS_COUNT = 450;
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
      opacity: 0, // Starts at 0: completely blank during loading
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ─── Target Coordinates for Ball Destination (MORE TO THE RIGHT) ────────
    // User requested: "place the final location of the ball more right"
    const getTargetPos = () => {
      const w = container.clientWidth;
      if (w < 820) return { x: 0, y: -2.5, z: -4 };
      if (w < 1140) return { x: 13.5, y: 1.5, z: 0 };
      if (w < 1440) return { x: 18.0, y: 1.8, z: 0 };
      return { x: 20.0, y: 1.8, z: 0 }; // Placed more to the right!
    };

    // ─── Loading Flow & Slow Words-Only Sequence ───────────────────────────
    let currentPhase = 'loading'; // 'loading' -> 'opening' -> 'docked'
    const loadStartTime = performance.now();
    const LOAD_DURATION = 2600; // Slow, deliberate loading duration

    const wordStages = [
      { at: 0, text: 'INITIALIZING FOSS PROTOCOL' },
      { at: 750, text: 'SYNCHRONIZING DISTRIBUTED NODES' },
      { at: 1550, text: 'COMPILING SYSTEMS RUNTIME' },
      { at: 2250, text: 'CORE READY // LAUNCHING' },
    ];

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

      // ── Step A: Words Progression ─────────────────────
      if (currentPhase === 'loading') {
        const timePassed = now - loadStartTime;
        for (let i = wordStages.length - 1; i >= 0; i--) {
          if (timePassed >= wordStages[i].at) {
            setLoadingWord(wordStages[i].text);
            break;
          }
        }

        if (timePassed >= LOAD_DURATION) {
          currentPhase = 'opening';
          // Trigger the site reveal so navbar & text come in as ball glides to the right
          if (onOpeningCompleteRef.current) {
            onOpeningCompleteRef.current();
          }
          setTimeout(() => {
            currentPhase = 'docked';
            setIsOpeningDone(true);
          }, 950);
        }
      }

      // ── Step B: Ball Opening & Moving from Middle to the RIGHT ────
      const target = getTargetPos();

      if (currentPhase === 'loading') {
        // Ball stays precisely centered in the middle of the dark screen (0, 0, 16)
        totemGroup.position.set(0, 0, 16);

        // Satellites stay compact
        satellites.forEach((sat) => {
          sat.userData.currentRadius += (5.5 - sat.userData.currentRadius) * 0.1;
        });

        // Steady loading spin
        icoMesh.rotation.x += 0.038;
        icoMesh.rotation.y += 0.048;
        ring1.rotation.z += 0.055;
        ring2.rotation.y += 0.045;
        ring3.rotation.x += 0.06;
        knotMesh.rotation.x -= 0.045;
        knotMesh.rotation.y += 0.055;

        // Camera stays locked dead-center
        camera.position.set(0, 0, 42);
        camera.lookAt(0, 0, 0);
      } else {
        // Phase is 'opening' or 'docked':
        // 1. Reveal background particle wave & stars smoothly without lag
        particleMaterial.opacity += (0.8 - particleMaterial.opacity) * 0.04;
        starMat.opacity += (0.65 - starMat.opacity) * 0.04;

        // 2. Ball glides smoothly to the RIGHT!
        totemGroup.position.x += (target.x - totemGroup.position.x) * 0.042;
        totemGroup.position.y += (target.y - totemGroup.position.y) * 0.042;
        totemGroup.position.z += (target.z - totemGroup.position.z) * 0.042;

        // NO SHRINKING: Keep scale smooth and stable (1.0)
        totemGroup.scale.set(1.0, 1.0, 1.0);
        icoMesh.scale.set(1.0, 1.0, 1.0);

        // Gyroscopic rings decouple and rotate on independent axes
        ring1.rotation.z = elapsed * 0.35;
        ring2.rotation.y = elapsed * 0.28;
        ring2.rotation.x = Math.PI / 3.2 + Math.sin(elapsed * 0.6) * 0.2;
        ring3.rotation.x = -elapsed * 0.42;

        // Satellites smoothly expand outward into full orbit without shrinking back
        satellites.forEach((sat) => {
          sat.userData.currentRadius += (sat.userData.baseRadius - sat.userData.currentRadius) * 0.04;
        });

        // Ambient rotation
        icoMesh.rotation.x = elapsed * 0.18;
        icoMesh.rotation.y = elapsed * 0.24;
        ddecMesh.rotation.y = -elapsed * 0.2;
        knotMesh.rotation.x = -elapsed * 0.28;
        knotMesh.rotation.y = elapsed * 0.36;

        // Camera smoothly glides to dynamic parallax angle
        camera.position.x += (mouse.x * 5.5 - camera.position.x) * 0.04;
        camera.position.y += ((4.5 + mouse.y * 3.5) - camera.position.y) * 0.04;
        camera.lookAt(totemGroup.position.x * 0.3, 1, 0);
      }

      // Micro-particles swarm orbit around ball
      swarmMesh.rotation.y = elapsed * 0.25;
      swarmMesh.rotation.x = Math.sin(elapsed * 0.15) * 0.2;

      // Core PointLight follows ball
      coreLight.position.copy(totemGroup.position);

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

      // Pulsate core
      const pulse = 1 + Math.sin(elapsed * 2.8) * 0.12;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Animate Satellites in 3D orbit
      satellites.forEach((sat) => {
        const { currentRadius, speed, phase, tilt } = sat.userData;
        const angle = elapsed * speed + phase;
        sat.position.x = Math.cos(angle) * currentRadius;
        sat.position.z = Math.sin(angle) * currentRadius;
        sat.position.y = Math.sin(angle * 2 + tilt) * 3.5;
        sat.rotation.x += 0.04;
        sat.rotation.y += 0.05;
      });

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
      icoGeo.dispose();
      icoMat.dispose();
      ddecGeo.dispose();
      ddecMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      swarmGeo.dispose();
      swarmMat.dispose();
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
      {/* 3D Canvas covering the screen */}
      <div
        ref={mountRef}
        className="three-motion-canvas-container"
        aria-hidden="true"
      />

      {/* Words-Only Loading Indicator (No bar line, no percentages!) */}
      {!isOpeningDone && (
        <div
          className={`words-loader-hud ${loadingWord.includes('LAUNCHING') ? 'preloader-fade-out' : ''}`}
          aria-live="polite"
        >
          <span className="words-loader-dot" />
          <span className="words-loader-text">{loadingWord}</span>
        </div>
      )}
    </>
  );
}
