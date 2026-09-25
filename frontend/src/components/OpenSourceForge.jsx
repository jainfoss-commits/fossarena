import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  ExternalLink,
  Copy,
  Check,
  Code2,
} from 'lucide-react';
import './OpenSourceForge.css';

const FORGE_PROJECTS = [
  {
    id: 'openpulse',
    name: 'OpenPulse CLI',
    lang: 'Rust',
    langColor: '#f97316',
    license: 'GPL-3.0',
    stars: '1.2k',
    forks: '184',
    tagline: 'Cross-platform terminal telemetry & diagnostics',
    description:
      'A blazing-fast, asynchronous systems monitor and network socket analyzer built in pure Rust. Runs with sub-5ms CPU overhead.',
    command: 'cargo install openpulse-cli',
  },
  {
    id: 'cognitivedesk',
    name: 'CognitiveDesk',
    lang: 'Python / React',
    langColor: '#38bdf8',
    license: 'Apache-2.0',
    stars: '890',
    forks: '132',
    tagline: 'Self-hosted AI agent platform & private RAG',
    description:
      'Private, local LLM orchestration engine connecting Ollama and vector embeddings without sending a single byte to external clouds.',
    command: 'git clone https://github.com/fossclub/cognitivedesk',
  },
  {
    id: 'kernelforge',
    name: 'KernelForge',
    lang: 'C / eBPF',
    langColor: '#34d399',
    license: 'MIT',
    stars: '640',
    forks: '95',
    tagline: 'Linux kernel runtime tracer & observability daemon',
    description:
      'High-performance kernel hook runtime for debugging memory allocations, syscall tracing, and zero-overhead container security.',
    command: 'git clone https://github.com/fossclub/kernelforge',
  },
  {
    id: 'libreauth',
    name: 'LibreAuth Protocol',
    lang: 'Go',
    langColor: '#a855f7',
    license: 'GPL-3.0',
    stars: '512',
    forks: '78',
    tagline: 'Zero-knowledge peer-to-peer identity primitive',
    description:
      'Decentralized cryptographic credential verification designed for campus networks, hackathons, and offline-first community guilds.',
    command: 'go install github.com/fossclub/libreauth@latest',
  },
];

const CONTRIBUTOR_STEPS = [
  {
    step: '01',
    title: 'Fork & Clone',
    desc: 'Pick an issue tagged `good-first-issue` on our GitHub org. Spin up the project inside our preconfigured devcontainers in under 60 seconds.',
    command: 'git clone https://github.com/fossclub/repo.git',
  },
  {
    step: '02',
    title: 'Build & Benchmark',
    desc: 'Compile locally, verify unit test coverage, and benchmark runtime latency against our automated POSIX and formatting pipelines.',
    command: 'make test && cargo clippy',
  },
  {
    step: '03',
    title: 'Peer Review',
    desc: 'Pair with guild leads and senior maintainers. Get line-by-line feedback on memory safety, clean abstractions, and edge cases.',
    command: 'gh pr create --fill --draft',
  },
  {
    step: '04',
    title: 'Upstream Merge',
    desc: 'Your commit lands in production code used by real developers worldwide. Your pull request history becomes your verifiable engineering proof.',
    command: 'git log -1 --stat',
  },
];

export default function OpenSourceForge() {
  const canvasRef = useRef(null);
  const [copiedId, setCopiedId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  // 3D Three.js Interactive Code Node Mesh
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Glowing wireframe icosahedron
    const sphereGeo = new THREE.IcosahedronGeometry(70, 2);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireframeSphere = new THREE.Mesh(sphereGeo, wireframeMat);
    scene.add(wireframeSphere);

    // Orbital particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 70 + (Math.random() - 0.5) * 20;

      posArray[i] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = r * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 3.2,
      color: 0x818cf8,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Inner glowing core
    const coreGeo = new THREE.SphereGeometry(22, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / height - 0.5) * 2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      wireframeSphere.rotation.y += 0.003;
      wireframeSphere.rotation.x += 0.0015;

      particleSystem.rotation.y -= 0.002;
      particleSystem.rotation.x -= 0.001;

      core.rotation.y += 0.005;

      // Mouse influence
      wireframeSphere.rotation.y += mouseX * 0.02;
      wireframeSphere.rotation.x += mouseY * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 360;
      const newH = container.clientHeight || 360;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      sphereGeo.dispose();
      wireframeMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
    };
  }, []);

  const copyCommand = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="forge-section" id="forge">
      <div className="section-container">
        {/* Header */}
        <div className="forge-header-centered">
          <div className="forge-badge-pill">
            <span className="forge-badge-dot" />
            <span>OPEN FORGE // CODE THAT SHIPS</span>
          </div>

          <h2 className="forge-heading">
            Built in the Open. <span className="text-gradient-cyan">Maintained Upstream.</span>
          </h2>

          <p className="forge-subtitle">
            We don’t do homework toys or slide decks. Every project under FOSS Club is open-source,
            version-controlled, licensed under copyleft or permissive terms, and solves real developer problems.
          </p>
        </div>

        {/* 3D Visualizer & Pipeline Hero Box */}
        <div className="forge-hero-box">
          <div className="forge-visual-col">
            <div className="forge-3d-wrapper" ref={canvasRef} />
            <div className="forge-3d-caption">
              <span className="live-dot" />
              <span>LIVE GUILD TOPOLOGY // DISTRIBUTED REPO CLUSTER</span>
            </div>
          </div>

          <div className="forge-pipeline-col">
            <div className="pipeline-header">
              <span className="pipeline-badge">FIRST PR PROTOCOL</span>
              <h3 className="pipeline-title">From Zero to Merged in 4 Steps</h3>
              <p className="pipeline-desc">
                No prior open-source experience? Our guild pairs every newcomer with maintainers
                to ship their first pull request.
              </p>
            </div>

            <div className="pipeline-stepper">
              {CONTRIBUTOR_STEPS.map((s, idx) => (
                <div
                  key={s.step}
                  className={`pipeline-step-item ${activeStep === idx ? 'is-active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="step-num-pill">{s.step}</div>
                  <div className="step-content">
                    <h4 className="step-title">{s.title}</h4>
                    <p className="step-desc">{s.desc}</p>
                    <div className="step-code-snippet">
                      <code>$ {s.command}</code>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="forge-repos-header">
          <div className="repos-header-left">
            <Code2 size={18} className="text-cyan" />
            <span className="repos-header-label">FEATURED COMMUNITY CODEBASES</span>
          </div>
          <span className="repos-meta-tag">100% LIBRE / ZERO RESTRICTIONS</span>
        </div>

        <div className="forge-projects-grid">
          {FORGE_PROJECTS.map((proj) => (
            <div key={proj.id} className="forge-project-card">
              <div className="project-card-top">
                <div className="project-title-group">
                  <h3 className="project-name">{proj.name}</h3>
                  <span className="project-tagline">{proj.tagline}</span>
                </div>
                <div
                  className="project-lang-pill"
                  style={{ '--lang-col': proj.langColor }}
                >
                  <span className="lang-indicator" />
                  {proj.lang}
                </div>
              </div>

              <p className="project-desc">{proj.description}</p>

              <div className="project-command-bar">
                <code>{proj.command}</code>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => copyCommand(proj.command, proj.id)}
                  aria-label="Copy install command"
                >
                  {copiedId === proj.id ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

              <div className="project-card-footer">
                <div className="project-stats-meta">
                  <span className="stat-item">⭐ {proj.stars}</span>
                  <span className="stat-item">🔀 {proj.forks}</span>
                  <span className="stat-license">{proj.license}</span>
                </div>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="project-view-btn"
                >
                  <span>Clone Code</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
