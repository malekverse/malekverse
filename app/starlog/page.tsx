"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Home } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { StarlogEnhanced } from "@/components/sections/starlog-enhanced"
import { CosmicBackground } from "@/components/cosmic-background"
import { useMobile } from "@/hooks/use-mobile"
import { PageWrapper } from "@/components/page-wrapper"

export default function StarlogPage() {
  const router = useRouter()
  const isMobile = useMobile()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleGoBack = () => {
    router.push("/")
  }

  const handleGoHome = () => {
    router.push("/")
  }

  return (
    <PageWrapper>
    <main className="relative min-h-screen text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                🌌
              </motion.div>

              <motion.h1
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Welcome to the Starlog
              </motion.h1>

              <motion.p
                className="text-xl text-gray-300 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Initializing cosmic experience...
              </motion.p>

              {/* Loading Stars */}
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-teal-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            {/* Main Content */}
            <div className="pt-16">
              <StarlogEnhanced />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
    </PageWrapper>
  )
}
