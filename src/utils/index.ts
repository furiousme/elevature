import { Answers } from 'app/types';
import { steps } from 'models/steps';

export const getPassedSteps = (answers: Partial<Answers>) => {
  return Object.keys(answers).reduce((acc, key) => {
    const step = steps.find((el) => el.key === key);

    return step ? [...acc, step.order] : acc;
  }, [] as number[]);
};

export const constructPromptMessage = (
  answers: Answers,
): { message: string; systemMessage: string } => {
  const systemMessage = `Answer as an experienced carrier consultant. Answer talking to the user directly (e.g. 'you'). Give accurate and precise advice. Your answer should be not less than 250 and no more than 300 words. Organize your answer exactly under the following structure: 
    {
    "summary": "a brief summary of the best user suggested path for the user",
    "career_path": "a list of career paths that may interest the user based on the information provided in the user's profile,  suggest career paths with very short descriptions",
    "skills_to_develop": "a list of the most in-demand skills based on the information provided in the user's profile,  suggest skills with very short descriptions"  
    }`;

  const inputText = `
    Current Role (user's current job): ${answers.basic.jobTitle} 
    Industry (the industry user currently works in): ${answers.basic.industry}
    Skills (relevant skills user currently has): ${answers.skills.currentSkills}
    Proficiency (how user rates their overall proficiency in current skills): ${answers.skills.skillLevel}
    Satisfaction (user's satisfaction level with their current carrier or role): ${answers.goals.satisfactionLevel}
    Focus (user's focus for currier grow): ${answers.goals.focus}
    Long-term Goal (user's long-term career goal): ${answers.goals.longTermGoal}
    Interests (skills the user would like to improve): ${answers.interests.learningInterests}
    Learning Style (user's preferred learning style): ${answers.interests.learningStyle}
    Time Commitment (how much the user can commit in learning each week): ${answers.preferences.networkingInterest}
    Skill Context (a context the user would like to apply their new skills in): ${answers.preferences.skillContext} 
    Networking Interest (how interested the user us in joining a professional community or networking group related to their skill goals): ${answers.preferences.networkingInterest}
  `;
  const message = `
    ## Below is the user profile data you need to analyze to provide identified skills to focus on and career paths that may interest them.”
    ## Input Text
    ${inputText}
`;

  return { message, systemMessage };
};
