import { Metadata } from 'next/types';

type MetadataProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: object;
  pathname?: string;
};

export function generateMetadata({
  title = 'Malekverse | Malek Maghraoui - Full Stack Developer & Design Engineer',
  description = 'Welcome to the Malekverse - A cosmic journey through code, design, and creative innovation. Explore the portfolio of Malek Maghraoui, a full-stack developer specializing in Next.js, React, TypeScript, and modern web technologies. Discover innovative projects, technical expertise, and professional experience.',
  keywords = [
    'web developer',
    'full stack developer',
    'Next.js developer',
    'React expert',
    'TypeScript specialist',
    'portfolio website',
    'Malek Maghraoui',
    'UI/UX designer',
    'frontend development',
    'backend development',
    'software engineer',
    'web applications',
    'responsive design',
    'modern web technologies',
    'JavaScript developer',
  ],
  ogImage = '/thumbnail.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noIndex = false,
  structuredData,
  pathname = '',
}: MetadataProps): Metadata {
  // Construct the full URL
  const baseUrl = 'https://malekverse.com';
  const currentUrl = `${baseUrl}${pathname}`;
  const finalCanonicalUrl = canonicalUrl || currentUrl;
  
  // Ensure ogImage has absolute URL
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  return {
    title,
    description,
    keywords: keywords,
    authors: [{ name: 'Malek Maghraoui' }],
    creator: 'Malek Maghraoui',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: finalCanonicalUrl,
    },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url: currentUrl,
      title,
      description,
      siteName: 'Malekverse',
      images: [{
        url: fullOgImage,
        width: 1200,
        height: 630,
        alt: 'Malek Maghraoui - Full Stack Developer',
      }],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      creator: '@malekmaghraoui',
      images: [fullOgImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...(structuredData && {
      other: {
        'application/ld+json': JSON.stringify(structuredData),
      },
    }),
  };
}

// Helper function to generate structured data for person
export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Malek Maghraoui',
    url: 'https://malekverse.com',
    image: 'https://malekverse.com/thumbnail.png',
    jobTitle: 'Full Stack Developer & Design Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Malekverse',
    },
    sameAs: [
      'https://github.com/maghraoui3',
      'https://linkedin.com/in/malekmaghraoui',
      'https://www.facebook.com/malekmaghraoui.official',
      'https://www.instagram.com/malek_maghraoui'
    ],
    description: 'Full Stack Developer and Design Engineer specializing in Next.js, React, TypeScript, and modern web technologies. Creating innovative web solutions with a focus on user experience and performance.',
    knowsAbout: [
      'Web Development',
      'UI/UX Design',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Frontend Development',
      'Backend Development',
      'Responsive Design',
      'Web Performance',
      'SEO Optimization'
    ],
  };
}

// Helper function to generate structured data for projects
export function generateProjectStructuredData(project: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    author: {
      '@type': 'Person',
      name: 'Malek Maghraoui',
      url: 'https://malekverse.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/OnlineOnly',
    },
    screenshot: project.image ? `https://malekverse.com${project.image}` : undefined,
    softwareHelp: project.githubLink,
    keywords: project.tags.join(', '),
  };
}