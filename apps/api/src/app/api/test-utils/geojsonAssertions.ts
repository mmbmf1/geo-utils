import { validateGeoJSONFeatureCollection } from '@mmbmf1/geo-utils-validation'

export function expectRfc7946FeatureCollection(geojson: unknown) {
  expect(validateGeoJSONFeatureCollection(geojson)).toEqual([])
}
