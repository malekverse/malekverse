"use client"

import { useNavbarContext } from "@/contexts/navbar-context"
import { Navbar } from "@/components/navbar"
import { CosmicNavbar } from "@/components/cosmic-navbar"
import { useState, useEffect } from "react"

export function ConditionalNavbar() {
  const { isHomePage } = useNavbarContext()
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + window.innerHeight / 3

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return isHomePage ? (
    <CosmicNavbar activeSection={activeSection} />
  ) : (
    <Navbar activeSection={activeSection} />
  )
}