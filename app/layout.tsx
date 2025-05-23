import type React from "react"
import { Inter, Geist as Geist_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChatProvider } from "@/components/chat/chat-provider"
import { generateMetadata as baseGenerateMetadata, generatePersonStructuredData } from "./metadata"
import Script from "next/script"
import { NavbarProvider } from "@/contexts/navbar-context"

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
        <meta name="theme-color" content="#000000" />
        <meta property="og:site_name" content="Malekverse" />
        <meta name="twitter:site" content="@malekmaghraoui" />
        <meta name="twitter:creator" content="@malekmaghraoui" />
        <meta name="msapplication-TileColor" content="#000000" />
        <link rel="me" href="https://github.com/maghraoui3" />
        <link rel="me" href="https://linkedin.com/in/malekmaghraoui" />
        <link rel="me" href="https://www.facebook.com/malekmaghraoui.official" />
        <link rel="me" href="https://www.instagram.com/malek_maghraoui" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FQ7CGYCQ1D"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FQ7CGYCQ1D');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${geist.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey="portfolio-theme"
        >
          <NavbarProvider>
            {/* Navbar is conditionally rendered in page components */}
            {children}
            <Footer />
            <ChatProvider />
          </NavbarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
