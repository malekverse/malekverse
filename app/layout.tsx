import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist as Geist_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geist = Geist_Sans({ subsets: ["latin"], variable: "--font-geist" })

export const metadata: Metadata = {
  title: "Malekverse | Full Stack Developer & Design Engineer",
  description:
    "Welcome to the Malekverse - A cosmic journey through code, design, and creative innovation. Explore the portfolio of Malek Maghraoui, a full-stack developer specializing in Next.js, React, and modern web technologies.",
  keywords: [
    "web developer",
    "full stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "portfolio",
    "Malek Maghraoui",
    "UI/UX",
    "frontend",
    "backend",
  ],
  authors: [{ name: "Malek Maghraoui" }],
  creator: "Malek Maghraoui",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://malekverse.com",
    title: "Malekverse | Full Stack Developer & Design Engineer",
    description: "Welcome to the Malekverse - A cosmic journey through code, design, and creative innovation.",
    siteName: "Malekverse",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malekverse | Full Stack Developer & Design Engineer",
    description: "Welcome to the Malekverse - A cosmic journey through code, design, and creative innovation.",
    creator: "@malekmaghraoui",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://malekverse.com" />
      </head>
      <body className={`${inter.variable} ${geist.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
