import type React from "react"
import { Inter, Geist as Geist_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { generateMetadata as baseGenerateMetadata, generatePersonStructuredData } from "./metadata"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geist = Geist_Sans({ subsets: ["latin"], variable: "--font-geist" })

// Generate metadata for the root layout
export const generateMetadata = () => {
  return baseGenerateMetadata({
    structuredData: generatePersonStructuredData(),
  })
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
