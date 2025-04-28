import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const walletAddress = searchParams.get('address')

  if (!walletAddress) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 })
  }

  try {
    const sql = neon(process.env.DATABASE_URL!)

    const result = await sql`
      SELECT wallet_address, paying 
      FROM users 
      WHERE wallet_address = ${walletAddress}
    `

    if (result.length === 0) {
      return NextResponse.json({ exists: false })
    }

    return NextResponse.json({
      exists: true,
      paying: result[0].paying,
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
