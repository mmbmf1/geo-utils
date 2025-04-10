# Geo Utils API

REST API providing geospatial calculations.

## API Endpoints

### Calculate Distance

Calculate the geodetic distance between two points.

```typescript
POST /api/distance

// Request
{
  "point1": {
    "latitude": 40.7128,
    "longitude": -74.0060  // NYC
  },
  "point2": {
    "latitude": 34.0522,
    "longitude": -118.2437  // LA
  },
  "unit": "miles"  // optional: meters, kilometers, miles, feet
}

// Response
{
  "distance": 2445.203  // distance in specified unit
}
```
