import { Repository } from "typeorm";
import { EmployeeFeedbackPersistenceOutputPort } from "../../../application/output/EmployeeFeedbackPersistenceOutputPort";
import { AppDataSource } from "../../../config/database/ormConfig";
import { EmployeeFeedback } from "../../../domain/models/EmployeeFeedback";
import { EmployeeFeedbackEntity } from "./entities/EmployeeFeedbackEntity";
import { Department } from "../../../domain/enums/Department";
import { CompanyTenure } from "../../../domain/enums/CompanyTenure";
import { Gender } from "../../../domain/enums/Gender";
import { Generation } from "../../../domain/enums/Generation";

export class EmployeeFeedbackPersistenceAdapter implements EmployeeFeedbackPersistenceOutputPort {
    private readonly employeeFeedbackRepository: Repository<EmployeeFeedbackEntity> =
        AppDataSource.getRepository(EmployeeFeedbackEntity);

    async create(employeeFeedback: EmployeeFeedback): Promise<EmployeeFeedback> {
        const employeeFeedbackCreated = this.employeeFeedbackRepository.create({
            ...employeeFeedback
        });

        const employeeFeedbackSaved: EmployeeFeedbackEntity = await this.employeeFeedbackRepository.save(employeeFeedbackCreated);
        return new EmployeeFeedback(
            employeeFeedbackSaved.id,
            employeeFeedbackSaved.name,
            employeeFeedbackSaved.email,
            employeeFeedbackSaved.corporateEmail,
            employeeFeedbackSaved.department as Department,
            employeeFeedbackSaved.jobRole,
            employeeFeedbackSaved.jobFunction,
            employeeFeedbackSaved.location,
            employeeFeedbackSaved.companyTenure as CompanyTenure,
            employeeFeedbackSaved.gender as Gender,
            employeeFeedbackSaved.generation as Generation,
            employeeFeedbackSaved.level0Company,
            employeeFeedbackSaved.level1Directorate,
            employeeFeedbackSaved.level2Management,
            employeeFeedbackSaved.level3Coordination,
            employeeFeedbackSaved.level4Area,
            employeeFeedbackSaved.responseDate,
            employeeFeedbackSaved.jobInterest,
            employeeFeedbackSaved.jobInterestComments,
            employeeFeedbackSaved.contribution,
            employeeFeedbackSaved.contributionComments,
            employeeFeedbackSaved.learningDevelopment,
            employeeFeedbackSaved.learningDevelopmentComments,
            employeeFeedbackSaved.feedbackScore,
            employeeFeedbackSaved.feedbackComments,
            employeeFeedbackSaved.managerInteraction,
            employeeFeedbackSaved.managerInteractionComments,
            employeeFeedbackSaved.careerClarity,
            employeeFeedbackSaved.careerClarityComments,
            employeeFeedbackSaved.permanenceExpectation,
            employeeFeedbackSaved.permanenceExpectationComments,
            employeeFeedbackSaved.enpsScore,
            employeeFeedbackSaved.enpsOpenComments
        );
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
    }): Promise<{ data: EmployeeFeedback[]; total: number; page: number; limit: number }> {

        const {
            page = 1,
            limit = 15,
            department,
            jobRole,
            location,
            gender,
            companyTenure,
            generation,
            dateFrom,
            dateTo,
            search
        } = params;

        const query = this.employeeFeedbackRepository.createQueryBuilder("f");


        if (department) query.andWhere("f.department = :department", { department });
        if (jobRole) query.andWhere("f.job_role = :jobRole", { jobRole });
        if (location) query.andWhere("f.location = :location", { location });
        if (gender) query.andWhere("f.gender = :gender", { gender });
        if (companyTenure) query.andWhere("f.company_tenure = :companyTenure", { companyTenure });
        if (generation) query.andWhere("f.generation = :generation", { generation });


        if (dateFrom) query.andWhere("f.response_date >= :dateFrom", { dateFrom });
        if (dateTo) query.andWhere("f.response_date <= :dateTo", { dateTo });


        if (search) {
            query.andWhere(`(
                f.job_interest_comments ILIKE :search OR
                f.contribution_comments ILIKE :search OR
                f.learning_development_comments ILIKE :search OR
                f.feedback_comments ILIKE :search OR
                f.manager_interaction_comments ILIKE :search OR
                f.career_clarity_comments ILIKE :search OR
                f.permanence_expectation_comments ILIKE :search OR
                f.enps_open_comments ILIKE :search
            )`, { search: `%${search}%` });
        }


        query.skip((page - 1) * limit).take(limit);

        const [results, total] = await query.getManyAndCount();

        return {
            data: results as any,
            total,
            page,
            limit
        };
    }

    async findById(id: string): Promise<EmployeeFeedback> {
        const employeeFeedback = await this.employeeFeedbackRepository.findOne({ where: { id } });

        if (!employeeFeedback) return null;

        return new EmployeeFeedback(
            employeeFeedback.id,
            employeeFeedback.name,
            employeeFeedback.email,
            employeeFeedback.corporateEmail,
            employeeFeedback.department as Department,
            employeeFeedback.jobRole,
            employeeFeedback.jobFunction,
            employeeFeedback.location,
            employeeFeedback.companyTenure as CompanyTenure,
            employeeFeedback.gender as Gender,
            employeeFeedback.generation as Generation,
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
            employeeFeedback.enpsOpenComments
        );
    }

    async update(id: string, employeeFeedback: EmployeeFeedback): Promise<EmployeeFeedback> {
        await this.employeeFeedbackRepository.update(id, employeeFeedback);
        const employeeFeedbackUpdated = await this.employeeFeedbackRepository.findOne({ where: { id: employeeFeedback.id } });
        return new EmployeeFeedback(
            employeeFeedbackUpdated.id,
            employeeFeedbackUpdated.name,
            employeeFeedbackUpdated.email,
            employeeFeedbackUpdated.corporateEmail,
            employeeFeedbackUpdated.department as Department,
            employeeFeedbackUpdated.jobRole,
            employeeFeedbackUpdated.jobFunction,
            employeeFeedbackUpdated.location,
            employeeFeedbackUpdated.companyTenure as CompanyTenure,
            employeeFeedbackUpdated.gender as Gender,
            employeeFeedbackUpdated.generation as Generation,
            employeeFeedbackUpdated.level0Company,
            employeeFeedbackUpdated.level1Directorate,
            employeeFeedbackUpdated.level2Management,
            employeeFeedbackUpdated.level3Coordination,
            employeeFeedbackUpdated.level4Area,
            employeeFeedbackUpdated.responseDate,
            employeeFeedbackUpdated.jobInterest,
            employeeFeedbackUpdated.jobInterestComments,
            employeeFeedbackUpdated.contribution,
            employeeFeedbackUpdated.contributionComments,
            employeeFeedbackUpdated.learningDevelopment,
            employeeFeedbackUpdated.learningDevelopmentComments,
            employeeFeedbackUpdated.feedbackScore,
            employeeFeedbackUpdated.feedbackComments,
            employeeFeedbackUpdated.managerInteraction,
            employeeFeedbackUpdated.managerInteractionComments,
            employeeFeedbackUpdated.careerClarity,
            employeeFeedbackUpdated.careerClarityComments,
            employeeFeedbackUpdated.permanenceExpectation,
            employeeFeedbackUpdated.permanenceExpectationComments,
            employeeFeedbackUpdated.enpsScore,
            employeeFeedbackUpdated.enpsOpenComments
        );
    }

    async delete(id: string): Promise<void> {
        await this.employeeFeedbackRepository.delete(id);
    }

    async findByEmail(field: 'email' | 'corporateEmail', value: string): Promise<EmployeeFeedback | boolean> {
        const employeeFeedback = await this.employeeFeedbackRepository.findOne({ where: { [field]: value } });
        if (!employeeFeedback) {
            return false;
        }
        return new EmployeeFeedback(
            employeeFeedback.id,
            employeeFeedback.name,
            employeeFeedback.email,
            employeeFeedback.corporateEmail,
            employeeFeedback.department as Department,
            employeeFeedback.jobRole,
            employeeFeedback.jobFunction,
            employeeFeedback.location,
            employeeFeedback.companyTenure as CompanyTenure,
            employeeFeedback.gender as Gender,
            employeeFeedback.generation as Generation,
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
            employeeFeedback.enpsOpenComments
        );
    }
}