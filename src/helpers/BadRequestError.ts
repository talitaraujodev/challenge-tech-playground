import { Constantes } from '../domain/Constantes';
import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  constructor(message: string, errors: any) {
    super(Constantes.httpStatus.BAD_REQUEST, message, errors);
  }
}