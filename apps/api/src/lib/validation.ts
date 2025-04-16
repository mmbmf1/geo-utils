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

// typescript concept: function with return type
// this function validates that coordinates are within valid ranges
export function validatecoordinates(
  point: point,
  prefix: string
): validationerror[] {
  const errors: validationerror[] = []

  // validate latitude (-90 to 90)
  if (point.latitude < -90 || point.latitude > 90) {
    errors.push({
      field: `${prefix}.latitude`,
      message: 'latitude must be between -90 and 90 degrees',
    })
  }

  // validate longitude (-180 to 180)
  if (point.longitude < -180 || point.longitude > 180) {
    errors.push({
      field: `${prefix}.longitude`,
      message: 'longitude must be between -180 and 180 degrees',
    })
  }

  return errors
}
