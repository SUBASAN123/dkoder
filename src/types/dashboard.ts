export interface MCQQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface MCQModule {
  id: string;
  title: string;
  category: string;
  moduleNumber: number;
  totalQuestions: number;
  solvedQuestions: number;
  status: 'not_started' | 'in_progress' | 'completed';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  questions: MCQQuestion[];
}

export interface UserProgress {
  streak: number;
  totalXp: number;
  level: number;
  xpToNextLevel: number;
  mcqsSolved: number;
  codingSolved: number;
  totalMCQs: number;
  totalModules: number;
  accuracy: number;
  plan: 'free' | 'pro' | 'accelerator';
}
