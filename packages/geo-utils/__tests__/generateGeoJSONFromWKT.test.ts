import { GeoUtils } from '../src'

global.fetch = jest.fn()

describe('generateGeoJSONFromWKT', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('generates GeoJSON from WKT data', async () => {
    const mockResponse = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-73.9731, 40.7644],
                [-73.9731, 40.8004],
                [-73.9581, 40.8004],
                [-73.9581, 40.7644],
                [-73.9731, 40.7644],
              ],
            ],
          },
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
      {
        name: 'Central Park',
        geometry:
          'POLYGON((-73.9731 40.7644, -73.9731 40.8004, -73.9581 40.8004, -73.9581 40.7644, -73.9731 40.7644))',
      },
      {
        name: 'Times Square',
        geometry: 'POINT(-73.9855 40.7580)',
      },
    ]

    const result = await geoUtils.generateGeoJSONFromWKT(data, 'geometry', [
      'name',
    ])

    expect(result.type).toBe('FeatureCollection')
    expect(result.features).toHaveLength(2)
    expect(result.features[0].properties.name).toBe('Central Park')
  })

  test('handles validation errors', async () => {
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
      geoUtils.generateGeoJSONFromWKT(invalidData, 'geometry')
    ).rejects.toThrow()
  })
})
