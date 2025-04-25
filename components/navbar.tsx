"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface NavbarProps {
  activeSection: string
}

export function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMobile()
  const { resolvedTheme } = useTheme()

  const navItems = [
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "projects", label: "Projects" },
    { id: "stack", label: "Stack" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            className="text-xl font-bold text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src="/placeholder.svg?height=40&width=40" alt="Logo" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </Link>

        {isMobile ? (
          <>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md shadow-lg"
              >
                <nav className="flex flex-col p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`#${item.id}`}
                      className={`py-3 px-4 text-lg ${
                        activeSection === item.id ? "text-teal-400" : "text-white hover:text-teal-400"
                      } transition-colors duration-200`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            )}
          </>
        ) : (
          <motion.nav className="flex space-x-8" variants={navbarVariants} initial="hidden" animate="visible">
            {navItems.map((item, index) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Link
                  href={`#${item.id}`}
                  className={`relative px-1 py-2 text-sm font-medium tracking-wider uppercase ${
                    activeSection === item.id ? "text-teal-400" : "text-white hover:text-teal-400"
                  } transition-colors duration-200`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-400"
                      layoutId="navbar-underline"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </div>
    </header>
  )
}
