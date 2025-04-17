import {
  Point as ValidationPoint,
  DistanceUnit,
} from '@mmbmf1/geo-utils-validation'

export type Point = ValidationPoint

export interface DistanceOptions {
  unit?: DistanceUnit
}
