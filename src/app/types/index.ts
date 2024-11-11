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
};
