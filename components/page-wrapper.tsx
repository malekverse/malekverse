"use client"

import { useEffect } from "react"
import { useNavbarContext } from "@/contexts/navbar-context"
import { ConditionalNavbar } from "@/components/conditional-navbar"

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  const { setIsHomePage } = useNavbarContext()
  
  // Set isHomePage to false for all pages using this wrapper
  useEffect(() => {
    setIsHomePage(false)
    
    // Reset when component unmounts
    return () => {
      setIsHomePage(true)
    }
  }, [setIsHomePage])

  return (
    <>
      <ConditionalNavbar />
      {children}
    </>
  )
}