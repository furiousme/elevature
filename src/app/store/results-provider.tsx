'use client';

import { Result } from 'app/types';
import { createContext, useContext, useRef, useState } from 'react';
import { create, useStore } from 'zustand';

type ResultsStore = {
  results: Result[];
  addResult: (data: Result) => void;
};

const createStore = (results: Result[]) =>
  create<ResultsStore>((set) => ({
    results,
    addResult: (data: Result) => set((state) => ({ results: [...state.results, data] })),
  }));

const ResultsContext = createContext<ReturnType<typeof createStore>>(null!);

export const useResults = <T,>(selector: (store: ResultsStore) => T): T => {
  const resultsStoreContext = useContext(ResultsContext);

  if (!resultsStoreContext) {
    throw new Error(`useResults must be used within ResultsProvider`);
  }

  return useStore(resultsStoreContext, selector);
};
const ReviewsProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<ReturnType<typeof createStore>>();

  if (!storeRef.current) {
    storeRef.current = createStore([]);
  }

  return <ResultsContext.Provider value={storeRef.current}>{children}</ResultsContext.Provider>;
};

export default ReviewsProvider;
