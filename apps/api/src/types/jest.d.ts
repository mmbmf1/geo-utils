import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> extends jest.Matchers<R> {
      toBeInTheDocument(): R
      toHaveTextContent(text: string): R
      toHaveAttribute(attr: string, value?: string): R
    }
  }
}
