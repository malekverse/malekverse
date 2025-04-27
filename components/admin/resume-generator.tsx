"use client"

import { useState } from "react"
import { ArrowDown, Download, LinkIcon, Save, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ResumeGenerator() {
  const [activeTab, setActiveTab] = useState("edit")
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [resumeSections, setResumeSections] = useState({
    personal: {
      visible: true,
      name: "John Doe",
      title: "Full Stack Developer",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      website: "johndoe.com",
      summary: "Experienced Full Stack Developer with a passion for creating elegant, efficient solutions. Skilled in React, Node.js, and cloud technologies with a track record of delivering high-quality applications.",
    },
    experience: {
      visible: true,
      items: [
        {
          id: 1,
          company: "Tech Solutions Inc.",
          position: "Senior Developer",
          location: "San Francisco, CA",
          startDate: "2021-01",
          endDate: "Present",
          current: true,
          description: "Led development of a customer-facing web application using React and Node.js. Implemented CI/CD pipelines and improved performance by 40%.",
          visible: true,
        },
        {
          id: 2,
          company: "Digital Innovations",
          position: "Web Developer",
          location: "Portland, OR",
          startDate: "2018-03",
          endDate: "2020-12",
          current: false,
          description: "Developed responsive web applications using modern JavaScript frameworks. Collaborated with design team to implement UI/UX improvements.",
          visible: true,
        },
      ],
    },
    education: {
      visible: true,
      items: [
        {
          id: 1,
          institution: "University of Technology",
          degree: "Bachelor of Science in Computer Science",
          location: "Boston, MA",
          startDate: "2014-09",
          endDate: "2018-05",
          description: "Graduated with honors. Specialized in software engineering and web technologies.",
          visible: true,
        },
      ],
    },
    skills: {
      visible: true,
      technical: [
        "JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "PostgreSQL", 
        "AWS", "Docker", "Git", "CI/CD", "HTML/CSS", "Tailwind CSS", "RESTful APIs"
      ],
      soft: [
        "Problem Solving", "Team Collaboration", "Communication", "Project Management", 
        "Agile Methodologies", "Time Management"
      ],
    },
    projects: {
      visible: true,
      items: [
        {
          id: 1,
          title: "E-commerce Platform",
          description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Implemented payment processing, user authentication, and inventory management.",
          technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
          link: "https://github.com/johndoe/ecommerce",
          visible: true,
        },
        {
          id: 2,
          title: "Task Management App",
          description: "Developed a collaborative task management application with real-time updates using Socket.io and React.",
          technologies: ["React", "Express", "Socket.io", "PostgreSQL"],
          link: "https://github.com/johndoe/taskmanager",
          visible: true,
        },
      ],
    },
    certifications: {
      visible: true,
      items: [
        {
          id: 1,
          name: "AWS Certified Developer",
          issuer: "Amazon Web Services",
          date: "2022-06",
          link: "https://aws.amazon.com/certification/",
          visible: true,
        },
        {
          id: 2,
          name: "Professional Scrum Master I",
          issuer: "Scrum.org",
          date: "2021-03",
          link: "https://www.scrum.org/",
          visible: true,
        },
      ],
    },
  })

  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [shareLink, setShareLink] = useState("")

  const handleSectionVisibility = (section: string, visible: boolean) => {
    setResumeSections({
      ...resumeSections,
      [section]: {
        ...resumeSections[section as keyof typeof resumeSections],
        visible,
      },
    })
  }

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeSections({
      ...resumeSections,
      personal: {
        ...resumeSections.personal,
        [field]: value,
      },
    })
  }

  const handleGenerateShareLink = () => {
    // In a real app, this would generate a unique link to a hosted version of the resume
    setShareLink("https://portfolio.com/resume/john-doe-12345")
  }

  const formatDate = (dateString: string) => {
    if (dateString === "Present") return "Present"
    
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short' })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resume Generator</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create and customize your professional resume.
          </p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume Settings</CardTitle>
              <CardDescription>
                Customize your resume appearance and sections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="template">Template Style</Label>
                <Select defaultValue={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Visible Sections</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="toggle-personal" className="cursor-pointer">Personal Information</Label>
                    <Switch 
                      id="toggle-personal" 
                      checked={resumeSections.personal.visible}
                      onCheckedChange={(checked) => handleSectionVisibility("personal", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="toggle-experience" className="cursor-pointer">Experience</Label>
                    <Switch 
                      id="toggle-experience" 
                      checked={resumeSections.experience.visible}
                      onCheckedChange={(checked) => handleSectionVisibility("experience", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="toggle-education" className="cursor-pointer">Education</Label>
                    <Switch 
                      id="toggle-education" 
                      checked={resumeSections.education.visible}
                      onCheckedChange={(checked) => handleSectionVisibility("education", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="toggle-skills" className="cursor-pointer">Skills</Label>
                    <Switch 
                      id="toggle-skills" 
                      checked={resumeSections.skills.visible}
                      onCheckedChange={(checked) => handleSectionVisibility("skills", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="toggle-projects" className="cursor-pointer">Projects</Label>
                    <Switch 
                      id="toggle-projects" 
                      checked={resumeSections.projects.visible}
                      onCheckedChange={(checked) => handleSectionVisibility("projects", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="toggle-certifications" className="cursor-pointer">Certifications</Label>
                    <Switch 
                      id="toggle-certifications" 
                      checked={resumeSections.certifications.visible}
                      onCheckedChange={(checked) => handleSectionVisibility("certifications", checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Share Options</Label>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleGenerateShareLink}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Generate Shareable Link
                  </Button>
                  {shareLink && (
                    <div className="flex items-center space-x-2">
                      <Input value={shareLink} readOnly />
                      <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(shareLink)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <Button variant="outline" className="w-full justify-start">
                    <Share className="mr-2 h-4 w-4" />
                    Share via Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-teal-500 hover:bg-teal-600">
                <Download className="mr-2 h-4 w-4" />
                Download as PDF
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download as DOCX
              </Button>
              <Button variant="outline" className="w-full">
                <ArrowDown className="mr-2 h-4 w-4\
\
