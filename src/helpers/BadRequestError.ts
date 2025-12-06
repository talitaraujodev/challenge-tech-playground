import { Constantes } from '../domain/Constantes';
import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  constructor(message: string, errors: Array<{ title: string, detail: string, code: number }>) {
    super(Constantes.httpStatus.BAD_REQUEST, message, errors);
  }
}