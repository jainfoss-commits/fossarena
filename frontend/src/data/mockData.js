export const statsData = [
  { label: 'Active Contributors', value: '180+' },
  { label: 'Open Source Repos', value: '35+' },
  { label: 'GitHub Stars', value: '4.8k+' },
  { label: 'Workshops Hosted', value: '42' },
];

export const tracksData = [
  {
    id: 'web',
    title: 'Open Web & Frameworks',
    description: 'Building modern, decentralized and accessible web tools, design systems, and frontend libraries.',
    icon: 'Globe',
    color: '#38bdf8'
  },
  {
    id: 'ai',
    title: 'AI & Open Models',
    description: 'Fine-tuning, tooling, and deploying open-weights models and local inference pipelines.',
    icon: 'Cpu',
    color: '#a855f7'
  },
  {
    id: 'systems',
    title: 'Systems & Cloud Native',
    description: 'Kernel hacking, Linux tooling, Kubernetes operators, Rust/Go utilities, and container internals.',
    icon: 'Terminal',
    color: '#22c55e'
  },
  {
    id: 'security',
    title: 'Cybersecurity & Privacy',
    description: 'Open-source security auditing, privacy-first software, cryptographic primitives, and CTFs.',
    icon: 'Shield',
    color: '#f97316'
  }
];

export const projectsData = [
  {
    id: 1,
    title: 'OpenPulse CLI',
    category: 'systems',
    description: 'A blazing-fast, cross-platform terminal diagnostic & system telemetry dashboard built in Rust.',
    stars: 1240,
    forks: 184,
    tags: ['Rust', 'Terminal UI', 'Async'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    featured: true
  },
  {
    id: 2,
    title: 'CognitiveDesk',
    category: 'ai',
    description: 'Self-hosted AI agent platform that runs local LLMs with full privacy, RAG knowledge bases, and multi-tool orchestration.',
    stars: 890,
    forks: 132,
    tags: ['Python', 'LangChain', 'React', 'Ollama'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    featured: true
  },
  {
    id: 3,
    title: 'DevCanvas UI',
    category: 'web',
    description: 'An open-source, highly modular component design system for developer portals and engineering docs.',
    stars: 640,
    forks: 95,
    tags: ['React', 'CSS Modules', 'Storybook', 'Vite'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    featured: true
  },
  {
    id: 4,
    title: 'VaultLock OS',
    category: 'security',
    description: 'Lightweight zero-trust secrets manager and micro-PKI utility for local development workflows.',
    stars: 420,
    forks: 63,
    tags: ['Go', 'Cryptography', 'Docker'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    featured: false
  },
  {
    id: 5,
    title: 'EcoRouter',
    category: 'systems',
    description: 'Smart DNS & proxy routing engine optimized for bandwidth efficiency and ad-free browsing.',
    stars: 512,
    forks: 78,
    tags: ['C++', 'Networking', 'Linux'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    featured: false
  },
  {
    id: 6,
    title: 'HyperSnippet',
    category: 'web',
    description: 'Interactive code snippet generator that produces instant, shareable syntax cards for technical documentation.',
    stars: 780,
    forks: 110,
    tags: ['TypeScript', 'Canvas', 'Tailwind'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    featured: false
  }
];

export const eventsData = [
  {
    id: 1,
    title: 'Winter Open Hack 2026',
    date: 'Oct 14 - 16, 2026',
    time: '10:00 AM IST',
    type: 'Hackathon',
    location: 'Campus Auditorium & Virtual Discord',
    description: '48-hour open source sprint with mentorship from core maintainers and $2,000 in bounties.',
    status: 'Upcoming'
  },
  {
    id: 2,
    title: 'Demystifying Linux Kernel Contributions',
    date: 'Oct 22, 2026',
    time: '5:30 PM IST',
    type: 'Workshop',
    location: 'Lab 4 & Streamed Live',
    description: 'Hands-on session: navigating Git mailing lists, writing patchsets, and submitting your first patch upstream.',
    status: 'Upcoming'
  },
  {
    id: 3,
    title: 'Local LLMs: Building RAG without Cloud APIs',
    date: 'Nov 05, 2026',
    time: '4:00 PM IST',
    type: 'Tech Talk',
    location: 'Virtual Workshop',
    description: 'Explore Ollama, llama.cpp, and vector databases for zero-cost private intelligence applications.',
    status: 'Upcoming'
  }
];
