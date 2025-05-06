"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Facebook, Instagram, Linkedin, Twitter, Github } from "lucide-react"
import { TextReveal } from "@/components/animations/scroll-animations"
import { OrbitAnimation } from "@/components/orbit-animation"

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "https://www.facebook.com/malekmaghraoui.official", label: "Facebook" },
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/malek_maghraoui", label: "Instagram" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/malek-maghraoui", label: "LinkedIn" },
    // { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Github size={20} />, href: "https://github.com/maghraoui3", label: "GitHub" },
  ]

  // Floating elements for better UI/UX
  const floatingElements = [
    { top: "15%", left: "10%", size: 8, delay: 0, duration: 4 },
    { top: "25%", right: "15%", size: 12, delay: 1, duration: 5 },
    { top: "60%", left: "5%", size: 10, delay: 0.5, duration: 4.5 },
    { top: "75%", right: "10%", size: 6, delay: 1.5, duration: 3.5 },
    { top: "40%", left: "20%", size: 14, delay: 2, duration: 6 },
  ]

  // Add this at the beginning of the component, after the existing useEffect hooks
  useEffect(() => {
    const handleResize = () => {
      const scrollIndicator = document.querySelector(".scroll-indicator")
      if (scrollIndicator) {
        if (window.innerHeight < 700) {
          scrollIndicator.classList.add("hidden")
        } else {
          scrollIndicator.classList.remove("hidden")
        }
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center pt-20 pb-10 relative overflow-hidden"
      style={{ opacity, y, scale }}
    >
      {/* Floating elements */}
      {floatingElements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20 z-0"
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            width: el.size * 4,
            height: el.size * 4,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: el.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: el.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
        <div className="order-2 md:order-1">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <TextReveal text="Welcome to the" className="text-gray-900 dark:text-gray-100" />
              <span className="block mt-2">
                <TextReveal
                  text="Malekverse"
                  className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500 font-extrabold"
                />
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl mb-6">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-gray-800 dark:text-gray-200"
              >
                Exploring the cosmos of <span className="font-semibold text-teal-500">web development</span>
              </motion.span>
            </h2>
            <motion.p
              className="text-gray-700 dark:text-gray-300 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              A cosmic journey through code, design, and creative innovation. Navigate through my universe of projects
              and discover the galaxies of possibilities we can create together.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="#projects"
                className="inline-flex items-center px-6 py-3 rounded-md bg-gradient-to-r from-teal-500 to-purple-600 text-white hover:from-teal-600 hover:to-purple-700 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg shadow-teal-500/20"
              >
                Explore my universe
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center px-6 py-3 rounded-md border border-teal-500 text-teal-500 hover:bg-teal-500/10 transition-colors transform hover:translate-y-[-2px]"
              >
                Make contact
              </Link>
            </motion.div>

            <div className="flex items-center space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target={'_blank'}
                  className="text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                  aria-label={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index + 0.5 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <motion.div
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-teal-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/malek-face.png?height=256&width=256"
                alt="Malek Maghraoui"
                fill
                className="object-cover"
                priority
              />

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(45, 212, 191, 0.3)",
                    "0 0 40px rgba(45, 212, 191, 0.5)",
                    "0 0 20px rgba(45, 212, 191, 0.3)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </motion.div>

            {/* Orbiting elements */}
            <OrbitAnimation size={300} speed={30} color="rgba(45, 212, 191, 0.2)">
              <div className="w-6 h-6 rounded-full bg-purple-500/80 shadow-lg shadow-purple-500/50" />
            </OrbitAnimation>

            <OrbitAnimation size={380} speed={45} color="rgba(168, 85, 247, 0.2)">
              <div className="w-4 h-4 rounded-full bg-teal-400/80 shadow-lg shadow-teal-400/50" />
            </OrbitAnimation>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-0 right-0 flex justify-center z-10 md:z-auto scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600 dark:text-gray-300 mb-2 hidden sm:block">Navigate the cosmos</span>
          <div className="w-6 h-10 border-2 border-teal-500/50 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}
