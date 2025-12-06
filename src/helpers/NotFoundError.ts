import { Constantes } from '../domain/Constantes';
import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor(message: string, errors: Array<{ title: string, detail: string, code: number }>) {
    super(Constantes.httpStatus.NOT_FOUND, message, errors);
  }
}