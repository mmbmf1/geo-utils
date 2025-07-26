import { GeoUtils } from '../src'

describe('generateGeoJSONFromWKT', () => {
  test('generates GeoJSON from WKT data', async () => {
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
    expect(result.features[0].type).toBe('Feature')
    expect(result.features[0].properties.name).toBe('Central Park')
  })

  test('handles validation errors', async () => {
    const geoUtils = new GeoUtils('http://localhost:3000')
    const invalidData = [{ invalid: 'data' }]

    await expect(
      geoUtils.generateGeoJSONFromWKT(invalidData, 'geometry')
    ).rejects.toThrow()
  })
})
