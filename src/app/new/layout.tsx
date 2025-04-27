import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Page | Kult',
  description: 'Unleash your imagination in this new page!',

  openGraph: {
    title: 'New Page | Kult',
    description: 'Unleash your imagination in this new page!',
    url: 'https://kult-app.netlify.app/new',
    siteName: 'Kult',
    images: [
      {
        url: '/huangshan.png',
        width: 1200,
        height: 630,
        alt: 'Store the books, movies and artworks you loved!',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'New Page | Kult',
    description: 'Unleash your imagination in this new page!',
    images: ['/huangshan.png'],
  },
}

export default function NewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
