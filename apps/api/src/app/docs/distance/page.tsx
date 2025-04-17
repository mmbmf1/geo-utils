export default function DistanceDocs() {
  return (
    <div>
      <div className="mb-6">
        <a href="/" className="text-blue-500 hover:text-blue-700">
          ← Back to Home
        </a>
      </div>
      <h1 className="text-3xl font-bold mb-6">Distance Calculation</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Endpoint</h2>
        <code className="block bg-gray-100 p-4 rounded">
          POST /api/distance
        </code>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Request Body</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          {`{
    "point1": {
      "latitude": 40.7128,    // New York
      "longitude": -74.0060
    },
    "point2": {
      "latitude": 34.0522,    // Los Angeles
      "longitude": -118.2437
    },
    "unit": "miles"           // optional: meters, kilometers, miles, feet
  }`}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Response</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          {`{
    "distance": 2445.203     // distance in specified unit
  }`}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Example</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          {`fetch('https://geo-utils.vercel.app/api/distance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      point1: { latitude: 40.7128, longitude: -74.0060 },
      point2: { latitude: 34.0522, longitude: -118.2437 },
      unit: 'miles'
    })
  })`}
        </pre>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Testing Interface</h2>
        <div className="border rounded-lg p-6">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Point 1</h3>
                <div>
                  <label
                    htmlFor="point1-latitude"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Latitude
                  </label>
                  <input
                    type="number"
                    id="point1-latitude"
                    name="point1-latitude"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="point1-longitude"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Longitude
                  </label>
                  <input
                    type="number"
                    id="point1-longitude"
                    name="point1-longitude"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Point 2</h3>
                <div>
                  <label
                    htmlFor="point2-latitude"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Latitude
                  </label>
                  <input
                    type="number"
                    id="point2-latitude"
                    name="point2-latitude"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="point2-longitude"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Longitude
                  </label>
                  <input
                    type="number"
                    id="point2-longitude"
                    name="point2-longitude"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="unit"
                className="block text-sm font-medium text-gray-700"
              >
                Unit
              </label>
              <select
                id="unit"
                name="unit"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="meters">Meters</option>
                <option value="kilometers">Kilometers</option>
                <option value="miles">Miles</option>
                <option value="feet">Feet</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Calculate Distance
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
