import { validateGeoJSONFeatureCollection } from '@mmbmf1/geo-utils-validation'
import { expectRfc7946FeatureCollection } from './geojsonAssertions'

describe('RFC 7946 GeoJSON assertions', () => {
  it('accepts nullable Feature geometry and properties members', () => {
    expectRfc7946FeatureCollection({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: null,
          properties: null,
        },
      ],
    })
  })

  it('rejects missing Feature properties members', () => {
    expect(
      validateGeoJSONFeatureCollection({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: null,
          },
        ],
      })
    ).toEqual([
      {
        field: 'features[0].properties',
        message: 'feature properties must be an object or null',
      },
    ])
  })
})
