// src/types/business.ts

export interface SBASection {
  title: string;
  content: string;
}

export interface BusinessPlan {
  executiveSummary: SBASection;
  companyDescription: SBASection;
  marketAnalysis: SBASection;
  organizationAndManagement: SBASection;
  serviceOrProductLine: SBASection;
  marketingAndSales: SBASection;
  fundingRequest: SBASection;
  financialProjections: SBASection;
  appendix: SBASection;
}

export interface Timeframe {
  shortTerm: string; // 1-3 months
  mediumTerm: string; // 3-12 months
  longTerm: string; // 1-3 years
}

export interface BusinessIdea {
  id: string;
  title: string;
  category: 'Tech' | 'Retail' | 'Service' | 'Food' | 'Creative' | 'Education' | 'Consulting';
  description: string;
  skills: string[];
  initialBudget: {
    min: number;
    max: number;
  };
  marketRisk: 'Low' | 'Medium' | 'High';
  timeframe: Timeframe;
  plan: BusinessPlan;
} 