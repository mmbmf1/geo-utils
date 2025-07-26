import { GeoUtils } from '../src'

// Mock fetch globally
global.fetch = jest.fn()

describe('generateGeoJSONFromPoints', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('generates GeoJSON from coordinate data', async () => {
    // Mock successful response
    const mockResponse = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [-73.9654, 40.7829] },
          properties: { name: 'Central Park' },
        },
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [-73.9855, 40.758] },
          properties: { name: 'Times Square' },
        },
      ],
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const geoUtils = new GeoUtils('http://localhost:3000')
    const data = [
      { name: 'Central Park', lat: 40.7829, lng: -73.9654 },
      { name: 'Times Square', lat: 40.758, lng: -73.9855 },
    ]

    const result = await geoUtils.generateGeoJSONFromPoints(
      data,
      'lat',
      'lng',
      ['name']
    )

    expect(result.type).toBe('FeatureCollection')
    expect(result.features).toHaveLength(2)
    expect(result.features[0].properties.name).toBe('Central Park')
  })

  test('handles validation errors', async () => {
    // Mock error response
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({
        error: 'Validation error occurred',
        errors: [{ field: 'data', message: 'data must be an array' }],
      }),
    })

    const geoUtils = new GeoUtils('http://localhost:3000')
    const invalidData = [{ invalid: 'data' }]

    await expect(
      geoUtils.generateGeoJSONFromPoints(invalidData, 'lat', 'lng')
    ).rejects.toThrow()
  })
})
