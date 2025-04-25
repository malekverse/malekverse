"use client"

import React, { type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface FadeInProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  margin?: string
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  margin = "-100px",
}: FadeInProps) {
  // Set the initial animation values based on direction
  const getInitialValues = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50 }
      case "down":
        return { opacity: 0, y: -50 }
      case "left":
        return { opacity: 0, x: 50 }
      case "right":
        return { opacity: 0, x: -50 }
      default:
        return { opacity: 0, y: 50 }
    }
  }

  // Set the animated values
  const getAnimatedValues = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 }
      case "left":
      case "right":
        return { opacity: 1, x: 0 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialValues()}
      whileInView={getAnimatedValues()}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  delay?: number
  staggerChildren?: number
  className?: string
  once?: boolean
  margin?: string
}

export function StaggerContainer({
  children,
  delay = 0,
  staggerChildren = 0.1,
  className = "",
  once = true,
  margin = "-100px",
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      transition={{ staggerChildren, delayChildren: delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

interface TextRevealProps {
  text: string
  className?: string
  once?: boolean
  margin?: string
}

export function TextReveal({ text, className = "", once = true, margin = "-100px" }: TextRevealProps) {
  const words = text.split(" ")

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin }}
        transition={{ staggerChildren: 0.05 }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-1"
            variants={{
              hidden: { y: 40, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

interface ScrollProgressProps {
  color?: string
  height?: number
}

export function ScrollProgress({ color = "#2DD4BF", height = 4 }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 origin-left"
      style={{
        scaleX: scrollYProgress,
        backgroundColor: color,
        height,
      }}
    />
  )
}

interface Rotate3DProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function Rotate3D({ children, className = "", intensity = 10 }: Rotate3DProps) {
  const [rotateX, setRotateX] = React.useState(0)
  const [rotateY, setRotateY] = React.useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * intensity
    const rotateYValue = ((centerX - mouseX) / (rect.width / 2)) * intensity

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}
