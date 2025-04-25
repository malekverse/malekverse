"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

interface CosmicCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  intensity?: number
}

export function CosmicCard({
  children,
  className = "",
  glowColor = "rgba(45, 212, 191, 0.5)",
  intensity = 0.15,
}: CosmicCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30 z-0"
        animate={{
          background: isHovering
            ? [
                `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${glowColor} 0%, transparent 50%)`,
                `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${glowColor} 0%, transparent 40%)`,
              ]
            : `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 50%)`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Star particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 1 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
