"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import { DashboardOverview } from "@/components/admin/dashboard-overview"
import { PortfolioManager } from "@/components/admin/portfolio-manager"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"
import { ContactManager } from "@/components/admin/contact-manager"
import { AIContentAssistant } from "@/components/admin/ai-content-assistant"
import { FileManager } from "@/components/admin/file-manager"
import { ResumeGenerator } from "@/components/admin/resume-generator"
import { LearningTracker } from "@/components/admin/learning-tracker"
import { CalendarView } from "@/components/admin/calendar-view"
import { SkillsTracker } from "@/components/admin/skills-tracker"
import { JobApplicationsTracker } from "@/components/admin/job-applications-tracker"
import { ContentHub } from "@/components/admin/content-hub/content-hub"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState("overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "portfolio":
        return <PortfolioManager />
      case "analytics":
        return <AnalyticsDashboard />
      case "contacts":
        return <ContactManager />
      case "ai-assistant":
        return <AIContentAssistant />
      case "files":
        return <FileManager />
      case "resume":
        return <ResumeGenerator />
      case "learning":
        return <LearningTracker />
      case "calendar":
        return <CalendarView />
      case "skills":
        return <SkillsTracker />
      case "jobs":
        return <JobApplicationsTracker />
      case "content-hub":
        return <ContentHub />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} isOpen={isSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader onLogout={onLogout} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{renderActiveSection()}</main>
      </div>
    </div>
  )
}
