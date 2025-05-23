"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

type NavbarContextType = {
  isHomePage: boolean
  setIsHomePage: (isHome: boolean) => void
}

const NavbarContext = createContext<NavbarContextType>({ 
  isHomePage: true,
  setIsHomePage: () => {}
})

export const useNavbarContext = () => useContext(NavbarContext)

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [isHomePage, setIsHomePage] = useState(true)
  const pathname = usePathname()
  
  useEffect(() => {
    // Check if we're on the home page (root path)
    setIsHomePage(pathname === '/')
  }, [pathname])

  return (
    <NavbarContext.Provider value={{ isHomePage, setIsHomePage }}>
      {children}
    </NavbarContext.Provider>
  )
}