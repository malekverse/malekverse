"use client"

import { useState } from "react"
import {
  Check,
  Github,
  Linkedin,
  Loader2,
  RefreshCw,
  Settings,
  FileText,
  LinkIcon,
  AlertCircle,
  Globe,
  Rss,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface PlatformStatus {
  connected: boolean
  lastSync?: Date
  username?: string
  error?: string
}

export function PlatformIntegrations() {
  const [activeTab, setActiveTab] = useState("connections")
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const [platforms, setPlatforms] = useState<Record<string, PlatformStatus>>({
    linkedin: { connected: false },
    github: { connected: true, lastSync: new Date(2023, 4, 10), username: "devportfolio" },
    portfolio: { connected: true, lastSync: new Date(2023, 4, 12) },
    rss: { connected: false, error: "Invalid RSS feed URL" },
  })

  const [rssUrl, setRssUrl] = useState("")

  const handleConnect = (platform: string) => {
    setIsConnecting(true)

    // Simulate API call
    setTimeout(() => {
      setPlatforms({
        ...platforms,
        [platform]: {
          connected: true,
          lastSync: new Date(),
          username: platform === "linkedin" ? "john-developer" : undefined,
        },
      })
      setIsConnecting(false)
    }, 2000)
  }

  const handleDisconnect = (platform: string) => {
    setPlatforms({
      ...platforms,
      [platform]: { connected: false },
    })
  }

  const handleSync = (platform: string) => {
    setIsSyncing(true)

    // Simulate API call
    setTimeout(() => {
      setPlatforms({
        ...platforms,
        [platform]: {
          ...platforms[platform],
          lastSync: new Date(),
        },
      })
      setIsSyncing(false)
    }, 2000)
  }

  const handleAddRss = () => {
    if (!rssUrl) return

    setIsConnecting(true)

    // Simulate API call
    setTimeout(() => {
      setPlatforms({
        ...platforms,
        rss: {
          connected: true,
          lastSync: new Date(),
        },
      })
      setIsConnecting(false)
      setRssUrl("")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="connections" className="space-y-6" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="connections">Platform Connections</TabsTrigger>
          <TabsTrigger value="settings">Sync Settings</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks & API</TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LinkedIn Connection */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                  <CardTitle>LinkedIn</CardTitle>
                </div>
                <Badge variant={platforms.linkedin.connected ? "default" : "outline"}>
                  {platforms.linkedin.connected ? "Connected" : "Disconnected"}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="mb-4">
                  Connect your LinkedIn account to publish posts directly from your dashboard.
                </CardDescription>

                {platforms.linkedin.connected ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Connected as</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{platforms.linkedin.username}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleSync("linkedin")}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync
                      </Button>
                    </div>

                    {platforms.linkedin.lastSync && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last synced: {platforms.linkedin.lastSync.toLocaleDateString()} at{" "}
                        {platforms.linkedin.lastSync.toLocaleTimeString()}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-publish-linkedin">Auto-publish scheduled content</Label>
                      <Switch id="auto-publish-linkedin" defaultChecked />
                    </div>
                  </div>
                ) : (
                  <Button
                    className="w-full bg-[#0A66C2] hover:bg-[#004182]"
                    onClick={() => handleConnect("linkedin")}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Linkedin className="mr-2 h-4 w-4" />
                        Connect LinkedIn
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
              {platforms.linkedin.connected && (
                <CardFooter className="flex justify-between pt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    onClick={() => handleDisconnect("linkedin")}
                  >
                    Disconnect
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* GitHub Connection */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <Github className="h-5 w-5" />
                  <CardTitle>GitHub</CardTitle>
                </div>
                <Badge variant={platforms.github.connected ? "default" : "outline"}>
                  {platforms.github.connected ? "Connected" : "Disconnected"}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="mb-4">
                  Connect your GitHub account to sync repositories and create content from your projects.
                </CardDescription>

                {platforms.github.connected ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Connected as</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{platforms.github.username}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleSync("github")}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync Repos
                      </Button>
                    </div>

                    {platforms.github.lastSync && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last synced: {platforms.github.lastSync.toLocaleDateString()} at{" "}
                        {platforms.github.lastSync.toLocaleTimeString()}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-import-github">Auto-import new repositories</Label>
                      <Switch id="auto-import-github" />
                    </div>
                  </div>
                ) : (
                  <Button
                    className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={() => handleConnect("github")}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Github className="mr-2 h-4 w-4" />
                        Connect GitHub
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
              {platforms.github.connected && (
                <CardFooter className="flex justify-between pt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    onClick={() => handleDisconnect("github")}
                  >
                    Disconnect
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* Portfolio Connection */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-teal-500" />
                  <CardTitle>Portfolio Blog</CardTitle>
                </div>
                <Badge variant={platforms.portfolio.connected ? "default" : "outline"}>
                  {platforms.portfolio.connected ? "Connected" : "Disconnected"}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="mb-4">
                  Connect to your portfolio blog to publish and manage content directly.
                </CardDescription>

                {platforms.portfolio.connected ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Connected to</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">yourportfolio.com/blog</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleSync("portfolio")}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync
                      </Button>
                    </div>

                    {platforms.portfolio.lastSync && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last synced: {platforms.portfolio.lastSync.toLocaleDateString()} at{" "}
                        {platforms.portfolio.lastSync.toLocaleTimeString()}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-publish-portfolio">Auto-publish scheduled content</Label>
                      <Switch id="auto-publish-portfolio" defaultChecked />
                    </div>
                  </div>
                ) : (
                  <Button
                    className="w-full bg-teal-500 hover:bg-teal-600"
                    onClick={() => handleConnect("portfolio")}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Globe className="mr-2 h-4 w-4" />
                        Connect Portfolio
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
              {platforms.portfolio.connected && (
                <CardFooter className="flex justify-between pt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    onClick={() => handleDisconnect("portfolio")}
                  >
                    Disconnect
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* RSS Feed */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <Rss className="h-5 w-5 text-orange-500" />
                  <CardTitle>RSS Feed</CardTitle>
                </div>
                <Badge variant={platforms.rss.connected ? "default" : "outline"}>
                  {platforms.rss.connected ? "Connected" : "Disconnected"}
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="mb-4">
                  Connect an RSS feed to import external blog posts into your dashboard.
                </CardDescription>

                {platforms.rss.connected ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Connected to</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">blog.example.com/feed.xml</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleSync("rss")}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync
                      </Button>
                    </div>

                    {platforms.rss.lastSync && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last synced: {platforms.rss.lastSync.toLocaleDateString()} at{" "}
                        {platforms.rss.lastSync.toLocaleTimeString()}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-import-rss">Auto-import new posts</Label>
                      <Switch id="auto-import-rss" defaultChecked />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="https://example.com/feed.xml"
                        value={rssUrl}
                        onChange={(e) => setRssUrl(e.target.value)}
                      />
                      <Button
                        className="bg-orange-500 hover:bg-orange-600 whitespace-nowrap"
                        onClick={handleAddRss}
                        disabled={isConnecting || !rssUrl}
                      >
                        {isConnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Feed"}
                      </Button>
                    </div>

                    {platforms.rss.error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{platforms.rss.error}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
              {platforms.rss.connected && (
                <CardFooter className="flex justify-between pt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    onClick={() => handleDisconnect("rss")}
                  >
                    Disconnect
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
              <CardDescription>Configure how content is synced between platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Automatic Sync</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-sync">Enable automatic sync</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Automatically sync content between connected platforms
                    </p>
                  </div>
                  <Switch id="auto-sync" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sync-frequency">Sync frequency</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">How often to check for new content</p>
                  </div>
                  <select
                    id="sync-frequency"
                    className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm"
                    defaultValue="daily"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Content Formatting</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="format-content">Auto-format content for each platform</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Optimize content format for each platform (e.g., shorten for LinkedIn)
                    </p>
                  </div>
                  <Switch id="format-content" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="include-hashtags">Include hashtags</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Automatically add relevant hashtags to social media posts
                    </p>
                  </div>
                  <Switch id="include-hashtags" defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sync-notifications">Sync notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when content is synced</p>
                  </div>
                  <Switch id="sync-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="error-notifications">Error notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when sync fails</p>
                  </div>
                  <Switch id="error-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-teal-500 hover:bg-teal-600">
                <Check className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Webhooks & API</CardTitle>
              <CardDescription>Configure webhooks and API access for external integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Keys</h3>

                <div className="space-y-2">
                  <Label htmlFor="api-key">Your API Key</Label>
                  <div className="flex space-x-2">
                    <Input id="api-key" value="sk_live_••••••••••••••••••••••••••••••" readOnly className="font-mono" />
                    <Button variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Use this key to authenticate API requests from external services
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Webhooks</h3>

                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" placeholder="https://your-service.com/webhook" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    We'll send POST requests to this URL when events occur
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Webhook Events</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-content-created" className="rounded" defaultChecked />
                      <Label htmlFor="event-content-created">Content Created</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-content-published" className="rounded" defaultChecked />
                      <Label htmlFor="event-content-published">Content Published</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-content-updated" className="rounded" defaultChecked />
                      <Label htmlFor="event-content-updated">Content Updated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-sync-completed" className="rounded" defaultChecked />
                      <Label htmlFor="event-sync-completed">Sync Completed</Label>
                    </div>
                  </div>
                </div>

                <Button className="bg-teal-500 hover:bg-teal-600">
                  <Check className="mr-2 h-4 w-4" />
                  Save Webhook
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Documentation</h3>

                <p className="text-sm">
                  Access our API documentation to learn how to integrate with our platform programmatically.
                </p>

                <Button variant="outline">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  View API Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
