"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable") ||
        window.getComputedStyle(target).cursor === "pointer"

      setIsHovering(isClickable)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mousemove", updateHoverState)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Add cursor-none class to body
    document.body.classList.add("cursor-none")

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mousemove", updateHoverState)
      document.removeEventListener("mouseleave", handleMouseLeave)

      // Remove cursor-none class from body
      document.body.classList.remove("cursor-none")
    }
  }, [isVisible])

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? "hover" : ""}`}
      style={{
        left: position.x,
        top: position.y,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 0.5,
      }}
    />
  )
}
