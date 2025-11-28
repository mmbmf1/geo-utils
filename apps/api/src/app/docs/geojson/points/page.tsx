'use client'

import { useState } from 'react'
import { CodeBlock } from '@/components/CodeBlock'
import { CopyButton } from '@/components/CopyButton'

interface GeoJSONPointsRequest {
  data: Array<Record<string, any>>
  latField: string
  lngField: string
  properties?: string[]
}

interface GeoJSONResponse {
  type: string
  features: Array<{
    type: string
    geometry: {
      type: string
      coordinates: number[]
    }
    properties: Record<string, any>
  }>
}

export default function GeoJSONPointsDocs() {
  const [request, setRequest] = useState<GeoJSONPointsRequest>({
    data: [
      { name: 'Kansas City', lat: 39.0997, lng: -94.5786, population: 508090 },
      { name: 'St. Louis', lat: 38.627, lng: -90.1994, population: 301578 },
      { name: 'Springfield', lat: 37.209, lng: -93.2982, population: 169176 },
    ],
    latField: 'lat',
    lngField: 'lng',
    properties: ['name', 'population'],
  })

  const [response, setResponse] = useState<GeoJSONResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const res = await fetch('/api/geojson/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'An error occurred')
        return
      }

      setResponse(data)
    } catch (err) {
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const updateData = (index: number, field: string, value: any) => {
    const newData = [...request.data]
    newData[index] = { ...newData[index], [field]: value }
    setRequest({ ...request, data: newData })
  }

  const addDataRow = () => {
    setRequest({
      ...request,
      data: [...request.data, { name: '', lat: 0, lng: 0 }],
    })
  }

  const removeDataRow = (index: number) => {
    const newData = request.data.filter((_, i) => i !== index)
    setRequest({ ...request, data: newData })
  }

  const requestBodyExample = JSON.stringify(
    {
      data: [
        {
          name: 'Kansas City',
          lat: 39.0997,
          lng: -94.5786,
          population: 508090,
        },
        {
          name: 'St. Louis',
          lat: 38.627,
          lng: -90.1994,
          population: 301578,
        },
      ],
      latField: 'lat',
      lngField: 'lng',
      properties: ['name', 'population'],
    },
    null,
    2
  )

  const responseExample = JSON.stringify(
    {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-94.5786, 39.0997],
          },
          properties: {
            name: 'Kansas City',
            population: 508090,
          },
        },
      ],
    },
    null,
    2
  )

  const fetchExample = `fetch('https://geo-utils.vercel.app/api/geojson/points', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    data: [
      {
        name: "Kansas City",
        lat: 39.0997,
        lng: -94.5786,
        population: 508090
      }
    ],
    latField: "lat",
    lngField: "lng",
    properties: ["name", "population"]
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
          GeoJSON Points API
        </h1>
        <p className="text-gray-600">
          Convert coordinate data to GeoJSON FeatureCollection
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
                <CodeBlock code="POST /api/geojson/points" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Request Body
                </h3>
                <CodeBlock code={requestBodyExample} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Response
                </h3>
                <CodeBlock code={responseExample} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Example Usage
                </h3>
                <CodeBlock code={fetchExample} />
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
              {/* Data Array */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Data Points
                </h3>
                <div className="space-y-4">
                  {request.data.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-gray-900">
                          Item {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeDataRow(index)}
                          className="text-sm text-red-600 hover:text-red-800 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            value={item.name || ''}
                            onChange={(e) =>
                              updateData(index, 'name', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Latitude
                          </label>
                          <input
                            type="number"
                            step="any"
                            value={item.lat || ''}
                            onChange={(e) =>
                              updateData(
                                index,
                                'lat',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Longitude
                          </label>
                          <input
                            type="number"
                            step="any"
                            value={item.lng || ''}
                            onChange={(e) =>
                              updateData(
                                index,
                                'lng',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Population
                          </label>
                          <input
                            type="number"
                            value={item.population || ''}
                            onChange={(e) =>
                              updateData(
                                index,
                                'population',
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDataRow}
                    className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Add Data Row
                  </button>
                </div>
              </div>

              {/* Field Configuration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude Field
                  </label>
                  <input
                    type="text"
                    value={request.latField}
                    onChange={(e) =>
                      setRequest({ ...request, latField: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude Field
                  </label>
                  <input
                    type="text"
                    value={request.lngField}
                    onChange={(e) =>
                      setRequest({ ...request, lngField: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Properties */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Properties (comma-separated)
                </label>
                <input
                  type="text"
                  value={request.properties?.join(', ') || ''}
                  onChange={(e) =>
                    setRequest({
                      ...request,
                      properties: e.target.value
                        .split(',')
                        .map((p) => p.trim())
                        .filter((p) => p),
                    })
                  }
                  placeholder="name, population"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Generating...' : 'Generate GeoJSON'}
              </button>
            </form>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-red-800 font-medium mb-2">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Response Display */}
            {response && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Response
                  </h3>
                  <CopyButton text={JSON.stringify(response, null, 2)} />
                </div>
                <div className="relative group">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{JSON.stringify(response, null, 2)}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
