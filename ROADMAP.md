# Geo Utils Roadmap

## Overview

Geo Utils is a geospatial toolkit that provides accurate calculations and data transformations powered by PostGIS. This roadmap outlines our current priorities and future plans.

## Current Status ✅

- ✅ Distance calculations between points
- ✅ Multiple unit support (meters, kilometers, miles, feet)
- ✅ TypeScript support with full type definitions
- ✅ Comprehensive error handling and validation
- ✅ All tests passing in both package and API
- ✅ GeoJSON Layer Generation (v0.2.0) - API endpoints completed!

## Completed Features 🎉

### GeoJSON Layer Generation (v0.2.0) - COMPLETED

- ✅ Generate GeoJSON FeatureCollections from coordinate data (`/api/geojson/points`)
- ✅ Generate GeoJSON FeatureCollections from WKT geometry strings (`/api/geojson/wkt`)
- ✅ Comprehensive validation for both endpoints
- ✅ Perfect for mapping applications and data visualization
- ✅ Example use case: Convert location data with properties to GeoJSON for mapping

## In Progress 🚧

- Client package methods for GeoJSON endpoints
- Comprehensive testing for GeoJSON features
- Documentation UI for GeoJSON endpoints

## Coming Soon ⏳

### API Improvements (v0.1.5)

- Enhanced documentation and examples
- Basic API versioning
- Rate limiting for abuse protection

### Vector Tile Generation (v0.3.0)

- Generate Mapbox Vector Tiles (MVT) from PostGIS data
- Support for both on-the-fly and DB-backed generation
- Ideal for high-performance web mapping
- Includes caching and dataset management

## Future Plans 🔮

### Advanced GeoJSON Operations (v0.2.1)

- Buffer operations around geometries
- Area/length calculations for polygons and lines
- Intersection calculations between geometries

### Database-Connected GeoJSON (v0.2.2)

- Generate GeoJSON from database queries
- Support for custom SQL queries and table-based data
- Direct database integration for complex spatial queries

### Additional geospatial functions (Area, Bearing, etc.)

- Enhanced documentation and examples
- Performance optimizations
- Community feedback and feature requests

## Contributing

We welcome contributions! If you're interested in helping with any of these features, please check our [Contributing Guide](CONTRIBUTING.md).

## Version History

- v0.1.4: Added input validation and improved error handling
- v0.1.3: Initial public release with distance calculations
- v0.2.0: Added GeoJSON generation from points and WKT geometries

Last Updated: 2024-12-19
