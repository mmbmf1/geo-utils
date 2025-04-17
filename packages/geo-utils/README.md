# @mmbmf1/geo-utils

Geospatial utility functions for calculating distances between geographical points using PostGIS calculations.

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
```

## API Reference

### GeoUtils Class

#### constructor(apiUrl?: string)

Creates a new GeoUtils instance.

- `apiUrl` (optional): Custom API URL (default: 'https://geo-utils.vercel.app')

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
