import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import { EmployeeFeedbackServiceInputPort } from '../input/EmployeeFeedbackServiceInputPort';
import type { EmployeeFeedbackPersistenceOutputPort } from '../output/EmployeeFeedbackPersistenceOutputPort';
import { EmployeeFeedback } from '../../domain/models/EmployeeFeedback';
import { NotFoundError } from '../../helpers/NotFoundError';
import { Constantes } from '../../domain/Constantes';
import { BadRequestError } from '../../helpers/BadRequestError';

@injectable()
export class EmployeeFeedbackService implements EmployeeFeedbackServiceInputPort {
    constructor(
        @inject('EmployeeFeedbackPersistenceOutputPort')
        private readonly employeeFeedbackPersistenceOutputPort: EmployeeFeedbackPersistenceOutputPort
    ) {}

    async create(employeeFeedback: EmployeeFeedback): Promise<EmployeeFeedback> {
        const emailExists = await this.employeeFeedbackPersistenceOutputPort.findByEmail('email', employeeFeedback.email);
        const errors =[];
        if (emailExists) {
            errors.push({ title:'E-mail já existe', detail: 'O e-mail informado já existe', code: Constantes.httpStatus.BAD_REQUEST});
            throw new BadRequestError(
                Constantes.httpMessages.BAD_REQUEST_ERROR,
                errors,
            );
        }

        const corporateEmailExists = await this.employeeFeedbackPersistenceOutputPort.findByEmail('corporateEmail', employeeFeedback.corporateEmail);
        if (corporateEmailExists) {
            errors.push({ title:'E-mail corporativo já existe', detail: 'O e-mail corporativo informado já existe', code: Constantes.httpStatus.BAD_REQUEST});
            throw new BadRequestError(
                Constantes.httpMessages.BAD_REQUEST_ERROR,
                errors,
            );
        }

        const data = new EmployeeFeedback(
            uuidv4(),
            employeeFeedback.name,
            employeeFeedback.email,
            employeeFeedback.corporateEmail,
            employeeFeedback.department,
            employeeFeedback.jobRole,
            employeeFeedback.jobFunction,
            employeeFeedback.location,
            employeeFeedback.companyTenure,
            employeeFeedback.gender,
            employeeFeedback.generation,
            employeeFeedback.level0Company,
            employeeFeedback.level1Directorate,
            employeeFeedback.level2Management,
            employeeFeedback.level3Coordination,
            employeeFeedback.level4Area,
            employeeFeedback.responseDate,
            employeeFeedback.jobInterest,
            employeeFeedback.jobInterestComments,
            employeeFeedback.contribution,
            employeeFeedback.contributionComments,
            employeeFeedback.learningDevelopment,
            employeeFeedback.learningDevelopmentComments,
            employeeFeedback.feedbackScore,
            employeeFeedback.feedbackComments,
            employeeFeedback.managerInteraction,
            employeeFeedback.managerInteractionComments,
            employeeFeedback.careerClarity,
            employeeFeedback.careerClarityComments,
            employeeFeedback.permanenceExpectation,
            employeeFeedback.permanenceExpectationComments,
            employeeFeedback.enpsScore,
            employeeFeedback.enpsOpenComments,
        );

        const validateError = data.validate();
        if (validateError) {
            throw new BadRequestError(
                Constantes.httpMessages.BAD_REQUEST_ERROR,
                validateError,
            );
        }
        return await this.employeeFeedbackPersistenceOutputPort.create(data);
    }

    async findAll(params: {
        page?: number;
        limit?: number;
        department?: string;
        jobRole?: string;
        location?: string;
        gender?: string;
        companyTenure?: string;
        generation?: string;
        dateFrom?: Date;
        dateTo?: Date;
        search?: string;
    }): Promise<{
        data: EmployeeFeedback[];
        total: number;
        page: number;
        limit: number;
    }> {

        return await this.employeeFeedbackPersistenceOutputPort.findAll({
            page: params.page,
            limit: params.limit,
            department: params.department,
            jobRole: params.jobRole,
            location: params.location,
            gender: params.gender,
            companyTenure: params.companyTenure,
            generation: params.generation,
            dateFrom: params.dateFrom,
            dateTo: params.dateTo,
            search: params.search
        });

    }

    async findById(id: string): Promise<EmployeeFeedback> {
        const employeeFeedback = await this.employeeFeedbackPersistenceOutputPort.findById(id);
        const errors = [];
        if (!employeeFeedback) {
            errors.push({  title:'Feedback do funcionário não encontrado', detail: 'Feedback do funcionário não encontrado por id', code: Constantes.httpStatus.NOT_FOUND});
            throw new NotFoundError(
                Constantes.httpMessages.NOT_FOUND_ERROR,
                errors,
            );
        }
        
        return new EmployeeFeedback(
            employeeFeedback.id,
            employeeFeedback.name,
            employeeFeedback.email,
            employeeFeedback.corporateEmail,
            employeeFeedback.department,
            employeeFeedback.jobRole,
            employeeFeedback.jobFunction,
            employeeFeedback.location,
            employeeFeedback.companyTenure,
            employeeFeedback.gender,
            employeeFeedback.generation,
            employeeFeedback.level0Company,
            employeeFeedback.level1Directorate,
            employeeFeedback.level2Management,
            employeeFeedback.level3Coordination,
            employeeFeedback.level4Area,
            employeeFeedback.responseDate,
            employeeFeedback.jobInterest,
            employeeFeedback.jobInterestComments,
            employeeFeedback.contribution,
            employeeFeedback.contributionComments,
            employeeFeedback.learningDevelopment,
            employeeFeedback.learningDevelopmentComments,
            employeeFeedback.feedbackScore,
            employeeFeedback.feedbackComments,
            employeeFeedback.managerInteraction,
            employeeFeedback.managerInteractionComments,
            employeeFeedback.careerClarity,
            employeeFeedback.careerClarityComments,
            employeeFeedback.permanenceExpectation,
            employeeFeedback.permanenceExpectationComments,
            employeeFeedback.enpsScore,
            employeeFeedback.enpsOpenComments,
        );
    }

    async update(id: string, employeeFeedback: EmployeeFeedback): Promise<EmployeeFeedback> {
        await this.findById(id);

        const data = new EmployeeFeedback(
            id,
            employeeFeedback.name,
            employeeFeedback.email,
            employeeFeedback.corporateEmail,
            employeeFeedback.department,
            employeeFeedback.jobRole,
            employeeFeedback.jobFunction,
            employeeFeedback.location,
            employeeFeedback.companyTenure,
            employeeFeedback.gender,
            employeeFeedback.generation,
            employeeFeedback.level0Company,
            employeeFeedback.level1Directorate,
            employeeFeedback.level2Management,
            employeeFeedback.level3Coordination,
            employeeFeedback.level4Area,
            employeeFeedback.responseDate,
            employeeFeedback.jobInterest,
            employeeFeedback.jobInterestComments,
            employeeFeedback.contribution,
            employeeFeedback.contributionComments,
            employeeFeedback.learningDevelopment,
            employeeFeedback.learningDevelopmentComments,
            employeeFeedback.feedbackScore,
            employeeFeedback.feedbackComments,
            employeeFeedback.managerInteraction,
            employeeFeedback.managerInteractionComments,
            employeeFeedback.careerClarity,
            employeeFeedback.careerClarityComments,
            employeeFeedback.permanenceExpectation,
            employeeFeedback.permanenceExpectationComments,
            employeeFeedback.enpsScore,
            employeeFeedback.enpsOpenComments,
        );

        const validateError = data.validate();
        if (validateError) {
            throw new BadRequestError(
                Constantes.httpMessages.BAD_REQUEST_ERROR,
                validateError,
            );
        }

        return await this.employeeFeedbackPersistenceOutputPort.update(id, data);
    }

    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this.employeeFeedbackPersistenceOutputPort.delete(id);
    }

}