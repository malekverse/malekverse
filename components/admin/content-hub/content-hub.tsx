"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmartContentComposer } from "./smart-content-composer"
import { ContentScheduler } from "./content-scheduler"
import { PlatformIntegrations } from "./platform-integrations"
import { ContentIdeas } from "./content-ideas"
import { WeeklyRecapGenerator } from "./weekly-recap-generator"
import { ContentAnalytics } from "./content-analytics"

export function ContentHub() {
  const [activeTab, setActiveTab] = useState("composer")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Content Automation & Publishing Hub</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Create, schedule, and publish content across your portfolio and social platforms.
          </p>
        </div>
      </div>

      <Tabs defaultValue="composer" className="space-y-6" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="composer">Composer</TabsTrigger>
          <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
          <TabsTrigger value="recap">Weekly Recap</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="composer" className="space-y-4">
          <SmartContentComposer />
        </TabsContent>

        <TabsContent value="scheduler" className="space-y-4">
          <ContentScheduler />
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <PlatformIntegrations />
        </TabsContent>

        <TabsContent value="ideas" className="space-y-4">
          <ContentIdeas />
        </TabsContent>

        <TabsContent value="recap" className="space-y-4">
          <WeeklyRecapGenerator />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <ContentAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
