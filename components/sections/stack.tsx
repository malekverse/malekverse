"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Stack() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const categories = [
    {
      id: "ai",
      title: "AI",
      tools: [
        {
          name: "Chat-GPT",
          description: "For general assistance, content ideation, and problem-solving.",
          logo: "/src/stack/openai.svg?height=40&width=40",
          link: "#",
        },
        {
          name: "Trae",
          description: "AI-powered code editor that helps with coding and refactoring.",
          logo: "/src/stack/trae.jpg?height=40&width=40",
          link: "#",
        },
        {
          name: "Midjourney",
          description: "AI art generation for creative projects and illustrations.",
          logo: "/src/stack/midjourney.png?height=40&width=40",
          link: "#",
        },
      ],
    },
    {
      id: "development",
      title: "Development",
      tools: [
        {
          name: "TypeScript",
          description: "Primary programming language for type-safe JavaScript development.",
          logo: "/src/stack/typescript.svg?height=40&width=40",
          link: "https://www.typescriptlang.org/",
        },
        {
          name: "Next.js",
          description: "React framework for production-grade web applications.",
          logo: "/src/stack/next-js.svg?height=40&width=40",
          link: "https://nextjs.org/",
        },
        {
          name: "React",
          description: "JavaScript library for building user interfaces.",
          logo: "/src/stack/react.svg?height=40&width=40",
          link: "https://reactjs.org/",
        },
        {
          name: "Node.js",
          description: "JavaScript runtime for server-side development.",
          logo: "/src/stack/node-js.svg?height=40&width=40",
          link: "https://nodejs.org/",
        },
        {
          name: "Tailwind CSS",
          description: "Utility-first CSS framework for rapid UI development.",
          logo: "/src/stack/tailwind-css.svg?height=40&width=40",
          link: "https://tailwindcss.com/",
        },
        {
          name: "MongoDB",
          description: "Next-generation ORM for Node.js and TypeScript.",
          logo: "/src/stack/mongodb.svg?height=40&width=40",
          link: "https://www.prisma.io/",
        },
      ],
    },
    {
      id: "design",
      title: "Design",
      tools: [
        {
          name: "Figma",
          description: "Collaborative interface design tool for UI/UX design.",
          logo: "/src/stack/figma.svg?height=40&width=40",
          link: "https://www.figma.com/",
        },
        {
          name: "Framer",
          description: "Interactive design and prototyping tool.",
          logo: "/src/stack/framer.svg?height=40&width=40",
          link: "https://www.framer.com/",
        },
      ],
    },
    {
      id: "productivity",
      title: "Productivity",
      tools: [
        {
          name: "VS Code",
          description: "Powerful code editor with extensive plugin ecosystem.",
          logo: "/src/stack/vscode.svg?height=40&width=40",
          link: "https://code.visualstudio.com/",
        },
        {
          name: "Notion",
          description: "All-in-one workspace for notes, tasks, and project management.",
          logo: "/src/stack/notion.svg?height=40&width=40",
          link: "https://www.notion.so/",
        },
      ],
    },
  ]

  return (
    <section id="stack" ref={containerRef} className="py-20 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="section-heading bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
            Stack
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-6 text-white">
            Tools, technology and apps I use every day.
          </h3>
        </motion.div>

        <div className="space-y-16">
          {categories.map((category, categoryIndex) => (
            <div key={category.id} className="space-y-6">
              <motion.h3
                className="text-xl font-bold text-teal-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {category.title}
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool, toolIndex) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * toolIndex + 0.2 * categoryIndex }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 dark:bg-navy-500/50 h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative w-10 h-10 flex-shrink-0 bg-white rounded-md flex items-center justify-center">
                            <Image
                              src={tool.logo || "/placeholder.svg"}
                              alt={tool.name}
                              width={40}
                              height={40}
                              className="object-contain p-2 rounded-lg"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-1">
                              <h4 className="font-medium text-gray-900 dark:text-white">{tool.name}</h4>
                              {tool.link && (
                                <a
                                  href={tool.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-teal-500 hover:text-teal-600 transition-colors"
                                >
                                  <ExternalLink size={14} />
                                </a>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{tool.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link
            href="/stack"
            className="group inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <span>Learn more about my stack</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
