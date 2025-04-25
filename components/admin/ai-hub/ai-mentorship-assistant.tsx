"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Code,
  FileText,
  Lightbulb,
  Loader2,
  MessageSquare,
  Paperclip,
  Plus,
  Send,
  Settings,
  Sparkles,
  ThumbsUp,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface Suggestion {
  id: string
  title: string
  description: string
  category: "portfolio" | "career" | "project" | "learning"
  icon: React.ReactNode
}

export function AIMentorshipAssistant() {
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "👋 Hi there! I'm your AI mentorship assistant. I can help with portfolio feedback, career advice, mock interviews, or project suggestions. What would you like to discuss today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [feedbackUrl, setFeedbackUrl] = useState("")
  const [feedbackType, setFeedbackType] = useState("portfolio")
  const [interviewType, setInterviewType] = useState("frontend")

  const suggestions: Suggestion[] = [
    {
      id: "1",
      title: "Portfolio Review",
      description: "Get feedback on your portfolio design, content, and user experience",
      category: "portfolio",
      icon: <FileText className="h-5 w-5 text-teal-500" />,
    },
    {
      id: "2",
      title: "Career Path Guidance",
      description: "Discuss your career goals and get advice on next steps",
      category: "career",
      icon: <ArrowRight className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "3",
      title: "Mock Interview",
      description: "Practice technical or behavioral interview questions",
      category: "career",
      icon: <User className="h-5 w-5 text-purple-500" />,
    },
    {
      id: "4",
      title: "Project Ideas",
      description: "Get personalized project suggestions based on your skills",
      category: "project",
      icon: <Lightbulb className="h-5 w-5 text-yellow-500" />,
    },
    {
      id: "5",
      title: "Code Review",
      description: "Get feedback on your code structure, patterns, and best practices",
      category: "portfolio",
      icon: <Code className="h-5 w-5 text-green-500" />,
    },
    {
      id: "6",
      title: "Learning Path",
      description: "Get recommendations for skills to learn next",
      category: "learning",
      icon: <Sparkles className="h-5 w-5 text-amber-500" />,
    },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let responseContent = ""

      if (inputValue.toLowerCase().includes("portfolio")) {
        responseContent =
          "I'd be happy to review your portfolio! You can share a link, or we can discuss specific aspects you'd like feedback on. I can help with design, content organization, project highlights, or overall user experience. What specific area would you like to focus on?"
      } else if (inputValue.toLowerCase().includes("interview")) {
        responseContent =
          "Mock interviews are a great way to prepare! I can simulate technical interviews for frontend, backend, or full-stack roles, or behavioral interviews for various positions. Would you like to start with a technical or behavioral interview? For technical, what specific technologies should we focus on?"
      } else if (inputValue.toLowerCase().includes("project")) {
        responseContent =
          "I'd love to suggest some project ideas tailored to your skills and interests! To provide the most relevant suggestions, could you tell me a bit about your current skill level, technologies you're comfortable with, and what areas you're looking to grow in?"
      } else if (inputValue.toLowerCase().includes("career")) {
        responseContent =
          "Career guidance is important! To give you the best advice, I'd like to understand your current situation and goals. Could you share a bit about your current role, experience level, and what you're hoping to achieve in your career? This will help me provide more tailored guidance."
      } else {
        responseContent =
          "Thanks for your message! I can help with portfolio feedback, career advice, mock interviews, or project suggestions. Could you let me know which of these areas you'd like to focus on, or if there's something else I can assist with?"
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSelectedTopic(suggestion.id)

    // Add user message based on suggestion
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `I'd like help with: ${suggestion.title}`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let responseContent = ""

      switch (suggestion.title) {
        case "Portfolio Review":
          responseContent =
            "Great choice! I'd be happy to review your portfolio. Could you share the URL to your portfolio website? I'll analyze the design, content structure, project presentations, and overall user experience to provide comprehensive feedback."
          setActiveTab("portfolio-review")
          break
        case "Career Path Guidance":
          responseContent =
            "I'd be happy to help with your career path! To provide the most relevant guidance, could you tell me about your current role, experience level, and what your career goals are? This will help me understand where you are and where you want to go."
          break
        case "Mock Interview":
          responseContent =
            "Mock interviews are excellent preparation! I can simulate both technical and behavioral interviews. Would you prefer to focus on frontend, backend, full-stack, or behavioral questions? Once you decide, we can start the interview session."
          setActiveTab("mock-interview")
          break
        case "Project Ideas":
          responseContent =
            "I'd love to suggest some projects tailored to your skills and interests! To provide the most relevant suggestions, could you tell me about your current skill level, technologies you're comfortable with, and what areas you're looking to grow in?"
          break
        case "Code Review":
          responseContent =
            "Code reviews are a great way to improve! You can share a GitHub repository link or paste a code snippet you'd like me to review. I'll analyze code structure, patterns, potential improvements, and best practices."
          break
        case "Learning Path":
          responseContent =
            "I can help create a personalized learning path for you! To get started, could you share what technologies you're already familiar with, your current skill level, and what areas or roles you're interested in pursuing?"
          break
        default:
          responseContent =
            "Thanks for selecting this topic! Could you provide more details about what specific help you're looking for?"
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handlePortfolioReviewSubmit = () => {
    if (!feedbackUrl) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `Please review my portfolio at: ${feedbackUrl}`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)
    setActiveTab("chat")

    // Simulate AI response
    setTimeout(() => {
      const responseContent = `I've analyzed your portfolio at ${feedbackUrl} and here's my feedback:

**Strengths:**
- Clean, modern design with good visual hierarchy
- Projects are well-presented with clear descriptions
- Good use of interactive elements to showcase your skills
- Mobile responsiveness works well across devices

**Areas for Improvement:**
- Consider adding more detailed case studies for 1-2 key projects
- Your contact form could be more prominent
- Add testimonials or recommendations if available
- The skills section could use more visual organization

**Specific Suggestions:**
1. Add a brief "process" section to your main projects
2. Consider a dark/light mode toggle for better accessibility
3. Your "About" section could tell a more compelling story
4. Add estimated timeline or completion dates to projects

Would you like me to elaborate on any of these points?`

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
      setFeedbackUrl("")
    }, 3000)
  }

  const handleStartMockInterview = () => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: `I'd like to start a mock interview for a ${interviewType} developer position.`,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)
    setActiveTab("chat")

    // Simulate AI response
    setTimeout(() => {
      let responseContent = ""

      if (interviewType === "frontend") {
        responseContent = `Great! Let's start your frontend developer mock interview. I'll ask you a series of questions - respond as you would in a real interview.

**Question 1:** Can you explain the difference between controlled and uncontrolled components in React?

**Question 2:** How would you optimize the performance of a React application that's rendering a large list of items?

**Question 3:** Explain how you would implement a responsive design that works well on both mobile and desktop.

Take your time to respond to each question. I'll provide feedback after your answers.`
      } else if (interviewType === "backend") {
        responseContent = `Great! Let's start your backend developer mock interview. I'll ask you a series of questions - respond as you would in a real interview.

**Question 1:** How would you design a scalable API that needs to handle high traffic?

**Question 2:** Explain the differences between SQL and NoSQL databases, and when you might choose one over the other.

**Question 3:** How do you handle error handling and logging in a production backend application?

Take your time to respond to each question. I'll provide feedback after your answers.`
      } else {
        responseContent = `Great! Let's start your behavioral interview. I'll ask you a series of questions - respond as you would in a real interview.

**Question 1:** Tell me about a challenging project you worked on and how you overcame obstacles.

**Question 2:** Describe a situation where you had to work with a difficult team member. How did you handle it?

**Question 3:** How do you stay updated with the latest technologies and trends in your field?

Take your time to respond to each question. I'll provide feedback after your answers.`
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 2000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Mentorship Assistant</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your personal mentor for portfolio feedback, career advice, and more
          </p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Session
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600">
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="chat" className="h-full" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="portfolio-review">Portfolio Review</TabsTrigger>
              <TabsTrigger value="mock-interview">Mock Interview</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="h-full">
              <Card className="h-[calc(100vh-240px)] flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle>AI Mentor Chat</CardTitle>
                  <CardDescription>Ask questions, get feedback, or practice for interviews</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow overflow-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className="flex items-start max-w-[80%]">
                          {message.role === "assistant" && (
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback className="bg-teal-500 text-white">AI</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <div
                              className={`rounded-lg p-4 ${
                                message.role === "user" ? "bg-teal-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                              }`}
                            >
                              <div className="whitespace-pre-line">{message.content}</div>
                            </div>
                            <div className="mt-1 text-xs text-gray-500 flex justify-between">
                              <span>{formatTime(message.timestamp)}</span>
                              {message.role === "assistant" && (
                                <div className="flex space-x-2">
                                  <button className="hover:text-teal-500">
                                    <ThumbsUp className="h-3 w-3" />
                                  </button>
                                  <button className="hover:text-teal-500">
                                    <MessageSquare className="h-3 w-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          {message.role === "user" && (
                            <Avatar className="h-8 w-8 ml-2">
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback className="bg-gray-500 text-white">ME</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-start max-w-[80%]">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback className="bg-teal-500 text-white">AI</AvatarFallback>
                          </Avatar>
                          <div className="rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
                            <div className="flex space-x-1">
                              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <div className="flex w-full items-center space-x-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Textarea
                      placeholder="Type your message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 resize-none"
                      rows={1}
                    />
                    <Button
                      className="bg-teal-500 hover:bg-teal-600"
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                    >
                      {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio-review">
              <Card className="h-[calc(100vh-240px)]">
                <CardHeader>
                  <CardTitle>Portfolio Review</CardTitle>
                  <CardDescription>Get detailed feedback on your portfolio website</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="portfolio-url" className="text-sm font-medium">
                      Portfolio URL
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        id="portfolio-url"
                        placeholder="https://your-portfolio.com"
                        value={feedbackUrl}
                        onChange={(e) => setFeedbackUrl(e.target.value)}
                      />
                      <Button
                        className="bg-teal-500 hover:bg-teal-600 whitespace-nowrap"
                        onClick={handlePortfolioReviewSubmit}
                        disabled={!feedbackUrl}
                      >
                        Analyze
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Feedback Focus</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        className={`p-3 rounded-md border cursor-pointer ${
                          feedbackType === "portfolio"
                            ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                            : "border-gray-200 dark:border-gray-800"
                        }`}
                        onClick={() => setFeedbackType("portfolio")}
                      >
                        <div className="font-medium">Design & UX</div>
                        <div className="text-sm text-gray-500">Visual design, user experience, and navigation</div>
                      </div>
                      <div
                        className={`p-3 rounded-md border cursor-pointer ${
                          feedbackType === "content"
                            ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                            : "border-gray-200 dark:border-gray-800"
                        }`}
                        onClick={() => setFeedbackType("content")}
                      >
                        <div className="font-medium">Content & Projects</div>
                        <div className="text-sm text-gray-500">
                          Project presentation, descriptions, and overall content
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Additional Notes (Optional)</label>
                    <Textarea placeholder="Any specific areas you'd like feedback on?" className="h-24" />
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <h3 className="font-medium mb-2">What to expect</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-teal-500" />
                        <span>Comprehensive analysis of design, content, and user experience</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-teal-500" />
                        <span>Specific suggestions for improvements</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-teal-500" />
                        <span>Comparison with industry best practices</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-teal-500" />
                        <span>Actionable next steps to enhance your portfolio</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mock-interview">
              <Card className="h-[calc(100vh-240px)]">
                <CardHeader>
                  <CardTitle>Mock Interview</CardTitle>
                  <CardDescription>Practice technical and behavioral interviews with AI feedback</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Interview Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      <div
                        className={`p-3 rounded-md border cursor-pointer ${
                          interviewType === "frontend"
                            ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                            : "border-gray-200 dark:border-gray-800"
                        }`}
                        onClick={() => setInterviewType("frontend")}
                      >
                        <div className="font-medium">Frontend</div>
                        <div className="text-sm text-gray-500">React, JavaScript, CSS, etc.</div>
                      </div>
                      <div
                        className={`p-3 rounded-md border cursor-pointer ${
                          interviewType === "backend"
                            ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                            : "border-gray-200 dark:border-gray-800"
                        }`}
                        onClick={() => setInterviewType("backend")}
                      >
                        <div className="font-medium">Backend</div>
                        <div className="text-sm text-gray-500">Node.js, APIs, Databases, etc.</div>
                      </div>
                      <div
                        className={`p-3 rounded-md border cursor-pointer ${
                          interviewType === "behavioral"
                            ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                            : "border-gray-200 dark:border-gray-800"
                        }`}
                        onClick={() => setInterviewType("behavioral")}
                      >
                        <div className="font-medium">Behavioral</div>
                        <div className="text-sm text-gray-500">Soft skills, teamwork, problem-solving</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Experience Level</label>
                    <Select defaultValue="mid">
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid-level (2-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Specific Technologies (Optional)</label>
                    <Input placeholder="e.g., React, Node.js, MongoDB" />
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                    <h3 className="font-medium mb-2">How it works</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-teal-500" />
                        <span>AI will ask you a series of interview questions</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-teal-500" />
                        <span>Respond as you would in a real interview</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-teal-500" />
                        <span>Receive feedback on your answers and delivery</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-teal-500" />
                        <span>Get suggestions for improvement</span>
                      </li>
                    </ul>
                  </div>

                  <Button className="w-full bg-teal-500 hover:bg-teal-600" onClick={handleStartMockInterview}>
                    Start Mock Interview
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Suggested Topics</CardTitle>
              <CardDescription>Choose a topic to get personalized guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <motion.div
                    key={suggestion.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-md border cursor-pointer transition-colors ${
                      selectedTopic === suggestion.id
                        ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                        : "border-gray-200 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-800"
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center">
                      <div className="mr-3">{suggestion.icon}</div>
                      <div>
                        <div className="font-medium">{suggestion.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">{suggestion.description}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Growth Check-ins</CardTitle>
              <CardDescription>Schedule regular mentorship sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Weekly Portfolio Review</div>
                      <div className="text-sm text-gray-500">Get feedback on your latest updates</div>
                    </div>
                    <Badge>Fridays</Badge>
                  </div>
                </div>

                <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">Monthly Career Check-in</div>
                      <div className="text-sm text-gray-500">Review progress toward your goals</div>
                    </div>
                    <Badge>1st Monday</Badge>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule New Check-in
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Resources</CardTitle>
              <CardDescription>Helpful materials for your growth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-800 cursor-pointer">
                  <div className="font-medium">Portfolio Best Practices</div>
                  <div className="text-sm text-gray-500">Guide to creating standout developer portfolios</div>
                </div>
                <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-800 cursor-pointer">
                  <div className="font-medium">Technical Interview Prep</div>
                  <div className="text-sm text-gray-500">Common questions and answer strategies</div>
                </div>
                <div className="p-3 rounded-md border border-gray-200 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-800 cursor-pointer">
                  <div className="font-medium">Career Growth Roadmap</div>
                  <div className="text-sm text-gray-500">Planning your path from junior to senior developer</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
