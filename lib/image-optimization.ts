import { ImageProps } from 'next/image';

// Default image optimization configuration
export const defaultImageConfig: Partial<ImageProps> = {
  loading: 'lazy',
  quality: 75,
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
};

// Image sizes configuration for different sections
export const imageSizes = {
  hero: {
    width: 1200,
    height: 800,
    priority: true,
  },
  project: {
    thumbnail: {
      width: 600,
      height: 300,
    },
    backdrop: {
      width: 1200,
      height: 600,
    },
    screenshot: {
      width: 800,
      height: 400,
    },
  },
  avatar: {
    width: 40,
    height: 40,
  },
};

// Generate blur placeholder for images
export function generateBlurPlaceholder(width: number, height: number): string {
  return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23F3F4F6'/%3E%3C/svg%3E`;
}

// Generate alt text for images based on filename
export function generateAltText(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove file extension
    .split(/[-_]/) // Split by dash or underscore
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    .join(' ');
}

// Get optimized image props
export function getOptimizedImageProps({
  src,
  alt,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}): ImageProps {
  return {
    ...defaultImageConfig,
    src,
    alt,
    width,
    height,
    priority,
    placeholder: 'blur',
    blurDataURL: generateBlurPlaceholder(width, height),
  };
}