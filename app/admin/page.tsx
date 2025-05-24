"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { AdminDashboard } from "@/components/admin/dashboard"
import { LoginForm } from "@/components/admin/login-form"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const token = localStorage.getItem("admin-token")
      setIsAuthenticated(!!token)
      setIsLoading(false)
    }

    // Simulate a small delay to prevent flash of login screen
    setTimeout(checkAuth, 500)
  }, [])

  const handleLogin = (username: string, password: string) => {
    setIsLoading(true)

    // Simple authentication for demo purposes
    if (username === "admin" && password === "HelloWorld") {
      localStorage.setItem("admin-token", "demo-token-12345")
      setIsAuthenticated(true)
      router.push("/admin")
    } else {
      setIsAuthenticated(false)
      alert("Invalid credentials. Please try again.")
    }

    setIsLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("admin-token")
    setIsAuthenticated(false)
    router.push("/admin")
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {isAuthenticated ? <AdminDashboard onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />}
    </div>
  )
}
