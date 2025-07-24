"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
      {/* Floating elements for cosmic effect */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: Math.random() * 2 + 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>
        <motion.h2
          className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Lost in the Cosmic Void
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          The page you're looking for seems to have drifted into a black hole.
          Let's navigate back to familiar space.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-md bg-gradient-to-r from-teal-500 to-purple-600 text-white hover:from-teal-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <ArrowLeft className="mr-2" size={20} />
            Return to Homepage
          </Link>
        </motion.div>

        <motion.div
          className="mt-8 space-y-2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p>Here are some helpful links:</p>
          <div className="space-x-4">
            <Link href="/about" className="hover:text-teal-400 transition-colors">
              About
            </Link>
            <Link href="/projects" className="hover:text-teal-400 transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-teal-400 transition-colors">
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}