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
  ) {}

  async create(request: Request, response: Response): Promise<Response> {
    try {
      const employeeFeedback = await this.employeeFeedbackServiceInputPort.create(request.body);

      return response
        .json({
          message: Messages.EMPLOYEE_FEEDBACK_CREATED,
          employeeFeedback,
        })
        .status(Constantes.httpStatus.CREATED);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }

      return response.json(e).status(Constantes.httpStatus.ERROR_SERVER);
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;
      await this.employeeFeedbackServiceInputPort.update(id, request.body);

      return response
        .json({
          message: Messages.EMPLOYEE_FEEDBACK_UPDATED,
        })
        .status(Constantes.httpStatus.OK);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }
      return response.json(e).status(Constantes.httpStatus.ERROR_SERVER);
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
      return response.json(e).status(Constantes.httpStatus.ERROR_SERVER);
    }
  }

  async findOne(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id;

      const employeeFeedback = await this.employeeFeedbackServiceInputPort.findById(id);

      return response
        .json({
          employeeFeedback,
        })
        .status(Constantes.httpStatus.OK);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }
      return response.json(e).status(Constantes.httpStatus.ERROR_SERVER);
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const { page, limit, department, jobRole, location, gender, companyTenure, generation, dateFrom, dateTo, search } = request.query;

      return response
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
        )
        .status(Constantes.httpStatus.OK);
    } catch (e) {
      if (e instanceof BaseError) {
        return response
          .status(e.statusCode)
          .json({ message: e.message, status: e.statusCode, errors: e.errors });
      }
      return response.json(e).status(Constantes.httpStatus.ERROR_SERVER);
    }
  }
}