import { GeoUtils } from '../src'

describe('calculateDistance', () => {
  let geoUtils: GeoUtils

  beforeEach(() => {
    geoUtils = new GeoUtils()
  })

  // test known distance between two points (nyc to la)
  test('calculates distance between new york and los angeles', async () => {
    const nyc = { latitude: 40.7128, longitude: -74.006 }
    const la = { latitude: 34.0522, longitude: -118.2437 }

    const distance = await geoUtils.calculateDistance(nyc, la)
    expect(distance).toBeCloseTo(2450.95, 1)
  })

  // test different units
  test('returns distance in different units', async () => {
    const point1 = { latitude: 40.7128, longitude: -74.006 }
    const point2 = { latitude: 40.7128, longitude: -73.006 } // 1 degree east

    const inMiles = await geoUtils.calculateDistance(point1, point2, {
      unit: 'miles',
    })
    const inKilometers = await geoUtils.calculateDistance(point1, point2, {
      unit: 'kilometers',
    })
    const inMeters = await geoUtils.calculateDistance(point1, point2, {
      unit: 'meters',
    })

    // verify unit conversions are correct
    expect(inKilometers).toBeCloseTo(inMeters / 1000, 5)
    expect(inMiles).toBeCloseTo(inKilometers * 0.621371, 5)
  })

  // test same point
  test('returns 0 for same point', async () => {
    const point = { latitude: 40.7128, longitude: -74.006 }
    const distance = await geoUtils.calculateDistance(point, point)
    expect(distance).toBeCloseTo(0, 5)
  })
})
