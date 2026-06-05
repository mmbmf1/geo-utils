/**
 * @jest-environment node
 */

import { sql } from '@vercel/postgres'
import { POST } from './route'

const hasPostgresCredentials = Boolean(
  process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL
)

const describeWithPostgres = hasPostgresCredentials ? describe : describe.skip

async function postDistance(unit: string) {
  const request = new Request('http://localhost:3000/api/distance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      point1: { latitude: 40.7128, longitude: -74.006 },
      point2: { latitude: 34.0522, longitude: -118.2437 },
      unit,
    }),
  })

  const response = await POST(request)
  const data = await response.json()

  expect(response.status).toBe(200)
  expect(typeof data.distance).toBe('number')
  expect(Number.isFinite(data.distance)).toBe(true)

  return data.distance as number
}

describeWithPostgres('Distance API PostGIS integration', () => {
  it('returns the spheroid distance expected from PostGIS geography math', async () => {
    const apiMiles = await postDistance('miles')
    const expected = await sql`
      SELECT (
        ST_Distance(
          ST_SetSRID(ST_MakePoint(${-74.006}, ${40.7128}), 4326)::geography,
          ST_SetSRID(ST_MakePoint(${-118.2437}, ${34.0522}), 4326)::geography
        ) / 1609.344
      )::double precision as miles
    `

    expect(apiMiles).toBeCloseTo(Number(expected.rows[0].miles), 3)
  })

  it('returns internally consistent PostGIS unit conversions', async () => {
    const meters = await postDistance('meters')
    const kilometers = await postDistance('kilometers')
    const miles = await postDistance('miles')
    const feet = await postDistance('feet')

    expect(kilometers).toBeCloseTo(meters / 1000, 6)
    expect(miles).toBeCloseTo(meters / 1609.344, 6)
    expect(feet).toBeCloseTo(meters / 0.3048, 3)
  })
})
