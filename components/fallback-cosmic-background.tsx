"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function FallbackCosmicBackground() {
  const [stars, setStars] = useState<Array<{ id: number; size: number; top: string; left: string; delay: number }>>([])

  useEffect(() => {
    // Create stars
    const newStars = []
    const starCount = window.innerWidth < 768 ? 100 : 200

    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
      })
    }

    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a1a] to-[#1a0a2e] -z-10 overflow-hidden">
      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 1 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: star.delay,
          }}
        />
      ))}

      {/* Nebulae */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full opacity-20 bg-purple-500/20 blur-3xl" />
      <div className="absolute top-2/3 right-1/4 w-1/3 h-1/3 rounded-full opacity-20 bg-teal-500/20 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-1/4 h-1/4 rounded-full opacity-20 bg-blue-500/20 blur-3xl" />

      {/* Shooting star */}
      <motion.div
        className="absolute h-0.5 bg-gradient-to-r from-white to-transparent"
        style={{ width: "150px", transform: "rotate(-45deg)" }}
        initial={{ top: "-10%", left: "110%", opacity: 0 }}
        animate={{
          top: "60%",
          left: "-10%",
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 15,
        }}
      />
    </div>
  )
}
