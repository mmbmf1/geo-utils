import { DistanceUnit, Point, ValidationError } from './types'

const geoJsonGeometryTypes = new Set([
  'Point',
  'MultiPoint',
  'LineString',
  'MultiLineString',
  'Polygon',
  'MultiPolygon',
  'GeometryCollection',
])

function isDistanceUnit(value: string): value is DistanceUnit {
  const validUnits: readonly DistanceUnit[] = [
    'meters',
    'kilometers',
    'miles',
    'feet',
  ] as const
  return validUnits.includes(value as DistanceUnit)
}

export function validateCoordinates(
  point: Point,
  prefix: string
): ValidationError[] {
  const errors: ValidationError[] = []

  // validate latitude exists and is a number
  if (point.latitude === undefined) {
    errors.push({
      field: `${prefix}.latitude`,
      message: 'latitude is required',
    })
  } else if (typeof point.latitude !== 'number' || isNaN(point.latitude)) {
    errors.push({
      field: `${prefix}.latitude`,
      message: 'latitude must be a number',
    })
  }

  // validate longitude exists and is a number
  if (point.longitude === undefined) {
    errors.push({
      field: `${prefix}.longitude`,
      message: 'longitude is required',
    })
  } else if (typeof point.longitude !== 'number' || isNaN(point.longitude)) {
    errors.push({
      field: `${prefix}.longitude`,
      message: 'longitude must be a number',
    })
  }

  // only validate ranges if coordinates are valid numbers
  if (typeof point.latitude === 'number' && !isNaN(point.latitude)) {
    // validate latitude (-90 to 90)
    if (point.latitude < -90 || point.latitude > 90) {
      errors.push({
        field: `${prefix}.latitude`,
        message: 'latitude must be between -90 and 90 degrees',
      })
    }
  }

  if (typeof point.longitude === 'number' && !isNaN(point.longitude)) {
    // validate longitude (-180 to 180)
    if (point.longitude < -180 || point.longitude > 180) {
      errors.push({
        field: `${prefix}.longitude`,
        message: 'longitude must be between -180 and 180 degrees',
      })
    }
  }

  return errors
}

export function validateUnit(unit: string | undefined): ValidationError[] {
  const errors: ValidationError[] = []

  if (unit !== undefined && !isDistanceUnit(unit)) {
    errors.push({
      field: 'unit',
      message: 'unit must be one of: meters, kilometers, miles, feet',
    })
  }

  return errors
}

export function validateGeoJSONPointsRequest(data: any): ValidationError[] {
  const errors: ValidationError[] = []

  // validate data array exists and is an array
  if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
    errors.push({
      field: 'data',
      message: 'data must be a non-empty array',
    })
    return errors
  }

  // validate latField exists
  if (!data.latField || typeof data.latField !== 'string') {
    errors.push({
      field: 'latField',
      message: 'latField is required and must be a string',
    })
  }

  // validate lngField exists
  if (!data.lngField || typeof data.lngField !== 'string') {
    errors.push({
      field: 'lngField',
      message: 'lngField is required and must be a string',
    })
  }

  // validate properties array (optional)
  if (data.properties && !Array.isArray(data.properties)) {
    errors.push({
      field: 'properties',
      message: 'properties must be an array',
    })
  } else if (
    Array.isArray(data.properties) &&
    data.properties.some((property: any) => typeof property !== 'string')
  ) {
    errors.push({
      field: 'properties',
      message: 'properties must contain only field names',
    })
  }

  // validate each data item has the required fields
  data.data.forEach((item: any, index: number) => {
    const latitude = item[data.latField]
    const longitude = item[data.lngField]

    if (
      latitude === undefined ||
      typeof latitude !== 'number' ||
      isNaN(latitude)
    ) {
      errors.push({
        field: `data[${index}].${data.latField}`,
        message: `${data.latField} must be a number`,
      })
    } else if (latitude < -90 || latitude > 90) {
      errors.push({
        field: `data[${index}].${data.latField}`,
        message: `${data.latField} must be between -90 and 90 degrees`,
      })
    }

    if (
      longitude === undefined ||
      typeof longitude !== 'number' ||
      isNaN(longitude)
    ) {
      errors.push({
        field: `data[${index}].${data.lngField}`,
        message: `${data.lngField} must be a number`,
      })
    } else if (longitude < -180 || longitude > 180) {
      errors.push({
        field: `data[${index}].${data.lngField}`,
        message: `${data.lngField} must be between -180 and 180 degrees`,
      })
    }
  })

  return errors
}

export function validateGeoJSONWKTRequest(data: any): ValidationError[] {
  const errors: ValidationError[] = []

  // validate data array exists and is an array
  if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
    errors.push({
      field: 'data',
      message: 'data must be a non-empty array',
    })
    return errors
  }

  // validate wktField exists
  if (!data.wktField || typeof data.wktField !== 'string') {
    errors.push({
      field: 'wktField',
      message: 'wktField is required and must be a string',
    })
  }

  // validate properties array (optional)
  if (data.properties && !Array.isArray(data.properties)) {
    errors.push({
      field: 'properties',
      message: 'properties must be an array',
    })
  }

  // validate each data item has the required WKT field
  data.data.forEach((item: any, index: number) => {
    if (!item[data.wktField] || typeof item[data.wktField] !== 'string') {
      errors.push({
        field: `data[${index}].${data.wktField}`,
        message: `${data.wktField} must be a string`,
      })
    } else {
      // basic WKT format validation
      const wkt = item[data.wktField].trim()
      if (
        !wkt.match(
          /^(POINT|LINESTRING|POLYGON|MULTIPOINT|MULTILINESTRING|MULTIPOLYGON|GEOMETRYCOLLECTION)\s*\(/i
        )
      ) {
        errors.push({
          field: `data[${index}].${data.wktField}`,
          message: `${data.wktField} must be a valid WKT geometry string`,
        })
      }
    }
  })

  return errors
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function validatePosition(
  position: unknown,
  field: string,
  errors: ValidationError[]
) {
  if (!Array.isArray(position)) {
    errors.push({
      field,
      message: 'position must be an array',
    })
    return
  }

  if (position.length < 2 || position.length > 3) {
    errors.push({
      field,
      message: 'position must contain longitude, latitude, and optional altitude',
    })
    return
  }

  const [longitude, latitude, altitude] = position

  if (typeof longitude !== 'number' || !Number.isFinite(longitude)) {
    errors.push({
      field: `${field}[0]`,
      message: 'longitude must be a finite number',
    })
  } else if (longitude < -180 || longitude > 180) {
    errors.push({
      field: `${field}[0]`,
      message: 'longitude must be between -180 and 180 degrees',
    })
  }

  if (typeof latitude !== 'number' || !Number.isFinite(latitude)) {
    errors.push({
      field: `${field}[1]`,
      message: 'latitude must be a finite number',
    })
  } else if (latitude < -90 || latitude > 90) {
    errors.push({
      field: `${field}[1]`,
      message: 'latitude must be between -90 and 90 degrees',
    })
  }

  if (
    altitude !== undefined &&
    (typeof altitude !== 'number' || !Number.isFinite(altitude))
  ) {
    errors.push({
      field: `${field}[2]`,
      message: 'altitude must be a finite number',
    })
  }
}

function validatePositionArray(
  coordinates: unknown,
  field: string,
  errors: ValidationError[]
) {
  if (!Array.isArray(coordinates)) {
    errors.push({
      field,
      message: 'coordinates must be an array',
    })
    return
  }

  coordinates.forEach((position, index) => {
    validatePosition(position, `${field}[${index}]`, errors)
  })
}

function validateLinearRing(
  ring: unknown,
  field: string,
  errors: ValidationError[]
) {
  if (!Array.isArray(ring)) {
    errors.push({
      field,
      message: 'linear ring must be an array',
    })
    return
  }

  if (ring.length < 4) {
    errors.push({
      field,
      message: 'linear ring must contain at least four positions',
    })
    return
  }

  validatePositionArray(ring, field, errors)

  const first = JSON.stringify(ring[0])
  const last = JSON.stringify(ring[ring.length - 1])
  if (first !== last) {
    errors.push({
      field,
      message: 'linear ring must start and end with the same position',
    })
  }
}

function validatePolygonCoordinates(
  coordinates: unknown,
  field: string,
  errors: ValidationError[]
) {
  if (!Array.isArray(coordinates)) {
    errors.push({
      field,
      message: 'polygon coordinates must be an array of linear rings',
    })
    return
  }

  coordinates.forEach((ring, index) => {
    validateLinearRing(ring, `${field}[${index}]`, errors)
  })
}

function validateGeometry(
  geometry: unknown,
  field: string,
  errors: ValidationError[]
) {
  if (geometry === null) {
    return
  }

  if (!isPlainObject(geometry)) {
    errors.push({
      field,
      message: 'geometry must be an object',
    })
    return
  }

  if (geometry.crs !== undefined) {
    errors.push({
      field: `${field}.crs`,
      message: 'crs member is not allowed in RFC 7946 GeoJSON',
    })
  }

  if (
    typeof geometry.type !== 'string' ||
    !geoJsonGeometryTypes.has(geometry.type)
  ) {
    errors.push({
      field: `${field}.type`,
      message: 'geometry type must be a valid GeoJSON geometry type',
    })
    return
  }

  switch (geometry.type) {
    case 'Point':
      validatePosition(geometry.coordinates, `${field}.coordinates`, errors)
      break
    case 'MultiPoint':
    case 'LineString':
      validatePositionArray(geometry.coordinates, `${field}.coordinates`, errors)
      break
    case 'MultiLineString':
      if (!Array.isArray(geometry.coordinates)) {
        errors.push({
          field: `${field}.coordinates`,
          message: 'coordinates must be an array of line strings',
        })
        break
      }
      geometry.coordinates.forEach((lineString, index) => {
        validatePositionArray(
          lineString,
          `${field}.coordinates[${index}]`,
          errors
        )
      })
      break
    case 'Polygon':
      validatePolygonCoordinates(
        geometry.coordinates,
        `${field}.coordinates`,
        errors
      )
      break
    case 'MultiPolygon':
      if (!Array.isArray(geometry.coordinates)) {
        errors.push({
          field: `${field}.coordinates`,
          message: 'coordinates must be an array of polygons',
        })
        break
      }
      geometry.coordinates.forEach((polygon, index) => {
        validatePolygonCoordinates(
          polygon,
          `${field}.coordinates[${index}]`,
          errors
        )
      })
      break
    case 'GeometryCollection':
      if (!Array.isArray(geometry.geometries)) {
        errors.push({
          field: `${field}.geometries`,
          message: 'geometries must be an array',
        })
        break
      }
      geometry.geometries.forEach((childGeometry, index) => {
        validateGeometry(childGeometry, `${field}.geometries[${index}]`, errors)
      })
      break
  }
}

function validateBbox(
  bbox: unknown,
  field: string,
  errors: ValidationError[]
) {
  if (!Array.isArray(bbox) || bbox.length < 4 || bbox.length % 2 !== 0) {
    errors.push({
      field,
      message: 'bbox must be an array with an even number of coordinates',
    })
    return
  }

  bbox.forEach((value, index) => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      errors.push({
        field: `${field}[${index}]`,
        message: 'bbox values must be finite numbers',
      })
    }
  })
}

export function validateGeoJSONFeatureCollection(
  geojson: unknown
): ValidationError[] {
  const errors: ValidationError[] = []

  if (!isPlainObject(geojson)) {
    return [
      {
        field: 'geojson',
        message: 'GeoJSON response must be an object',
      },
    ]
  }

  if (geojson.type !== 'FeatureCollection') {
    errors.push({
      field: 'type',
      message: 'GeoJSON response must be a FeatureCollection',
    })
  }

  if (geojson.crs !== undefined) {
    errors.push({
      field: 'crs',
      message: 'crs member is not allowed in RFC 7946 GeoJSON',
    })
  }

  if (geojson.bbox !== undefined) {
    validateBbox(geojson.bbox, 'bbox', errors)
  }

  if (!Array.isArray(geojson.features)) {
    errors.push({
      field: 'features',
      message: 'FeatureCollection features must be an array',
    })
    return errors
  }

  geojson.features.forEach((feature, index) => {
    const featureField = `features[${index}]`

    if (!isPlainObject(feature)) {
      errors.push({
        field: featureField,
        message: 'feature must be an object',
      })
      return
    }

    if (feature.type !== 'Feature') {
      errors.push({
        field: `${featureField}.type`,
        message: 'feature type must be Feature',
      })
    }

    if (feature.crs !== undefined) {
      errors.push({
        field: `${featureField}.crs`,
        message: 'crs member is not allowed in RFC 7946 GeoJSON',
      })
    }

    if (feature.bbox !== undefined) {
      validateBbox(feature.bbox, `${featureField}.bbox`, errors)
    }

    validateGeometry(feature.geometry, `${featureField}.geometry`, errors)

    if (feature.properties !== null && !isPlainObject(feature.properties)) {
      errors.push({
        field: `${featureField}.properties`,
        message: 'feature properties must be an object or null',
      })
    }
  })

  return errors
}
