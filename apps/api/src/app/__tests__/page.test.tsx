import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home page', () => {
  it('renders all main components', () => {
    render(<Home />)

    // Check main title
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Geo Utils API'
    )

    // Check distance calculation section
    const distanceSection = screen.getByText('Distance Calculation')
    expect(distanceSection).toBeInTheDocument()

    // Check the link to docs (now the entire card is a link)
    const docsLink = screen.getByRole('link', {
      name: /Distance Calculation.*Calculate the geodetic distance between two points.*POST \/api\/distance/i,
    })
    expect(docsLink).toHaveAttribute('href', '/docs/distance')

    // Check description text
    expect(
      screen.getByText('Calculate the geodetic distance between two points')
    ).toBeInTheDocument()

    // Check API endpoint display
    expect(screen.getByText('POST /api/distance')).toBeInTheDocument()
  })
})
