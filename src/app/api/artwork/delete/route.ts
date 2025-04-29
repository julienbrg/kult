import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function DELETE(request: Request) {
  try {
    const { id, walletAddress } = await request.json()

    if (!id || !walletAddress) {
      return NextResponse.json(
        {
          error: 'Artwork ID and wallet address are required',
        },
        { status: 400 }
      )
    }

    const sql = neon(process.env.DATABASE_URL!)

    const artworkCheck = await sql`
      SELECT id 
      FROM artworks 
      WHERE id = ${id} 
        AND user_wallet_address = ${walletAddress}
    `

    if (artworkCheck.length === 0) {
      return NextResponse.json(
        {
          error: 'Artwork not found or you do not have permission to delete it',
        },
        { status: 404 }
      )
    }

    await sql`
      DELETE FROM artworks 
      WHERE id = ${id} 
        AND user_wallet_address = ${walletAddress}
    `

    return NextResponse.json({
      message: 'Artwork deleted successfully',
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
