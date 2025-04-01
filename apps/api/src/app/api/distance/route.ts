import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    console.log('Database URL:', process.env.POSTGRES_URL)
    console.log('Request received:', request.url)
    const { point1, point2, unit = 'miles' } = await request.json()

    const result = await sql`
      SELECT geo.calculate_distance(
        ${point1.longitude},
        ${point1.latitude},
        ${point2.longitude},
        ${point2.latitude},
        ${unit}
      ) as distance
    `

    return NextResponse.json({ distance: result.rows[0].distance })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate distance' },
      { status: 500 }
    )
  }
}
