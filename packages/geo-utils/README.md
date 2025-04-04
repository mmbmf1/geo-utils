# @mmbmf1/geo-utils

Geospatial utility functions for calculating distances between geographical points using PostGIS calculations.

## Installation

```bash
npm install @mmbmf1/geo-utils
```

## Usage

```typescript
import { calculateDistance } from '@mmbmf1/geo-utils'

// Calculate distance between New York City and Los Angeles
const distance = calculateDistance(
  { latitude: 40.7128, longitude: -74.006 }, // NYC
  { latitude: 34.0522, longitude: -118.2437 }, // LA
  'miles'
)

console.log(`Distance: ${distance} miles`) // Distance: 2445.203 miles
```

## API Reference

### calculateDistance(point1, point2, unit?)

Calculates the geodetic distance between two geographical points.

#### Parameters

- `point1` (object): First geographical point
  - `latitude` (number): Latitude in decimal degrees
  - `longitude` (number): Longitude in decimal degrees
- `point2` (object): Second geographical point
  - `latitude` (number): Latitude in decimal degrees
  - `longitude` (number): Longitude in decimal degrees
- `unit` (string, optional): Unit of measurement (default: 'meters')
  - Supported values: 'meters', 'kilometers', 'miles', 'feet'

#### Returns

- `number`: Distance between the points in the specified unit

## Development

### Testing

To run the tests:

```bash
pnpm test
```

This will run the test suite which verifies the core distance calculation functionality.

## License

MIT
