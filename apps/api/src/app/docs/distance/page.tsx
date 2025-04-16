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

      <section>
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
    </div>
  )
}
