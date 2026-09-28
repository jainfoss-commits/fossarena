/**
 * avatarTextures.js
 * Generates high-resolution 3D clay-style contributor avatars
 * matching the community constellation ball reference.
 * 
 * Features:
 * - 13 distinct characters (1 center, 4 inner ring, 8 outer ring)
 * - 3D shaded circular badge background with soft drop-light
 * - Claymorphic hair, facial features, sunglasses, headphones, caps, turtlenecks
 * - Returns HTML Canvas elements, THREE.CanvasTexture, or Data URLs
 */

import * as THREE from 'three';

// Contributor metadata for interactive tooltips & labels
export const AVATAR_METADATA = [
  // ── Center ─────────────────────────────────────────────────────────────
  {
    id: 'center',
    name: 'Maya Lin',
    role: 'Collective Lead',
    tag: '@mayalin · core',
    desc: 'Distributed systems architect & FOSS core maintainer',
    bg: '#c8daf8',
    ring: 'center',
  },
  // ── Inner Ring ─────────────────────────────────────────────────────────
  {
    id: 'mid-tl',
    name: 'Devon Vance',
    role: 'Kernel Engineer',
    tag: '@dvance · linux',
    desc: 'Upstream eBPF scheduler and memory management patches',
    bg: '#fef3c7',
    ring: 'inner',
  },
  {
    id: 'mid-tr',
    name: 'Zuri Okafor',
    role: 'WASM Architect',
    tag: '@zuri · wasm',
    desc: 'JIT compiler optimizers and sandboxed runtime engines',
    bg: '#fef2e8',
    ring: 'inner',
  },
  {
    id: 'mid-bl',
    name: 'Koa Jensen',
    role: 'Audio & DSP Hacker',
    tag: '@koaj · dsp',
    desc: 'Real-time PipeWire audio pipelines and low-latency drivers',
    bg: '#fef08a',
    ring: 'inner',
  },
  {
    id: 'mid-br',
    name: 'Astrid Lind',
    role: 'Security & Cryptography',
    tag: '@astrid · sec',
    desc: 'Zero-knowledge verification and secure enclave enforcements',
    bg: '#ccfbf1',
    ring: 'inner',
  },
  // ── Outer Ring ─────────────────────────────────────────────────────────
  {
    id: 'outer-t',
    name: 'Elena Rostova',
    role: 'Release Engineer',
    tag: '@elena · devops',
    desc: 'Automated CI reproducible builds and toolchain verification',
    bg: '#fce7f3',
    ring: 'outer',
  },
  {
    id: 'outer-tr',
    name: 'Ren Tanaka',
    role: 'Edge & Embedded',
    tag: '@rent · iot',
    desc: 'Zephyr RTOS firmware and RISC-V peripheral drivers',
    bg: '#f5f5f4',
    ring: 'outer',
  },
  {
    id: 'outer-r',
    name: 'Chloe Dubois',
    role: 'Frontend & DX Lead',
    tag: '@chloe · web',
    desc: 'Accessible component primitives and WebGL visualizers',
    bg: '#fce7f3',
    ring: 'outer',
  },
  {
    id: 'outer-br',
    name: 'Tariq Malik',
    role: 'Database Engines',
    tag: '@tariq · storage',
    desc: 'LSM-tree storage engines and lock-free concurrent indexing',
    bg: '#ede9fe',
    ring: 'outer',
  },
  {
    id: 'outer-b',
    name: 'Leo Chen',
    role: 'Networking & P2P',
    tag: '@leochen · p2p',
    desc: 'QUIC transport protocols and DHT peer discovery',
    bg: '#fef9c3',
    ring: 'outer',
  },
  {
    id: 'outer-bl',
    name: 'Samir Patel',
    role: 'Compilers & LLVM',
    tag: '@samir · llvm',
    desc: 'Static analysis tooling and vectorization backends',
    bg: '#e0f2fe',
    ring: 'outer',
  },
  {
    id: 'outer-l',
    name: 'Marcus Bell',
    role: 'AI Model Inference',
    tag: '@marcus · llama',
    desc: 'Quantized neural weights and GPU tensor kernels',
    bg: '#e0e7ff',
    ring: 'outer',
  },
  {
    id: 'outer-tl',
    name: 'Nadia Solis',
    role: 'Rust Platform Dev',
    tag: '@nadia · rust',
    desc: 'Memory-safe systems programming and async runtime',
    bg: '#fef3c7',
    ring: 'outer',
  },
];

/**
 * Renders a specific avatar onto an HTML5 canvas with clay-3D aesthetics
 */
export function drawAvatarToCanvas(id, size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const s = size / 256; // scaling factor

  ctx.clearRect(0, 0, size, size);

  // Helper drawing utilities
  const circle = (cx, cy, r, fillStyle) => {
    ctx.beginPath();
    ctx.arc(cx * s, cy * s, r * s, 0, Math.PI * 2);
    ctx.fillStyle = fillStyle;
    ctx.fill();
  };

  const ellipse = (cx, cy, rx, ry, fillStyle, rot = 0) => {
    ctx.beginPath();
    ctx.ellipse(cx * s, cy * s, rx * s, ry * s, rot, 0, Math.PI * 2);
    ctx.fillStyle = fillStyle;
    ctx.fill();
  };

  const roundRect = (x, y, w, h, r = 0) => {
    const rad = typeof r === 'number' ? r : (Array.isArray(r) ? r[0] || 0 : 0);
    if (typeof ctx.roundRect === 'function') {
      try {
        ctx.roundRect(x, y, w, h, rad);
        return;
      } catch (err) {}
    }
    ctx.rect(x, y, w, h);
  };

  // Find avatar metadata
  const meta = AVATAR_METADATA.find((m) => m.id === id) || AVATAR_METADATA[0];

  // 1. Badge Base Disc with 3D Radial Soft Clay Gradient
  const bgGrad = ctx.createRadialGradient(110 * s, 100 * s, 20 * s, 128 * s, 128 * s, 124 * s);
  bgGrad.addColorStop(0, '#ffffff');
  bgGrad.addColorStop(0.3, meta.bg);
  bgGrad.addColorStop(1, meta.bg);

  ctx.save();
  ctx.beginPath();
  ctx.arc(128 * s, 128 * s, 120 * s, 0, Math.PI * 2);
  ctx.fillStyle = bgGrad;
  ctx.shadowColor = 'rgba(0,0,0,0.22)';
  ctx.shadowBlur = 14 * s;
  ctx.shadowOffsetY = 6 * s;
  ctx.fill();
  ctx.restore();

  // Subtle outer disc rim highlight
  ctx.beginPath();
  ctx.arc(128 * s, 128 * s, 118 * s, 0, Math.PI * 2);
  ctx.lineWidth = 2.5 * s;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.stroke();

  // Clip to disc boundary so torso & hair stay within the circular badge
  ctx.save();
  ctx.beginPath();
  ctx.arc(128 * s, 128 * s, 117 * s, 0, Math.PI * 2);
  ctx.clip();

  // ── DRAW CHARACTERS ACCORDING TO ID ──────────────────────────────────────
  switch (id) {
    case 'center': {
      // Maya Lin - Blue hair, sunglasses, red shirt
      // Torso / Red shirt
      const shirtGrad = ctx.createLinearGradient(0, 180 * s, 0, 260 * s);
      shirtGrad.addColorStop(0, '#ef4444');
      shirtGrad.addColorStop(1, '#b91c1c');
      ctx.beginPath();
      ctx.ellipse(128 * s, 255 * s, 85 * s, 75 * s, 0, 0, Math.PI * 2);
      ctx.fillStyle = shirtGrad;
      ctx.fill();

      // V-neck cutout
      ctx.beginPath();
      ctx.moveTo(110 * s, 205 * s);
      ctx.lineTo(128 * s, 235 * s);
      ctx.lineTo(146 * s, 205 * s);
      ctx.closePath();
      ctx.fillStyle = '#fbcfe8';
      ctx.fill();

      // Neck
      ellipse(128, 195, 20, 26, '#fbd5bd');

      // Blue long hair back drape
      const hairGrad = ctx.createLinearGradient(0, 80 * s, 0, 230 * s);
      hairGrad.addColorStop(0, '#3b82f6');
      hairGrad.addColorStop(1, '#1d4ed8');
      ellipse(128, 145, 68, 68, hairGrad);

      // Head / Face
      const faceGrad = ctx.createRadialGradient(120 * s, 130 * s, 10 * s, 128 * s, 142 * s, 50 * s);
      faceGrad.addColorStop(0, '#ffedd5');
      faceGrad.addColorStop(1, '#fbd5bd');
      ellipse(128, 142, 46, 50, faceGrad);

      // Blue Hair Front / Bangs
      ctx.beginPath();
      ctx.arc(128 * s, 120 * s, 48 * s, Math.PI * 0.9, Math.PI * 2.1);
      ctx.lineTo(176 * s, 185 * s);
      ctx.lineTo(154 * s, 185 * s);
      ctx.lineTo(150 * s, 138 * s);
      ctx.lineTo(106 * s, 138 * s);
      ctx.lineTo(102 * s, 185 * s);
      ctx.lineTo(80 * s, 185 * s);
      ctx.closePath();
      ctx.fillStyle = '#2563eb';
      ctx.fill();

      // Bangs fringe
      ctx.beginPath();
      ctx.moveTo(90 * s, 122 * s);
      ctx.quadraticCurveTo(128 * s, 135 * s, 166 * s, 122 * s);
      ctx.lineTo(166 * s, 95 * s);
      ctx.lineTo(90 * s, 95 * s);
      ctx.closePath();
      ctx.fillStyle = '#3b82f6';
      ctx.fill();

      // Sunglasses / Cool shades
      ctx.beginPath();
      roundRect(96 * s, 135 * s, 28 * s, 16 * s, [4 * s]);
      roundRect(132 * s, 135 * s, 28 * s, 16 * s, [4 * s]);
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      // Glasses bridge
      ctx.beginPath();
      ctx.moveTo(124 * s, 142 * s);
      ctx.lineTo(132 * s, 142 * s);
      ctx.lineWidth = 3 * s;
      ctx.strokeStyle = '#0f172a';
      ctx.stroke();

      // Lens shine
      ctx.beginPath();
      ctx.moveTo(102 * s, 138 * s);
      ctx.lineTo(112 * s, 148 * s);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.stroke();

      // Nose & subtle smile
      circle(128, 158, 2.5, '#ea580c');
      ctx.beginPath();
      ctx.arc(128 * s, 168 * s, 8 * s, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#be123c';
      ctx.stroke();
      break;
    }

    case 'mid-tl': {
      // Devon Vance - Backwards cap, glasses, dark shirt
      // Torso
      ellipse(128, 255, 80, 70, '#1e1b4b');
      // Neck
      ellipse(128, 195, 18, 24, '#fbd5bd');
      // Head
      ellipse(128, 146, 44, 48, '#fbd5bd');

      // Hair tufts
      ellipse(88, 155, 8, 14, '#172554');
      ellipse(168, 155, 8, 14, '#172554');

      // Purple backwards cap
      ctx.beginPath();
      ctx.arc(128 * s, 126 * s, 45 * s, Math.PI * 0.9, Math.PI * 2.1);
      ctx.fillStyle = '#4f46e5';
      ctx.fill();

      // Cap visor pointing back
      ctx.beginPath();
      roundRect(100 * s, 128 * s, 56 * s, 10 * s, [4 * s]);
      ctx.fillStyle = '#3730a3';
      ctx.fill();

      // Cap front button
      circle(128, 86, 5, '#6366f1');

      // Glasses
      ctx.beginPath();
      roundRect(98 * s, 142 * s, 24 * s, 14 * s, [3 * s]);
      roundRect(134 * s, 142 * s, 24 * s, 14 * s, [3 * s]);
      ctx.lineWidth = 2.5 * s;
      ctx.strokeStyle = '#22c55e';
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fill();

      // Eyes
      circle(110, 149, 3, '#0f172a');
      circle(146, 149, 3, '#0f172a');

      // Smile
      ctx.beginPath();
      ctx.arc(128 * s, 168 * s, 7 * s, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#991b1b';
      ctx.stroke();
      break;
    }

    case 'mid-tr': {
      // Zuri Okafor - Dark skin, curly hair, pink glasses, lime shirt
      // Torso / Lime shirt
      ellipse(128, 255, 80, 70, '#84cc16');
      // Neck
      ellipse(128, 195, 18, 24, '#452a1a');

      // Curly hair backdrop
      circle(104, 115, 26, '#18181b');
      circle(152, 115, 26, '#18181b');
      circle(128, 105, 30, '#18181b');

      // Head
      ellipse(128, 145, 44, 46, '#452a1a');

      // Curly afro texture
      for (let a = 0; a < 7; a++) {
        circle(92 + a * 12, 108 + (a % 2) * 5, 14, '#1c1917');
      }

      // Bright Pink rectangular glasses
      ctx.beginPath();
      roundRect(94 * s, 138 * s, 28 * s, 16 * s, [4 * s]);
      roundRect(134 * s, 138 * s, 28 * s, 16 * s, [4 * s]);
      ctx.fillStyle = '#ec4899';
      ctx.fill();

      // Glass shine
      ctx.beginPath();
      roundRect(98 * s, 142 * s, 20 * s, 8 * s, [2 * s]);
      roundRect(138 * s, 142 * s, 20 * s, 8 * s, [2 * s]);
      ctx.fillStyle = '#fdf2f8';
      ctx.fill();

      // Smile
      circle(128, 162, 3, '#26180f');
      ctx.beginPath();
      ctx.arc(128 * s, 170 * s, 8 * s, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.lineWidth = 2.5 * s;
      ctx.strokeStyle = '#f472b6';
      ctx.stroke();
      break;
    }

    case 'mid-bl': {
      // Koa Jensen - Brown skin, blonde hair, blue headphones, red shirt
      // Torso
      ellipse(128, 255, 80, 70, '#dc2626');
      // Neck
      ellipse(128, 195, 18, 24, '#9a6042');
      // Head
      ellipse(128, 146, 44, 48, '#9a6042');

      // Blonde hair crop
      ctx.beginPath();
      ctx.arc(128 * s, 135 * s, 46 * s, Math.PI, Math.PI * 2);
      ctx.fillStyle = '#fde047';
      ctx.fill();

      // Over-ear headphones band
      ctx.beginPath();
      ctx.arc(128 * s, 130 * s, 54 * s, Math.PI * 1.05, Math.PI * 1.95);
      ctx.lineWidth = 7 * s;
      ctx.strokeStyle = '#2563eb';
      ctx.stroke();

      // Ear cup pads
      ellipse(80, 150, 12, 22, '#1d4ed8');
      ellipse(176, 150, 12, 22, '#1d4ed8');
      ellipse(80, 150, 8, 16, '#60a5fa');
      ellipse(176, 150, 8, 16, '#60a5fa');

      // Eyes & smile
      circle(112, 148, 3.5, '#1e293b');
      circle(144, 148, 3.5, '#1e293b');
      ctx.beginPath();
      ctx.arc(128 * s, 168 * s, 8 * s, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.lineWidth = 2.5 * s;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      break;
    }

    case 'mid-br': {
      // Astrid Lind - Blonde hair, green eyes, orange turtleneck, necklace
      // Long hair backdrop
      ellipse(128, 165, 62, 70, '#f1f5f9');
      // Torso / Orange Turtleneck
      ellipse(128, 255, 80, 70, '#ea580c');
      // Turtleneck collar
      ctx.beginPath();
      roundRect(106 * s, 182 * s, 44 * s, 26 * s, [8 * s]);
      ctx.fillStyle = '#f97316';
      ctx.fill();

      // Necklace
      ctx.beginPath();
      ctx.arc(128 * s, 202 * s, 16 * s, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#eab308';
      ctx.stroke();
      circle(128, 216, 3, '#eab308');

      // Head
      ellipse(128, 142, 42, 46, '#fde2e4');

      // Blonde hair framing
      ctx.beginPath();
      ctx.arc(128 * s, 125 * s, 46 * s, Math.PI * 0.9, Math.PI * 2.1);
      ctx.lineTo(172 * s, 195 * s);
      ctx.lineTo(152 * s, 195 * s);
      ctx.lineTo(146 * s, 130 * s);
      ctx.lineTo(110 * s, 130 * s);
      ctx.lineTo(104 * s, 195 * s);
      ctx.lineTo(84 * s, 195 * s);
      ctx.closePath();
      ctx.fillStyle = '#e2e8f0';
      ctx.fill();

      // Green eyes
      circle(114, 142, 4, '#10b981');
      circle(142, 142, 4, '#10b981');
      circle(115, 141, 1.5, '#ffffff');
      circle(143, 141, 1.5, '#ffffff');

      // Smile
      ctx.beginPath();
      ctx.arc(128 * s, 162 * s, 7 * s, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#e11d48';
      ctx.stroke();
      break;
    }

    case 'outer-t': {
      // Elena - Topknot bun, blue shirt
      ellipse(128, 255, 80, 70, '#2563eb');
      ellipse(128, 195, 16, 22, '#fed7aa');
      ellipse(128, 146, 42, 46, '#fed7aa');

      // Auburn hair & bun
      circle(128, 76, 22, '#dc2626');
      circle(128, 76, 17, '#b91c1c');

      ctx.beginPath();
      ctx.arc(128 * s, 132 * s, 44 * s, Math.PI, Math.PI * 2);
      ctx.fillStyle = '#dc2626';
      ctx.fill();

      // Hair bun tie
      circle(128, 96, 6, '#38bdf8');

      // Eyes & smile
      circle(114, 146, 3, '#1e293b');
      circle(142, 146, 3, '#1e293b');
      ctx.beginPath();
      ctx.arc(128 * s, 164 * s, 6 * s, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#e11d48';
      ctx.stroke();
      break;
    }

    case 'outer-tr': {
      // Ren Tanaka - Straw sun hat, white shirt
      ellipse(128, 255, 80, 70, '#f8fafc');
      ellipse(128, 195, 16, 22, '#fde047');
      ellipse(128, 150, 42, 46, '#fed7aa');

      // Auburn hair peaking out
      ellipse(95, 155, 10, 16, '#c2410c');
      ellipse(161, 155, 10, 16, '#c2410c');

      // Straw hat brim
      ellipse(128, 116, 68, 16, '#fde68a');
      ellipse(128, 116, 68, 16, '#d97706');
      ellipse(128, 114, 66, 14, '#fde68a');

      // Straw hat crown
      ctx.beginPath();
      roundRect(102 * s, 80 * s, 52 * s, 34 * s, [10 * s, 10 * s, 0, 0]);
      ctx.fillStyle = '#fde68a';
      ctx.fill();

      // Hat ribbon
      ctx.beginPath();
      roundRect(102 * s, 106 * s, 52 * s, 8 * s, [0]);
      ctx.fillStyle = '#b45309';
      ctx.fill();

      // Eyes & smile
      circle(115, 150, 3, '#0f172a');
      circle(141, 150, 3, '#0f172a');
      ctx.beginPath();
      ctx.arc(128 * s, 168 * s, 7 * s, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#c2410c';
      ctx.stroke();
      break;
    }

    case 'outer-r': {
      // Chloe - Bright pink bob hair, round glasses, teal shirt
      ellipse(128, 255, 80, 70, '#06b6d4');
      ellipse(128, 195, 16, 22, '#fcd3b8');

      // Pink bob back
      ellipse(128, 148, 56, 56, '#f43f5e');

      // Head
      ellipse(128, 144, 40, 44, '#fcd3b8');

      // Pink bob bangs
      ctx.beginPath();
      ctx.arc(128 * s, 130 * s, 42 * s, Math.PI * 0.95, Math.PI * 2.05);
      ctx.lineTo(168 * s, 175 * s);
      ctx.lineTo(152 * s, 175 * s);
      ctx.lineTo(144 * s, 134 * s);
      ctx.lineTo(112 * s, 134 * s);
      ctx.lineTo(104 * s, 175 * s);
      ctx.lineTo(88 * s, 175 * s);
      ctx.closePath();
      ctx.fillStyle = '#fb7185';
      ctx.fill();

      // Round black glasses
      circle(112, 144, 13, 'transparent');
      ctx.lineWidth = 2.5 * s;
      ctx.strokeStyle = '#0f172a';
      ctx.stroke();

      circle(144, 144, 13, 'transparent');
      ctx.stroke();

      // Eyes
      circle(112, 144, 3, '#0f172a');
      circle(144, 144, 3, '#0f172a');

      // Smile
      ctx.beginPath();
      ctx.arc(128 * s, 166 * s, 6 * s, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#be123c';
      ctx.stroke();
      break;
    }

    case 'outer-br': {
      // Tariq - Deep skin, purple glasses/eyepatch, blue shirt
      ellipse(128, 255, 80, 70, '#1d4ed8');
      ellipse(128, 195, 16, 22, '#54392b');
      // Head
      ellipse(128, 146, 42, 46, '#54392b');

      // Hair
      ctx.beginPath();
      ctx.arc(128 * s, 136 * s, 44 * s, Math.PI, Math.PI * 2);
      ctx.fillStyle = '#1c1917';
      ctx.fill();

      // Stylized Purple Eyewear / Monocle
      ctx.beginPath();
      roundRect(100 * s, 140 * s, 24 * s, 16 * s, [4 * s]);
      ctx.fillStyle = '#8b5cf6';
      ctx.fill();

      ctx.beginPath();
      roundRect(132 * s, 140 * s, 24 * s, 16 * s, [4 * s]);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#8b5cf6';
      ctx.stroke();

      circle(144, 148, 3, '#0f172a');

      // Smile
      ctx.beginPath();
      ctx.arc(128 * s, 168 * s, 7 * s, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      break;
    }

    case 'outer-b': {
      // Leo Chen - Dark hair, yellow headphones, yellow shirt
      ellipse(128, 255, 80, 70, '#eab308');
      ellipse(128, 195, 16, 22, '#fde047');
      ellipse(128, 146, 42, 46, '#fde047');

      // Dark neat hair
      ctx.beginPath();
      ctx.arc(128 * s, 136 * s, 44 * s, Math.PI, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();

      // Yellow DJ headphones band
      ctx.beginPath();
      ctx.arc(128 * s, 128 * s, 54 * s, Math.PI * 1.05, Math.PI * 1.95);
      ctx.lineWidth = 7 * s;
      ctx.strokeStyle = '#ca8a04';
      ctx.stroke();

      // Ear cups
      ellipse(80, 150, 12, 22, '#ca8a04');
      ellipse(176, 150, 12, 22, '#ca8a04');
      ellipse(80, 150, 8, 16, '#fef08a');
      ellipse(176, 150, 8, 16, '#fef08a');

      // Glasses
      ctx.beginPath();
      roundRect(100 * s, 142 * s, 22 * s, 13 * s, [2 * s]);
      roundRect(134 * s, 142 * s, 22 * s, 13 * s, [2 * s]);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#334155';
      ctx.stroke();

      circle(111, 148, 2.5, '#0f172a');
      circle(145, 148, 2.5, '#0f172a');

      // Smile
      ctx.beginPath();
      ctx.arc(128 * s, 166 * s, 6 * s, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#991b1b';
      ctx.stroke();
      break;
    }

    case 'outer-bl': {
      // Samir Patel - Green bucket/straw hat, blue shirt
      ellipse(128, 255, 80, 70, '#0284c7');
      ellipse(128, 195, 16, 22, '#fcd3b8');
      ellipse(128, 148, 42, 46, '#fcd3b8');

      // Green brim hat
      ellipse(128, 120, 64, 16, '#65a30d');
      ctx.beginPath();
      roundRect(104 * s, 88 * s, 48 * s, 32 * s, [8 * s, 8 * s, 0, 0]);
      ctx.fillStyle = '#84cc16';
      ctx.fill();

      // Eyes & smile
      circle(114, 148, 3, '#0f172a');
      circle(142, 148, 3, '#0f172a');
      ctx.beginPath();
      ctx.arc(128 * s, 166 * s, 7 * s, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#c2410c';
      ctx.stroke();
      break;
    }

    case 'outer-l': {
      // Marcus Bell - Black hair, red glasses, blue shirt
      ellipse(128, 255, 80, 70, '#2563eb');
      ellipse(128, 195, 16, 22, '#fcd3b8');
      ellipse(128, 146, 42, 46, '#fcd3b8');

      // Black hair
      ctx.beginPath();
      ctx.arc(128 * s, 134 * s, 44 * s, Math.PI, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      // Bold red glasses
      ctx.beginPath();
      roundRect(98 * s, 140 * s, 26 * s, 15 * s, [3 * s]);
      roundRect(132 * s, 140 * s, 26 * s, 15 * s, [3 * s]);
      ctx.lineWidth = 3 * s;
      ctx.strokeStyle = '#dc2626';
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fill();

      circle(111, 147, 3, '#0f172a');
      circle(145, 147, 3, '#0f172a');

      // Smile
      ctx.beginPath();
      ctx.arc(128 * s, 166 * s, 7 * s, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#991b1b';
      ctx.stroke();
      break;
    }

    case 'outer-tl': {
      // Nadia Solis - Orange hair, yellow glasses, green turtleneck
      ellipse(128, 255, 80, 70, '#15803d');
      // Turtleneck
      ctx.beginPath();
      roundRect(108 * s, 184 * s, 40 * s, 24 * s, [6 * s]);
      ctx.fillStyle = '#166534';
      ctx.fill();

      ellipse(128, 144, 42, 46, '#fcd3b8');

      // Orange hair parting
      ctx.beginPath();
      ctx.arc(128 * s, 126 * s, 46 * s, Math.PI * 0.9, Math.PI * 2.1);
      ctx.lineTo(166 * s, 180 * s);
      ctx.lineTo(146 * s, 180 * s);
      ctx.lineTo(140 * s, 132 * s);
      ctx.lineTo(116 * s, 132 * s);
      ctx.lineTo(110 * s, 180 * s);
      ctx.lineTo(90 * s, 180 * s);
      ctx.closePath();
      ctx.fillStyle = '#f97316';
      ctx.fill();

      // Yellow round glasses
      circle(113, 144, 12, 'transparent');
      ctx.lineWidth = 2.5 * s;
      ctx.strokeStyle = '#eab308';
      ctx.stroke();
      circle(143, 144, 12, 'transparent');
      ctx.stroke();

      circle(113, 144, 3, '#0f172a');
      circle(143, 144, 3, '#0f172a');

      // Smile
      ctx.beginPath();
      ctx.arc(128 * s, 165 * s, 6 * s, 0.2 * Math.PI, 0.8 * Math.PI);
      ctx.lineWidth = 2 * s;
      ctx.strokeStyle = '#c2410c';
      ctx.stroke();
      break;
    }

    default:
      break;
  }

  ctx.restore(); // restore clipping

  return canvas;
}

// Cache textures to avoid recreating on every frame
const textureCache = new Map();

export function getAvatarThreeTexture(id, size = 256) {
  const cacheKey = `${id}-${size}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey);
  }
  const canvas = drawAvatarToCanvas(id, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  textureCache.set(cacheKey, texture);
  return texture;
}

export function getAvatarDataUrl(id, size = 192) {
  const canvas = drawAvatarToCanvas(id, size);
  return canvas.toDataURL('image/png');
}
