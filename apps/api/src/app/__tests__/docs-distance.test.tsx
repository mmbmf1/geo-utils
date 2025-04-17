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

  it('has a back to home link', () => {
    render(<DistanceDocs />)

    // Check for a link back to the home page
    const homeLink = screen.getByRole('link', { name: /back to home/i })
    expect(homeLink).toHaveAttribute('href', '/')
    expect(homeLink).toHaveClass('text-blue-500')
    expect(homeLink).toHaveClass('hover:text-blue-700')
  })

  describe('Testing Interface', () => {
    it('renders the testing interface section', () => {
      render(<DistanceDocs />)

      // Check if the testing interface section is present
      const testingSection = screen.getByRole('heading', {
        name: /testing interface/i,
      })
      expect(testingSection).toBeInTheDocument()

      // Check if the placeholder text is present
      const placeholder = screen.getByText(/form coming soon/i)
      expect(placeholder).toBeInTheDocument()
    })

    it('has input fields for coordinates', () => {
      render(<DistanceDocs />)

      // Check for latitude and longitude inputs for both points
      expect(screen.getByLabelText(/point 1 latitude/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/point 1 longitude/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/point 2 latitude/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/point 2 longitude/i)).toBeInTheDocument()
    })

    it('has a unit selector', () => {
      render(<DistanceDocs />)

      // Check for unit selector
      const unitSelector = screen.getByLabelText(/unit/i)
      expect(unitSelector).toBeInTheDocument()

      // Check for all unit options
      expect(screen.getByText(/meters/i)).toBeInTheDocument()
      expect(screen.getByText(/kilometers/i)).toBeInTheDocument()
      expect(screen.getByText(/miles/i)).toBeInTheDocument()
      expect(screen.getByText(/feet/i)).toBeInTheDocument()
    })

    it('has a submit button', () => {
      render(<DistanceDocs />)

      // Check for submit button
      const submitButton = screen.getByRole('button', {
        name: /calculate distance/i,
      })
      expect(submitButton).toBeInTheDocument()
    })
  })
})
