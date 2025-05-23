import { Contact } from "@/components/sections/contact"
import { PageWrapper } from "@/components/page-wrapper"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <PageWrapper>
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Contact Me</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            Get in touch with me for collaborations, opportunities, or just to say hello.
          </p>
          <Contact />
        </div>
      </main>
    </PageWrapper>
  )
}
