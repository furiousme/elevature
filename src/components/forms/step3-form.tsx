import { MouseEvent, useState } from 'react';

import config from '../../../tailwind.config';

import { Answers, SatisfactionLevel } from 'app/types';
import Dropdown from 'components/dropdown';
import ArrowRight from 'components/icons/arrow-right';
import { focusOptions, satisfactionLevels } from 'models/options';
import { steps } from 'models/steps';

const colors = config.theme.extend.colors;

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
    <form className='flex grow flex-col justify-center'>
      <div className='mx-auto flex min-h-[400px] max-w-lg flex-col justify-center space-y-6 bg-background px-4'>
        <p className='mb-4'>How would you rate your overall proficiency in your primary skills?</p>

        <div className='mb-10 grid auto-cols-fr grid-cols-2'>
          {satisfactionLevels.map(([level, description], ind) => {
            return (
              <div className='mb-4 flex items-center' key={level}>
                <label className='flex items-center text-sm'>
                  <input
                    type='radio'
                    className='size-5'
                    checked={level === satisfactionLevel}
                    name='skillLevel'
                    onChange={() => setSatisfactionLevel(level as SatisfactionLevel)}
                  />
                  <span className='ml-4 inline-block'>{description}</span>
                </label>
              </div>
            );
          })}
        </div>

        <div className='pb-10'>
          <p className='mb-4'>What is your primary focus for career growth?</p>
          <Dropdown
            label='Select your focus'
            options={focusOptions}
            selected={focus}
            saveSelected={setFocus}
          />
        </div>

        <div className='mb-10'>
          <label className='mb-4 block'>Briefly describe your long-term career goal</label>
          <textarea
            placeholder='e.g., becoming a team leader, switching to a data analyst role, mastering software development...'
            value={longTermGoal}
            onChange={(e) => setLongTermGoal(e.target.value)} // add validation
            className='block w-full max-w-lg rounded border border-inactive bg-background p-4 text-sm outline-accent'
            rows={3}
          />
        </div>
      </div>
      <button
        className='hover btn mx-auto mb-16 mt-auto flex min-w-[200px] items-center justify-evenly rounded-full border border-accent p-5 font-bold uppercase text-white'
        disabled={!focus || !longTermGoal}
        onClick={handleSubmit}
      >
        Next
        <ArrowRight color={colors.accent} />
      </button>
    </form>
  );
};

export default Step3Form;
