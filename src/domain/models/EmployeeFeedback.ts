import { Gender } from '../enums/Gender';
import { CompanyTenure } from '../enums/CompanyTenure';
import { Department } from '../enums/Department';
import { Generation } from '../enums/Generation';
import { Constantes } from '../Constantes';
import { employeeFeedbackSchema } from '../../application/validators/employeeFeedbackSchema';

export class EmployeeFeedback {
    id: string;
    name: string;
    email: string;
    corporateEmail: string;
    department: Department;
    jobRole: string;
    jobFunction: string;
    location: string;
    companyTenure: CompanyTenure;
    gender: Gender;
    generation: Generation;
    level0Company: string;
    level1Directorate: string;
    level2Management: string;
    level3Coordination: string;
    level4Area: string;
    responseDate: Date;
    jobInterest: number;
    jobInterestComments: string;
    contribution?: number;
    contributionComments?: string;
    learningDevelopment?: number;
    learningDevelopmentComments?: string;
    feedbackScore?: number;
    feedbackComments?: string;
    managerInteraction?: number;
    managerInteractionComments?: string;
    careerClarity?: number;
    careerClarityComments?: string;
    permanenceExpectation?: number;
    permanenceExpectationComments?: string;
    enpsScore?: number;
    enpsOpenComments?: string;

    constructor(
        id: string,
        name: string,
        email: string,
        corporateEmail: string,
        department: Department,
        jobRole: string,
        jobFunction: string,
        location: string,
        companyTenure: CompanyTenure,
        gender: Gender,
        generation: Generation,
        level0Company: string,
        level1Directorate: string,
        level2Management: string,
        level3Coordination: string,
        level4Area: string,
        responseDate: Date,
        jobInterest: number,
        jobInterestComments: string,
        contribution: number,
        contributionComments: string,
        learningDevelopment: number,
        learningDevelopmentComments: string,
        feedbackScore: number,
        feedbackComments: string,
        managerInteraction: number,
        managerInteractionComments: string,
        careerClarity: number,
        careerClarityComments: string,
        permanenceExpectation: number,
        permanenceExpectationComments: string,
        enpsScore: number,
        enpsOpenComments: string,
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.corporateEmail = corporateEmail;
        this.department = department;
        this.jobRole = jobRole;
        this.jobFunction = jobFunction;
        this.location = location;
        this.companyTenure = companyTenure;
        this.gender = gender;
        this.generation = generation;

        this.level0Company = level0Company;
        this.level1Directorate = level1Directorate;
        this.level2Management = level2Management;
        this.level3Coordination = level3Coordination;
        this.level4Area = level4Area;

        this.responseDate = responseDate;

        this.jobInterest = jobInterest;
        this.jobInterestComments = jobInterestComments;

        this.contribution = contribution;
        this.contributionComments = contributionComments;

        this.learningDevelopment = learningDevelopment;
        this.learningDevelopmentComments = learningDevelopmentComments;

        this.feedbackScore = feedbackScore;
        this.feedbackComments = feedbackComments;

        this.managerInteraction = managerInteraction;
        this.managerInteractionComments = managerInteractionComments;

        this.careerClarity = careerClarity;
        this.careerClarityComments = careerClarityComments;

        this.permanenceExpectation = permanenceExpectation;
        this.permanenceExpectationComments = permanenceExpectationComments;

        this.enpsScore = enpsScore;
        this.enpsOpenComments = enpsOpenComments;

    }

    validate() {
        const data = {
            name: this.name,
            email: this.email,
            corporateEmail: this.corporateEmail,
            department: this.department,
            jobRole: this.jobRole,
            jobFunction: this.jobFunction,
            location: this.location,
            companyTenure: this.companyTenure,
            gender: this.gender,
            generation: this.generation,
            level0Company: this.level0Company,
            level1Directorate: this.level1Directorate,
            level2Management: this.level2Management,
            level3Coordination: this.level3Coordination,
            level4Area: this.level4Area,
            responseDate: this.responseDate,
            jobInterest: this.jobInterest,
            jobInterestComments: this.jobInterestComments,
            contribution: this.contribution,
            contributionComments: this.contributionComments,
            learningDevelopment: this.learningDevelopment,
            learningDevelopmentComments: this.learningDevelopmentComments,
            feedbackScore: this.feedbackScore,
            feedbackComments: this.feedbackComments,
            managerInteraction: this.managerInteraction,
            managerInteractionComments: this.managerInteractionComments,
            careerClarity: this.careerClarity,
            careerClarityComments: this.careerClarityComments,
            permanenceExpectation: this.permanenceExpectation,
            permanenceExpectationComments: this.permanenceExpectationComments,
            enpsScore: this.enpsScore,
            enpsOpenComments: this.enpsOpenComments,
        };
        const { error } = employeeFeedbackSchema.validate(data, { abortEarly: false });
        
        if (error) {
            return error.details.map((err) => ({
                title: 'Campo inválido',
                detail: err.message,
                code: Constantes.httpStatus.BAD_REQUEST,
            }));
        }
        
        return false;
    }

}
