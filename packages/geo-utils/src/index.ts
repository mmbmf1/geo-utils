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
}

export { Point, DistanceOptions }
