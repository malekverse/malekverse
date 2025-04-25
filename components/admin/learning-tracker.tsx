"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Check, Edit, Link2, MoreHorizontal, Plus, Trash, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LearningTracker() {
  const [activeTab, setActiveTab] = useState("courses")
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [itemType, setItemType] = useState<"course" | "book" | "tutorial" | "goal" | "contact">("course")

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Advanced React Patterns",
      platform: "Frontend Masters",
      instructor: "Kent C. Dodds",
      startDate: "2023-10-15",
      endDate: "",
      progress: 75,
      status: "In Progress",
      notes: "Learning about compound components, render props, and custom hooks.",
      link: "https://frontendmasters.com/courses/advanced-react-patterns/",
    },
    {
      id: 2,
      title: "Data Visualization with D3",
      platform: "Udemy",
      instructor: "Sarah Johnson",
      startDate: "2023-09-20",
      endDate: "",
      progress: 40,
      status: "In Progress",
      notes: "Working through interactive chart creation and animations.",
      link: "https://udemy.com/course/data-visualization-d3",
    },
    {
      id: 3,
      title: "TypeScript Deep Dive",
      platform: "egghead.io",
      instructor: "Mike Williams",
      startDate: "2023-08-10",
      endDate: "2023-09-15",
      progress: 100,
      status: "Completed",
      notes: "Learned advanced type system features and practical applications.",
      link: "https://egghead.io/courses/typescript-deep-dive",
    },
  ])

  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Refactoring UI",
      author: "Adam Wathan & Steve Schoger",
      startDate: "2023-11-01",
      endDate: "",
      progress: 60,
      status: "In Progress",
      notes: "Great insights on design systems and visual hierarchy.",
      link: "https://refactoringui.com/book",
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      startDate: "2023-09-05",
      endDate: "2023-10-20",
      progress: 100,
      status: "Completed",
      notes: "Essential principles for writing maintainable code.",
      link: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
    },
  ])

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Learn GraphQL and Apollo",
      category: "Technical Skill",
      deadline: "2023-12-31",
      progress: 25,
      status: "In Progress",
      description: "Master GraphQL API development with Apollo Client and Server.",
      resources: ["Apollo Docs", "GraphQL Course", "GitHub Examples"],
    },
    {
      id: 2,
      title: "Build 3 Portfolio Projects",
      category: "Career",
      deadline: "2024-03-31",
      progress: 33,
      status: "In Progress",
      description: "Create three high-quality projects showcasing different skills.",
      resources: ["Project Ideas Doc", "Design Inspiration", "GitHub Repos"],
    },
    {
      id: 3,
      title: "Contribute to Open Source",
      category: "Community",
      deadline: "2024-06-30",
      progress: 10,
      status: "In Progress",
      description: "Make meaningful contributions to at least 2 open source projects.",
      resources: ["Good First Issues", "Contributing Guidelines"],
    },
  ])

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      role: "Senior Developer at TechCorp",
      email: "alex@example.com",
      lastContact: "2023-11-10",
      notes: "Met at React Conference. Discussed potential mentorship opportunities.",
      tags: ["Mentor", "React", "Career Advice"],
    },
    {
      id: 2,
      name: "Sarah Miller",
      role: "Tech Recruiter",
      email: "sarah@techjobs.com",
      lastContact: "2023-10-25",
      notes: "Reached out about senior positions. Follow up in December.",
      tags: ["Recruiter", "Job Opportunities"],
    },
    {
      id: 3,
      name: "David Chen",
      role: "Startup Founder",
      email: "david@startup.io",
      lastContact: "2023-11-05",
      notes: "Interested in collaboration on side project. Scheduling call next week.",
      tags: ["Networking", "Collaboration", "Startup"],
    },
  ])

  const [newItem, setNewItem] = useState({
    course: {
      title: "",
      platform: "",
      instructor: "",
      startDate: "",
      endDate: "",
      progress: 0,
      status: "Not Started",
      notes: "",
      link: "",
    },
    book: {
      title: "",
      author: "",
      startDate: "",
      endDate: "",
      progress: 0,
      status: "Not Started",
      notes: "",
      link: "",
    },
    goal: {
      title: "",
      category: "",
      deadline: "",
      progress: 0,
      status: "Not Started",
      description: "",
      resources: [],
    },
    contact: {
      name: "",
      role: "",
      email: "",
      lastContact: "",
      notes: "",
      tags: [],
    },
  })

  const handleAddItem = () => {
    setIsAddingItem(true)
    setItemType(
      activeTab === "courses" ? "course" : activeTab === "books" ? "book" : activeTab === "goals" ? "goal" : "contact",
    )
  }

  const handleCancelAdd = () => {
    setIsAddingItem(false)
  }

  const handleSaveItem = () => {
    // In a real app, you would save to a database
    if (itemType === "course") {
      setCourses([...courses, { ...newItem.course, id: courses.length + 1 }])
    } else if (itemType === "book") {
      setBooks([...books, { ...newItem.book, id: books.length + 1 }])
    } else if (itemType === "goal") {
      setGoals([...goals, { ...newItem.goal, id: goals.length + 1 }])
    } else if (itemType === "contact") {
      setContacts([...contacts, { ...newItem.contact, id: contacts.length + 1 }])
    }

    setIsAddingItem(false)
    // Reset form
    setNewItem({
      ...newItem,
      [itemType]: {
        ...newItem[itemType],
        title: "",
        platform: "",
        author: "",
        name: "",
        role: "",
        category: "",
        progress: 0,
        status: "Not Started",
        notes: "",
        link: "",
        email: "",
        lastContact: "",
        deadline: "",
        description: "",
        resources: [],
        tags: [],
      },
    })
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Present"

    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Learning Tracker</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your courses, books, learning goals, and professional contacts.
          </p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleAddItem}>
            <Plus className="mr-2 h-4 w-4" />
            Add{" "}
            {activeTab === "courses"
              ? "Course"
              : activeTab === "books"
                ? "Book"
                : activeTab === "goals"
                  ? "Goal"
                  : "Contact"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="courses" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="goals">Learning Goals</TabsTrigger>
          <TabsTrigger value="contacts">Professional Network</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          {isAddingItem && itemType === "course" ? (
            <Card>
              <CardHeader>
                <CardTitle>Add New Course</CardTitle>
                <CardDescription>Track a new course you're taking or planning to take</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-title">Course Title</Label>
                    <Input
                      id="course-title"
                      placeholder="Enter course title"
                      value={newItem.course.title}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          course: { ...newItem.course, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-platform">Platform</Label>
                    <Input
                      id="course-platform"
                      placeholder="e.g. Udemy, Coursera, etc."
                      value={newItem.course.platform}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          course: { ...newItem.course, platform: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-instructor">Instructor</Label>
                    <Input
                      id="course-instructor"
                      placeholder="Course instructor name"
                      value={newItem.course.instructor}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          course: { ...newItem.course, instructor: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-link">Course Link</Label>
                    <Input
                      id="course-link"
                      placeholder="https://"
                      value={newItem.course.link}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          course: { ...newItem.course, link: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-start-date">Start Date</Label>
                    <Input
                      id="course-start-date"
                      type="date"
                      value={newItem.course.startDate}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          course: { ...newItem.course, startDate: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course-status">Status</Label>
                    <Select
                      defaultValue="Not Started"
                      onValueChange={(value) =>
                        setNewItem({
                          ...newItem,
                          course: { ...newItem.course, status: value },
                        })
                      }
                    >
                      <SelectTrigger id="course-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not Started">Not Started</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="course-progress">Progress ({newItem.course.progress}%)</Label>
                    <Input
                      id="course-progress"
                      type="range"
                      min="0"
                      max="100"
                      value={newItem.course.progress}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          course: { ...newItem.course, progress: Number.parseInt(e.target.value) },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="course-notes">Notes</Label>
                    <Textarea
                      id="course-notes"
                      placeholder="Add any notes about the course"
                      rows={3}
                      value={newItem.course.notes}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          course: { ...newItem.course, notes: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCancelAdd}>
                  Cancel
                </Button>
                <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleSaveItem}>
                  Save Course
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge
                            className={
                              course.status === "Completed"
                                ? "bg-green-500"
                                : course.status === "In Progress"
                                  ? "bg-blue-500"
                                  : course.status === "On Hold"
                                    ? "bg-amber-500"
                                    : "bg-gray-500"
                            }
                          >
                            {course.status}
                          </Badge>
                          <CardTitle className="mt-2">{course.title}</CardTitle>
                          <CardDescription>{course.platform}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Check className="h-4 w-4 mr-2" />
                              Mark as Complete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 flex-grow">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Instructor</p>
                          <p className="text-sm font-medium">{course.instructor}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{course.progress}% complete</span>
                              <span>
                                {formatDate(course.startDate)} - {formatDate(course.endDate)}
                              </span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        </div>
                        {course.notes && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Notes</p>
                            <p className="text-sm">{course.notes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      {course.link && (
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href={course.link} target="_blank" rel="noopener noreferrer">
                            <Link2 className="h-4 w-4 mr-2" />
                            Open Course
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="books" className="space-y-4">
          {isAddingItem && itemType === "book" ? (
            <Card>
              <CardHeader>
                <CardTitle>Add New Book</CardTitle>
                <CardDescription>Track a new book you're reading or planning to read</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="book-title">Book Title</Label>
                    <Input
                      id="book-title"
                      placeholder="Enter book title"
                      value={newItem.book.title}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          book: { ...newItem.book, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="book-author">Author</Label>
                    <Input
                      id="book-author"
                      placeholder="Book author"
                      value={newItem.book.author}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          book: { ...newItem.book, author: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="book-start-date">Start Date</Label>
                    <Input
                      id="book-start-date"
                      type="date"
                      value={newItem.book.startDate}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          book: { ...newItem.book, startDate: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="book-status">Status</Label>
                    <Select
                      defaultValue="Not Started"
                      onValueChange={(value) =>
                        setNewItem({
                          ...newItem,
                          book: { ...newItem.book, status: value },
                        })
                      }
                    >
                      <SelectTrigger id="book-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not Started">Not Started</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="book-link">Book Link</Label>
                    <Input
                      id="book-link"
                      placeholder="https://"
                      value={newItem.book.link}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          book: { ...newItem.book, link: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="book-progress">Progress ({newItem.book.progress}%)</Label>
                    <Input
                      id="book-progress"
                      type="range"
                      min="0"
                      max="100"
                      value={newItem.book.progress}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          book: { ...newItem.book, progress: Number.parseInt(e.target.value) },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="book-notes">Notes</Label>
                    <Textarea
                      id="book-notes"
                      placeholder="Add any notes about the book"
                      rows={3}
                      value={newItem.book.notes}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          book: { ...newItem.book, notes: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCancelAdd}>
                  Cancel
                </Button>
                <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleSaveItem}>
                  Save Book
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge
                            className={
                              book.status === "Completed"
                                ? "bg-green-500"
                                : book.status === "In Progress"
                                  ? "bg-blue-500"
                                  : book.status === "On Hold"
                                    ? "bg-amber-500"
                                    : "bg-gray-500"
                            }
                          >
                            {book.status}
                          </Badge>
                          <CardTitle className="mt-2">{book.title}</CardTitle>
                          <CardDescription>by {book.author}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Check className="h-4 w-4 mr-2" />
                              Mark as Complete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 flex-grow">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{book.progress}% complete</span>
                              <span>
                                {formatDate(book.startDate)} - {formatDate(book.endDate)}
                              </span>
                            </div>
                            <Progress value={book.progress} className="h-2" />
                          </div>
                        </div>
                        {book.notes && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Notes</p>
                            <p className="text-sm">{book.notes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      {book.link && (
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <a href={book.link} target="_blank" rel="noopener noreferrer">
                            <Link2 className="h-4 w-4 mr-2" />
                            View Book
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          {isAddingItem && itemType === "goal" ? (
            <Card>
              <CardHeader>
                <CardTitle>Add New Learning Goal</CardTitle>
                <CardDescription>Set a new learning goal or career objective</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal-title">Goal Title</Label>
                    <Input
                      id="goal-title"
                      placeholder="Enter goal title"
                      value={newItem.goal.title}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          goal: { ...newItem.goal, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goal-category">Category</Label>
                    <Select
                      defaultValue=""
                      onValueChange={(value) =>
                        setNewItem({
                          ...newItem,
                          goal: { ...newItem.goal, category: value },
                        })
                      }
                    >
                      <SelectTrigger id="goal-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technical Skill">Technical Skill</SelectItem>
                        <SelectItem value="Career">Career</SelectItem>
                        <SelectItem value="Community">Community</SelectItem>
                        <SelectItem value="Personal">Personal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goal-deadline">Deadline</Label>
                    <Input
                      id="goal-deadline"
                      type="date"
                      value={newItem.goal.deadline}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          goal: { ...newItem.goal, deadline: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goal-status">Status</Label>
                    <Select
                      defaultValue="Not Started"
                      onValueChange={(value) =>
                        setNewItem({
                          ...newItem,
                          goal: { ...newItem.goal, status: value },
                        })
                      }
                    >
                      <SelectTrigger id="goal-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Not Started">Not Started</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="goal-progress">Progress ({newItem.goal.progress}%)</Label>
                    <Input
                      id="goal-progress"
                      type="range"
                      min="0"
                      max="100"
                      value={newItem.goal.progress}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          goal: { ...newItem.goal, progress: Number.parseInt(e.target.value) },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="goal-description">Description</Label>
                    <Textarea
                      id="goal-description"
                      placeholder="Describe your goal in detail"
                      rows={3}
                      value={newItem.goal.description}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          goal: { ...newItem.goal, description: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCancelAdd}>
                  Cancel
                </Button>
                <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleSaveItem}>
                  Save Goal
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge
                            className={
                              goal.status === "Completed"
                                ? "bg-green-500"
                                : goal.status === "In Progress"
                                  ? "bg-blue-500"
                                  : goal.status === "On Hold"
                                    ? "bg-amber-500"
                                    : "bg-gray-500"
                            }
                          >
                            {goal.status}
                          </Badge>
                          <Badge variant="outline" className="ml-2">
                            {goal.category}
                          </Badge>
                          <CardTitle className="mt-2">{goal.title}</CardTitle>
                          <CardDescription>Deadline: {formatDate(goal.deadline)}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Check className="h-4 w-4 mr-2" />
                              Mark as Complete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 flex-grow">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>{goal.progress}% complete</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                          <p className="text-sm">{goal.description}</p>
                        </div>
                        {goal.resources && goal.resources.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Resources</p>
                            <ul className="text-sm list-disc list-inside">
                              {goal.resources.map((resource, index) => (
                                <li key={index}>{resource}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          {isAddingItem && itemType === "contact" ? (
            <Card>
              <CardHeader>
                <CardTitle>Add New Contact</CardTitle>
                <CardDescription>Add a professional contact to your network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      placeholder="Contact name"
                      value={newItem.contact.name}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          contact: { ...newItem.contact, name: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-role">Role / Position</Label>
                    <Input
                      id="contact-role"
                      placeholder="e.g. Senior Developer at Company"
                      value={newItem.contact.role}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          contact: { ...newItem.contact, role: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="email@example.com"
                      value={newItem.contact.email}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          contact: { ...newItem.contact, email: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-date">Last Contact Date</Label>
                    <Input
                      id="contact-date"
                      type="date"
                      value={newItem.contact.lastContact}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          contact: { ...newItem.contact, lastContact: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="contact-notes">Notes</Label>
                    <Textarea
                      id="contact-notes"
                      placeholder="Add notes about this contact"
                      rows={3}
                      value={newItem.contact.notes}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          contact: { ...newItem.contact, notes: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleCancelAdd}>
                  Cancel
                </Button>
                <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleSaveItem}>
                  Save Contact
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{contact.name}</CardTitle>
                          <CardDescription>{contact.role}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" />
                              Log Interaction
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 flex-grow">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-sm font-medium">{contact.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Last Contact</p>
                          <p className="text-sm">{formatDate(contact.lastContact)}</p>
                        </div>
                        {contact.notes && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Notes</p>
                            <p className="text-sm">{contact.notes}</p>
                          </div>
                        )}
                        {contact.tags && contact.tags.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Tags</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {contact.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Users className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
