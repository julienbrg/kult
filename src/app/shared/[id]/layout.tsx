import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    // Fetch artwork data for metadata
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/artwork/shared/${params.id}`,
      {
        cache: 'no-store',
      }
    )

    if (response.ok) {
      const data = await response.json()
      const artwork = data.artwork

      return {
        title: `${artwork.name} by ${artwork.author} | Kult`,
        description:
          artwork.description ||
          `Check out "${artwork.name}" by ${artwork.author} on Kult - a ${artwork.type} from ${artwork.publicationYear}`,

        openGraph: {
          title: `${artwork.name} by ${artwork.author}`,
          description: artwork.description || `A ${artwork.type} from ${artwork.publicationYear}`,
          url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/shared/${params.id}`,
          siteName: 'Kult',
          images: [
            {
              url: '/huangshan.png',
              width: 1200,
              height: 630,
              alt: `${artwork.name} by ${artwork.author}`,
            },
          ],
          locale: 'en_US',
          type: 'website',
        },

        twitter: {
          card: 'summary_large_image',
          title: `${artwork.name} by ${artwork.author}`,
          description: artwork.description || `A ${artwork.type} from ${artwork.publicationYear}`,
          images: ['/huangshan.png'],
          creator: '@julienbrg',
        },
      }
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
  }

  // Fallback metadata
  return {
    title: 'Shared Artwork | Kult',
    description: 'Discover this artwork shared on Kult',

    openGraph: {
      title: 'Shared Artwork | Kult',
      description: 'Discover this artwork shared on Kult',
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/shared/${params.id}`,
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
      title: 'Shared Artwork | Kult',
      description: 'Discover this artwork shared on Kult',
      images: ['/huangshan.png'],
    },
  }
}

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
