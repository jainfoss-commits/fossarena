import React, { useState } from 'react';
import { Terminal, Copy, Check, Sparkles, Play } from 'lucide-react';

export default function InteractiveTerminal() {
  const [history, setHistory] = useState([
    {
      cmd: 'foss --version',
      output: 'FOSS Club Core Engine v2.6.4 (linux-x86_64, Posix compliant)',
      type: 'info',
    },
    {
      cmd: 'git remote -v',
      output: 'origin  https://github.com/fossclub-jain/monorepo.git (fetch & push)',
      type: 'success',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);

  const commandPresets = [
    { label: 'list-domains', cmd: 'foss domains' },
    { label: 'kernel-status', cmd: 'uname -r && foss metrics' },
    { label: 'upcoming-hackathons', cmd: 'foss events --upcoming' },
    { label: 'join-manifest', cmd: 'cat MANIFEST.md' },
  ];

  const handleCommand = (rawCmd) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    let res = '';
    let resType = 'info';

    switch (trimmed.toLowerCase()) {
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      case 'help':
        res = 'Available commands: help, clear, foss domains, uname -r, foss events, cat MANIFEST.md, join';
        break;
      case 'foss domains':
      case 'domains':
        res = 'Active Guilds:\n  [1] Systems & Linux Kernel (C, Rust, eBPF)\n  [2] Open Web & Runtimes (TypeScript, WASM, Go)\n  [3] Distributed AI & Inference (Python, PyTorch, Ollama)\n  [4] Security & Cryptography (Reverse engineering, Zero-knowledge)';
        resType = 'highlight';
        break;
      case 'uname -r && foss metrics':
      case 'uname -r':
      case 'metrics':
        res = 'Linux 6.8.0-generic x86_64\nActive Student Hackers: 500+\nUpstream PRs Merged: 142\nTotal Repositories: 38 (100% Libre)';
        resType = 'success';
        break;
      case 'foss events --upcoming':
      case 'events':
        res = 'Upcoming Events:\n  • Winter Open Hackathon 2026 (Nov 14-16) — Registration Open\n  • Deep Dive: Writing a Toy Linux Kernel (Oct 28)\n  • Open Source Lightning Talks #04 (Weekly Fridays 5 PM)';
        resType = 'highlight';
        break;
      case 'cat manifest.md':
      case 'manifest':
        res = '# FOSS Club Manifest\nWe believe software must be free as in freedom. We write open code, publish research openly, mentor newcomers, and build community software without corporate gatekeeping.';
        break;
      case 'join':
        res = 'Initializing Guild Onboarding protocol... Please scroll to the Join section or click "Join Guild" above!';
        resType = 'success';
        break;
      default:
        res = `foss: command not found: ${trimmed}. Type "help" or click one of the preset chips below.`;
        resType = 'error';
    }

    setHistory((prev) => [...prev, { cmd: trimmed, output: res, type: resType }]);
    setInputVal('');
  };

  const copyClone = () => {
    navigator.clipboard.writeText('git clone https://github.com/fossclub-jain/community.git');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="terminal-motion-container">
      {/* Terminal Title Bar */}
      <div className="terminal-top-bar">
        <div className="terminal-dots-cluster">
          <span className="dot dot-close" />
          <span className="dot dot-min" />
          <span className="dot dot-max" />
        </div>

        <div className="terminal-title-center">
          <Terminal size={13} className="text-cyan" />
          <span>bash — user@foss-node-01: ~/guild</span>
        </div>

        <button
          onClick={copyClone}
          className="terminal-copy-quick-btn"
          title="Copy clone command"
        >
          {copied ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
          <span>{copied ? 'Copied' : 'git clone'}</span>
        </button>
      </div>

      {/* Terminal Output History */}
      <div className="terminal-screen-body">
        <div className="terminal-welcome-banner">
          <span>* FOSS Club Interactive CLI Terminal *</span>
          <span className="terminal-hint-sub">Type a command or click a chip below to explore</span>
        </div>

        {history.map((item, idx) => (
          <div key={idx} className="terminal-command-group">
            <div className="terminal-prompt-line">
              <span className="prompt-user">guest@foss</span>
              <span className="prompt-colon">:</span>
              <span className="prompt-path">~/guild</span>
              <span className="prompt-symbol">$</span>
              <span className="prompt-entered-cmd">{item.cmd}</span>
            </div>
            <pre className={`terminal-output-text output-${item.type}`}>{item.output}</pre>
          </div>
        ))}

        {/* Active Input Line */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="terminal-prompt-line active-line"
        >
          <span className="prompt-user">guest@foss</span>
          <span className="prompt-colon">:</span>
          <span className="prompt-path">~/guild</span>
          <span className="prompt-symbol">$</span>
          <input
            type="text"
            className="terminal-live-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type 'help' or commands..."
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>

      {/* Preset Action Chips */}
      <div className="terminal-presets-row">
        <span className="preset-label">
          <Sparkles size={12} />
          Presets:
        </span>
        {commandPresets.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            className="preset-chip-btn"
            onClick={() => handleCommand(preset.cmd)}
          >
            <Play size={10} />
            <span>{preset.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
