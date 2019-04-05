export class ValidationError<T> extends Error {
  private detail?: T;

  constructor(message: string, detail?: T) {
    super(message);
    this.name = 'ValidationError';
    this.detail = detail;
  }
}
