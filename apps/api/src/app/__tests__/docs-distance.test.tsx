import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DistanceDocs from '@/app/docs/distance/page'

// Mock fetch
global.fetch = jest.fn()

describe('Distance Documentation Page', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  describe('Documentation Sections', () => {
    it('renders the main title', () => {
      render(<DistanceDocs />)
      expect(screen.getByText(/distance calculation/i)).toBeInTheDocument()
    })

    it('renders the endpoint section', () => {
      render(<DistanceDocs />)
      expect(screen.getByText(/endpoint/i)).toBeInTheDocument()
      expect(screen.getByText(/post \/api\/distance/i)).toBeInTheDocument()
    })

    it('renders the request body section', () => {
      render(<DistanceDocs />)
      expect(screen.getByText(/request body/i)).toBeInTheDocument()
      expect(screen.getByText(/"point1":/i)).toBeInTheDocument()
      expect(screen.getByText(/"point2":/i)).toBeInTheDocument()
      expect(screen.getByText(/"unit":/i)).toBeInTheDocument()
    })

    it('renders the response section', () => {
      render(<DistanceDocs />)
      expect(
        screen.getByText(/response/i, { selector: 'h2' })
      ).toBeInTheDocument()
      expect(screen.getByText(/"distance":/i)).toBeInTheDocument()
    })

    it('renders the example section', () => {
      render(<DistanceDocs />)
      expect(screen.getByText(/example/i)).toBeInTheDocument()
      expect(screen.getByText(/fetch/i)).toBeInTheDocument()
    })
  })

  describe('Testing Interface', () => {
    it('renders the testing interface section', () => {
      render(<DistanceDocs />)
      expect(screen.getByText(/testing interface/i)).toBeInTheDocument()
    })

    it('has input fields for coordinates', () => {
      render(<DistanceDocs />)
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
      const unitSelector = screen.getByLabelText(/unit/i)
      expect(unitSelector).toBeInTheDocument()

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
      expect(
        screen.getByRole('button', { name: /calculate distance/i })
      ).toBeInTheDocument()
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
      expect(point1Lat).toHaveValue(40.7128)
      expect(point1Lon).toHaveValue(-74.006)
      expect(point2Lat).toHaveValue(34.0522)
      expect(point2Lon).toHaveValue(-118.2437)
      expect(unitSelector).toHaveValue('Meters')
    })

    it('displays validation errors from the API', async () => {
      // Mock the fetch response for validation errors
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () =>
          Promise.resolve({
            errors: [
              { message: 'latitude must be between -90 and 90' },
              { message: 'longitude must be between -180 and 180' },
            ],
          }),
      })

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

      // Check for API validation error messages
      const latitudeError = await screen.findByText(
        'latitude must be between -90 and 90'
      )
      const longitudeError = await screen.findByText(
        'longitude must be between -180 and 180'
      )

      expect(latitudeError).toBeInTheDocument()
      expect(longitudeError).toBeInTheDocument()
    })

    it('displays the calculated distance result', async () => {
      // Mock the fetch response for successful calculation
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: () => Promise.resolve({ distance: 3935.747 }),
      })

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
      const resultText = await screen.findByText(/Distance: 3935.75 meters/i)
      expect(resultText).toBeInTheDocument()
    })
  })
})
