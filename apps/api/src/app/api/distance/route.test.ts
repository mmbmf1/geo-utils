import { POST } from './route'
import { sql } from '@vercel/postgres'

// mock the vercel postgres client
jest.mock('@vercel/postgres', () => ({
  sql: jest.fn(),
}))

// mock next response
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      json: () => Promise.resolve(data),
      status: options?.status || 200,
    })),
  },
}))

describe('Distance API', () => {
  beforeEach(() => {
    // clear mock before each test
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

  it('should return validation errors for invalid coordinates', async () => {
    const request = new Request('http://localhost:3000/api/distance', {
      method: 'POST',
      body: JSON.stringify({
        point1: { latitude: 200, longitude: 0 }, // invalid latitude
        point2: { latitude: 0, longitude: 200 }, // invalid longitude
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.errors).toEqual([
      {
        field: 'point1.latitude',
        message: 'latitude must be between -90 and 90 degrees',
      },
      {
        field: 'point2.longitude',
        message: 'longitude must be between -180 and 180 degrees',
      },
    ])
    expect(response.status).toBe(400)
    expect(sql as unknown as jest.Mock).not.toHaveBeenCalled()
  })

  it('should return validation errors for missing coordinates', async () => {
    const request = new Request('http://localhost:3000/api/distance', {
      method: 'POST',
      body: JSON.stringify({
        point1: { latitude: 0 }, // missing longitude
        point2: { longitude: 0 }, // missing latitude
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.errors).toEqual([
      {
        field: 'point1.longitude',
        message: 'longitude is required',
      },
      {
        field: 'point2.latitude',
        message: 'latitude is required',
      },
    ])
    expect(response.status).toBe(400)
    expect(sql as unknown as jest.Mock).not.toHaveBeenCalled()
  })

  it('should return validation errors for non-numeric coordinates', async () => {
    const request = new Request('http://localhost:3000/api/distance', {
      method: 'POST',
      body: JSON.stringify({
        point1: { latitude: '40.7128', longitude: -74.006 }, // string latitude
        point2: { latitude: 34.0522, longitude: '-118.2437' }, // string longitude
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(data.errors).toEqual([
      {
        field: 'point1.latitude',
        message: 'latitude must be a number',
      },
      {
        field: 'point2.longitude',
        message: 'longitude must be a number',
      },
    ])
    expect(response.status).toBe(400)
    expect(sql as unknown as jest.Mock).not.toHaveBeenCalled()
  })
})
