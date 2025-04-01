import { Point, DistanceOptions, DistanceResponse } from './types'

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

    if (!response.ok) {
      throw new Error('Failed to calculate distance')
    }

    const data: DistanceResponse = await response.json()
    return data.distance
  }
}

export { Point, DistanceOptions }
