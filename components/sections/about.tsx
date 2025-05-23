"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { Award, Calendar, GraduationCap, MapPin, User, ArrowRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn, StaggerContainer, staggerItem, Parallax } from "@/components/animations/scroll-animations"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function About() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const timelineItems = [
    {
      year: "2023 - Present",
      title: "Bachelor Degree in Computer Science",
      description: "ISIMS, Sfax, Tunisia",
      icon: <GraduationCap size={20} />,
    },
    {
      year: "2024 - 2025",
      title: "Fullstack Web Developer Intern & Freelance",
      description: "Artify, Ariana, Tunisia",
      icon: <Calendar size={20} />,
    },
    {
      year: "2024 - Present",
      title: "AWS Cloud Club Captain",
      description: "ISIMS, Sfax, Tunisia",
      icon: <Award size={20} />,
    },
    {
      year: "2019 - 2023",
      title: "Computer Science High School Diploma",
      description: "Borjlouzir High School, Ariana, Tunisia",
      icon: <GraduationCap size={20} />,
    },
  ]

  return (
    <section id="about" ref={containerRef} className="py-20 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto">
        <FadeIn>
          <h2 className="section-heading bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 mt-8">
          <StaggerContainer>
            <motion.div variants={staggerItem} className="flex items-start space-x-4 mb-6">
              <div className="bg-teal-500/10 p-3 rounded-lg">
                <User className="text-teal-500" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Who am I?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Creative and results-driven Web Developer & UI/UX Designer with a strong technical foundation and a
                  passion for crafting seamless digital experiences. Known for combining design precision with
                  development expertise, delivering polished products from concept to launch.
                </p>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="flex items-start space-x-4 mb-6">
              <div className="bg-teal-500/10 p-3 rounded-lg">
                <MapPin className="text-teal-500" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Location</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Based in Ariana, Borjlouzir, Tunisia. Available for remote work and collaborations worldwide.
                </p>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="flex items-start space-x-4">
              <div className="bg-teal-500/10 p-3 rounded-lg">
                <Award className="text-teal-500" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Experience & Achievements</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  As an AWS Cloud Captain and active community member, I thrive in collaborative environments and lead
                  impactful initiatives. With 23 hackathons under my belt and a versatile freelance background, I bring
                  adaptability, innovation, and a commitment to excellence to every project.
                </p>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="mt-8 flex space-x-3">
              <Button
                className="bg-teal-500 hover:bg-teal-600 text-white transform transition-transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </Button>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-teal-500/30 hover:border-teal-500 hover:bg-teal-500/10 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="h-4 w-4 text-teal-500" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
                        <div className="w-full h-full">
                          <iframe 
                            src="/resume.pdf" 
                            className="w-full h-[80vh]" 
                            title="CV Preview"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Fast Preview</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </StaggerContainer>

          <Parallax speed={-0.2} className="relative">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">My Journey</h3>

            <div className="relative border-l-2 border-teal-500/30 pl-8 ml-4 space-y-10">
              {timelineItems.map((item, index) => (
                <FadeIn key={index} delay={0.1 * index} direction="left">
                  <div className="relative">
                    <div className="absolute -left-12 top-0 bg-teal-500 text-white p-2 rounded-full">{item.icon}</div>
                    <motion.div
                      className="bg-white/5 dark:bg-navy-500/50 p-5 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{
                        scale: 1.03,
                        boxShadow:
                          "0 10px 25px -5px rgba(45, 212, 191, 0.1), 0 10px 10px -5px rgba(45, 212, 191, 0.04)",
                      }}
                    >
                      <span className="text-sm text-teal-500 font-medium">{item.year}</span>
                      <h4 className="text-lg font-bold mt-1 text-gray-900 dark:text-gray-100">{item.title}</h4>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">{item.description}</p>
                    </motion.div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Parallax>
        </div>
        {/* <div className="flex justify-center mt-12">
          <Link
            href="/about"
            className="group inline-flex items-center gap-1 text-teal-500 hover:text-teal-600 transition-colors"
          >
            <span>Learn more about me</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div> */}
      </div>
    </section>
  )
}
