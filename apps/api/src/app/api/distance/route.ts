import { neon } from '@neondatabase/serverless'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('API route hit')
  try {
    const sql = neon(process.env.POSTGRES_URL!)
    console.log('Database connection created')

    const body = await request.json()
    console.log('Request body:', body)

    const { point1, point2, unit = 'miles' } = body

    console.log('Attempting database query...')
    const result = await sql`
      SELECT geo.calculate_distance(
        ${point1.longitude},
        ${point1.latitude},
        ${point2.longitude},
        ${point2.latitude},
        ${unit}
      ) as distance
    `
    console.log('Query result:', result)

    return NextResponse.json({ distance: result[0].distance })
  } catch (error) {
    console.error('Error in distance calculation:', error)
    return NextResponse.json(
      { error: 'Failed to calculate distance' },
      { status: 500 }
    )
  }
}
