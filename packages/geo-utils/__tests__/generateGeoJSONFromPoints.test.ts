import { GeoUtils } from '../src'

describe('generateGeoJSONFromPoints', () => {
  test('generates GeoJSON from coordinate data', async () => {
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
    expect(result.features[0].type).toBe('Feature')
    expect(result.features[0].geometry.type).toBe('Point')
    expect(result.features[0].properties.name).toBe('Central Park')
  })

  test('handles validation errors', async () => {
    const geoUtils = new GeoUtils('http://localhost:3000')
    const invalidData = [{ invalid: 'data' }]

    await expect(
      geoUtils.generateGeoJSONFromPoints(invalidData, 'lat', 'lng')
    ).rejects.toThrow()
  })
})
