"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Award,
  Calendar,
  Code2,
  Compass,
  Download,
  GraduationCap,
  Heart,
  Lightbulb,
  MapPin,
  Rocket,
  Send,
  Star,
  Target,
  User,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn, StaggerContainer, staggerItem, TextReveal, Rotate3D } from "@/components/animations/scroll-animations"
import { CosmicBackground } from "@/components/cosmic-background"
import { PageWrapper } from "@/components/page-wrapper"
import { Footer } from "@/components/footer"
import { useMobile } from "@/hooks/use-mobile"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("bio")
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Skills data
  const skills = [
    { name: "Frontend Development", level: 90, icon: <Code2 size={20} /> },
    { name: "UI/UX Design", level: 85, icon: <Compass size={20} /> },
    { name: "Backend Development", level: 80, icon: <Code2 size={20} /> },
    { name: "Cloud Services", level: 75, icon: <Rocket size={20} /> },
    { name: "Mobile Development", level: 70, icon: <Zap size={20} /> },
    { name: "DevOps", level: 65, icon: <Target size={20} /> },
  ]

  // Timeline data
  const timelineItems = [
    {
      year: "2023 - Present",
      title: "Bachelor Degree in Computer Science",
      description: "ISIMS, Sfax, Tunisia",
      icon: <GraduationCap size={20} />,
      details:
        "Focusing on advanced algorithms, cloud computing, and full-stack development. Leading student projects and maintaining a 3.8 GPA.",
    },
    {
      year: "2024 - 2025",
      title: "Fullstack Web Developer Intern & Freelance",
      description: "Artify, Ariana, Tunisia",
      icon: <Calendar size={20} />,
      details:
        "Developed and maintained client websites using Next.js, React, and Node.js. Implemented responsive designs and optimized performance for 15+ client projects.",
    },
    {
      year: "2024 - Present",
      title: "AWS Cloud Club Captain",
      description: "ISIMS, Sfax, Tunisia",
      icon: <Award size={20} />,
      details:
        "Leading workshops and training sessions on AWS services. Organizing cloud computing events and hackathons for 100+ students.",
    },
    {
      year: "2019 - 2023",
      title: "Computer Science High School Diploma",
      description: "Borjlouzir High School, Ariana, Tunisia",
      icon: <GraduationCap size={20} />,
      details:
        "Graduated with honors. Participated in national programming competitions and led the school's technology club.",
    },
  ]

  // Values data
  const values = [
    {
      title: "Innovation",
      description: "Constantly pushing boundaries and exploring new technologies to create cutting-edge solutions.",
      icon: <Lightbulb className="text-yellow-400" size={24} />,
      color: "bg-yellow-400/10",
    },
    {
      title: "Quality",
      description: "Committed to excellence in every line of code and pixel of design, with attention to detail.",
      icon: <Star className="text-purple-400" size={24} />,
      color: "bg-purple-400/10",
    },
    {
      title: "Collaboration",
      description: "Believing in the power of teamwork and open communication to achieve exceptional results.",
      icon: <Heart className="text-red-400" size={24} />,
      color: "bg-red-400/10",
    },
    {
      title: "Growth",
      description: "Dedicated to continuous learning and personal development in this ever-evolving field.",
      icon: <Rocket className="text-blue-400" size={24} />,
      color: "bg-blue-400/10",
    },
  ]

  // Testimonials data
  const testimonials = [
    // {
    //   name: "Sarah Johnson",
    //   role: "Product Manager at TechCorp",
    //   content:
    //     "Working with Malek was a game-changer for our project. His technical expertise combined with an eye for design resulted in a product that exceeded our expectations.",
    //   avatar: "/placeholder.svg?height=80&width=80",
    // },
    // {
    //   name: "Ahmed Hassan",
    //   role: "CTO at StartupX",
    //   content:
    //     "Malek's ability to understand complex requirements and translate them into elegant solutions is remarkable. His work ethic and attention to detail make him a valuable asset to any team.",
    //   avatar: "/placeholder.svg?height=80&width=80",
    // },
    // {
    //   name: "Emma Rodriguez",
    //   role: "UI/UX Director",
    //   content:
    //     "I've rarely seen someone with such a perfect balance of technical skill and design sensibility. Malek's work consistently demonstrates both innovation and usability.",
    //   avatar: "/placeholder.svg?height=80&width=80",
    // },
  ]

  // Stats data
  const stats = [
    { label: "Projects Completed", value: "50+" },
    { label: "Hackathons", value: "23" },
    { label: "Clients", value: "30+" },
    { label: "Years Experience", value: "3+" },
  ]

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <PageWrapper>
    <main className="min-h-screen relative">
      {/* <CosmicBackground /> */}
      

      {/* Hero Section */}
      <div ref={containerRef} className="relative h-[70vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
          <div className="absolute inset-0 bg-[url('/thumbnail-cropped-evenly.png?height=1080&width=1920')] bg-cover bg-center opacity-100" />
        </motion.div>

        {/* <div className="container mx-auto px-4 relative z-10">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <TextReveal text="About Me" />
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl text-gray-300">
              Full-stack developer, UI/UX enthusiast, and cosmic explorer crafting digital experiences that inspire and
              innovate.
            </p>
          </FadeIn>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-white rounded-full mt-2"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div> */}

      </div>

      {/* Main Content */}
      <section className="py-20">

       


        <div className="container mx-auto px-4">

          <FadeIn className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-teal-500 hover:text-teal-600 transition-colors mb-4 md:mb-0"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to home
            </Link>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Left Column - Profile */}
            <div className="md:col-span-1">
              <FadeIn>
                <Rotate3D className="mb-8">
                  <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl border-4 border-teal-500/20">
                    <Image
                      src="/src/my-photos/profile-pic.jpg?height=600&width=600"
                      alt="Malek Maghraoui"
                      fill
                      className="object-cover"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-navy-500/80 to-transparent" /> */}
                  </div>
                </Rotate3D>

                <Card className="overflow-hidden backdrop-blur-sm bg-white/5 dark:bg-navy-500/30 border-teal-500/20">
                  <CardContent className="p-6">
                    <StaggerContainer className="space-y-4">
                      <motion.div variants={staggerItem} className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-teal-500/10">
                          <User className="text-teal-500" size={18} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                          <p className="font-medium text-primary">Malek Maghraoui</p>
                        </div>
                      </motion.div>

                      <motion.div variants={staggerItem} className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-teal-500/10">
                          <MapPin className="text-teal-500" size={18} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                          <p className="font-medium text-primary">Ariana, Tunisia</p>
                        </div>
                      </motion.div>

                      <motion.div variants={staggerItem} className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-teal-500/10">
                          <Calendar className="text-teal-500" size={18} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                          <p className="font-medium text-primary">3+ Years</p>
                        </div>
                      </motion.div>

                      <motion.div variants={staggerItem} className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-teal-500/10">
                          <GraduationCap className="text-teal-500" size={18} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Education</p>
                          <p className="font-medium text-primary">Computer Science, ISIMS</p>
                        </div>
                      </motion.div>

                      <motion.div variants={staggerItem} className="pt-4">
                         <a href="/resume.pdf" download>
                          <Button
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Download size={16} />
                            Download Resume
                          </Button>
                        </a>
                      </motion.div>
                    </StaggerContainer>
                  </CardContent>
                </Card>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Technical Skills</h3>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <FadeIn key={index} delay={index * 0.1}>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 rounded-full bg-teal-500/10">{skill.icon}</div>
                              <span className="font-medium">{skill.name}</span>
                            </div>
                            <span className="text-sm text-teal-500">{skill.level}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column - Content */}
            <div className="md:col-span-2">
              <Tabs defaultValue="bio" className="w-full" onValueChange={handleTabChange}>
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="bio" className="data-[state=active]:bg-teal-500">
                    Bio
                  </TabsTrigger>
                  <TabsTrigger value="journey" className="data-[state=active]:bg-teal-500">
                    Journey
                  </TabsTrigger>
                  <TabsTrigger value="values" className="data-[state=active]:bg-teal-500">
                    Values
                  </TabsTrigger>
                  <TabsTrigger value="testimonials" className="data-[state=active]:bg-teal-500">
                    Testimonials
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="bio" className="mt-0">
                      <div className="space-y-8">
                        <div>
                          <TextReveal
                            text="Crafting Digital Experiences with Passion and Precision"
                            className="text-3xl font-bold mb-6"
                          />

                          <div className="space-y-4 text-gray-600 dark:text-gray-300">
                            <p>
                              I'm Malek Maghraoui, a full-stack developer and UI/UX enthusiast with a passion for
                              creating seamless, user-centered digital experiences. My journey in the tech world began
                              with a curiosity about how things work and evolved into a deep love for building
                              innovative solutions that solve real problems.
                            </p>
                            <p>
                              With expertise spanning front-end and back-end technologies, I specialize in crafting
                              responsive, accessible, and performant web applications using modern frameworks like
                              React, Next.js, and Node.js. My approach combines technical excellence with an eye for
                              design, ensuring that every project not only functions flawlessly but also delivers an
                              exceptional user experience.
                            </p>
                            <p>
                              As an AWS Cloud Club Captain and active community member, I thrive in collaborative
                              environments and lead impactful initiatives. With 23 hackathons under my belt and a
                              versatile freelance background, I bring adaptability, innovation, and a commitment to
                              excellence to every project.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {stats.map((stat, index) => (
                            <FadeIn key={index} delay={index * 0.1}>
                              <Card className="text-center backdrop-blur-sm bg-white/5 dark:bg-navy-500/30 border-teal-500/20">
                                <CardContent className="p-4">
                                  <h3 className="text-3xl font-bold text-teal-500">{stat.value}</h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                                </CardContent>
                              </Card>
                            </FadeIn>
                          ))}
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold mb-4">Areas of Expertise</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FadeIn direction="right">
                              <Card className="backdrop-blur-sm bg-white/5 dark:bg-navy-500/30 border-teal-500/20 h-full">
                                <CardContent className="p-6">
                                  <h4 className="text-xl font-semibold mb-3 text-primary">Frontend Development</h4>
                                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                    <li>React & Next.js ecosystem</li>
                                    <li>TypeScript & JavaScript (ES6+)</li>
                                    <li>Responsive design & CSS frameworks</li>
                                    <li>State management (Redux, Context API)</li>
                                    <li>Animation & micro-interactions</li>
                                    <li>Accessibility (WCAG compliance)</li>
                                  </ul>
                                </CardContent>
                              </Card>
                            </FadeIn>

                            <FadeIn direction="left">
                              <Card className="backdrop-blur-sm bg-white/5 dark:bg-navy-500/30 border-teal-500/20 h-full">
                                <CardContent className="p-6">
                                  <h4 className="text-xl font-semibold mb-3 text-primary">Backend Development</h4>
                                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                    <li>Node.js & Express</li>
                                    <li>RESTful API design</li>
                                    <li>Database design (SQL & NoSQL)</li>
                                    <li>Authentication & authorization</li>
                                    <li>Serverless architecture</li>
                                    <li>AWS cloud services</li>
                                  </ul>
                                </CardContent>
                              </Card>
                            </FadeIn>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="journey" className="mt-0">
                      <div className="space-y-8">
                        <div>
                          <TextReveal text="My Professional Journey" className="text-3xl font-bold mb-6" />

                          <p className="text-gray-600 dark:text-gray-300 mb-8">
                            My path in technology has been driven by curiosity, continuous learning, and a desire to
                            create meaningful digital experiences. Here's how my journey has unfolded so far.
                          </p>
                        </div>

                        <div className="relative border-l-2 border-teal-500/30 pl-8 ml-4 space-y-12">
                          {timelineItems.map((item, index) => (
                            <FadeIn key={index} delay={0.1 * index} direction="left">
                              <div className="relative">
                                <div className="absolute -left-12 top-0 bg-teal-500 text-white p-2 rounded-full">
                                  {item.icon}
                                </div>
                                <motion.div
                                  className="bg-white/5 dark:bg-navy-500/50 p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
                                  whileHover={{
                                    scale: 1.02,
                                    boxShadow:
                                      "0 10px 25px -5px rgba(45, 212, 191, 0.1), 0 10px 10px -5px rgba(45, 212, 191, 0.04)",
                                  }}
                                >
                                  <span className="text-sm text-teal-500 font-medium">{item.year}</span>
                                  <h4 className="text-xl font-bold mt-1">{item.title}</h4>
                                  <p className="text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                                  <p className="mt-3 text-gray-600 dark:text-gray-300">{item.details}</p>
                                </motion.div>
                              </div>
                            </FadeIn>
                          ))}
                        </div>

                        <div className="mt-12">
                          <h3 className="text-2xl font-bold mb-4">Key Achievements</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FadeIn direction="up">
                              <Card className="backdrop-blur-sm bg-white/5 dark:bg-navy-500/30 border-teal-500/20">
                                <CardContent className="p-6">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-full bg-yellow-500/10">
                                      <Award className="text-yellow-500" size={20} />
                                    </div>
                                    <h4 className="text-lg font-semibold">Hackathon Champion</h4>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    Won first place in the National Innovation Hackathon with a solution for sustainable
                                    urban mobility, recognized for technical excellence and innovation.
                                  </p>
                                </CardContent>
                              </Card>
                            </FadeIn>

                            <FadeIn direction="up" delay={0.1}>
                              <Card className="backdrop-blur-sm bg-white/5 dark:bg-navy-500/30 border-teal-500/20">
                                <CardContent className="p-6">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-full bg-purple-500/10">
                                      <Rocket className="text-purple-500" size={20} />
                                    </div>
                                    <h4 className="text-lg font-semibold">AWS Community Builder</h4>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    Selected as an AWS Community Builder for contributions to cloud computing education
                                    and community development through workshops and mentorship.
                                  </p>
                                </CardContent>
                              </Card>
                            </FadeIn>

                            <FadeIn direction="up" delay={0.2}>
                              <Card className="backdrop-blur-sm bg-white/5 dark:bg-navy-500/30 border-teal-500/20">
                                <CardContent className="p-6">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-full bg-blue-500/10">
                                      <Code2 className="text-blue-500" size={20} />
                                    </div>
                                    <h4 className="text-lg font-semibold">Open Source Contributor</h4>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    Active contributor to several open-source projects, with over 50 merged pull
                                    requests and maintenance of two popular developer tools.
                                  </p>
                                </CardContent>
                              </Card>
                            </FadeIn>

                            {/* <FadeIn direction="up" delay={0.3}>
                              <Card className="backdrop-blur-sm bg-white/5 dark:bg-navy-500/30 border-teal-500/20">
                                <CardContent className="p-6">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-full bg-green-500/10">
                                      <Target className="text-green-500" size={20} />
                                    </div>
                                    <h4 className="text-lg font-semibold">Tech Community Leader</h4>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    Founded and led a local tech community of 500+ members, organizing monthly meetups,
                                    workshops, and mentorship programs for aspiring developers.
                                  </p>
                                </CardContent>
                              </Card>
                            </FadeIn> */}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="values" className="mt-0">
                      <div className="space-y-8">
                        <div>
                          <TextReveal text="My Core Values & Philosophy" className="text-3xl font-bold mb-6" />

                          <p className="text-gray-600 dark:text-gray-300 mb-8">
                            These principles guide my approach to work, collaboration, and problem-solving. They
                            represent not just how I code, but how I engage with clients, colleagues, and the broader
                            tech community.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {values.map((value, index) => (
                            <FadeIn key={index} delay={index * 0.1}>
                              <Card className="backdrop-blur-sm bg-white/5 dark:bg-navy-500/30 border-teal-500/20 h-full">
                                <CardContent className="p-6">
                                  <div className={`p-3 rounded-full ${value.color} w-fit mb-4`}>{value.icon}</div>
                                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                                </CardContent>
                              </Card>
                            </FadeIn>
                          ))}
                        </div>

                        <div className="mt-12">
                          <h3 className="text-2xl font-bold mb-6">My Development Philosophy</h3>

                          <div className="space-y-6">
                            <FadeIn>
                              <Card className="backdrop-blur-sm bg-white/5 dark:bg-navy-500/30 border-teal-500/20">
                                <CardContent className="p-6">
                                  <h4 className="text-xl font-semibold mb-3">User-Centered Design</h4>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    I believe that exceptional digital products start with a deep understanding of user
                                    needs. Every design decision and line of code should serve the end user, creating
                                    experiences that are intuitive, accessible, and delightful. I approach each project
                                    with empathy, putting myself in the user's shoes to identify pain points and
                                    opportunities for improvement.
                                  </p>
                                </CardContent>
                              </Card>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                              <Card className="backdrop-blur-sm bg-white/5 dark:bg-navy-500/30 border-teal-500/20">
                                <CardContent className="p-6">
                                  <h4 className="text-xl font-semibold mb-3">Continuous Learning</h4>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    In the rapidly evolving tech landscape, stagnation means falling behind. I embrace a
                                    mindset of perpetual growth, dedicating time each week to learning new technologies,
                                    refining my skills, and staying current with industry best practices. This
                                    commitment to learning enables me to bring fresh perspectives and innovative
                                    solutions to every project.
                                  </p>
                                </CardContent>
                              </Card>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                              <Card className="backdrop-blur-sm bg-white/5 dark:bg-navy-500/30 border-teal-500/20">
                                <CardContent className="p-6">
                                  <h4 className="text-xl font-semibold mb-3">Sustainable Development</h4>
                                  <p className="text-gray-600 dark:text-gray-300">
                                    I'm committed to writing clean, maintainable code that stands the test of time. This
                                    means prioritizing readability, implementing comprehensive testing, and creating
                                    thorough documentation. By building with sustainability in mind, I ensure that my
                                    solutions can evolve alongside business needs without accumulating technical debt.
                                  </p>
                                </CardContent>
                              </Card>
                            </FadeIn>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="testimonials" className="mt-0">
                      <div className="space-y-8">
                        <div>
                          <TextReveal text="What Others Say" className="text-3xl font-bold mb-6" />

                          <p className="text-gray-600 dark:text-gray-300 mb-8">
                            I've had the privilege of working with amazing clients and colleagues throughout my career.
                            Here's what some of them have to say about our collaborations.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          {testimonials.map((testimonial, index) => (
                            <FadeIn key={index} delay={index * 0.1}>
                              <Card className="backdrop-blur-sm bg-white/5 dark:bg-navy-500/30 border-teal-500/20">
                                <CardContent className="p-6">
                                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <div className="flex-shrink-0">
                                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-teal-500/30">
                                        <Image
                                          src={testimonial.avatar || "/placeholder.svg"}
                                          alt={testimonial.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex-grow">
                                      <div className="flex items-center mb-1">
                                        {[...Array(5)].map((_, i) => (
                                          <Star key={i} className="text-yellow-400" size={16} fill="currentColor" />
                                        ))}
                                      </div>
                                      <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                                        "{testimonial.content}"
                                      </p>
                                      <div>
                                        <h4 className="font-semibold">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </FadeIn>
                          ))}
                        </div>

                        <div className="mt-12">
                          <Card className="backdrop-blur-sm bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border-teal-500/30">
                            <CardContent className="p-8 text-center">
                              <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part
                                of your vision. Let's create something amazing together!
                              </p>
                              <div className="flex justify-center">
                                <Link href="/contact">
                                  <Button
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Send size={16} />
                                    Get in Touch
                                  </Button>
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

    </main>
    </PageWrapper>
  )
}
