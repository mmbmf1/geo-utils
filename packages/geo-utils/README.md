# @mmbmf1/geo-utils

Geospatial utility functions for calculating distances between geographical points and generating GeoJSON using PostGIS calculations.

## Installation

```bash
npm install @mmbmf1/geo-utils
```

## Dependencies

This package automatically installs `@mmbmf1/geo-utils-validation` as a dependency. You don't need to install it separately.

## Usage

```typescript
import { GeoUtils } from '@mmbmf1/geo-utils'

const geoUtils = new GeoUtils()

// Calculate distance between New York City and Los Angeles
try {
  const distance = await geoUtils.calculateDistance(
    { latitude: 40.7128, longitude: -74.006 }, // NYC
    { latitude: 34.0522, longitude: -118.2437 }, // LA
    { unit: 'miles' }
  )
  console.log(`Distance: ${distance} miles`) // Distance: 2445.203 miles
} catch (error) {
  if (error instanceof GeoUtilsError) {
    console.error('Error:', error.message)
    if (error.validationErrors) {
      error.validationErrors.forEach((err) => {
        console.error(`${err.field}: ${err.message}`)
      })
    }
  }
}

// Generate GeoJSON from coordinate data
try {
  const geojson = await geoUtils.generateGeoJSONFromPoints(
    [
      { name: 'Kansas City', lat: 39.0997, lng: -94.5786, population: 508090 },
      { name: 'St. Louis', lat: 38.627, lng: -90.1994, population: 301578 },
    ],
    'lat',
    'lng',
    ['name', 'population']
  )
  console.log(geojson) // GeoJSON FeatureCollection
} catch (error) {
  if (error instanceof GeoUtilsError) {
    console.error('Error:', error.message)
  }
}

// For large datasets (10,000+ points), process in batches
// to avoid HTTP request body size limits:
try {
  const largeDataset = [...] // 27,000+ items
  const batchSize = 1000
  const batches = []
  for (let i = 0; i < largeDataset.length; i += batchSize) {
    batches.push(largeDataset.slice(i, i + batchSize))
  }

  const geojsonFeatures = []
  for (const batch of batches) {
    const result = await geoUtils.generateGeoJSONFromPoints(
      batch,
      'lat',
      'lng',
      ['name', 'population']
    )
    geojsonFeatures.push(...result.features)
  }

  const geojson = {
    type: 'FeatureCollection',
    features: geojsonFeatures
  }
} catch (error) {
  if (error instanceof GeoUtilsError) {
    console.error('Error:', error.message)
  }
}

// Generate GeoJSON from WKT geometries
try {
  const geojson = await geoUtils.generateGeoJSONFromWKT(
    [
      {
        name: 'Central Park',
        wkt: 'POLYGON((-73.9654 40.7829, -73.9654 40.8012, -73.9497 40.8012, -73.9497 40.7829, -73.9654 40.7829))',
      },
      { name: 'Times Square', wkt: 'POINT(-73.9855 40.7580)' },
    ],
    'wkt',
    ['name']
  )
  console.log(geojson) // GeoJSON FeatureCollection
} catch (error) {
  if (error instanceof GeoUtilsError) {
    console.error('Error:', error.message)
  }
}
```

## API Reference

### GeoUtils Class

#### constructor()

Creates a new GeoUtils instance.

#### calculateDistance(point1, point2, options?)

Calculates the geodetic distance between two geographical points.

##### Parameters

- `point1` (object): First geographical point
  - `latitude` (number): Latitude in decimal degrees
  - `longitude` (number): Longitude in decimal degrees
- `point2` (object): Second geographical point
  - `latitude` (number): Latitude in decimal degrees
  - `longitude` (number): Longitude in decimal degrees
- `options` (object, optional): Calculation options
  - `unit` (string): Unit of measurement (default: 'miles')
    - Supported values: 'meters', 'kilometers', 'miles', 'feet'

##### Returns

- `Promise<number>`: Distance between the points in the specified unit

#### generateGeoJSONFromPoints(data, latField, lngField, properties?)

Converts coordinate data to GeoJSON FeatureCollection.

##### Parameters

- `data` (array): Array of objects containing coordinate data
- `latField` (string): Field name for latitude values
- `lngField` (string): Field name for longitude values
- `properties` (array, optional): Array of property field names to include

##### Returns

- `Promise<GeoJSON.FeatureCollection>`: GeoJSON FeatureCollection

##### Note

For large datasets (10,000+ points), consider processing in batches to avoid HTTP request body size limits. See the Usage section for a batching example.

#### generateGeoJSONFromWKT(data, wktField, properties?)

Converts WKT geometry strings to GeoJSON FeatureCollection.

##### Parameters

- `data` (array): Array of objects containing WKT data
- `wktField` (string): Field name for WKT geometry strings
- `properties` (array, optional): Array of property field names to include

##### Returns

- `Promise<GeoJSON.FeatureCollection>`: GeoJSON FeatureCollection

##### Throws

- `GeoUtilsError`: Custom error class with:
  - `message`: Error description
  - `statusCode`: HTTP status code
  - `validationErrors`: Array of validation errors (if any)

## Error Handling

The package uses a custom `GeoUtilsError` class for error handling:

```typescript
try {
  await geoUtils.calculateDistance(point1, point2)
} catch (error) {
  if (error instanceof GeoUtilsError) {
    // Handle different types of errors
    switch (error.statusCode) {
      case 400:
        // Validation or request format error
        console.error('Validation Error:', error.message)
        error.validationErrors?.forEach((err) => {
          console.error(`${err.field}: ${err.message}`)
        })
        break
      case 500:
        // Server error
        console.error('Server Error:', error.message)
        break
    }
  }
}
```

## Development

### Testing

To run the tests:

```bash
pnpm test
```

This will run the test suite which verifies distance calculations and GeoJSON generation functionality.

## License

MIT
