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
- More features coming soon...

## Tech Stack

- Next.js
- Vercel Postgres with PostGIS
- TypeScript
- pnpm workspaces
