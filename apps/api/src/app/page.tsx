export default function Home() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Geo Utils API</h1>
        <p className="text-lg text-gray-600">
          Geospatial utilities powered by PostGIS
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          href="/docs/distance"
          className="block bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Distance Calculation
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Calculate the geodetic distance between two points
          </p>
          <code className="block bg-gray-50 text-gray-800 px-3 py-2 rounded text-sm font-mono">
            POST /api/distance
          </code>
        </a>

        <a
          href="/docs/geojson/points"
          className="block bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            GeoJSON from Points
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Convert coordinate data to GeoJSON FeatureCollection
          </p>
          <code className="block bg-gray-50 text-gray-800 px-3 py-2 rounded text-sm font-mono">
            POST /api/geojson/points
          </code>
        </a>

        <a
          href="/docs/geojson/wkt"
          className="block bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            GeoJSON from WKT
          </h2>
          <p className="text-gray-600 mb-4 text-sm">
            Convert WKT geometry strings to GeoJSON FeatureCollection
          </p>
          <code className="block bg-gray-50 text-gray-800 px-3 py-2 rounded text-sm font-mono">
            POST /api/geojson/wkt
          </code>
        </a>
      </div>
    </div>
  )
}
