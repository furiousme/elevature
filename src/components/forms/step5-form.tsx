import { MouseEvent, useState } from 'react';

import { Answers, NetworkingInterest } from 'app/types';
import { networkingInterests, skillContextMap, skillContexts } from 'models/options';
import { steps } from 'models/steps';

type Props = {
  goToStep: (step: number) => void;
  passAnswers: (key: string, { skillContext, networkingInterest }: Answers['preferences']) => void;
  finishQuiz?: () => void;
};

const Step5Form = ({ passAnswers, finishQuiz }: Props) => {
  const [step] = useState(() => steps.find((el) => el.order === 1));
  const [skillContext, setSkillContext] = useState(skillContextMap.currentRole);
  const [networkingInterest, setNetworkingInterest] = useState(NetworkingInterest.VERY);

  if (!step) return null;

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!skillContext || !networkingInterest) return;
    passAnswers('preferences', { skillContext, networkingInterest });
    console.log('before finish quiz');
    finishQuiz?.();
  };

  return (
    <form className='flex grow flex-col justify-center'>
      <div className='mx-auto flex min-h-[400px] max-w-lg flex-col justify-center space-y-6 bg-background px-4'>
        <p className='mb-4'>In what context would you like to apply new skills?</p>
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
          How interested are you in joining a professional community or networking group related to
          your skill goals?
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
      </div>
      <button
        className='hover btn mx-auto mb-16 mt-auto flex min-w-[200px] items-center justify-evenly rounded-full border border-accent p-5 font-bold uppercase text-white'
        disabled={!skillContext || !networkingInterest}
        onClick={handleSubmit}
      >
        Show results
      </button>
    </form>
  );
};

export default Step5Form;
