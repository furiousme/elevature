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
  finishQuiz?: (key: string, data: Answers['preferences']) => void;
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
  interests: {
    learningInterests: string;
    learningStyle: string;
  };
  preferences: {
    skillContext: string;
    networkingInterest: NetworkingInterest;
  };
};

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export enum SatisfactionLevel {
  VERY_SATISFIED = 'very satisfied',
  SOMEWHAT_SATISFIED = 'somewhat satisfied',
  NEUTRAL = 'neutral',
  UNSATISFIED = 'unsatisfied',
  VERY_UNSATISFIED = 'very unsatisfied',
}

export enum TimeCommitment {
  LESS_THAN_2_HOURS = 'Less than 2 hours',
  BETWEEN_2_AND_5_HOURS = '2-5 hours',
  BETWEEN_5_AND_10_HOURS = '5-10 hours',
  MORE_THAN_10_HOURS = 'More than 10 hours',
}

export enum NetworkingInterest {
  VERY = 'Very Interested',
  SOMEWHAT = 'Somewhat Interested',
  NOT = 'Not Interested',
}
