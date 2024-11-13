'use client';

import { Fragment } from 'react';

import config from '../../tailwind.config';

import { steps } from 'models/steps';

const { colors } = config.theme.extend;

const getDividerClasses = (isPassed: boolean) => {
  return isPassed ? 'h-1 grow bg-accent' : 'h-1 grow bg-inactive';
};

type Props = {
  activeStepOrder: number;
  passedSteps: number[];
  goToStep: (stepNumber: number) => void;
};

export const StepsProgressBar = ({ activeStepOrder, passedSteps, goToStep }: Props) => {
  const baseBtnClasses = 'flex-none basis-20 rounded-full border-[3px] p-5';
  const passedBtnClasses = baseBtnClasses + '  bg-background border-accent hover';
  const currentBtnClasses = baseBtnClasses + ' bg-accent border-accent hover';
  const inactiveBtnClasses = baseBtnClasses + ' bg-background border-inactive';

  return (
    <div className='progress-lines container flex max-w-4xl items-center justify-between'>
      {steps.map((el) => {
        const Icon = el.Icon;
        const isCurrent = activeStepOrder === el.order;
        const isPassed = passedSteps.includes(el.order);
        const isNext = passedSteps.includes(el.order - 1);
        const isLocked = !isPassed && !isCurrent && !isNext;
        const iconColor = isCurrent ? '#FFFFFF' : isPassed ? colors.accent : colors.inactive;
        const btnClasses = isCurrent
          ? currentBtnClasses
          : isPassed
            ? passedBtnClasses
            : inactiveBtnClasses;

        return (
          <Fragment key={el.order}>
            {el.order > 1 && <div className={getDividerClasses(isPassed)} />}
            <button className={btnClasses} disabled={isLocked} onClick={() => goToStep(el.order)}>
              <Icon color={iconColor} />
            </button>
          </Fragment>
        );
      })}
    </div>
  );
};

export default StepsProgressBar;
