import create from 'Zustand'

export const useProgressStore = create(set => ({
    isAnimating: false,
    setIsAnimating: isAnimating => set(() => ({ isAnimating })),
  }))