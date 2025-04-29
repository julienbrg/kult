import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function POST(request: Request) {
  try {
    const { walletAddress, name, author, publicationYear, type, description, rating } =
      await request.json()

    if (!walletAddress || !name || !author || !publicationYear || !type) {
      return NextResponse.json(
        {
          error:
            'Required fields missing: wallet address, name, author, publication year, and type are required',
        },
        { status: 400 }
      )
    }

    const sql = neon(process.env.DATABASE_URL!)

    const userExists = await sql`
      SELECT wallet_address 
      FROM users 
      WHERE wallet_address = ${walletAddress}
    `

    if (userExists.length === 0) {
      return NextResponse.json(
        {
          error: 'User does not exist. Please connect your wallet first.',
        },
        { status: 404 }
      )
    }

    const existingArtwork = await sql`
      SELECT id 
      FROM artworks 
      WHERE user_wallet_address = ${walletAddress}
        AND name = ${name}
        AND author = ${author}
    `

    if (existingArtwork.length > 0) {
      return NextResponse.json({
        message: 'You already have this artwork in your collection',
        exists: true,
        id: existingArtwork[0].id,
      })
    }

    const result = await sql`
      INSERT INTO artworks (
        user_wallet_address, 
        name, 
        author, 
        publication_year, 
        type, 
        description, 
        rating
      )
      VALUES (
        ${walletAddress}, 
        ${name}, 
        ${author}, 
        ${publicationYear}, 
        ${type}, 
        ${description || null}, 
        ${rating || null}
      )
      RETURNING id, name, author, publication_year
    `

    return NextResponse.json({
      message: 'Artwork added successfully',
      artwork: result[0],
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
