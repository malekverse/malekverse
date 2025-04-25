"use client"

import type React from "react"

import { useRef } from "react"
import { motion } from "framer-motion"

interface OrbitAnimationProps {
  children: React.ReactNode
  size?: number
  speed?: number
  color?: string
  className?: string
}

export function OrbitAnimation({
  children,
  size = 150,
  speed = 20,
  color = "rgba(45, 212, 191, 0.2)",
  className = "",
}: OrbitAnimationProps) {
  const orbitRef = useRef<HTMLDivElement>(null)

  return (
    <div className={`relative ${className}`} ref={orbitRef}>
      {/* Orbit path */}
      <motion.div
        className="absolute rounded-full border border-dashed pointer-events-none"
        style={{
          width: size,
          height: size,
          top: `calc(50% - ${size / 2}px)`,
          left: `calc(50% - ${size / 2}px)`,
          borderColor: color,
        }}
        initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 360,
        }}
        transition={{
          opacity: { duration: 1 },
          scale: { duration: 1 },
          rotate: {
            duration: speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
        }}
      />

      {/* Orbiting element */}
      <motion.div
        className="absolute z-10"
        style={{
          top: 0,
          left: `calc(50% - ${size / 2}px)`,
          transformOrigin: `${size / 2}px ${size / 2}px`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: speed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
