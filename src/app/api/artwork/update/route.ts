import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function PUT(request: Request) {
  try {
    const { id, walletAddress, name, author, publicationYear, type, description, rating } =
      await request.json()

    if (!id || !walletAddress || !name || !author || !publicationYear || !type) {
      return NextResponse.json(
        {
          error:
            'Required fields missing: id, wallet address, name, author, publication year, and type are required',
        },
        { status: 400 }
      )
    }

    const sql = neon(process.env.DATABASE_URL!)

    // Check if the artwork exists and belongs to the user
    const artworkCheck = await sql`
      SELECT id 
      FROM artworks 
      WHERE id = ${id} 
        AND user_wallet_address = ${walletAddress}
    `

    if (artworkCheck.length === 0) {
      return NextResponse.json(
        {
          error: 'Artwork not found or you do not have permission to edit it',
        },
        { status: 404 }
      )
    }

    // Update the artwork
    const result = await sql`
      UPDATE artworks 
      SET 
        name = ${name},
        author = ${author},
        publication_year = ${publicationYear},
        type = ${type},
        description = ${description || null},
        rating = ${rating || null}
      WHERE id = ${id} 
        AND user_wallet_address = ${walletAddress}
      RETURNING id, name, author, publication_year, type, description, rating
    `

    if (result.length === 0) {
      return NextResponse.json(
        {
          error: 'Failed to update artwork',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Artwork updated successfully',
      artwork: {
        id: result[0].id,
        name: result[0].name,
        author: result[0].author,
        publicationYear: result[0].publication_year,
        type: result[0].type,
        description: result[0].description,
        rating: result[0].rating,
      },
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
