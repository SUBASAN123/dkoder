export interface CompanyTrack {
  id: string;
  name: string;
  badge: string;
  role: string;
  difficulty: 'Moderate' | 'Medium' | 'Hard';
  topics: string[];
  preparationWeeks: number;
  questionsCount: number;
  selectionRatio: string;
  salaryBand?: string;
  tier?: 'Super Dream' | 'Dream' | 'Digital' | 'Mass';
  locationHub?: string;
  rounds: {
    round: number;
    title: string;
    description: string;
    format: string;
  }[];
  sampleQuestion: {
    title: string;
    difficulty: string;
    category: string;
    problemStatement: string;
    constraints: string[];
    sampleInput: string;
    sampleOutput: string;
    solutionApproach: string;
  };
}

export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyTopics: string[];
  ctaText: string;
  iconName: 'code' | 'brain' | 'clock' | 'video' | 'building';
  previewBadge: string;
  interactivePreview: {
    title: string;
    sampleSnippet: string;
    detail: string;
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  monthlyPrice: number;
  annualPrice: number;
  highlighted?: boolean;
  badge?: string;
  idealFor: string;
  features: string[];
  ctaLabel: string;
  note?: string;
}

export interface PlacementStep {
  number: string;
  title: string;
  description: string;
  practicalOutcome: string;
  iconName: 'user-check' | 'terminal' | 'line-chart' | 'award';
}

export interface ImpactStat {
  value: string;
  label: string;
  context: string;
  detail: string;
}
