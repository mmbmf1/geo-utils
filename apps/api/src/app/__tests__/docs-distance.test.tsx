import { render, screen } from '@testing-library/react'
import DistanceDocs from '@/app/docs/distance/page'
import userEvent from '@testing-library/user-event'

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
    })

    it('has input fields for coordinates', () => {
      render(<DistanceDocs />)

      // Check for latitude and longitude inputs for both points
      expect(
        screen.getByLabelText(/latitude/i, { selector: '#point1-latitude' })
      ).toBeInTheDocument()
      expect(
        screen.getByLabelText(/longitude/i, { selector: '#point1-longitude' })
      ).toBeInTheDocument()
      expect(
        screen.getByLabelText(/latitude/i, { selector: '#point2-latitude' })
      ).toBeInTheDocument()
      expect(
        screen.getByLabelText(/longitude/i, { selector: '#point2-longitude' })
      ).toBeInTheDocument()
    })

    it('has a unit selector', () => {
      render(<DistanceDocs />)

      // Check for unit selector
      const unitSelector = screen.getByLabelText(/unit/i)
      expect(unitSelector).toBeInTheDocument()

      // Check for all unit options within the select element
      const options = unitSelector.querySelectorAll('option')
      expect(options).toHaveLength(4)
      expect(Array.from(options).map((opt) => opt.textContent)).toEqual([
        'Meters',
        'Kilometers',
        'Miles',
        'Feet',
      ])
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

  describe('Form Submission', () => {
    it('submits the form with valid data', async () => {
      render(<DistanceDocs />)

      // Fill in the form
      const point1Lat = screen.getByLabelText(/latitude/i, {
        selector: '#point1-latitude',
      })
      const point1Lon = screen.getByLabelText(/longitude/i, {
        selector: '#point1-longitude',
      })
      const point2Lat = screen.getByLabelText(/latitude/i, {
        selector: '#point2-latitude',
      })
      const point2Lon = screen.getByLabelText(/longitude/i, {
        selector: '#point2-longitude',
      })
      const unitSelector = screen.getByLabelText(/unit/i)

      await userEvent.type(point1Lat, '40.7128')
      await userEvent.type(point1Lon, '-74.0060')
      await userEvent.type(point2Lat, '34.0522')
      await userEvent.type(point2Lon, '-118.2437')
      await userEvent.selectOptions(unitSelector, 'Meters')

      // Submit the form
      const submitButton = screen.getByRole('button', {
        name: /calculate distance/i,
      })
      await userEvent.click(submitButton)

      // Check that the form data was submitted correctly
      // Note: We'll need to implement the actual submission handling
      expect(point1Lat).toHaveValue('40.7128')
      expect(point1Lon).toHaveValue('-74.0060')
      expect(point2Lat).toHaveValue('34.0522')
      expect(point2Lon).toHaveValue('-118.2437')
      expect(unitSelector).toHaveValue('Meters')
    })

    it('shows validation errors for invalid data', async () => {
      render(<DistanceDocs />)

      // Fill in the form with invalid data
      const point1Lat = screen.getByLabelText(/latitude/i, {
        selector: '#point1-latitude',
      })
      const point1Lon = screen.getByLabelText(/longitude/i, {
        selector: '#point1-longitude',
      })

      await userEvent.type(point1Lat, '100') // Invalid latitude
      await userEvent.type(point1Lon, '200') // Invalid longitude

      // Submit the form
      const submitButton = screen.getByRole('button', {
        name: /calculate distance/i,
      })
      await userEvent.click(submitButton)

      // Check for validation error messages
      // Note: We'll need to implement the actual validation
      expect(
        screen.getByText(/latitude must be between -90 and 90/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/longitude must be between -180 and 180/i)
      ).toBeInTheDocument()
    })

    it('displays the calculated distance result', async () => {
      render(<DistanceDocs />)

      // Fill in the form with valid data
      const point1Lat = screen.getByLabelText(/latitude/i, {
        selector: '#point1-latitude',
      })
      const point1Lon = screen.getByLabelText(/longitude/i, {
        selector: '#point1-longitude',
      })
      const point2Lat = screen.getByLabelText(/latitude/i, {
        selector: '#point2-latitude',
      })
      const point2Lon = screen.getByLabelText(/longitude/i, {
        selector: '#point2-longitude',
      })
      const unitSelector = screen.getByLabelText(/unit/i)

      await userEvent.type(point1Lat, '40.7128')
      await userEvent.type(point1Lon, '-74.0060')
      await userEvent.type(point2Lat, '34.0522')
      await userEvent.type(point2Lon, '-118.2437')
      await userEvent.selectOptions(unitSelector, 'Meters')

      // Submit the form
      const submitButton = screen.getByRole('button', {
        name: /calculate distance/i,
      })
      await userEvent.click(submitButton)

      // Check for the result display
      // Note: We'll need to implement the actual result display
      expect(screen.getByText(/distance:/i)).toBeInTheDocument()
      expect(screen.getByText(/meters/i)).toBeInTheDocument()
    })
  })
})
