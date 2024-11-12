import { NetworkingInterest, SatisfactionLevel, SkillLevel, TimeCommitment } from 'app/types';

export const industries = [
  'Accounting & Finance',
  'Advertising & Marketing',
  'Agriculture & Farming',
  'Architecture & Design',
  'Arts, Entertainment & Recreation',
  'Automotive',
  'Banking & Financial Services',
  'Biotechnology',
  'Business Consulting & Strategy',
  'Construction & Engineering',
  'Consumer Goods & Retail',
  'Customer Service',
  'Data & Analytics',
  'Education & Training',
  'Energy & Utilities',
  'Environmental Services',
  'Fashion & Apparel',
  'Food & Beverage',
  'Government & Public Sector',
  'Healthcare & Medical',
  'Hospitality & Tourism',
  'Human Resources',
  'Information Technology (IT)',
  'Insurance',
  'Legal Services',
  'Logistics & Supply Chain',
  'Manufacturing & Production',
  'Media & Communications',
  'Mining & Metals',
  'Nonprofit & Social Services',
  'Oil & Gas',
  'Pharmaceuticals',
  'Publishing',
  'Real Estate & Property Management',
  'Research & Development (R&D)',
  'Retail & E-commerce',
  'Sales',
  'Science & Research',
  'Security & Investigations',
  'Software & Technology',
  'Sports & Fitness',
  'Telecommunications',
  'Transportation & Delivery',
  'Utilities',
  'Video Gaming',
  'Warehouse & Distribution',
  'Wholesale Trade',
  'Writing & Content Creation',
  'Other',
];

export const skillLevels = {
  [SkillLevel.BEGINNER]: 'I’m still learning or have basic knowledge.',
  [SkillLevel.INTERMEDIATE]: 'I can perform tasks independently with some guidance.',
  [SkillLevel.ADVANCED]: 'I’m highly skilled and can lead or teach others.',
};

export const focusOptions = [
  'Advancing in my current role',
  'Exploring new roles in my industry',
  'Transitioning to a new industry',
  'Building a specific skill set',
];

export const learningStylesMap = {
  selfPaced: 'Self-paced online courses',
  interactive: 'Interactive, hands-on learning',
  reading: 'Reading and research',
  mentorship: 'Mentorship or coaching',
};

export const skillContextMap = {
  currentRole: 'Within my current role',
  transition: 'To transition into a new role',
  sideProject: 'For a side project or freelance',
  personalGrowth: 'For personal growth or hobby',
};

export const learningStyles = Object.entries(learningStylesMap);
export const satisfactionLevels = Object.entries(SatisfactionLevel);
export const timeCommitments = Object.entries(TimeCommitment);
export const skillContexts = Object.entries(skillContextMap);
export const networkingInterests = Object.entries(NetworkingInterest);
