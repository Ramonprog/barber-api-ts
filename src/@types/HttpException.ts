// src/types/HttpException.ts
class HttpException extends Error {
  public status: number;
  public errors?: any;

  constructor(status: number, message: string, errors?: any) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}
export { HttpException };
