export class GeoUtilsError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public validationErrors?: Array<{ field: string; message: string }>
  ) {
    super(message)
    this.name = 'GeoUtilsError'
  }
}
