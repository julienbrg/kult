import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const artworkId = params.id

  if (!artworkId) {
    return NextResponse.json({ error: 'Artwork ID is required' }, { status: 400 })
  }

  try {
    const sql = neon(process.env.DATABASE_URL!)

    const result = await sql`
      SELECT id, name, author, publication_year, type, description, rating, added_at
      FROM artworks 
      WHERE id = ${artworkId}
      LIMIT 1
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Artwork not found' }, { status: 404 })
    }

    const artwork = result[0]

    return NextResponse.json({
      artwork: {
        id: artwork.id,
        name: artwork.name,
        author: artwork.author,
        publicationYear: artwork.publication_year,
        type: artwork.type,
        description: artwork.description,
        rating: artwork.rating,
        addedAt: artwork.added_at,
      },
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
