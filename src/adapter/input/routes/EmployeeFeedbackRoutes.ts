import { Request, Response, Router } from "express";
import { injectable } from "tsyringe";
import { EmployeeFeedbackController } from "../controllers/EmployeeFeedbackController";

@injectable()
export class EmployeeFeedbackRoutes {
    private readonly router: Router;
    constructor(private employeeFeedbackController: EmployeeFeedbackController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/api/v1/employee-feedback', async (request: Request, response: Response) => await this.employeeFeedbackController.create(request, response));
        this.router.get('/api/v1/employee-feedback', async (request: Request, response: Response) => await this.employeeFeedbackController.findAll(request, response));
        this.router.get('/api/v1/employee-feedback/:id', async (request: Request, response: Response) => await this.employeeFeedbackController.findOne(request, response));
        this.router.put('/api/v1/employee-feedback/:id', async (request: Request, response: Response) => await this.employeeFeedbackController.update(request, response));
        this.router.delete('/api/v1/employee-feedback/:id', async (request: Request, response: Response) => await this.employeeFeedbackController.delete(request, response));
    }

    public getRouter(): Router {
        return this.router;
    }
}