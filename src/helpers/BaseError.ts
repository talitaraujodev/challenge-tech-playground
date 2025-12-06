export class BaseError {
    public readonly statusCode: number;
    public readonly message: string;
    public readonly errors?: any;
  
    constructor(statusCode: number, message: string, errors?: Array<{ title: string, detail: string, code: number }>) {
      this.statusCode = statusCode;
      this.message = message;
      this.errors = errors;
    }
  }