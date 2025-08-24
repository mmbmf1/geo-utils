# Geo Utils API

REST API providing geospatial calculations and data transformations.

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
```

### Generate GeoJSON from Points

Convert coordinate data to GeoJSON FeatureCollection.

```typescript
POST /api/geojson/points

// Request
{
  "data": [
    {
      "name": "Kansas City",
      "lat": 39.0997,
      "lng": -94.5786,
      "population": 508090
    },
    {
      "name": "St. Louis",
      "lat": 38.6270,
      "lng": -90.1994,
      "population": 301578
    }
  ],
  "latField": "lat",
  "lngField": "lng",
  "properties": ["name", "population"]  // optional
}

// Success Response
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-94.5786, 39.0997]
      },
      "properties": {
        "name": "Kansas City",
        "population": 508090
      }
    }
  ]
}
```

### Generate GeoJSON from WKT

Convert WKT geometry strings to GeoJSON FeatureCollection.

```typescript
POST /api/geojson/wkt

// Request
{
  "data": [
    {
      "name": "Central Park",
      "wkt": "POLYGON((-73.9654 40.7829, -73.9654 40.8012, -73.9497 40.8012, -73.9497 40.7829, -73.9654 40.7829))",
      "area": 843
    },
    {
      "name": "Times Square",
      "wkt": "POINT(-73.9855 40.7580)"
    }
  ],
  "wktField": "wkt",
  "properties": ["name", "area"]  // optional
}

// Success Response
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-73.9654, 40.7829], [-73.9654, 40.8012], [-73.9497, 40.8012], [-73.9497, 40.7829], [-73.9654, 40.7829]]]
      },
      "properties": {
        "name": "Central Park",
        "area": 843
      }
    }
  ]
}
```

## Error Response Format

All endpoints use a consistent error response format:

```typescript
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
  "error": "Invalid request format. Expected JSON with required fields.",
  "errors": []
}
```

## Validation Rules

### Distance Endpoint

- Latitude must be between -90 and 90 degrees
- Longitude must be between -180 and 180 degrees
- Unit must be one of: meters, kilometers, miles, feet
- All coordinates must be numbers
- All required fields must be present

### GeoJSON Points Endpoint

- `data` must be a non-empty array
- `latField` and `lngField` must be present and valid field names
- All latitude values must be between -90 and 90 degrees
- All longitude values must be between -180 and 180 degrees
- `properties` must be an array of valid field names (if provided)

### GeoJSON WKT Endpoint

- `data` must be a non-empty array
- `wktField` must be present and a valid field name
- All WKT strings must be valid geometry formats
- `properties` must be an array of valid field names (if provided)
