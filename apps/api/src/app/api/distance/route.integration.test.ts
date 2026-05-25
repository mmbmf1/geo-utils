/**
 * @jest-environment node
 */

const postgresEnvVars = [
  'POSTGRES_URL',
  'POSTGRES_PRISMA_URL',
  'POSTGRES_URL_NON_POOLING',
  'DATABASE_URL',
] as const

const hasPostgresConnection = postgresEnvVars.some(
  (name) => Boolean(process.env[name])
)

const describeWithPostgres = hasPostgresConnection ? describe : describe.skip

describeWithPostgres('Distance API PostGIS integration', () => {
  it('returns spheroid distance from geo.calculate_distance for EPSG:4326 points', async () => {
    const { POST } = await import('./route')
    const request = new Request('http://localhost:3000/api/distance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        point1: { latitude: 0, longitude: 0 },
        point2: { latitude: 0, longitude: 1 },
        unit: 'meters',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.distance).toEqual(expect.any(Number))
    expect(data.distance).toBeGreaterThan(111300)
    expect(data.distance).toBeLessThan(111340)
  })
})
