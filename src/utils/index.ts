import { Answers } from 'app/types';
import { steps } from 'models/steps';

export const getPassedSteps = (answers: Partial<Answers>) => {
  return Object.keys(answers).reduce((acc, key) => {
    const step = steps.find((el) => el.key === key);

    return step ? [...acc, step.order] : acc;
  }, [] as number[]);
};
