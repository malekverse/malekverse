import { generateMetadata as baseGenerateMetadata } from '../metadata';
import { generatePersonSchema, generateSkillSchema } from '@/lib/schema';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  // Generate structured data for the about page
  // Combine person schema with skills schema for rich data
  const personSchema = generatePersonSchema();
  const skillsSchema = generateSkillSchema([
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
    'MongoDB', 'Tailwind CSS', 'Framer Motion', 'UI/UX Design'
  ]);
  
  // Return metadata with about page-specific information
  return baseGenerateMetadata({
    title: 'About Me | Malekverse',
    description: 'Learn about Malek Maghraoui, a passionate full-stack developer with expertise in Next.js, React, and modern web technologies. Discover my journey, skills, and approach to creating innovative digital experiences.',
    keywords: ['about me', 'developer biography', 'full stack developer', 'web development journey', 'Malek Maghraoui background'],
    ogType: 'profile',
    pathname: '/about',
    structuredData: personSchema,
  });
}