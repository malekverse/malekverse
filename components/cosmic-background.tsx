"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMobile()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Star properties
    interface Star {
      x: number
      y: number
      radius: number
      color: string
      velocity: number
      alpha: number
      direction: number
    }

    // Create stars
    let stars: Star[] = []
    const createStars = () => {
      stars = []
      const numStars = isMobile ? 100 : 200

      for (let i = 0; i < numStars; i++) {
        const radius = Math.random() * 1.5
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: radius,
          color: i % 20 === 0 ? getRandomStarColor() : isDark ? "#ffffff" : "#333333",
          velocity: 0.05 + Math.random() * 0.1,
          alpha: 0.5 + Math.random() * 0.5,
          direction: Math.random() > 0.5 ? 1 : -1,
        })
      }
    }

    // Get random star color
    const getRandomStarColor = () => {
      if (isDark) {
        const colors = ["#ffffff", "#fffae5", "#e5f0ff", "#fff5e5", "#ebf7ff", "#e4ffef"]
        return colors[Math.floor(Math.random() * colors.length)]
      } else {
        const colors = ["#333333", "#555555", "#0f172a", "#1e293b", "#334155", "#475569"]
        return colors[Math.floor(Math.random() * colors.length)]
      }
    }

    // Nebula properties
    interface Nebula {
      x: number
      y: number
      radius: number
      color: string
    }

    // Create nebulae
    let nebulae: Nebula[] = []
    const createNebulae = () => {
      nebulae = []
      const numNebulae = isMobile ? 3 : 5

      const darkColors = [
        "rgba(41, 121, 255, 0.1)",
        "rgba(255, 41, 117, 0.1)",
        "rgba(45, 212, 191, 0.1)",
        "rgba(131, 56, 236, 0.1)",
        "rgba(255, 190, 11, 0.1)",
      ]

      const lightColors = [
        "rgba(41, 121, 255, 0.05)",
        "rgba(255, 41, 117, 0.05)",
        "rgba(45, 212, 191, 0.05)",
        "rgba(131, 56, 236, 0.05)",
        "rgba(255, 190, 11, 0.05)",
      ]

      const colors = isDark ? darkColors : lightColors

      for (let i = 0; i < numNebulae; i++) {
        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: canvas.width / 4 + (Math.random() * canvas.width) / 4,
          color: colors[i % colors.length],
        })
      }
    }

    // Draw stars
    const drawStars = () => {
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.globalAlpha = isDark ? star.alpha : star.alpha * 0.5
        ctx.fill()

        // Twinkle effect
        star.alpha += 0.01 * star.direction
        if (star.alpha >= 1) {
          star.direction = -1
        } else if (star.alpha <= 0.5) {
          star.direction = 1
        }

        // Subtle movement
        star.y += star.velocity
        if (star.y > canvas.height) {
          star.y = 0
        }
      })
    }

    // Draw nebulae
    const drawNebulae = () => {
      nebulae.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius)

        gradient.addColorStop(0, nebula.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.globalAlpha = isDark ? 0.7 : 0.3
        ctx.fill()
      })
    }

    // Shooting star
    interface ShootingStar {
      x: number
      y: number
      length: number
      speed: number
      angle: number
      active: boolean
      timer: number
    }

    let shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      length: 80,
      speed: 10,
      angle: 0,
      active: false,
      timer: 0,
    }

    const triggerShootingStar = () => {
      if (!shootingStar.active && isDark) {
        shootingStar = {
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 2),
          length: 80 + Math.random() * 50,
          speed: 10 + Math.random() * 10,
          angle: Math.PI / 4 + (Math.random() * Math.PI) / 4,
          active: true,
          timer: 0,
        }
      }
    }

    const drawShootingStar = () => {
      if (shootingStar.active) {
        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length
        const tailY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length

        const gradient = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY)

        gradient.addColorStop(0, isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(45, 212, 191, 0.6)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.beginPath()
        ctx.moveTo(shootingStar.x, shootingStar.y)
        ctx.lineTo(tailX, tailY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.globalAlpha = 1
        ctx.stroke()

        // Update position
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed
        shootingStar.y -= Math.sin(shootingStar.angle) * shootingStar.speed

        // Check if out of bounds
        if (
          shootingStar.x > canvas.width + shootingStar.length ||
          shootingStar.x < -shootingStar.length ||
          shootingStar.y > canvas.height + shootingStar.length ||
          shootingStar.y < -shootingStar.length
        ) {
          shootingStar.active = false
        }

        // Increment timer
        shootingStar.timer++
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)

      if (isDark) {
        bgGradient.addColorStop(0, "#0a0a1a")
        bgGradient.addColorStop(1, "#1a0a2e")
      } else {
        bgGradient.addColorStop(0, "#f8fafc")
        bgGradient.addColorStop(1, "#f1f5f9")
      }

      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw cosmic elements
      ctx.globalAlpha = 1
      drawNebulae()
      drawStars()
      if (isDark) {
        drawShootingStar()
      }

      // Random shooting star
      if (Math.random() < 0.001 && isDark) {
        triggerShootingStar()
      }

      requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    createStars()
    createNebulae()
    animate()

    // Handle window resize
    window.addEventListener("resize", () => {
      resizeCanvas()
      createStars()
      createNebulae()
    })

    // Handle theme changes
    const handleThemeChange = () => {
      createStars()
      createNebulae()
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [isMobile, isDark])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
}
