import Step1Icon from 'components/icons/step1-icon';
import Step2Icon from 'components/icons/step2-icon';
import Step3Icon from 'components/icons/step3-icon';
import Step4Icon from 'components/icons/step4-icon';
import Step5Icon from 'components/icons/step5-icon';

export const steps = [
  {
    order: 1,
    Icon: Step1Icon,
    title: 'Basic Information',
    description: 'Let us understand your background to tailor suggestions effectively.',
  },
  {
    order: 2,
    Icon: Step2Icon,
    title: 'Skills Assessment',
    description: 'Let us identify your current skill set.',
  },
  {
    order: 3,
    Icon: Step3Icon,
    title: 'Career Goals and Interests',
    description: 'Think of the ambitions and the areas you want to explore or grow in',
  },
  {
    order: 4,
    Icon: Step4Icon,
    title: 'Skill Development Interests',
    description:
      'Think of which skills you are interested in learning to generate relevant suggestions',
  },
  {
    order: 5,
    Icon: Step5Icon,
    title: 'Skill Application Preferences',
    description:
      "Let's capture your preferred contexts for applying new skills, which can guide suggestions on practical use",
  },
];
