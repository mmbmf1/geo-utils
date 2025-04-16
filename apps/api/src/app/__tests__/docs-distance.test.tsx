import { render, screen } from '@testing-library/react'
import DistanceDocs from '@/app/docs/distance/page'

describe('Distance Documentation Page', () => {
  it('renders all documentation sections', () => {
    render(<DistanceDocs />)

    // Check main title
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Distance Calculation'
    )

    // Check endpoint section
    expect(
      screen.getByRole('heading', { level: 2, name: 'Endpoint' })
    ).toBeInTheDocument()
    expect(screen.getByText('POST /api/distance')).toBeInTheDocument()

    // Check request body section
    expect(
      screen.getByRole('heading', { level: 2, name: 'Request Body' })
    ).toBeInTheDocument()
    const requestBody = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === 'pre' &&
        content.includes('"point1":') &&
        content.includes('"point2":') &&
        content.includes('"unit": "miles"')
      )
    })
    expect(requestBody).toBeInTheDocument()

    // Check response section
    expect(
      screen.getByRole('heading', { level: 2, name: 'Response' })
    ).toBeInTheDocument()
    const response = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === 'pre' &&
        content.includes('"distance": 2445.203')
      )
    })
    expect(response).toBeInTheDocument()

    // Check example section
    expect(
      screen.getByRole('heading', { level: 2, name: 'Example' })
    ).toBeInTheDocument()
    const example = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === 'pre' &&
        content.includes("fetch('https://geo-utils.vercel.app/api/distance'")
      )
    })
    expect(example).toBeInTheDocument()
  })
})
