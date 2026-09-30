import { createContext, useContext } from 'react'

/** True once the preloader has lifted — gates the hero's entrance. */
export const IntroContext = createContext(true)

export function useIntro(): boolean {
  return useContext(IntroContext)
}
