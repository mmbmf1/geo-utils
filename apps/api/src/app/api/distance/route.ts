import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'
import { validateCoordinates, validateUnit } from '@mmbmf1/geo-utils-validation'

export async function POST(request: Request) {
  try {
    const { point1, point2, unit = 'miles' } = await request.json()

    // validate coordinates and unit
    const point1errors = validateCoordinates(point1, 'point1')
    const point2errors = validateCoordinates(point2, 'point2')
    const uniterrors = validateUnit(unit)
    const errors = [...point1errors, ...point2errors, ...uniterrors]

    // if we found any validation errors, return them
    if (errors.length > 0) {
      return NextResponse.json(
        {
          error: 'Validation error occurred',
          errors,
        },
        { status: 400 }
      )
    }

    try {
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
    } catch (dbError) {
      console.error('Database Error:', dbError)
      return NextResponse.json(
        {
          error: 'Database error occurred while calculating distance',
          errors: [],
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Request Error:', error)
    return NextResponse.json(
      {
        error:
          'Invalid request format. Expected JSON with point1, point2, and optional unit.',
        errors: [],
      },
      { status: 400 }
    )
  }
}
