export type Step = {
  order: number;
  title: string;
  description: string;
  Icon: React.FC;
};

export type Answers = {
  [key: string]: string;
};
