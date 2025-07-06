import {
  Point as ValidationPoint,
  DistanceUnit,
} from '@mmbmf1/geo-utils-validation'

export type Point = ValidationPoint

export interface DistanceOptions {
  unit?: DistanceUnit
}

export interface GeoJSONPointsOptions {
  data: any[]
  latField: string
  lngField: string
  properties?: string[]
}

export interface GeoJSONWKTOptions {
  data: any[]
  wktField: string
  properties?: string[]
}

export interface GeoJSONFeature {
  type: 'Feature'
  geometry: {
    type: string
    coordinates: number[] | number[][] | number[][][]
  }
  properties: Record<string, any>
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection'
  features: GeoJSONFeature[]
}
