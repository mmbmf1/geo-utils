export type DistanceUnit = 'meters' | 'kilometers' | 'miles' | 'feet'

export interface Point {
  latitude: number
  longitude: number
}

export interface DistanceRequest {
  point1: Point
  point2: Point
  unit?: DistanceUnit
}

export type ValidationError = {
  field: string
  message: string
}
