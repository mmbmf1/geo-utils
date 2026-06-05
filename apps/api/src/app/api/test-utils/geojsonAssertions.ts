const geometryTypes = new Set([
  'Point',
  'MultiPoint',
  'LineString',
  'MultiLineString',
  'Polygon',
  'MultiPolygon',
])

type Geometry = {
  type: string
  coordinates: unknown
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function expectPosition(position: unknown) {
  expect(Array.isArray(position)).toBe(true)
  const coordinates = position as unknown[]

  expect(coordinates.length).toBeGreaterThanOrEqual(2)
  expect(coordinates.length).toBeLessThanOrEqual(3)

  const [longitude, latitude, altitude] = coordinates

  expect(typeof longitude).toBe('number')
  expect(typeof latitude).toBe('number')
  expect(Number.isFinite(longitude)).toBe(true)
  expect(Number.isFinite(latitude)).toBe(true)
  expect(longitude).toBeGreaterThanOrEqual(-180)
  expect(longitude).toBeLessThanOrEqual(180)
  expect(latitude).toBeGreaterThanOrEqual(-90)
  expect(latitude).toBeLessThanOrEqual(90)

  if (altitude !== undefined) {
    expect(typeof altitude).toBe('number')
    expect(Number.isFinite(altitude)).toBe(true)
  }
}

function expectNestedPositions(coordinates: unknown) {
  expect(Array.isArray(coordinates)).toBe(true)

  if (
    Array.isArray(coordinates) &&
    typeof coordinates[0] === 'number' &&
    typeof coordinates[1] === 'number'
  ) {
    expectPosition(coordinates)
    return
  }

  for (const child of coordinates as unknown[]) {
    expectNestedPositions(child)
  }
}

function expectLinearRing(ring: unknown) {
  expect(Array.isArray(ring)).toBe(true)
  const positions = ring as unknown[]

  expect(positions.length).toBeGreaterThanOrEqual(4)

  for (const position of positions) {
    expectPosition(position)
  }

  expect(positions[0]).toEqual(positions[positions.length - 1])
}

function expectPolygonCoordinates(coordinates: unknown) {
  expect(Array.isArray(coordinates)).toBe(true)

  for (const ring of coordinates as unknown[]) {
    expectLinearRing(ring)
  }
}

function expectGeometry(geometry: unknown) {
  expect(isPlainObject(geometry)).toBe(true)
  const candidate = geometry as Geometry

  expect(geometryTypes.has(candidate.type)).toBe(true)

  if (candidate.type === 'Polygon') {
    expectPolygonCoordinates(candidate.coordinates)
    return
  }

  if (candidate.type === 'MultiPolygon') {
    expect(Array.isArray(candidate.coordinates)).toBe(true)
    for (const polygon of candidate.coordinates as unknown[]) {
      expectPolygonCoordinates(polygon)
    }
    return
  }

  expectNestedPositions(candidate.coordinates)
}

export function expectRfc7946FeatureCollection(geojson: unknown) {
  expect(isPlainObject(geojson)).toBe(true)
  const collection = geojson as Record<string, unknown>

  expect(collection.type).toBe('FeatureCollection')
  expect(collection.crs).toBeUndefined()
  expect(Array.isArray(collection.features)).toBe(true)

  for (const feature of collection.features as unknown[]) {
    expect(isPlainObject(feature)).toBe(true)
    const candidate = feature as Record<string, unknown>

    expect(candidate.type).toBe('Feature')
    expectGeometry(candidate.geometry)
    expect(isPlainObject(candidate.properties)).toBe(true)
  }
}
