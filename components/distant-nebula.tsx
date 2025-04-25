"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface DistantNebulaProps {
  position?: { x: string; y: string }
  color?: string
  size?: string
  opacity?: number
  blur?: string
}

export function DistantNebula({
  position = { x: "50%", y: "30%" },
  color = "rgba(45, 212, 191, 0.15)",
  size = "40vw",
  opacity = 0.5,
  blur = "120px",
}: DistantNebulaProps) {
  const nebulaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!nebulaRef.current) return

    // Subtle animation to make the nebula feel alive
    const animate = () => {
      if (!nebulaRef.current) return

      const time = Date.now() / 30000
      const scale = 1 + 0.05 * Math.sin(time)
      const rotate = 5 * Math.sin(time / 2)

      nebulaRef.current.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`
    }

    const animationFrame = setInterval(animate, 50)
    return () => clearInterval(animationFrame)
  }, [])

  return (
    <motion.div
      ref={nebulaRef}
      className="absolute pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: "50%",
        filter: `blur(${blur})`,
        opacity,
        transform: "translate(-50%, -50%)",
        mixBlendMode: "screen",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 3 }}
    />
  )
}
