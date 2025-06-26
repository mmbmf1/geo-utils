import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { validateGeoJSONPointsRequest } from '@mmbmf1/geo-utils-validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validationErrors = validateGeoJSONPointsRequest(body)
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: 'Validation error occurred',
          errors: validationErrors,
        },
        { status: 400 }
      )
    }

    const result = await sql`
      SELECT generate_geojson(
        ${JSON.stringify(body.data)}::jsonb,
        'points',
        ${body.latField},
        ${body.lngField},
        NULL,
        ${body.properties}
      ) as geojson
    `

    const geojson = result.rows[0].geojson

    return NextResponse.json(geojson)
  } catch (error) {
    console.error('Error generating GeoJSON from points:', error)
    return NextResponse.json(
      {
        error: 'Database error occurred while generating GeoJSON',
        errors: [],
      },
      { status: 500 }
    )
  }
}
