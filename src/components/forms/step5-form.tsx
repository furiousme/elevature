'use client';

import { MouseEvent, useState } from 'react';

import { Answers, NetworkingInterest } from 'app/types';
import { networkingInterests, skillContextMap, skillContexts } from 'models/options';
import { steps } from 'models/steps';
import FormWrapper from 'components/form-wrapper';

type Props = {
  goToStep: (step: number) => void;
  passAnswers: (key: string, { skillContext, networkingInterest }: Answers['preferences']) => void;
  finishQuiz?: (key: string, { skillContext, networkingInterest }: Answers['preferences']) => void;
};

const Step5Form = ({ passAnswers, finishQuiz }: Props) => {
  const [step] = useState(() => steps.find((el) => el.order === 1));
  const [skillContext, setSkillContext] = useState(skillContextMap.currentRole);
  const [networkingInterest, setNetworkingInterest] = useState(NetworkingInterest.VERY);

  if (!step) return null;

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!skillContext || !networkingInterest) return;
    finishQuiz?.('preferences', { skillContext, networkingInterest });
  };

  return (
    <FormWrapper
      withIcon={false}
      submitHandler={handleSubmit}
      buttonText='Show results'
      disabled={!skillContext || !networkingInterest}
    >
      <p className='mb-4'>
        <span className='text-accent'>1. </span>In what context would you like to apply new skills?
      </p>
      <div className='mb-10 grid auto-cols-fr grid-cols-2'>
        {skillContexts.map(([key, option]) => {
          return (
            <div className='mb-4 flex items-center' key={key}>
              <label className='flex items-center text-sm'>
                <input
                  type='radio'
                  className='size-5'
                  name='learningStyle'
                  checked={option === skillContext}
                  onChange={() => setSkillContext(option)}
                />
                <span className='ml-4 inline-block'>{option}</span>
              </label>
            </div>
          );
        })}
      </div>

      <p className='mb-4'>
        <span className='text-accent'>2. </span>How interested are you in joining a professional
        community or networking group related to your skill goals?
      </p>
      <div className='mb-10 grid auto-cols-fr grid-cols-2'>
        {networkingInterests.map(([key, option]) => {
          return (
            <div className='mb-4 flex items-center' key={key}>
              <label className='flex items-center text-sm'>
                <input
                  type='radio'
                  className='size-5'
                  name='commitmentTime'
                  checked={option === networkingInterest}
                  onChange={() => setNetworkingInterest(option)}
                />
                <span className='ml-4 inline-block'>{option}</span>
              </label>
            </div>
          );
        })}
      </div>
    </FormWrapper>
  );
};

export default Step5Form;
