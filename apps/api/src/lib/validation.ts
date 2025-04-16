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
