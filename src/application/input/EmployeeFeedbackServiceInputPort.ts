import { EmployeeFeedback } from "../../domain/models/EmployeeFeedback";

export interface EmployeeFeedbackServiceInputPort {
    create(employeeFeedback: EmployeeFeedback): Promise<EmployeeFeedback>;
    findAll(params: {
        page?: number;
        limit?: number;
        department?: string;
        jobRole?: string;
        location?: string;
        gender?: string;
        companyTenure?: string;
        generation?: string;
    }): Promise<{
        data: EmployeeFeedback[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string): Promise<EmployeeFeedback>;
    update(id: string, employeeFeedback: EmployeeFeedback): Promise<EmployeeFeedback>;
    delete(id: string): Promise<void>;
}