# SEO Implementation Guide for Malekverse Portfolio

This guide explains the SEO improvements implemented in the Malekverse portfolio and how to maintain them for optimal search engine visibility.

## Implemented SEO Features

### 1. Modern Metadata API

The portfolio now uses Next.js 13+ Metadata API instead of the outdated `next/head` component. This provides better SEO capabilities and integration with Next.js App Router.

**Key files:**
- `app/metadata.ts` - Base metadata generator
- `app/page-metadata.ts` - Homepage metadata
- `app/projects/metadata.ts` - Projects page metadata
- `app/projects/[id]/metadata.ts` - Individual project metadata

### 2. Structured Data (JSON-LD)

Structured data has been implemented to help search engines better understand the content:

- **Person Schema** - Information about you as a developer
- **WebSite Schema** - Information about your portfolio website
- **SoftwareApplication Schema** - Information about each project
- **BreadcrumbList Schema** - Navigation structure
- **ItemList Schema** - Skills and technologies

The schemas are defined in `lib/schema.ts` and used in the metadata files.

### 3. Sitemap and Robots.txt

A sitemap and robots.txt have been added to help search engines discover and index all pages:

- `public/sitemap.xml` - Lists all pages with priorities and change frequencies
- `public/robots.txt` - Provides crawling instructions
- `scripts/generate-sitemap.js` - Script to automatically generate the sitemap

The sitemap is automatically generated during the build process.

## How to Use

### Adding Metadata to New Pages

For new pages, create a `metadata.ts` file in the page directory:

```typescript
import { generateMetadata as baseGenerateMetadata } from '@/app/metadata';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return baseGenerateMetadata({
    title: 'Page Title | Malekverse',
    description: 'Page description for SEO.',
    keywords: ['relevant', 'keywords'],
    pathname: '/page-path',
  });
}
```

### Adding Structured Data to New Projects

When adding new projects, update the `projectsData` array in `app/projects/[id]/metadata.ts` to include the new project information.

### Updating the Sitemap

When adding new pages or projects:

1. Update the `routes` or `projects` arrays in `scripts/generate-sitemap.js`
2. Run `npm run generate-sitemap` to regenerate the sitemap

The sitemap is also automatically generated during the build process.

## SEO Best Practices

1. **Use descriptive titles and descriptions** - Each page should have a unique, descriptive title and meta description.

2. **Image Optimization**

Image optimization has been implemented using Next.js Image component and custom utilities:

- **Automatic Image Optimization:**
  - Lazy loading for better performance
  - Responsive image sizes
  - Blur placeholders for better loading experience
  - WebP format conversion

- **OpenGraph Images:**
  - Dynamic OG image generation for social sharing
  - Customized templates for different content types
  - Consistent branding across social platforms

Key files:
- `lib/image-optimization.ts` - Image optimization utilities
- `lib/generate-og-image.ts` - OpenGraph image generation

To optimize new images:

```typescript
import { getOptimizedImageProps, imageSizes } from '@/lib/image-optimization';

// Use in components
<Image {...getOptimizedImageProps({
  src: "/path/to/image.jpg",
  alt: "Descriptive alt text",
  ...imageSizes.project.thumbnail
})} />
```

To generate OpenGraph images:

```typescript
import { generateOGImage } from '@/lib/generate-og-image';

// In metadata.ts files
export async function generateMetadata() {
  const ogImage = await generateOGImage({
    title: "Page Title",
    description: "Page description",
    type: "page"
  });
  
  return {
    openGraph: {
      images: [ogImage]
    }
  };
}
```

3. **Use semantic HTML** - Structure content with appropriate heading tags (h1, h2, etc.) and semantic elements.

4. **Internal linking** - Link between related pages to establish content relationships.

5. **Mobile responsiveness** - Ensure the site works well on all devices.

6. **Page speed** - Optimize loading times by minimizing unnecessary code and optimizing assets.

7. **Regular updates** - Keep content fresh and updated.

## Monitoring SEO Performance

Consider using these tools to monitor your SEO performance:

- Google Search Console
- Google Analytics
- Lighthouse (for performance and SEO audits)
- Schema Validator (https://validator.schema.org/)

## Additional Resources

- [Next.js Metadata API Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/docs/schemas.html)
- [Google Search Central](https://developers.google.com/search)