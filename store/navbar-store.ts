import { create } from 'zustand'

type NavbarState = {
  isHomePage: boolean
  setIsHomePage: (isHome: boolean) => void
}

export const useNavbarStore = create<NavbarState>((set) => ({
  isHomePage: true, // Default to true since most users will land on home page first
  setIsHomePage: (isHome) => set({ isHomePage: isHome }),
}))