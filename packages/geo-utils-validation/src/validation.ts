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
