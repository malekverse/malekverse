"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useMobile } from "@/hooks/use-mobile"

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMobile()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawGrid()
    }

    const drawGrid = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid settings
      const gridSize = isMobile ? 30 : 50
      const lineWidth = 0.5
      const lineColor = "rgba(45, 212, 191, 0.1)"

      ctx.strokeStyle = lineColor
      ctx.lineWidth = lineWidth

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Add some random dots at grid intersections
      ctx.fillStyle = "rgba(45, 212, 191, 0.4)"

      for (let x = 0; x <= canvas.width; x += gridSize) {
        for (let y = 0; y <= canvas.height; y += gridSize) {
          if (Math.random() > 0.85) {
            const dotSize = Math.random() * 2 + 1
            ctx.beginPath()
            ctx.arc(x, y, dotSize, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }

    // Handle mouse movement for subtle grid animation
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return

      const mouseX = e.clientX
      const mouseY = e.clientY

      // Redraw grid with subtle distortion around mouse
      drawGrid()

      // Add a subtle glow around the cursor
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 150)

      gradient.addColorStop(0, "rgba(45, 212, 191, 0.2)")
      gradient.addColorStop(1, "rgba(45, 212, 191, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, 150, 0, Math.PI * 2)
      ctx.fill()
    }

    window.addEventListener("resize", resizeCanvas)
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    resizeCanvas()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [isMobile, resolvedTheme])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-70"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ duration: 1 }}
    />
  )
}
