"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  MapPin,
  Award,
  Download,
  ExternalLink,
  Star,
  TrendingUp,
  Users,
  Code,
  Lightbulb,
  Target,
  Quote,
  ChevronRight,
  Building,
  Clock,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn, StaggerContainer, staggerItem } from "@/components/animations/scroll-animations"
import Link from "next/link"

export function WorkExperience() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const [activeExperience, setActiveExperience] = useState(0)

  const workExperience = [
    {
      id: 1,
      title: "Fullstack Web Developer Intern & Freelance Developer",
      company: "Artify",
      type: "Internship & Freelance",
      period: "December 2024 – March 2025",
      duration: "4 months",
      location: "Ariana, Tunisia",
      status: "Completed",
      description:
        "Leading the complete rebuild of Artify's platform using modern web technologies, focusing on performance optimization and user experience enhancement.",
      achievements: [
        "Rebuilt entire platform using Next.js and TypeScript, improving maintainability by 40%",
        "Enhanced platform performance by 25% through code optimization",
        "Redesigned UI/UX with Tailwind CSS and ShadCN, increasing user engagement by 30%",
        "Integrated multiple third-party libraries achieving 20% faster page load times",
        "Implemented CI/CD pipelines with GitHub Actions for automated deployment",
      ],
      skills: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "ShadCN",
        "Zustand",
        "GitHub Actions",
        "CI/CD",
        "Performance Optimization",
      ],
      technologies: ["React", "Node.js", "Git", "Vercel", "API Integration"],
      impact: {
        performance: "+25%",
        engagement: "+30%",
        loadTime: "+20%",
        maintainability: "+40%",
      },
      link: "#",
      color: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "Freelance Full-Stack Developer",
      company: "Lead Insight Platform",
      type: "Freelance Project",
      period: "2025",
      duration: "2 Weeks",
      location: "Remote",
      status: "Completed",
      description:
        "Developed an AI-powered Instagram lead management platform from concept to deployment, helping marketers analyze and score leads efficiently.",
      achievements: [
        "Built full-stack web application with AI-powered lead scoring",
        "Integrated OpenAI API and Groq SDK for intelligent lead analysis",
        "Created interactive dashboard with real-time metrics and filtering",
        "Implemented secure authentication with JWT and bcrypt",
        "Designed responsive UI with advanced animations and interactions",
      ],
      skills: ["Next.js", "React", "TypeScript", "MongoDB", "OpenAI API", "Groq SDK", "JWT", "bcrypt"],
      technologies: ["Tailwind CSS", "Framer Motion", "API Development", "Database Design", "Authentication"],
      impact: {
        automation: "+80%",
        accuracy: "+90%",
        efficiency: "+60%",
        userSatisfaction: "+95%",
      },
      link: "#",
      color: "from-green-500 to-teal-600",
    },
    {
      id: 3,
      title: "Web Development Instructor",
      company: "Multiple Institutions",
      type: "Teaching & Training",
      period: "2024 – 2025",
      duration: "1 year",
      location: "Tunisia",
      status: "Completed",
      description:
        "Taught web development across various institutions, mentoring students and conducting hands-on workshops in modern web technologies.",
      achievements: [
        "Taught front-end development at MTC ISGI with practical Todo List project",
        "Conducted responsive design workshops at IEEE ISI",
        "Delivered comprehensive MERN stack course at AWS Cloud Club ISIMS",
        "Mentored 100+ students in web development fundamentals",
        "Created curriculum for modern web development practices",
      ],
      skills: [
        "Teaching",
        "Curriculum Development",
        "HTML",
        "CSS",
        "JavaScript",
        "MERN Stack",
        "Workshop Facilitation",
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express.js", "Git", "VS Code"],
      impact: {
        studentsReached: "100+",
        satisfaction: "+98%",
        skillImprovement: "+85%",
        jobPlacements: "15+",
      },
      link: "#",
      color: "from-orange-500 to-red-600",
    },
  ]

  const skills = [
    { name: "Next.js", level: 95, category: "Frontend" },
    { name: "React", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 88, category: "Language" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "MongoDB", level: 82, category: "Database" },
    { name: "Tailwind CSS", level: 92, category: "Styling" },
    { name: "Git", level: 90, category: "Tools" },
    { name: "CI/CD", level: 80, category: "DevOps" },
  ]

  const achievements = [
    {
      title: "Performance Optimization Expert",
      description: "Consistently improved application performance by 25-40% across projects",
      icon: Zap,
      metric: "25-40%",
      color: "text-yellow-500",
    },
    {
      title: "Student Mentor",
      description: "Successfully mentored 100+ students in web development",
      icon: Users,
      metric: "100+",
      color: "text-blue-500",
    },
    {
      title: "Full-Stack Proficiency",
      description: "Expertise across frontend, backend, and DevOps technologies",
      icon: Code,
      metric: "8+",
      color: "text-green-500",
    },
    {
      title: "Project Success Rate",
      description: "100% project completion rate with client satisfaction",
      icon: Target,
      metric: "100%",
      color: "text-purple-500",
    },
  ]

  const testimonials = [
    // {
    //   name: "Sarah Johnson",
    //   role: "Project Manager at Artify",
    //   content:
    //     "Exceptional developer who transformed our platform. The performance improvements and modern design exceeded our expectations.",
    //   rating: 5,
    //   avatar: "/placeholder.svg?height=60&width=60",
    // },
    // {
    //   name: "Ahmed Ben Ali",
    //   role: "Student at MTC ISGI",
    //   content:
    //     "Best instructor I've had. Made complex concepts easy to understand and provided practical, real-world examples.",
    //   rating: 5,
    //   avatar: "/placeholder.svg?height=60&width=60",
    // },
    // {
    //   name: "Maria Rodriguez",
    //   role: "Lead Insight Client",
    //   content:
    //     "Delivered exactly what we needed. The AI integration was seamless and the platform is incredibly user-friendly.",
    //   rating: 5,
    //   avatar: "/placeholder.svg?height=60&width=60",
    // },
  ]

  const careerStats = [
    { label: "Years Experience", value: "3+", icon: Clock },
    { label: "Projects Completed", value: "25+", icon: Briefcase },
    { label: "Students Mentored", value: "100+", icon: Users },
    { label: "Technologies Mastered", value: "15+", icon: Code },
  ]

  return (
    <section ref={containerRef} className="py-20 min-h-screen">
        
      <div className="container mx-auto px-4">
        <FadeIn className="mb-8 mt-4">
                    <Link
                      href="/"
                      className="inline-flex items-center text-teal-500 hover:text-teal-600 transition-colors mb-4 md:mb-0"
                    >
                      <ArrowLeft size={20} className="mr-2" />
                      Back to Home
                    </Link>
                  </FadeIn> 
        {/* Hero Section */}
        <FadeIn>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 bg-teal-500/10 text-teal-500 px-4 py-2 rounded-full text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Briefcase size={16} />
              Professional Journey
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Work Experience</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              A comprehensive overview of my professional journey, achievements, and the impact I've made in web
              development and technology education.
            </p>

            {/* Career Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {careerStats.map((stat, index) => (
                <FadeIn key={index} delay={0.1 * index}>
                  <Card className="text-center border-teal-500/20 bg-white/50 dark:bg-navy-500/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <stat.icon className="h-8 w-8 text-teal-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-teal-500">{stat.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Main Content Tabs */}
        <FadeIn delay={0.2}>
          <Tabs defaultValue="experience" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Timeline Navigation */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-8 border-teal-500/20 bg-white/50 dark:bg-navy-500/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-teal-500" />
                        Career Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {workExperience.map((exp, index) => (
                        <motion.div
                          key={exp.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            activeExperience === index
                              ? "bg-teal-500/20 border-l-4 border-teal-500"
                              : "hover:bg-gray-100 dark:hover:bg-navy-400/50"
                          }`}
                          onClick={() => setActiveExperience(index)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm">{exp.company}</div>
                              <div className="text-xs text-gray-500">{exp.period}</div>
                            </div>
                            <Badge variant={exp.status === "Current" ? "default" : "secondary"} className="text-xs">
                              {exp.status}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Experience Details */}
                <div className="lg:col-span-2">
                  <StaggerContainer>
                    {workExperience.map((exp, index) => (
                      <motion.div
                        key={exp.id}
                        variants={staggerItem}
                        className={activeExperience === index ? "block" : "hidden"}
                      >
                        <Card className="border-teal-500/20 bg-white/50 dark:bg-navy-500/50 backdrop-blur-sm overflow-hidden">
                          <div className={`h-2 bg-gradient-to-r ${exp.color}`} />
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-xl md:text-2xl">{exp.title}</CardTitle>
                                <CardDescription className="text-lg font-medium mt-1 flex items-center gap-2">
                                  <Building className="h-4 w-4" />
                                  {exp.company}
                                </CardDescription>
                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {exp.period}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {exp.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {exp.location}
                                  </span>
                                </div>
                              </div>
                              {exp.link && (
                                <Button variant="outline" size="sm" asChild>
                                  <a href={exp.link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>

                            {/* Key Achievements */}
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Award className="h-4 w-4 text-teal-500" />
                                Key Achievements
                              </h4>
                              <ul className="space-y-2">
                                {exp.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <ChevronRight className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Impact Metrics */}
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-teal-500" />
                                Impact & Results
                              </h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(exp.impact).map(([key, value]) => (
                                  <div key={key} className="text-center p-3 bg-teal-500/10 rounded-lg">
                                    <div className="text-lg font-bold text-teal-500">{value}</div>
                                    <div className="text-xs capitalize text-gray-600 dark:text-gray-300">
                                      {key.replace(/([A-Z])/g, " $1").trim()}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="bg-teal-500/10 text-teal-500 border-teal-500/20"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-teal-500/20 bg-white/50 dark:bg-navy-500/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-teal-500" />
                      Technical Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-teal-500/20 bg-white/50 dark:bg-navy-500/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-teal-500" />
                      Professional Philosophy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 bg-teal-500/10 rounded-lg">
                        <h4 className="font-semibold text-teal-500 mb-2">Innovation First</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Always seeking cutting-edge solutions and modern approaches to solve complex problems.
                        </p>
                      </div>
                      <div className="p-4 bg-blue-500/10 rounded-lg">
                        <h4 className="font-semibold text-blue-500 mb-2">Performance Focused</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Committed to delivering high-performance applications that provide exceptional user
                          experiences.
                        </p>
                      </div>
                      <div className="p-4 bg-purple-500/10 rounded-lg">
                        <h4 className="font-semibold text-purple-500 mb-2">Knowledge Sharing</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Passionate about mentoring others and contributing to the developer community.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <FadeIn key={index} delay={0.1 * index}>
                    <Card className="border-teal-500/20 bg-white/50 dark:bg-navy-500/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${achievement.color}`}>
                            <achievement.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">{achievement.description}</p>
                            <div className={`text-2xl font-bold ${achievement.color}`}>{achievement.metric}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </TabsContent>

            {/* Testimonials Tab */}
            <TabsContent value="testimonials" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <FadeIn key={index} delay={0.1 * index}>
                    <Card className="border-teal-500/20 bg-white/50 dark:bg-navy-500/50 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <Quote className="h-8 w-8 text-teal-500 mb-4" />
                        <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                        <div className="flex items-center gap-3">
                          <img
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-semibold">{testimonial.name}</div>
                            <div className="text-sm text-gray-500">{testimonial.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </FadeIn>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </FadeIn>

        {/* Call to Action */}
        <FadeIn delay={0.4}>
          <div className="text-center mt-16">
            <Card className="border-teal-500/20 bg-white/50 dark:bg-navy-500/50 backdrop-blur-sm max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-primary">Ready to Work Together?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Let's discuss how my experience and skills can contribute to your next project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-teal-500 hover:bg-teal-600" asChild>
                    <a href="/contact">
                      Get In Touch
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-teal-500/20 text-primary">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
