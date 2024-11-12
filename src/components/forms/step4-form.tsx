import { MouseEvent, useState } from 'react';

import config from '../../../tailwind.config';

import { Answers, TimeCommitment } from 'app/types';
import ArrowRight from 'components/icons/arrow-right';
import { learningStyles, learningStylesMap, timeCommitments } from 'models/options';
import { steps } from 'models/steps';

const colors = config.theme.extend.colors;

type Props = {
  goToStep: (step: number) => void;
  passAnswers: (key: string, { learningInterests, learningStyle }: Answers['interests']) => void;
};

const Step4Form = ({ goToStep, passAnswers }: Props) => {
  const [step] = useState(() => steps.find((el) => el.order === 4));
  const [learningInterests, setInterests] = useState('');
  const [learningStyle, setLearningStyle] = useState(learningStylesMap.selfPaced);
  const [timeCommitment, setTimeCommitment] = useState(TimeCommitment.LESS_THAN_2_HOURS);

  if (!step) return null;

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!learningInterests || !learningStyle || !timeCommitment) return;
    passAnswers('interests', { learningInterests, learningStyle });
    console.log(step.order, 'go to +1');
    goToStep(step.order + 1);
  };

  return (
    <form className='flex grow flex-col justify-center'>
      <div className='mx-auto flex min-h-[400px] max-w-lg flex-col justify-center space-y-6 bg-background px-4'>
        <div className='mb-10'>
          <label className='mb-4 block'>
            Are there specific skills you’d like to learn or improve?
          </label>
          <textarea
            placeholder='e.g., public speaking, data science, digital marketing...'
            value={learningInterests}
            onChange={(e) => setInterests(e.target.value)} // add validation
            className='block w-full max-w-lg rounded border border-inactive bg-background p-4 text-sm outline-accent'
            rows={3}
          />
        </div>

        <p className='mb-4'>What type of learning experience do you prefer?</p>
        <div className='mb-10 grid auto-cols-fr grid-cols-2'>
          {learningStyles.map(([key, option]) => {
            return (
              <div className='mb-4 flex items-center' key={key}>
                <label className='flex items-center text-sm'>
                  <input
                    type='radio'
                    className='size-5'
                    name='learningStyle'
                    checked={option === learningStyle}
                    onChange={() => setLearningStyle(option)}
                  />
                  <span className='ml-4 inline-block'>{option}</span>
                </label>
              </div>
            );
          })}
        </div>

        <p className='mb-4'>How much time can you commit to learning new skills each week?</p>
        <div className='mb-10 grid auto-cols-fr grid-cols-2'>
          {timeCommitments.map(([key, option]) => {
            return (
              <div className='mb-4 flex items-center' key={key}>
                <label className='flex items-center text-sm'>
                  <input
                    type='radio'
                    className='size-5'
                    name='commitmentTime'
                    checked={option === timeCommitment}
                    onChange={() => setTimeCommitment(option)}
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
        disabled={!learningInterests || !learningStyle || !timeCommitment}
        onClick={handleSubmit}
      >
        Next
        <ArrowRight color={colors.accent} />
      </button>
    </form>
  );
};

export default Step4Form;
