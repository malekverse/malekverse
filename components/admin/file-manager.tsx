"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Check,
  Copy,
  Download,
  File,
  FileText,
  Filter,
  FolderOpen,
  Grid,
  ImageIcon,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Trash,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export function FileManager() {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "portfolio-hero.jpg",
      type: "image",
      size: "1.2 MB",
      dimensions: "1920x1080",
      uploadedAt: "2023-11-15T10:30:00",
      tags: ["hero", "portfolio"],
      url: "/placeholder.svg?height=300&width=600",
    },
    {
      id: 2,
      name: "resume-2023.pdf",
      type: "document",
      size: "420 KB",
      uploadedAt: "2023-11-10T14:45:00",
      tags: ["resume", "cv"],
      url: "#",
    },
    {
      id: 3,
      name: "project-thumbnail.png",
      type: "image",
      size: "850 KB",
      dimensions: "800x600",
      uploadedAt: "2023-11-05T09:15:00",
      tags: ["project", "thumbnail"],
      url: "/placeholder.svg?height=300&width=600",
    },
    {
      id: 4,
      name: "portfolio-data.json",
      type: "code",
      size: "32 KB",
      uploadedAt: "2023-10-28T16:20:00",
      tags: ["data", "config"],
      url: "#",
    },
    {
      id: 5,
      name: "project-mockup.jpg",
      type: "image",
      size: "1.8 MB",
      dimensions: "2400x1600",
      uploadedAt: "2023-10-20T11:05:00",
      tags: ["mockup", "design"],
      url: "/placeholder.svg?height=300&width=600",
    },
  ])

  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<number[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const filteredFiles = files.filter((file) => {
    // Filter by tab
    if (activeTab === "images" && file.type !== "image") return false
    if (activeTab === "documents" && file.type !== "document") return false
    if (activeTab === "code" && file.type !== "code") return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return file.name.toLowerCase().includes(query) || file.tags.some((tag) => tag.toLowerCase().includes(query))
    }

    return true
  })

  const handleFileSelect = (id: number) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter((fileId) => fileId !== id))
    } else {
      setSelectedFiles([...selectedFiles, id])
    }
  }

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(filteredFiles.map((file) => file.id))
    }
  }

  const handleDeleteSelected = () => {
    setFiles(files.filter((file) => !selectedFiles.includes(file.id)))
    setSelectedFiles([])
  }

  const handleUpload = () => {
    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false)
      // In a real app, you would add the new files to the files state
    }, 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />
      case "document":
        return <FileText className="h-5 w-5 text-amber-500" />
      case "code":
        return <File className="h-5 w-5 text-purple-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">File Manager</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upload and manage images, documents, and other files for your portfolio.
          </p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <Button className="bg-teal-500 hover:bg-teal-600" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search files..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                {selectedFiles.length === filteredFiles.length && filteredFiles.length > 0 ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Deselect All
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Select All
                  </>
                )}
              </Button>
              {selectedFiles.length > 0 && (
                <Button variant="outline" size="sm" className="text-red-500" onClick={handleDeleteSelected}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredFiles.length} {filteredFiles.length === 1 ? "file" : "files"}
              </p>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="a-z">Name (A-Z)</SelectItem>
                  <SelectItem value="z-a">Name (Z-A)</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredFiles.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredFiles.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all ${
                        selectedFiles.includes(file.id)
                          ? "ring-2 ring-teal-500"
                          : "hover:border-gray-300 dark:hover:border-gray-700"
                      }`}
                      onClick={() => handleFileSelect(file.id)}
                    >
                      <div className="relative aspect-square">
                        {file.type === "image" ? (
                          <img
                            src={file.url || "/placeholder.svg"}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                            {file.type === "document" ? (
                              <FileText className="h-12 w-12 text-amber-500" />
                            ) : (
                              <File className="h-12 w-12 text-purple-500" />
                            )}
                          </div>
                        )}
                        {selectedFiles.includes(file.id) && (
                          <div className="absolute top-2 right-2 h-6 w-6 bg-teal-500 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-3">
                        <p className="text-sm font-medium truncate" title={file.name}>
                          {file.name}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">{file.size}</p>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy URL
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={`flex items-center p-3 rounded-md ${
                        selectedFiles.includes(file.id)
                          ? "bg-teal-50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-800"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent"
                      } cursor-pointer transition-colors`}
                      onClick={() => handleFileSelect(file.id)}
                    >
                      <div className="flex items-center flex-1">
                        <div className="mr-4">
                          {selectedFiles.includes(file.id) ? (
                            <div className="h-6 w-6 bg-teal-500 rounded-full flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                              {getFileIcon(file.type)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{file.name}</p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <span>{file.size}</span>
                            <span className="mx-1">•</span>
                            <span>{formatDate(file.uploadedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:flex items-center space-x-2 mr-4">
                        {file.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy URL
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FolderOpen className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">No files found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md">
                {searchQuery ? "Try adjusting your search or filters" : "Upload some files to get started"}
              </p>
              {!searchQuery && (
                <Button className="mt-4 bg-teal-500 hover:bg-teal-600" onClick={handleUpload}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Zone</CardTitle>
          <CardDescription>Drag and drop files here or click to browse</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm font-medium mb-1">Drag and drop files here</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">SVG, PNG, JPG, GIF, PDF, DOCX (max. 10MB)</p>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Browse Files
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-800 px-6 py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Maximum file size: 10MB</p>
          <Button className="bg-teal-500 hover:bg-teal-600">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
