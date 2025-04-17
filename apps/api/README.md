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

// Success Response
{
  "distance": 2445.203  // distance in specified unit
}

// Error Response
{
  "error": string,      // High-level error message
  "errors": Array<{     // Detailed validation errors (if any)
    "field": string,    // Field name (e.g., "point1.latitude")
    "message": string   // Error message
  }>
}
```

## Error Handling

The API uses a consistent error response format for all error cases:

### Validation Errors (400)

```typescript
{
  "error": "Validation error occurred",
  "errors": [
    {
      "field": "point1.latitude",
      "message": "latitude must be between -90 and 90 degrees"
    }
  ]
}
```

### Database Errors (500)

```typescript
{
  "error": "Database error occurred while calculating distance",
  "errors": []
}
```

### Request Format Errors (400)

```typescript
{
  "error": "Invalid request format. Expected JSON with point1, point2, and optional unit.",
  "errors": []
}
```

## Validation Rules

- Latitude must be between -90 and 90 degrees
- Longitude must be between -180 and 180 degrees
- Unit must be one of: meters, kilometers, miles, feet
- All coordinates must be numbers
- All required fields must be present
