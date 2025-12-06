import { inject, injectable } from "tsyringe";
import { Request, Response } from 'express';
import { InjectionKeys } from "../../../domain/InjectionKeys";
import { Messages } from "../../../domain/Messages";
import { Constantes } from "../../../domain/Constantes";
import { BaseError } from "../../../helpers/BaseError";
import { EmployeeFeedbackServiceInputPort } from "../../../application/input/EmployeeFeedbackServiceInputPort";

@injectable()
export class EmployeeFeedbackController {
  constructor(
    @inject(InjectionKeys.EMPLOYEE_FEEDBACK_SERVICE_INPUT_PORT)
    private readonly employeeFeedbackServiceInputPort: EmployeeFeedbackServiceInputPort,
  ) { }

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const employeeFeedback = await this.employeeFeedbackServiceInputPort.create(request.body);

      return response
        .status(Constantes.httpStatus.CREATED)
        .json({
          message: Messages.EMPLOYEE_FEEDBACK_CREATED,
          employeeFeedback,
        });
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }

      return response.status(Constantes.httpStatus.ERROR_SERVER).json(e);
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      await this.employeeFeedbackServiceInputPort.update(id, request.body);

      return response.status(Constantes.httpStatus.NOT_CONTENT).send();
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }
      return response.status(Constantes.httpStatus.ERROR_SERVER).json(e);
    }
  }

  async delete(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;

      await this.employeeFeedbackServiceInputPort.delete(id);

      return response.status(Constantes.httpStatus.NOT_CONTENT).send();
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }
      return response.status(Constantes.httpStatus.ERROR_SERVER).json(e);
    }
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;

      const employeeFeedback = await this.employeeFeedbackServiceInputPort.findById(id);

      return response
        .status(Constantes.httpStatus.OK)
        .json({
          employeeFeedback,
        });
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }
      return response.status(Constantes.httpStatus.ERROR_SERVER).json(e);
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const { page, limit, department, jobRole, location, gender, companyTenure, generation, dateFrom, dateTo, search } = request.query;

      return response
        .status(Constantes.httpStatus.OK)
        .json(
          await this.employeeFeedbackServiceInputPort.findAll(
            {
              page: page ? parseInt(page as string) : undefined,
              limit: limit ? parseInt(limit as string) : undefined,
              department: department as string,
              jobRole: jobRole as string,
              location: location as string,
              gender: gender as string,
              companyTenure: companyTenure as string,
              generation: generation as string,
            },
          ),
        );
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }
      return response.status(Constantes.httpStatus.ERROR_SERVER).json(e);
    }
  }
}