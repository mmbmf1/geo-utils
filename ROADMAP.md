# Geo Utils Roadmap

## Overview

Geo Utils is a geospatial toolkit that provides accurate calculations and data transformations powered by PostGIS. This roadmap outlines our current priorities and future plans.

## Current Status ✅

- ✅ Distance calculations between points
- ✅ Multiple unit support (meters, kilometers, miles, feet)
- ✅ TypeScript support with full type definitions
- ✅ Comprehensive error handling and validation
- ✅ All tests passing in both package and API
- ✅ GeoJSON Layer Generation (v0.2.0) - COMPLETED!
- ✅ Client package methods for GeoJSON endpoints
- ✅ Comprehensive testing for GeoJSON features (with mocked tests)
- ✅ Interactive documentation UI for all endpoints
- ✅ Updated READMEs and package documentation
- ✅ Published to npm (v0.2.3)
- ✅ Next.js 16 upgrade with React 19.2.0
- ✅ Copy-to-clipboard functionality (v0.2.1 - API only)
- ✅ UI/UX polish with modern design (v0.2.2 - API only)

## Completed Features 🎉

### GeoJSON Layer Generation (v0.2.0) - COMPLETED

- ✅ Generate GeoJSON FeatureCollections from coordinate data (`/api/geojson/points`)
- ✅ Generate GeoJSON FeatureCollections from WKT geometry strings (`/api/geojson/wkt`)
- ✅ Input validation and error handling for both endpoints
- ✅ Client package methods (`generateGeoJSONFromPoints`, `generateGeoJSONFromWKT`)
- ✅ Test coverage with mocked API calls
- ✅ Interactive documentation UI with consistent structure
- ✅ Pre-filled example data for all endpoints
- ✅ Use case: Convert location data with properties to GeoJSON for mapping applications

### Documentation & Developer Experience (v0.2.1) - COMPLETED

**Note: API-only changes - npm package remains at v0.2.0**

- ✅ Copy-to-clipboard functionality for code examples and responses
- ✅ Reusable CopyButton and CodeBlock components
- ✅ Copy buttons on all code blocks (Request Body, Response, Example Usage)
- ✅ Copy buttons on live API response JSON
- ✅ Improved documentation UI structure with responsive design

### UI/UX Polish (v0.2.2) - COMPLETED

**Note: API-only changes - npm package remains at v0.2.0**

- ✅ Modern UI with improved visual design
- ✅ Light gray background with white card containers
- ✅ Subtle shadows and borders for visual depth
- ✅ Improved spacing and typography
- ✅ Responsive grid layouts (mobile-first)
- ✅ Hover effects on interactive elements
- ✅ Better visual hierarchy and section separation
- ✅ Navigation links ("Back to API") on all docs pages
- ✅ Next.js 16 upgrade with React 19.2.0 and TypeScript 5.9.3

## Coming Soon ⏳

### Testing & Reliability (v0.2.3)

- Test critical business logic and edge cases
- Integration tests for full API workflows using real PostGIS queries
- Performance benchmarks and monitoring
- Error handling improvements based on usage patterns
- API response validation in all tests

### Documentation Enhancements (v0.2.4)

- Field descriptions and help text for all parameters
- Parameter descriptions section explaining each request field
- Use case examples with real-world scenarios
- Technical details (coordinate systems, geodetic distance explanation, PostGIS usage)
- Error handling guide with common errors and troubleshooting steps
- Response field descriptions with usage context
- Tips and best practices sections
- Related endpoints links for discoverability

### Performance & Optimization (v0.2.5)

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

**Note:** Version numbers refer to API releases. The npm package `@mmbmf1/geo-utils` is currently at v0.2.3. Versions v0.2.1 and v0.2.2 were API-only improvements (documentation UI enhancements) and did not require package version bumps.

- v0.2.3: Current version published to npm
- v0.2.2 (API only): UI/UX polish with modern design, improved spacing, card-based layouts, and Next.js 16 upgrade
- v0.2.1 (API only): Copy-to-clipboard functionality for code examples and API responses, improved documentation UI
- v0.2.0: Added GeoJSON generation from points and WKT geometries, client package methods, comprehensive testing, and interactive documentation UI. **Published to npm.**
- v0.1.4: Added input validation and improved error handling
- v0.1.3: Initial public release with distance calculations

Last Updated: 2026-01-24
