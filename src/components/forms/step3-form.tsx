'use client';

import { MouseEvent, useState } from 'react';

import { Answers, SatisfactionLevel } from 'app/types';
import Dropdown from 'components/dropdown';
import { focusOptions, satisfactionLevels } from 'models/options';
import { steps } from 'models/steps';
import FormWrapper from 'components/form-wrapper';

type Props = {
  goToStep: (step: number) => void;
  passAnswers: (key: string, { satisfactionLevel, focus, longTermGoal }: Answers['goals']) => void;
};

const Step3Form = ({ goToStep, passAnswers }: Props) => {
  const [step] = useState(() => steps.find((el) => el.order === 3));
  const [satisfactionLevel, setSatisfactionLevel] = useState(SatisfactionLevel.VERY_SATISFIED);
  const [focus, setFocus] = useState<string>('');
  const [longTermGoal, setLongTermGoal] = useState('');

  if (!step) return null;

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!focus || !longTermGoal) return;
    passAnswers('goals', { satisfactionLevel, focus, longTermGoal });
    goToStep(step.order + 1);
  };

  return (
    <FormWrapper disabled={!focus || !longTermGoal} submitHandler={handleSubmit}>
      <p className='mb-4'>
        <span className='text-accent'>1. </span> How would you rate your overall proficiency in your
        primary skills?
      </p>
      <div className='mb-10 grid auto-cols-fr grid-cols-2'>
        {satisfactionLevels.map(([key, option]) => {
          return (
            <div className='mb-4 flex items-center' key={key}>
              <label className='flex items-center text-sm'>
                <input
                  type='radio'
                  className='size-5'
                  checked={option === satisfactionLevel}
                  name='skillLevel'
                  onChange={() => setSatisfactionLevel(option as SatisfactionLevel)}
                />
                <span className='ml-4 inline-block'>{option}</span>
              </label>
            </div>
          );
        })}
      </div>

      <div className='pb-10'>
        <p className='mb-4'>
          <span className='text-accent'>2. </span> What is your primary focus for career growth?
        </p>
        <Dropdown
          label='Select your focus'
          options={focusOptions}
          selected={focus}
          saveSelected={setFocus}
        />
      </div>

      <div className='mb-10'>
        <label className='mb-4 block'>
          <span className='text-accent'>3. </span> Briefly describe your long-term career goal
        </label>
        <textarea
          placeholder='e.g., becoming a team leader...'
          value={longTermGoal}
          onChange={(e) => setLongTermGoal(e.target.value)} // add validation
          className='block w-full max-w-lg rounded border border-inactive bg-background p-4 mb-8 text-sm outline-accent'
          rows={3}
        />
      </div>
    </FormWrapper>
  );
};

export default Step3Form;
