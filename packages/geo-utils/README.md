# @mmbmf1/geo-utils

Geospatial utility functions for calculating distances between geographical points and generating GeoJSON from various data sources using PostGIS calculations.

## Installation

```bash
npm install @mmbmf1/geo-utils
```

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
      { name: 'Central Park', lat: 40.7829, lng: -73.9654 },
      { name: 'Times Square', lat: 40.758, lng: -73.9855 },
    ],
    'lat',
    'lng',
    ['name']
  )
  console.log(geojson) // GeoJSON FeatureCollection
} catch (error) {
  console.error('Error:', error.message)
}

// Generate GeoJSON from WKT geometry strings
try {
  const geojson = await geoUtils.generateGeoJSONFromWKT(
    [
      {
        name: 'Central Park',
        geometry:
          'POLYGON((-73.9731 40.7644, -73.9731 40.8004, -73.9581 40.8004, -73.9581 40.7644, -73.9731 40.7644))',
      },
      { name: 'Times Square', geometry: 'POINT(-73.9855 40.7580)' },
    ],
    'geometry',
    ['name']
  )
  console.log(geojson) // GeoJSON FeatureCollection
} catch (error) {
  console.error('Error:', error.message)
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

Generates a GeoJSON FeatureCollection from an array of objects with coordinate data.

##### Parameters

- `data` (array): Array of objects containing coordinate data
- `latField` (string): Name of the field containing latitude values
- `lngField` (string): Name of the field containing longitude values
- `properties` (array, optional): Array of field names to include as properties

##### Returns

- `Promise<GeoJSONFeatureCollection>`: GeoJSON FeatureCollection with Point features

#### generateGeoJSONFromWKT(data, wktField, properties?)

Generates a GeoJSON FeatureCollection from an array of objects with WKT geometry strings.

##### Parameters

- `data` (array): Array of objects containing WKT geometry data
- `wktField` (string): Name of the field containing WKT geometry strings
- `properties` (array, optional): Array of field names to include as properties

##### Returns

- `Promise<GeoJSONFeatureCollection>`: GeoJSON FeatureCollection with features from WKT geometries

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

This will run the test suite which verifies the core distance calculation functionality.

## License

MIT
