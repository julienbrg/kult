import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function POST(request: Request) {
  try {
    const { walletAddress } = await request.json()

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)

    const existingUser = await sql`
      SELECT wallet_address 
      FROM users 
      WHERE wallet_address = ${walletAddress}
    `

    if (existingUser.length > 0) {
      return NextResponse.json({
        message: 'User already exists',
        exists: true,
      })
    }

    const result = await sql`
      INSERT INTO users (wallet_address, paying)
      VALUES (${walletAddress}, false)
      RETURNING wallet_address, paying
    `

    return NextResponse.json({
      message: 'User created successfully',
      user: result[0],
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }
}
