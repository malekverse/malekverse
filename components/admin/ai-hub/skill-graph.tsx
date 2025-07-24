"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RefreshCw, Download, TrendingUp, Star, Clock, BookOpen } from "lucide-react"

// Mock data for the skill graph
const skillsData = [
  { name: "React", level: 90, projects: 15, experience: "4 years", category: "frontend" },
  { name: "TypeScript", level: 85, projects: 12, experience: "2.5 years", category: "language" },
  { name: "Next.js", level: 80, projects: 8, experience: "2 years", category: "frontend" },
  { name: "Node.js", level: 75, projects: 10, experience: "3 years", category: "backend" },
  { name: "Tailwind CSS", level: 85, projects: 14, experience: "2 years", category: "frontend" },
  { name: "GraphQL", level: 70, projects: 6, experience: "1.5 years", category: "backend" },
  { name: "PostgreSQL", level: 75, projects: 9, experience: "2.5 years", category: "database" },
  { name: "Docker", level: 65, projects: 7, experience: "1.5 years", category: "devops" },
  { name: "AWS", level: 60, projects: 5, experience: "1 year", category: "devops" },
  { name: "Jest", level: 70, projects: 8, experience: "2 years", category: "testing" },
]

// Mock data for learning recommendations
const learningRecommendations = [
  {
    name: "Rust",
    reason: "Growing in popularity for systems programming",
    difficulty: "High",
    timeToLearn: "3-6 months",
    category: "language",
  },
  {
    name: "WebAssembly",
    reason: "Complements your JavaScript skills",
    difficulty: "Medium",
    timeToLearn: "2-4 months",
    category: "language",
  },
  {
    name: "Svelte",
    reason: "Trending frontend framework",
    difficulty: "Low",
    timeToLearn: "2-4 weeks",
    category: "frontend",
  },
  {
    name: "Kubernetes",
    reason: "Natural progression from Docker",
    difficulty: "High",
    timeToLearn: "3-6 months",
    category: "devops",
  },
  {
    name: "Terraform",
    reason: "Extends your AWS knowledge",
    difficulty: "Medium",
    timeToLearn: "1-3 months",
    category: "devops",
  },
]

export function SkillGraph() {
  const [activeTab, setActiveTab] = useState("graph")
  const [filter, setFilter] = useState("all")

  const filteredSkills = filter === "all" ? skillsData : skillsData.filter((skill) => skill.category === filter)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Skill Graph & Growth Map
              </CardTitle>
              <CardDescription>
                Visualize your technical skills and get personalized learning recommendations
              </CardDescription>
            </div>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="graph">Skill Graph</TabsTrigger>
              <TabsTrigger value="details">Skill Details</TabsTrigger>
              <TabsTrigger value="recommendations">Learning Path</TabsTrigger>
            </TabsList>

            <div className="mb-4">
              <Label htmlFor="filter" className="text-sm">
                Filter by category
              </Label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger id="filter" className="mt-1">
                  <SelectValue placeholder="Filter skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="language">Languages</SelectItem>
                  <SelectItem value="database">Databases</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="graph" className="space-y-4">
              <div className="h-80 border rounded-md p-4 relative">
                {/* This would be a real chart in a production app */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-md">
                    {filteredSkills.map((skill, index) => (
                      <div key={index} className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {filteredSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="py-1">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="details">
              <div className="border rounded-md divide-y">
                {filteredSkills.map((skill, index) => (
                  <div key={index} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <div className="font-medium">{skill.name}</div>
                      <div className="text-sm text-muted-foreground">{skill.category}</div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 sm:mt-0">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{skill.level}% proficiency</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>{skill.experience}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <BookOpen className="h-4 w-4 text-green-500" />
                        <span>{skill.projects} projects</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommendations">
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-md p-4">
                  <h3 className="font-medium mb-1">AI Growth Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    Based on your current skills and industry trends, here are personalized learning recommendations.
                  </p>
                </div>

                <div className="border rounded-md divide-y">
                  {learningRecommendations.map((rec, index) => (
                    <div key={index} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{rec.name}</h4>
                        <Badge
                          variant={
                            rec.difficulty === "Low" ? "outline" : rec.difficulty === "Medium" ? "secondary" : "default"
                          }
                        >
                          {rec.difficulty} Difficulty
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Est. time to learn: {rec.timeToLearn}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export Skills
          </Button>
          <Button>Update Skills</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
