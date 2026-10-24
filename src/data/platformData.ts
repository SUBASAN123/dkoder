import { CompanyTrack, FeatureItem, PricingPlan, PlacementStep, ImpactStat } from '../types';

export const COMPANY_PREVIEW_LOGOS = [
  { name: 'Google', symbol: 'G', category: 'Product Tier' },
  { name: 'Zoho', symbol: 'Z', category: 'Product SaaS' },
  { name: 'Amazon', symbol: 'A', category: 'Tech Giant' },
  { name: 'Microsoft', symbol: 'M', category: 'Cloud & OS' },
  { name: 'TCS', symbol: 'T', category: 'Digital / Prime' },
  { name: 'Infosys', symbol: 'I', category: 'Specialist / DSE' },
  { name: 'Adobe', symbol: 'Ad', category: 'Creative Tech' },
];

export const COMPANY_TRACKS: CompanyTrack[] = [
  {
    id: 'google',
    name: 'Google',
    badge: 'Tier 1 Product',
    tier: 'Super Dream',
    salaryBand: '₹28.5 - 42.0 LPA',
    locationHub: 'Bangalore / Hyderabad',
    role: 'Software Development Engineer (SWE-I)',
    difficulty: 'Hard',
    preparationWeeks: 10,
    questionsCount: 165,
    selectionRatio: 'Top 1.5% percentile',
    topics: ['Dynamic Programming', 'Graph Theory', 'Trie & Segment Trees', 'Distributed Design Basics'],
    rounds: [
      { round: 1, title: 'Online Assessment', description: '2 complex algorithmic challenges within 90 minutes on Google platform.', format: 'Timed Coding Test' },
      { round: 2, title: 'Technical Interview 1', description: 'Deep dive into data structures, edge cases, and time/space complexity optimization.', format: 'Live Google Docs Coding' },
      { round: 3, title: 'Technical Interview 2', description: 'System modeling, graph traversal, and mathematical algorithmic insights.', format: 'Pair Coding Session' },
      { round: 4, title: 'Googliness & Leadership', description: 'Scenario-based cultural fit, conflict resolution, and collaborative impact questions.', format: 'Conversational HR & Tech' }
    ],
    sampleQuestion: {
      title: 'Shortest Subarray with Sum at Least K',
      difficulty: 'Hard',
      category: 'Monotonic Queue / Two Pointers',
      problemStatement: 'Given an integer array nums and an integer k, return the length of the shortest non-empty subarray of nums with a sum of at least k. If there is no such subarray, return -1.',
      constraints: ['1 <= nums.length <= 100,000', '-100,000 <= nums[i] <= 100,000', '1 <= k <= 10^9'],
      sampleInput: 'nums = [2, -1, 2], k = 3',
      sampleOutput: '3',
      solutionApproach: 'Prefix sum array combined with a monotonic deque to maintain minimum candidate prefix sums in O(N) time complexity.'
    }
  },
  {
    id: 'amazon',
    name: 'Amazon',
    badge: 'Tech Giant',
    tier: 'Super Dream',
    salaryBand: '₹28.0 - 44.0 LPA',
    locationHub: 'Bangalore / Hyderabad / Chennai',
    role: 'Software Development Engineer (SDE-I)',
    difficulty: 'Medium',
    preparationWeeks: 8,
    questionsCount: 190,
    selectionRatio: 'Top 3% percentile',
    topics: ['Tree & Graph Traversals', 'Sliding Window', 'LRU Cache Design', 'Amazon Leadership Principles'],
    rounds: [
      { round: 1, title: 'OA1: Debugging & Coding', description: '7 code debug challenges + 2 medium coding problems + Work Simulation assessment.', format: 'HackerRank Proctored' },
      { round: 2, title: 'Technical Round 1', description: 'Binary trees, heaps, priority queues, and customer-centric problem solving.', format: 'Live Chime Interview' },
      { round: 3, title: 'Technical Round 2', description: 'Low level object-oriented design (parking lot, locker system) + BFS/DFS.', format: 'Live Architecture & Code' },
      { round: 4, title: 'Bar Raiser & LP', description: 'Rigorous STAR method interview evaluating Deliver Results, Bias for Action, Customer Obsession.', format: 'Behavioral & Tech' }
    ],
    sampleQuestion: {
      title: 'Top K Frequent Words in Product Stream',
      difficulty: 'Medium',
      category: 'Heap / Hash Map / Trie',
      problemStatement: 'Given an array of strings words and an integer k, return the k most frequent strings sorted by frequency from highest to lowest, breaking ties by lowercase alphabetical order.',
      constraints: ['1 <= words.length <= 50,000', '1 <= words[i].length <= 10', 'k in range [1, unique words]'],
      sampleInput: 'words = ["i","love","leetcode","i","love","coding"], k = 2',
      sampleOutput: '["i","love"]',
      solutionApproach: 'Frequency map paired with a Min-Heap of size k with custom comparator for lexicographical sorting in O(N log k).'
    }
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    badge: 'Cloud & OS',
    tier: 'Super Dream',
    salaryBand: '₹24.0 - 40.0 LPA',
    locationHub: 'Hyderabad / Noida / Bangalore',
    role: 'Software Engineer (Campus Hire)',
    difficulty: 'Medium',
    preparationWeeks: 8,
    questionsCount: 155,
    selectionRatio: 'Top 4% percentile',
    topics: ['Linked Lists & Trees', 'Recursion & Backtracking', 'OS Threads & Memory', 'Clean Modular Code'],
    rounds: [
      { round: 1, title: 'Codility OA', description: '3 coding questions testing clean structure, performance boundaries, and unit tests.', format: 'Codility Platform' },
      { round: 2, title: 'Technical Interview 1', description: 'Data structures, string manipulations, pointer operations, and clean modular code.', format: 'MS Teams Screen Share' },
      { round: 3, title: 'Technical Interview 2', description: 'System threading concepts, database normalization, and dynamic programming.', format: 'Live Problem Solving' },
      { round: 4, title: 'Director Round (AA)', description: 'Project architecture review, engineering trade-offs, and behavioral scenarios.', format: 'Senior Engineering Leader' }
    ],
    sampleQuestion: {
      title: 'Lowest Common Ancestor in Binary Tree',
      difficulty: 'Medium',
      category: 'Trees / Recursion',
      problemStatement: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes p and q. The LCA is defined between two nodes p and q as the lowest node in T that has both p and q as descendants.',
      constraints: ['Tree nodes in range [2, 100,000]', '-10^9 <= Node.val <= 10^9', 'All Node.val are unique'],
      sampleInput: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1',
      sampleOutput: '3',
      solutionApproach: 'Post-order DFS traversal returning non-null nodes when matches occur in left or right subtrees.'
    }
  },
  {
    id: 'zoho',
    name: 'Zoho',
    badge: 'Product SaaS',
    tier: 'Dream',
    salaryBand: '₹8.4 - 14.0 LPA',
    locationHub: 'Chennai / Tenkasi / Salem',
    role: 'Software Developer',
    difficulty: 'Medium',
    preparationWeeks: 7,
    questionsCount: 140,
    selectionRatio: 'Hands-on Coding Rigor',
    topics: ['Matrix Manipulations', 'Custom String Parsers', 'Application Development Round', 'No Built-in Libraries'],
    rounds: [
      { round: 1, title: 'Written Aptitude & C Code Snippets', description: 'Pointers arithmetic, operator precedence, flow of execution, and mental math.', format: 'Pen-Paper / Online' },
      { round: 2, title: 'Basic Programming', description: '5-6 array, string, and pattern questions to test pure logical thinking.', format: 'Hands-on Without IDE Auto-complete' },
      { round: 3, title: 'Advanced Programming (App Round)', description: 'Build a working console application (e.g. Railway Reservation, Splitwise, Taxi Booking).', format: '3-4 Hours Architecture' },
      { round: 4, title: 'Technical & HR Discussion', description: 'Deep probe into the console application architecture, edge conditions, and integrity.', format: 'Senior Tech Lead' }
    ],
    sampleQuestion: {
      title: 'Console Railway Ticket Booking Engine',
      difficulty: 'Medium',
      category: 'Object Oriented Architecture',
      problemStatement: 'Design a console-based ticketing engine with Upper/Lower berth preferences, RAC allocation, Waiting list queuing, and automatic status cascading upon cancellation without using high-level collections.',
      constraints: ['Strict OOP design principles', 'Zero external libraries allowed'],
      sampleInput: 'Book(Name: "Anil", Age: 65, Berth: "Lower")',
      sampleOutput: 'Ticket Confirmed [Coach B1, Lower 12]',
      solutionApproach: 'Encapsulate Ticket, Passenger, and Berth entities with FIFO queues and status promotion listeners.'
    }
  },
  {
    id: 'tcs',
    name: 'TCS',
    badge: 'Digital & Prime',
    tier: 'Digital',
    salaryBand: '₹9.0 LPA (Prime) / ₹7.0 LPA (Digital)',
    locationHub: 'Pan India',
    role: 'TCS Digital / Prime Engineer',
    difficulty: 'Moderate',
    preparationWeeks: 6,
    questionsCount: 220,
    selectionRatio: 'Top 10% for Prime',
    topics: ['Advanced Quantitative Aptitude', 'Data Interpretation', 'Pattern Matching', 'SQL Queries & OOPS'],
    rounds: [
      { round: 1, title: 'TCS NQT Foundation', description: 'Numerical ability, verbal reasoning, and logical deduction under strict section timers.', format: 'iON Proctored Exam' },
      { round: 2, title: 'NQT Advanced Section', description: 'Advanced quantitative math, advanced reasoning, and 2 hands-on coding questions.', format: 'Sectional Cutoff' },
      { round: 3, title: 'Technical Interview', description: 'C/C++, Java or Python basics, database normalization, DBMS queries, and final-year project.', format: 'In-person / Virtual Panel' },
      { round: 4, title: 'Managerial & HR Round', description: 'Willingness to relocate, project teamwork, communication skills, and role expectations.', format: 'HR Discussion' }
    ],
    sampleQuestion: {
      title: 'Cyclic Prime Substring Verification',
      difficulty: 'Moderate',
      category: 'Number Theory / String Math',
      problemStatement: 'Given a positive numerical string, find the count of contiguous substrings that represent a prime number whose all circular cyclic rotations are also prime.',
      constraints: ['Length of string <= 100', 'Digit values 1-9'],
      sampleInput: 'input = "1193"',
      sampleOutput: 'Count: 4',
      solutionApproach: 'Sieve of Eratosthenes preprocessing with circular rotation string generation check.'
    }
  },
  {
    id: 'infosys',
    name: 'Infosys',
    badge: 'Specialist / DSE',
    tier: 'Digital',
    salaryBand: '₹9.5 LPA (SP) / ₹6.25 LPA (DSE)',
    locationHub: 'Bangalore / Mysore / Pune',
    role: 'Specialist Programmer (SP) / DSE',
    difficulty: 'Medium',
    preparationWeeks: 6,
    questionsCount: 175,
    selectionRatio: 'Top 5% for Specialist',
    topics: ['Greedy Algorithms', 'Dynamic Programming', 'Graph BFS/DFS', 'Data Structures'],
    rounds: [
      { round: 1, title: 'HackWithInfy / SP Assessment', description: '3 algorithmic problems varying from Easy to Hard; clearing 2+ qualifies for SP interview.', format: 'HackerEarth Proctored' },
      { round: 2, title: 'Technical Interview', description: 'Detailed walkthrough of submitted solutions, complexity analysis, DBMS, and OS.', format: 'Virtual Tech Panel' },
      { round: 3, title: 'HR Discussion', description: 'Offer alignment, role onboarding, and standard campus documentation.', format: 'HR Discussion' }
    ],
    sampleQuestion: {
      title: 'Minimum Energy Path with Altitude Constraints',
      difficulty: 'Medium',
      category: 'Dijkstra / Dynamic Programming',
      problemStatement: 'Find the minimum stamina spent navigating a 2D elevation grid where moving uphill costs stamina equal to the elevation differential squared, while moving downhill restores half stamina.',
      constraints: ['Grid dimensions <= 500x500', 'Altitude integers in range [0, 10,000]'],
      sampleInput: 'grid = [[1, 2, 3], [3, 4, 5]]',
      sampleOutput: 'Min Energy: 7',
      solutionApproach: 'Priority queue Dijkstra relaxation tracking minimum cost states.'
    }
  },
  {
    id: 'adobe',
    name: 'Adobe',
    badge: 'Creative Tech',
    tier: 'Super Dream',
    salaryBand: '₹22.0 - 38.0 LPA',
    locationHub: 'Noida / Bangalore',
    role: 'Member of Technical Staff (MTS-1)',
    difficulty: 'Hard',
    preparationWeeks: 9,
    questionsCount: 160,
    selectionRatio: 'Top 2% percentile',
    topics: ['Computational Geometry', 'Segment Trees', 'Tree Serialization', 'Concurrency'],
    rounds: [
      { round: 1, title: 'Online Assessment', description: '3 high-tier DSA questions on HackerRank within 120 minutes.', format: 'Timed Coding Test' },
      { round: 2, title: 'Technical Round 1', description: 'Deep probe into custom data structures, hashing collisions, and pointer management.', format: 'Live Virtual Interview' },
      { round: 3, title: 'Technical Round 2', description: 'System memory footprint optimization, cache-friendly data structures, and multi-threading.', format: 'Pair Coding Session' }
    ],
    sampleQuestion: {
      title: 'Serialize and Deserialize N-Ary Tree',
      difficulty: 'Hard',
      category: 'Trees / Serialization',
      problemStatement: 'Design an algorithm to serialize and deserialize an N-ary tree into a compact string representation without losing child hierarchy.',
      constraints: ['Nodes up to 10^4', 'Node values in [0, 10^4]'],
      sampleInput: 'Tree rooted at 1 with children [3, 2, 4]',
      sampleOutput: 'String: "1[3[5,6],2,4]"',
      solutionApproach: 'Preorder traversal with sentinel delimiters for child count transitions.'
    }
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    badge: 'GenC Elevate',
    tier: 'Digital',
    salaryBand: '₹6.75 LPA / ₹5.0 LPA',
    locationHub: 'Chennai / Coimbatore / Pune',
    role: 'GenC Elevate Associate',
    difficulty: 'Moderate',
    preparationWeeks: 5,
    questionsCount: 150,
    selectionRatio: 'Top 15% percentile',
    topics: ['Hands-on Java/Python', 'SQL Joins & Group By', 'Data Structures Basics', 'Logical Reasoning'],
    rounds: [
      { round: 1, title: 'Skill-Based Assessment', description: 'Technical MCQs + 2 Hands-on coding problems on Superset/Amcat.', format: 'Automated Test' },
      { round: 2, title: 'Technical Interview', description: 'Java OOP concepts, SQL queries, array algorithms, and college projects.', format: 'Virtual Panel' }
    ],
    sampleQuestion: {
      title: 'Maximum Sum Subarray with K Swaps',
      difficulty: 'Moderate',
      category: 'Arrays / Sliding Window',
      problemStatement: 'Find the maximum subarray sum achievable if at most K non-adjacent elements can be swapped with elements outside the window.',
      constraints: ['Array size up to 10^5', 'K <= 5'],
      sampleInput: 'nums = [1, -2, 3, 10, -4, 7], K = 1',
      sampleOutput: 'Max Sum: 20',
      solutionApproach: 'Sliding window tracking negative values replaced by maximum available outside numbers.'
    }
  }
];

export const FEATURES: FeatureItem[] = [
  {
    id: 'coding-practice',
    title: 'Coding Practice',
    subtitle: 'Pattern-Wise Problem Sets',
    description: 'Master 250+ essential coding questions curated by company patterns. Learn Two Pointers, Sliding Window, Trees, Graphs, and DP with clean explanations and test runner.',
    keyTopics: ['Two Pointers & Sliding Window', 'Trees, Graphs & Disjoint Set', 'Dynamic Programming Patterns', 'Binary Search & Monotonic Queues'],
    ctaText: 'Explore Coding Curricula',
    iconName: 'code',
    previewBadge: '250+ Placement Problems',
    interactivePreview: {
      title: 'Curated Pattern: Two Sum to Sliding Window',
      sampleSnippet: '// Sliding Window Maximum - O(N) Deque Approach\nfunction maxSlidingWindow(nums: number[], k: number): number[] {\n  const q: number[] = [];\n  const res: number[] = [];\n  // Optimized index tracking\n}',
      detail: 'Complete test suite with 25 hidden edge cases per problem.'
    }
  },
  {
    id: 'aptitude-mcqs',
    title: 'Aptitude & MCQs',
    subtitle: 'Quantitative, Logical & Verbal',
    description: 'Ace the primary filter round of company placements. Practice timed topic-wise quizzes with step-by-step shortcuts, speed tricks, and sectional analytics.',
    keyTopics: ['Quantitative Shortcuts', 'Data Interpretation & Graphs', 'Logical Deduction & Syllogisms', 'Verbal Ability & Comprehension'],
    ctaText: 'View Aptitude Modules',
    iconName: 'brain',
    previewBadge: '1,500+ Practice MCQs',
    interactivePreview: {
      title: 'Time, Speed & Work - Shortcut Method',
      sampleSnippet: 'Question: A can finish in 12 days, B in 18 days. Both work together for 4 days before A leaves...\nShortcut: Total work = LCM(12, 18) = 36 units.\nA: 3 units/day, B: 2 units/day. In 4 days: 20 units done.',
      detail: 'Includes explanation cards and sectional speed indicators.'
    }
  },
  {
    id: 'mock-tests',
    title: 'Mock Tests',
    subtitle: 'Company-Specific Simulations',
    description: 'Simulate the exact environment, timer pressure, and sectional cutoff rules of actual placement drives (TCS NQT, Cognizant, Infosys, Zoho, Amazon).',
    keyTopics: ['Real Sectional Time Clocks', 'Negative Marking Safeguards', 'Speed vs Accuracy Metrics', 'Rank & Peer Percentile'],
    ctaText: 'Try Free Diagnostic Mock',
    iconName: 'clock',
    previewBadge: 'Exact Exam Environment',
    interactivePreview: {
      title: 'TCS NQT Digital Full-Length Mock Simulation',
      sampleSnippet: 'Section 1: Numerical Ability (20 Qs, 25 Mins)\nSection 2: Reasoning Ability (20 Qs, 25 Mins)\nSection 3: Advanced Coding (2 Problems, 45 Mins)',
      detail: 'Instant report card with weak area radar diagnostics.'
    }
  },
  {
    id: 'video-courses',
    title: 'Video Courses',
    subtitle: 'Concept Walkthroughs & Solutions',
    description: 'Bite-sized visual lectures covering Core CS subjects (DBMS, OS, Computer Networks, OOPS) and deep video breakdowns of recurring placement coding challenges.',
    keyTopics: ['DBMS Normalization & SQL Queries', 'Operating Systems & Concurrency', 'Object-Oriented Design Principles', 'Interview Problem Video Solutions'],
    ctaText: 'Browse Course Library',
    iconName: 'video',
    previewBadge: '45+ Recorded Hours',
    interactivePreview: {
      title: 'Core CS Foundations Crash Track',
      sampleSnippet: 'Module 1: Acid Properties & Concurrency Anomalies\nModule 2: Deadlock Avoidance (Banker\'s Algorithm)\nModule 3: Virtual Memory & Page Faults',
      detail: 'Crisp 10-15 minute modules structured for revision.'
    }
  },
  {
    id: 'for-colleges',
    title: 'For Colleges',
    subtitle: 'Campus Placement Enablement',
    description: 'Empower Training & Placement Officers (TPOs) and faculty with cohort analytics, custom company readiness assessments, and batch-wide coding leaderboards.',
    keyTopics: ['Centralized TPO Dashboard', 'Batch Progress Tracking', 'Custom Proctored Assessments', 'Automated Diagnostic Reports'],
    ctaText: 'Schedule College Demo',
    iconName: 'building',
    previewBadge: 'Institutional Dashboard',
    interactivePreview: {
      title: 'TPO Placement Cell Command Center',
      sampleSnippet: 'Batch 2026: 480 Students Enrolled\nAverage Readiness Score: 78.4%\nEligible for Tier-1 Drives: 142 Students\nSectional Risk: Quantitative Aptitude (32% need remedial)',
      detail: 'Automated CSV exports and branch-wise performance reports.'
    }
  }
];

export const PLACEMENT_STEPS: PlacementStep[] = [
  {
    number: '01',
    title: 'Sign Up & Set Target Roles',
    description: 'Specify your graduation year, branch, and dream company targets (e.g., SDE-1 at Amazon or TCS Prime).',
    practicalOutcome: 'Personalized preparation roadmap and baseline diagnostic test.',
    iconName: 'user-check'
  },
  {
    number: '02',
    title: 'Practice with Purpose',
    description: 'Solve pattern-wise coding problems, quantitative aptitude questions, and core CS fundamentals.',
    practicalOutcome: 'Clear concept breakdowns with test runners and hints.',
    iconName: 'terminal'
  },
  {
    number: '03',
    title: 'Track Performance & Weak Spots',
    description: 'Monitor your problem-solving speed, accuracy curves, and topic mastery through actionable analytics.',
    practicalOutcome: 'Targeted recommendations to fix recurring mistakes.',
    iconName: 'line-chart'
  },
  {
    number: '04',
    title: 'Clear Placement Drives',
    description: 'Simulate full company tests with sectional timers, negative marking, and technical interview scenarios.',
    practicalOutcome: 'High confidence and readiness when campus drives begin.',
    iconName: 'award'
  }
];

export const TRUST_STATS: ImpactStat[] = [
  {
    value: '50,000+',
    label: 'Practice Sessions',
    context: 'Completed by engineering students across India',
    detail: 'Average session duration: 42 minutes with test execution'
  },
  {
    value: '1,200+',
    label: 'Curated Questions',
    context: 'Tagged with real company patterns & difficulty levels',
    detail: 'Spanning DSA, Aptitude, Core CS, and System Design'
  },
  {
    value: '40+',
    label: 'Company Tracks',
    context: 'Detailed hiring patterns and syllabus breakdowns',
    detail: 'From product firms like Google to mass recruiters like TCS'
  },
  {
    value: '4.9 / 5',
    label: 'Student Rating',
    context: 'Based on transparent student feedback & mock ratings',
    detail: 'Students praise zero-clutter interface and structured tracks'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free Starter',
    subtitle: 'Test foundational skills and explore platform practice',
    monthlyPrice: 0,
    annualPrice: 0,
    idealFor: '1st & 2nd year students starting their journey',
    features: [
      '50 foundational DSA coding problems',
      'Daily 10 Aptitude practice questions',
      'Basic test runner in 3 languages (C++, Java, Python)',
      'Community discussion board access',
      'Company syllabus guides (read-only)'
    ],
    ctaLabel: 'Start Free Practice',
    note: 'No credit card required. Free forever.'
  },
  {
    id: 'student-pro',
    name: 'Student Pro',
    subtitle: 'The comprehensive toolkit for 3rd & final year placements',
    monthlyPrice: 299,
    annualPrice: 2490,
    highlighted: true,
    badge: 'Most Popular',
    idealFor: 'Students actively preparing for campus drives',
    features: [
      'Full access to all 250+ Pattern-wise DSA problems',
      '1,500+ Aptitude MCQs with shortcut tricks',
      '6 Full-length company mock test simulations',
      'Core CS subject crash tracks (OS, DBMS, CN, OOPS)',
      'Detailed speed vs accuracy performance analytics',
      'Detailed solution codes with complexity analysis'
    ],
    ctaLabel: 'Get Student Pro',
    note: 'Transparent student pricing. Cancel anytime.'
  },
  {
    id: 'placement-accelerator',
    name: 'Placement Accelerator',
    subtitle: 'Intensive interview prep with all company tracks',
    monthlyPrice: 599,
    annualPrice: 4990,
    idealFor: 'Students targeting Tier-1 product roles & high packages',
    features: [
      'Everything in Student Pro included',
      'Access to all 40+ Company tracks (Google, Amazon, etc.)',
      'Unlimited company-specific mock test retakes',
      'Low-Level System Design & OOP console case studies',
      'Resume ATS checklist & technical interview guides',
      'Priority mentor doubt resolution within 24 hours'
    ],
    ctaLabel: 'Accelerate My Placement',
    note: '30-day money-back satisfaction promise.'
  },
  {
    id: 'college-campus',
    name: 'For Colleges',
    subtitle: 'Enterprise placement enablement for departments & TPOs',
    monthlyPrice: 0,
    annualPrice: 0,
    idealFor: 'Engineering colleges, universities & placement cells',
    features: [
      'Centralized Placement Officer (TPO) dashboard',
      'Batch management & student performance tracking',
      'Custom college-branded assessment tests with proctoring',
      'Automatic remedial student identification',
      'Campus placement drive readiness reports (PDF/Excel)',
      'Dedicated account manager & faculty training'
    ],
    ctaLabel: 'Request Campus Demo',
    note: 'Custom institutional pricing based on cohort size.'
  }
];

export const FREQUENT_QUESTIONS = [
  {
    q: 'How are DKoder company tracks structured?',
    a: 'Each track reflects the verified recruitment pattern of companies like Google, Amazon, TCS, or Zoho. Tracks include syllabus breakdowns, recommended preparation timelines, curated problem sets, and full simulated mock assessments.'
  },
  {
    q: 'Can colleges track individual student progress?',
    a: 'Yes. With the "For Colleges" institutional platform, placement officers (TPOs) and faculty receive dedicated administrative dashboards to monitor student coding hours, accuracy scores, and batch-wide eligibility readiness.'
  },
  {
    q: 'Which programming languages are supported in coding practice?',
    a: 'Our practice environment supports C++, Java, Python 3, and JavaScript with complete test case execution, memory tracking, and execution time diagnostics.'
  },
  {
    q: 'Is there a free tier for beginners?',
    a: 'Absolutely. The Free Starter plan gives permanent access to 50 curated placement coding challenges and daily aptitude quizzes without any credit card requirement.'
  }
];
