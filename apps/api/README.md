# Geo Utils API

REST API providing geospatial calculations using PostGIS.

## Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run development server
pnpm dev
```

## Environment Variables

Required Vercel Postgres environment variables:

```bash
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
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

The API uses:

- Next.js App Router
- Vercel Postgres with PostGIS extension
- TypeScript
