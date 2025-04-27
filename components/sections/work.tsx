"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Briefcase, ExternalLink, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/scroll-animations"
import Link from "next/link"

export function Work() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const workExperience = [
    {
      title: "Fullstack Web Developer Intern & Freelance Developer",
      company: "Artify",
      period: "12/09/2024 – 15/03/2025",
      location: "Ariana, Tunisia",
      description: [
        "Rebuilt Artify's platform using Next.js and TypeScript, enhancing code maintainability and improving platform performance by 25%.",
        "Redesigned the platform's UI/UX using Tailwind CSS and ShadCN, creating a modern, visually appealing interface with smooth animations that improved user engagement by 30%.",
        "Integrated multiple third-party libraries (Axios, Zustand..) to extend functionality and streamline the user experience, achieving a 20% faster page load time.",
        "Integrated DevOps practices by setting up CI/CD pipelines with GitHub Actions, automating testing and deployment processes for faster and more reliable updates.",
      ],
      skills: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN", "Zustand", "GitHub Actions", "CI/CD"],
      link: "#",
    },
    {
      title: "Freelancer",
      company: "Lead Insight: AI-Powered Instagram Lead Management Platform",
      period: "2024",
      location: "Remote",
      description: [
        "Developed a powerful full-stack web application designed to help marketers and businesses upload, analyze, score, and manage Instagram leads efficiently using AI and advanced filtering.",
        "Implemented AI-powered scoring using OpenAI API and Groq SDK to analyze leads based on profile data, engagement metrics, and business relevance.",
        "Created an interactive dashboard displaying metrics like batch status, qualified leads, scoring progress, and lead tables with sorting and filtering.",
        "Implemented secure authentication with protected routes, JWT sessions, and bcrypt password hashing.",
      ],
      skills: ["Next.js", "React", "TypeScript", "MongoDB", "OpenAI API", "Groq SDK", "Tailwind CSS", "Framer Motion"],
      link: "#",
    },
    {
      title: "Instructor in Web Development",
      company: "Various Institutions (MTC ISGI, IEEE ISI, AWS Cloud Club)",
      period: "2023 - 2024",
      location: "Tunisia",
      description: [
        "Taught front-end development (HTML, CSS, JS) and guided students through the process of building a functional Todo List app at MTC ISGI.",
        "Conducted two sessions on front-end development (HTML, CSS), teaching students how to create modern, responsive landing pages at IEEE ISI.",
        "Delivered a comprehensive full-stack course on the MERN stack at AWS Cloud Club ISIMS X IEEE SB ISIMS, culminating in a hands-on workshop where students applied their skills to build a complete web application.",
      ],
      skills: ["Teaching", "HTML", "CSS", "JavaScript", "MERN Stack", "Workshop Facilitation"],
      link: "#",
    },
  ]

  return (
    <section id="work" ref={containerRef} className="py-20 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto">
        <FadeIn>
          <h2 className="section-heading">Work Experience</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-12">
            My professional journey as a developer, designer, and educator, showcasing my experience in building digital
            products and sharing knowledge.
          </p>
        </FadeIn>

        <div className="space-y-12">
          {workExperience.map((job, index) => (
            <FadeIn key={index} delay={0.1 * index} direction={index % 2 === 0 ? "left" : "right"}>
              <motion.div
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 bg-white dark:bg-navy-500/50">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Briefcase className="h-4 w-4 text-teal-500" />
                          <CardDescription>
                            {job.period} | {job.location}
                          </CardDescription>
                        </div>
                        <CardTitle className="text-xl md:text-2xl">{job.title}</CardTitle>
                        <CardDescription className="text-base font-medium mt-1">{job.company}</CardDescription>
                      </div>
                      {job.link && (
                        <a
                          href={job.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-500 hover:text-teal-600 transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {job.description.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-teal-500 mr-2">•</span>
                          <span className="text-gray-600 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 pt-0">
                    {job.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="bg-teal-500/10 text-teal-500 border-teal-500/20">
                        {skill}
                      </Badge>
                    ))}
                  </CardFooter>
                </Card>
              </motion.div>
            </FadeIn>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link
            href="/work"
            className="group inline-flex items-center gap-1 text-teal-500 hover:text-teal-600 transition-colors"
          >
            <span>Learn more about my work</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
