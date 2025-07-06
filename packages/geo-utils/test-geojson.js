const { GeoUtils } = require('./dist/index.js')

async function testGeoJSONMethods() {
  const geoUtils = new GeoUtils('http://localhost:3000') // Use local API for testing

  console.log('Testing GeoJSON methods...\n')

  // Test generateGeoJSONFromPoints
  console.log('1. Testing generateGeoJSONFromPoints...')
  try {
    const pointsData = [
      { name: 'Central Park', lat: 40.7829, lng: -73.9654 },
      { name: 'Times Square', lat: 40.758, lng: -73.9855 },
    ]

    const pointsResult = await geoUtils.generateGeoJSONFromPoints(
      pointsData,
      'lat',
      'lng',
      ['name']
    )

    console.log('✅ Points GeoJSON generated successfully!')
    console.log('Type:', pointsResult.type)
    console.log('Features count:', pointsResult.features.length)
    console.log(
      'First feature:',
      JSON.stringify(pointsResult.features[0], null, 2)
    )
    console.log('')
  } catch (error) {
    console.error('❌ Points test failed:', error.message)
    if (error.validationErrors) {
      error.validationErrors.forEach((err) => {
        console.error(`  - ${err.field}: ${err.message}`)
      })
    }
    console.log('')
  }

  // Test generateGeoJSONFromWKT
  console.log('2. Testing generateGeoJSONFromWKT...')
  try {
    const wktData = [
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

    const wktResult = await geoUtils.generateGeoJSONFromWKT(
      wktData,
      'geometry',
      ['name']
    )

    console.log('✅ WKT GeoJSON generated successfully!')
    console.log('Type:', wktResult.type)
    console.log('Features count:', wktResult.features.length)
    console.log(
      'First feature:',
      JSON.stringify(wktResult.features[0], null, 2)
    )
    console.log('')
  } catch (error) {
    console.error('❌ WKT test failed:', error.message)
    if (error.validationErrors) {
      error.validationErrors.forEach((err) => {
        console.error(`  - ${err.field}: ${err.message}`)
      })
    }
    console.log('')
  }

  // Test error handling
  console.log('3. Testing error handling...')
  try {
    await geoUtils.generateGeoJSONFromPoints(
      [{ invalid: 'data' }], // Invalid data
      'lat',
      'lng'
    )
    console.log('❌ Should have thrown an error for invalid data')
  } catch (error) {
    console.log('✅ Error handling works correctly:', error.message)
  }

  console.log('\n🎉 Testing complete!')
}

// Run the test
testGeoJSONMethods().catch(console.error)
