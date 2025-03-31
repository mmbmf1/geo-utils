import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS postgis`

    return NextResponse.json({ message: 'PostGIS enabled successfully' })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to enable PostGIS' },
      { status: 500 }
    )
  }
}
