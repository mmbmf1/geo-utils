export interface Point {
  latitude: number
  longitude: number
}

export interface DistanceOptions {
  unit?: 'meters' | 'kilometers' | 'miles' | 'feet'
}

export interface DistanceResponse {
  distance: number
}
