import { POST } from './route'
import { sql } from '@vercel/postgres'
// import { QueryResult } from '@vercel/postgres'

// Mock the Vercel Postgres client
jest.mock('@vercel/postgres', () => ({
  sql: jest.fn(),
}))

describe('Distance API', () => {
  beforeEach(() => {
    // Clear mock before each test
    jest.clearAllMocks()
  })

  it('should calculate distance between two points', async () => {
    // Mock the SQL response with proper type casting
    ;(sql as unknown as jest.Mock).mockResolvedValueOnce({
      rows: [{ distance: 42.5 }],
      command: '',
      rowCount: 1,
      oid: 0,
      fields: [],
    })

    const request = new Request('http://localhost:3000/api/distance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        point1: { latitude: 40.7128, longitude: -74.006 }, // New York
        point2: { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
        unit: 'miles',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data).toEqual({ distance: 42.5 })
    expect(sql as unknown as jest.Mock).toHaveBeenCalledTimes(1)
  })
})
