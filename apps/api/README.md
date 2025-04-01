# Geo Utils API

REST API providing geospatial calculations using PostGIS.

## Using the API

Make POST requests to the available endpoints:

```typescript
const response = await fetch('https://geo-utils.app/api/distance', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    point1: { latitude: 40.7128, longitude: -74.006 },
    point2: { latitude: 34.0522, longitude: -118.2437 },
    unit: 'miles',
  }),
})
```

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

## Development

The following section is only needed if you want to run the API locally or contribute to development.

### Local Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run development server
pnpm dev
```

### Environment Variables

Required Vercel Postgres environment variables (only for local development):

```bash
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
```

### Tech Stack

- Next.js App Router
- Vercel Postgres with PostGIS extension
- TypeScript
