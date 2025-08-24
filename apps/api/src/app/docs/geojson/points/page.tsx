'use client'

import { useState } from 'react'

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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">GeoJSON Points API</h1>

      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Convert coordinate data to GeoJSON FeatureCollection format. Perfect
          for mapping applications and data visualization.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data Array */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Data</h2>
          <div className="space-y-4">
            {request.data.map((item, index) => (
              <div key={index} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Item {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeDataRow(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={item.name || ''}
                      onChange={(e) =>
                        updateData(index, 'name', e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
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
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
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
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
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
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addDataRow}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Data Row
            </button>
          </div>
        </div>

        {/* Field Configuration */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Latitude Field
            </label>
            <input
              type="text"
              value={request.latField}
              onChange={(e) =>
                setRequest({ ...request, latField: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Longitude Field
            </label>
            <input
              type="text"
              value={request.lngField}
              onChange={(e) =>
                setRequest({ ...request, lngField: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Properties */}
        <div>
          <label className="block text-sm font-medium mb-1">
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
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate GeoJSON'}
        </button>
      </form>

      {/* Response */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-medium mb-2">Error</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {response && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Response</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
