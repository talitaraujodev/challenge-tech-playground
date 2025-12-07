import Joi from 'joi';

export const employeeFeedbackSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'O campo name é obrigatório',
        'string.empty': 'O campo name não pode estar vazio',
        'string.base': 'O campo name deve ser um texto'
    }),

    email: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório',
        'string.email': 'O campo email deve ser um e-mail válido',
        'string.empty': 'O campo email não pode estar vazio',
        'string.base': 'O campo email deve ser um texto'
    }),

    corporateEmail: Joi.string().email().required().messages({
        'any.required': 'O campo corporateEmail é obrigatório',
        'string.email': 'O campo corporateEmail deve ser um e-mail válido',
        'string.empty': 'O campo corporateEmail não pode estar vazio',
        'string.base': 'O campo corporateEmail deve ser um texto'
    }),

    department: Joi.string().required().messages({
        'any.required': 'O campo department é obrigatório',
        'string.empty': 'O campo department não pode estar vazio'
    }),

    jobRole: Joi.string().required().messages({
        'any.required': 'O campo jobRole é obrigatório',
        'string.empty': 'O campo jobRole não pode estar vazio'
    }),

    jobFunction: Joi.string().required().messages({
        'any.required': 'O campo jobFunction é obrigatório',
        'string.empty': 'O campo jobFunction não pode estar vazio'
    }),

    location: Joi.string().required().messages({
        'any.required': 'O campo location é obrigatório',
        'string.empty': 'O campo location não pode estar vazio'
    }),

    companyTenure: Joi.string().required().messages({
        'any.required': 'O campo companyTenure é obrigatório',
        'string.empty': 'O campo companyTenure não pode estar vazio'
    }),

    gender: Joi.string().required().messages({
        'any.required': 'O campo gender é obrigatório',
        'string.empty': 'O campo gender não pode estar vazio'
    }),

    generation: Joi.string().required().messages({
        'any.required': 'O campo generation é obrigatório',
        'string.empty': 'O campo generation não pode estar vazio'
    }),

    level0Company: Joi.string().required().messages({
        'any.required': 'O campo level0Company é obrigatório',
        'string.empty': 'O campo level0Company não pode estar vazio'
    }),

    level1Directorate: Joi.string().required().messages({
        'any.required': 'O campo level1Directorate é obrigatório',
        'string.empty': 'O campo level1Directorate não pode estar vazio'
    }),

    level2Management: Joi.string().required().messages({
        'any.required': 'O campo level2Management é obrigatório',
        'string.empty': 'O campo level2Management não pode estar vazio'
    }),

    level3Coordination: Joi.string().required().messages({
        'any.required': 'O campo level3Coordination é obrigatório',
        'string.empty': 'O campo level3Coordination não pode estar vazio'
    }),

    level4Area: Joi.string().required().messages({
        'any.required': 'O campo level4Area é obrigatório',
        'string.empty': 'O campo level4Area não pode estar vazio'
    }),

    responseDate: Joi.date().required().messages({
        'any.required': 'O campo responseDate é obrigatório',
        'date.base': 'O campo responseDate deve ser uma data válida'
    }),

    jobInterest: Joi.number().required().messages({
        'any.required': 'O campo jobInterest é obrigatório',
        'number.base': 'O campo jobInterest deve ser um número'
    }),

    jobInterestComments: Joi.string().required().messages({
        'any.required': 'O campo jobInterestComments é obrigatório',
        'string.empty': 'O campo jobInterestComments não pode estar vazio'
    }),

    contribution: Joi.number().allow(null).optional().messages({
        'number.base': 'O campo contribution deve ser um número'
    }),

    contributionComments: Joi.string().allow(null, '').optional().messages({
        'string.base': 'O campo contributionComments deve ser um texto'
    }),

    learningDevelopment: Joi.number().required().messages({
        'any.required': 'O campo learningDevelopment é obrigatório',
        'number.base': 'O campo learningDevelopment deve ser um número'
    }),

    learningDevelopmentComments: Joi.string().allow(null, '').optional().messages({
        'string.base': 'O campo learningDevelopmentComments deve ser um texto'
    }),

    feedbackScore: Joi.number().allow(null).optional().messages({
        'number.base': 'O campo feedbackScore deve ser um número'
    }),

    feedbackComments: Joi.string().allow(null, '').optional().messages({
        'string.base': 'O campo feedbackComments deve ser um texto'
    }),

    managerInteraction: Joi.number().allow(null).optional().messages({
        'number.base': 'O campo managerInteraction deve ser um número'
    }),

    managerInteractionComments: Joi.string().allow(null, '').optional().messages({
        'string.base': 'O campo managerInteractionComments deve ser um texto'
    }),

    careerClarity: Joi.number().required().messages({
        'any.required': 'O campo careerClarity é obrigatório',
        'number.base': 'O campo careerClarity deve ser um número'
    }),

    careerClarityComments: Joi.string().allow(null, '').optional().messages({
        'string.base': 'O campo careerClarityComments deve ser um texto'
    }),

    permanenceExpectation: Joi.number().allow(null).optional().messages({
        'number.base': 'O campo permanenceExpectation deve ser um número'
    }),

    permanenceExpectationComments: Joi.string().allow(null, '').optional().messages({
        'string.base': 'O campo permanenceExpectationComments deve ser um texto'
    }),

    enpsScore: Joi.number().allow(null).optional().messages({
        'number.base': 'O campo enpsScore deve ser um número'
    }),

    enpsOpenComments: Joi.string().allow(null, '').optional().messages({
        'string.base': 'O campo enpsOpenComments deve ser um texto'
    })
});
