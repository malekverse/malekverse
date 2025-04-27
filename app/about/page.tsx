import { About } from "@/components/sections/about"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Me</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            Learn more about my journey, experience, and what drives me as a developer and designer.
          </p>
          <About />
        </div>
      </main>
      <Footer />
    </div>
  )
}
