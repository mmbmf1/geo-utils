import { DistanceUnit, Point, ValidationError } from './types'

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
  if (!data.data || !Array.isArray(data.data)) {
    errors.push({
      field: 'data',
      message: 'data must be an array',
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
  }

  // validate each data item has the required fields
  data.data.forEach((item: any, index: number) => {
    if (!item[data.latField] || typeof item[data.latField] !== 'number') {
      errors.push({
        field: `data[${index}].${data.latField}`,
        message: `${data.latField} must be a number`,
      })
    }
    if (!item[data.lngField] || typeof item[data.lngField] !== 'number') {
      errors.push({
        field: `data[${index}].${data.lngField}`,
        message: `${data.lngField} must be a number`,
      })
    }
  })

  return errors
}

export function validateGeoJSONWKTRequest(data: any): ValidationError[] {
  const errors: ValidationError[] = []

  // validate data array exists and is an array
  if (!data.data || !Array.isArray(data.data)) {
    errors.push({
      field: 'data',
      message: 'data must be an array',
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
