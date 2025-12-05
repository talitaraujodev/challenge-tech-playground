import { Router } from 'express';
import { container } from 'tsyringe';
import { EmployeeFeedbackService } from './application/services/EmployeeFeedbackService';
import { InjectionKeys } from './domain/InjectionKeys';
import { EmployeeFeedbackPersistenceAdapter } from './adapter/output/persistense/EmployeeFeedbackPersistenceAdapter';
import { EmployeeFeedbackController } from './adapter/input/controllers/EmployeeFeedbackController';
import { EmployeeFeedbackRoutes } from './adapter/input/routes/EmployeeFeedbackRoutes';
import { AppDataSource } from './config/database/ormConfig';

export class AppConfig {
  public async initialize(): Promise<Router[]> {
    this.registerDependencies();
    await this.initializeDatabase();
    return this.getRoutes();
  }

  private registerDependencies(): void {
    container.register(InjectionKeys.EMPLOYEE_FEEDBACK_SERVICE_INPUT_PORT, {
      useClass: EmployeeFeedbackService,
    });
    container.register(InjectionKeys.EMPLOYEE_FEEDBACK_PERSISTENCE_OUTPUT_PORT, {
      useClass: EmployeeFeedbackPersistenceAdapter,
    });
    container.register(InjectionKeys.EMPLOYEE_FEEDBACK_CONTROLLER, {
      useClass: EmployeeFeedbackController,
    });
  }

  private async initializeDatabase(): Promise<void> {
    await AppDataSource.initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch((err: any) => {
        console.error('Error during Data Source initialization:', err);
      });
  }

  public getRoutes(): Router[] {
    const employeeFeedbackRoutes = container.resolve(EmployeeFeedbackRoutes).getRouter();
  

    return [employeeFeedbackRoutes];
  }
}
export default new AppConfig();