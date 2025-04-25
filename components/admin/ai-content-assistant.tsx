"use client"

import { useState } from "react"
import {
  ArrowRight,
  Check,
  Copy,
  Edit,
  Github,
  Loader2,
  MessageSquare,
  RefreshCw,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AIContentAssistant() {
  const [activeTab, setActiveTab] = useState("chat")
  const [isGenerating, setIsGenerating] = useState(false)
  const [githubUrl, setGithubUrl] = useState("")
  const [generatedDescription, setGeneratedDescription] = useState("")
  const [textToImprove, setTextToImprove] = useState("")
  const [improvedText, setImprovedText] = useState("")
  const [chatInput, setChatInput] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      role: "assistant",
      content: "Hi there! I'm your AI content assistant. How can I help you with your portfolio today?",
    },
  ])
  const [seoKeywords, setSeoKeywords] = useState("")
  const [generatedKeywords, setGeneratedKeywords] = useState<string[]>([])

  const handleGenerateDescription = () => {
    if (!githubUrl) return

    setIsGenerating(true)

    // Simulate API call to AI service
    setTimeout(() => {
      setGeneratedDescription(
        "A modern portfolio website built with Next.js, React, and Tailwind CSS. Features include a responsive design, dark mode support, animated transitions using Framer Motion, and a custom content management system. The site showcases projects, skills, and contact information in an elegant and user-friendly interface.",
      )
      setIsGenerating(false)
    }, 2000)
  }

  const handleImproveText = () => {
    if (!textToImprove) return

    setIsGenerating(true)

    // Simulate API call to AI service
    setTimeout(() => {
      setImprovedText(
        "I designed and developed a comprehensive e-commerce dashboard that provides real-time analytics and inventory management capabilities. The solution leverages React for the frontend, Node.js for the backend, and MongoDB for data storage. Key features include customizable reporting, user role management, and automated inventory alerts.",
      )
      setIsGenerating(false)
    }, 2000)
  }

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return

    // Add user message to chat
    setChatHistory([...chatHistory, { role: "user", content: chatInput }])
    const userMessage = chatInput
    setChatInput("")

    // Simulate AI response
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I can help you with that! Based on your question about "${userMessage}", I would suggest focusing on highlighting your unique skills and creating a clear narrative in your portfolio. Make sure to include specific metrics and outcomes in your project descriptions to demonstrate impact.`,
        },
      ])
    }, 1500)
  }

  const handleGenerateSeoKeywords = () => {
    if (!seoKeywords) return

    setIsGenerating(true)

    // Simulate API call to AI service
    setTimeout(() => {
      setGeneratedKeywords([
        "frontend developer portfolio",
        "react developer",
        "web design portfolio",
        "UI/UX developer",
        "javascript expert",
        "next.js developer",
        "responsive web design",
        "creative web developer",
        "portfolio projects",
        "modern web applications",
        "interactive web experiences",
        "frontend engineer",
      ])
      setIsGenerating(false)
    }, 2000)
  }

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Content Assistant</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Generate and improve content for your portfolio with AI assistance.
          </p>
        </div>
      </div>

      <Tabs defaultValue="chat" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="project">Project Description</TabsTrigger>
          <TabsTrigger value="improve">Improve Text</TabsTrigger>
          <TabsTrigger value="seo">SEO Keywords</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 text-teal-500 mr-2" />
                AI Assistant Chat
              </CardTitle>
              <CardDescription>
                Ask questions about portfolio content, get writing suggestions, or brainstorm ideas.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto space-y-4 p-4">
              {chatHistory.map((message, index) => (
                <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === "assistant" ? "bg-gray-100 dark:bg-gray-800" : "bg-teal-500 text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t border-gray-200 dark:border-gray-800 p-4">
              <div className="flex w-full space-x-2">
                <Input
                  placeholder="Ask anything about your portfolio content..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendChatMessage()
                    }
                  }}
                />
                <Button
                  className="bg-teal-500 hover:bg-teal-600"
                  onClick={handleSendChatMessage}
                  disabled={!chatInput.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="project" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Github className="h-5 w-5 text-teal-500 mr-2" />
                Generate Project Description
              </CardTitle>
              <CardDescription>Create a professional project description from a GitHub repository URL.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="github-url">GitHub Repository URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="github-url"
                    placeholder="https://github.com/username/repository"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                  <Button
                    className="bg-teal-500 hover:bg-teal-600 whitespace-nowrap"
                    onClick={handleGenerateDescription}
                    disabled={isGenerating || !githubUrl}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {generatedDescription && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Generated Description</Label>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyText(generatedDescription)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-line">{generatedDescription}</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
                      <Check className="h-4 w-4 mr-2" />
                      Use This
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Great Project Descriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                  <span>Include the technologies and frameworks used</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                  <span>Highlight your specific contributions if it was a team project</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                  <span>Mention challenges you overcame and how you solved them</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                  <span>Include measurable outcomes or improvements when possible</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                  <span>Keep it concise but informative (150-250 words is ideal)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improve" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 text-teal-500 mr-2" />
                Improve Existing Text
              </CardTitle>
              <CardDescription>
                Enhance your project descriptions, about me section, or any portfolio text.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text-to-improve">Text to Improve</Label>
                <Textarea
                  id="text-to-improve"
                  placeholder="Paste your existing text here..."
                  rows={5}
                  value={textToImprove}
                  onChange={(e) => setTextToImprove(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="improvement-type" className="whitespace-nowrap">
                    Improvement Type:
                  </Label>
                  <Select defaultValue="professional">
                    <SelectTrigger id="improvement-type" className="w-[180px]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">More Professional</SelectItem>
                      <SelectItem value="concise">More Concise</SelectItem>
                      <SelectItem value="detailed">More Detailed</SelectItem>
                      <SelectItem value="engaging">More Engaging</SelectItem>
                      <SelectItem value="technical">More Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="bg-teal-500 hover:bg-teal-600"
                  onClick={handleImproveText}
                  disabled={isGenerating || !textToImprove}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Improving...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Improve Text
                    </>
                  )}
                </Button>
              </div>

              {improvedText && (
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center">
                    <Label>Improved Text</Label>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyText(improvedText)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-line">{improvedText}</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button size="sm" className="bg-teal-500 hover:bg-teal-600">
                      <Check className="h-4 w-4 mr-2" />
                      Use This
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 text-teal-500 mr-2" />
                SEO Keyword Generator
              </CardTitle>
              <CardDescription>Generate relevant SEO keywords for your portfolio or blog posts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo-topic">Topic or Skills</Label>
                <Textarea
                  id="seo-topic"
                  placeholder="Describe your portfolio focus, skills, or blog post topic..."
                  rows={3}
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  className="bg-teal-500 hover:bg-teal-600"
                  onClick={handleGenerateSeoKeywords}
                  disabled={isGenerating || !seoKeywords}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Keywords
                    </>
                  )}
                </Button>
              </div>

              {generatedKeywords.length > 0 && (
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between items-center">
                    <Label>Generated Keywords</Label>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyText(generatedKeywords.join(", "))}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All
                    </Button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {generatedKeywords.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => handleCopyText(keyword)}
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Click on a keyword to copy it. Use these keywords in your meta tags, headings, and content to
                    improve SEO.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Tips for Your Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                  <span>Include relevant keywords in your page titles and headings</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                  <span>Write descriptive meta descriptions for each page</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                  <span>Use alt text for all images to improve accessibility and SEO</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                  <span>Create descriptive URLs that include keywords</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 text-teal-500 mr-2 mt-0.5" />
                  <span>Ensure your portfolio is mobile-friendly and loads quickly</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
