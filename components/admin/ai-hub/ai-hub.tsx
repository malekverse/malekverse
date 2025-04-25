"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonalDevFeed } from "./personal-dev-feed"
import { PortfolioVisitorTracker } from "./portfolio-visitor-tracker"
import { AIMentorshipAssistant } from "./ai-mentorship-assistant"
import { ProjectLandingPageBuilder } from "./project-landing-page-builder"
import { IdeaIncubator } from "./idea-incubator"
import { AutoTutorialCreator } from "./auto-tutorial-creator"
import { SkillGraph } from "./skill-graph"
import { NetworkingRadar } from "./networking-radar"
import { ConferenceTracker } from "./conference-tracker"
import { PortfolioWatcher } from "./portfolio-watcher"
import { Bot, Users, Lightbulb, Rocket, FlaskConical, Video, Network, Radio, Calendar, Eye } from "lucide-react"

export function AIHub() {
  const [activeTab, setActiveTab] = useState("dev-feed")

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">AI Hub</CardTitle>
          <CardDescription>
            Your personal brand OS - automated, intelligent, and highly interactive tools to elevate your online
            presence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="dev-feed" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span className="hidden md:inline">Dev Feed</span>
              </TabsTrigger>
              <TabsTrigger value="visitors" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden md:inline">Visitors</span>
              </TabsTrigger>
              <TabsTrigger value="mentorship" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden md:inline">Mentorship</span>
              </TabsTrigger>
              <TabsTrigger value="landing-page" className="flex items-center gap-2">
                <Rocket className="h-4 w-4" />
                <span className="hidden md:inline">Landing Page</span>
              </TabsTrigger>
              <TabsTrigger value="idea-incubator" className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                <span className="hidden md:inline">Ideas</span>
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span className="hidden md:inline">Tutorials</span>
              </TabsTrigger>
              <TabsTrigger value="skill-graph" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                <span className="hidden md:inline">Skills</span>
              </TabsTrigger>
              <TabsTrigger value="networking" className="flex items-center gap-2">
                <Radio className="h-4 w-4" />
                <span className="hidden md:inline">Networking</span>
              </TabsTrigger>
              <TabsTrigger value="conferences" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden md:inline">Events</span>
              </TabsTrigger>
              <TabsTrigger value="portfolio-watcher" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="hidden md:inline">Watcher</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dev-feed" className="space-y-4">
              <PersonalDevFeed />
            </TabsContent>

            <TabsContent value="visitors" className="space-y-4">
              <PortfolioVisitorTracker />
            </TabsContent>

            <TabsContent value="mentorship" className="space-y-4">
              <AIMentorshipAssistant />
            </TabsContent>

            <TabsContent value="landing-page" className="space-y-4">
              <ProjectLandingPageBuilder />
            </TabsContent>

            <TabsContent value="idea-incubator" className="space-y-4">
              <IdeaIncubator />
            </TabsContent>

            <TabsContent value="tutorials" className="space-y-4">
              <AutoTutorialCreator />
            </TabsContent>

            <TabsContent value="skill-graph" className="space-y-4">
              <SkillGraph />
            </TabsContent>

            <TabsContent value="networking" className="space-y-4">
              <NetworkingRadar />
            </TabsContent>

            <TabsContent value="conferences" className="space-y-4">
              <ConferenceTracker />
            </TabsContent>

            <TabsContent value="portfolio-watcher" className="space-y-4">
              <PortfolioWatcher />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
