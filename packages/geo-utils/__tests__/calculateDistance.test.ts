import { GeoUtils } from '../src'

global.fetch = jest.fn()

describe('calculateDistance', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('calculates distance between two points', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ distance: 2450.95 }),
    })

    const geoUtils = new GeoUtils()
    const nyc = { latitude: 40.7128, longitude: -74.006 }
    const la = { latitude: 34.0522, longitude: -118.2437 }

    const distance = await geoUtils.calculateDistance(nyc, la)
    expect(distance).toBeCloseTo(2450.95, 1)
  })
})
