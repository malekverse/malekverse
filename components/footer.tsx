"use client"

import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Twitter, Github } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
      { icon: <Facebook size={20} />, href: "https://www.facebook.com/malekmaghraoui.official", label: "Facebook" },
      { icon: <Instagram size={20} />, href: "https://www.instagram.com/malek_maghraoui", label: "Instagram" },
      { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/malek-maghraoui", label: "LinkedIn" },
      // { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
      { icon: <Github size={20} />, href: "https://github.com/maghraoui3", label: "GitHub" },
    ]

  return (
    <footer className="py-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            className="text-sm text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            &copy; {currentYear} Malek Maghraoui. All rights reserved.
          </motion.p>

          <div className="flex items-center mt-4 md:mt-0">
            <ThemeToggle />

            <motion.div
              className="flex space-x-4 ml-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target={'_blank'}
                  className="text-gray-600 hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400 transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}
