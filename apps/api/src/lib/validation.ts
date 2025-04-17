// typescript concept: type - defines a set of allowed values
// here we define all possible units for distance calculation
export type distanceunit = 'meters' | 'kilometers' | 'miles' | 'feet'

// typescript concept: interface - defines the shape of an object
// this matches the point interface from the geo-utils package
export interface point {
  latitude: number
  longitude: number
}

// typescript concept: interface - defines the shape of the request body
export interface distancerequest {
  point1: point
  point2: point
  unit?: distanceunit
}

// typescript concept: type - defines possible validation errors
export type validationerror = {
  field: string
  message: string
}

// typescript concept: type guard - function that checks if a value matches a type
// returns true if the value is a valid distance unit
function isDistanceUnit(value: string): value is distanceunit {
  const validUnits: readonly distanceunit[] = [
    'meters',
    'kilometers',
    'miles',
    'feet',
  ] as const
  return validUnits.includes(value as distanceunit)
}

// typescript concept: function with return type
// this function validates that coordinates are within valid ranges
export function validatecoordinates(
  point: point,
  prefix: string
): validationerror[] {
  const errors: validationerror[] = []

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

export function validateunit(unit: string | undefined): validationerror[] {
  const errors: validationerror[] = []

  if (unit !== undefined && !isDistanceUnit(unit)) {
    errors.push({
      field: 'unit',
      message: 'unit must be one of: meters, kilometers, miles, feet',
    })
  }

  return errors
}
