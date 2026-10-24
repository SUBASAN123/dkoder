import { MCQModule, UserProgress } from '../types/dashboard';

export const INITIAL_USER_PROGRESS: UserProgress = {
  streak: 5,
  totalXp: 180,
  level: 1,
  xpToNextLevel: 120, // 300 to reach level 2
  mcqsSolved: 4,
  codingSolved: 1,
  totalMCQs: 2328,
  totalModules: 96,
  accuracy: 85,
  plan: 'free'
};

export const MCQ_MODULES_DATA: MCQModule[] = [
  {
    id: 'mod-1',
    title: 'C — Setup to Syntax',
    category: 'C Programming',
    moduleNumber: 1,
    totalQuestions: 30,
    solvedQuestions: 0,
    status: 'not_started',
    difficulty: 'Easy',
    description: 'Foundations of C compilers, tokens, primitive data types, header files, and main function signatures.',
    questions: [
      {
        id: 'q1-1',
        question: 'What is the return type of the main() function according to the ANSI C standard?',
        options: ['void', 'int', 'float', 'char*'],
        correctIndex: 1,
        explanation: 'According to ANSI/ISO C standards, main() must return an integer (int) indicating exit status to the operating system (0 for normal exit).',
        topic: 'Function Signatures'
      },
      {
        id: 'q1-2',
        question: 'What will be the output of the following C code?',
        codeSnippet: '#include <stdio.h>\nint main() {\n    int a = 5;\n    printf("%d %d %d", a, ++a, a++);\n    return 0;\n}',
        options: ['7 7 5', '5 6 7', '7 6 5', 'Undefined behavior (compiler dependent)'],
        correctIndex: 3,
        explanation: 'Modifying a variable multiple times without a sequence point causes undefined behavior in standard C.',
        topic: 'Operator Precedence & Evaluation'
      },
      {
        id: 'q1-3',
        question: 'Which format specifier is used for printing a pointer address in standard C?',
        options: ['%x', '%u', '%p', '%d'],
        correctIndex: 2,
        explanation: '%p is the standard format specifier defined in C to print void* pointer addresses in hex format.',
        topic: 'I/O Format Specifiers'
      }
    ]
  },
  {
    id: 'mod-4',
    title: 'Character Operations',
    category: 'C Programming',
    moduleNumber: 4,
    totalQuestions: 15,
    solvedQuestions: 14,
    status: 'in_progress',
    difficulty: 'Easy',
    description: 'ASCII encodings, ctype.h library routines, character buffers, and null terminators.',
    questions: [
      {
        id: 'q4-1',
        question: 'What does the function isalpha(\'9\') from <ctype.h> return?',
        options: ['Non-zero integer (true)', '0 (false)', '1', '-1'],
        correctIndex: 1,
        explanation: '\'9\' is a numeric digit, not an alphabetic letter, so isalpha() returns 0.',
        topic: 'ctype.h Functions'
      },
      {
        id: 'q4-2',
        question: 'What is the ASCII value difference between uppercase \'A\' and lowercase \'a\' in C?',
        options: ['16', '32', '64', '26'],
        correctIndex: 1,
        explanation: '\'A\' has ASCII 65 and \'a\' has ASCII 97. The difference 97 - 65 = 32 allows quick case conversion via bitwise or math.',
        topic: 'ASCII Encodings'
      }
    ]
  },
  {
    id: 'mod-2',
    title: 'Pointer Arithmetic & References',
    category: 'C / C++',
    moduleNumber: 2,
    totalQuestions: 25,
    solvedQuestions: 0,
    status: 'not_started',
    difficulty: 'Medium',
    description: 'Memory addresses, scaling by sizeof(T), double pointers, and void pointer casting in technical placements.',
    questions: [
      {
        id: 'q2-1',
        question: 'If ptr is an int* pointing to address 1000 and sizeof(int) is 4 bytes, what address does (ptr + 3) evaluate to?',
        options: ['1003', '1004', '1012', '1016'],
        correctIndex: 2,
        explanation: 'Pointer arithmetic scales by the size of the underlying type: 1000 + 3 * sizeof(int) = 1000 + 12 = 1012.',
        topic: 'Pointer Arithmetic'
      },
      {
        id: 'q2-2',
        question: 'What is a "dangling pointer" in C/C++?',
        options: [
          'A pointer that hasn\'t been initialized yet',
          'A pointer pointing to a deallocated memory location',
          'A pointer that points to NULL',
          'A pointer to another pointer'
        ],
        correctIndex: 1,
        explanation: 'A dangling pointer arises when the memory object it references has been freed or deleted without resetting the pointer.',
        topic: 'Memory Management'
      }
    ]
  },
  {
    id: 'mod-3',
    title: 'Dynamic Memory Allocation',
    category: 'C / C++',
    moduleNumber: 3,
    totalQuestions: 20,
    solvedQuestions: 0,
    status: 'not_started',
    difficulty: 'Medium',
    description: 'malloc, calloc, realloc, and free mechanics, memory leak detection, and heap fragmentation.',
    questions: [
      {
        id: 'q3-1',
        question: 'What is the primary difference between malloc() and calloc() in C?',
        options: [
          'malloc initializes memory to zero while calloc leaves it uninitialized',
          'calloc initializes allocated memory to zero while malloc leaves garbage values',
          'calloc allocates on the stack, malloc allocates on the heap',
          'malloc accepts two arguments, calloc accepts one argument'
        ],
        correctIndex: 1,
        explanation: 'calloc(num, size) zeroes out the allocated memory block, whereas malloc(size) leaves previous garbage values intact.',
        topic: 'Heap Allocation'
      }
    ]
  },
  {
    id: 'mod-5',
    title: 'Quantitative Aptitude: Time & Work',
    category: 'Placement Aptitude',
    moduleNumber: 5,
    totalQuestions: 40,
    solvedQuestions: 0,
    status: 'not_started',
    difficulty: 'Medium',
    description: 'LCM method, pipes and cisterns, alternate work schedules, and efficiency ratios for TCS, Infosys, and Cognizant.',
    questions: [
      {
        id: 'q5-1',
        question: 'A can finish a task in 10 days, and B in 15 days. Working together, how many days will they take to complete the work?',
        options: ['5 days', '6 days', '7.5 days', '8 days'],
        correctIndex: 1,
        explanation: 'Work = LCM(10, 15) = 30 units. A efficiency = 3 units/day, B efficiency = 2 units/day. Combined = 5 units/day. Time = 30 / 5 = 6 days.',
        topic: 'LCM Shortcut'
      }
    ]
  },
  {
    id: 'mod-6',
    title: 'Data Structures: Trees & Traversals',
    category: 'Computer Science',
    moduleNumber: 6,
    totalQuestions: 35,
    solvedQuestions: 0,
    status: 'not_started',
    difficulty: 'Hard',
    description: 'Binary trees, BST invariants, Inorder, Preorder, Postorder, and Level Order BFS with queue.',
    questions: [
      {
        id: 'q6-1',
        question: 'Which tree traversal yields elements of a Binary Search Tree (BST) in strictly sorted ascending order?',
        options: ['Preorder (Root, Left, Right)', 'Inorder (Left, Root, Right)', 'Postorder (Left, Right, Root)', 'Level Order BFS'],
        correctIndex: 1,
        explanation: 'Inorder traversal visits Left Subtree -> Node -> Right Subtree, which directly yields ascending sorted order for any valid BST.',
        topic: 'BST Properties'
      }
    ]
  },
  {
    id: 'mod-7',
    title: 'Operating Systems: Concurrency & Deadlocks',
    category: 'Core CS',
    moduleNumber: 7,
    totalQuestions: 28,
    solvedQuestions: 0,
    status: 'not_started',
    difficulty: 'Hard',
    description: 'Banker\'s algorithm, mutexes vs semaphores, critical section problems, and page replacement policies.',
    questions: [
      {
        id: 'q7-1',
        question: 'Which of the following is NOT one of the four Coffman conditions necessary for a deadlock to occur?',
        options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption Allowed', 'Circular Wait'],
        correctIndex: 2,
        explanation: 'The condition is "No Preemption" (resources cannot be forcibly taken). If preemption is allowed, deadlock is avoided.',
        topic: 'Deadlock Conditions'
      }
    ]
  },
  {
    id: 'mod-8',
    title: 'DBMS & SQL Query Optimization',
    category: 'Core CS',
    moduleNumber: 8,
    totalQuestions: 32,
    solvedQuestions: 0,
    status: 'not_started',
    difficulty: 'Medium',
    description: 'B-Tree indexes, 3NF / BCNF normalization, ACID guarantees, and JOIN execution plans.',
    questions: [
      {
        id: 'q8-1',
        question: 'Which normal form eliminates partial functional dependencies on a candidate key?',
        options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
        correctIndex: 1,
        explanation: '2NF requires the relation to be in 1NF and guarantees that no non-prime attribute is partially dependent on any candidate key.',
        topic: 'Normalization'
      }
    ]
  }
];

export const PREPARATION_BUNDLES_LIST = [
  {
    id: 'b1',
    title: 'TCS NQT Foundation & Advanced Bundle',
    tag: 'Service Giant',
    companies: ['TCS Digital', 'TCS Prime', 'TCS Ninja'],
    modulesCount: 24,
    mcqsCount: 480,
    badgeColor: 'border-purple-300 bg-purple-50 text-purple-900',
    description: 'Comprehensive NQT coverage: Numerical ability, Verbal, Advanced reasoning, and 40 hands-on coding tests.'
  },
  {
    id: 'b2',
    title: 'Amazon SDE-1 Placement Sprint',
    tag: 'Tier 1 Product',
    companies: ['Amazon', 'Flipkart', 'Swiggy'],
    modulesCount: 32,
    mcqsCount: 620,
    badgeColor: 'border-amber-300 bg-amber-50 text-amber-900',
    description: 'LeetCode pattern sets: Two Pointers, Trees, Graphs, DP, plus Amazon Leadership behavioral review.'
  },
  {
    id: 'b3',
    title: 'Zoho Full-Stack & App Round Preparation',
    tag: 'Product SaaS',
    companies: ['Zoho', 'Freshworks'],
    modulesCount: 18,
    mcqsCount: 340,
    badgeColor: 'border-blue-300 bg-blue-50 text-blue-900',
    description: 'Hands-on C/Java pointers, matrix algorithms, and console application design without external libraries.'
  },
  {
    id: 'b4',
    title: 'Core CS Engineering Interview Pack',
    tag: 'Foundational',
    companies: ['All Companies'],
    modulesCount: 22,
    mcqsCount: 440,
    badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-900',
    description: 'DBMS, OS threads, Computer Networks, and OOPS interview question bank with video breakdowns.'
  }
];
