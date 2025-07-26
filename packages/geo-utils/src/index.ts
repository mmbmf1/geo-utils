import { Point, DistanceOptions } from './types'
import { GeoUtilsError } from './errors'

export class GeoUtils {
  private apiUrl: string

  constructor(apiUrl: string = 'https://geo-utils.vercel.app') {
    this.apiUrl = apiUrl
  }

  async calculateDistance(
    point1: Point,
    point2: Point,
    options: DistanceOptions = {}
  ): Promise<number> {
    const response = await fetch(`${this.apiUrl}/api/distance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        point1,
        point2,
        unit: options.unit || 'miles',
      }),
    })

    const data = (await response.json()) as {
      distance: number
      error?: string
      errors?: Array<{ field: string; message: string }>
    }

    if (!response.ok) {
      throw new GeoUtilsError(
        data.error || 'Failed to calculate distance',
        response.status,
        data.errors
      )
    }

    return data.distance
  }

  async generateGeoJSONFromPoints(
    data: any[],
    latField: string,
    lngField: string,
    properties?: string[]
  ): Promise<any> {
    const response = await fetch(`${this.apiUrl}/api/geojson/points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
        latField,
        lngField,
        properties,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new GeoUtilsError(
        result.error || 'Failed to generate GeoJSON from points',
        response.status,
        result.errors
      )
    }

    return result
  }

  async generateGeoJSONFromWKT(
    data: any[],
    wktField: string,
    properties?: string[]
  ): Promise<any> {
    const response = await fetch(`${this.apiUrl}/api/geojson/wkt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
        wktField,
        properties,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new GeoUtilsError(
        result.error || 'Failed to generate GeoJSON from WKT',
        response.status,
        result.errors
      )
    }

    return result
  }
}

export { Point, DistanceOptions }
