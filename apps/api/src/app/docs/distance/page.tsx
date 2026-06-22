'use client'

import { useState } from 'react'
import { CodeBlock } from '@/components/CodeBlock'
import { CopyButton } from '@/components/CopyButton'

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
    point1: { latitude: 40.7128, longitude: -74.006 }, // NYC
    point2: { latitude: 34.0522, longitude: -118.2437 }, // LA
    unit: 'Miles',
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

  const requestBodyExample = JSON.stringify(
    {
      point1: {
        latitude: 40.7128,
        longitude: -74.006,
      },
      point2: {
        latitude: 34.0522,
        longitude: -118.2437,
      },
      unit: 'miles',
    },
    null,
    2
  )

  const responseExample = JSON.stringify({ distance: 2445.203 }, null, 2)

  const fetchExample = `fetch('https://geo-utils.vercel.app/api/distance', {
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
  .catch((error) => console.error('Error:', error))`

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <a
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg
            className="w-3 h-3 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to API
        </a>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Distance Calculation
        </h1>
        <p className="text-gray-600">
          Calculate the geodetic distance between two points using PostGIS
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Documentation Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              API Documentation
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Endpoint
                </h3>
                <CodeBlock code="POST /api/distance" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Request Body
                </h3>
                <CodeBlock code={requestBodyExample} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Parameters
                </h3>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 space-y-3">
                  <p>
                    <code className="font-mono text-gray-900">point1</code> and{' '}
                    <code className="font-mono text-gray-900">point2</code> are
                    required WGS 84 coordinates with latitude in the range -90 to
                    90 and longitude in the range -180 to 180.
                  </p>
                  <p>
                    <code className="font-mono text-gray-900">unit</code> is
                    optional and defaults to miles. Supported values are meters,
                    kilometers, miles, and feet.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Technical Notes
                </h3>
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900 space-y-3">
                  <p>
                    Coordinates are interpreted as EPSG:4326 longitude/latitude
                    pairs. EPSG:4326 is the WGS 84 geographic coordinate system
                    used by GPS and GeoJSON.
                  </p>
                  <p>
                    Distance is calculated in PostGIS with spheroid-aware
                    geodetic math through{' '}
                    <code className="font-mono">geo.calculate_distance</code>,
                    so long routes follow the earth ellipsoid instead of a flat
                    map projection.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Accuracy Checks
                </h3>
                <div className="rounded-lg border border-green-100 bg-green-50 p-4 text-sm text-green-900 space-y-3">
                  <p>
                    The integration test suite can run against a PostGIS-enabled
                    database and compares this route to native{' '}
                    <code className="font-mono">
                      ST_Distance(...::geography)
                    </code>{' '}
                    results for the New York to Los Angeles sample.
                  </p>
                  <p>
                    Unit conversions are verified from the same PostGIS meter
                    result, so meters, kilometers, miles, and feet remain
                    consistent with the spheroid calculation.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Use Cases
                </h3>
                <ul className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700 space-y-2 list-disc list-inside">
                  <li>Estimate delivery, dispatch, or field-service route distances.</li>
                  <li>Compare user-submitted coordinates against facility or asset locations.</li>
                  <li>Normalize geodetic measurements before storing analytics events.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Response
                </h3>
                <CodeBlock code={responseExample} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Response Fields
                </h3>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 space-y-3">
                  <p>
                    <code className="font-mono text-gray-900">distance</code> is
                    the PostGIS spheroid result converted into the requested
                    unit. The value is returned as a number so clients can round
                    it for display or keep full precision for downstream logic.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Example Usage
                </h3>
                <CodeBlock code={fetchExample} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Troubleshooting and Best Practices
                </h3>
                <div className="rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm text-amber-900 space-y-3">
                  <p>
                    Keep latitude and longitude as numbers, not strings. The API
                    rejects stringified coordinates before running the PostGIS
                    query so invalid data does not reach the database.
                  </p>
                  <p>
                    Send longitude values in the -180 to 180 range. For
                    antimeridian-aware workflows, normalize coordinates before
                    calling the API.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Related Tools
                </h3>
                <div className="grid gap-3 text-sm">
                  <a
                    href="/docs/geojson/points"
                    className="rounded-lg border border-gray-200 p-3 text-blue-700 hover:border-blue-300 hover:bg-blue-50"
                  >
                    GeoJSON from Points - turn latitude/longitude rows into RFC
                    7946 features
                  </a>
                  <a
                    href="/docs/geojson/wkt"
                    className="rounded-lg border border-gray-200 p-3 text-blue-700 hover:border-blue-300 hover:bg-blue-50"
                  >
                    GeoJSON from WKT - convert PostGIS-style WKT geometries to
                    GeoJSON
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Interface */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Test the API
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Point 1 */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Point 1
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="point1-latitude"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Latitude
                    </label>
                    <input
                      type="number"
                      id="point1-latitude"
                      name="point1-latitude"
                      value={formData.point1.latitude.toString()}
                      onChange={(e) =>
                        handleInputChange('point1', 'latitude', e.target.value)
                      }
                      step="0.000001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Decimal degrees north/south, -90 to 90.
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="point1-longitude"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Longitude
                    </label>
                    <input
                      type="number"
                      id="point1-longitude"
                      name="point1-longitude"
                      value={formData.point1.longitude.toString()}
                      onChange={(e) =>
                        handleInputChange('point1', 'longitude', e.target.value)
                      }
                      step="0.000001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Decimal degrees east/west, -180 to 180.
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 2 */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Point 2
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="point2-latitude"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Latitude
                    </label>
                    <input
                      type="number"
                      id="point2-latitude"
                      name="point2-latitude"
                      value={formData.point2.latitude.toString()}
                      onChange={(e) =>
                        handleInputChange('point2', 'latitude', e.target.value)
                      }
                      step="0.000001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Decimal degrees north/south, -90 to 90.
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="point2-longitude"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Longitude
                    </label>
                    <input
                      type="number"
                      id="point2-longitude"
                      name="point2-longitude"
                      value={formData.point2.longitude.toString()}
                      onChange={(e) =>
                        handleInputChange('point2', 'longitude', e.target.value)
                      }
                      step="0.000001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Decimal degrees east/west, -180 to 180.
                    </p>
                  </div>
                </div>
              </div>

              {/* Unit */}
              <div>
                <label
                  htmlFor="unit"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Distance Unit
                </label>
                <select
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, unit: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Meters">Meters</option>
                  <option value="Kilometers">Kilometers</option>
                  <option value="Miles">Miles</option>
                  <option value="Feet">Feet</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Controls only the response unit; the PostGIS calculation
                  remains geodetic.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Calculating...' : 'Calculate Distance'}
              </button>
            </form>

            {/* Error Display */}
            {errors.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-red-800 font-medium mb-2">Error</h3>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-red-700 text-sm">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Result Display */}
            {result && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-green-800 font-medium mb-1">Result</h3>
                    <p className="text-green-700 text-lg font-semibold">
                      {result.distance.toFixed(2)} {result.unit}
                    </p>
                  </div>
                  <CopyButton
                    text={JSON.stringify(
                      { distance: result.distance },
                      null,
                      2
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
