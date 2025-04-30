import Head from 'next/head'
import { useRouter } from 'next/router'

type MetaTagsProps = {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  canonicalUrl?: string
  noIndex?: boolean
  structuredData?: object
}

export function MetaTags({
  title = 'Malekverse | Full Stack Developer & Design Engineer',
  description = 'Welcome to the Malekverse - A cosmic journey through code, design, and creative innovation. Explore the portfolio of Malek Maghraoui, a full-stack developer specializing in Next.js, React, and modern web technologies.',
  keywords = [
    'web developer',
    'full stack developer',
    'Next.js',
    'React',
    'TypeScript',
    'portfolio',
    'Malek Maghraoui',
    'UI/UX',
    'frontend',
    'backend',
  ],
  ogImage = '/malek-face.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noIndex = false,
  structuredData,
}: MetaTagsProps) {
  const router = useRouter()
  const currentUrl = `https://malekverse.com${router.asPath}`
  const finalCanonicalUrl = canonicalUrl || currentUrl
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://malekverse.com${ogImage}`} />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`https://malekverse.com${ogImage}`} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  )
}