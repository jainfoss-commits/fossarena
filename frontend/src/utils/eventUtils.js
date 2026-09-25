/**
 * Master FOSS Club Events Register (2021 – 2026)
 * Extracted and compiled from official departmental reports and event archives.
 * Faculty of Engineering & Technology (FET), Jain (Deemed-to-be University).
 */

export const CHAPTER_ACCENTS = [
  { color: '#f3f4f6', glow: 'rgba(243, 244, 246, 0.55)', fallbackImg: '/events/chapter-1.png' },
  { color: '#ef4444', glow: 'rgba(239, 68, 68, 0.60)', fallbackImg: '/events/chapter-2.png' },
  { color: '#22c55e', glow: 'rgba(34, 197, 94, 0.60)', fallbackImg: '/events/chapter-3.png' },
  { color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.60)', fallbackImg: '/events/chapter-4.png' },
  { color: '#60a5fa', glow: 'rgba(96, 165, 250, 0.60)', fallbackImg: '/events/chapter-5.png' },
  { color: '#c084fc', glow: 'rgba(192, 132, 252, 0.60)', fallbackImg: '/events/chapter-6.png' },
  { color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.60)', fallbackImg: '/events/chapter-3.png' },
  { color: '#ec4899', glow: 'rgba(236, 72, 153, 0.60)', fallbackImg: '/events/chapter-2.png' },
];

export const DEFAULT_EVENTS = [
  {
    id: "event-vibe-coding-workshop-sep2026",
    title: "FOSS CLUB PRESENTS: VIBE CODING WORKSHOP",
    description: "What if you could take an idea in your head and actually turn it into something that works? Join our Vibe Coding Workshop and learn to use AI-powered coding to build, experiment, and bring your ideas to life — without getting stuck in endless tutorials. Whether you're a beginner or already into coding, come and experience a different way of building projects. A 4-week comprehensive hands-on Student Development Program (SDP) to master full-stack development and build real-world applications.",
    image_url: "/events/vibe-coding-poster.jpg",
    date: "2026-09-26",
    end_date: "2026-10-24",
    status: "Upcoming",
    type: "Student Development Program (SDP)",
    category: "Workshops & Seminars",
    academic_year: "2026–2027",
    venue: "FET, Jain (Deemed-to-be University)",
    time: "09:00 AM – 03:00 PM (Every Saturday)",
    duration: "4 Weeks (Every Saturday | 26 Sept – 24 Oct 2026)",
    participants_count: 200,
    attendance: "Open for Registrations",
    mode: "In-Person Hands-on Workshop",
    rating: 5.0,
    featured: true,
    register_url: "#register",
    objectives: [
      "Master Vibe Coding: Transform mental concepts directly into functioning web software with AI-assisted workflows.",
      "Learn full-stack architectures without endless tutorial paralysis — from data persistence to production deployment.",
      "Week 1: Vibe Coding Fundamentals (Database, Frontend, Backend & AI Tools with 1-hour live showcase).",
      "Week 2: Backend Development (GitHub, MCP, APIs & Cloud Hosting).",
      "Week 3: Deployment & Real Projects (Netlify & Vercel, Final Project Development).",
      "Week 4: Polish, Present & Scale (Project Refinement, Performance Optimization, Final Presentation & Feedback)."
    ],
    outcomes: "Participants gain direct shipping velocity to build and launch production software, mastering AI tools, APIs, full-stack stacks, and deployment pipelines.",
    highlights: [
      "Department of Computer Science and Engineering & Computer Engineering (Software Engineering) - Code FET/2026/001",
      "Program Head: Dr. Santhosh S | Club Coordinator: N. Shantha Kumar",
      "Student Coordinators: Ramkrishna Saha (8259096706) & Sonam Chand (6385308664)",
      "Weekly live build showcases and certified completion credentials by FET & FOSS Club"
    ],
    curriculum: [
      {
        week: "Week 1",
        title: "Vibe Coding Fundamentals",
        description: "Database, Frontend, Backend & AI Tools. Ends with a 1-hour showcase of what you build.",
        date: "Sep 26, 2026"
      },
      {
        week: "Week 2",
        title: "Backend Development",
        description: "Backend architectures with GitHub, MCP, APIs & Hosting.",
        date: "Oct 03, 2026"
      },
      {
        week: "Week 3",
        title: "Deployment & Real Projects",
        description: "Netlify & Vercel, Final Project Development.",
        date: "Oct 10, 2026"
      },
      {
        week: "Week 4",
        title: "Polish, Present & Scale",
        description: "Project Refinement, Performance Optimization, Final Presentation & Feedback.",
        date: "Oct 24, 2026"
      }
    ],
    coordinators: [
      { name: "Dr. Santhosh S", role: "Program Head" },
      { name: "N. Shantha Kumar", role: "Club Coordinator" },
      { name: "Ramkrishna Saha", role: "Student Coordinator", phone: "8259096706" },
      { name: "Sonam Chand", role: "Student Coordinator", phone: "6385308664" }
    ],
    photos: ["/events/vibe-coding-poster.jpg"]
  },
  {
    id: "event-fullstack-week5-node-express-mar2026",
    title: "Full-Stack Workshop 2026 – Week 5: Backend Fundamentals with Node.js & Express",
    description: "Week Five ventured into server-side engineering, introducing students to the backend ecosystem with Node.js and Express.js. Participants transitioned from frontend consumers into API producers, learning how servers process incoming requests, execute business logic, query data, and serve structured JSON responses.",
    image_url: "/events/18_Fullstack_Week5_Node_Express_Mar2026/photo_01.jpeg",
    date: "2026-03-14",
    end_date: "2026-04-30",
    status: "Past",
    type: "Backend Lab",
    category: "Workshops & Seminars",
    academic_year: "2025–2026",
    venue: "Room 114 Classroom, FET Block",
    time: "9:00 AM to 3:30 PM (Full Day Hands-on Session)",
    duration: "Full Day Hands-on Session",
    participants_count: 326,
    attendance: "50 Dedicated Coders",
    mode: "In-Person Campus Session",
    rating: 4.95,
    featured: true,
    objectives: ["Understand Node.js asynchronous event loop architecture, non-blocking I/O, and npm package management.", "Master Express.js framework setup: middleware chaining, request routing, and HTTP status codes.", "Design RESTful APIs following standard HTTP methods (GET, POST, PUT, DELETE).", "Differentiate stateful vs. stateless server designs and test endpoints using Postman / REST Client extensions."],
    outcomes: "Students conquered the fundamental server-side principles required to connect their React frontend applications to backend databases, rounding out the core pillars of full-stack engineering.",
    highlights: ["Lab evaluation: Fully functioning CRUD API servers tested and verified with automated test requests."],
    photos: ["/events/18_Fullstack_Week5_Node_Express_Mar2026/photo_01.jpeg", "/events/18_Fullstack_Week5_Node_Express_Mar2026/photo_02.jpeg", "/events/18_Fullstack_Week5_Node_Express_Mar2026/photo_03.jpeg", "/events/18_Fullstack_Week5_Node_Express_Mar2026/photo_04.jpeg", "/events/18_Fullstack_Week5_Node_Express_Mar2026/photo_05.png", "/events/18_Fullstack_Week5_Node_Express_Mar2026/photo_06.png"]
  },
  {
    id: "event-squid-game-challenge-mar2026",
    title: "Squid Game Challenge 2026 – Gamified Technical Elimination",
    description: "Inspired by the global pop-culture phenomenon of strategic survival contests, the Squid Game Challenge 2026 was a thrilling, gamified technical competition. The event challenged contestants' logical acuity, memory retention, syntax defect spotting, and split-second algorithmic decision-making under intense simulated elimination pressure.",
    image_url: "/events/17_Squid_Game_Challenge_Mar2026/photo_01.jpeg",
    date: "2026-03-11",
    end_date: "2026-03-11",
    status: "Past",
    type: "Survival Hackathon",
    category: "Hackathons & Challenges",
    academic_year: "2025–2026",
    venue: "Seminar Hall 002 & Room 121, FET Block",
    time: "12:00 PM to 3:30 PM (3.5 Hours)",
    duration: "3.5 Hours",
    participants_count: 210,
    attendance: "108 Active Participants",
    mode: "In-Person Campus Session",
    rating: 5.0,
    featured: true,
    objectives: ["Test rapid logical deduction and algorithmic thinking under strict time and elimination constraints.", "Gamify programming syntax verification, code tracing, and edge-case spotting.", "Promote resilience, composure, and presence of mind in competitive technical environments.", "Provide an electrifying, community-building technical extravaganza for computing undergraduates."],
    outcomes: "With 108 competitors, the challenge was hailed as one of the most thrilling and novel competitive formats in FET history, proving that rigorous technical assessment can be exhilarating and immensely entertaining.",
    highlights: ["Survival finalists who navigated all four elimination rounds with impeccable accuracy received grand prizes and survivor accolades."],
    photos: ["/events/17_Squid_Game_Challenge_Mar2026/photo_01.jpeg", "/events/17_Squid_Game_Challenge_Mar2026/photo_02.jpeg", "/events/17_Squid_Game_Challenge_Mar2026/photo_03.jpeg", "/events/17_Squid_Game_Challenge_Mar2026/photo_04.png", "/events/17_Squid_Game_Challenge_Mar2026/photo_05.jpeg", "/events/17_Squid_Game_Challenge_Mar2026/photo_06.png", "/events/17_Squid_Game_Challenge_Mar2026/photo_07.png", "/events/17_Squid_Game_Challenge_Mar2026/photo_08.jpeg"]
  },
  {
    id: "event-fullstack-week4-react-mar2026",
    title: "Full-Stack Workshop 2026 – Week 4: Frontend Development with React.js",
    description: "Week Four transitioned participants into modern Single Page Application (SPA) development using React.js—the industry-standard declarative UI library. Students explored why component-driven architecture replaced monolithic DOM scripts and learned to build reactive, modular interfaces.",
    image_url: "/events/16_Fullstack_Week4_React_Mar2026/photo_02.jpeg",
    date: "2026-03-07",
    end_date: "2026-04-30",
    status: "Past",
    type: "Frameworks Lab",
    category: "Workshops & Seminars",
    academic_year: "2025–2026",
    venue: "Room 114 Classroom, FET Block",
    time: "9:00 AM to 3:30 PM (Full Day Hands-on Session)",
    duration: "Full Day Hands-on Session",
    participants_count: 326,
    attendance: "50 Dedicated Coders",
    mode: "In-Person Campus Session",
    rating: 4.95,
    featured: false,
    objectives: ["Understand the React Virtual DOM, reconciliation mechanics, and declarative UI paradigm.", "Master JSX syntax, modular component decomposition, and clean folder structures.", "Implement unidirectional data flow using Props and manage local dynamic state using the useState hook.", "Construct an interactive, multi-component task manager application with live UI updates."],
    outcomes: "Students gained confidence in breaking down complex UI wireframes into clean, reusable React components, grasping state-driven UI updates.",
    highlights: ["Lab evaluation: Functional component architectures and cleanly decoupled React applications demonstrated to mentors."],
    photos: ["/events/16_Fullstack_Week4_React_Mar2026/photo_01.jpeg", "/events/16_Fullstack_Week4_React_Mar2026/photo_02.jpeg", "/events/16_Fullstack_Week4_React_Mar2026/photo_03.jpeg", "/events/16_Fullstack_Week4_React_Mar2026/photo_04.jpeg", "/events/16_Fullstack_Week4_React_Mar2026/photo_05.png", "/events/16_Fullstack_Week4_React_Mar2026/photo_06.png", "/events/16_Fullstack_Week4_React_Mar2026/photo_07.png"]
  },
  {
    id: "event-fullstack-week3-git-js-feb2026",
    title: "Full-Stack Workshop 2026 – Week 3: Version Control with Git & JavaScript Core",
    description: "Week Three unlocked the twin pillars of professional software development: Git distributed version control and core JavaScript programming. Students learned how engineering teams collaborate synchronously on shared codebases while mastering programming logic to transform static web documents into interactive, dynamic applications.",
    image_url: "/events/15_Fullstack_Week3_Git_JS_Feb2026/photo_01.jpeg",
    date: "2026-02-28",
    end_date: "2026-04-30",
    status: "Past",
    type: "Coding Lab",
    category: "Workshops & Seminars",
    academic_year: "2025–2026",
    venue: "Room 114 B, FET Block",
    time: "9:00 AM to 3:30 PM (Full Day Hands-on Session)",
    duration: "Full Day Hands-on Session",
    participants_count: 326,
    attendance: "100 Active Coders",
    mode: "In-Person Campus Session",
    rating: 4.9,
    featured: false,
    objectives: ["Master Git workflows: repository initialization, staging, atomic commits, branching strategies, and resolving merge conflicts.", "Establish collaborative GitHub workflows: pushing remotes, opening Pull Requests (PRs), and conducting code reviews.", "Learn modern ECMAScript (ES6+) fundamentals: let/const, arrow functions, template literals, and array methods (map, filter, reduce).", "Manipulate the Document Object Model (DOM) dynamically using querySelector, classList, and event listeners."],
    outcomes: "Every participant successfully initialized a Git repository, pushed code to GitHub, and added client-side interactivity, laying the exact foundation needed for frontend component libraries.",
    highlights: ["Lab evaluation: Successful deployment of personal web projects to live public GitHub Pages URLs."],
    photos: ["/events/15_Fullstack_Week3_Git_JS_Feb2026/photo_01.jpeg", "/events/15_Fullstack_Week3_Git_JS_Feb2026/photo_02.jpeg", "/events/15_Fullstack_Week3_Git_JS_Feb2026/photo_03.jpeg", "/events/15_Fullstack_Week3_Git_JS_Feb2026/photo_04.jpeg", "/events/15_Fullstack_Week3_Git_JS_Feb2026/photo_05.png", "/events/15_Fullstack_Week3_Git_JS_Feb2026/photo_06.png"]
  },
  {
    id: "event-fullstack-week2-css-feb2026",
    title: "Full-Stack Workshop 2026 – Week 2: CSS Fundamentals & Modern Layouts",
    description: "Week Two concentrated on the visual and layout foundations of modern web engineering: Cascading Style Sheets (CSS). The workshop transitioned students from plain, unstyled HTML documents into crafting responsive, aesthetically compelling, and professional user interfaces using modern layout engines.",
    image_url: "/events/14_Fullstack_Week2_CSS_Feb2026/photo_04.jpeg",
    date: "2026-02-14",
    end_date: "2026-04-30",
    status: "Past",
    type: "Styling Lab",
    category: "Workshops & Seminars",
    academic_year: "2025–2026",
    venue: "Seminar Hall 002, FET Block",
    time: "9:00 AM to 3:30 PM (Full Day Hands-on Session)",
    duration: "Full Day Hands-on Session",
    participants_count: 326,
    attendance: "100 Active Coders",
    mode: "In-Person Campus Session",
    rating: 4.9,
    featured: false,
    objectives: ["Deconstruct the CSS Box Model: margins, borders, padding, and content box calculations.", "Master modern layout engines: Flexbox for one-dimensional distribution and CSS Grid for two-dimensional matrices.", "Implement fluid responsive design using relative units (rem, em, vh, vw) and CSS media queries.", "Transform the personal profile page built in Week 1 into a polished, mobile-responsive developer showcase."],
    outcomes: "100 students mastered advanced styling mechanics, effectively transforming raw markup into beautiful, device-agnostic web experiences.",
    highlights: ["Lab evaluation: Best styled responsive portfolio showcase recognized by student mentors."],
    photos: ["/events/14_Fullstack_Week2_CSS_Feb2026/photo_01.jpeg", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_02.jpeg", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_03.jpeg", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_04.jpeg", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_05.jpeg", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_06.jpeg", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_07.jpeg", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_08.jpeg", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_09.jpeg", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_10.png", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_11.png", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_12.png", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_13.jpeg", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_14.jpeg", "/events/14_Fullstack_Week2_CSS_Feb2026/photo_15.jpeg"]
  },
  {
    id: "event-fullstack-week1-webfundamentals-feb2026",
    title: "Full-Stack Workshop 2026 – Week 1: Web Fundamentals & HTML5",
    description: "Week One of the Full Stack Development Workshop initiated students into the bedrock mechanics of web technology. Conducted as an interactive peer-led learning workshop, the session broke down how the modern internet functions before diving deep into semantic HTML5 document structures and accessibility standards.",
    image_url: "/events/13_Fullstack_Week1_WebFundamentals_Feb2026/photo_03.jpeg",
    date: "2026-02-07",
    end_date: "2026-04-30",
    status: "Past",
    type: "Hands-on Lab",
    category: "Workshops & Seminars",
    academic_year: "2025–2026",
    venue: "Classrooms 205 & 206, FET Block",
    time: "9:00 AM to 3:30 PM (Full Day Hands-on Session)",
    duration: "Full Day Hands-on Session",
    participants_count: 326,
    attendance: "110 Active Coders",
    mode: "In-Person Campus Session",
    rating: 4.9,
    featured: false,
    objectives: ["Demystify the Client-Server model, DNS lookups, TCP/IP handshakes, and HTTP request-response cycles.", "Master HTML5 semantic elements (header, nav, main, section, article, footer) for optimal SEO and accessibility.", "Understand DOM hierarchy and form handling with diverse input types, validations, and attributes.", "Build, validate, and preview a personal developer profile page from scratch."],
    outcomes: "110 participants successfully authored valid, semantic HTML pages, establishing the necessary architectural footing for subsequent styling and scripting modules.",
    highlights: ["Lab evaluation: Outstanding developer portfolio prototypes created during the session received mentor commendation."],
    photos: ["/events/13_Fullstack_Week1_WebFundamentals_Feb2026/photo_01.jpeg", "/events/13_Fullstack_Week1_WebFundamentals_Feb2026/photo_02.jpeg", "/events/13_Fullstack_Week1_WebFundamentals_Feb2026/photo_03.jpeg", "/events/13_Fullstack_Week1_WebFundamentals_Feb2026/photo_04.jpeg", "/events/13_Fullstack_Week1_WebFundamentals_Feb2026/photo_05.jpeg", "/events/13_Fullstack_Week1_WebFundamentals_Feb2026/photo_06.jpeg", "/events/13_Fullstack_Week1_WebFundamentals_Feb2026/photo_07.jpeg", "/events/13_Fullstack_Week1_WebFundamentals_Feb2026/photo_08.png", "/events/13_Fullstack_Week1_WebFundamentals_Feb2026/photo_09.png", "/events/13_Fullstack_Week1_WebFundamentals_Feb2026/photo_10.png"]
  },
  {
    id: "event-fullstack-inauguration-feb2026",
    title: "Full-Stack Development Workshop 2026 – Grand Inauguration Ceremony",
    description: "On February 6, 2026, the FOSS Club officially launched its ambitious 10-Week Full Stack Development Workshop (2026) with a formal inauguration ceremony in Seminar Hall 121. Attended by academic leadership, departmental heads, and training specialists, the event underscored the critical need for production-grade full-stack fluency in today's software industry.",
    image_url: "/events/12_Fullstack_Inauguration_Feb2026/photo_05.jpeg",
    date: "2026-02-06",
    end_date: "2026-02-06",
    status: "Past",
    type: "Bootcamp Inauguration",
    category: "Workshops & Seminars",
    academic_year: "2025–2026",
    venue: "Seminar Hall 121, Jain University - FET",
    time: "2:00 PM to 3:00 PM (1 Hour Keynote Inauguration)",
    duration: "1 Hour Keynote Inauguration",
    participants_count: 240,
    attendance: "150 Students",
    mode: "In-Person Campus Session",
    rating: 5.0,
    featured: true,
    objectives: ["Officially inaugurate the structured 10-week hands-on Full-Stack Development curriculum.", "Inspire undergraduates through keynote addresses from the Head of Department, Deputy Director, and Placement Officers.", "Present the comprehensive roadmap spanning Web Fundamentals, CSS Layouts, Git, React frontend, and Node.js backend.", "Establish expectations, attendance standards, and project milestone criteria for certification."],
    outcomes: "Over 150 enthusiastic attendees were galvanized with a clear vision of the 10-week developmental journey ahead, registering their local development environments and joining the workshop discord/slack community.",
    highlights: ["Inaugural event marking the official cohort commencement."],
    photos: ["/events/12_Fullstack_Inauguration_Feb2026/photo_01.png", "/events/12_Fullstack_Inauguration_Feb2026/photo_02.jpeg", "/events/12_Fullstack_Inauguration_Feb2026/photo_03.png", "/events/12_Fullstack_Inauguration_Feb2026/photo_04.jpeg", "/events/12_Fullstack_Inauguration_Feb2026/photo_05.jpeg", "/events/12_Fullstack_Inauguration_Feb2026/photo_06.png", "/events/12_Fullstack_Inauguration_Feb2026/photo_07.jpeg", "/events/12_Fullstack_Inauguration_Feb2026/photo_08.png", "/events/12_Fullstack_Inauguration_Feb2026/photo_09.jpeg", "/events/12_Fullstack_Inauguration_Feb2026/photo_10.jpeg", "/events/12_Fullstack_Inauguration_Feb2026/photo_11.jpeg"]
  },
  {
    id: "event-ice-breaker-challenge-oct2025",
    title: "Ice Breaker Challenge 2025 – Orientation & Peer Cohesion",
    description: "The Ice Breaker Challenge 2025 was organized as a vibrant interpersonal connection initiative tailored to welcome lateral entry candidates, transfer students, and new departmental inductees into the broader Software Engineering family. Through guided team games and collaborative problem stations, participants forged enduring collegiate bonds.",
    image_url: "/events/11_Ice_Breaker_Challenge_Oct2025/photo_03.jpeg",
    date: "2025-10-17",
    end_date: "2025-10-17",
    status: "Past",
    type: "Team Cohesion Challenge",
    category: "Orientation & Community",
    academic_year: "2025–2026",
    venue: "Seminar Hall 002 & Room 121, FET Block",
    time: "1:00 PM to 3:30 PM (2.5 Hours)",
    duration: "2.5 Hours",
    participants_count: 100,
    attendance: "75 Active Participants",
    mode: "In-Person Campus Session",
    rating: 4.85,
    featured: false,
    objectives: ["Accelerate cross-batch networking and dismantle social hesitation among newly joined undergraduates.", "Provide a relaxed, encouraging atmosphere to showcase individuality, humor, and interpersonal agility.", "Introduce students to club leadership opportunities, hackathon teams, and departmental resources.", "Build lasting mutual respect and cooperative spirit across diverse student backgrounds."],
    outcomes: "The event succeeded in transforming an unfamiliar cohort of newcomers into a tightly knit, motivated community ready to collaborate on coursework and upcoming hackathons.",
    highlights: ["All participating teams were celebrated, with special prizes for the most creative and energetic collaborative units."],
    photos: ["/events/11_Ice_Breaker_Challenge_Oct2025/photo_01.png", "/events/11_Ice_Breaker_Challenge_Oct2025/photo_02.jpeg", "/events/11_Ice_Breaker_Challenge_Oct2025/photo_03.jpeg", "/events/11_Ice_Breaker_Challenge_Oct2025/photo_04.jpeg", "/events/11_Ice_Breaker_Challenge_Oct2025/photo_05.jpeg", "/events/11_Ice_Breaker_Challenge_Oct2025/photo_06.jpeg", "/events/11_Ice_Breaker_Challenge_Oct2025/photo_07.jpeg", "/events/11_Ice_Breaker_Challenge_Oct2025/photo_08.jpeg", "/events/11_Ice_Breaker_Challenge_Oct2025/photo_09.jpeg"]
  },
  {
    id: "event-escape-room-challenge-sep2025",
    title: "Escape Room Challenge 2025 – Gamified Technical Problem Solving",
    description: "The Escape Room Challenge 2025 transformed academic seminar halls into immersive, multi-station technical mystery arenas. Student squads navigated progressive rooms where unlocking physical and digital doors required solving complex mathematical cryptograms, debugging erroneous code snippets, and parsing obfuscated system logs.",
    image_url: "/events/10_Escape_Room_Challenge_Sep2025/photo_03.jpeg",
    date: "2025-09-11",
    end_date: "2025-09-11",
    status: "Past",
    type: "Technical Mystery Arena",
    category: "Hackathons & Challenges",
    academic_year: "2025–2026",
    venue: "Seminar Hall 002 & Room 121, FET Block",
    time: "9:00 AM to 12:30 PM (Half Day Intensive)",
    duration: "Half Day Intensive",
    participants_count: 240,
    attendance: "216 Participants",
    mode: "In-Person Campus Session",
    rating: 4.9,
    featured: false,
    objectives: ["Foster deductive reasoning, algorithmic pattern recognition, and crisis management under strict countdown limits.", "Provide an experiential gamified learning vehicle for cybersecurity and logical concepts.", "Promote distributed task delegation and inclusive communication within multidisciplinary squads.", "Create an unforgettable, adrenaline-fueled campus technical experience."],
    outcomes: "With 216 attendees, the challenge achieved extraordinary engagement, demonstrating how gamified pedagogical structures can make complex computational principles intuitive, accessible, and thrilling.",
    highlights: ["The fastest squads to successfully solve all three chambers with minimal penalty hints were crowned Escape Champions."],
    photos: ["/events/10_Escape_Room_Challenge_Sep2025/photo_01.png", "/events/10_Escape_Room_Challenge_Sep2025/photo_02.jpeg", "/events/10_Escape_Room_Challenge_Sep2025/photo_03.jpeg", "/events/10_Escape_Room_Challenge_Sep2025/photo_04.jpeg", "/events/10_Escape_Room_Challenge_Sep2025/photo_05.png", "/events/10_Escape_Room_Challenge_Sep2025/photo_06.jpeg", "/events/10_Escape_Room_Challenge_Sep2025/photo_07.jpeg", "/events/10_Escape_Room_Challenge_Sep2025/photo_08.jpeg", "/events/10_Escape_Room_Challenge_Sep2025/photo_09.jpeg", "/events/10_Escape_Room_Challenge_Sep2025/photo_10.jpeg", "/events/10_Escape_Room_Challenge_Sep2025/photo_11.jpeg", "/events/10_Escape_Room_Challenge_Sep2025/photo_12.jpeg"]
  },
  {
    id: "event-code-relay-challenge-mar2025",
    title: "Code Relay Challenge 2025 – Collaborative Team Hackathon",
    description: "The Code Relay Challenge 2025 introduced an electrifying, collaborative hackathon format designed to simulate high-pressure code handoffs in software engineering teams. Instead of solo development, teams had to write, refactor, and complete a cohesive web user interface by passing code baton-style between teammates in timed intervals.",
    image_url: "/events/09_Code_Relay_Challenge_Mar2025/photo_05.jpeg",
    date: "2025-03-12",
    end_date: "2025-03-12",
    status: "Past",
    type: "Team Hackathon",
    category: "Hackathons & Challenges",
    academic_year: "2024–2025",
    venue: "FET Seminar Hall & Computing Labs",
    time: "9:30 AM to 3:00 PM (1 Day (5.5 Hours))",
    duration: "5.5 Hours",
    participants_count: 240,
    attendance: "200 Active Participants (50 Teams of 4)",
    mode: "In-Person Campus Session",
    rating: 4.95,
    featured: true,
    objectives: ["Emphasize the paramount importance of readable code, clean architecture, and standardized naming conventions.", "Test students' ability to rapidly comprehend, parse, and extend a teammate's logic without verbal communication.", "Simulate asynchronous code review, Git merge workflows, and seamless sprint handoffs.", "Evaluate UI/UX design sensibility alongside algorithmic and frontend frontend execution."],
    outcomes: "The event dismantled the myth of the 'lone-wolf coder', powerfully teaching students that software engineering is a team sport predicated on readability, empathy for the next maintainer, and modular structural design.",
    highlights: ["Top-performing relay teams that engineered stunning, fully functional responsive landing pages and dashboard components with zero syntax errors across handoffs were awarded prestigious trophies and certificates."],
    photos: ["/events/09_Code_Relay_Challenge_Mar2025/photo_01.jpeg", "/events/09_Code_Relay_Challenge_Mar2025/photo_02.jpeg", "/events/09_Code_Relay_Challenge_Mar2025/photo_03.jpeg", "/events/09_Code_Relay_Challenge_Mar2025/photo_04.jpeg", "/events/09_Code_Relay_Challenge_Mar2025/photo_05.jpeg", "/events/09_Code_Relay_Challenge_Mar2025/photo_06.jpeg", "/events/09_Code_Relay_Challenge_Mar2025/photo_07.png", "/events/09_Code_Relay_Challenge_Mar2025/photo_08.jpeg", "/events/09_Code_Relay_Challenge_Mar2025/photo_09.png"]
  },
  {
    id: "event-industrial-visit-xcel-corp-feb2024",
    title: "Industrial Visit to XCEL Corp (USA) / NYINST Bangalore",
    description: "On February 8, 2024, the Department conducted an immersive industrial excursion to the Bangalore development center of XCEL Corp (USA) and NYINST. Organized under the corporate student synergy initiative, this full-day visit enabled students to observe enterprise engineering operations, agile delivery pipelines, and corporate cloud infrastructures.",
    image_url: "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_02.jpeg",
    date: "2024-02-08",
    end_date: "2024-02-08",
    status: "Past",
    type: "Industrial Visit",
    category: "Industrial Visits",
    academic_year: "2023–2024",
    venue: "XCEL Corp (USA) / NYINST Bangalore, 5th Floor, No. 1, Pine Hurst, 100 Feet Ring Rd, BTM Layout 2nd Stage",
    time: "9:00 AM to 4:00 PM (Full Day Corporate Tour)",
    duration: "Full Day Corporate Tour",
    participants_count: 45,
    attendance: "45 Students",
    mode: "In-Person Campus Session",
    rating: 4.95,
    featured: false,
    objectives: ["Bridge theoretical classroom software engineering concepts with real-world enterprise architectures.", "Gain first-hand insight into corporate software quality assurance, DevOps pipelines, and IT consulting operations.", "Interact directly with lead technical architects, project managers, and talent acquisition executives.", "Observe professional corporate decorum, cross-functional collaboration, and client delivery methodologies."],
    highlights: ["N/A (Industry Field Immersion and Corporate Technical Interaction)."],
    photos: ["/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_01.png", "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_02.jpeg", "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_03.jpeg", "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_04.jpeg", "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_05.jpeg", "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_06.jpeg", "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_07.jpeg", "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_08.jpeg", "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_09.jpeg", "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_10.jpeg", "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_11.jpeg", "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_12.jpeg", "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_13.jpeg", "/events/08_Industrial_Visit_XCEL_Corp_Feb2024/photo_14.jpeg"]
  },
  {
    id: "event-switch-debate-dec2023",
    title: "Switch – Spontaneous Communication & Cognitive Agility Challenge",
    description: "Conducted in strategic collaboration with Futurense Technologies, 'Switch' was an innovative, fast-paced cognitive and verbal agility activity. Designed to break conventional debate rigidity, it challenged students to demonstrate nuanced perspectives on technology, artificial intelligence, and societal trends.",
    image_url: "/events/07_Switch_Club_Activity_Dec2023/photo_01.jpeg",
    date: "2023-12-01",
    end_date: "2023-12-01",
    status: "Past",
    type: "Cognitive Challenge",
    category: "Hackathons & Challenges",
    academic_year: "2023–2024",
    venue: "Classroom 114 / Department Classrooms",
    time: "2:50 PM to 3:40 PM (1 Hour)",
    duration: "1 Hour",
    participants_count: 45,
    attendance: "45 Students",
    mode: "In-Person Campus Session",
    rating: 4.85,
    featured: false,
    objectives: ["Hone rapid critical thinking, extemporaneous speech, and persuasive articulation.", "Test cognitive adaptability by forcing immediate dialectical shifts on complex tech arguments.", "Eliminate speech hesitation, stage anxiety, and dogmatic thinking in group discussions.", "Build essential executive presence and agile communication crucial for corporate interviews."],
    outcomes: "The activity was met with immense enthusiasm, laughter, and intellectual engagement, leaving students with sharper mental reflexes, heightened confidence, and greater versatility in argumentation.",
    highlights: ["Certificates of verbal excellence were awarded to the most agile speakers who maintained fluency during multiple rapid transitions."],
    photos: ["/events/07_Switch_Club_Activity_Dec2023/photo_01.jpeg", "/events/07_Switch_Club_Activity_Dec2023/photo_02.jpeg", "/events/07_Switch_Club_Activity_Dec2023/photo_03.png", "/events/07_Switch_Club_Activity_Dec2023/photo_04.jpeg", "/events/07_Switch_Club_Activity_Dec2023/photo_05.jpeg"]
  },
  {
    id: "event-anveshan-1-oct2023",
    title: "Anveshan 1.0 – Flagship Technical Fest (Codeathon & CTF)",
    description: "Anveshan 1.0 was the marquee inter-departmental technical symposium of 2023 organized by the FOSS Club. Graced by university leadership, the fest brought together over two hundred programmers, problem solvers, and cybersecurity enthusiasts to battle across two intense, concurrent competitive tracks.",
    image_url: "/events/06_Anveshan_1.0_Oct2023/photo_05.jpeg",
    date: "2023-10-31",
    end_date: "2023-10-31",
    status: "Past",
    type: "Flagship Fest",
    category: "Hackathons & Challenges",
    academic_year: "2023–2024",
    venue: "Seminar Hall 002 & Lab 125A, FET Block",
    time: "9:00 AM to 12:30 PM (Half Day Intensive)",
    duration: "Half Day Intensive",
    participants_count: 204,
    attendance: "180+ Active Participants",
    mode: "In-Person Campus Session",
    rating: 5.0,
    featured: true,
    objectives: ["Provide high-octane competitive programming environments testing algorithmic complexity and edge-case resilience.", "Simulate authentic cybersecurity penetration testing, reverse engineering, and forensic cryptography via a CTF.", "Promote peer benchmarking against top talent across multiple computing streams in the university.", "Elevate student readiness for national hackathons, ICPC qualifiers, and industry hiring assessments."],
    outcomes: "Anveshan 1.0 set a new gold standard for technical events at FET. The high participant turnout, seamless technical execution, and intense competition showcased the vibrant programming culture fostered by the FOSS Club.",
    highlights: ["• Codeathon Arena:\n  - Winner: Hirendra Bhatta\n  - Runner-up: Yash Bhut\n• Capture The Flag (CTF) Arena:\n  - Winner: Venkata Kalyan\n  - Runner-up: Rishit Singhal"],
    photos: ["/events/06_Anveshan_1.0_Oct2023/photo_01.jpeg", "/events/06_Anveshan_1.0_Oct2023/photo_02.jpeg", "/events/06_Anveshan_1.0_Oct2023/photo_03.jpeg", "/events/06_Anveshan_1.0_Oct2023/photo_04.jpeg", "/events/06_Anveshan_1.0_Oct2023/photo_05.jpeg", "/events/06_Anveshan_1.0_Oct2023/photo_06.jpeg", "/events/06_Anveshan_1.0_Oct2023/photo_07.png", "/events/06_Anveshan_1.0_Oct2023/photo_08.png", "/events/06_Anveshan_1.0_Oct2023/photo_09.jpeg", "/events/06_Anveshan_1.0_Oct2023/photo_10.png", "/events/06_Anveshan_1.0_Oct2023/photo_11.png", "/events/06_Anveshan_1.0_Oct2023/photo_12.jpeg", "/events/06_Anveshan_1.0_Oct2023/photo_13.jpeg", "/events/06_Anveshan_1.0_Oct2023/photo_14.jpeg", "/events/06_Anveshan_1.0_Oct2023/photo_15.jpeg", "/events/06_Anveshan_1.0_Oct2023/photo_16.jpeg", "/events/06_Anveshan_1.0_Oct2023/photo_17.jpeg"]
  },
  {
    id: "event-engineers-day-sep2023",
    title: "Engineers Day 2023 – Celebrating Engineering Heritage & Pencil Sketching",
    description: "In commemoration of National Engineers Day and the birth anniversary of Bharat Ratna Sir M. Visvesvaraya, the Department of Computer Engineering (Software Engineering) and the FOSS Club held a creative commemorative gathering. The celebration brought together engineering ideals with artistic expression through a live Pencil Sketching Competition.",
    image_url: "/events/05_Engineers_Day_Sep2023/photo_05.jpeg",
    date: "2023-09-15",
    end_date: "2023-09-15",
    status: "Past",
    type: "Commemorative Event",
    category: "Culture & Heritage",
    academic_year: "2023–2024",
    venue: "Room No. 204, FET Block",
    time: "1:30 PM to 3:30 PM (2 Hours)",
    duration: "2 Hours",
    participants_count: 40,
    attendance: "40 Students",
    mode: "In-Person Campus Session",
    rating: 4.8,
    featured: false,
    objectives: ["Honor the timeless engineering legacy and ethical discipline of Sir M. Visvesvaraya.", "Celebrate multidisciplinary talent by combining technical vision with visual fine arts.", "Reflect on the evolution of engineering from civil masterworks to open-source software architectures.", "Encourage students to view engineering design through aesthetics, precision, and societal impact."],
    outcomes: "The event provided a memorable artistic interlude within a technical curriculum, highlighting students' diverse creative talents and reinforcing pride in the engineering profession.",
    highlights: ["• Winner – Engineers Day Pencil Sketch Competition: Nitish\n  - USN: 21BTRCD017 | Semester: 5 | Branch: CSE-Data Science"],
    photos: ["/events/05_Engineers_Day_Sep2023/photo_01.jpeg", "/events/05_Engineers_Day_Sep2023/photo_02.png", "/events/05_Engineers_Day_Sep2023/photo_03.jpeg", "/events/05_Engineers_Day_Sep2023/photo_04.jpeg", "/events/05_Engineers_Day_Sep2023/photo_05.jpeg", "/events/05_Engineers_Day_Sep2023/photo_06.jpeg", "/events/05_Engineers_Day_Sep2023/photo_07.jpeg"]
  },
  {
    id: "event-dip23-induction-sep2023",
    title: "DIP’23 – Departmental Induction Program 2023",
    description: "DIP’23 (Departmental Induction Program 2023) was an interactive, high-energy orientation event orchestrated by the FOSS Club to welcome incoming software engineering undergraduates. The program broke down traditional classroom barriers, initiating freshers into the collaborative, hacker-friendly, and peer-driven culture of the department.",
    image_url: "/events/04_DIP23_Induction_Sep2023/photo_01.png",
    date: "2023-09-02",
    end_date: "2023-09-02",
    status: "Past",
    type: "Induction & Orientation",
    category: "Orientation & Community",
    academic_year: "2023–2024",
    venue: "Room No. 205, FET Block",
    time: "9:00 AM to 12:30 PM (Half Day)",
    duration: "Half Day",
    participants_count: 200,
    attendance: "60 Students",
    mode: "In-Person Campus Session",
    rating: 4.9,
    featured: false,
    objectives: ["Seamlessly integrate new students into the departmental ecosystem, labs, and student club activities.", "Encourage lateral thinking, spontaneous problem solving, and cross-team communication through gamified drills.", "Introduce student mentors, faculty advisors, and executive office-bearers of the FOSS Club.", "Build lasting camaraderie and mutual trust among batchmates from day one."],
    outcomes: "60 new entrants developed immediate rapport with peers and senior mentors, establishing an active network of study groups and enthusiastically signing up for future technical workshops.",
    highlights: ["• Winning Team (DIP’23 Overall Championship): Subhajith Talukdar, Kannudhalan, Eklavaya Shah, Baba Kshitiji, Ayush Raj, Navya Krishna\n• Simon Says Reflex Champion: Pratik"],
    photos: ["/events/04_DIP23_Induction_Sep2023/photo_01.png", "/events/04_DIP23_Induction_Sep2023/photo_02.png", "/events/04_DIP23_Induction_Sep2023/photo_03.jpeg", "/events/04_DIP23_Induction_Sep2023/photo_04.jpeg", "/events/04_DIP23_Induction_Sep2023/photo_05.jpeg", "/events/04_DIP23_Induction_Sep2023/photo_06.jpeg", "/events/04_DIP23_Induction_Sep2023/photo_07.jpeg"]
  },
  {
    id: "event-project-expo-jun2023",
    title: "Project Expo’23 – Annual Technical Project Exhibition & Evaluation",
    description: "Project Expo’23 served as the grand capstone project exhibition for the graduating B.Tech Software Engineering batch (2019–2023). The exhibition provided a formal platform for senior engineering candidates to demonstrate live, working prototypes solving pressing real-world societal, healthcare, automation, and enterprise challenges to a distinguished jury panel consisting of senior faculty and external academic leaders.",
    image_url: "/events/03_Project_Expo_Jun2023/photo_10.jpeg",
    date: "2023-06-17",
    end_date: "2023-06-17",
    status: "Past",
    type: "Capstone Expo",
    category: "Technical Fests & Expos",
    academic_year: "2022–2023",
    venue: "Vidya Block / Software Engineering Labs",
    time: "9:00 AM to 5:00 PM (Full Day) (1 Day (Cumulative Capstone))",
    duration: "Cumulative Capstone",
    participants_count: 180,
    attendance: "18 Teams (66 Students - 100% Attendance)",
    mode: "In-Person Campus Session",
    rating: 4.95,
    featured: false,
    objectives: ["Showcase end-to-end software and hardware engineering capstones developed over final-year research semesters.", "Evaluate projects rigorously against rigorous standardized academic rubrics and industry benchmarks.", "Cultivate technical defense capabilities, project pitching, and peer-to-peer demonstration skills.", "Foster innovation bridging academic inquiry with patentable, commercializable, and open-source solutions."],
    outcomes: "66 graduating engineers demonstrated production-grade solutions. External reviewer Dr. Venkata Rao K. commended the software engineering rigor, clean architecture, and deployment readiness of the presented capstones.",
    highlights: ["Exemplary projects spanning autonomous robotics, AI medical diagnostic assistants, blockchain supply-chain trackers, and smart IoT water resource monitors received top honours and certificates of merit upon comprehensive jury consensus."],
    photos: ["/events/03_Project_Expo_Jun2023/photo_01.png", "/events/03_Project_Expo_Jun2023/photo_02.png", "/events/03_Project_Expo_Jun2023/photo_03.png", "/events/03_Project_Expo_Jun2023/photo_04.png", "/events/03_Project_Expo_Jun2023/photo_05.png", "/events/03_Project_Expo_Jun2023/photo_06.png", "/events/03_Project_Expo_Jun2023/photo_07.jpeg", "/events/03_Project_Expo_Jun2023/photo_08.jpeg", "/events/03_Project_Expo_Jun2023/photo_09.jpeg", "/events/03_Project_Expo_Jun2023/photo_10.jpeg", "/events/03_Project_Expo_Jun2023/photo_11.jpeg", "/events/03_Project_Expo_Jun2023/photo_12.png", "/events/03_Project_Expo_Jun2023/photo_13.jpeg", "/events/03_Project_Expo_Jun2023/photo_14.jpeg", "/events/03_Project_Expo_Jun2023/photo_15.jpeg"]
  },
  {
    id: "event-exam-writing-workshop-may2023",
    title: "The Art of Writing Examinations & Preparing for Presentations",
    description: "On May 23, 2023, the Department of Computer Engineering (Software Engineering) in collaboration with the FOSS Club hosted an extensive masterclass titled 'The Art of Writing Examinations & Preparing for Presentations'. Designed to enhance both academic test performance and professional communication skills, the seminar addressed two vital pillars of collegiate and industry success.",
    image_url: "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_03.jpeg",
    date: "2023-05-23",
    end_date: "2023-05-23",
    status: "Past",
    type: "Academic Workshop",
    category: "Workshops & Seminars",
    academic_year: "2022–2023",
    venue: "Seminar Hall, Room No. 113, FET Block, SET Building",
    time: "1:00 PM to 4:00 PM (1 Day (3 Hours))",
    duration: "3 Hours",
    participants_count: 120,
    attendance: "175 Students",
    mode: "In-Person Campus Session",
    rating: 4.85,
    featured: false,
    objectives: ["Equip students with strategic examination frameworks: time management, note-taking, and cognitive stress control.", "Instruct engineering undergraduates on slide visual hierarchy, storytelling, and impactful technical presentation delivery.", "Demystify corporate presentation expectations through real-world examples shared by an active industry software engineer.", "Provide hands-on simulation drills and individualized speaker feedback during interactive Q&A breakouts."],
    outcomes: "Participants praised the practical relevance, noting marked improvements in their ability to organize revision time, structure technical seminar decks, and communicate complex concepts articulately before evaluators.",
    highlights: ["N/A (Professional Development Workshop with interactive presentation drills and certificates of participation)."],
    photos: ["/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_01.png", "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_02.jpeg", "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_03.jpeg", "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_04.jpeg", "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_05.jpeg", "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_06.jpeg", "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_07.jpeg", "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_08.jpeg", "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_09.jpeg", "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_10.jpeg", "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_11.jpeg", "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_12.jpeg", "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_13.jpeg", "/events/02_Exam_Writing_Presentation_Workshop_May2023/photo_14.jpeg"]
  },
  {
    id: "event-quizoss-may2023",
    title: "QUIZOSS – Surprise Quiz on Open Source Software",
    description: "QUIZOSS was an energetic, multi-classroom surprise quiz competition conducted by the FOSS Club across the entire B.Tech 1st and 2nd year cohorts. The initiative was conceptualized to gauge students' spontaneous knowledge of Open Source Software (OSS), Unix/Linux history, licensing standards (GPL, MIT, Apache), and popular open-source toolchains, promoting a culture of peer learning and curiosity.",
    image_url: "/events/01_Quizoss_May2023/photo_08.png",
    date: "2023-05-04",
    end_date: "2023-05-04",
    status: "Past",
    type: "Interactive Quiz",
    category: "Quizzes & Awareness",
    academic_year: "2022–2023",
    venue: "B.Tech Classrooms (Rooms 101, 102, 114-A, 114-B, 114-C, 204, 205, 206, 207, 214, 215, 216)",
    time: "College hours (Last Hour Session) (1 Day)",
    duration: "1 Day",
    participants_count: 250,
    attendance: "All 1st & 2nd Year Students across 25 Classrooms (20 Club Volunteers)",
    mode: "In-Person Campus Session",
    rating: 4.9,
    featured: false,
    objectives: ["Assess real-time awareness and literacy regarding open-source platforms and decentralized collaboration.", "Promote healthy academic competition across core engineering branches including CSE, AI, ML, and Data Science.", "Encourage students to participate actively in open-source developer communities and Google Summer of Code (GSoC).", "Identify passionate tech talent across first and second-year batches for recruitment into the FOSS core team."],
    outcomes: "The event reached over 25 classrooms and hundreds of engineering students in a single afternoon. It sparked widespread interest in open-source methodologies, increased club membership signups, and laid the foundation for future hands-on coding bootcamps.",
    photos: ["/events/01_Quizoss_May2023/photo_01.png", "/events/01_Quizoss_May2023/photo_02.png", "/events/01_Quizoss_May2023/photo_03.png", "/events/01_Quizoss_May2023/photo_04.png", "/events/01_Quizoss_May2023/photo_05.png", "/events/01_Quizoss_May2023/photo_06.png", "/events/01_Quizoss_May2023/photo_07.png", "/events/01_Quizoss_May2023/photo_08.png", "/events/01_Quizoss_May2023/photo_09.png", "/events/01_Quizoss_May2023/photo_10.png", "/events/01_Quizoss_May2023/photo_11.png", "/events/01_Quizoss_May2023/photo_12.png", "/events/01_Quizoss_May2023/photo_13.png", "/events/01_Quizoss_May2023/photo_14.png"]
  },
  {
    id: "event-archive-2021-2022-activities",
    title: "Historical Archive: Departmental Events & Activities (2021–2022)",
    description: "This archival record documents the seminal activities that led to the founding and formal establishment of the FOSS Club and software engineering specialized programs during the 2021–2022 academic calendar.",
    image_url: "/events/19_Archive_2021_2022_Activities/photo_08.jpg",
    date: "2021-09-08",
    end_date: "2021-11-30",
    status: "Past",
    type: "Foundation Archive",
    category: "Historical Archive",
    academic_year: "2021–2022",
    venue: "Zoom Online Platform & Vidya Block Labs, FET",
    time: "Various Semesters & Lab Sessions (Semester-Long Initiative)",
    duration: "Semester-Long Initiative",
    participants_count: 350,
    attendance: "Department Cohorts",
    mode: "In-Person Campus Session",
    rating: 4.8,
    featured: false,
    objectives: ["Document the historical baseline and evolutionary milestones of the Software Engineering department.", "Record the founding inauguration of the FOSS Club on November 13, 2021.", "Celebrate pioneering student projects showcased in Project Expo’21 and Department Lab Day."],
    outcomes: "Established the departmental traditions of project-based learning, industry mentorship, and open-source software advocacy that paved the way for the extensive 2023–2026 event trajectory.",
    highlights: ["Best Open-Ended Lab Experiments: Think-C, InChat, AMIGO, Virtual Painter, MERN Banking System."],
    photos: ["/events/19_Archive_2021_2022_Activities/photo_01.png", "/events/19_Archive_2021_2022_Activities/photo_02.png", "/events/19_Archive_2021_2022_Activities/photo_03.jpeg", "/events/19_Archive_2021_2022_Activities/photo_04.png", "/events/19_Archive_2021_2022_Activities/photo_05.jpeg", "/events/19_Archive_2021_2022_Activities/photo_06.jpeg", "/events/19_Archive_2021_2022_Activities/photo_07.jpg", "/events/19_Archive_2021_2022_Activities/photo_08.jpg"]
  }
];

export const FULLSTACK_BOOTCAMP_MASTER = {
  id: "event-fullstack-bootcamp-master-2026",
  title: "Full-Stack Development Bootcamp 2026 (10-Week Cohort)",
  cardTitle: "Full-Stack 10-Week Bootcamp",
  description: "A comprehensive 10-week Student Development Program mastering web fundamentals, modern CSS layouts, Git version control, React frontend engineering, and Node.js/Express REST APIs. Spanning 6 evaluated phases with 326 registered students.",
  image_url: "/events/18_Fullstack_Week5_Node_Express_Mar2026/photo_01.jpeg",
  date: "2026-02-06",
  end_date: "2026-04-30",
  status: "Past",
  type: "10-Week Flagship Bootcamp",
  category: "Workshops & Seminars",
  academic_year: "2025–2026",
  venue: "Seminar Hall 121, Room 114, Classrooms 205 & 206, FET Block",
  time: "Every Saturday • 9:00 AM – 3:30 PM",
  duration: "10-Week Comprehensive Bootcamp",
  participants_count: 326,
  attendance: "110+ Dedicated Coders Per Cohort",
  mode: "In-Person Campus Sessions",
  rating: 4.95,
  featured: true,
  objectives: [
    "Week 1: Demystify Client-Server model, DNS, TCP/IP, and semantic HTML5 document structures.",
    "Week 2: Deconstruct CSS Box Model, Flexbox 1D layout, CSS Grid 2D matrices, and responsive media queries.",
    "Week 3: Master Git distributed version control, GitHub PR workflows, and modern ES6+ JavaScript DOM scripting.",
    "Week 4: Transition to declarative UI development in React.js, Virtual DOM, JSX, components, and useState hook.",
    "Week 5: Server-side engineering with Node.js and Express.js, RESTful API architecture, middleware, and CRUD endpoints.",
    "Final Sprint: End-to-end full-stack capstone projects deployed to live production cloud hosts."
  ],
  outcomes: "Students transitioned from frontend consumers into full-stack producers, capable of architecting and deploying production web applications connecting React frontends to Node.js backend databases.",
  highlights: [
    "Official cohort launch inaugurated by academic leadership and departmental heads (Feb 6, 2026).",
    "Over 100 students deployed personal developer portfolios to GitHub Pages in Week 3.",
    "Fully functioning CRUD API servers tested and verified with automated test suites in Week 5."
  ],
  curriculum: [
    { week: "Launch", title: "Grand Inauguration Ceremony", description: "Formal inauguration with departmental leadership and 10-week roadmap reveal.", date: "Feb 06, 2026" },
    { week: "Week 1", title: "Web Fundamentals & HTML5", description: "Client-server architecture, semantic HTML5, DOM hierarchy, and developer portfolios.", date: "Feb 07, 2026" },
    { week: "Week 2", title: "CSS Fundamentals & Modern Layouts", description: "Box model, Flexbox, CSS Grid, relative units, and responsive layouts.", date: "Feb 14, 2026" },
    { week: "Week 3", title: "Git Version Control & Core JavaScript", description: "Distributed Git branching, GitHub PRs, ES6+ arrays, and dynamic DOM manipulation.", date: "Feb 28, 2026" },
    { week: "Week 4", title: "Frontend Development with React.js", description: "Component-driven architectures, JSX, unidirectional data flow, and state hooks.", date: "Mar 07, 2026" },
    { week: "Week 5", title: "Backend with Node.js & Express.js", description: "Event loop, Express middleware, REST API design, and JSON databases.", date: "Mar 14, 2026" }
  ],
  photos: [
    "/events/18_Fullstack_Week5_Node_Express_Mar2026/photo_01.jpeg",
    "/events/16_Fullstack_Week4_React_Mar2026/photo_02.jpeg",
    "/events/15_Fullstack_Week3_Git_JS_Feb2026/photo_01.jpeg",
    "/events/14_Fullstack_Week2_CSS_Feb2026/photo_04.jpeg",
    "/events/13_Fullstack_Week1_WebFundamentals_Feb2026/photo_03.jpeg",
    "/events/12_Fullstack_Inauguration_Feb2026/photo_05.jpeg"
  ]
};

/**
 * Filtered list consolidating weekly workshops into single master entries to eliminate repetition
 */
export const CONSOLIDATED_EVENTS = [
  DEFAULT_EVENTS[0], // Vibe Coding Workshop
  FULLSTACK_BOOTCAMP_MASTER, // Consolidated 10-week bootcamp
  DEFAULT_EVENTS[2], // Squid Game Challenge
  DEFAULT_EVENTS[8], // Ice Breaker Challenge
  DEFAULT_EVENTS[9], // Escape Room Challenge
  DEFAULT_EVENTS[10], // Code Relay Challenge
  DEFAULT_EVENTS[11], // Industrial Visit XCEL Corp
  DEFAULT_EVENTS[12], // Switch Debate
  DEFAULT_EVENTS[13], // Anveshan 1.0
  DEFAULT_EVENTS[14], // Engineers Day
  DEFAULT_EVENTS[15], // DIP'23 Induction
  DEFAULT_EVENTS[16], // Project Expo'23
  DEFAULT_EVENTS[17], // Exam Writing Workshop
  DEFAULT_EVENTS[18], // QUIZOSS
  DEFAULT_EVENTS[19], // Archive 2021-2022
];

/**
 * Formats event titles cleanly so each card in the feed is distinct and descriptive
 */
export function formatCardTitle(event) {
  if (event.cardTitle) return event.cardTitle;
  const title = event.title || '';

  if (title.includes('Week 5')) return 'Week 5: Node.js & Express';
  if (title.includes('Week 4')) return 'Week 4: React.js UI';
  if (title.includes('Week 3')) return 'Week 3: Git & JavaScript';
  if (title.includes('Week 2')) return 'Week 2: CSS & Modern Layouts';
  if (title.includes('Week 1')) return 'Week 1: Web & HTML5';
  if (title.includes('Inauguration Ceremony') || title.includes('Inauguration')) return 'Bootcamp Inauguration';
  if (title.includes('VIBE CODING') || title.includes('Vibe Coding')) return 'Vibe Coding Workshop';
  if (title.includes('Squid Game')) return 'Squid Game Challenge';
  if (title.includes('Ice Breaker')) return 'Ice Breaker Challenge';
  if (title.includes('Escape Room')) return 'Escape Room Challenge';
  if (title.includes('Code Relay')) return 'Code Relay Challenge';
  if (title.includes('XCEL Corp')) return 'Industrial Visit: XCEL Corp';
  if (title.includes('Switch')) return 'Switch Debate Challenge';
  if (title.includes('Anveshan 1.0')) return 'Anveshan 1.0 Flagship Fest';
  if (title.includes('Engineers Day')) return 'Engineers Day Sketching';
  if (title.includes('DIP’23') || title.includes("DIP'23")) return 'DIP’23 Induction';
  if (title.includes('Project Expo’23') || title.includes("Project Expo'23")) return 'Project Expo’23 Capstone';
  if (title.includes('Writing Examinations')) return 'Art of Writing Examinations';
  if (title.includes('QUIZOSS')) return 'QUIZOSS Surprise Quiz';
  if (title.includes('Archive') || title.includes('Historical')) return 'Foundation Archive (2021–22)';

  if (title.includes(' – ')) {
    return title.split(' – ')[0].trim();
  }
  return title;
}

/**
 * Normalizes an event item to enrich it with chapter labels, theme accents, and fallback illustrations
 */
export function enrichEventForDisplay(event, index) {
  const accent = CHAPTER_ACCENTS[index % CHAPTER_ACCENTS.length];
  const chapterNumber = `Chapter ${index + 1}`;
  const isOdd = index % 2 === 1;

  const displayTitle = formatCardTitle(event);

  return {
    ...event,
    chapter: chapterNumber,
    cardTitle: displayTitle,
    category: event.type || event.category || "FOSS Event",
    accentColor: accent.color,
    glowColor: accent.glow,
    fallbackImage: accent.fallbackImg,
    staggerY: isOdd ? "54px" : "0px",
  };
}
