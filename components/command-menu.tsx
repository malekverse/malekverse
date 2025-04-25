"use client"

import { useState, useEffect, useRef } from "react"
import { Command } from "cmdk"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Briefcase,
  FolderKanban,
  Layers,
  Music,
  MessageSquare,
  Download,
  X,
  Search,
  CommandIcon,
} from "lucide-react"

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }

      if (e.key === "Escape" && open) {
        e.preventDefault()
        setOpen(false)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open])

  useEffect(() => {
    const trigger = document.getElementById("command-menu-trigger")
    if (trigger) {
      trigger.addEventListener("click", () => setOpen(true))
    }

    return () => {
      if (trigger) {
        trigger.removeEventListener("click", () => setOpen(true))
      }
    }
  }, [])

  useEffect(() => {
    if (open && inputRef.current) {
      // Focus the input when the menu opens
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  const sections = [
    { id: "about", label: "About", icon: <User size={16} /> },
    { id: "work", label: "Work Experience", icon: <Briefcase size={16} /> },
    { id: "projects", label: "Projects", icon: <FolderKanban size={16} /> },
    { id: "stack", label: "Tech Stack", icon: <Layers size={16} /> },
    { id: "music", label: "Music", icon: <Music size={16} /> },
    { id: "contact", label: "Contact", icon: <MessageSquare size={16} /> },
  ]

  const actions = [{ id: "resume", label: "Download Resume", icon: <Download size={16} /> }]

  return (
    <>
      <button
        id="command-menu-trigger"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3 py-2 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-colors md:hidden"
        aria-label="Command Menu"
      >
        <CommandIcon size={18} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-navy-500 rounded-lg shadow-xl overflow-hidden w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Command className="border-none [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-500 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-3">
                  <Search className="mr-2 h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400" />
                  <Command.Input
                    ref={inputRef}
                    placeholder="Type a command or search..."
                    className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-50"
                    autoFocus
                  />
                  <button onClick={() => setOpen(false)} className="p-1">
                    <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                  <Command.Empty className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    No results found.
                  </Command.Empty>
                  <Command.Group heading="Navigation">
                    {sections.map((section) => (
                      <Command.Item
                        key={section.id}
                        onSelect={() => {
                          document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                          setOpen(false)
                        }}
                        className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-navy-400 rounded-md"
                      >
                        {section.icon}
                        <span>{section.label}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                  <Command.Group heading="Actions">
                    {actions.map((action) => (
                      <Command.Item
                        key={action.id}
                        onSelect={() => {
                          if (action.id === "resume") {
                            // Handle resume download
                            window.open("/resume.pdf", "_blank")
                          }
                          setOpen(false)
                        }}
                        className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-navy-400 rounded-md"
                      >
                        {action.icon}
                        <span>{action.label}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
