import { GeoUtils } from '../src'

async function test() {
  const geoUtils = new GeoUtils()

  try {
    const distance = await geoUtils.calculateDistance(
      { latitude: 40.7128, longitude: -74.006 }, // NYC
      { latitude: 34.0522, longitude: -118.2437 }, // LA
      { unit: 'miles' }
    )

    console.log('Distance:', distance)
  } catch (error) {
    console.error('Error:', error)
  }
}

test()
