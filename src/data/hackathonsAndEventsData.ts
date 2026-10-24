export interface HackathonItem {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  status: 'live' | 'upcoming' | 'ended';
  date: string;
  timeRemaining: string;
  duration: string;
  prizePool: string;
  registeredCount: number;
  difficulty: 'Medium' | 'Hard' | 'Open to All';
  companies: string[];
  description: string;
  rounds: string[];
  isRegistered?: boolean;
}

export interface WebinarItem {
  id: string;
  title: string;
  category: string;
  speaker: {
    name: string;
    role: string;
    company: string;
    avatarInitials: string;
  };
  dateTime: string;
  duration: string;
  attendeesCount: number;
  tags: string[];
  keyTakeaways: string[];
  isRegistered?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  domain: string;
  difficulty: string;
  techStack: string[];
  description: string;
  starsCount: number;
  vivaReadiness: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  format: string;
  pagesOrSize: string;
  downloadsCount: number;
  description: string;
}

export const HACKATHONS_DATA: HackathonItem[] = [
  {
    id: 'hack-1',
    title: 'CodeStrike: National Placement Sprint #28',
    badge: 'LIVE ARENA 🔴',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
    status: 'live',
    date: 'Today, Ends in 2h 45m',
    timeRemaining: '02:44:18',
    duration: '3.0 Hours',
    prizePool: '₹35,000 + Amazon SDE-1 Fast-Track Referral',
    registeredCount: 2840,
    difficulty: 'Hard',
    companies: ['Amazon', 'Google', 'Flipkart'],
    description: '4 algorithmic problems covering Dynamic Programming, Segment Trees, and Monotonic Queues under strict camera proctoring.',
    rounds: ['Round 1: 2 Medium Algorithmic Problems', 'Round 2: 2 Hard Competitive Problems', 'Plagiarism & Memory Screening']
  },
  {
    id: 'hack-2',
    title: 'TCS Digital National Simulation Battle',
    badge: 'UPCOMING THIS WEEK',
    badgeColor: 'bg-[#FFD000]/20 text-[#FFD000] border-[#FFD000]/40',
    status: 'upcoming',
    date: 'Saturday, Oct 25 · 6:00 PM IST',
    timeRemaining: '2 Days Left',
    duration: '110 Minutes',
    prizePool: 'Top 100 Rankers Get Full TCS Prime Mock Kit',
    registeredCount: 4210,
    difficulty: 'Medium',
    companies: ['TCS Digital', 'TCS Prime'],
    description: 'Full simulation mirroring the actual TCS iON interface: Advanced Quantitative Math, Logical Reasoning, and 2 Hands-on Coding questions.',
    rounds: ['Section 1: Numerical Ability (25 mins)', 'Section 2: Advanced Reasoning (25 mins)', 'Section 3: Coding (60 mins)']
  },
  {
    id: 'hack-3',
    title: 'Zoho Application Round: Console Engine Sprint',
    badge: 'UPCOMING',
    badgeColor: 'bg-purple-400/20 text-purple-300 border-purple-400/40',
    status: 'upcoming',
    date: 'Sunday, Oct 26 · 10:00 AM IST',
    timeRemaining: '3 Days Left',
    duration: '4.0 Hours',
    prizePool: '₹20,000 Cash + 1:1 Code Review with Senior Zoho Lead',
    registeredCount: 1650,
    difficulty: 'Hard',
    companies: ['Zoho Corporation'],
    description: 'Build a working console application (Railway Reservation, Splitwise, or Food Delivery engine) from scratch using pure OOP in C++, Java, or Python without external libraries.',
    rounds: ['Problem Release & Spec Analysis', 'Console Architecture & Corner Cases', 'Code Walkthrough Evaluation']
  },
  {
    id: 'hack-4',
    title: 'Cognizant GenC Elevate Coding Challenge',
    badge: 'REGISTERING',
    badgeColor: 'bg-blue-400/20 text-blue-300 border-blue-400/40',
    status: 'upcoming',
    date: 'Nov 02 · 4:00 PM IST',
    timeRemaining: '9 Days Left',
    duration: '2.0 Hours',
    prizePool: 'Cognizant Elevate Interview Roadmap',
    registeredCount: 3120,
    difficulty: 'Medium',
    companies: ['Cognizant', 'Capgemini'],
    description: 'String manipulation, bitmasking, and graph BFS algorithms tailored for Cognizant GenC Next and Elevate placement drives.',
    rounds: ['Speed Coding: 3 Problems', 'Automated Test Case Runner']
  }
];

export const WEBINARS_DATA: WebinarItem[] = [
  {
    id: 'web-1',
    title: 'Cracking Google SWE-1: How I Solved Hard DP in 35 Minutes',
    category: 'Technical Interview Masterclass',
    speaker: {
      name: 'Aditya Swaminathan',
      role: 'Staff Software Engineer',
      company: 'Google (Ex-Amazon)',
      avatarInitials: 'AS'
    },
    dateTime: 'Tomorrow · 7:30 PM IST',
    duration: '90 Mins',
    attendeesCount: 1420,
    tags: ['Google SWE-1', 'Dynamic Programming', 'Live Problem Solving'],
    keyTakeaways: [
      'Recognizing subproblem overlap in under 5 minutes',
      'How to explain trade-offs between memoization and tabular DP to your interviewer',
      'Live breakdown of Google’s favorite tree DP pattern'
    ]
  },
  {
    id: 'web-2',
    title: 'TCS Digital & Prime 2026: Strategy, Cutoffs & Syllabus',
    category: 'Placement Drive Strategy',
    speaker: {
      name: 'Pooja Narayanan',
      role: 'Head of Campus Hiring Advisory',
      company: 'DKoder Placement Mentor',
      avatarInitials: 'PN'
    },
    dateTime: 'Friday, Oct 24 · 6:00 PM IST',
    duration: '60 Mins',
    attendeesCount: 3100,
    tags: ['TCS NQT', 'Sectional Cutoffs', 'Past Papers'],
    keyTakeaways: [
      'Exact sectional cutoffs required to qualify for TCS Prime (9 LPA) vs Ninja',
      'Negative marking avoidance strategies for numerical aptitude',
      'Live walkthrough of 5 frequently asked advanced reasoning puzzles'
    ]
  },
  {
    id: 'web-3',
    title: 'Low-Level System Design for Campus Candidates',
    category: 'Architecture & OOP',
    speaker: {
      name: 'Kiran Deep',
      role: 'Principal Architect',
      company: 'Freshworks (Ex-Zoho)',
      avatarInitials: 'KD'
    },
    dateTime: 'Saturday, Oct 25 · 11:00 AM IST',
    duration: '120 Mins',
    attendeesCount: 980,
    tags: ['LLD', 'OOP Design Patterns', 'Clean Code'],
    keyTakeaways: [
      'Designing Parking Lot, Elevators, and Rate Limiters on a whiteboard',
      'Applying SOLID principles without over-engineering',
      'Common pitfalls that get campus candidates rejected in OOP rounds'
    ]
  },
  {
    id: 'web-4',
    title: 'HR & Behavioral Interview Secrets: The STAR Method Mastered',
    category: 'Behavioral & Culture Fit',
    speaker: {
      name: 'Sarah Mathew',
      role: 'Former Lead Technical Recruiter',
      company: 'Microsoft India',
      avatarInitials: 'SM'
    },
    dateTime: 'Sunday, Oct 26 · 5:00 PM IST',
    duration: '75 Mins',
    attendeesCount: 1850,
    tags: ['STAR Method', 'HR Round', 'Salary Negotiation'],
    keyTakeaways: [
      'Framing your college final year project as a business-impact story',
      'How to answer: "Tell me about a time you had a conflict with a teammate"',
      'Asking smart questions at the end of the interview that leave a lasting impression'
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Distributed Cloud Code Sandbox & Judge Engine',
    domain: 'Distributed Systems & Cloud',
    difficulty: 'Hard',
    techStack: ['Node.js', 'Docker', 'Redis', 'PostgreSQL', 'Go'],
    description: 'An isolated microservice architecture that executes untrusted code inside ephemeral Docker containers with CPU and memory limits.',
    starsCount: 840,
    vivaReadiness: 'High · Covers Docker isolation, IPC, Redis queues, and OS memory limits.'
  },
  {
    id: 'proj-2',
    title: 'AI Automated Placement Resume Screener & ATS Parser',
    domain: 'Full-Stack & Machine Learning',
    difficulty: 'Medium',
    techStack: ['React', 'Python FastAPI', 'Gemini AI', 'Tailwind CSS'],
    description: 'Parses student PDF resumes, benchmarks against job descriptions, identifies missing technical keywords, and calculates match percentages.',
    starsCount: 1250,
    vivaReadiness: 'High · Covers REST APIs, NLP tokenization, and vector cosine similarity.'
  },
  {
    id: 'proj-3',
    title: 'Campus Peer-to-Peer Mock Interview Whiteboard',
    domain: 'Real-Time Web & WebSockets',
    difficulty: 'Medium',
    techStack: ['TypeScript', 'WebRTC', 'Socket.io', 'Monaco Code Editor'],
    description: 'Low-latency collaborative coding editor with synchronized syntax highlighting, audio/video calling, and real-time cursor tracking.',
    starsCount: 920,
    vivaReadiness: 'High · Covers WebSockets, WebRTC signaling, operational transformation.'
  }
];

export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Top 50 Dynamic Programming Patterns Blueprint',
    category: 'Coding Cheat Sheet',
    format: 'PDF Guide',
    pagesOrSize: '32 Pages · 4.2 MB',
    downloadsCount: 18400,
    description: '0/1 Knapsack, Longest Common Subsequence, Matrix Chain, and Tree DP patterns with C++ & Java code templates.'
  },
  {
    id: 'res-2',
    title: 'TCS NQT Quantitative Math Formulas & Shortcuts',
    category: 'Aptitude Handbook',
    format: 'PDF Guide',
    pagesOrSize: '48 Pages · 6.1 MB',
    downloadsCount: 24900,
    description: 'Speed tricks for Time & Work, Speed Distance, Compound Interest, Permutations, and Syllogisms.'
  },
  {
    id: 'res-3',
    title: 'Core CS Interview Pocket Guide (OS, DBMS, CN)',
    category: 'Revision Notes',
    format: 'PDF Guide',
    pagesOrSize: '64 Pages · 8.5 MB',
    downloadsCount: 31200,
    description: 'Acid properties, indexing B-trees, Deadlocks, TCP vs UDP, OSI model, and the 20 most frequent viva questions.'
  },
  {
    id: 'res-4',
    title: 'ATS-Optimized Engineering Student Resume Template',
    category: 'Career Toolkit',
    format: 'LaTeX + DOCX',
    pagesOrSize: 'ZIP Archive · 1.8 MB',
    downloadsCount: 15300,
    description: 'Pre-formatted Single-Page template proven to score 90+ on Jobscan and Workday ATS applicant filters.'
  }
];

export const LEADERBOARD_STUDENTS = [
  { rank: 1, name: 'Siddharth R.', college: 'IIT Madras', score: 3840, problems: 4, time: '1h 14m' },
  { rank: 2, name: 'Ananya Sharma', college: 'NIT Trichy', score: 3720, problems: 4, time: '1h 22m' },
  { rank: 3, name: 'Venkatesh K.', college: 'BITS Pilani', score: 3610, problems: 4, time: '1h 38m' },
  { rank: 4, name: 'Priyanshu Roy', college: 'VIT Vellore', score: 3490, problems: 4, time: '1h 45m' },
  { rank: 5, name: 'Rithika Mohan', college: 'PSG Tech', score: 3380, problems: 3, time: '1h 12m' }
];
