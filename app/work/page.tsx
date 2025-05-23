import { Work } from "@/components/sections/work"
import { PageWrapper } from "@/components/page-wrapper"
import { Footer } from "@/components/footer"

export default function WorkPage() {
  return (
    <PageWrapper>
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Work Experience</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            Explore my professional journey and the projects I've worked on throughout my career.
          </p>
          <Work />
        </div>
      </main>
    </PageWrapper>
  )
}
