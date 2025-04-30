import { generateMetadata as baseGenerateMetadata, generatePersonStructuredData } from './metadata';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  // Generate structured data for the homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Malekverse',
    url: 'https://malekverse.com',
    description: 'Portfolio of Malek Maghraoui, a full-stack developer specializing in Next.js, React, and modern web technologies.',
    author: generatePersonStructuredData(),
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://malekverse.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  // Return metadata with homepage-specific information
  return baseGenerateMetadata({
    title: 'Malekverse | Full Stack Developer & Design Engineer',
    description: 'Welcome to the Malekverse - A cosmic journey through code, design, and creative innovation. Explore the portfolio of Malek Maghraoui, a full-stack developer specializing in Next.js, React, and modern web technologies.',
    ogType: 'website',
    structuredData,
  });
}