"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface CosmicNavbarProps {
  activeSection: string
}

export function CosmicNavbar({ activeSection }: CosmicNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMobile()

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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  const orbitPathVariants = {
    initial: {
      strokeDashoffset: 1000,
      opacity: 0,
    },
    animate: {
      strokeDashoffset: 0,
      opacity: 0.2,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/40 backdrop-blur-md py-3 dark:bg-black/40 light:bg-white/80"
          : "bg-transparent py-5 dark:bg-transparent light:bg-white/50"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 z-10">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-purple-600 flex items-center justify-center overflow-hidden relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-teal-400 via-purple-600 to-teal-400"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <span className="text-white font-bold text-lg relative z-10">M</span>
            </div>
            <motion.div
              className="absolute -inset-1 rounded-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{
                background: "radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, rgba(45, 212, 191, 0) 70%)",
              }}
            />
          </motion.div>
          <motion.span
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-purple-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Malekverse
          </motion.span>
        </Link>

        {isMobile ? (
          <>
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-800 dark:text-white focus:outline-none z-10"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 right-0 bg-white/90 dark:bg-black/80 backdrop-blur-xl shadow-lg border-t border-teal-500/20"
                >
                  <nav className="flex flex-col p-4">
                    {navItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link
                          href={`#${item.id}`}
                          className={`flex items-center py-3 px-4 text-lg ${
                            activeSection === item.id
                              ? "text-teal-500 dark:text-teal-400"
                              : "text-gray-800 dark:text-white hover:text-teal-500 dark:hover:text-teal-400"
                          } transition-colors duration-300`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{item.label}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="relative">
            {/* Orbit path */}
            <svg
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[300%]"
              viewBox="0 0 200 100"
              style={{ overflow: "visible" }}
            >
              <motion.ellipse
                cx="100"
                cy="50"
                rx="95"
                ry="30"
                fill="none"
                stroke="rgba(45, 212, 191, 0.2)"
                strokeWidth="0.5"
                strokeDasharray="5,5"
                variants={orbitPathVariants}
                initial="initial"
                animate="animate"
              />
            </svg>

            <motion.nav
              className="flex space-x-8 relative z-10"
              variants={navbarVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item, index) => {
                // Calculate position on the elliptical orbit
                const angle = (Math.PI * index) / (navItems.length - 1)
                const orbitX = Math.cos(angle) * 20
                const orbitY = Math.sin(angle) * 5

                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    style={{
                      x: orbitX,
                      y: orbitY,
                    }}
                    whileHover={{
                      y: orbitY - 5,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                  >
                    <Link
                      href={`#${item.id}`}
                      className={`relative px-1 py-2 text-sm font-medium tracking-wider uppercase ${
                        activeSection === item.id
                          ? "text-teal-500 dark:text-teal-400"
                          : "text-gray-800 dark:text-white hover:text-teal-500 dark:hover:text-teal-400"
                      } transition-colors duration-300`}
                    >
                      <span>{item.label}</span>
                      {activeSection === item.id && (
                        <motion.span
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-purple-500"
                          layoutId="navbar-underline"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.nav>
          </div>
        )}
      </div>
    </header>
  )
}
