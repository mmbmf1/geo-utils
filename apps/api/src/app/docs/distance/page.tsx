'use client'

import { useState } from 'react'

interface FormData {
  point1: {
    latitude: number | ''
    longitude: number | ''
  }
  point2: {
    latitude: number | ''
    longitude: number | ''
  }
  unit: string
}

export default function DistanceDocs() {
  const [formData, setFormData] = useState<FormData>({
    point1: { latitude: '', longitude: '' },
    point2: { latitude: '', longitude: '' },
    unit: 'Meters',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [result, setResult] = useState<{
    distance: number
    unit: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors([])

    try {
      const response = await fetch('/api/distance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          point1: {
            latitude: formData.point1.latitude,
            longitude: formData.point1.longitude,
          },
          point2: {
            latitude: formData.point2.latitude,
            longitude: formData.point2.longitude,
          },
          unit: formData.unit.toLowerCase(),
        }),
      })

      const data = await response.json()

      if (data.error || data.errors) {
        if (data.errors) {
          setErrors(data.errors.map((err: any) => err.message))
        } else {
          setErrors([data.error])
        }
      } else {
        setResult({
          distance: data.distance,
          unit: formData.unit.toLowerCase(),
        })
      }
    } catch (err) {
      setErrors(['Failed to calculate distance'])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (
    point: 'point1' | 'point2',
    field: 'latitude' | 'longitude',
    value: string
  ) => {
    const numValue = value === '' ? '' : parseFloat(value)
    setFormData((prev) => ({
      ...prev,
      [point]: {
        ...prev[point],
        [field]: numValue,
      },
    }))
  }

  return (
    <div>
      <h1>Distance Calculation</h1>
      <div>
        <div>
          <h2>API Endpoint</h2>
          <pre>
            <code>POST /api/distance</code>
          </pre>

          <h2>Request Body</h2>
          <pre>
            <code>
              {`{
  "point1": {
    "latitude": 40.7128,
    "longitude": -74.006
  },
  "point2": {
    "latitude": 34.0522,
    "longitude": -118.2437
  },
  "unit": "miles"
}`}
            </code>
          </pre>

          <h2>Response</h2>
          <pre>
            <code>
              {`{
  "distance": 2445.203
}`}
            </code>
          </pre>

          <h2>Example</h2>
          <pre>
            <code>
              {`fetch('https://geo-utils.vercel.app/api/distance', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    point1: {
      latitude: 40.7128,
      longitude: -74.006,
    },
    point2: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
    unit: 'miles',
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))`}
            </code>
          </pre>
        </div>

        <div>
          <h2>Testing Interface</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <h3>Point 1</h3>
              <div>
                <div>
                  <label htmlFor="point1-latitude">Latitude</label>
                  <input
                    type="number"
                    id="point1-latitude"
                    name="point1-latitude"
                    value={formData.point1.latitude.toString()}
                    onChange={(e) =>
                      handleInputChange('point1', 'latitude', e.target.value)
                    }
                    step="0.000001"
                  />
                </div>
                <div>
                  <label htmlFor="point1-longitude">Longitude</label>
                  <input
                    type="number"
                    id="point1-longitude"
                    name="point1-longitude"
                    value={formData.point1.longitude.toString()}
                    onChange={(e) =>
                      handleInputChange('point1', 'longitude', e.target.value)
                    }
                    step="0.000001"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3>Point 2</h3>
              <div>
                <div>
                  <label htmlFor="point2-latitude">Latitude</label>
                  <input
                    type="number"
                    id="point2-latitude"
                    name="point2-latitude"
                    value={formData.point2.latitude.toString()}
                    onChange={(e) =>
                      handleInputChange('point2', 'latitude', e.target.value)
                    }
                    step="0.000001"
                  />
                </div>
                <div>
                  <label htmlFor="point2-longitude">Longitude</label>
                  <input
                    type="number"
                    id="point2-longitude"
                    name="point2-longitude"
                    value={formData.point2.longitude.toString()}
                    onChange={(e) =>
                      handleInputChange('point2', 'longitude', e.target.value)
                    }
                    step="0.000001"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="unit">Unit</label>
              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, unit: e.target.value }))
                }
              >
                <option value="Meters">Meters</option>
                <option value="Kilometers">Kilometers</option>
                <option value="Miles">Miles</option>
                <option value="Feet">Feet</option>
              </select>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Calculating...' : 'Calculate Distance'}
            </button>
          </form>

          {errors.length > 0 && (
            <div className="mt-4 text-red-600">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          {result && (
            <div className="mt-4">
              <p>
                Distance: {result.distance.toFixed(2)} {result.unit}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
