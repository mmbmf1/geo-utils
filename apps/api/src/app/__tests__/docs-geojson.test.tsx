import { render, screen } from '@testing-library/react'
import GeoJSONPointsDocs from '@/app/docs/geojson/points/page'
import GeoJSONWKTDocs from '@/app/docs/geojson/wkt/page'

describe('GeoJSON documentation pages', () => {
  it('renders enhanced guidance for the points endpoint', () => {
    render(<GeoJSONPointsDocs />)

    expect(
      screen.getByRole('heading', { name: /use cases/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/CSV-style business records/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /response fields/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/one GeoJSON feature per input row/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /troubleshooting and best practices/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/fail validation before PostGIS is called/i)
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /GeoJSON from WKT/i })
    ).toHaveAttribute('href', '/docs/geojson/wkt')
    expect(
      screen.getByRole('link', { name: /Distance Calculation/i })
    ).toHaveAttribute('href', '/docs/distance')
  })

  it('renders enhanced guidance for the WKT endpoint', () => {
    render(<GeoJSONWKTDocs />)

    expect(
      screen.getByRole('heading', { name: /use cases/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/database WKT columns/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /response fields/i })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/source WKT out of the response/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /troubleshooting and best practices/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Invalid WKT is rejected before/i)
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: /GeoJSON from Points/i })
    ).toHaveAttribute('href', '/docs/geojson/points')
    expect(
      screen.getByRole('link', { name: /Distance Calculation/i })
    ).toHaveAttribute('href', '/docs/distance')
  })
})
