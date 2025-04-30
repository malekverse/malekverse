import { generateMetadata as baseGenerateMetadata, generateProjectStructuredData } from '@/app/metadata';
import { Metadata } from 'next';

// This would typically come from a database or API
const projectsData = [
  {
    id: "tunisiaflicks",
    title: "TunisiaFlicks",
    description:
      "A dedicated streaming and discovery platform for Tunisian cinema, offering users free access to a curated selection of movies with no ads.",
    fullDescription:
      "TunisiaFlicks is a comprehensive platform designed to showcase and preserve Tunisian cinema heritage. The platform provides a user-friendly interface for discovering, watching, and learning about Tunisian films across different genres and eras.",
    image: "/src/projects/tunisiaflicks/thumbnail.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Zustand", "Framer Motion", "JWT", "JSDOM"],
    category: "fullstack",
  },
  {
    id: "lead-insight",
    title: "Lead Insight",
    description:
      "AI-Powered Instagram Lead Management Platform designed to help marketers upload, analyze, score, and manage Instagram leads efficiently using AI and advanced filtering.",
    fullDescription:
      "Lead Insight is a sophisticated lead management system specifically designed for Instagram marketers. The platform leverages artificial intelligence to analyze and score potential leads based on their profile data, engagement metrics, and business relevance.",
    image: "/src/projects/lead-insight/backdrop.png",
    tags: ["Next.js", "React", "TypeScript", "MongoDB", "OpenAI API", "Groq SDK", "Tailwind CSS"],
    category: "ai",
  },
  {
    id: "ipsas-university",
    title: "IPSAS University Platform",
    description:
      "A full-stack web platform for IPSAS University developed during a hackathon, designed to centralize access to university resources and services.",
    fullDescription:
      "The IPSAS University Platform was developed during an intensive hackathon to address the need for a centralized digital hub for university resources.",
    image: "/src/projects/ipsas-university/backdrop.png",
    tags: ["React.js", "Next.js", "Tailwind CSS", "MongoDB", "Framer Motion", "Ethereum", "AI Chatbot"],
    category: "fullstack",
  },
];

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Find the project by ID
  const project = projectsData.find((p) => p.id === params.id);
  
  // If project not found, return default metadata
  if (!project) {
    return baseGenerateMetadata({
      title: 'Project Not Found | Malekverse',
      description: 'The requested project could not be found.',
      pathname: `/projects/${params.id}`,
      noIndex: true,
    });
  }
  
  // Generate structured data for the project
  const structuredData = generateProjectStructuredData(project);
  
  // Return metadata with project-specific information
  return baseGenerateMetadata({
    title: `${project.title} | Malekverse Projects`,
    description: project.description,
    keywords: [...project.tags, 'portfolio project', 'case study', project.category],
    ogImage: project.image,
    ogType: 'article',
    pathname: `/projects/${project.id}`,
    structuredData,
  });
}