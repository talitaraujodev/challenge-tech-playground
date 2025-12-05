import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Gender } from '../../../../domain/enums/Gender';
import { CompanyTenure } from '../../../../domain/enums/CompanyTenure';
import { Department } from '../../../../domain/enums/Department';

@Entity('employees_feedback')
export class EmployeeFeedbackEntity {
    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text', unique: true })
    email: string;

    @Column({ name: 'corporate_email', type: 'text', unique: true })
    corporateEmail: string;

    @Column({ type: 'enum', enum: Department })
    department: string;

    @Column({ type: 'text', name: 'job_role' })
    jobRole: string;

    @Column({ type: 'text', name: 'job_function' })
    jobFunction: string;

    @Column({ type: 'text' })
    location: string;

    @Column({ name: 'company_tenure', type: 'enum', enum: CompanyTenure })
    companyTenure: string;

    @Column({ type: 'enum', enum: Gender })
    gender: string;

    @Column({ type: 'text' })
    generation: string;

    @Column({ name: 'level_0_company', type: 'text' })
    level0Company: string;

    @Column({ name: 'level_1_directorate', type: 'text' })
    level1Directorate: string;

    @Column({ name: 'level_2_management', type: 'text' })
    level2Management: string;

    @Column({ name: 'level_3_coordination', type: 'text' })
    level3Coordination: string;

    @Column({ name: 'level_4_area', type: 'text' })
    level4Area: string;

    @Column({ name: 'response_date', type: 'date' })
    responseDate: Date;

    @Column({ name: 'job_interest', type: 'int' })
    jobInterest: number;

    @Column({ name: 'job_interest_comments', type: 'text' })
    jobInterestComments: string;

    @Column({ type: 'int' })
    contribution: number;

    @Column({ name: 'contribution_comments', type: 'text' })
    contributionComments: string;

    @Column({ name: 'learning_development', type: 'int' })
    learningDevelopment: number;

    @Column({ name: 'learning_development_comments', type: 'text' })
    learningDevelopmentComments: string;

    @Column({ name: 'feedback_score', type: 'int' })
    feedbackScore: number;

    @Column({ name: 'feedback_comments', type: 'text' })
    feedbackComments: string;

    @Column({ name: 'manager_interaction', type: 'int' })
    managerInteraction: number;

    @Column({ name: 'manager_interaction_comments', type: 'text' })
    managerInteractionComments: string;

    @Column({ name: 'career_clarity', type: 'int' })
    careerClarity: number;

    @Column({ name: 'career_clarity_comments', type: 'text' })
    careerClarityComments: string;

    @Column({ name: 'permanence_expectation', type: 'int' })
    permanenceExpectation: number;

    @Column({ name: 'permanence_expectation_comments', type: 'text' })
    permanenceExpectationComments: string;

    @Column({ name: 'enps_score', type: 'int' })
    enpsScore: number;

    @Column({ name: 'enps_open_comments', type: 'text' })
    enpsOpenComments: string;

    @Column({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}
