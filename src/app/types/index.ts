export type Step = {
  order: number;
  title: string;
  description: string;
  Icon: React.FC;
  Form: React.FC<StepFormProps>;
};

export type StepFormProps = {
  goToStep: (stepNumber: number) => void;
  passAnswers: (key: string, data: unknown) => void;
};

export type Answers = {
  basic: {
    jobTitle: string;
    industry: string;
  };
  skills: {
    currentSkills: string;
    skillLevel: SkillLevel;
  };
  goals: {
    satisfactionLevel: SatisfactionLevel;
    focus: string;
    longTermGoal: string;
  };
};

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export enum SatisfactionLevel {
  VERY_SATISFIED = 'Very Satisfied',
  SOMEWHAT_SATISFIED = 'Somewhat Satisfied',
  NEUTRAL = 'Neutral',
  UNSATISFIED = 'Unsatisfied',
  VERY_UNSATISFIED = 'Very Unsatisfied',
}
