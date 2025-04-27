"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export function AIHub() {
  const [activeTab, setActiveTab] = useState("dev-feed")

  const tabs = [
    { id: "dev-feed", label: "Personal Dev Feed" },
    { id: "visitor-tracker", label: "Portfolio Visitor Tracker" },
    { id: "mentorship", label: "AI Mentorship Assistant" },
    { id: "landing-page", label: "Project Landing Page Builder" },
    { id: "idea-incubator", label: "Idea Incubator" },
    { id: "tutorial-creator", label: "Auto Tutorial Creator" },
    { id: "skill-graph", label: "Skill Graph" },
    { id: "networking", label: "Networking Radar" },
    { id: "conferences", label: "Conference Tracker" },
    { id: "portfolio-watcher", label: "Portfolio Watcher" },
  ]

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case "dev-feed":
        return <PersonalDevFeed />
      case "visitor-tracker":
        return <PortfolioVisitorTracker />
      case "mentorship":
        return <AIMentorshipAssistant />
      case "landing-page":
        return <ProjectLandingPageBuilder />
      case "idea-incubator":
        return <IdeaIncubator />
      case "tutorial-creator":
        return <AutoTutorialCreator />
      case "skill-graph":
        return <SkillGraph />
      case "networking":
        return <NetworkingRadar />
      case "conferences":
        return <ConferenceTracker />
      case "portfolio-watcher":
        return <PortfolioWatcher />
      default:
        return <div>Select a tab</div>
    }
  }

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-bold">AI Hub</h2>
      <p className="text-muted-foreground">
        Your personal AI assistant for portfolio management, career growth, and content creation.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="text-xs md:text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">{renderTabContent(activeTab)}</div>
      </Tabs>
    </div>
  )
}
