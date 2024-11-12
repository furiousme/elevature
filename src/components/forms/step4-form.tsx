import { MouseEvent, useState } from 'react';

import { Answers, TimeCommitment } from 'app/types';
import { learningStyles, learningStylesMap, timeCommitments } from 'models/options';
import { steps } from 'models/steps';
import FormWrapper from 'components/form-wrapper';

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
    goToStep(step.order + 1);
  };

  return (
    <FormWrapper
      disabled={!learningInterests || !learningStyle || !timeCommitment}
      submitHandler={handleSubmit}
    >
      <div className='mb-10'>
        <label className='mb-4 block'>
          <span className='text-accent'>1. </span>Are there specific skills you’d like to learn or
          improve?
        </label>
        <textarea
          placeholder='e.g., public speaking, data science, digital marketing...'
          value={learningInterests}
          onChange={(e) => setInterests(e.target.value)} // add validation
          className='block w-full max-w-lg rounded border border-inactive bg-background p-4 text-sm outline-accent'
          rows={3}
        />
      </div>

      <p className='mb-4'>
        <span className='text-accent'>2. </span>What type of learning experience do you prefer?
      </p>
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
    </FormWrapper>
  );
};

export default Step4Form;
