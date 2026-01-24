# Geo Utils Roadmap

## Overview

Geo Utils is a geospatial toolkit that provides accurate calculations and data transformations powered by PostGIS. This roadmap outlines our current priorities and future plans.

## Current Version: v0.2.3 ✅

**Published to npm:** [@mmbmf1/geo-utils](https://www.npmjs.com/package/@mmbmf1/geo-utils)

### Available Features

- ✅ **Distance Calculations** - Calculate geodetic distances between two points using PostGIS
  - Multiple unit support (meters, kilometers, miles, feet)
  - TypeScript support with full type definitions
  - Comprehensive error handling and validation

- ✅ **GeoJSON Generation** - Convert data to GeoJSON FeatureCollections
  - Generate from coordinate data (`/api/geojson/points`)
  - Generate from WKT geometry strings (`/api/geojson/wkt`)
  - Client package methods (`generateGeoJSONFromPoints`, `generateGeoJSONFromWKT`)

- ✅ **Developer Experience**
  - Interactive documentation UI for all endpoints
  - Copy-to-clipboard functionality for code examples and responses
  - Modern, mobile-first UI design
  - Comprehensive error handling with detailed validation messages
  - All tests passing in both package and API

## Upcoming Features ⏳

### Documentation Enhancements (v0.2.4)

- Field descriptions and help text for all parameters
- Parameter descriptions section explaining each request field
- Use case examples with real-world scenarios
- Technical details (coordinate systems, geodetic distance explanation, PostGIS usage)
- Error handling guide with common errors and troubleshooting steps
- Response field descriptions with usage context
- Tips and best practices sections
- Related endpoints links for discoverability

### Testing & Reliability (v0.2.5)

- Integration tests for full API workflows using real PostGIS queries
- Performance benchmarks and monitoring
- Error handling improvements based on usage patterns
- API response validation in all tests

### Performance & Optimization (v0.2.6)

- API response time optimizations
- Database query improvements using PostGIS best practices (CTEs, proper indexing)
- Caching strategies for frequently accessed data
- Bundle size optimization

## Future Plans 🔮

### Data Persistence & Storage (v0.3.0)

- Database storage for geospatial data and calculations (Postgres with PostGIS)
- User data management and persistence
- Historical calculation tracking
- Data import/export capabilities
- SQL CTEs for complex geospatial queries

### New Features (v0.4.0+)

- Vector Tile Generation (Mapbox Vector Tiles)
- Advanced GeoJSON Operations (buffers, intersections) using PostGIS functions
- Database-connected GeoJSON generation (query Postgres, transform to GeoJSON)
- Additional geospatial functions (area, bearing, etc.) using PostGIS
- Mobile-first UI components for new features

### Advanced Capabilities (v0.5.0+)

- Real-time geospatial processing
- Advanced spatial analysis functions using PostGIS
- Integration with external mapping services
- Enterprise features and scaling

## Contributing

We welcome contributions! If you're interested in helping with any of these features, please check our [Contributing Guide](CONTRIBUTING.md).

## Version History

- **v0.2.3** (Current): Published to npm with all features from v0.2.0-v0.2.2
- **v0.2.2** (API only): UI/UX polish with modern design, improved spacing, card-based layouts, and Next.js 16 upgrade
- **v0.2.1** (API only): Copy-to-clipboard functionality for code examples and API responses, improved documentation UI
- **v0.2.0**: Added GeoJSON generation from points and WKT geometries, client package methods, comprehensive testing, and interactive documentation UI. Published to npm.
- **v0.1.4**: Added input validation and improved error handling
- **v0.1.3**: Initial public release with distance calculations

Last Updated: 2026-01-24
