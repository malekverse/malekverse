"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { CommandMenu } from "@/components/command-menu"
import { ConditionalNavbar } from "@/components/conditional-navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Work } from "@/components/sections/work"
import { Projects } from "@/components/sections/projects"
import { Stack } from "@/components/sections/stack"
// import { Music } from "@/components/sections/music"
import { Contact } from "@/components/sections/contact"
import { CosmicBackground } from "@/components/cosmic-background"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { PlanetLoader } from "@/components/planet-loader"
import { useMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMobile()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    // Simulate loading for smoother initial animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Longer loading time to showcase the animation

    return () => clearTimeout(timer)
  }, [])

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

  // Register keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        document.getElementById("command-menu-trigger")?.click()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <main className={`relative min-h-screen ${isDark ? "text-white" : "text-gray-900"} overflow-hidden`}>
      {!isMobile && <CustomCursor />}
      <CosmicBackground />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <PlanetLoader />
        ) : (
          <>
            <ConditionalNavbar />
            <CommandMenu />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Hero />
              <About />
              <Work />
              <Projects />
              <Stack />
              {/* <Music /> */}
              <Contact />
            </div>

          </>
        )}
      </AnimatePresence>
    </main>
  )
}
