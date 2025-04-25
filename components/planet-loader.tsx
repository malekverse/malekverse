"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function PlanetLoader() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")

  // Simulate loading progress
  useEffect(() => {
    const loadingTexts = [
      "Initializing...",
      "Calibrating cosmic coordinates...",
      "Charging warp drive...",
      "Aligning stellar navigation...",
      "Entering Malekverse...",
    ]

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return newProgress
      })

      // Update loading text based on progress
      setLoadingText(loadingTexts[Math.min(Math.floor(loadingProgress / 25), loadingTexts.length - 1)])
    }, 400)

    return () => clearInterval(interval)
  }, [loadingProgress])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${isDark ? "bg-black" : "bg-gray-50"}`}
    >
      <div className="relative w-40 h-40 mb-16">
        {/* Main planet */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{ duration: 1.5 }}
        />

        {/* Planet surface details */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="absolute top-[15%] left-[20%] w-[15%] h-[15%] rounded-full bg-white/30"></div>
          <div className="absolute top-[40%] right-[25%] w-[25%] h-[10%] rounded-full bg-indigo-300/20"></div>
          <div className="absolute bottom-[20%] left-[30%] w-[20%] h-[8%] rounded-full bg-purple-300/20"></div>
        </motion.div>

        {/* Planet glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{
            boxShadow: "0 0 40px rgba(79, 70, 229, 0.6)",
          }}
        />

        {/* Orbiting rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, rotateX: 75, rotateZ: 0 }}
          animate={{
            opacity: 0.7,
            rotateX: 75,
            rotateZ: 360,
          }}
          transition={{
            opacity: { duration: 1 },
            rotateZ: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-[90%] h-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-teal-400/30 transform"></div>
          <div className="absolute top-1/2 left-1/2 w-[70%] h-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-purple-500/20 transform"></div>
        </motion.div>

        {/* Orbiting moons */}
        <motion.div
          className="absolute w-5 h-5 rounded-full bg-teal-300 shadow-lg shadow-teal-500/50"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            rotate: 360,
          }}
          transition={{
            opacity: { duration: 0.5 },
            rotate: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
          style={{
            top: "10%",
            left: "50%",
            transformOrigin: "0 40px",
          }}
        />

        <motion.div
          className="absolute w-3 h-3 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            rotate: -360,
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.3 },
            rotate: {
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
          style={{
            bottom: "15%",
            right: "10%",
            transformOrigin: "-20px -20px",
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            initial={{
              opacity: 0,
              x: (Math.random() - 0.5) * 100,
              y: (Math.random() - 0.5) * 100,
              scale: 0.5,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              top: `${50 + (Math.random() - 0.5) * 100}%`,
              left: `${50 + (Math.random() - 0.5) * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Loading progress */}
      <motion.div
        className="w-64 h-2 bg-gray-800/30 dark:bg-gray-700/30 rounded-full overflow-hidden mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-teal-400 to-purple-500"
          initial={{ width: "0%" }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Loading text */}
      <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <motion.p
          key={loadingText}
          className="text-teal-400 text-lg font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {loadingText}
        </motion.p>
      </motion.div>

      {/* Stars background */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white"
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}
