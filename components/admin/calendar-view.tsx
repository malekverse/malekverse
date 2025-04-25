"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Event = {
  id: number
  title: string
  date: string
  time?: string
  type: "course" | "deadline" | "meeting" | "reminder"
  description?: string
  completed?: boolean
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "React Advanced Course - Module 3",
      date: "2023-12-05",
      time: "18:00",
      type: "course",
      description: "Complete module 3 of the React Advanced course on Frontend Masters",
    },
    {
      id: 2,
      title: "Portfolio Project Deadline",
      date: "2023-12-15",
      type: "deadline",
      description: "Submit final version of the e-commerce dashboard project",
    },
    {
      id: 3,
      title: "Meeting with Mentor",
      date: "2023-12-07",
      time: "14:30",
      type: "meeting",
      description: "Virtual coffee chat with Alex to discuss career progression",
    },
    {
      id: 4,
      title: "Complete TypeScript Course",
      date: "2023-12-20",
      type: "deadline",
      description: "Finish all modules and submit final project",
    },
    {
      id: 5,
      title: "Tech Meetup - Frontend Innovations",
      date: "2023-12-12",
      time: "19:00",
      type: "meeting",
      description: "Virtual meetup with presentations on latest frontend technologies",
    },
  ])
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({
    title: "",
    date: "",
    time: "",
    type: "reminder",
    description: "",
  })
  const [viewMode, setViewMode] = useState<"month" | "week">("month")
  const [isAddingEvent, setIsAddingEvent] = useState(false)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return

    const eventToAdd = {
      ...newEvent,
      id: events.length + 1,
    }

    setEvents([...events, eventToAdd])
    setNewEvent({
      title: "",
      date: "",
      time: "",
      type: "reminder",
      description: "",
    })
    setIsAddingEvent(false)
  }

  const getEventsForDate = (dateString: string) => {
    return events.filter((event) => event.date === dateString)
  }

  const renderMonthView = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-24 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50"
        ></div>,
      )
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      const dayEvents = getEventsForDate(dateString)
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 dark:border-gray-800 p-1 overflow-hidden ${
            isToday ? "bg-teal-50 dark:bg-teal-900/10 border-teal-200 dark:border-teal-800" : ""
          }`}
        >
          <div className="flex justify-between items-center">
            <span className={`text-sm font-medium ${isToday ? "text-teal-600 dark:text-teal-400" : ""}`}>{day}</span>
            {dayEvents.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {dayEvents.length}
              </Badge>
            )}
          </div>
          <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-20px)]">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded truncate ${
                  event.type === "course"
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                    : event.type === "deadline"
                      ? "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                      : event.type === "meeting"
                        ? "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300"
                        : "bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300"
                }`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 pl-1">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>,
      )
    }

    return (
      <div className="grid grid-cols-7 gap-px">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center py-2 font-medium text-sm bg-gray-50 dark:bg-gray-800">
            {day}
          </div>
        ))}
        {days}
      </div>
    )
  }

  const renderWeekView = () => {
    // Get the start of the current week (Sunday)
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    const days = []

    // Create an array of 7 days starting from the start of the week
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)

      const dateString = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`
      const dayEvents = getEventsForDate(dateString)
      const isToday = new Date().toDateString() === day.toDateString()

      days.push(
        <div key={i} className="flex flex-col">
          <div
            className={`text-center py-2 font-medium text-sm ${
              isToday
                ? "bg-teal-50 dark:bg-teal-900/10 text-teal-600 dark:text-teal-400"
                : "bg-gray-50 dark:bg-gray-800"
            }`}
          >
            {daysOfWeek[i]}
            <div className={`text-lg ${isToday ? "text-teal-600 dark:text-teal-400" : ""}`}>{day.getDate()}</div>
          </div>
          <div className="flex-1 border border-gray-200 dark:border-gray-800 p-2 space-y-2 min-h-[300px]">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className={`p-2 rounded text-sm ${
                  event.type === "course"
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                    : event.type === "deadline"
                      ? "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                      : event.type === "meeting"
                        ? "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300"
                        : "bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300"
                }`}
              >
                <div className="font-medium">{event.title}</div>
                {event.time && (
                  <div className="text-xs flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {event.time}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>,
      )
    }

    return <div className="grid grid-cols-7 gap-px">{days}</div>
  }

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Learning Calendar</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Schedule and track your learning activities, deadlines, and meetings
          </p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
            <DialogTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Calendar Event</DialogTitle>
                <DialogDescription>Create a new event for your learning schedule</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input
                    id="event-title"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="event-date">Date</Label>
                    <Input
                      id="event-date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="event-time">Time (optional)</Label>
                    <Input
                      id="event-time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value: "course" | "deadline" | "meeting" | "reminder") =>
                      setNewEvent({ ...newEvent, type: value })
                    }
                  >
                    <SelectTrigger id="event-type">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="course">Course Session</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-description">Description (optional)</Label>
                  <Textarea
                    id="event-description"
                    placeholder="Add details about this event"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingEvent(false)}>
                  Cancel
                </Button>
                <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleAddEvent}>
                  Add Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" onClick={viewMode === "month" ? handlePrevMonth : handlePrevWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-bold">
                {viewMode === "month"
                  ? `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                  : `Week of ${new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
              </h2>
              <Button variant="outline" size="icon" onClick={viewMode === "month" ? handleNextMonth : handleNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("month")}
                className={viewMode === "month" ? "bg-teal-500 hover:bg-teal-600" : ""}
              >
                Month
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
                className={viewMode === "week" ? "bg-teal-500 hover:bg-teal-600" : ""}
              >
                Week
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>{viewMode === "month" ? renderMonthView() : renderWeekView()}</CardContent>
        <CardFooter className="border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm">Course</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm">Deadline</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm">Meeting</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-sm">Reminder</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your scheduled learning activities for the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .filter((event) => {
                const eventDate = new Date(event.date)
                const today = new Date()
                const nextWeek = new Date()
                nextWeek.setDate(today.getDate() + 7)
                return eventDate >= today && eventDate <= nextWeek
              })
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start p-3 rounded-md border border-gray-200 dark:border-gray-800">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                        event.type === "course"
                          ? "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : event.type === "deadline"
                            ? "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                            : event.type === "meeting"
                              ? "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                              : "bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{event.title}</h3>
                        <Badge variant="outline">
                          {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          {event.time && ` • ${event.time}`}
                        </Badge>
                      </div>
                      {event.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{event.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            {events.filter((event) => {
              const eventDate = new Date(event.date)
              const today = new Date()
              const nextWeek = new Date()
              nextWeek.setDate(today.getDate() + 7)
              return eventDate >= today && eventDate <= nextWeek
            }).length === 0 && (
              <div className="text-center py-6">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No upcoming events</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  You don't have any events scheduled for the next 7 days
                </p>
                <Button className="mt-4 bg-teal-500 hover:bg-teal-600" onClick={() => setIsAddingEvent(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
