"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronLeft,
  FileText,
  FolderOpen,
  GraduationCap,
  Home,
  ImageIcon,
  LayoutDashboard,
  Mail,
  Settings,
  Sparkles,
  Rss,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

interface AdminSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  isOpen: boolean
}

export function AdminSidebar({ activeSection, setActiveSection, isOpen }: AdminSidebarProps) {
  const isMobile = useMobile()

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: "portfolio", label: "Portfolio", icon: <ImageIcon size={20} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
    { id: "contacts", label: "Contacts", icon: <Mail size={20} /> },
    { id: "content-hub", label: "Content Hub", icon: <Rss size={20} /> },
    { id: "ai-assistant", label: "AI Assistant", icon: <Sparkles size={20} /> },
    { id: "files", label: "Files", icon: <FolderOpen size={20} /> },
    { id: "resume", label: "Resume", icon: <FileText size={20} /> },
    { id: "learning", label: "Learning", icon: <BookOpen size={20} /> },
    { id: "calendar", label: "Calendar", icon: <Calendar size={20} /> },
    { id: "skills", label: "Skills", icon: <GraduationCap size={20} /> },
    { id: "jobs", label: "Job Applications", icon: <Briefcase size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ]

  // If mobile and sidebar is open, render a full-screen sidebar
  if (isMobile && isOpen) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="fixed inset-0 z-50 bg-white/95 dark:bg-gray-900/95 shadow-xl"
        >
          <div className="flex h-full flex-col p-4">
            <div className="mb-8 flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-xl font-bold">Admin</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setActiveSection(activeSection)} className="md:hidden">
                <ChevronLeft size={20} />
              </Button>
            </div>
            <nav className="space-y-1 flex-1 overflow-y-auto">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    activeSection === item.id
                      ? "bg-teal-500/10 text-teal-500"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              {/* Settings moved to main navigation */}
              <Link
                href="/"
                className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mt-1"
              >
                <Home size={20} />
                <span>Back to Site</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 240, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="hidden md:block h-full border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        >
          <div className="flex h-full flex-col p-4">
            <div className="mb-8 flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-bold">Admin Dashboard</span>
            </div>
            <nav className="space-y-1 flex-1 overflow-y-auto">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    activeSection === item.id
                      ? "bg-teal-500/10 text-teal-500"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              {/* Settings moved to main navigation */}
              <Link
                href="/"
                className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mt-1"
              >
                <Home size={20} />
                <span>Back to Site</span>
              </Link>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
