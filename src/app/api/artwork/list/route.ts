import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const walletAddress = searchParams.get('address')
  const type = searchParams.get('type')

  if (!walletAddress) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 })
  }

  try {
    const sql = neon(process.env.DATABASE_URL!)

    let query
    if (type) {
      query = sql`
        SELECT id, name, author, publication_year, type, description, rating, added_at
        FROM artworks 
        WHERE user_wallet_address = ${walletAddress}
          AND type = ${type}
        ORDER BY added_at DESC
      `
    } else {
      query = sql`
        SELECT id, name, author, publication_year, type, description, rating, added_at
        FROM artworks 
        WHERE user_wallet_address = ${walletAddress}
        ORDER BY added_at DESC
      `
    }

    const result = await query

    const artworks = result.map(item => ({
      id: item.id,
      name: item.name,
      author: item.author,
      publicationYear: item.publication_year,
      type: item.type,
      description: item.description,
      rating: item.rating,
      addedAt: item.added_at,
    }))

    return NextResponse.json({
      count: artworks.length,
      artworks: artworks,
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
