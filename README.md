# Geo Utils

A monorepo containing geospatial utilities powered by PostGIS.

## Structure

### API (`/apps/api`)

REST API built with Next.js and Vercel Postgres (PostGIS) providing accurate geospatial calculations.

[API Documentation](apps/api/README.md)

### Package (`/packages/geo-utils`)

npm package [@mmbmf1/geo-utils](https://www.npmjs.com/package/@mmbmf1/geo-utils) for easy access to PostGIS functions.

[Package Documentation](packages/geo-utils/README.md)

## Development

```bash
# Install dependencies
pnpm install

# Run API locally
pnpm dev
```

## Features

- Calculate distances between points using PostGIS
- Comprehensive error handling with detailed validation messages
- Support for multiple distance units (meters, kilometers, miles, feet)
- TypeScript support with full type definitions
- Consistent error response format across API and client

## Error Handling

Both the API and client library provide consistent error handling:

- Validation errors with field-level messages
- Database error handling
- Request format validation
- Type-safe error handling in TypeScript

See the [API Documentation](apps/api/README.md) and [Package Documentation](packages/geo-utils/README.md) for detailed error handling examples.

## Tech Stack

- Next.js
- Vercel Postgres with PostGIS
- TypeScript
- pnpm workspaces
