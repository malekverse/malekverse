/**
 * Schema.org JSON-LD generator for SEO
 * This utility creates structured data to help search engines better understand the content
 */

// Person schema for the portfolio owner
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Malek Maghraoui',
    url: 'https://malekverse.com',
    image: 'https://malekverse.com/malek-face.png',
    jobTitle: 'Full Stack Developer & Design Engineer',
    description: 'Full Stack Developer specializing in Next.js, React, and modern web technologies.',
    sameAs: [
      'https://github.com/maghraoui3',
      'https://linkedin.com/in/malekmaghraoui',
      // Add other social profiles here
    ],
    knowsAbout: ['Web Development', 'UI/UX Design', 'JavaScript', 'TypeScript', 'React', 'Next.js'],
    worksFor: {
      '@type': 'Organization',
      name: 'Malekverse',
    },
  };
}

// Project schema for portfolio projects
export function generateProjectSchema(project: any) {
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

// Portfolio website schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Malekverse',
    url: 'https://malekverse.com',
    description: 'Portfolio of Malek Maghraoui, a full-stack developer specializing in Next.js, React, and modern web technologies.',
    author: {
      '@type': 'Person',
      name: 'Malek Maghraoui',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://malekverse.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

// BreadcrumbList schema for navigation paths
export function generateBreadcrumbSchema(items: {name: string, url: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Skills/technology schema
export function generateSkillSchema(skills: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Technical Skills',
    description: 'List of technical skills and technologies used by Malek Maghraoui',
    itemListElement: skills.map((skill, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: skill,
    })),
  };
}

// FAQ schema for common questions
export function generateFAQSchema(faqs: {question: string, answer: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}