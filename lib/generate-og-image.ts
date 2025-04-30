import { ImageResponse } from 'next/og';
import React from 'react';

// Enable Edge Runtime
export const runtime = 'edge';

// Types for OpenGraph image generation
type OGImageProps = {
  title: string;
  description?: string;
  type?: 'page' | 'project' | 'blog';
  imageUrl?: string;
};

// Default fonts and styles
const defaultStyle = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'Inter',
      data: await fetch(
        new URL('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap')
      ).then((res) => res.arrayBuffer()),
      weight: 400,
      style: 'normal',
    } as const,
  ],
};

// Generate OpenGraph image
export async function generateOGImage({
  title,
  description,
  type = 'page',
  imageUrl,
}: OGImageProps): Promise<ImageResponse> {
  return new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111827',
          padding: '40px 60px',
          position: 'relative',
        },
      },
      imageUrl &&
        React.createElement('img', {
          src: imageUrl,
          alt: '',
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.6,
          },
        }),
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 10,
            maxWidth: '80%',
          },
        },
        React.createElement(
          'h1',
          {
            style: {
              fontSize: 60,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: description ? '20px' : 0,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            },
          },
          title
        ),
        description &&
          React.createElement(
            'p',
            {
              style: {
                fontSize: 30,
                color: '#e5e7eb',
                lineHeight: 1.4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              },
            },
            description
          )
      ),
      React.createElement(
        'div',
        {
          style: {
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          },
        },
        React.createElement('img', {
          src: 'https://malekverse.com/malek-face.png',
          alt: '',
          width: 48,
          height: 48,
          style: { borderRadius: '50%' },
        }),
        React.createElement(
          'span',
          {
            style: {
              fontSize: 24,
              color: '#ffffff',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            },
          },
          'malekverse.com'
        )
      )
    ),
    defaultStyle
  );
}