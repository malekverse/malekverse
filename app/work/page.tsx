import { Work } from "@/components/sections/work"
import { PageWrapper } from "@/components/page-wrapper"
import { Footer } from "@/components/footer"
import { WorkExperience } from "@/components/sections/work-experience"

export default function WorkPage() {
  return (
    <PageWrapper>
      <main className="min-h-screen relative">
        <WorkExperience/>
      </main>
    </PageWrapper>
  )
}
