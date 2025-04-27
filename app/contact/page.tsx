import { Contact } from "@/components/sections/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact Me</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            Get in touch with me for collaborations, opportunities, or just to say hello.
          </p>
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}
