import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kult',
  description: 'Store the books, movies and artworks you loved!',

  keywords: ['Books', 'Movies', 'Artworks'],
  authors: [{ name: 'Julien', url: 'https://github.com/julienbrg' }],

  openGraph: {
    title: 'Kult',
    description: 'Store the books, movies and artworks you loved!',
    url: 'https://kult-app.netlify.app',
    siteName: 'Kult',
    images: [
      {
        url: '/huangshan.png',
        width: 1200,
        height: 630,
        alt: 'Kult',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Kult',
    description: 'Store the books, movies and artworks you loved!',
    images: ['/huangshan.png'],
    creator: '@julienbrg',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'your-google-site-verification',
  },
}
