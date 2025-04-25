"use client"

import { useState } from "react"
import {
  ArrowUpDown,
  Briefcase,
  Building,
  Calendar,
  Check,
  Clock,
  FileText,
  Filter,
  Link2,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type JobApplication = {
  id: number
  company: string
  position: string
  location: string
  status: "applied" | "interviewing" | "offer" | "rejected" | "saved"
  appliedDate: string
  lastUpdated: string
  jobDescription?: string
  notes?: string
  contactPerson?: string
  contactEmail?: string
  salary?: string
  url?: string
  interviews?: {
    id: number
    date: string
    type: string
    notes?: string
    completed: boolean
  }[]
}

export function JobApplicationsTracker() {
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 1,
      company: "Tech Innovations Inc.",
      position: "Senior Frontend Developer",
      location: "San Francisco, CA (Remote)",
      status: "interviewing",
      appliedDate: "2023-11-15",
      lastUpdated: "2023-11-25",
      jobDescription: "Looking for an experienced frontend developer with React expertise to join our product team.",
      notes: "Had initial call with recruiter Sarah. Technical interview scheduled for next week.",
      contactPerson: "Sarah Johnson",
      contactEmail: "sarah@techinnovations.com",
      salary: "$120,000 - $150,000",
      url: "https://techinnovations.com/careers/senior-frontend",
      interviews: [
        {
          id: 1,
          date: "2023-11-20",
          type: "Initial Screening",
          notes: "30-minute call with recruiter. Discussed experience and role expectations.",
          completed: true,
        },
        {
          id: 2,
          date: "2023-11-28",
          type: "Technical Interview",
          notes: "1-hour technical assessment with senior engineers. Prepare React and system design questions.",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      company: "Digital Solutions",
      position: "Full Stack Developer",
      location: "Remote",
      status: "applied",
      appliedDate: "2023-11-22",
      lastUpdated: "2023-11-22",
      jobDescription: "Building web applications using React, Node.js, and PostgreSQL.",
      notes: "Applied through their careers page. Used referral from David.",
      contactPerson: "Hiring Manager",
      url: "https://digitalsolutions.io/jobs/full-stack-developer",
    },
    {
      id: 3,
      company: "Creative Agency",
      position: "Frontend Engineer",
      location: "New York, NY",
      status: "saved",
      appliedDate: "",
      lastUpdated: "2023-11-18",
      jobDescription: "Creating interactive web experiences for high-profile clients.",
      notes: "Looks interesting, need to tailor resume for creative focus.",
      url: "https://creativeagency.com/careers",
    },
    {
      id: 4,
      company: "Startup Ventures",
      position: "React Developer",
      location: "Austin, TX (Hybrid)",
      status: "rejected",
      appliedDate: "2023-11-05",
      lastUpdated: "2023-11-15",
      jobDescription: "Early-stage startup looking for React developers to build their MVP.",
      notes: "Received rejection email. They went with a candidate with more startup experience.",
      contactPerson: "Michael Brown",
      contactEmail: "michael@startupventures.com",
      url: "https://startupventures.com/jobs",
    },
    {
      id: 5,
      company: "Enterprise Solutions",
      position: "Senior Software Engineer",
      location: "Chicago, IL",
      status: "offer",
      appliedDate: "2023-10-25",
      lastUpdated: "2023-11-20",
      jobDescription: "Building enterprise-grade applications with modern JavaScript frameworks.",
      notes: "Received offer: $135k base, 15% bonus, good benefits package. Need to respond by Dec 1.",
      contactPerson: "Jennifer Lee",
      contactEmail: "jennifer@enterprise.com",
      salary: "$135,000 + 15% bonus",
      url: "https://enterprise.com/careers",
      interviews: [
        {
          id: 1,
          date: "2023-11-01",
          type: "Initial Screening",
          notes: "Call with HR",
          completed: true,
        },
        {
          id: 2,
          date: "2023-11-08",
          type: "Technical Interview",
          notes: "Coding assessment and system design",
          completed: true,
        },
        {
          id: 3,
          date: "2023-11-15",
          type: "Final Interview",
          notes: "Meeting with CTO and team lead",
          completed: true,
        },
      ],
    },
  ])

  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddingApplication, setIsAddingApplication] = useState(false)
  const [isViewingApplication, setIsViewingApplication] = useState<number | null>(null)
  const [isAddingInterview, setIsAddingInterview] = useState(false)
  const [sortBy, setSortBy] = useState<"date" | "company" | "status">("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const [newApplication, setNewApplication] = useState<Omit<JobApplication, "id" | "lastUpdated" | "interviews">>({
    company: "",
    position: "",
    location: "",
    status: "saved",
    appliedDate: "",
    jobDescription: "",
    notes: "",
    contactPerson: "",
    contactEmail: "",
    salary: "",
    url: "",
  })

  const [newInterview, setNewInterview] = useState({
    date: "",
    type: "",
    notes: "",
    completed: false,
  })

  const filteredApplications = applications
    .filter((app) => {
      // Filter by tab
      if (activeTab !== "all" && app.status !== activeTab) return false

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          app.company.toLowerCase().includes(query) ||
          app.position.toLowerCase().includes(query) ||
          app.location.toLowerCase().includes(query)
        )
      }

      return true
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        const dateA = a.lastUpdated || a.appliedDate || ""
        const dateB = b.lastUpdated || b.appliedDate || ""
        return sortDirection === "asc"
          ? new Date(dateA).getTime() - new Date(dateB).getTime()
          : new Date(dateB).getTime() - new Date(dateA).getTime()
      } else if (sortBy === "company") {
        return sortDirection === "asc" ? a.company.localeCompare(b.company) : b.company.localeCompare(a.company)
      } else if (sortBy === "status") {
        const statusOrder = {
          offer: 1,
          interviewing: 2,
          applied: 3,
          saved: 4,
          rejected: 5,
        }
        return sortDirection === "asc"
          ? statusOrder[a.status] - statusOrder[b.status]
          : statusOrder[b.status] - statusOrder[a.status]
      }
      return 0
    })

  const handleAddApplication = () => {
    if (!newApplication.company || !newApplication.position) return

    const applicationToAdd = {
      ...newApplication,
      id: applications.length + 1,
      lastUpdated: new Date().toISOString().split("T")[0],
      interviews: [],
    }

    setApplications([...applications, applicationToAdd])
    setNewApplication({
      company: "",
      position: "",
      location: "",
      status: "saved",
      appliedDate: "",
      jobDescription: "",
      notes: "",
      contactPerson: "",
      contactEmail: "",
      salary: "",
      url: "",
    })
    setIsAddingApplication(false)
  }

  const handleAddInterview = () => {
    if (!isViewingApplication || !newInterview.date || !newInterview.type) return

    const updatedApplications = applications.map((app) => {
      if (app.id === isViewingApplication) {
        const interviews = app.interviews || []
        return {
          ...app,
          interviews: [
            ...interviews,
            {
              id: interviews.length + 1,
              ...newInterview,
            },
          ],
          lastUpdated: new Date().toISOString().split("T")[0],
          status: app.status === "applied" ? "interviewing" : app.status,
        }
      }
      return app
    })

    setApplications(updatedApplications)
    setNewInterview({
      date: "",
      type: "",
      notes: "",
      completed: false,
    })
    setIsAddingInterview(false)
  }

  const handleUpdateInterviewStatus = (appId: number, interviewId: number, completed: boolean) => {
    const updatedApplications = applications.map((app) => {
      if (app.id === appId && app.interviews) {
        return {
          ...app,
          interviews: app.interviews.map((interview) =>
            interview.id === interviewId ? { ...interview, completed } : interview,
          ),
          lastUpdated: new Date().toISOString().split("T")[0],
        }
      }
      return app
    })

    setApplications(updatedApplications)
  }

  const handleUpdateApplicationStatus = (id: number, status: JobApplication["status"]) => {
    const updatedApplications = applications.map((app) => {
      if (app.id === id) {
        return {
          ...app,
          status,
          lastUpdated: new Date().toISOString().split("T")[0],
        }
      }
      return app
    })

    setApplications(updatedApplications)
  }

  const handleDeleteApplication = (id: number) => {
    setApplications(applications.filter((app) => app.id !== id))
    if (isViewingApplication === id) {
      setIsViewingApplication(null)
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"

    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const getStatusColor = (status: JobApplication["status"]) => {
    switch (status) {
      case "applied":
        return "bg-blue-500"
      case "interviewing":
        return "bg-purple-500"
      case "offer":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      case "saved":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: JobApplication["status"]) => {
    switch (status) {
      case "applied":
        return "Applied"
      case "interviewing":
        return "Interviewing"
      case "offer":
        return "Offer Received"
      case "rejected":
        return "Rejected"
      case "saved":
        return "Saved"
      default:
        return status
    }
  }

  const toggleSort = (column: "date" | "company" | "status") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("desc")
    }
  }

  const viewingApplication = applications.find((app) => app.id === isViewingApplication)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Applications Tracker</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track and manage your job applications and interviews
          </p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <Dialog open={isAddingApplication} onOpenChange={setIsAddingApplication}>
            <DialogTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Application
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Job Application</DialogTitle>
                <DialogDescription>Track a new job opportunity or application</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Company name"
                      value={newApplication.company}
                      onChange={(e) => setNewApplication({ ...newApplication, company: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      placeholder="Job title"
                      value={newApplication.position}
                      onChange={(e) => setNewApplication({ ...newApplication, position: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g. Remote, New York, NY"
                      value={newApplication.location}
                      onChange={(e) => setNewApplication({ ...newApplication, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newApplication.status}
                      onValueChange={(value: JobApplication["status"]) =>
                        setNewApplication({ ...newApplication, status: value })
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saved">Saved</SelectItem>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="interviewing">Interviewing</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="applied-date">Applied Date</Label>
                    <Input
                      id="applied-date"
                      type="date"
                      value={newApplication.appliedDate}
                      onChange={(e) => setNewApplication({ ...newApplication, appliedDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range (Optional)</Label>
                    <Input
                      id="salary"
                      placeholder="e.g. $80,000 - $100,000"
                      value={newApplication.salary}
                      onChange={(e) => setNewApplication({ ...newApplication, salary: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-url">Job Posting URL (Optional)</Label>
                  <Input
                    id="job-url"
                    placeholder="https://"
                    value={newApplication.url}
                    onChange={(e) => setNewApplication({ ...newApplication, url: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-person">Contact Person (Optional)</Label>
                    <Input
                      id="contact-person"
                      placeholder="Name of recruiter or hiring manager"
                      value={newApplication.contactPerson}
                      onChange={(e) => setNewApplication({ ...newApplication, contactPerson: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email (Optional)</Label>
                    <Input
                      id="contact-email"
                      placeholder="email@example.com"
                      value={newApplication.contactEmail}
                      onChange={(e) => setNewApplication({ ...newApplication, contactEmail: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job-description">Job Description (Optional)</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Paste the job description here"
                    rows={3}
                    value={newApplication.jobDescription}
                    onChange={(e) => setNewApplication({ ...newApplication, jobDescription: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes about this application"
                    rows={2}
                    value={newApplication.notes}
                    onChange={(e) => setNewApplication({ ...newApplication, notes: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingApplication(false)}>
                  Cancel
                </Button>
                <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleAddApplication}>
                  Add Application
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
            <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
            <TabsTrigger value="offer">Offers</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search applications..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toggleSort("date")}>
                <Calendar className="h-4 w-4 mr-2" />
                Date {sortBy === "date" && (sortDirection === "asc" ? "(Oldest)" : "(Newest)")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("company")}>
                <Building className="h-4 w-4 mr-2" />
                Company {sortBy === "company" && (sortDirection === "asc" ? "(A-Z)" : "(Z-A)")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("status")}>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Status {sortBy === "status" && (sortDirection === "asc" ? "(Ascending)" : "(Descending)")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Company</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead className="hidden md:table-cell">Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => (
                    <TableRow
                      key={application.id}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setIsViewingApplication(application.id)}
                    >
                      <TableCell className="font-medium">{application.company}</TableCell>
                      <TableCell>{application.position}</TableCell>
                      <TableCell className="hidden md:table-cell">{application.location}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(application.appliedDate)}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(application.status)} text-white`}>
                          {getStatusText(application.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setIsViewingApplication(application.id)
                                }}
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleUpdateApplicationStatus(application.id, "saved")
                                }}
                                disabled={application.status === "saved"}
                              >
                                <Briefcase className="h-4 w-4 mr-2" />
                                Saved
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleUpdateApplicationStatus(application.id, "applied")
                                }}
                                disabled={application.status === "applied"}
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Applied
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleUpdateApplicationStatus(application.id, "interviewing")
                                }}
                                disabled={application.status === "interviewing"}
                              >
                                <Calendar className="h-4 w-4 mr-2" />
                                Interviewing
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleUpdateApplicationStatus(application.id, "offer")
                                }}
                                disabled={application.status === "offer"}
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Offer Received
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleUpdateApplicationStatus(application.id, "rejected")
                                }}
                                disabled={application.status === "rejected"}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Rejected
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-500"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteApplication(application.id)
                                }}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Briefcase className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium">No applications found</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {searchQuery
                            ? "Try adjusting your search or filters"
                            : activeTab !== "all"
                              ? `You don't have any ${activeTab} applications`
                              : "Add your first job application to get started"}
                        </p>
                        {!searchQuery && activeTab === "all" && (
                          <Button
                            className="mt-4 bg-teal-500 hover:bg-teal-600"
                            onClick={() => setIsAddingApplication(true)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Application
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {viewingApplication && (
        <Dialog open={isViewingApplication !== null} onOpenChange={(open) => !open && setIsViewingApplication(null)}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle>{viewingApplication.position}</DialogTitle>
                  <DialogDescription>
                    {viewingApplication.company} • {viewingApplication.location}
                  </DialogDescription>
                </div>
                <Badge className={`${getStatusColor(viewingApplication.status)} text-white`}>
                  {getStatusText(viewingApplication.status)}
                </Badge>
              </div>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Applied Date</h3>
                  <p className="mt-1">{formatDate(viewingApplication.appliedDate) || "Not applied yet"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</h3>
                  <p className="mt-1">{formatDate(viewingApplication.lastUpdated)}</p>
                </div>
              </div>

              {viewingApplication.salary && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Salary Range</h3>
                  <p className="mt-1">{viewingApplication.salary}</p>
                </div>
              )}

              {viewingApplication.contactPerson && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Person</h3>
                    <p className="mt-1">{viewingApplication.contactPerson}</p>
                  </div>
                  {viewingApplication.contactEmail && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Email</h3>
                      <p className="mt-1">{viewingApplication.contactEmail}</p>
                    </div>
                  )}
                </div>
              )}

              {viewingApplication.url && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Posting URL</h3>
                  <p className="mt-1">
                    <a
                      href={viewingApplication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      {viewingApplication.url}
                      <Link2 className="h-3 w-3 ml-1" />
                    </a>
                  </p>
                </div>
              )}

              {viewingApplication.jobDescription && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Description</h3>
                  <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm max-h-40 overflow-y-auto">
                    <p className="whitespace-pre-line">{viewingApplication.jobDescription}</p>
                  </div>
                </div>
              )}

              {viewingApplication.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</h3>
                  <p className="mt-1 text-sm">{viewingApplication.notes}</p>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Interviews</h3>
                  <Dialog open={isAddingInterview} onOpenChange={setIsAddingInterview}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Interview
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Interview</DialogTitle>
                        <DialogDescription>Track a new interview for this application</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="interview-date">Interview Date</Label>
                            <Input
                              id="interview-date"
                              type="date"
                              value={newInterview.date}
                              onChange={(e) => setNewInterview({ ...newInterview, date: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="interview-type">Interview Type</Label>
                            <Input
                              id="interview-type"
                              placeholder="e.g. Phone Screen, Technical"
                              value={newInterview.type}
                              onChange={(e) => setNewInterview({ ...newInterview, type: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="interview-notes">Notes (Optional)</Label>
                          <Textarea
                            id="interview-notes"
                            placeholder="Add any notes about this interview"
                            rows={3}
                            value={newInterview.notes}
                            onChange={(e) => setNewInterview({ ...newInterview, notes: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddingInterview(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleAddInterview}>
                          Add Interview
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {viewingApplication.interviews && viewingApplication.interviews.length > 0 ? (
                  <div className="space-y-2">
                    {viewingApplication.interviews.map((interview) => (
                      <div
                        key={interview.id}
                        className={`p-3 rounded-md border ${
                          interview.completed
                            ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10"
                            : "border-gray-200 dark:border-gray-800"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{interview.type}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(interview.date)}</p>
                          </div>
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={interview.completed ? "text-green-500" : "text-gray-500"}
                              onClick={() =>
                                handleUpdateInterviewStatus(viewingApplication.id, interview.id, !interview.completed)
                              }
                            >
                              {interview.completed ? (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  Completed
                                </>
                              ) : (
                                <>
                                  <Clock className="h-4 w-4 mr-1" />
                                  Pending
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                        {interview.notes && <p className="text-sm mt-2">{interview.notes}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-md">
                    <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">No interviews scheduled yet</p>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <Button
                variant="outline"
                className="text-red-500"
                onClick={() => {
                  handleDeleteApplication(viewingApplication.id)
                  setIsViewingApplication(null)
                }}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Application
              </Button>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setIsViewingApplication(null)}>
                  Close
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-teal-500 hover:bg-teal-600">Update Status</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleUpdateApplicationStatus(viewingApplication.id, "saved")}
                      disabled={viewingApplication.status === "saved"}
                    >
                      <Briefcase className="h-4 w-4 mr-2" />
                      Saved
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateApplicationStatus(viewingApplication.id, "applied")}
                      disabled={viewingApplication.status === "applied"}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Applied
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateApplicationStatus(viewingApplication.id, "interviewing")}
                      disabled={viewingApplication.status === "interviewing"}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Interviewing
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateApplicationStatus(viewingApplication.id, "offer")}
                      disabled={viewingApplication.status === "offer"}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Offer Received
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleUpdateApplicationStatus(viewingApplication.id, "rejected")}
                      disabled={viewingApplication.status === "rejected"}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Rejected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
