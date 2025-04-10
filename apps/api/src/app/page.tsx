export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Geo Utils API</h1>

      <div className="space-y-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Distance Calculation</h2>
          <p className="text-gray-600 mb-2">
            Calculate the geodetic distance between two points
          </p>
          <code className="block bg-gray-100 p-2 rounded">
            POST /api/distance
          </code>
        </div>
      </div>
    </div>
  )
}
