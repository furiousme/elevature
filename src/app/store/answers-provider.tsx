'use client';

import { Answers } from 'app/types';
import { createContext, useContext, useRef } from 'react';
import { create, useStore } from 'zustand';

type AnswersStore = {
  answers: Partial<Answers>;
  updateAnswers: (key: string, data: unknown) => void;
  clearAnswers: () => void;
};

const createStore = (answers: Partial<Answers>) =>
  create<AnswersStore>((set) => ({
    answers,
    updateAnswers: (key: string, data: unknown) =>
      set((state) => ({ answers: { ...state.answers, [key]: data } })),
    clearAnswers: () => set({ answers: {} }),
  }));

const AnswersContext = createContext<ReturnType<typeof createStore>>(null!);

export const useAnswers = <T,>(selector: (store: AnswersStore) => T): T => {
  const answersStoreContext = useContext(AnswersContext);

  if (!answersStoreContext) {
    throw new Error(`useAnswers must be used within AnswersProvider`);
  }

  return useStore(answersStoreContext, selector);
};
const ReviewsProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<ReturnType<typeof createStore>>();

  if (!storeRef.current) {
    storeRef.current = createStore({});
  }

  return <AnswersContext.Provider value={storeRef.current}>{children}</AnswersContext.Provider>;
};

export default ReviewsProvider;
