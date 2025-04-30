import { generateMetadata as baseGenerateMetadata } from '../metadata';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  // Generate structured data for the projects page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects | Malekverse',
    description: 'Explore my portfolio of web development and AI projects. From full-stack applications to AI-powered tools, discover my work and technical capabilities.',
    url: 'https://malekverse.com/projects',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Malekverse',
      url: 'https://malekverse.com'
    }
  };

  // Return metadata with projects page-specific information
  return baseGenerateMetadata({
    title: 'Projects | Malekverse',
    description: 'Explore my portfolio of web development and AI projects. From full-stack applications to AI-powered tools, discover my work and technical capabilities.',
    keywords: ['portfolio projects', 'web development', 'full stack', 'AI projects', 'case studies', 'developer portfolio'],
    ogType: 'website',
    pathname: '/projects',
    structuredData,
  });
}